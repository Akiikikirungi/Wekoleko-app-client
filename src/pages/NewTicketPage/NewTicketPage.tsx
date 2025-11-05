import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../../api';

// Core component imports
import Input from '../../components/atoms/Input';
import Typography from '../../components/atoms/Typography';
import TextArea from '../../components/atoms/TextArea';
import Button from '../../components/atoms/Button';

// Styled Component Imports
import { 
  Nav, NavContent, LogoWrapper, LogoIcon, LogoText, DesktopNav, NavButton,
  MobileMenuButton, MobileMenu, MobileNavLink, MobileActionButton,
  Footer, FooterLogoWrapper, FooterText, GlobalPageContainer, 
  MainContentWrapper, PageHeader, HeaderContent, BackButton,
  FormCard, FormStep, FormNavigation, CharacterCounter,
  ImageUploadArea, ImagePreview, PreviewImage, RemoveImageButton,
  StepSection, StepItem, StepCircle, StepLine, StepText, StepTitle, StepSubtitle,
  PrioritySelector, PriorityButtonCard, PriorityHeader, PriorityLabel, PriorityDescription, PriorityDot,
  SummaryBox, SummaryHeader, SummaryItem, SummaryLabel, SummaryValue,
  BackButtonText, PageTitle, MobileStepTitle, FormSectionLabel, UploadText,
} from './NewTicketPage.styles'; 

import { 
  FaArrowLeft, FaArrowRight, FaCheck, FaTimes, FaUpload, 
  FaCalendarAlt, FaExclamationCircle, FaBolt, FaBars 
} from 'react-icons/fa'; 

interface FormInputs {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | undefined;
  dueDate: Date | undefined;
  image?: File;
}

const STEPS = [
  { title: 'Basic Info', subtitle: 'Title & Priority' },
  { title: 'Details', subtitle: 'Description & Due Date' },
  { title: 'Attachment', subtitle: 'Add Image (Optional)' }
];

const priorities = [
  { value: 'low', label: 'Low', color: '#10b981', description: 'Non-urgent, can wait' },
  { value: 'medium', label: 'Medium', color: '#f59e0b', description: 'Moderate urgency' },
  { value: 'high', label: 'High', color: '#ef4444', description: 'Needs attention ASAP' }
];

const priorityColorsMap: { [key in FormInputs['priority'] & string]: { color: string, label: string } } = {
  low: { color: '#10b981', label: 'LOW' },
  medium: { color: '#f59e0b', label: 'MEDIUM' },
  high: { color: '#ef4444', label: 'HIGH' }
};

// Custom input component for DatePicker
const DateInput = React.forwardRef(({ value, onClick, error, fullWidth }: any, ref: React.Ref<any>) => (
  <div style={{ position: 'relative' }}>
    <FaCalendarAlt style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1.25rem', height: '1.25rem', zIndex: 5 }} />
    <Input
      label="Due Date *"
      value={value}
      onClick={onClick}
      error={error}
      fullWidth={fullWidth}
      readOnly
      ref={ref}
      style={{ 
        paddingLeft: '2.5rem', 
        background: 'white',
        color: '#1f2937',
        border: '1px solid #d1d5db'
      }} 
    />
  </div>
));

const NewTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { 
    control, 
    handleSubmit, 
    watch, 
    trigger, 
    formState: { errors, isSubmitting } 
  } = useForm<FormInputs>({
    defaultValues: {
      priority: undefined,
      dueDate: undefined
    }
  });

  const watchTitle = watch('title');
  const watchDescription = watch('description');
  const watchPriority = watch('priority');
  const watchDueDate = watch('dueDate');
  const watchImage = watch('image');

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, onChange: (file: File | undefined) => void) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onChange(file);
    }
  };

  // FIX: Real API submission with proper error handling
  const onSubmit = async (data: FormInputs) => {
    try {
      setSubmitError(null);
      
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('priority', data.priority!); 
      formData.append('dueDate', data.dueDate!.toISOString());
      
      // Only append image if it exists
      if (data.image) {
        formData.append('image', data.image); 
      }
      
      // FIX: Uncommented and added proper headers
      const response = await API.post('/tickets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Ticket created:', response.data);
      
      // Navigate to dashboard with success message
      navigate('/dashboard', { 
        state: { message: 'Ticket created successfully!' } 
      });
    } catch (error: any) {
      console.error('Error creating ticket:', error);
      
      // Set user-friendly error message
      const errorMessage = error.response?.data?.msg 
        || error.response?.data?.message 
        || 'Failed to create ticket. Please try again.';
      
      setSubmitError(errorMessage);
    }
  };

  // Validation and step navigation
  const validateStep = async (step: number) => {
    const fieldsToValidate = {
      0: ['title', 'priority'], 
      1: ['description', 'dueDate'],
      2: [] as string[]
    };
    const fields = fieldsToValidate[step as keyof typeof fieldsToValidate];
    if (fields.length === 0) return true;

    const isValid = await trigger(fields as ('title' | 'priority' | 'description' | 'dueDate')[]);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const stepVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -1000 : 1000, opacity: 0 })
  };

  return (
    <GlobalPageContainer>
      {/* Navigation */}
      <Nav $scrolled={scrolled}>
        <NavContent>
          <LogoWrapper as={Link} to="/">
            <LogoIcon><FaBolt /></LogoIcon>
            <LogoText>Wekoleko</LogoText>
          </LogoWrapper>
          
          <DesktopNav>
            <MobileNavLink as={Link} to="/dashboard">Dashboard</MobileNavLink>
            <NavButton as={Link} to="/logout">Sign Out</NavButton>
          </DesktopNav>

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </MobileMenuButton>
        </NavContent>
        {mobileMenuOpen && (
          <MobileMenu>
            <MobileNavLink as={Link} to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
            <MobileActionButton as={Link} to="/logout" onClick={() => setMobileMenuOpen(false)}>Sign Out</MobileActionButton>
          </MobileMenu>
        )}
      </Nav>

      {/* Header Section */}
      <PageHeader>
        <HeaderContent>
          <BackButton as={Link} to="/dashboard">
            <FaArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
            <BackButtonText as="span">
              Back to Dashboard
            </BackButtonText>
          </BackButton>
          <PageTitle>
            Create New Ticket
          </PageTitle>
          <Typography variant="body1" color="textSecondary">
            Fill out the details to report your maintenance issue
          </Typography>
        </HeaderContent>
      </PageHeader>
      
      <MainContentWrapper>
        {/* Progress Step Indicator (Desktop View) */}
        <StepSection>
          {STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && 
                <StepLine 
                  isCompleted={idx < currentStep} 
                  isFirst={idx === 0} 
                  isLast={idx === STEPS.length - 1} 
                />}
              
              <StepItem 
                isActive={idx === currentStep} 
                isCompleted={idx < currentStep}
              >
                <StepCircle 
                  isActive={idx === currentStep} 
                  isCompleted={idx < currentStep}
                >
                  {idx < currentStep ? <FaCheck style={{ width: '1.25rem', height: '1.25rem' }} /> : idx + 1}
                </StepCircle>
                <StepText>
                  <StepTitle>{step.title}</StepTitle>
                  <StepSubtitle>{step.subtitle}</StepSubtitle>
                </StepText>
              </StepItem>

              {idx < STEPS.length - 1 && 
                <StepLine 
                  isCompleted={idx < currentStep} 
                  isFirst={idx === 0} 
                  isLast={idx === STEPS.length - 1} 
                />}
            </React.Fragment>
          ))}
        </StepSection>
        
        {/* Simple Progress Display for Mobile */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'block' }}>
          <MobileStepTitle as="h2">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </MobileStepTitle>
          <Typography variant="body2" color="textSecondary">
            {STEPS[currentStep].subtitle}
          </Typography>
        </div>

        {/* FIX: Changed from form to div to prevent auto-submit */}
        <FormCard 
          as="div"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          style={{ marginTop: 0 }}
        >
          {/* Display submission error if exists */}
          {submitError && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#fee2e2', 
              border: '1px solid #ef4444', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              color: '#991b1b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaExclamationCircle />
                <span>{submitError}</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {/* Step 0: Basic Info */}
            {currentStep === 0 && (
              <FormStep 
                key="step-0" 
                custom={1}
                variants={stepVariants} 
                initial="enter" 
                animate="center" 
                exit="exit" 
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: 'Title is required', maxLength: { value: 100, message: 'Max length is 100 characters' } }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        label="Ticket Title *"
                        placeholder="e.g., Fix leaking faucet in kitchen"
                        error={errors.title?.message}
                        fullWidth
                        maxLength={100}
                        style={{ 
                          background: 'white', 
                          color: '#1f2937', 
                          border: '1px solid #d1d5db'
                        }} 
                      />
                      <CharacterCounter isOverLimit={field.value?.length > 100}>
                        {field.value?.length || 0}/100 characters
                      </CharacterCounter>
                    </div>
                  )}
                />

                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: 'Priority is required' }}
                  render={({ field }) => (
                    <div>
                      <FormSectionLabel as="h3">
                        Priority Level *
                      </FormSectionLabel>
                      <PrioritySelector>
                        {priorities.map((p) => (
                          <PriorityButtonCard
                            key={p.value}
                            type="button"
                            isSelected={field.value === p.value}
                            priorityColor={p.color}
                            onClick={() => field.onChange(p.value)}
                          >
                            <PriorityHeader>
                              <PriorityDot color={p.color} />
                              <PriorityLabel>{p.label}</PriorityLabel>
                            </PriorityHeader>
                            <PriorityDescription>{p.description}</PriorityDescription>
                          </PriorityButtonCard>
                        ))}
                      </PrioritySelector>
                      {errors.priority && (
                        <Typography variant="caption" color="error">
                          {errors.priority.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </FormStep>
            )}

            {/* Step 1: Details */}
            {currentStep === 1 && (
              <FormStep 
                key="step-1" 
                custom={-1}
                variants={stepVariants} 
                initial="enter" 
                animate="center" 
                exit="exit" 
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Description is required', maxLength: { value: 1000, message: 'Max length is 1000 characters' } }}
                  render={({ field }) => (
                    <div>
                      <TextArea
                        {...field}
                        label="Description *"
                        placeholder="Describe the maintenance issue in detail..."
                        error={errors.description?.message}
                        rows={6}
                        fullWidth
                        maxLength={1000}
                        style={{ 
                          background: 'white', 
                          color: '#1f2937', 
                          border: '1px solid #d1d5db'
                        }}
                      />
                      <CharacterCounter isOverLimit={field.value?.length > 1000}>
                        {field.value?.length || 0}/1000 characters
                      </CharacterCounter>
                    </div>
                  )}
                />

                <Controller
                  name="dueDate"
                  control={control}
                  rules={{ required: 'Due date is required' }}
                  render={({ field }) => (
                    <div>
                      <DatePicker
                        selected={field.value || null}
                        onChange={(date) => field.onChange(date)}
                        customInput={<DateInput error={errors.dueDate?.message} fullWidth />}
                        minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                      />
                      {errors.dueDate && (
                        <Typography variant="caption" color="error">
                          {errors.dueDate.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </FormStep>
            )}

            {/* Step 2: Attachment */}
            {currentStep === 2 && (
              <FormStep 
                key="step-2" 
                custom={1}
                variants={stepVariants} 
                initial="enter" 
                animate="center" 
                exit="exit" 
                transition={{ type: "tween", duration: 0.3 }}
              >
                <FormSectionLabel as="p">
                  Attach Image (Optional)
                </FormSectionLabel>
                
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      {!value ? (
                        <label>
                          <ImageUploadArea
                            isDragging={isDragging}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, onChange)}
                          >
                            <FaUpload style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 1rem' }} />
                            <UploadText as="p">
                              Click to upload or drag and drop
                            </UploadText>
                            <Typography variant="body2" color="textSecondary">
                              PNG, JPG, GIF up to 5MB
                            </Typography>
                          </ImageUploadArea>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            style={{ display: 'none' }}
                          />
                        </label>
                      ) : (
                        <ImagePreview>
                          <PreviewImage
                            src={URL.createObjectURL(value as File)}
                            alt="Preview"
                          />
                          <RemoveImageButton
                            type="button"
                            onClick={() => onChange(undefined)}
                          >
                            <FaTimes />
                          </RemoveImageButton>
                        </ImagePreview>
                      )}
                    </div>
                  )}
                />

                {/* Summary Box (Review Your Ticket) */}
                <SummaryBox>
                  <SummaryHeader>
                    <FaExclamationCircle style={{ width: '1.25rem', height: '1.25rem', color: priorityColorsMap.medium.color }} />
                    Review Your Ticket
                  </SummaryHeader>
                  <SummaryItem>
                    <SummaryLabel>Title:</SummaryLabel>
                    <SummaryValue>{watchTitle || 'N/A'}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Priority:</SummaryLabel>
                    <SummaryValue color={watchPriority ? priorityColorsMap[watchPriority].color : undefined}>
                      {watchPriority?.toUpperCase() || 'N/A'}
                    </SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Due:</SummaryLabel>
                    <SummaryValue>
                      {watchDueDate ? watchDueDate.toLocaleDateString() : 'N/A'}
                    </SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Image:</SummaryLabel>
                    <SummaryValue>
                      {watchImage ? 'Yes' : 'No'}
                    </SummaryValue>
                  </SummaryItem>
                </SummaryBox>
              </FormStep>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <FormNavigation>
            {currentStep > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={isSubmitting}
                startIcon={<FaArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />}
                style={{ 
                  color: '#1f2937',
                  border: '1px solid #9ca3af',
                  backgroundColor: '#f9fafb'
                }}
              >
                Previous
              </Button>
            )}
            
            {currentStep < STEPS.length - 1 ? (
              <Button
                type="button"
                variant="primary"
                onClick={nextStep}
                style={{ 
                  marginLeft: currentStep === 0 ? 'auto' : '0',
                  color: '#1f2937',
                  border: '1px solid #9ca3af',
                  backgroundColor: '#f9fafb'
                }}
                endIcon={<FaArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />}
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting} 
                disabled={isSubmitting}
                startIcon={<FaCheck style={{ width: '1.25rem', height: '1.25rem' }} />}
                style={{ 
                  flexGrow: 1,
                  color: '#1f2937',
                  border: '1px solid #9ca3af',
                  backgroundColor: '#f9fafb' 
                }}
              >
                {isSubmitting ? 'Creating...' : 'Create Ticket'}
              </Button>
            )}
          </FormNavigation>
        </FormCard>
      </MainContentWrapper>
      
      {/* Footer */}
      <Footer>
        <FooterLogoWrapper>
          <LogoIcon><FaBolt /></LogoIcon>
          <LogoText as="span">Wekoleko</LogoText>
        </FooterLogoWrapper>
        <FooterText>
          © 2025 Wekoleko. All rights reserved.
        </FooterText>
      </Footer>
    </GlobalPageContainer>
  );
};

export default NewTicketPage;