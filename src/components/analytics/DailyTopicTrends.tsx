import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { date: '2024-01-01', 'Customer Support': 85, 'Product Inquiry': 65, 'Technical Help': 45, 'Billing': 25, 'General': 15 },
  { date: '2024-01-02', 'Customer Support': 92, 'Product Inquiry': 58, 'Technical Help': 52, 'Billing': 28, 'General': 18 },
  { date: '2024-01-03', 'Customer Support': 78, 'Product Inquiry': 72, 'Technical Help': 48, 'Billing': 22, 'General': 12 },
  { date: '2024-01-04', 'Customer Support': 89, 'Product Inquiry': 69, 'Technical Help': 55, 'Billing': 32, 'General': 20 },
  { date: '2024-01-05', 'Customer Support': 95, 'Product Inquiry': 75, 'Technical Help': 62, 'Billing': 35, 'General': 22 },
  { date: '2024-01-06', 'Customer Support': 88, 'Product Inquiry': 68, 'Technical Help': 58, 'Billing': 30, 'General': 16 },
  { date: '2024-01-07', 'Customer Support': 82, 'Product Inquiry': 61, 'Technical Help': 49, 'Billing': 27, 'General': 14 }
];

export function DailyTopicTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Topic Trends</CardTitle>
        <CardDescription>
          Session count trends by topic category over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Customer Support" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Product Inquiry" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Technical Help" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Billing" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="General" 
              stroke="hsl(var(--chart-5))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-5))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}