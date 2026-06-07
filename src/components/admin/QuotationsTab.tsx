import { useState } from 'react';
import { useQuotations } from '@/hooks/useQuotations';
import type { Quotation } from '@/hooks/useQuotations';
import { QuotationEditor } from './QuotationEditor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Download, Mail, Trash2, Edit, FileText, ArrowRightCircle } from 'lucide-react';
import { downloadQuotationPdf } from '@/utils/quotationPdf';
import { supabase } from '@/integrations/supabase/client';
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
  draft: 'bg-gray-100 text-gray-700 border-gray-300',
  sent: 'bg-blue-100 text-blue-800 border-blue-300',
  accepted: 'bg-green-100 text-green-800 border-green-300',
  declined: 'bg-red-100 text-red-800 border-red-300',
  expired: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export function QuotationsTab() {
  const {
    quotations, isLoading,
    createQuotation, updateQuotation, deleteQuotation,
    convertToInvoice, fetchQuotationWithItems, generateQuoteNumber,
  } = useQuotations();
  const [editing, setEditing] = useState<Quotation | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleNew = () => { setIsNew(true); setEditing(null); };

  const handleEdit = async (q: Quotation) => {
    const full = await fetchQuotationWithItems(q.id!);
    setEditing(full);
    setIsNew(false);
  };

  const handleSave = async (q: Quotation) => {
    if (q.id) await updateQuotation.mutateAsync(q);
    else await createQuotation.mutateAsync(q);
    setEditing(null);
    setIsNew(false);
  };

  const handleDownload = async (q: Quotation) => {
    const full = await fetchQuotationWithItems(q.id!);
    downloadQuotationPdf(full);
  };

  const handleSendEmail = async (q: Quotation) => {
    if (!q.client_email) {
      toast({ title: 'No client email', description: 'Add a client email to send the quotation.', variant: 'destructive' });
      return;
    }
    setSendingId(q.id!);
    try {
      const { error } = await supabase.functions.invoke('send-quotation-email', {
        body: { quotationId: q.id },
      });
      if (error) throw error;
      toast({ title: 'Quotation sent!', description: `Email sent to ${q.client_email}` });
    } catch (err: any) {
      toast({ title: 'Failed to send', description: err.message, variant: 'destructive' });
    } finally {
      setSendingId(null);
    }
  };

  if (isNew || editing) {
    return (
      <QuotationEditor
        quotation={editing}
        defaultQuoteNumber={generateQuoteNumber()}
        onSave={handleSave}
        onCancel={() => { setEditing(null); setIsNew(false); }}
        isSaving={createQuotation.isPending || updateQuotation.isPending}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Quotations</h2>
          <p className="text-sm text-muted-foreground">Send estimates to clients, then convert accepted ones into invoices.</p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" /> New Quotation
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading quotations...</p>
      ) : quotations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No quotations yet</p>
            <Button variant="outline" className="mt-4" onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" /> Create your first quotation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {quotations.map(q => (
            <Card key={q.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between py-4 px-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{q.quote_number}</span>
                    <Badge variant="outline" className={statusColors[q.status]}>
                      {q.status.toUpperCase()}
                    </Badge>
                    {q.converted_invoice_id && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        INVOICED
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {q.client_name} {q.project_name ? `· ${q.project_name}` : ''}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Issued: {new Date(q.date_issued).toLocaleDateString()} · Valid Until: {new Date(q.valid_until).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(q)} title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDownload(q)} title="Download PDF">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => handleSendEmail(q)}
                    disabled={sendingId === q.id}
                    title="Send via Email"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  {!q.converted_invoice_id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-primary" title="Convert to Invoice">
                          <ArrowRightCircle className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Convert to Invoice?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will create a new invoice from {q.quote_number} and mark the quotation as accepted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => convertToInvoice.mutate(q.id!)}>
                            Convert
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Quotation?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {q.quote_number}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteQuotation.mutate(q.id!)}>
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
