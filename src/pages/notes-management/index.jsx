import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NotesListPanel from './components/NotesListPanel';
import NoteEditor from './components/NoteEditor';
import MobileNoteCard from './components/MobileNoteCard';
import NotesHeader from './components/NotesHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import apiClient from '../../api/axios';

const NotesManagement = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('updated');
  const [selectedNotes, setSelectedNotes] = useState([]);
  
  const sortOptions = [
    { value: 'updated', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'title', label: 'Title A-Z' },
  ];
  
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/notes');
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
    
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserEmail(JSON.parse(userData).email || '');
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredNotes = React.useMemo(() => {
    let filtered = notes?.filter(note => {
      return !searchQuery || 
        note?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        note?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    });

    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'updated':
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    return filtered;
  }, [notes, searchQuery, sortBy]);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsNewNote(true);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setIsNewNote(false);
  };

  const handleNoteSave = async (noteData) => {
    try {
      if (noteData._id) {
        const response = await apiClient.put(`/notes/${noteData._id}`, noteData);
        setNotes(prev => prev.map(note => 
          note._id === noteData._id ? response.data : note
        ));
        setSelectedNote(response.data);
      } else {
        const response = await apiClient.post('/notes', noteData);
        setNotes(prev => [response.data, ...prev]);
        setSelectedNote(response.data);
        setIsNewNote(false);
      }
    } catch (err) {
      if (err.response?.data?.errorCode === 'NOTE_LIMIT_REACHED') {
        alert(err.response.data.message);
      } else {
        alert('Failed to save note.');
      }
      console.error('Failed to save note:', err);
    }
  };

  const handleNoteDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await apiClient.delete(`/notes/${noteId}`);
        setNotes(prev => prev.filter(note => note._id !== noteId));
        if (selectedNote?._id === noteId) {
          setSelectedNote(null);
          setIsNewNote(false);
        }
      } catch (error) {
        alert('Failed to delete note.');
        console.error('Failed to delete note:', error);
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedNotes.length} notes?`)) {
        try {
          await Promise.all(selectedNotes.map(id => apiClient.delete(`/notes/${id}`)));
          setNotes(prev => prev.filter(note => !selectedNotes.includes(note._id)));
          setSelectedNotes([]);
          if (selectedNote && selectedNotes.includes(selectedNote._id)) {
            setSelectedNote(null);
          }
        } catch (error) {
          alert('Failed to delete one or more notes.');
          console.error('Bulk delete failed:', error);
        }
      }
    } else {
      console.log(`Action '${action}' not yet implemented.`);
    }
  };

  const handleCloseEditor = () => {
    setSelectedNote(null);
    setIsNewNote(false);
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <NotesHeader
          totalNotes={filteredNotes?.length}
          selectedCount={selectedNotes?.length}
          onCreateNote={handleCreateNote}
          onBulkAction={handleBulkAction}
          onExportSelected={() => handleBulkAction('export')}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="p-4">
          {filteredNotes?.map((note) => (
            <MobileNoteCard
              key={note._id}
              note={note}
              onEdit={() => handleNoteSelect(note)}
              onDelete={() => handleNoteDelete(note._id)}
              onShare={(note) => console.log('Share note:', note)}
              isSelected={selectedNotes?.includes(note._id)}
              onSelect={(checked) => {
                if (checked) {
                  setSelectedNotes([...selectedNotes, note._id]);
                } else {
                  setSelectedNotes(selectedNotes?.filter(id => id !== note._id));
                }
              }}
            />
          ))}

          {filteredNotes?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first note or adjust your search filters
              </p>
            </div>
          )}
        </div>
        {(selectedNote || isNewNote) && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40" 
              onClick={handleCloseEditor}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="bg-background w-full h-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <NoteEditor
                  note={selectedNote}
                  onSave={handleNoteSave}
                  onClose={handleCloseEditor}
                  onDelete={() => handleNoteDelete(selectedNote._id)}
                  onBulkAction={handleBulkAction}
                  isNewNote={isNewNote}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NotesHeader
        totalNotes={filteredNotes?.length}
        selectedCount={selectedNotes?.length}
        onCreateNote={handleCreateNote}
        onBulkAction={handleBulkAction}
        onExportSelected={() => handleBulkAction('export')}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        userEmail={userEmail}
      />
      <div className="flex h-[calc(100vh-80px)]">
        <NotesListPanel
          notes={filteredNotes}
          selectedNote={selectedNote}
          onNoteSelect={handleNoteSelect}
          onCreateNote={handleCreateNote}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          selectedAuthor={selectedAuthor}
          onAuthorChange={setSelectedAuthor}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <div className="flex-1 flex flex-col bg-background">
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">Notes</h2>
                <span className="text-sm text-muted-foreground">
                  {filteredNotes?.length} {filteredNotes?.length === 1 ? 'note' : 'notes'} found
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedNotes?.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Archive"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => handleBulkAction('archive')}
                    >
                      Archive
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => handleBulkAction('export')}
                    >
                      Export
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Trash2"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => handleBulkAction('delete')}
                    >
                      Delete
                    </Button>
                  </>
                )}
                
                <Input
                  type="search"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 border border-input bg-background"
                />
                
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-40"
                />
                
                <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="List"
                    iconSize={16}
                    onClick={() => setViewMode('list')}
                    className="px-3"
                  />
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Grid3X3"
                    iconSize={16}
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes?.map((note) => (
                  <MobileNoteCard
                    key={note._id}
                    note={note}
                    onEdit={() => handleNoteSelect(note)}
                    onDelete={() => handleNoteDelete(note._id)}
                    onShare={() => {}}
                    isSelected={selectedNotes?.includes(note._id)}
                    onSelect={(checked) => {
                      if (checked) {
                        setSelectedNotes([...selectedNotes, note._id]);
                      } else {
                        setSelectedNotes(selectedNotes?.filter(id => id !== note._id));
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotes?.map((note) => (
                  <MobileNoteCard
                    key={note._id}
                    note={note}
                    onEdit={() => handleNoteSelect(note)}
                    onDelete={() => handleNoteDelete(note._id)}
                    onShare={() => {}}
                    isSelected={selectedNotes?.includes(note._id)}
                    onSelect={(checked) => {
                      if (checked) {
                        setSelectedNotes([...selectedNotes, note._id]);
                      } else {
                        setSelectedNotes(selectedNotes?.filter(id => id !== note._id));
                      }
                    }}
                  />
                ))}
              </div>
            )}
            
            {filteredNotes?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first note or adjust your search filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {(selectedNote || isNewNote) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <NoteEditor
              note={selectedNote}
              onSave={handleNoteSave}
              onClose={handleCloseEditor}
              onDelete={() => handleNoteDelete(selectedNote._id)}
              isNewNote={isNewNote}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesManagement;