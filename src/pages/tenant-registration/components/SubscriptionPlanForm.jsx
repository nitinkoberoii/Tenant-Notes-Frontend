import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubscriptionPlanForm = ({ formData, onFormChange, errors, onValidation }) => {
  const [selectedPlan, setSelectedPlan] = useState(formData?.subscriptionPlan || '');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 5 users',
        '100 notes limit',
        '1GB storage',
        'Basic search',
        'Email support',
        'Standard security'
      ],
      limits: {
        users: 5,
        notes: 100,
        storage: '1GB'
      },
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        'Up to 25 users',
        '1,000 notes limit',
        '10GB storage',
        'Advanced search & filters',
        'Priority email support',
        'Enhanced security',
        'Team collaboration',
        'Custom categories'
      ],
      limits: {
        users: 25,
        notes: 1000,
        storage: '10GB'
      },
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'Unlimited users',
        'Unlimited notes',
        '100GB storage',
        'AI-powered search',
        '24/7 phone support',
        'Enterprise security',
        'Advanced permissions',
        'Custom integrations',
        'Audit logs',
        'SLA guarantee'
      ],
      limits: {
        users: 'Unlimited',
        notes: 'Unlimited',
        storage: '100GB'
      },
      popular: false
    }
  ];

  useEffect(() => {
    const isValid = selectedPlan !== '';
    onValidation(isValid);
    onFormChange({ 
      ...formData, 
      subscriptionPlan: selectedPlan,
      billingCycle: billingCycle
    });
  }, [selectedPlan, billingCycle, onValidation]);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan?.monthlyPrice : plan?.yearlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan?.monthlyPrice * 12;
    const yearlyCost = plan?.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CreditCard" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">
          Select the perfect plan for your organization's needs
        </p>
      </div>
      {/* Billing Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-muted rounded-lg p-1 flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              billingCycle === 'monthly' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              billingCycle === 'yearly' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>
      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <div
            key={plan?.id}
            className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedPlan === plan?.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
            } ${plan?.popular ? 'ring-2 ring-primary ring-opacity-20' : ''}`}
            onClick={() => handlePlanSelect(plan?.id)}
          >
            {plan?.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{plan?.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan?.description}</p>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">
                  ${getPrice(plan)}
                </span>
                <span className="text-muted-foreground">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              {billingCycle === 'yearly' && (
                <p className="text-sm text-success font-medium">
                  Save ${getSavings(plan)} per year
                </p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {plan?.features?.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <h4 className="font-medium text-foreground mb-2">Plan Limits</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Users:</span>
                  <span className="font-medium">{plan?.limits?.users}</span>
                </div>
                <div className="flex justify-between">
                  <span>Notes:</span>
                  <span className="font-medium">{plan?.limits?.notes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <span className="font-medium">{plan?.limits?.storage}</span>
                </div>
              </div>
            </div>

            <Button
              variant={selectedPlan === plan?.id ? "default" : "outline"}
              fullWidth
              iconName={selectedPlan === plan?.id ? "Check" : ""}
              iconPosition="left"
            >
              {selectedPlan === plan?.id ? 'Selected' : 'Select Plan'}
            </Button>
          </div>
        ))}
      </div>
      {/* Plan Comparison */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          Plan Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center">
              <Icon name="Shield" size={16} className="text-success mr-2" />
              <span className="text-foreground">Enterprise-grade security</span>
            </div>
            <div className="flex items-center">
              <Icon name="Clock" size={16} className="text-success mr-2" />
              <span className="text-foreground">99.9% uptime guarantee</span>
            </div>
            <div className="flex items-center">
              <Icon name="Download" size={16} className="text-success mr-2" />
              <span className="text-foreground">Data export capabilities</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Icon name="Users" size={16} className="text-success mr-2" />
              <span className="text-foreground">Team collaboration tools</span>
            </div>
            <div className="flex items-center">
              <Icon name="Smartphone" size={16} className="text-success mr-2" />
              <span className="text-foreground">Mobile app access</span>
            </div>
            <div className="flex items-center">
              <Icon name="RefreshCw" size={16} className="text-success mr-2" />
              <span className="text-foreground">Regular backups</span>
            </div>
          </div>
        </div>
      </div>
      {errors?.subscriptionPlan && (
        <div className="text-error text-sm">{errors?.subscriptionPlan}</div>
      )}
    </div>
  );
};

export default SubscriptionPlanForm;