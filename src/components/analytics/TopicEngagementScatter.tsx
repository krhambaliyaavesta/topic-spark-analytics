import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { topic: 'Password Reset', avg_user_messages: 8.5, avg_session_minutes: 12.3, session_count: 450, category: 'Technical Help' },
  { topic: 'Payment Issues', avg_user_messages: 6.2, avg_session_minutes: 18.7, session_count: 320, category: 'Billing' },
  { topic: 'Product Features', avg_user_messages: 4.8, avg_session_minutes: 8.2, session_count: 680, category: 'Product Inquiry' },
  { topic: 'Account Setup', avg_user_messages: 7.1, avg_session_minutes: 15.4, session_count: 290, category: 'Customer Support' },
  { topic: 'Refund Request', avg_user_messages: 9.3, avg_session_minutes: 22.1, session_count: 180, category: 'Billing' },
  { topic: 'Bug Report', avg_user_messages: 11.2, avg_session_minutes: 28.5, session_count: 95, category: 'Technical Help' },
  { topic: 'General Question', avg_user_messages: 3.4, avg_session_minutes: 4.8, session_count: 520, category: 'General' },
  { topic: 'Upgrade Info', avg_user_messages: 5.6, avg_session_minutes: 9.7, session_count: 340, category: 'Product Inquiry' },
  { topic: 'Login Issues', avg_user_messages: 6.8, avg_session_minutes: 11.2, session_count: 410, category: 'Technical Help' },
  { topic: 'Pricing Info', avg_user_messages: 4.2, avg_session_minutes: 6.5, session_count: 380, category: 'Product Inquiry' }
];

const categoryColors: { [key: string]: string } = {
  'Technical Help': 'hsl(var(--chart-1))',
  'Billing': 'hsl(var(--chart-2))',
  'Product Inquiry': 'hsl(var(--chart-3))',
  'Customer Support': 'hsl(var(--chart-4))',
  'General': 'hsl(var(--chart-5))'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 border rounded-lg shadow-lg min-w-[200px]">
        <p className="font-medium text-card-foreground mb-2">{data.topic}</p>
        <p className="text-sm text-muted-foreground">Category: {data.category}</p>
        <p className="text-sm text-muted-foreground">Avg User Messages: {data.avg_user_messages}</p>
        <p className="text-sm text-muted-foreground">Avg Duration: {data.avg_session_minutes} min</p>
        <p className="text-sm text-muted-foreground">Sessions: {data.session_count}</p>
      </div>
    );
  }
  return null;
};

export function TopicEngagementScatter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Engagement Analysis</CardTitle>
        <CardDescription>
          Relationship between user engagement (messages) and session duration by topic
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="avg_user_messages" 
              name="Avg User Messages"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="avg_session_minutes" 
              name="Avg Session Duration (min)"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={data} fill="hsl(var(--chart-1))">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categoryColors[entry.category]} 
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
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