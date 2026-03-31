import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import type { Invoice, InvoiceItem } from '@/hooks/useInvoices';

interface InvoiceEditorProps {
  invoice?: Invoice | null;
  defaultInvoiceNumber: string;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const emptyItem: InvoiceItem = {
  description: '',
  details: '',
  qty: 1,
  unit_price: 0,
  amount: 0,
  sort_order: 0,
};

export function InvoiceEditor({ invoice, defaultInvoiceNumber, onSave, onCancel, isSaving }: InvoiceEditorProps) {
  const today = new Date().toISOString().split('T')[0];
  const dueDateDefault = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const [form, setForm] = useState<Invoice>({
    invoice_number: defaultInvoiceNumber,
    date_issued: today,
    payment_due: dueDateDefault,
    status: 'unpaid',
    client_name: '',
    client_address: '',
    client_email: '',
    project_name: '',
    currency: 'KES',
    notes: 'Thank you for choosing NafArro Solutions. Payment is due within 7 days of invoice date. Late payments may incur a 1.5% monthly fee.',
    items: [{ ...emptyItem }],
  });

  useEffect(() => {
    if (invoice) {
      setForm({
        ...invoice,
        items: invoice.items && invoice.items.length > 0 ? invoice.items : [{ ...emptyItem }],
      });
    }
  }, [invoice]);

  const updateField = (field: keyof Invoice, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setForm(prev => {
      const items = [...(prev.items || [])];
      items[index] = { ...items[index], [field]: value };
      if (field === 'qty' || field === 'unit_price') {
        items[index].amount = Number(items[index].qty) * Number(items[index].unit_price);
      }
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...(prev.items || []), { ...emptyItem, sort_order: (prev.items?.length || 0) }],
    }));
  };

  const removeItem = (index: number) => {
    setForm(prev => ({
      ...prev,
      items: (prev.items || []).filter((_, i) => i !== index),
    }));
  };

  const total = (form.items || []).reduce((sum, item) => sum + Number(item.qty) * Number(item.unit_price), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-foreground">
          {invoice?.id ? 'Edit Invoice' : 'New Invoice'}
        </h2>
      </div>

      {/* Invoice Details */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Invoice Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Invoice Number</Label>
            <Input value={form.invoice_number} onChange={e => updateField('invoice_number', e.target.value)} required />
          </div>
          <div>
            <Label>Date Issued</Label>
            <Input type="date" value={form.date_issued} onChange={e => updateField('date_issued', e.target.value)} required />
          </div>
          <div>
            <Label>Payment Due</Label>
            <Input type="date" value={form.payment_due} onChange={e => updateField('payment_due', e.target.value)} required />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={v => updateField('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Currency</Label>
            <Select value={form.currency} onValueChange={v => updateField('currency', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="KES">KES</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Project Name</Label>
            <Input value={form.project_name} onChange={e => updateField('project_name', e.target.value)} placeholder="e.g. Website Redesign" />
          </div>
        </CardContent>
      </Card>

      {/* Client Info */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Client Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Client Name</Label>
            <Input value={form.client_name} onChange={e => updateField('client_name', e.target.value)} required placeholder="Company or individual name" />
          </div>
          <div>
            <Label>Client Email</Label>
            <Input type="email" value={form.client_email} onChange={e => updateField('client_email', e.target.value)} placeholder="client@example.com" />
          </div>
          <div className="md:col-span-2">
            <Label>Client Address</Label>
            <Textarea value={form.client_address} onChange={e => updateField('client_address', e.target.value)} placeholder="Street, City, Country" rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Line Items</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {(form.items || []).map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-end border-b border-border pb-3">
              <div className="col-span-12 md:col-span-4">
                <Label className="text-xs">Description</Label>
                <Input value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} required placeholder="Service name" />
              </div>
              <div className="col-span-12 md:col-span-3">
                <Label className="text-xs">Details</Label>
                <Input value={item.details} onChange={e => updateItem(index, 'details', e.target.value)} placeholder="Additional details" />
              </div>
              <div className="col-span-4 md:col-span-1">
                <Label className="text-xs">Qty</Label>
                <Input type="number" min={1} value={item.qty} onChange={e => updateItem(index, 'qty', Number(e.target.value))} />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label className="text-xs">Unit Price</Label>
                <Input type="number" min={0} step="0.01" value={item.unit_price} onChange={e => updateItem(index, 'unit_price', Number(e.target.value))} />
              </div>
              <div className="col-span-3 md:col-span-1 text-right pt-5">
                <span className="text-sm font-medium">{(Number(item.qty) * Number(item.unit_price)).toLocaleString()}</span>
              </div>
              <div className="col-span-1">
                {(form.items?.length || 0) > 1 && (
                  <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <div className="text-right">
              <span className="text-muted-foreground text-sm">Total: </span>
              <span className="text-lg font-bold text-foreground">{form.currency} {total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Notes</CardTitle></CardHeader>
        <CardContent>
          <Textarea value={form.notes} onChange={e => updateField('notes', e.target.value)} rows={3} placeholder="Payment terms, thank you message, etc." />
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : invoice?.id ? 'Update Invoice' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
}
