import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UsageAnalytics = ({ analyticsData, className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState('notes');
  const [timeRange, setTimeRange] = useState('6months');

  const metricOptions = [
    { value: 'notes', label: 'Notes Created', icon: 'FileText', color: '#2563EB' },
    { value: 'users', label: 'Active Users', icon: 'Users', color: '#059669' },
    { value: 'storage', label: 'Storage Used', icon: 'HardDrive', color: '#7C3AED' }
  ];

  const timeRangeOptions = [
    { value: '3months', label: 'Last 3 months' },
    { value: '6months', label: 'Last 6 months' },
    { value: '12months', label: 'Last 12 months' }
  ];

  const currentMetric = metricOptions?.find(m => m?.value === selectedMetric);
  const chartData = analyticsData?.[selectedMetric]?.[timeRange] || [];

  const formatValue = (value, metric) => {
    if (metric === 'storage') {
      return `${(value / 1024)?.toFixed(1)} GB`;
    }
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const formatTooltipValue = (value, name) => {
    return [formatValue(value, selectedMetric), currentMetric?.label];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            {`${currentMetric?.label}: ${formatValue(payload?.[0]?.value, selectedMetric)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const pieData = [
    { name: 'Notes', value: 450, color: '#2563EB' },
    { name: 'Users', value: 25, color: '#059669' },
    { name: 'Storage', value: 15, color: '#7C3AED' }
  ];

  const growthData = [
    { month: 'Jan', growth: 12 },
    { month: 'Feb', growth: 18 },
    { month: 'Mar', growth: 25 },
    { month: 'Apr', growth: 22 },
    { month: 'May', growth: 35 },
    { month: 'Jun', growth: 28 }
  ];

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Usage Analytics</h3>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeRangeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metricOptions?.map(metric => (
          <button
            key={metric?.value}
            onClick={() => setSelectedMetric(metric?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedMetric === metric?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={metric?.icon} size={16} />
            <span>{metric?.label}</span>
          </button>
        ))}
      </div>
      {/* Main Chart */}
      <div className="mb-8">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => formatValue(value, selectedMetric)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={currentMetric?.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Trend */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Growth Trend</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Growth']}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#059669" 
                  strokeWidth={2}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Usage Distribution</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [formatValue(value, name?.toLowerCase()), name]}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {pieData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-muted-foreground">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Peak Usage</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Highest activity in March with 35% growth month-over-month
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">User Engagement</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Average of 18 notes created per user this month
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Forecast</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Projected to reach 80% of limits by next month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;