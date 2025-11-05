import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowRight, 
  FaBolt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

import {
  // Global Layout Imports
  GlobalContainer,
  Nav,
  NavContent,
  LogoWrapper,
  LogoIcon,
  LogoText,
  DesktopNav,
  NavButton,
  MobileMenuButton,
  Footer,
  FooterLogoWrapper,
  FooterText,
  // Page Specific Containers
  PageContent,
  RegisterCard,
  HeaderWrapper,
  LogoGroup, 
  LogoIconWrapper,
  Title,
  Subtitle,
  RegisterForm,
  FieldGroup,
  Label,
  InputWrapper,
  Input,
  PasswordInput,
  InputIcon,
  PasswordToggleButton,
  StrengthContainer,
  StrengthText,
  StrengthBarWrapper,
  StrengthSegment,
  MatchIndicator,
  SubmitButton,
  LoadingSpinner,
  FooterLink
} from './RegisterPage.styles';


// --- Password Strength Logic ---
const checkPasswordStrength = (password: string) => {
  let score = 0;
  const length = password.length;
  if (length < 8) return { text: '', color: 'transparent', score: 0 };
  
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score === 1) return { text: 'Weak', color: '#EF4444', score: 1 }; // Red
  if (score >= 2 && score <= 3) return { text: 'Fair', color: '#F59E0B', score: 2 }; // Orange
  if (score >= 4) return { text: 'Strong', color: '#10B981', score: 3 }; // Green
  
  return { text: '', color: 'transparent', score: 0 };
};

