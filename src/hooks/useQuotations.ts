import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface QuotationItem {
  id?: string;
  quotation_id?: string;
  description: string;
  details: string;
  qty: number;
  unit_price: number;
  amount: number;
  sort_order: number;
}

export interface Quotation {
  id?: string;
  quote_number: string;
  date_issued: string;
  valid_until: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
  client_name: string;
  client_address: string;
  client_email: string;
  project_name: string;
  currency: string;
  notes: string;
  converted_invoice_id?: string | null;
  created_at?: string;
  items?: QuotationItem[];
}

export function useQuotations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: quotations = [], isLoading } = useQuery({
    queryKey: ['quotations'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Quotation[];
    },
  });

  const fetchQuotationWithItems = async (quotationId: string): Promise<Quotation> => {
    const [qRes, itemsRes] = await Promise.all([
      (supabase as any).from('quotations').select('*').eq('id', quotationId).single(),
      (supabase as any).from('quotation_items').select('*').eq('quotation_id', quotationId).order('sort_order'),
    ]);
    if (qRes.error) throw qRes.error;
    if (itemsRes.error) throw itemsRes.error;
    return { ...qRes.data, items: itemsRes.data } as Quotation;
  };

  const createQuotation = useMutation({
    mutationFn: async (q: Quotation) => {
      const { items, id, created_at, ...quoteData } = q;
      const { data, error } = await (supabase as any)
        .from('quotations')
        .insert(quoteData)
        .select()
        .single();
      if (error) throw error;
      if (items && items.length > 0) {
        const itemsToInsert = items.map((item, index) => ({
          quotation_id: data.id,
          description: item.description,
          details: item.details || '',
          qty: item.qty,
          unit_price: item.unit_price,
          amount: item.qty * item.unit_price,
          sort_order: index,
        }));
        const { error: itemsError } = await (supabase as any).from('quotation_items').insert(itemsToInsert);
        if (itemsError) throw itemsError;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      toast({ title: 'Quotation created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating quotation', description: error.message, variant: 'destructive' });
    },
  });

  const updateQuotation = useMutation({
    mutationFn: async (q: Quotation) => {
      const { items, created_at, ...quoteData } = q;
      const { error } = await (supabase as any)
        .from('quotations')
        .update(quoteData)
        .eq('id', q.id!);
      if (error) throw error;
      await (supabase as any).from('quotation_items').delete().eq('quotation_id', q.id!);
      if (items && items.length > 0) {
        const itemsToInsert = items.map((item, index) => ({
          quotation_id: q.id!,
          description: item.description,
          details: item.details || '',
          qty: item.qty,
          unit_price: item.unit_price,
          amount: item.qty * item.unit_price,
          sort_order: index,
        }));
        const { error: itemsError } = await (supabase as any).from('quotation_items').insert(itemsToInsert);
        if (itemsError) throw itemsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      toast({ title: 'Quotation updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating quotation', description: error.message, variant: 'destructive' });
    },
  });

  const deleteQuotation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('quotations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      toast({ title: 'Quotation deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting quotation', description: error.message, variant: 'destructive' });
    },
  });

  const convertToInvoice = useMutation({
    mutationFn: async (quotationId: string) => {
      const full = await fetchQuotationWithItems(quotationId);

      // Generate invoice number
      const { data: existingInvoices } = await (supabase as any).from('invoices').select('id');
      const year = new Date().getFullYear();
      const count = (existingInvoices?.length || 0) + 1;
      const invoice_number = `INV-${year}-${String(count).padStart(3, '0')}`;

      const today = new Date().toISOString().split('T')[0];
      const due = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

      const { data: invoice, error: invErr } = await (supabase as any)
        .from('invoices')
        .insert({
          invoice_number,
          date_issued: today,
          payment_due: due,
          status: 'unpaid',
          client_name: full.client_name,
          client_address: full.client_address,
          client_email: full.client_email,
          project_name: full.project_name,
          currency: full.currency,
          notes: full.notes,
        })
        .select()
        .single();
      if (invErr) throw invErr;

      if (full.items && full.items.length > 0) {
        const itemsToInsert = full.items.map((item, index) => ({
          invoice_id: invoice.id,
          description: item.description,
          details: item.details || '',
          qty: item.qty,
          unit_price: item.unit_price,
          amount: item.qty * item.unit_price,
          sort_order: index,
        }));
        await (supabase as any).from('invoice_items').insert(itemsToInsert);
      }

      await (supabase as any)
        .from('quotations')
        .update({ status: 'accepted', converted_invoice_id: invoice.id })
        .eq('id', quotationId);

      return invoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Converted to invoice', description: 'A new invoice has been created from this quotation.' });
    },
    onError: (error: Error) => {
      toast({ title: 'Conversion failed', description: error.message, variant: 'destructive' });
    },
  });

  const generateQuoteNumber = () => {
    const year = new Date().getFullYear();
    const count = quotations.length + 1;
    return `QUO-${year}-${String(count).padStart(3, '0')}`;
  };

  return {
    quotations,
    isLoading,
    createQuotation,
    updateQuotation,
    deleteQuotation,
    convertToInvoice,
    fetchQuotationWithItems,
    generateQuoteNumber,
  };
}
