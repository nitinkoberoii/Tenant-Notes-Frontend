import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PlanCard = ({ 
  plan, 
  isCurrentPlan = false, 
  isRecommended = false, 
  onSelectPlan,
  className = '' 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className={`relative bg-surface border border-border rounded-lg p-6 transition-all duration-200 hover:shadow-md ${
      isCurrentPlan ? 'ring-2 ring-primary border-primary' : ''
    } ${className}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Recommended
          </span>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="CheckCircle" size={12} />
            <span>Current Plan</span>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{plan?.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{plan?.description}</p>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(plan?.price)}
          </span>
          <span className="text-sm text-muted-foreground">/{plan?.billing}</span>
        </div>

        <div className="space-y-3">
          {plan?.features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon 
                name={feature?.included ? "Check" : "X"} 
                size={16} 
                className={feature?.included ? "text-success mt-0.5" : "text-muted-foreground mt-0.5"} 
              />
              <span className={`text-sm ${
                feature?.included ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {feature?.name}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          {isCurrentPlan ? (
            <Button variant="outline" fullWidth disabled>
              Current Plan
            </Button>
          ) : (
            <Button 
              variant={isRecommended ? "default" : "outline"} 
              fullWidth
              onClick={() => onSelectPlan(plan)}
            >
              {plan?.price > 0 ? 'Upgrade to ' + plan?.name : 'Downgrade to ' + plan?.name}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;