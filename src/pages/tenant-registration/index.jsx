import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import CompanyInformationForm from './components/CompanyInformationForm';
import AdminAccountForm from './components/AdminAccountForm';
import SubscriptionPlanForm from './components/SubscriptionPlanForm';
import ComplianceForm from './components/ComplianceForm';
import RegistrationSummary from './components/RegistrationSummary';

const TenantRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepValidation, setStepValidation] = useState({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const [formData, setFormData] = useState({
    // Company Information
    organizationName: '',
    domain: '',
    industry: '',
    companySize: '',
    description: '',
    
    // Admin Account
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Subscription
    subscriptionPlan: '',
    billingCycle: 'monthly',
    
    // Compliance
    termsOfService: false,
    privacyPolicy: false,
    gdprCompliance: false,
    dataProcessing: false,
    marketingEmails: false
  });

  const [errors, setErrors] = useState({});

  const steps = [
    {
      id: 1,
      title: 'Company',
      description: 'Enter your organization details'
    },
    {
      id: 2,
      title: 'Admin',
      description: 'Create administrator account'
    },
    {
      id: 3,
      title: 'Plan',
      description: 'Choose your subscription plan'
    },
    {
      id: 4,
      title: 'Legal',
      description: 'Accept terms and compliance'
    },
    {
      id: 5,
      title: 'Review',
      description: 'Review and confirm registration'
    }
  ];

  useEffect(() => {
    // Clear errors when step changes
    setErrors({});
  }, [currentStep]);

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData?.organizationName) newErrors.organizationName = 'Organization name is required';
        if (!formData?.domain) newErrors.domain = 'Domain is required';
        if (!formData?.industry) newErrors.industry = 'Industry is required';
        if (!formData?.companySize) newErrors.companySize = 'Company size is required';
        break;

      case 2:
        if (!formData?.firstName) newErrors.firstName = 'First name is required';
        if (!formData?.lastName) newErrors.lastName = 'Last name is required';
        if (!formData?.email) newErrors.email = 'Email is required';
        if (!formData?.password) newErrors.password = 'Password is required';
        if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
        if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 3:
        if (!formData?.subscriptionPlan) newErrors.subscriptionPlan = 'Please select a subscription plan';
        break;

      case 4:
        if (!formData?.termsOfService) newErrors.termsOfService = 'You must accept the Terms of Service';
        if (!formData?.privacyPolicy) newErrors.privacyPolicy = 'You must accept the Privacy Policy';
        if (!formData?.gdprCompliance) newErrors.gdprCompliance = 'GDPR compliance consent is required';
        if (!formData?.dataProcessing) newErrors.dataProcessing = 'Data processing consent is required';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepValidation = (stepNumber, isValid) => {
    setStepValidation(prev => ({
      ...prev,
      [stepNumber]: isValid
    }));
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const handleEditStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      // Navigate to login with success message
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please check your email for verification.',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInformationForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            onValidation={(isValid) => handleStepValidation(1, isValid)}
          />
        );
      case 2:
        return (
          <AdminAccountForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            onValidation={(isValid) => handleStepValidation(2, isValid)}
          />
        );
      case 3:
        return (
          <SubscriptionPlanForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            onValidation={(isValid) => handleStepValidation(3, isValid)}
          />
        );
      case 4:
        return (
          <ComplianceForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            onValidation={(isValid) => handleStepValidation(4, isValid)}
          />
        );
      case 5:
        return (
          <RegistrationSummary
            formData={formData}
            onEdit={handleEditStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="FileText" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TenantNotes</h1>
                <p className="text-sm text-muted-foreground">Secure Note Management</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-surface rounded-lg shadow-sm border border-border">
          <div className="p-6 md:p-8">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps?.length}
              steps={steps}
            />

            <div className="max-w-3xl mx-auto">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep} of {steps?.length}
                  </span>
                  <Button
                    variant="default"
                    iconName="ChevronRight"
                    iconPosition="right"
                    onClick={handleNext}
                    disabled={!stepValidation?.[currentStep]}
                  >
                    {currentStep === 4 ? 'Review' : 'Next'}
                  </Button>
                </div>
              </div>
            )}

            {/* Error Display */}
            {errors?.submit && (
              <div className="mt-6 bg-error/10 border border-error/20 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-error" />
                  <p className="text-error font-medium">{errors?.submit}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help with registration?
          </p>
          <div className="flex justify-center space-x-6">
            <Button variant="link" size="sm" iconName="HelpCircle" iconPosition="left">
              View FAQ
            </Button>
            <Button variant="link" size="sm" iconName="Mail" iconPosition="left">
              Contact Support
            </Button>
            <Button variant="link" size="sm" iconName="Phone" iconPosition="left">
              Call Sales
            </Button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>&copy; {new Date()?.getFullYear()} TenantNotes. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="link" size="sm">Privacy Policy</Button>
              <Button variant="link" size="sm">Terms of Service</Button>
              <Button variant="link" size="sm">Security</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TenantRegistration;