import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Please enter a valid email address' })
  .max(254);

interface NewsletterSignupProps {
  source?: string;
}

// Client-side throttle: max 3 attempts per 10 minutes per browser
const RATE_KEY = 'naffaro-newsletter-attempts';
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

const isClientRateLimited = () => {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RATE_KEY);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    const recent = arr.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) return true;
    recent.push(now);
    localStorage.setItem(RATE_KEY, JSON.stringify(recent));
    return false;
  } catch {
    return false;
  }
};

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ source = 'blog' }) => {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const formLoadedAt = useRef<number>(Date.now());
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot trip — silently no-op
    if (website.trim().length > 0) {
      setEmail('');
      return;
    }

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: 'Invalid email',
        description: parsed.error.issues[0]?.message ?? 'Please enter a valid email.',
        variant: 'destructive',
      });
      return;
    }

    if (isClientRateLimited()) {
      toast({
        title: 'Too many attempts',
        description: 'Please wait a few minutes before trying again.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: {
          email: parsed.data,
          source,
          website,
          formLoadedAt: formLoadedAt.current,
        },
      });
      if (error) throw error;

      toast({
        title: 'Subscribed!',
        description: "You'll receive our latest posts straight to your inbox.",
        duration: 5000,
      });
      setEmail('');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to New Blog Posts</h2>
          <p className="text-lg mb-8 text-white/80">
            Get our latest articles on automation, web development and data
            analysis delivered to your inbox. Or grab the{' '}
            <a
              href="/rss.xml"
              className="underline hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS feed
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
          >
            {/* Honeypot field — hidden from real users */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-10000px',
                top: 'auto',
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
            >
              <label htmlFor="nl-website">Website</label>
              <input
                id="nl-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
            />
            <button
              type="submit"
              className="bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>

          <p className="text-sm mt-4 text-white/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
