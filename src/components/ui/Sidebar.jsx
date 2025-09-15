import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const TenantContextIndicator = ({ tenantName = "Acme Corporation", subscriptionStatus = "active" }) => {
  const statusColors = {
    active: 'text-success',
    warning: 'text-warning',
    expired: 'text-error'
  };

  const statusIcons = {
    active: 'CheckCircle',
    warning: 'AlertTriangle',
    expired: 'XCircle'
  };

  return (
    <div className="tenant-indicator mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{tenantName}</p>
          <div className="flex items-center mt-1">
            <Icon 
              name={statusIcons?.[subscriptionStatus]} 
              size={12} 
              className={`mr-1 ${statusColors?.[subscriptionStatus]}`} 
            />
            <p className="text-xs text-muted-foreground capitalize">{subscriptionStatus}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="Settings" iconSize={14} />
      </div>
    </div>
  );
};

const SubscriptionLimitAlert = ({ 
  currentUsage = 85, 
  limit = 100, 
  type = "notes",
  onUpgrade 
}) => {
  const percentage = (currentUsage / limit) * 100;
  const isWarning = percentage >= 80;
  const isCritical = percentage >= 95;

  if (percentage < 80) return null;

  return (
    <div className={`subscription-alert mb-4 ${isCritical ? 'bg-error/10 border-error/20' : 'bg-warning/10 border-warning/20'}`}>
      <div className="flex items-start space-x-2">
        <Icon 
          name={isCritical ? "AlertCircle" : "AlertTriangle"} 
          size={16} 
          className={isCritical ? 'text-error mt-0.5' : 'text-warning mt-0.5'} 
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground">
            {isCritical ? 'Limit Reached' : 'Approaching Limit'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {currentUsage}/{limit} {type} used
          </p>
          <div className="w-full bg-muted rounded-full h-1.5 mt-2">
            <div 
              className={`h-1.5 rounded-full ${isCritical ? 'bg-error' : 'bg-warning'}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <Button
            variant="link"
            size="xs"
            onClick={onUpgrade}
            className="p-0 h-auto text-xs mt-1"
          >
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

const RoleBasedNavFilter = ({ children, requiredRole, userRole = "admin" }) => {
  const roleHierarchy = {
    user: 1,
    manager: 2,
    admin: 3,
    superadmin: 4
  };

  const hasPermission = roleHierarchy?.[userRole] >= roleHierarchy?.[requiredRole];
  
  if (!hasPermission) return null;
  
  return children;
};

const Sidebar = ({ 
  isCollapsed = false, 
  onToggle,
  userRole = "admin",
  tenantContext = { name: "Acme Corporation", status: "active" },
  subscriptionStatus = { usage: 85, limit: 100, type: "notes" },
  className = '' 
}) => {
  const location = useLocation();
  const [adminExpanded, setAdminExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      label: 'Notes',
      path: '/notes-management',
      icon: 'FileText',
      requiredRole: 'user',
      tooltip: 'Manage and organize your notes'
    }
  ];

  const adminItems = [
    {
      label: 'Subscription',
      path: '/subscription-management',
      icon: 'CreditCard',
      requiredRole: 'admin',
      tooltip: 'Manage subscription and billing'
    },
    {
      label: 'Tenant Setup',
      path: '/tenant-registration',
      icon: 'Building',
      requiredRole: 'admin',
      tooltip: 'Configure tenant settings'
    }
  ];

  const accountItems = [
    {
      label: 'Logout',
      path: '/login',
      icon: 'LogOut',
      requiredRole: 'user',
      tooltip: 'Sign out of your account',
      isLogout: true
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path, isLogout = false) => {
    if (isLogout) {
      // Clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('rememberMe');
    }
    window.location.href = path;
  };

  const handleUpgrade = () => {
    handleNavigation('/subscription-management');
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-200 bg-surface border-t border-border">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {navigationItems?.map((item) => (
            <RoleBasedNavFilter key={item?.path} requiredRole={item?.requiredRole} userRole={userRole}>
              <button
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{item?.label}</span>
              </button>
            </RoleBasedNavFilter>
          ))}
          
          <RoleBasedNavFilter requiredRole="admin" userRole={userRole}>
            <button
              onClick={() => handleNavigation('/subscription-management')}
              className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                isActivePath('/subscription-management')
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="CreditCard" size={20} />
              <span className="text-xs mt-1 font-medium">Admin</span>
            </button>
          </RoleBasedNavFilter>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 z-100 h-full bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    } ${className}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="FileText" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">TenantNotes</span>
                <span className="text-xs text-muted-foreground">Secure Management</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg mx-auto">
              <Icon name="FileText" size={20} color="white" />
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!isCollapsed && (
            <>
              <TenantContextIndicator 
                tenantName={tenantContext?.name}
                subscriptionStatus={tenantContext?.status}
              />
              
              <SubscriptionLimitAlert
                currentUsage={subscriptionStatus?.usage}
                limit={subscriptionStatus?.limit}
                type={subscriptionStatus?.type}
                onUpgrade={handleUpgrade}
              />
            </>
          )}

          {/* Primary Navigation */}
          <div className="sidebar-section">
            {!isCollapsed && (
              <div className="sidebar-section-title">Workspace</div>
            )}
            {navigationItems?.map((item) => (
              <RoleBasedNavFilter key={item?.path} requiredRole={item?.requiredRole} userRole={userRole}>
                <button
                  onClick={() => handleNavigation(item?.path)}
                  title={isCollapsed ? item?.tooltip : ''}
                  className={`nav-item w-full ${
                    isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && <span>{item?.label}</span>}
                </button>
              </RoleBasedNavFilter>
            ))}
          </div>

          {/* Administration Section */}
          <RoleBasedNavFilter requiredRole="admin" userRole={userRole}>
            <div className="sidebar-section mt-6">
              {!isCollapsed && (
                <button
                  onClick={() => setAdminExpanded(!adminExpanded)}
                  className="flex items-center justify-between w-full sidebar-section-title hover:text-foreground transition-colors duration-200"
                >
                  <span>Administration</span>
                  <Icon 
                    name={adminExpanded ? "ChevronDown" : "ChevronRight"} 
                    size={14} 
                  />
                </button>
              )}
              
              {(adminExpanded || isCollapsed) && adminItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  title={isCollapsed ? item?.tooltip : ''}
                  className={`nav-item w-full ${
                    isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && <span>{item?.label}</span>}
                </button>
              ))}
            </div>
          </RoleBasedNavFilter>

          {/* Account Section */}
          <div className="sidebar-section mt-6">
            {!isCollapsed && (
              <div className="sidebar-section-title">Account</div>
            )}
            {accountItems?.map((item) => (
              <RoleBasedNavFilter key={item?.path} requiredRole={item?.requiredRole} userRole={userRole}>
                <button
                  onClick={() => handleNavigation(item?.path, item?.isLogout)}
                  title={isCollapsed ? item?.tooltip : ''}
                  className={`nav-item w-full ${
                    isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && <span>{item?.label}</span>}
                </button>
              </RoleBasedNavFilter>
            ))}
          </div>
        </div>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
            onClick={onToggle}
            className={`w-full ${isCollapsed ? 'px-2' : 'justify-start'}`}
          >
            {!isCollapsed && "Collapse"}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar, TenantContextIndicator, SubscriptionLimitAlert, RoleBasedNavFilter };
export default Sidebar;