import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface InvoiceItem {
  id?: string;
  invoice_id?: string;
  description: string;
  details: string;
  qty: number;
  unit_price: number;
  amount: number;
  sort_order: number;
}

export interface Invoice {
  id?: string;
  invoice_number: string;
  date_issued: string;
  payment_due: string;
  status: 'unpaid' | 'paid' | 'overdue' | 'cancelled';
  client_name: string;
  client_address: string;
  client_email: string;
  project_name: string;
  currency: string;
  notes: string;
  created_at?: string;
  items?: InvoiceItem[];
}

export function useInvoices() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Invoice[];
    },
  });

  const fetchInvoiceWithItems = async (invoiceId: string): Promise<Invoice> => {
    const [invoiceRes, itemsRes] = await Promise.all([
      supabase.from('invoices').select('*').eq('id', invoiceId).single(),
      supabase.from('invoice_items').select('*').eq('invoice_id', invoiceId).order('sort_order'),
    ]);
    if (invoiceRes.error) throw invoiceRes.error;
    if (itemsRes.error) throw itemsRes.error;
    return { ...invoiceRes.data, items: itemsRes.data } as Invoice;
  };

  const createInvoice = useMutation({
    mutationFn: async (invoice: Invoice) => {
      const { items, id, created_at, ...invoiceData } = invoice;
      const { data, error } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select()
        .single();
      if (error) throw error;

      if (items && items.length > 0) {
        const itemsToInsert = items.map((item, index) => ({
          invoice_id: data.id,
          description: item.description,
          details: item.details || '',
          qty: item.qty,
          unit_price: item.unit_price,
          amount: item.qty * item.unit_price,
          sort_order: index,
        }));
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemsToInsert);
        if (itemsError) throw itemsError;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Invoice created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating invoice', description: error.message, variant: 'destructive' });
    },
  });

  const updateInvoice = useMutation({
    mutationFn: async (invoice: Invoice) => {
      const { items, created_at, ...invoiceData } = invoice;
      const { error } = await supabase
        .from('invoices')
        .update(invoiceData)
        .eq('id', invoice.id!);
      if (error) throw error;

      // Delete existing items and re-insert
      await supabase.from('invoice_items').delete().eq('invoice_id', invoice.id!);
      if (items && items.length > 0) {
        const itemsToInsert = items.map((item, index) => ({
          invoice_id: invoice.id!,
          description: item.description,
          details: item.details || '',
          qty: item.qty,
          unit_price: item.unit_price,
          amount: item.qty * item.unit_price,
          sort_order: index,
        }));
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemsToInsert);
        if (itemsError) throw itemsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Invoice updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating invoice', description: error.message, variant: 'destructive' });
    },
  });

  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Invoice deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting invoice', description: error.message, variant: 'destructive' });
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Status updated' });
    },
  });

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const count = invoices.length + 1;
    return `INV-${year}-${String(count).padStart(3, '0')}`;
  };

  return {
    invoices,
    isLoading,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    updateStatus,
    fetchInvoiceWithItems,
    generateInvoiceNumber,
  };
}
