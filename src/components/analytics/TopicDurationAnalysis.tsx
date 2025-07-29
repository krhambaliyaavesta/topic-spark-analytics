import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { topic_label: 'Bug Report', avg_duration_seconds: 1710, avg_messages: 11.2, avg_user_messages: 8.5, category: 'Technical Help' },
  { topic_label: 'Refund Request', avg_duration_seconds: 1326, avg_messages: 9.3, avg_user_messages: 6.8, category: 'Billing' },
  { topic_label: 'Account Setup', avg_duration_seconds: 924, avg_messages: 7.1, avg_user_messages: 5.2, category: 'Customer Support' },
  { topic_label: 'Password Reset', avg_duration_seconds: 738, avg_messages: 8.5, avg_user_messages: 6.1, category: 'Technical Help' },
  { topic_label: 'Payment Issues', avg_duration_seconds: 1122, avg_messages: 6.2, avg_user_messages: 4.8, category: 'Billing' },
  { topic_label: 'Product Features', avg_duration_seconds: 492, avg_messages: 4.8, avg_user_messages: 3.5, category: 'Product Inquiry' },
  { topic_label: 'Login Issues', avg_duration_seconds: 672, avg_messages: 6.8, avg_user_messages: 4.9, category: 'Technical Help' },
  { topic_label: 'Upgrade Info', avg_duration_seconds: 582, avg_messages: 5.6, avg_user_messages: 4.1, category: 'Product Inquiry' },
  { topic_label: 'Pricing Info', avg_duration_seconds: 390, avg_messages: 4.2, avg_user_messages: 3.1, category: 'Product Inquiry' },
  { topic_label: 'General Question', avg_duration_seconds: 288, avg_messages: 3.4, avg_user_messages: 2.5, category: 'General' }
];

const categoryColors: { [key: string]: string } = {
  'Technical Help': 'hsl(var(--chart-1))',
  'Billing': 'hsl(var(--chart-2))',
  'Product Inquiry': 'hsl(var(--chart-3))',
  'Customer Support': 'hsl(var(--chart-4))',
  'General': 'hsl(var(--chart-5))'
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 border rounded-lg shadow-lg min-w-[200px]">
        <p className="font-medium text-card-foreground mb-2">{label}</p>
        <p className="text-sm text-muted-foreground">Category: {data.category}</p>
        <p className="text-sm text-muted-foreground">Avg Duration: {formatDuration(data.avg_duration_seconds)}</p>
        <p className="text-sm text-muted-foreground">Avg Messages: {data.avg_messages}</p>
        <p className="text-sm text-muted-foreground">User Messages: {data.avg_user_messages}</p>
      </div>
    );
  }
  return null;
};

export function TopicDurationAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Duration Analysis</CardTitle>
        <CardDescription>
          Average session duration by topic, showing engagement levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={data} 
            margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number"
              tickFormatter={(value) => formatDuration(value)}
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="topic_label" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="avg_duration_seconds" 
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categoryColors[entry.category]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Category legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span className="text-muted-foreground">{category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}