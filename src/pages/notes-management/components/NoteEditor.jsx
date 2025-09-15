import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const NoteEditor = ({ 
  note, 
  onSave, 
  onClose, 
  onDelete,
  onBulkAction,
  isNewNote = false 
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || 'personal');
  const [tags, setTags] = useState(note?.tags || []);
  const [isPrivate, setIsPrivate] = useState(note?.isPrivate || false);
  const [sharedWith, setSharedWith] = useState(note?.sharedWith || []);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(note?.updatedAt || null);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showFormatting, setShowFormatting] = useState(false);
  
  const contentRef = useRef(null);
  
  // Initialize textarea
  useEffect(() => {
    if (contentRef.current) {
      // Ensure proper text direction
      contentRef.current.dir = 'ltr';
    }
  }, []);

  const categoryOptions = [
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

  const teamMembers = [
    { value: 'john-doe', label: 'John Doe', role: 'Manager' },
    { value: 'jane-smith', label: 'Jane Smith', role: 'Developer' },
    { value: 'mike-johnson', label: 'Mike Johnson', role: 'Designer' },
    { value: 'sarah-wilson', label: 'Sarah Wilson', role: 'Analyst' }
  ];

  const activeCollaborators = [
    { id: 'jane-smith', name: 'Jane Smith', status: 'editing', color: 'bg-green-500' },
    { id: 'mike-johnson', name: 'Mike Johnson', status: 'viewing', color: 'bg-blue-500' }
  ];


  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        id: note?.id,
        title: title || 'Untitled',
        content,
        category,
        tags,
        isPrivate,
        sharedWith,
        updatedAt: new Date()?.toISOString()
      });
      setLastSaved(new Date()?.toISOString());
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };


  const handleExport = (format) => {
    const noteData = {
      title: title || 'Untitled',
      content,
      category,
      tags,
      createdAt: note?.createdAt || new Date()?.toISOString(),
      updatedAt: lastSaved || new Date()?.toISOString()
    };

    if (format === 'pdf') {
      // Mock PDF export
      console.log('Exporting to PDF:', noteData);
    } else if (format === 'txt') {
      const textContent = `${noteData?.title}\n\n${content}\n\nCategory: ${category}\nTags: ${tags?.join(', ')}`;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${noteData?.title}.txt`;
      a?.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatLastSaved = (date) => {
    if (!date) return '';
    const now = new Date();
    const savedDate = new Date(date);
    const diffMs = now - savedDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Saved just now';
    if (diffMins < 60) return `Saved ${diffMins}m ago`;
    if (diffMins < 1440) return `Saved ${Math.floor(diffMins / 60)}h ago`;
    return `Saved on ${savedDate?.toLocaleDateString()}`;
  };

  if (!note && !isNewNote) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="FileText" size={64} className="text-muted-foreground mb-4 mx-auto" />
          <h3 className="text-xl font-medium text-foreground mb-2">Select a note to edit</h3>
          <p className="text-muted-foreground">Choose a note from the list or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Editor Header */}
      <div className="p-4 border-b border-border bg-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              iconSize={16}
              onClick={onClose}
              className="lg:hidden"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconSize={20}
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            />
            <div className="flex items-center space-x-2">
              {isSaving && <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />}
              <span className="text-sm text-muted-foreground">
                {formatLastSaved(lastSaved)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Active Collaborators */}
            {activeCollaborators?.length > 0 && (
              <div className="flex items-center space-x-1 mr-3">
                {activeCollaborators?.map((collaborator) => (
                  <div
                    key={collaborator?.id}
                    className="relative"
                    title={`${collaborator?.name} is ${collaborator?.status}`}
                  >
                    <div className={`w-6 h-6 rounded-full ${collaborator?.color} flex items-center justify-center`}>
                      <span className="text-xs font-medium text-white">
                        {collaborator?.name?.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${
                      collaborator?.status === 'editing' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              iconName="Users"
              iconSize={16}
              onClick={() => setShowCollaborators(!showCollaborators)}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconSize={16}
              onClick={() => handleExport('txt')}
            />
            {/* Bulk Actions */}
            {onBulkAction && (
              <div className="flex items-center space-x-1 lg:hidden">
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
            <Button
              variant="outline"
              size="sm"
              iconName="Save"
              iconPosition="left"
              iconSize={16}
              onClick={handleManualSave}
              loading={isSaving}
            >
              Save
            </Button>
            {!isNewNote && (
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconSize={16}
                onClick={() => onDelete(note?.id)}
              />
            )}
          </div>
        </div>

        {/* Note Title */}
        <Input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
          className="text-xl font-semibold border-none bg-transparent px-0 focus:ring-0"
        />

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <Select
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            className="w-32"
          />
          
          <Select
            options={tagOptions}
            value={tags}
            onChange={setTags}
            multiple
            searchable
            placeholder="Add tags..."
            className="w-48"
          />

          <div className="flex items-center space-x-2">
            <Button
              variant={isPrivate ? "default" : "outline"}
              size="sm"
              iconName="Lock"
              iconSize={14}
              onClick={() => setIsPrivate(!isPrivate)}
            >
              {isPrivate ? 'Private' : 'Shared'}
            </Button>
          </div>
        </div>
      </div>
      {/* Editor Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your note..."
          className="min-h-full w-full p-4 text-foreground bg-transparent border-none outline-none resize-none"
          style={{ 
            minHeight: '400px',
            direction: 'ltr',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: '1.5'
          }}
          dir="ltr"
        />
      </div>
      {/* Collaboration Panel */}
      {showCollaborators && (
        <div className="absolute right-4 top-20 w-80 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Share Note</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconSize={16}
                onClick={() => setShowCollaborators(false)}
              />
            </div>

            <Select
              options={teamMembers}
              value={sharedWith}
              onChange={setSharedWith}
              multiple
              searchable
              placeholder="Add people..."
              className="mb-4"
            />

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Currently Active</h4>
              {activeCollaborators?.map((collaborator) => (
                <div key={collaborator?.id} className="flex items-center space-x-3 p-2 rounded-md bg-muted/50">
                  <div className={`w-8 h-8 rounded-full ${collaborator?.color} flex items-center justify-center`}>
                    <span className="text-sm font-medium text-white">
                      {collaborator?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{collaborator?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{collaborator?.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;