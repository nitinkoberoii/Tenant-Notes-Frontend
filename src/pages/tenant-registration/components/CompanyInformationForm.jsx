import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CompanyInformationForm = ({ formData, onFormChange, errors, onValidation }) => {
  const [domainValidation, setDomainValidation] = useState({ status: 'idle', message: '' });
  
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'non-profit', label: 'Non-Profit' },
    { value: 'government', label: 'Government' },
    { value: 'other', label: 'Other' }
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const validateDomain = async (domain) => {
    if (!domain) {
      setDomainValidation({ status: 'idle', message: '' });
      return;
    }

    setDomainValidation({ status: 'validating', message: 'Validating domain...' });
    
    // Simulate domain validation
    setTimeout(() => {
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
      if (!domainRegex?.test(domain)) {
        setDomainValidation({ 
          status: 'error', 
          message: 'Please enter a valid domain (e.g., company.com)' 
        });
      } else if (domain === 'example.com' || domain === 'test.com') {
        setDomainValidation({ 
          status: 'error', 
          message: 'This domain is already registered' 
        });
      } else {
        setDomainValidation({ 
          status: 'success', 
          message: 'Domain is available' 
        });
      }
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData?.domain) {
        validateDomain(formData?.domain);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData?.domain]);

  useEffect(() => {
    const isValid = formData?.organizationName && 
                   formData?.domain && 
                   formData?.industry && 
                   formData?.companySize &&
                   domainValidation?.status === 'success';
    onValidation(isValid);
  }, [formData, domainValidation?.status, onValidation]);

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Building" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Company Information</h2>
        <p className="text-muted-foreground">
          Tell us about your organization to set up your secure workspace
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Organization Name"
            type="text"
            placeholder="Enter your company name"
            value={formData?.organizationName}
            onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
            error={errors?.organizationName}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Company Domain"
            type="text"
            placeholder="company.com"
            value={formData?.domain}
            onChange={(e) => handleInputChange('domain', e?.target?.value)}
            error={errors?.domain || (domainValidation?.status === 'error' ? domainValidation?.message : '')}
            description="This will be used for your tenant URL and email verification"
            required
          />
          {domainValidation?.status === 'validating' && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin mr-2" />
              {domainValidation?.message}
            </div>
          )}
          {domainValidation?.status === 'success' && (
            <div className="flex items-center mt-2 text-sm text-success">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              {domainValidation?.message}
            </div>
          )}
        </div>

        <Select
          label="Industry"
          placeholder="Select your industry"
          options={industryOptions}
          value={formData?.industry}
          onChange={(value) => handleInputChange('industry', value)}
          error={errors?.industry}
          required
          searchable
        />

        <Select
          label="Company Size"
          placeholder="Select company size"
          options={companySizeOptions}
          value={formData?.companySize}
          onChange={(value) => handleInputChange('companySize', value)}
          error={errors?.companySize}
          required
        />

        <div className="md:col-span-2">
          <Input
            label="Company Description (Optional)"
            type="text"
            placeholder="Brief description of your company"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            description="This helps us customize your experience"
          />
        </div>
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Domain Verification</h4>
            <p className="text-sm text-muted-foreground">
              We'll send a verification email to admin@{formData?.domain || 'yourdomain.com'} to confirm domain ownership. 
              Make sure you have access to this email address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationForm;