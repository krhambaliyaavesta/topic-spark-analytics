import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { topic: 'Password Reset', avg_topic_confidence: 0.92, hallucination_rate: 0.08, session_count: 450, avg_fallback_count: 0.2 },
  { topic: 'Payment Issues', avg_topic_confidence: 0.85, hallucination_rate: 0.12, session_count: 320, avg_fallback_count: 0.4 },
  { topic: 'Product Features', avg_topic_confidence: 0.78, hallucination_rate: 0.15, session_count: 680, avg_fallback_count: 0.6 },
  { topic: 'Account Setup', avg_topic_confidence: 0.88, hallucination_rate: 0.09, session_count: 290, avg_fallback_count: 0.3 },
  { topic: 'Refund Request', avg_topic_confidence: 0.82, hallucination_rate: 0.18, session_count: 180, avg_fallback_count: 0.7 },
  { topic: 'Bug Report', avg_topic_confidence: 0.65, hallucination_rate: 0.28, session_count: 95, avg_fallback_count: 1.2 },
  { topic: 'General Question', avg_topic_confidence: 0.45, hallucination_rate: 0.35, session_count: 520, avg_fallback_count: 1.8 },
  { topic: 'Upgrade Info', avg_topic_confidence: 0.75, hallucination_rate: 0.16, session_count: 340, avg_fallback_count: 0.5 },
  { topic: 'Login Issues', avg_topic_confidence: 0.89, hallucination_rate: 0.07, session_count: 410, avg_fallback_count: 0.3 },
  { topic: 'Pricing Info', avg_topic_confidence: 0.81, hallucination_rate: 0.14, session_count: 380, avg_fallback_count: 0.4 }
];

const getQualityColor = (hallucination_rate: number) => {
  if (hallucination_rate < 0.1) return 'hsl(var(--chart-3))'; // Green for good quality
  if (hallucination_rate < 0.2) return 'hsl(var(--chart-7))'; // Yellow for medium quality
  return 'hsl(var(--chart-5))'; // Red for poor quality
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 border rounded-lg shadow-lg min-w-[220px]">
        <p className="font-medium text-card-foreground mb-2">{data.topic}</p>
        <p className="text-sm text-muted-foreground">Confidence: {(data.avg_topic_confidence * 100).toFixed(1)}%</p>
        <p className="text-sm text-muted-foreground">Hallucination Rate: {(data.hallucination_rate * 100).toFixed(1)}%</p>
        <p className="text-sm text-muted-foreground">Avg Fallbacks: {data.avg_fallback_count}</p>
        <p className="text-sm text-muted-foreground">Sessions: {data.session_count}</p>
      </div>
    );
  }
  return null;
};

export function TopicQualityCorrelation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Quality Correlation</CardTitle>
        <CardDescription>
          Relationship between topic confidence and response quality metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="avg_topic_confidence" 
              name="Topic Confidence"
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="hallucination_rate" 
              name="Hallucination Rate"
              domain={[0, 0.4]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={data} fill="hsl(var(--chart-1))">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getQualityColor(entry.hallucination_rate)} 
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* Quality legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: 'hsl(var(--chart-3))' }}
            />
            <span className="text-muted-foreground">Good Quality (&lt;10% hallucination)</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: 'hsl(var(--chart-7))' }}
            />
            <span className="text-muted-foreground">Medium Quality (10-20% hallucination)</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: 'hsl(var(--chart-5))' }}
            />
            <span className="text-muted-foreground">Poor Quality (&gt;20% hallucination)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}