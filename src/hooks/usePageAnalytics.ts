import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PageAnalytics {
  path: string;
  unique_visitors: number;
  total_visits: number;
}

export interface DailyVisits {
  date: string;
  unique_visitors: number;
}

export function usePageAnalytics(days: number = 30) {
  const [topPages, setTopPages] = useState<PageAnalytics[]>([]);
  const [dailyVisits, setDailyVisits] = useState<DailyVisits[]>([]);
  const [totalUniqueToday, setTotalUniqueToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const since = new Date();
      since.setDate(since.getDate() - days);

      const { data, error } = await supabase
        .from('page_visits')
        .select('path, ip_address, visited_at')
        .gte('visited_at', since.toISOString())
        .order('visited_at', { ascending: false });

      if (error) throw error;

      const rows = data || [];

      // Top pages by unique IPs
      const pageMap = new Map<string, Set<string>>();
      const pageTotalMap = new Map<string, number>();
      rows.forEach((row) => {
        if (!pageMap.has(row.path)) pageMap.set(row.path, new Set());
        pageMap.get(row.path)!.add(row.ip_address);
        pageTotalMap.set(row.path, (pageTotalMap.get(row.path) || 0) + 1);
      });

      const pages: PageAnalytics[] = Array.from(pageMap.entries())
        .map(([path, ips]) => ({
          path,
          unique_visitors: ips.size,
          total_visits: pageTotalMap.get(path) || 0,
        }))
        .sort((a, b) => b.unique_visitors - a.unique_visitors);

      setTopPages(pages);

      // Daily unique visitors
      const dailyMap = new Map<string, Set<string>>();
      rows.forEach((row) => {
        const date = row.visited_at.split('T')[0];
        if (!dailyMap.has(date)) dailyMap.set(date, new Set());
        dailyMap.get(date)!.add(row.ip_address);
      });

      const daily: DailyVisits[] = Array.from(dailyMap.entries())
        .map(([date, ips]) => ({ date, unique_visitors: ips.size }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setDailyVisits(daily);

      // Today's unique
      const today = new Date().toISOString().split('T')[0];
      setTotalUniqueToday(dailyMap.get(today)?.size || 0);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setIsLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { topPages, dailyVisits, totalUniqueToday, isLoading, refetch: fetchAnalytics };
}
