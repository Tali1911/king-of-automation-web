import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PACKAGES = ['Starter', 'Growth', 'Enterprise', 'Not sure yet'] as const;

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  packageInterest: z.enum(PACKAGES, { required_error: 'Pick a package' }),
  message: z.string().trim().min(10, 'Tell us a little more (10+ chars)').max(1000),
});

type FormState = {
  name: string;
  email: string;
  company: string;
  packageInterest: typeof PACKAGES[number] | '';
  message: string;
  website: string; // honeypot
};

const initial: FormState = {
  name: '', email: '', company: '', packageInterest: '', message: '', website: '',
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPackage?: typeof PACKAGES[number];
}

const QuoteRequestModal = ({ open, onOpenChange, defaultPackage }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const openedAt = useRef<number>(0);

  useEffect(() => {
    if (open) {
      openedAt.current = Date.now();
      setForm({ ...initial, packageInterest: defaultPackage ?? '' });
      setErrors({});
    }
  }, [open, defaultPackage]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam protection: honeypot
    if (form.website.trim() !== '') {
      onOpenChange(false);
      return;
    }
    // Spam protection: minimum fill time (>2s)
    if (Date.now() - openedAt.current < 2000) {
      toast({ title: 'Please take a moment', description: 'Form submitted too quickly.', variant: 'destructive' });
      return;
    }

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const data = parsed.data;
    setSubmitting(true);
    try {
      const notes = [
        data.company ? `Company: ${data.company}` : null,
        `Message: ${data.message}`,
      ].filter(Boolean).join('\n');

      const { error } = await supabase.functions.invoke('send-quote-request', {
        body: {
          email: data.email,
          name: data.name,
          notes,
          serviceTypes: [`Package interest: ${data.packageInterest}`],
          features: [],
        },
      });
      if (error) throw error;

      toast({
        title: 'Quote request sent',
        description: "We'll get back to you within 24-48 hours.",
      });
      onOpenChange(false);
    } catch (err) {
      console.error('Quote request failed:', err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again or email info@nafarrosolutions.com',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Request a Free Quote</DialogTitle>
          <DialogDescription>
            Tell us a bit about your project and we'll send a tailored quote within 24-48 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2" noValidate>
          {/* Honeypot — hidden from real users */}
          <div className="absolute -left-[9999px] w-0 h-0 overflow-hidden" aria-hidden="true">
            <Label htmlFor="website">Website</Label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="q-name">Name <span className="text-destructive">*</span></Label>
            <Input id="q-name" value={form.name} onChange={(e) => update('name', e.target.value)} disabled={submitting} maxLength={100} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="q-email">Email <span className="text-destructive">*</span></Label>
            <Input id="q-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} disabled={submitting} maxLength={255} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="q-company">Company (optional)</Label>
            <Input id="q-company" value={form.company} onChange={(e) => update('company', e.target.value)} disabled={submitting} maxLength={150} />
            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="q-package">Package interest <span className="text-destructive">*</span></Label>
            <Select
              value={form.packageInterest}
              onValueChange={(v) => update('packageInterest', v as FormState['packageInterest'])}
              disabled={submitting}
            >
              <SelectTrigger id="q-package">
                <SelectValue placeholder="Choose a package" />
              </SelectTrigger>
              <SelectContent>
                {PACKAGES.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.packageInterest && <p className="text-xs text-destructive">{errors.packageInterest}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="q-message">Short message <span className="text-destructive">*</span></Label>
            <Textarea
              id="q-message"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="What are you trying to build or automate?"
              disabled={submitting}
              maxLength={1000}
            />
            <div className="flex justify-between text-xs">
              <span className="text-destructive">{errors.message}</span>
              <span className="text-muted-foreground">{form.message.length}/1000</span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>) : 'Send Request'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to be contacted by NafArro Solutions about your project.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
