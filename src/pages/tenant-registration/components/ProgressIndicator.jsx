import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step?.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : isCurrent 
                    ? 'border-primary text-primary bg-primary/10' :'border-border text-muted-foreground bg-background'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium text-center max-w-20 ${
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                  isCompleted ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}: {steps?.[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;