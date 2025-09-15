import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NotesHeader = ({ 
  totalNotes,
  selectedCount,
  onCreateNote,
  onBulkAction,
  sortBy,
  onSortChange,
  onExportSelected,
  onSearch,
  searchQuery,
  userEmail
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const sortOptions = [
    { value: 'updated', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'author', label: 'Author' },
    { value: 'category', label: 'Category' }
  ];

  const bulkActions = [
    { value: 'archive', label: 'Archive Selected', icon: 'Archive' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' },
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'share', label: 'Share Selected', icon: 'Share' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setShowBulkActions(false);
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');

  window.location.href = '/login';
};

  return (
    <div className="bg-surface border-b border-border p-4">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Notes</h1>
            <p className="text-sm text-muted-foreground">
              {totalNotes} {totalNotes === 1 ? 'note' : 'notes'}
              {selectedCount > 0 && ` • ${selectedCount} selected`}
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconSize={16}
            onClick={onCreateNote}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="LogOut"
            iconSize={16}
            onClick={handleLogout}
            className="text-red-500 hover:bg-red-500 hover:text-white"
            title="Logout"
          />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <Input
            type="search"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearch(e?.target?.value)}
            className="flex-1 mr-2 border border-input bg-background"
          />
          
          {/* Profile Icon */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              iconSize={16}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="text-muted-foreground hover:text-foreground"
              title="Profile"
            />
            
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                <div className="py-2 px-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Logged in as:</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="w-32"
            />
            {selectedCount > 0 && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MoreHorizontal"
                  iconSize={16}
                  onClick={() => setShowBulkActions(!showBulkActions)}
                />
                
                {showBulkActions && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {bulkActions?.map((action) => (
                        <button
                          key={action?.value}
                          onClick={() => handleBulkAction(action?.value)}
                          className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        >
                          <Icon name={action?.icon} size={16} className="mr-3" />
                          {action?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Notes Management</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Organize and collaborate on your team's notes
              </p>
            </div>
            
          </div>

          <div className="flex items-center space-x-3">

            {/* Bulk Actions */}
            {selectedCount > 0 && (
              <div className="flex items-center space-x-2 pl-3 border-l border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Archive"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => onBulkAction('archive')}
                >
                  Archive
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => onBulkAction('export')}
                >
                  Export
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => onBulkAction('delete')}
                >
                  Delete
                </Button>
              </div>
            )}

            {/* Create Note */}
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              onClick={onCreateNote}
            >
              New Note
            </Button>

            {/* Profile Icon */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="User"
                iconSize={16}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="text-muted-foreground hover:text-foreground"
                title="Profile"
              />
              
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                  <div className="py-2 px-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Logged in as:</p>
                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              iconName="LogOut"
              iconSize={16}
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-500 hover:text-white"
              title="Logout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesHeader;