import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PaymentMethods = ({ paymentMethods, onAddMethod, onRemoveMethod, onSetDefault, className = '' }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });
  const [errors, setErrors] = useState({});

  const getCardIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'amex': return 'CreditCard';
      case 'discover': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newCard?.cardNumber || newCard?.cardNumber?.replace(/\s/g, '')?.length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!newCard?.expiryDate || !/^\d{2}\/\d{2}$/?.test(newCard?.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!newCard?.cvv || newCard?.cvv?.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!newCard?.cardholderName?.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onAddMethod(newCard);
      setNewCard({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'US'
        }
      });
      setShowAddForm(false);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (field === 'cvv') {
      value = value?.replace(/[^0-9]/g, '')?.substring(0, 4);
    }
    
    setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Method
        </Button>
      </div>
      <div className="space-y-4">
        {paymentMethods?.map((method, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                <Icon name={getCardIcon(method?.type)} size={20} className="text-foreground" />
              </div>
              
              <div>
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">
                    •••• •••• •••• {method?.lastFour}
                  </h4>
                  {method?.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span>{method?.type} ending in {method?.lastFour}</span>
                  <span>•</span>
                  <span>Expires {method?.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!method?.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefault(method?.id)}
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onRemoveMethod(method?.id)}
                className="text-error hover:text-error hover:bg-error/10"
              />
            </div>
          </div>
        ))}

        {paymentMethods?.length === 0 && !showAddForm && (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No payment methods added yet.</p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowAddForm(true)}
            >
              Add Your First Payment Method
            </Button>
          </div>
        )}
      </div>
      {showAddForm && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-4">Add New Payment Method</h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Cardholder Name"
                  type="text"
                  placeholder="John Doe"
                  value={newCard?.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
                  error={errors?.cardholderName}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newCard?.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                  error={errors?.cardNumber}
                  maxLength={19}
                  required
                />
              </div>
              
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={newCard?.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                error={errors?.expiryDate}
                maxLength={5}
                required
              />
              
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={newCard?.cvv}
                onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                error={errors?.cvv}
                maxLength={4}
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowAddForm(false);
                  setErrors({});
                  setNewCard({
                    cardNumber: '',
                    expiryDate: '',
                    cvv: '',
                    cardholderName: '',
                    billingAddress: {
                      street: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      country: 'US'
                    }
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" iconName="Plus" iconPosition="left">
                Add Payment Method
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;