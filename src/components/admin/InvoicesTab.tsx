import { useState } from 'react';
import { useInvoices } from '@/hooks/useInvoices';
import type { Invoice } from '@/hooks/useInvoices';
import { InvoiceEditor } from './InvoiceEditor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Download, Mail, Trash2, Edit, FileText, Sparkles } from 'lucide-react';
import { downloadInvoicePdf } from '@/utils/invoicePdf';
import { supabase } from '@/integrations/supabase/client';
import { milestone2Prefill } from '@/data/invoicePrefills';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const statusColors: Record<string, string> = {
  unpaid: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  paid: 'bg-green-100 text-green-800 border-green-300',
  overdue: 'bg-red-100 text-red-800 border-red-300',
  cancelled: 'bg-gray-100 text-gray-600 border-gray-300',
};

export function InvoicesTab() {
  const { invoices, isLoading, createInvoice, updateInvoice, deleteInvoice, fetchInvoiceWithItems, generateInvoiceNumber } = useInvoices();
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleNew = () => {
    setIsNew(true);
    setEditing(null);
  };

  const handleNewPrefilled = () => {
    setEditing({ invoice_number: generateInvoiceNumber(), ...milestone2Prefill } as Invoice);
    setIsNew(false);
  };

  const handleEdit = async (invoice: Invoice) => {
    const full = await fetchInvoiceWithItems(invoice.id!);
    setEditing(full);
    setIsNew(false);
  };

  const handleSave = async (invoice: Invoice) => {
    if (invoice.id) {
      await updateInvoice.mutateAsync(invoice);
    } else {
      await createInvoice.mutateAsync(invoice);
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDownload = async (invoice: Invoice) => {
    const full = await fetchInvoiceWithItems(invoice.id!);
    downloadInvoicePdf(full);
  };

  const handleSendEmail = async (invoice: Invoice) => {
    if (!invoice.client_email) {
      toast({ title: 'No client email', description: 'Add a client email to send invoices.', variant: 'destructive' });
      return;
    }
    setSendingId(invoice.id!);
    try {
      const { error } = await supabase.functions.invoke('send-invoice-email', {
        body: { invoiceId: invoice.id },
      });
      if (error) throw error;
      toast({ title: 'Invoice sent!', description: `Email sent to ${invoice.client_email}` });
    } catch (err: any) {
      toast({ title: 'Failed to send', description: err.message, variant: 'destructive' });
    } finally {
      setSendingId(null);
    }
  };

  if (isNew || editing) {
    return (
      <InvoiceEditor
        invoice={editing}
        defaultInvoiceNumber={generateInvoiceNumber()}
        onSave={handleSave}
        onCancel={() => { setEditing(null); setIsNew(false); }}
        isSaving={createInvoice.isPending || updateInvoice.isPending}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Invoices</h2>
          <p className="text-sm text-muted-foreground">Create, manage, and send invoices to clients</p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" /> New Invoice
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No invoices yet</p>
            <Button variant="outline" className="mt-4" onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" /> Create your first invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {invoices.map(inv => (
            <Card key={inv.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between py-4 px-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{inv.invoice_number}</span>
                    <Badge variant="outline" className={statusColors[inv.status]}>
                      {inv.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {inv.client_name} {inv.project_name ? `· ${inv.project_name}` : ''}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Issued: {new Date(inv.date_issued).toLocaleDateString()} · Due: {new Date(inv.payment_due).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(inv)} title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDownload(inv)} title="Download PDF">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSendEmail(inv)}
                    disabled={sendingId === inv.id}
                    title="Send via Email"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Invoice?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {inv.invoice_number}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteInvoice.mutate(inv.id!)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
