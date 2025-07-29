import { TopicCategoryDistribution } from './TopicCategoryDistribution';
import { DailyTopicTrends } from './DailyTopicTrends';
import { TopicEngagementScatter } from './TopicEngagementScatter';
import { HourlyTopicHeatmap } from './HourlyTopicHeatmap';
import { TopicConfidenceDistribution } from './TopicConfidenceDistribution';
import { TopicQualityCorrelation } from './TopicQualityCorrelation';
import { TopicDurationAnalysis } from './TopicDurationAnalysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MetricCard = ({ title, value, description, trend }: {
  title: string;
  value: string;
  description: string;
  trend?: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        {trend && (
          <div className="text-sm text-chart-3 font-medium">
            {trend}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export function TopicAnalyticsDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-accent/5 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Topic-Based Session Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insights into conversation topics and user engagement patterns
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Sessions"
          value="3,510"
          description="This month"
          trend="+12.5%"
        />
        <MetricCard
          title="Avg Session Duration"
          value="11.2 min"
          description="Across all topics"
          trend="+3.2%"
        />
        <MetricCard
          title="Topic Confidence"
          value="82.4%"
          description="Average confidence"
          trend="+5.8%"
        />
        <MetricCard
          title="Active Topics"
          value="47"
          description="Identified topics"
          trend="+2"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="temporal">Temporal</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopicCategoryDistribution />
            <TopicConfidenceDistribution />
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <TopicEngagementScatter />
          <TopicDurationAnalysis />
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <TopicQualityCorrelation />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Insights</CardTitle>
                <CardDescription>Key findings from topic quality analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                  <h4 className="font-medium text-chart-3 mb-2">High Confidence Topics</h4>
                  <p className="text-sm text-muted-foreground">
                    Password Reset and Login Issues show 89%+ confidence with low hallucination rates (&lt;8%)
                  </p>
                </div>
                <div className="p-4 bg-chart-7/10 rounded-lg border border-chart-7/20">
                  <h4 className="font-medium text-chart-7 mb-2">Needs Improvement</h4>
                  <p className="text-sm text-muted-foreground">
                    General Questions and Bug Reports have higher fallback rates and need model refinement
                  </p>
                </div>
                <div className="p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
                  <h4 className="font-medium text-chart-1 mb-2">Correlation Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    Strong negative correlation (-0.78) between topic confidence and hallucination rate
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Actionable insights for improvement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-chart-1 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Enhance General Question Handling</p>
                      <p className="text-xs text-muted-foreground">Add more training data for ambiguous queries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Optimize Peak Hour Performance</p>
                      <p className="text-xs text-muted-foreground">Scale resources during 1-4 PM high traffic</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Leverage High-Performing Topics</p>
                      <p className="text-xs text-muted-foreground">Use successful patterns for model improvements</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="temporal" className="space-y-6">
          <DailyTopicTrends />
          <HourlyTopicHeatmap />
        </TabsContent>
      </Tabs>
    </div>
  );
}