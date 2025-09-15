import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageMetrics = ({ usageData, className = '' }) => {
  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  const formatStorage = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb?.toFixed(1)} GB`;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Usage Overview</h3>
        <div className="text-xs text-muted-foreground">
          Updated: {new Date()?.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      <div className="space-y-6">
        {usageData?.map((metric, index) => {
          const percentage = (metric?.used / metric?.limit) * 100;
          
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    metric?.type === 'notes' ? 'bg-blue-100' :
                    metric?.type === 'users'? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <Icon 
                      name={metric?.icon} 
                      size={16} 
                      className={
                        metric?.type === 'notes' ? 'text-blue-600' :
                        metric?.type === 'users'? 'text-green-600' : 'text-purple-600'
                      }
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{metric?.name}</h4>
                    <p className="text-sm text-muted-foreground">{metric?.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getUsageColor(percentage)}`}>
                    {metric?.type === 'storage' 
                      ? formatStorage(metric?.used) 
                      : formatNumber(metric?.used)
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of {metric?.type === 'storage' 
                      ? formatStorage(metric?.limit) 
                      : formatNumber(metric?.limit)
                    }
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {percentage?.toFixed(1)}% used
                  </span>
                  {percentage >= 80 && (
                    <span className={`font-medium ${getUsageColor(percentage)}`}>
                      {percentage >= 90 ? 'Limit reached' : 'Approaching limit'}
                    </span>
                  )}
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
              {percentage >= 80 && (
                <div className={`flex items-center space-x-2 p-3 rounded-md ${
                  percentage >= 90 ? 'bg-error/10 border border-error/20' : 'bg-warning/10 border border-warning/20'
                }`}>
                  <Icon 
                    name={percentage >= 90 ? "AlertCircle" : "AlertTriangle"} 
                    size={16} 
                    className={percentage >= 90 ? 'text-error' : 'text-warning'} 
                  />
                  <p className="text-sm text-foreground">
                    {percentage >= 90 
                      ? `You've reached your ${metric?.name?.toLowerCase()} limit. Upgrade to continue.`
                      : `You're approaching your ${metric?.name?.toLowerCase()} limit.`
                    }
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsageMetrics;