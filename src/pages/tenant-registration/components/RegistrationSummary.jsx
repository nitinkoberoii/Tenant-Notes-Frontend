import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationSummary = ({ formData, onEdit, onSubmit, isSubmitting }) => {
  const planDetails = {
    starter: { name: 'Starter', price: 29, users: 5, notes: 100, storage: '1GB' },
    professional: { name: 'Professional', price: 79, users: 25, notes: 1000, storage: '10GB' },
    enterprise: { name: 'Enterprise', price: 199, users: 'Unlimited', notes: 'Unlimited', storage: '100GB' }
  };

  const selectedPlan = planDetails?.[formData?.subscriptionPlan] || planDetails?.starter;
  const totalPrice = formData?.billingCycle === 'yearly' 
    ? selectedPlan?.price * 10 
    : selectedPlan?.price;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Confirm</h2>
        <p className="text-muted-foreground">
          Please review your information before completing registration
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Icon name="Building" size={20} className="mr-2 text-primary" />
              Company Information
            </h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              iconSize={16}
              onClick={() => onEdit(1)}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Organization Name</p>
              <p className="font-medium text-foreground">{formData?.organizationName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Domain</p>
              <p className="font-medium text-foreground">{formData?.domain}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Industry</p>
              <p className="font-medium text-foreground">{formData?.industry}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company Size</p>
              <p className="font-medium text-foreground">{formData?.companySize}</p>
            </div>
          </div>
        </div>

        {/* Administrator Account */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Icon name="UserPlus" size={20} className="mr-2 text-primary" />
              Administrator Account
            </h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              iconSize={16}
              onClick={() => onEdit(2)}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">
                {formData?.firstName} {formData?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium text-foreground">{formData?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Password</p>
              <p className="font-medium text-foreground">••••••••••</p>
            </div>
          </div>
        </div>

        {/* Subscription Plan */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
              Subscription Plan
            </h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              iconSize={16}
              onClick={() => onEdit(3)}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Selected Plan</p>
              <p className="font-medium text-foreground">{selectedPlan?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Billing Cycle</p>
              <p className="font-medium text-foreground capitalize">{formData?.billingCycle}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-medium text-foreground">
                ${totalPrice}/{formData?.billingCycle === 'yearly' ? 'year' : 'month'}
              </p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-sm text-muted-foreground mb-2">Plan Limits</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <p className="font-medium text-foreground">{selectedPlan?.users}</p>
                  <p className="text-muted-foreground">Users</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{selectedPlan?.notes}</p>
                  <p className="text-muted-foreground">Notes</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{selectedPlan?.storage}</p>
                  <p className="text-muted-foreground">Storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Icon name="FileCheck" size={20} className="mr-2 text-primary" />
              Legal & Compliance
            </h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              iconSize={16}
              onClick={() => onEdit(4)}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span className="text-sm text-foreground">Terms of Service accepted</span>
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span className="text-sm text-foreground">Privacy Policy accepted</span>
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span className="text-sm text-foreground">GDPR compliance confirmed</span>
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span className="text-sm text-foreground">Data processing consent given</span>
            </div>
            {formData?.marketingEmails && (
              <div className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                <span className="text-sm text-foreground">Marketing emails opted in</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="ArrowRight" size={20} className="mr-2 text-primary" />
          What happens next?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              1
            </div>
            <div>
              <p className="font-medium text-foreground">Account Creation</p>
              <p className="text-sm text-muted-foreground">
                Your tenant environment will be created instantly
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              2
            </div>
            <div>
              <p className="font-medium text-foreground">Email Verification</p>
              <p className="text-sm text-muted-foreground">
                Check your email for domain verification
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              3
            </div>
            <div>
              <p className="font-medium text-foreground">Start Using</p>
              <p className="text-sm text-muted-foreground">
                Access your dashboard and begin managing notes
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName={isSubmitting ? "" : "CheckCircle"}
          iconPosition="left"
          onClick={onSubmit}
          className="px-8"
        >
          {isSubmitting ? 'Creating Your Account...' : 'Complete Registration'}
        </Button>
      </div>
      {/* Security Notice */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Secure Registration</h4>
            <p className="text-sm text-muted-foreground">
              Your information is encrypted and will be processed securely. We'll never share 
              your data with third parties and you can delete your account at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSummary;