import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface QuoteRequestFormProps {
  onSubmit: (data: {
    email: string;
    name?: string;
    phone?: string;
    notes?: string;
  }) => void;
  isSubmitting?: boolean;
}

const QuoteRequestForm = ({ onSubmit, isSubmitting = false }: QuoteRequestFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    onSubmit({
      email,
      name: name || undefined,
      phone: phone || undefined,
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) validateEmail(e.target.value);
          }}
          onBlur={() => validateEmail(email)}
          className={emailError ? 'border-destructive' : ''}
          disabled={isSubmitting}
          required
        />
        {emailError && (
          <p className="text-xs text-destructive">{emailError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm">Name (optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm">Project Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Tell us more about your project..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="resize-none"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Quote Request'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We'll review your requirements and send you a detailed quote within 24-48 hours.
      </p>
    </form>
  );
};

export default QuoteRequestForm;