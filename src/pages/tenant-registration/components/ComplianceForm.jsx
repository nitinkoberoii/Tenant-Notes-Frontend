import React, { useState, useEffect } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ComplianceForm = ({ formData, onFormChange, errors, onValidation }) => {
  const [agreements, setAgreements] = useState({
    termsOfService: formData?.termsOfService || false,
    privacyPolicy: formData?.privacyPolicy || false,
    gdprCompliance: formData?.gdprCompliance || false,
    dataProcessing: formData?.dataProcessing || false,
    marketingEmails: formData?.marketingEmails || false
  });

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const requiredAgreements = ['termsOfService', 'privacyPolicy', 'gdprCompliance', 'dataProcessing'];
    const isValid = requiredAgreements?.every(key => agreements?.[key]);
    
    onValidation(isValid);
    onFormChange({ ...formData, ...agreements });
  }, [agreements, onValidation]);

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const complianceItems = [
    {
      id: 'termsOfService',
      label: 'I agree to the Terms of Service',
      required: true,
      description: 'By checking this box, you agree to our terms and conditions for using the TenantNotes platform.',
      link: '#terms'
    },
    {
      id: 'privacyPolicy',
      label: 'I agree to the Privacy Policy',
      required: true,
      description: 'You acknowledge that you have read and understand our privacy practices.',
      link: '#privacy'
    },
    {
      id: 'gdprCompliance',
      label: 'I consent to GDPR data processing',
      required: true,
      description: 'We will process your personal data in accordance with GDPR regulations.'
    },
    {
      id: 'dataProcessing',
      label: 'I consent to data processing for service delivery',
      required: true,
      description: 'This allows us to process your data to provide our note management services.'
    },
    {
      id: 'marketingEmails',
      label: 'I would like to receive product updates and marketing emails',
      required: false,
      description: 'Optional: Receive news about new features, tips, and special offers.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileCheck" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Legal & Compliance</h2>
        <p className="text-muted-foreground">
          Please review and accept our terms to complete your registration
        </p>
      </div>
      <div className="space-y-6">
        {complianceItems?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={agreements?.[item?.id]}
                onChange={(e) => handleAgreementChange(item?.id, e?.target?.checked)}
                required={item?.required}
                error={errors?.[item?.id]}
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  {item?.label}
                  {item?.required && <span className="text-error ml-1">*</span>}
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  {item?.description}
                </p>
                {item?.link && (
                  <Button
                    variant="link"
                    size="xs"
                    className="p-0 h-auto text-xs mt-2"
                    onClick={() => {
                      if (item?.id === 'termsOfService') setShowTerms(true);
                      if (item?.id === 'privacyPolicy') setShowPrivacy(true);
                    }}
                  >
                    Read full document
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security & Compliance Information */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Security & Compliance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <Icon name="Lock" size={16} className="text-success mr-3" />
              <div>
                <p className="text-sm font-medium text-foreground">End-to-End Encryption</p>
                <p className="text-xs text-muted-foreground">Your data is encrypted at rest and in transit</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icon name="Database" size={16} className="text-success mr-3" />
              <div>
                <p className="text-sm font-medium text-foreground">Data Isolation</p>
                <p className="text-xs text-muted-foreground">Complete tenant data separation</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <Icon name="FileCheck" size={16} className="text-success mr-3" />
              <div>
                <p className="text-sm font-medium text-foreground">SOC 2 Compliant</p>
                <p className="text-xs text-muted-foreground">Audited security controls</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icon name="Globe" size={16} className="text-success mr-3" />
              <div>
                <p className="text-sm font-medium text-foreground">GDPR Ready</p>
                <p className="text-xs text-muted-foreground">Full compliance with EU regulations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data Processing Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Data Processing Notice</h4>
            <p className="text-sm text-muted-foreground">
              By registering, you acknowledge that TenantNotes will process your organization's data 
              to provide secure note management services. We implement industry-standard security 
              measures and will never share your data with third parties without explicit consent.
            </p>
          </div>
        </div>
      </div>
      {/* Error Display */}
      {Object.keys(errors)?.length > 0 && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <div>
              <h4 className="font-medium text-error mb-1">Required Agreements</h4>
              <p className="text-sm text-error">
                Please accept all required terms and conditions to proceed with registration.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Terms of Service</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowTerms(false)}
                />
              </div>
              <div className="prose prose-sm max-w-none text-foreground">
                <p>Last updated: January 15, 2025</p>
                <h4>1. Acceptance of Terms</h4>
                <p>By accessing and using TenantNotes, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <h4>2. Service Description</h4>
                <p>TenantNotes provides secure, multi-tenant note management services for organizations.</p>
                <h4>3. User Responsibilities</h4>
                <p>Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>
                <h4>4. Data Security</h4>
                <p>We implement industry-standard security measures to protect your data and maintain tenant isolation.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Privacy Policy</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowPrivacy(false)}
                />
              </div>
              <div className="prose prose-sm max-w-none text-foreground">
                <p>Last updated: January 15, 2025</p>
                <h4>1. Information We Collect</h4>
                <p>We collect information you provide directly to us, such as when you create an account or contact us for support.</p>
                <h4>2. How We Use Your Information</h4>
                <p>We use the information we collect to provide, maintain, and improve our services.</p>
                <h4>3. Information Sharing</h4>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>
                <h4>4. Data Security</h4>
                <p>We implement appropriate security measures to protect your personal information.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceForm;