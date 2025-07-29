import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Customer Support', session_count: 1250, message_count: 8420, percentage: 35 },
  { name: 'Product Inquiry', session_count: 890, message_count: 5680, percentage: 25 },
  { name: 'Technical Help', session_count: 720, message_count: 6340, percentage: 20 },
  { name: 'Billing', session_count: 450, message_count: 2890, percentage: 12 },
  { name: 'General', session_count: 280, message_count: 1560, percentage: 8 }
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-card-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">Sessions: {data.session_count.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Messages: {data.message_count.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Share: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

export function TopicCategoryDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Category Distribution</CardTitle>
        <CardDescription>
          Distribution of sessions across different topic categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="session_count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}