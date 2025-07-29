import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  {
    confidence_level: 'High (>0.8)',
    session_count: 2180,
    avg_messages_per_session: 6.8,
    percentage: 62
  },
  {
    confidence_level: 'Medium (0.5-0.8)',
    session_count: 980,
    avg_messages_per_session: 8.2,
    percentage: 28
  },
  {
    confidence_level: 'Low (<0.5)',
    session_count: 350,
    avg_messages_per_session: 12.4,
    percentage: 10
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-card-foreground mb-2">{label}</p>
        <p className="text-sm text-muted-foreground">Sessions: {data.session_count.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Avg Messages: {data.avg_messages_per_session}</p>
        <p className="text-sm text-muted-foreground">Share: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

export function TopicConfidenceDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Confidence Distribution</CardTitle>
        <CardDescription>
          Session distribution by topic classification confidence levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="confidence_level" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="session_count" 
              fill="hsl(var(--chart-1))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Additional insights */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{item.percentage}%</div>
              <div className="text-sm text-muted-foreground">{item.confidence_level}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.avg_messages_per_session} avg msgs
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}