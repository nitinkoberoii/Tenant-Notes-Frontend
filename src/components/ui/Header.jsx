import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '', title, description }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side - Logo and Page Title */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="FileText" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">TenantNotes</span>
              <span className="text-xs text-muted-foreground">Secure Note Management</span>
            </div>
          </div>

          {/* Page Title and Description */}
          {(title || description) && (
            <div className="hidden md:block ml-8">
              {title && (
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            iconSize={20}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="Bell"
            iconSize={16}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-md">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={14} color="white" />
            </div>
            <span className="text-sm font-medium text-foreground">Admin</span>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border animate-slide-in">
          <div className="px-4 py-2 space-y-1">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;