import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PlanCard from './components/PlanCard';
import UsageMetrics from './components/UsageMetrics';
import BillingHistory from './components/BillingHistory';
import PaymentMethods from './components/PaymentMethods';
import UsageAnalytics from './components/UsageAnalytics';

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPlan, setCurrentPlan] = useState('professional');
  
  // Get user data from localStorage
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Mock data for current subscription
  const subscriptionData = {
    currentPlan: {
      name: "Professional",
      price: 49,
      billing: "month",
      status: "active",
      nextBilling: "2025-10-14",
      features: [
        "Up to 1,000 notes",
        "Up to 25 users",
        "50 GB storage",
        "Advanced search",
        "Role-based access",
        "Priority support"
      ]
    },
    usage: {
      notes: { used: 750, limit: 1000 },
      users: { used: 18, limit: 25 },
      storage: { used: 32 * 1024 * 1024 * 1024, limit: 50 * 1024 * 1024 * 1024 }
    }
  };

  // Mock usage metrics data
  const usageMetricsData = [
    {
      type: 'notes',
      name: 'Notes',
      description: 'Total notes created',
      icon: 'FileText',
      used: 750,
      limit: 1000
    },
    {
      type: 'users',
      name: 'Users',
      description: 'Active team members',
      icon: 'Users',
      used: 18,
      limit: 25
    },
    {
      type: 'storage',
      name: 'Storage',
      description: 'File storage used',
      icon: 'HardDrive',
      used: 32 * 1024 * 1024 * 1024,
      limit: 50 * 1024 * 1024 * 1024
    }
  ];

  // Mock subscription plans
  const subscriptionPlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      price: 19,
      billing: 'month',
      features: [
        { name: 'Up to 250 notes', included: true },
        { name: 'Up to 5 users', included: true },
        { name: '10 GB storage', included: true },
        { name: 'Basic search', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced search', included: false },
        { name: 'Role-based access', included: false },
        { name: 'Priority support', included: false }
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      price: 49,
      billing: 'month',
      features: [
        { name: 'Up to 1,000 notes', included: true },
        { name: 'Up to 25 users', included: true },
        { name: '50 GB storage', included: true },
        { name: 'Advanced search', included: true },
        { name: 'Role-based access', included: true },
        { name: 'Priority support', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: false }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      price: 99,
      billing: 'month',
      features: [
        { name: 'Unlimited notes', included: true },
        { name: 'Unlimited users', included: true },
        { name: '500 GB storage', included: true },
        { name: 'Advanced search', included: true },
        { name: 'Role-based access', included: true },
        { name: 'Priority support', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true }
      ]
    }
  ];

  // Mock billing history
  const billingHistoryData = [
    {
      invoiceNumber: 'INV-2024-001',
      description: 'Professional Plan - September 2024',
      amount: 49.00,
      tax: 4.90,
      status: 'paid',
      date: '2024-09-14',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      invoiceNumber: 'INV-2024-002',
      description: 'Professional Plan - August 2024',
      amount: 49.00,
      tax: 4.90,
      status: 'paid',
      date: '2024-08-14',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      invoiceNumber: 'INV-2024-003',
      description: 'Professional Plan - July 2024',
      amount: 49.00,
      tax: 4.90,
      status: 'paid',
      date: '2024-07-14',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      invoiceNumber: 'INV-2024-004',
      description: 'Starter Plan - June 2024',
      amount: 19.00,
      tax: 1.90,
      status: 'paid',
      date: '2024-06-14',
      paymentMethod: 'Visa •••• 4242'
    }
  ];

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'Visa',
      lastFour: '4242',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '5555',
      expiryDate: '08/25',
      isDefault: false
    }
  ]);

  // Mock analytics data
  const analyticsData = {
    notes: {
      '6months': [
        { month: 'Apr', value: 120 },
        { month: 'May', value: 180 },
        { month: 'Jun', value: 250 },
        { month: 'Jul', value: 320 },
        { month: 'Aug', value: 480 },
        { month: 'Sep', value: 750 }
      ]
    },
    users: {
      '6months': [
        { month: 'Apr', value: 8 },
        { month: 'May', value: 12 },
        { month: 'Jun', value: 15 },
        { month: 'Jul', value: 16 },
        { month: 'Aug', value: 17 },
        { month: 'Sep', value: 18 }
      ]
    },
    storage: {
      '6months': [
        { month: 'Apr', value: 5 * 1024 * 1024 * 1024 },
        { month: 'May', value: 12 * 1024 * 1024 * 1024 },
        { month: 'Jun', value: 18 * 1024 * 1024 * 1024 },
        { month: 'Jul', value: 22 * 1024 * 1024 * 1024 },
        { month: 'Aug', value: 28 * 1024 * 1024 * 1024 },
        { month: 'Sep', value: 32 * 1024 * 1024 * 1024 }
      ]
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'plans', label: 'Plans', icon: 'Package' },
    { id: 'billing', label: 'Billing', icon: 'Receipt' },
    { id: 'payment', label: 'Payment', icon: 'CreditCard' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePlanSelect = (plan) => {
    setCurrentPlan(plan?.id);
    // Mock plan change logic
    console.log(`Changing to ${plan?.name} plan`);
  };

  const handleAddPaymentMethod = (newMethod) => {
    const newId = (paymentMethods?.length + 1)?.toString();
    const cardType = newMethod?.cardNumber?.startsWith('4') ? 'Visa' : 
                    newMethod?.cardNumber?.startsWith('5') ? 'Mastercard' : 'Card';
    
    setPaymentMethods(prev => [...prev, {
      id: newId,
      type: cardType,
      lastFour: newMethod?.cardNumber?.slice(-4),
      expiryDate: newMethod?.expiryDate,
      isDefault: paymentMethods?.length === 0
    }]);
  };

  const handleRemovePaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev?.filter(method => method?.id !== methodId));
  };

  const handleSetDefaultPaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev?.map(method => ({
      ...method,
      isDefault: method?.id === methodId
    })));
  };

  useEffect(() => {
    document.title = 'Subscription Management - TenantNotes';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Subscription Management"
        description="Manage your subscription, billing, and usage limits"
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="admin"
      />
      <main className={`transition-all duration-300 pt-16 pb-20 md:pb-6 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'
      }`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            {/* Plan Status and Actions Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Current Plan Status - 65% width */}
              <div className="lg:w-[65%] bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <Icon name="Package" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {subscriptionData?.currentPlan?.name} Plan
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(subscriptionData?.currentPlan?.price)}/month • 
                        Next billing: {formatDate(subscriptionData?.currentPlan?.nextBilling)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - 35% width */}
              <div className="lg:w-[35%] flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export subscription data')}
                >
                  Export Data
                </Button>
                <Button
                  variant="default"
                  iconName="CreditCard"
                  iconPosition="left"
                  onClick={() => setActiveTab('payment')}
                >
                  Manage Billing
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <UsageMetrics usageData={usageMetricsData} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-surface border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="ArrowUp"
                        iconPosition="left"
                        onClick={() => setActiveTab('plans')}
                      >
                        Upgrade Plan
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="CreditCard"
                        iconPosition="left"
                        onClick={() => setActiveTab('payment')}
                      >
                        Update Payment Method
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Download"
                        iconPosition="left"
                        onClick={() => setActiveTab('billing')}
                      >
                        Download Invoices
                      </Button>
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Support & Resources</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-foreground">Need Help?</h4>
                          <p className="text-sm text-muted-foreground">
                            Contact our support team for assistance with your subscription.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Icon name="FileText" size={20} className="text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-foreground">Documentation</h4>
                          <p className="text-sm text-muted-foreground">
                            Learn more about features and best practices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'plans' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {subscriptionPlans?.map((plan) => (
                  <PlanCard
                    key={plan?.id}
                    plan={plan}
                    isCurrentPlan={plan?.id === currentPlan}
                    isRecommended={plan?.id === 'professional'}
                    onSelectPlan={handlePlanSelect}
                  />
                ))}
              </div>
            )}

            {activeTab === 'billing' && (
              <BillingHistory billingData={billingHistoryData} />
            )}

            {activeTab === 'payment' && (
              <PaymentMethods
                paymentMethods={paymentMethods}
                onAddMethod={handleAddPaymentMethod}
                onRemoveMethod={handleRemovePaymentMethod}
                onSetDefault={handleSetDefaultPaymentMethod}
              />
            )}

            {activeTab === 'analytics' && (
              <div className="bg-surface border border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                    <Icon name="TrendingUp" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Analytics Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md">
                      Advanced analytics and usage insights are currently under development. 
                      This feature will provide detailed reports, trends, and actionable insights 
                      to help you optimize your subscription usage.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>Expected release: Q4 2025</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionManagement;