import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BillingHistory = ({ billingData, className = '' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'refunded': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      case 'refunded': return 'RotateCcw';
      default: return 'Circle';
    }
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Mock download functionality
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  const filteredData = selectedPeriod === 'all' 
    ? billingData 
    : billingData?.filter(item => {
        const itemDate = new Date(item.date);
        const now = new Date();
        const monthsAgo = selectedPeriod === '3months' ? 3 : 12;
        const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsAgo, now.getDate());
        return itemDate >= cutoffDate;
      });

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All time</option>
            <option value="3months">Last 3 months</option>
            <option value="12months">Last 12 months</option>
          </select>
          
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredData?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No billing history found for the selected period.</p>
          </div>
        ) : (
          filteredData?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name="Receipt" size={20} className="text-primary" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-foreground">{item?.description}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                      <Icon name={getStatusIcon(item?.status)} size={12} className="mr-1" />
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                    <span>Invoice #{item?.invoiceNumber}</span>
                    <span>•</span>
                    <span>{formatDate(item?.date)}</span>
                    {item?.paymentMethod && (
                      <>
                        <span>•</span>
                        <span>{item?.paymentMethod}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {formatCurrency(item?.amount)}
                  </div>
                  {item?.tax && (
                    <div className="text-xs text-muted-foreground">
                      +{formatCurrency(item?.tax)} tax
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => handleDownloadInvoice(item?.invoiceNumber)}
                    className="text-muted-foreground hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    className="text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredData?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {filteredData?.length} of {billingData?.length} transactions
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                Total: {formatCurrency(filteredData?.reduce((sum, item) => sum + item?.amount + (item?.tax || 0), 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingHistory;