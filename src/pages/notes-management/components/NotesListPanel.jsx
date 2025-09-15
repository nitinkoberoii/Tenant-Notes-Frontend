import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotesListPanel = ({ 
  notes, 
  selectedNote, 
  onNoteSelect, 
  onCreateNote,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  selectedAuthor,
  onAuthorChange,
  dateRange,
  onDateRangeChange
}) => {
  const [selectedNotes, setSelectedNotes] = useState([]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'personal', label: 'Personal' },
    { value: 'work', label: 'Work' },
    { value: 'project', label: 'Project' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'research', label: 'Research' }
  ];

  const tagOptions = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'important', label: 'Important' },
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const authorOptions = [
    { value: '', label: 'All Authors' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800',
      work: 'bg-green-100 text-green-800',
      project: 'bg-purple-100 text-purple-800',
      meeting: 'bg-orange-100 text-orange-800',
      research: 'bg-pink-100 text-pink-800'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-800';
  };

  const getTagColor = (tag) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      important: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800',
      review: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors?.[tag] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedNotes(notes?.map(note => note?.id));
    } else {
      setSelectedNotes([]);
    }
  };

  const handleSelectNote = (noteId, checked) => {
    if (checked) {
      setSelectedNotes([...selectedNotes, noteId]);
    } else {
      setSelectedNotes(selectedNotes?.filter(id => id !== noteId));
    }
  };

  const isAllSelected = selectedNotes?.length === notes?.length && notes?.length > 0;
  const isPartiallySelected = selectedNotes?.length > 0 && selectedNotes?.length < notes?.length;

  return (
    <div className="w-full lg:w-80 bg-surface border-r border-border flex flex-col h-full">
      {/* Filters */}
      <div className="p-4 border-b border-border bg-muted/30 space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-medium text-foreground">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            className="text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-200 rounded-full"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('');
              onTagsChange([]);
              onAuthorChange('');
              onDateRangeChange({ from: '', to: '' });
            }}
          />
        </div>
          <Select
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={onCategoryChange}
            className="mb-3"
          />

          <Select
            label="Tags"
            options={tagOptions}
            value={selectedTags}
            onChange={onTagsChange}
            multiple
            searchable
            className="mb-3"
          />

          <Select
            label="Author"
            options={authorOptions}
            value={selectedAuthor}
            onChange={onAuthorChange}
            className="mb-3"
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              label="From"
              value={dateRange?.from}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: e?.target?.value })}
            />
            <Input
              type="date"
              label="To"
              value={dateRange?.to}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: e?.target?.value })}
            />
          </div>
        </div>
        
        {/* Subscription Management Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300 hover:text-amber-900 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            onClick={() => window.location.href = '/subscription-management'}
          >
            <Icon name="CreditCard" size={16} className="mr-2" />
            Manage your subscription
          </Button>
        </div>
    </div>
  );
};

export default NotesListPanel;