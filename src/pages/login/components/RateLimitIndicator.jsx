import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RateLimitIndicator = ({ attempts = 0, maxAttempts = 5 }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (attempts >= maxAttempts) {
      setIsLocked(true);
      setTimeRemaining(300); // 5 minutes lockout
      
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [attempts, maxAttempts]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  if (attempts === 0) return null;

  return (
    <div className={`flex items-center justify-center p-3 rounded-lg mb-4 ${
      isLocked 
        ? 'bg-error/10 border border-error/20' 
        : attempts >= maxAttempts - 2 
          ? 'bg-warning/10 border border-warning/20' :'bg-muted border border-border'
    }`}>
      <Icon 
        name={isLocked ? 'Lock' : 'AlertTriangle'} 
        size={16} 
        className={`mr-2 ${
          isLocked 
            ? 'text-error' 
            : attempts >= maxAttempts - 2 
              ? 'text-warning' :'text-muted-foreground'
        }`} 
      />
      
      <div className="text-sm">
        {isLocked ? (
          <span className="text-error font-medium">
            Account locked. Try again in {formatTime(timeRemaining)}
          </span>
        ) : (
          <span className={attempts >= maxAttempts - 2 ? 'text-warning' : 'text-muted-foreground'}>
            {attempts}/{maxAttempts} login attempts used
            {attempts >= maxAttempts - 2 && ' - Account will be locked after next failed attempt'}
          </span>
        )}
      </div>
    </div>
  );
};

export default RateLimitIndicator;