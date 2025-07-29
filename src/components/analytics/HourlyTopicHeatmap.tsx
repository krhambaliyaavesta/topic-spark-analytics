import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { hour: 0, 'Customer Support': 12, 'Product Inquiry': 8, 'Technical Help': 6, 'Billing': 4, 'General': 2 },
  { hour: 1, 'Customer Support': 8, 'Product Inquiry': 5, 'Technical Help': 4, 'Billing': 2, 'General': 1 },
  { hour: 2, 'Customer Support': 6, 'Product Inquiry': 3, 'Technical Help': 2, 'Billing': 1, 'General': 1 },
  { hour: 3, 'Customer Support': 4, 'Product Inquiry': 2, 'Technical Help': 2, 'Billing': 1, 'General': 0 },
  { hour: 4, 'Customer Support': 5, 'Product Inquiry': 3, 'Technical Help': 2, 'Billing': 1, 'General': 1 },
  { hour: 5, 'Customer Support': 8, 'Product Inquiry': 5, 'Technical Help': 4, 'Billing': 2, 'General': 1 },
  { hour: 6, 'Customer Support': 15, 'Product Inquiry': 12, 'Technical Help': 8, 'Billing': 5, 'General': 3 },
  { hour: 7, 'Customer Support': 25, 'Product Inquiry': 18, 'Technical Help': 12, 'Billing': 8, 'General': 5 },
  { hour: 8, 'Customer Support': 35, 'Product Inquiry': 28, 'Technical Help': 18, 'Billing': 12, 'General': 8 },
  { hour: 9, 'Customer Support': 45, 'Product Inquiry': 35, 'Technical Help': 25, 'Billing': 15, 'General': 10 },
  { hour: 10, 'Customer Support': 55, 'Product Inquiry': 42, 'Technical Help': 32, 'Billing': 18, 'General': 12 },
  { hour: 11, 'Customer Support': 62, 'Product Inquiry': 48, 'Technical Help': 38, 'Billing': 22, 'General': 15 },
  { hour: 12, 'Customer Support': 58, 'Product Inquiry': 45, 'Technical Help': 35, 'Billing': 20, 'General': 14 },
  { hour: 13, 'Customer Support': 65, 'Product Inquiry': 52, 'Technical Help': 42, 'Billing': 25, 'General': 18 },
  { hour: 14, 'Customer Support': 72, 'Product Inquiry': 58, 'Technical Help': 48, 'Billing': 28, 'General': 20 },
  { hour: 15, 'Customer Support': 68, 'Product Inquiry': 55, 'Technical Help': 45, 'Billing': 26, 'General': 18 },
  { hour: 16, 'Customer Support': 75, 'Product Inquiry': 62, 'Technical Help': 52, 'Billing': 32, 'General': 22 },
  { hour: 17, 'Customer Support': 70, 'Product Inquiry': 58, 'Technical Help': 48, 'Billing': 30, 'General': 20 },
  { hour: 18, 'Customer Support': 52, 'Product Inquiry': 42, 'Technical Help': 35, 'Billing': 22, 'General': 15 },
  { hour: 19, 'Customer Support': 45, 'Product Inquiry': 35, 'Technical Help': 28, 'Billing': 18, 'General': 12 },
  { hour: 20, 'Customer Support': 38, 'Product Inquiry': 28, 'Technical Help': 22, 'Billing': 15, 'General': 8 },
  { hour: 21, 'Customer Support': 32, 'Product Inquiry': 25, 'Technical Help': 18, 'Billing': 12, 'General': 6 },
  { hour: 22, 'Customer Support': 25, 'Product Inquiry': 18, 'Technical Help': 14, 'Billing': 8, 'General': 4 },
  { hour: 23, 'Customer Support': 18, 'Product Inquiry': 12, 'Technical Help': 8, 'Billing': 5, 'General': 3 }
];

const categories = ['Customer Support', 'Product Inquiry', 'Technical Help', 'Billing', 'General'];

const getIntensityColor = (value: number, max: number) => {
  const intensity = value / max;
  if (intensity === 0) return 'hsl(var(--muted))';
  if (intensity < 0.2) return 'hsl(var(--chart-1) / 0.2)';
  if (intensity < 0.4) return 'hsl(var(--chart-1) / 0.4)';
  if (intensity < 0.6) return 'hsl(var(--chart-1) / 0.6)';
  if (intensity < 0.8) return 'hsl(var(--chart-1) / 0.8)';
  return 'hsl(var(--chart-1))';
};

const maxValue = Math.max(...data.flatMap(d => categories.map(cat => d[cat as keyof typeof d] as number)));

export function HourlyTopicHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Topic Distribution</CardTitle>
        <CardDescription>
          Session volume by hour of day across different topic categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-[80px_repeat(24,1fr)] gap-1 mb-2">
              <div></div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-xs text-center text-muted-foreground p-1">
                  {i.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
            
            {/* Heatmap */}
            {categories.map((category) => (
              <div key={category} className="grid grid-cols-[80px_repeat(24,1fr)] gap-1 mb-1">
                <div className="text-xs text-right pr-2 py-2 text-muted-foreground font-medium">
                  {category}
                </div>
                {data.map((hourData) => {
                  const value = hourData[category as keyof typeof hourData] as number;
                  return (
                    <div
                      key={hourData.hour}
                      className="h-8 rounded flex items-center justify-center text-xs font-medium border border-border/20"
                      style={{ backgroundColor: getIntensityColor(value, maxValue) }}
                      title={`${category} at ${hourData.hour}:00 - ${value} sessions`}
                    >
                      {value > 0 ? value : ''}
                    </div>
                  );
                })}
              </div>
            ))}
            
            {/* Legend */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Low</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--muted))' }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1) / 0.2)' }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1) / 0.4)' }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1) / 0.6)' }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1) / 0.8)' }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1))' }}></div>
              </div>
              <span>High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}