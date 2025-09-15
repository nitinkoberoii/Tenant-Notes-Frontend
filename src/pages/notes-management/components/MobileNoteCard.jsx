import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileNoteCard = ({ 
  note, 
  onEdit, 
  onDelete, 
  onShare,
  isSelected,
  onSelect 
}) => {
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

  const truncateContent = (content, maxLength = 120) => {
    if (content?.length <= maxLength) return content;
    return content?.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className={`bg-surface border border-border rounded-lg p-4 mb-3 transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
      }`}
      onClick={() => onEdit(note)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
            {note?.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{note?.author}</span>
            <span>•</span>
            <span>{formatDate(note?.updatedAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-2">
          {note?.isShared && (
            <Icon name="Users" size={16} className="text-muted-foreground" />
          )}
          {note?.isPrivate && (
            <Icon name="Lock" size={16} className="text-muted-foreground" />
          )}
        </div>
      </div>
      {/* Content Preview */}
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {truncateContent(note?.content)}
      </p>
      {/* Tags and Category */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(note?.category)}`}>
          {note?.category}
        </span>
        {note?.tags?.slice(0, 3)?.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
        {note?.tags?.length > 3 && (
          <span className="text-xs text-muted-foreground">
            +{note?.tags?.length - 3} more
          </span>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit3"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onShare(note);
            }}
          >
            Share
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            iconSize={16}
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note?.id);
            }}
            className="text-destructive hover:text-destructive"
          />
        </div>
      </div>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} color="white" />
        </div>
      )}
    </div>
  );
};

export default MobileNoteCard;