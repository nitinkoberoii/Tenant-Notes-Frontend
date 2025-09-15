import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AdminAccountForm = ({ formData, onFormChange, errors, onValidation }) => {
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password?.length >= 8) {
      score += 1;
    } else {
      feedback?.push('At least 8 characters');
    }

    if (/[a-z]/?.test(password)) {
      score += 1;
    } else {
      feedback?.push('One lowercase letter');
    }

    if (/[A-Z]/?.test(password)) {
      score += 1;
    } else {
      feedback?.push('One uppercase letter');
    }

    if (/\d/?.test(password)) {
      score += 1;
    } else {
      feedback?.push('One number');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/?.test(password)) {
      score += 1;
    } else {
      feedback?.push('One special character');
    }

    return { score, feedback };
  };

  useEffect(() => {
    if (formData?.password) {
      setPasswordStrength(calculatePasswordStrength(formData?.password));
    }
  }, [formData?.password]);

  useEffect(() => {
    const isValid = formData?.firstName && 
                   formData?.lastName && 
                   formData?.email && 
                   formData?.password && 
                   formData?.confirmPassword &&
                   formData?.password === formData?.confirmPassword &&
                   passwordStrength?.score >= 4;
    onValidation(isValid);
  }, [formData, passwordStrength?.score, onValidation]);

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const getStrengthColor = (score) => {
    if (score <= 2) return 'bg-error';
    if (score <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = (score) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Administrator Account</h2>
        <p className="text-muted-foreground">
          Create the primary administrator account for your organization
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />

        <div className="md:col-span-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@company.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            description="This will be your login email and primary contact"
            required
          />
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          {formData?.password && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Password Strength</span>
                <span className={`text-sm font-medium ${
                  passwordStrength?.score <= 2 ? 'text-error' : 
                  passwordStrength?.score <= 3 ? 'text-warning' : 'text-success'
                }`}>
                  {getStrengthText(passwordStrength?.score)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength?.score)}`}
                  style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
                />
              </div>
              {passwordStrength?.feedback?.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Missing requirements:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {passwordStrength?.feedback?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Icon name="X" size={12} className="text-error mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword || 
                (formData?.confirmPassword && formData?.password !== formData?.confirmPassword ? 
                 'Passwords do not match' : '')}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Security Notice</h4>
            <p className="text-sm text-muted-foreground">
              As the administrator, you'll have full access to manage users, settings, and data within your organization. 
              Please use a strong, unique password and enable two-factor authentication after registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountForm;