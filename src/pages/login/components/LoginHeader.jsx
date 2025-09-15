import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
          <Icon name="FileText" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Welcome back
      </h1>
      
      <p className="text-muted-foreground text-lg">
        Sign in to access your secure workspace
      </p>
      
    </div>
  );
};

export default LoginHeader;