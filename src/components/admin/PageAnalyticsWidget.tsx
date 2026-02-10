import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BarChart3, Globe, Users } from 'lucide-react';

export function PageAnalyticsWidget() {
  const { topPages, totalUniqueToday, dailyVisits, isLoading } = usePageAnalytics(30);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const totalVisitsLast30 = topPages.reduce((sum, p) => sum + p.total_visits, 0);
  const totalUniqueLast30 = new Set(
    dailyVisits.flatMap(() => []) // approximate from daily
  ).size;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Visitors Today
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUniqueToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visits (30d)
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitsLast30}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pages Tracked
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPages.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Most Visited Pages</CardTitle>
          <CardDescription>Top pages by unique visitors in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              No visit data yet. Tracking will begin once visitors browse your site.
            </p>
          ) : (
            <div className="space-y-3">
              {topPages.slice(0, 10).map((page, i) => {
                const maxVisitors = topPages[0]?.unique_visitors || 1;
                const widthPercent = (page.unique_visitors / maxVisitors) * 100;

                return (
                  <div key={page.path} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground truncate max-w-[60%]">
                        {page.path}
                      </span>
                      <span className="text-muted-foreground">
                        {page.unique_visitors} unique · {page.total_visits} total
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Trend */}
      {dailyVisits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Unique Visitors</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-32">
              {dailyVisits.slice(-30).map((day) => {
                const maxDaily = Math.max(...dailyVisits.map((d) => d.unique_visitors), 1);
                const heightPercent = (day.unique_visitors / maxDaily) * 100;

                return (
                  <div
                    key={day.date}
                    className="flex-1 bg-primary/80 hover:bg-primary rounded-t transition-colors cursor-default group relative"
                    style={{ height: `${Math.max(heightPercent, 4)}%` }}
                    title={`${day.date}: ${day.unique_visitors} unique visitors`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{dailyVisits[0]?.date}</span>
              <span>{dailyVisits[dailyVisits.length - 1]?.date}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
