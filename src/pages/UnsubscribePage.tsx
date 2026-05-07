import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  const handleUnsubscribe = async () => {
    if (!token) return;
    setStatus('loading');
    try {
      const { data, error } = await supabase.functions.invoke(
        'newsletter-unsubscribe',
        { body: { token } },
      );
      if (error) throw error;
      setStatus('success');
      setMessage(
        data?.email
          ? `${data.email} has been unsubscribed.`
          : "You've been unsubscribed.",
      );
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(
        'We could not process your request. The link may be invalid or expired.',
      );
    }
  };

  // Auto-confirm if there's a token (one-click unsubscribe friendly)
  useEffect(() => {
    if (token && status === 'idle') {
      handleUnsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SEO
        title="Unsubscribe | NafArro Solutions"
        description="Unsubscribe from the NafArro Solutions newsletter."
      />
      <div className="max-w-lg w-full bg-background border rounded-lg shadow-sm p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Unsubscribe</h1>

        {!token && (
          <>
            <p className="text-muted-foreground mb-6">
              This link is missing the unsubscribe token. Please use the link
              from the email we sent you.
            </p>
            <Link to="/">
              <Button variant="outline">Go to homepage</Button>
            </Link>
          </>
        )}

        {token && status === 'loading' && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Processing your request…</p>
          </div>
        )}

        {token && status === 'success' && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
            <p className="text-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">
              We're sorry to see you go. You can resubscribe anytime from our blog.
            </p>
            <Link to="/blog" className="mt-2">
              <Button variant="outline">Back to blog</Button>
            </Link>
          </div>
        )}

        {token && status === 'error' && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="w-10 h-10 text-destructive" />
            <p className="text-foreground">{message}</p>
            <Button onClick={handleUnsubscribe} className="mt-2">
              Try again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePage;
