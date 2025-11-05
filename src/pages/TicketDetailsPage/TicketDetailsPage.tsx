import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaSave,
  FaUpload,
  FaBolt,
} from 'react-icons/fa';
import { ticketAPI } from '../../api';

// Import all styled components
import {
    GlobalContainer,
    Nav,
    NavContent,
    Footer,
    MainContentWrapper,
    DetailsCard,
    PageHeader,
    HeaderContent,
    BackButton,
    CardInnerHeader,
    TitleWrapper,
    TicketTitle,
    StatusPillContainer,
    Pill,
    EditButton,
    CardBody,
    DetailSectionContainer,
    ImageWrapper,
    ImageViewOverlay,
    ViewImageButton,
    DetailSection,
    SectionTitle,
    DescriptionText,
    TimelineGrid,
    InfoBlock,
    InfoLabel,
    InfoValue,
    ActionButtons,
    ResolveButton,
    DeleteButton,
    PrimaryButton,
    SecondaryButton,
    FormLabel,
    Input,
    Select,
    Textarea,
    ImageUploadLabel,
    Modal,
    ModalContent,
    ModalCloseButton,
    ImageInModal,
    Spinner,
} from './TicketDetailsPage.styles';

// Types
interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  imageUrl?: string;
  imageId?: string;
}

// Nav/Footer Components
const NavComponent = () => (
    <Nav>
        <NavContent>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <FaBolt size={24} style={{ color: 'var(--theme-primary-main, #f97316)' }} /> 
                <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--theme-text-primary, #0f172a)' }}>Wekoleko</span>
            </Link>
        </NavContent>
    </Nav>
);

const FooterComponent = () => (
    <Footer>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
            <p>© 2025 Wekoleko. All rights reserved.</p>
        </div>
    </Footer>
);

const TicketDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [editForm, setEditForm] = useState<Partial<Ticket>>({});
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [clearExistingImage, setClearExistingImage] = useState(false);

  // Fetch ticket data on mount
  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) {
        setError('Invalid ticket ID');
        setIsFetching(false);
        return;
      }

      try {
        setIsFetching(true);
        setError(null);
        const response = await ticketAPI.getById(id);
        setTicket(response.data);
        setEditForm(response.data);
      } catch (err: any) {
        console.error('Error fetching ticket:', err);
        const errorMsg = err.response?.data?.msg || 'Failed to load ticket';
        setError(errorMsg);
        
        // If ticket not found or unauthorized, redirect after a delay
        if (err.response?.status === 404 || err.response?.status === 401) {
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchTicket();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!ticket || !id) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('title', editForm.title || ticket.title);
      formData.append('description', editForm.description || ticket.description);
      formData.append('dueDate', editForm.dueDate || ticket.dueDate);
      formData.append('priority', editForm.priority || ticket.priority);
      formData.append('status', editForm.status || ticket.status);

      // Handle image update
      if (newImage) {
        formData.append('image', newImage);
      } else if (clearExistingImage) {
        formData.append('clearImage', 'true');
      }

      const response = await ticketAPI.update(id, formData);
      
      setTicket(response.data);
      setEditForm(response.data);
      setIsEditing(false);
      setNewImage(null);
      setNewImagePreview(null);
      setClearExistingImage(false);
    } catch (err: any) {
      console.error('Error updating ticket:', err);
      const errorMsg = err.response?.data?.msg || 'Failed to update ticket';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(ticket || {});
    setNewImage(null);
    setNewImagePreview(null);
    setClearExistingImage(false);
    setError(null);
  };

  const handleResolve = async () => {
    if (!ticket || !id) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('status', 'resolved');
      
      // Must include all required fields for the update
      formData.append('title', ticket.title);
      formData.append('description', ticket.description);
      formData.append('dueDate', ticket.dueDate);
      formData.append('priority', ticket.priority);

      const response = await ticketAPI.update(id, formData);
      setTicket(response.data);
      setEditForm(response.data);
    } catch (err: any) {
      console.error('Error resolving ticket:', err);
      const errorMsg = err.response?.data?.msg || 'Failed to resolve ticket';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      setIsLoading(true);
      setError(null);

      try {
        await ticketAPI.delete(id);
        navigate('/dashboard');
      } catch (err: any) {
        console.error('Error deleting ticket:', err);
        const errorMsg = err.response?.data?.msg || 'Failed to delete ticket';
        setError(errorMsg);
        setIsLoading(false);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setNewImage(file);
      setClearExistingImage(false);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setNewImagePreview(null);
    setClearExistingImage(true);
  };

  const displayImage = newImagePreview || ticket?.imageUrl;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Loading state
  if (isFetching) {
    return (
      <GlobalContainer>
        <NavComponent />
        <MainContentWrapper>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Spinner style={{ width: '3rem', height: '3rem', border: '3px solid #f97316', borderTopColor: 'transparent' }} />
          </div>
        </MainContentWrapper>
        <FooterComponent />
      </GlobalContainer>
    );
  }

  // Error state
  if (error && !ticket) {
    return (
      <GlobalContainer>
        <NavComponent />
        <MainContentWrapper>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <FaTimes size={48} color="#ef4444" />
            <h2 style={{ marginTop: '1rem', color: '#ef4444' }}>Error</h2>
            <p style={{ marginTop: '0.5rem' }}>{error}</p>
            <Link to="/dashboard" style={{ display: 'inline-block', marginTop: '1rem', color: '#f97316' }}>
              Return to Dashboard
            </Link>
          </div>
        </MainContentWrapper>
        <FooterComponent />
      </GlobalContainer>
    );
  }

  if (!ticket) return null;

  return (
    <GlobalContainer>
      <NavComponent />

      <PageHeader>
        <HeaderContent>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <BackButton as="div">
              <FaArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </BackButton>
          </Link>
        </HeaderContent>
      </PageHeader>

      <MainContentWrapper>
        {error && (
          <div style={{ 
            padding: '1rem', 
            marginBottom: '1rem', 
            backgroundColor: '#fee2e2', 
            color: '#991b1b', 
            borderRadius: '0.5rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <DetailsCard>
          <CardInnerHeader>
            <TitleWrapper>
              <TicketTitle>{isEditing ? 'Editing Ticket' : ticket.title}</TicketTitle>
              {!isEditing && (
                <StatusPillContainer>
                  <Pill $priority={ticket.priority}>
                    {ticket.priority.toUpperCase()} Priority
                  </Pill>
                  {ticket.status === 'resolved' ? (
                    <Pill $status="resolved">
                      <FaCheck size={14} />
                      Resolved
                    </Pill>
                  ) : (
                    <Pill $status="open">
                      <FaInfoCircle size={14} />
                      Open
                    </Pill>
                  )}
                </StatusPillContainer>
              )}
            </TitleWrapper>
            
            {!isEditing ? (
              <EditButton
                onClick={() => {
                  setIsEditing(true);
                  setEditForm({ ...ticket });
                  setError(null);
                }}
              >
                <FaEdit size={20} />
              </EditButton>
            ) : (
              <SecondaryButton
                onClick={handleCancelEdit}
                style={{ flex: '0 1 auto', minWidth: 'unset' }}
              >
                <FaTimes size={20} />
                Cancel
              </SecondaryButton>
            )}
          </CardInnerHeader>
          
          <CardBody>
            {!isEditing ? (
              <DetailSectionContainer>
                <DetailSection>
                  <SectionTitle>
                    <FaInfoCircle size={18} />
                    Ticket Description
                  </SectionTitle>
                  <DescriptionText>{ticket.description}</DescriptionText>
                </DetailSection>

                <TimelineGrid>
                  <InfoBlock>
                    <InfoLabel>
                      <FaCalendarAlt size={14} />
                      Due Date
                    </InfoLabel>
                    <InfoValue>{formatDate(ticket.dueDate)}</InfoValue>
                  </InfoBlock>
                  <InfoBlock>
                    <InfoLabel>
                      <FaClock size={14} />
                      Created On
                    </InfoLabel>
                    <InfoValue>{formatDate(ticket.createdAt)}</InfoValue>
                  </InfoBlock>
                </TimelineGrid>
                
                {displayImage && (
                  <DetailSection>
                    <SectionTitle>
                      <FaUpload size={18} />
                      Attached Image
                    </SectionTitle>
                    <ImageWrapper onClick={() => setShowImageModal(true)}>
                      <img src={displayImage} alt="Ticket attachment" />
                      <ImageViewOverlay>
                        <ViewImageButton onClick={(e) => { e.stopPropagation(); setShowImageModal(true); }}>
                          View Full Image
                        </ViewImageButton>
                      </ImageViewOverlay>
                    </ImageWrapper>
                  </DetailSection>
                )}

                <ActionButtons>
                  {ticket.status === 'open' && (
                    <ResolveButton onClick={handleResolve} disabled={isLoading}>
                      {isLoading ? <Spinner /> : (
                        <>
                          <FaCheck size={20} />
                          Mark as Resolved
                        </>
                      )}
                    </ResolveButton>
                  )}
                  <DeleteButton onClick={handleDelete} disabled={isLoading}>
                    <FaTrash size={20} />
                    Delete Ticket
                  </DeleteButton>
                </ActionButtons>
              </DetailSectionContainer>
            ) : (
              <DetailSectionContainer>
                <DetailSection>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </DetailSection>

                <DetailSection>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    id="description"
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={5}
                  />
                </DetailSection>

                <TimelineGrid>
                  <DetailSection>
                    <FormLabel htmlFor="priority">Priority</FormLabel>
                    <Select
                      id="priority"
                      value={editForm.priority || 'low'}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Select>
                  </DetailSection>

                  <DetailSection>
                    <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                    <Input
                      id="dueDate"
                      type="date"
                      value={editForm.dueDate?.split('T')[0] || ''}
                      onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                    />
                  </DetailSection>
                </TimelineGrid>

                <DetailSection>
                  <FormLabel>Update Image</FormLabel>
                  {(displayImage && !clearExistingImage) ? (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ border: '1px solid var(--theme-border)', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <img src={displayImage} alt="Current" style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}/>
                      </div>
                      <SecondaryButton type="button" onClick={handleRemoveImage} style={{ width: '100%' }}>
                        <FaTimes size={16} />
                        Remove Image
                      </SecondaryButton>
                    </div>
                  ) : (
                    <ImageUploadLabel>
                      <FaUpload size={32} />
                      <p>{newImage ? newImage.name : 'Click to upload new image (Max 5MB)'}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </ImageUploadLabel>
                  )}
                </DetailSection>

                <ActionButtons>
                  <PrimaryButton onClick={handleSave} disabled={isLoading}>
                    {isLoading ? <Spinner /> : (
                      <>
                        <FaSave size={20} />
                        Save Changes
                      </>
                    )}
                  </PrimaryButton>
                </ActionButtons>
              </DetailSectionContainer>
            )}
          </CardBody>
        </DetailsCard>
      </MainContentWrapper>

      {showImageModal && displayImage && (
        <Modal onClick={() => setShowImageModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setShowImageModal(false)}>
              <FaTimes size={24} />
            </ModalCloseButton>
            <ImageInModal src={displayImage} alt="Ticket full size" />
          </ModalContent>
        </Modal>
      )}

      <FooterComponent />
    </GlobalContainer>
  );
};

export default TicketDetailsPage;