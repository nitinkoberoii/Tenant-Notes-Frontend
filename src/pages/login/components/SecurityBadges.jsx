import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'CheckCircle',
      label: 'SOC2 Compliant',
      description: 'Type II certified'
    },
    {
      icon: 'Lock',
      label: 'Enterprise Security',
      description: 'Bank-grade protection'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium">
          Trusted by 10,000+ organizations worldwide
        </p>
      </div>
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full mb-2">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div className="text-xs font-medium text-foreground">{feature?.label}</div>
            <div className="text-xs text-muted-foreground">{feature?.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;