// --- Error/Success Alert Component ---
interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const styles = {
    container: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: type === 'success' ? '#D1FAE5' : '#FEE2E2',
      border: `1px solid ${type === 'success' ? '#10B981' : '#EF4444'}`,
      color: type === 'success' ? '#065F46' : '#991B1B',
    },
    icon: {
      fontSize: '1.25rem',
      flexShrink: 0,
    },
    message: {
      flex: 1,
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      color: 'inherit',
      padding: '0.25rem',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        {type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
      </div>
      <div style={styles.message}>{message}</div>
      {onClose && (
        <button 
          onClick={onClose} 
          style={styles.closeButton}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

// --- Mock Nav/Footer Components ---

const NavComponent: React.FC = () => (
  <Nav>
    <NavContent>
      <Link to="/">
        <LogoWrapper>
          <LogoIcon><FaBolt /></LogoIcon>
          <LogoText>Wekoleko</LogoText>
        </LogoWrapper>
      </Link>
      <DesktopNav>
        <Link to="/login">
          <NavButton>Sign In</NavButton>
        </Link>
      </DesktopNav>
      <MobileMenuButton><FaBolt /></MobileMenuButton>
    </NavContent>
  </Nav>
);

const FooterComponent: React.FC = () => (
  <Footer>
    <NavContent style={{ flexDirection: 'column', gap: '1rem' }}>
      <FooterLogoWrapper>
        <LogoIcon><FaBolt /></LogoIcon>
        <LogoText>Wekoleko</LogoText>
      </FooterLogoWrapper>
      <FooterText>
        © {new Date().getFullYear()} Wekoleko. All rights reserved.
      </FooterText>
    </NavContent>
  </Footer>
);

// --- Main Component ---

const RegisterPage: React.FC = () => {
  // Get auth context
  const { register, isLoading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { password, confirmPassword, name, email } = formData;
  
  // Password validation
  const passwordStrength = useMemo(() => checkPasswordStrength(password), [password]);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  
  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 2) {
      errors.password = 'Please use a stronger password';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isFormValid = name.trim() && 
                      email.trim() && 
                      passwordsMatch && 
                      passwordStrength.score >= 2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
    
    // Clear alert when user makes changes
    if (alert) {
      setAlert(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous alerts
    setAlert(null);
    
    // Validate form
    if (!validateForm()) {
      setAlert({
        type: 'error',
        message: 'Please fix the errors in the form'
      });
      return;
    }
    
    if (!isFormValid || isLoading) return;
    
    try {
      // Call register from AuthContext
      const response = await register(name.trim(), email.trim(), password);
      
      if (response.success) {
        // Success! AuthContext will handle navigation to /dashboard
        setAlert({
          type: 'success',
          message: response.message || 'Registration successful! Redirecting...'
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        // Registration failed
        setAlert({
          type: 'error',
          message: response.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error: any) {
      // Handle unexpected errors
      console.error('Registration error:', error);
      setAlert({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  };
  
  const strengthBarWidth = passwordStrength.score * (100 / 3);
  
  const getStrengthColor = (score: number) => {
    if (score === 1) return '#EF4444';
    if (score === 2) return '#F59E0B';
    if (score === 3) return '#10B981';
    return 'transparent';
  };

  return (
    <GlobalContainer>
      <NavComponent />
      
      <PageContent>
        <RegisterCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeaderWrapper>
            <LogoGroup>
              <LogoIconWrapper><FaBolt /></LogoIconWrapper>
              <LogoText>Wekoleko</LogoText>
            </LogoGroup>
            <Title>Create Your Account</Title>
            <Subtitle>Start managing your maintenance right away.</Subtitle>
          </HeaderWrapper>

          {/* Alert Messages */}
          {alert && (
            <Alert 
              type={alert.type} 
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <RegisterForm onSubmit={handleSubmit}>
            {/* Name Field */}
            <FieldGroup>
              <Label htmlFor="name">Full Name</Label>
              <InputWrapper>
                <InputIcon><FaUser /></InputIcon>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                  style={{
                    borderColor: fieldErrors.name ? '#EF4444' : undefined
                  }}
                />
              </InputWrapper>
              {fieldErrors.name && (
                <StrengthText $color="#EF4444" style={{ marginTop: '0.25rem' }}>
                  {fieldErrors.name}
                </StrengthText>
              )}
            </FieldGroup>
            
            {/* Email Field */}
            <FieldGroup>
              <Label htmlFor="email">Email Address</Label>
              <InputWrapper>
                <InputIcon><FaEnvelope /></InputIcon>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  disabled={isLoading}
                  style={{
                    borderColor: fieldErrors.email ? '#EF4444' : undefined
                  }}
                />
              </InputWrapper>
              {fieldErrors.email && (
                <StrengthText $color="#EF4444" style={{ marginTop: '0.25rem' }}>
                  {fieldErrors.email}
                </StrengthText>
              )}
            </FieldGroup>

            {/* Password Field */}
            <FieldGroup>
              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <InputIcon><FaLock /></InputIcon>
                <PasswordInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  disabled={isLoading}
                  style={{
                    borderColor: fieldErrors.password ? '#EF4444' : undefined
                  }}
                />
                <PasswordToggleButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggleButton>
              </InputWrapper>
              
              {/* Password Strength Indicator */}
              <StrengthContainer>
                <StrengthBarWrapper>
                  <StrengthSegment 
                    $width={strengthBarWidth} 
                    $color={getStrengthColor(passwordStrength.score)} 
                  />
                </StrengthBarWrapper>
                <StrengthText $color={getStrengthColor(passwordStrength.score)}>
                  {passwordStrength.text}
                </StrengthText>
              </StrengthContainer>
              
              {fieldErrors.password && (
                <StrengthText $color="#EF4444" style={{ marginTop: '0.25rem' }}>
                  {fieldErrors.password}
                </StrengthText>
              )}
            </FieldGroup>

            {/* Confirm Password Field */}
            <FieldGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputWrapper>
                <InputIcon><FaLock /></InputIcon>
                <PasswordInput
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                  style={{
                    borderColor: fieldErrors.confirmPassword ? '#EF4444' : undefined
                  }}
                />
                <PasswordToggleButton
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggleButton>
              </InputWrapper>
              
              {/* Password Match Indicator */}
              {confirmPassword.length > 0 && (
                <MatchIndicator $isMatching={passwordsMatch}>
                  {passwordsMatch ? <FaCheckCircle /> : <FaTimesCircle />}
                  {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                </MatchIndicator>
              )}
              
              {fieldErrors.confirmPassword && (
                <StrengthText $color="#EF4444" style={{ marginTop: '0.25rem' }}>
                  {fieldErrors.confirmPassword}
                </StrengthText>
              )}
            </FieldGroup>

            {/* Submit Button */}
            <SubmitButton
              type="submit"
              disabled={isLoading || !isFormValid}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="arrow-icon" />
                </>
              )}
            </SubmitButton>
          </RegisterForm>
          
          {/* Footer Link */}
          <FooterLink>
            Already have an account?{' '}
            <Link to="/login">
              Sign In
            </Link>
          </FooterLink>

        </RegisterCard>
      </PageContent>
      
      <FooterComponent />
      
    </GlobalContainer>
  );
};

export default RegisterPage;