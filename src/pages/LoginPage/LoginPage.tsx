import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaBolt, FaArrowRight, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Import all necessary styled components
import { 
  GlobalContainer,
  Nav,
  NavContent,
  LogoWrapper,
  LogoIcon,
  LogoText,
  DesktopNav,
  NavButton,
  ActionButton,
  Footer,
  FooterContent,
  FooterLogoWrapper,
  FooterLogoIcon,
  FooterLogoText,
  FooterText,
  LoginContainer,
  LoginCard,
  LoginHeader,
  HeaderTitle,
  HeaderSubtitle,
  FormWrapper,
  InputGroup,
  Label,
  InputControl,
  InputIcon,
  PasswordToggle,
  ForgotPasswordLink,
  CheckboxGroup,
  CheckboxInput,
  CheckboxLabel,
  SubmitButton,
  LoadingSpinner,
  Divider,
  DividerLine,
  DividerText,
  SocialLoginWrapper,
  SocialButton,
  LoginFooterText,
  FooterLink,
  TrustBadgeWrapper,
  TrustBadgeText,
  TrustBadgeInfo,
} from './LoginPage.styles';

// Error/Success Alert Component
const Alert = ({ type, message }: { type: 'error' | 'success'; message: string }) => (
  <div style={{
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: type === 'error' ? '#FEE2E2' : '#D1FAE5',
    color: type === 'error' ? '#991B1B' : '#065F46',
    border: `1px solid ${type === 'error' ? '#FCA5A5' : '#6EE7B7'}`,
  }}>
    {type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
    <span>{message}</span>
  </div>
);

interface FormData {
  email: string;
  password: string;
}

// Nav Component
const NavComponent = () => (
  <Nav $scrolled={false}> 
    <NavContent>
      <LogoWrapper to="/">
        <LogoIcon>
          <FaBolt />
        </LogoIcon>
        <LogoText as="span">Wekoleko</LogoText>
      </LogoWrapper>
      <DesktopNav>
        <NavButton to="/">Home</NavButton>
        <ActionButton to="/register">Sign Up</ActionButton>
      </DesktopNav>
    </NavContent>
  </Nav>
);

// Footer Component
const FooterComponent = () => (
  <Footer>
    <FooterContent>
      <FooterLogoWrapper>
        <FooterLogoIcon>
          <FaBolt />
        </FooterLogoIcon>
        <FooterLogoText as="span">Wekoleko</FooterLogoText>
      </FooterLogoWrapper>
      <FooterText>
        © {new Date().getFullYear()} Wekoleko. All rights reserved.
      </FooterText>
    </FooterContent>
  </Footer>
);

// --- Main Login Component ---
const LoginPage: React.FC = () => {
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call login function from AuthContext
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setSuccess(result.message || 'Login successful! Redirecting...');
        
        // Handle "Remember Me" functionality
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('rememberedEmail');
        }
        
        // The AuthContext will handle navigation to dashboard
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    if (remembered === 'true' && rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);
  
  const isFormValid = formData.email.length > 0 && formData.password.length > 0;

  return (
    <GlobalContainer>
      <NavComponent />

      <LoginContainer>
        <LoginCard
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <LoginHeader>
            <LogoWrapper to="/" style={{ marginBottom: '1rem' }}>
              <LogoIcon>
                <FaBolt />
              </LogoIcon>
              <LogoText as="span">Wekoleko</LogoText>
            </LogoWrapper>
            <HeaderTitle>Welcome back</HeaderTitle>
            <HeaderSubtitle>
              Sign in to continue managing your maintenance
            </HeaderSubtitle>
          </LoginHeader>

          {/* Error/Success Messages */}
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <FormWrapper as="form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <InputGroup>
              <Label htmlFor="email">Email Address</Label>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <InputControl
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                disabled={isLoading}
                autoComplete="email"
              />
            </InputGroup>

            {/* Password Field */}
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '0.5rem' 
              }}>
                <Label htmlFor="password" style={{ marginBottom: '0' }}>
                  Password
                </Label>
                <ForgotPasswordLink to="/forgot-password">
                  Forgot?
                </ForgotPasswordLink>
              </div>
              <InputGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <InputControl
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ paddingRight: '3rem' }}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputGroup>
            </div>

            {/* Remember Me */}
            <CheckboxGroup>
              <CheckboxInput
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="remember">
                Remember me for 30 days
              </CheckboxLabel>
            </CheckboxGroup>

            {/* Submit Button */}
            <SubmitButton
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight style={{ transition: 'transform 0.2s ease' }} />
                </>
              )}
            </SubmitButton>
          </FormWrapper>

          {/* Divider */}
          <Divider>
            <DividerLine />
            <DividerText>
              <span>or continue with</span>
            </DividerText>
          </Divider>

          {/* Social Login Options - Coming Soon */}
          <SocialLoginWrapper>
            <SocialButton
              type="button"
              onClick={() => setError('Social login coming soon!')}
              disabled={isLoading}
            >
              <FaGoogle style={{ color: '#4285F4' }} />
              Sign in with Google
            </SocialButton>
            
            <SocialButton
              type="button"
              onClick={() => setError('Social login coming soon!')}
              disabled={isLoading}
            >
              <FaGithub />
              Sign in with GitHub
            </SocialButton>
          </SocialLoginWrapper>
        </LoginCard>

        {/* Footer Link */}
        <LoginFooterText>
          Don't have an account?{' '}
          <FooterLink to="/register">
            Sign up for free
          </FooterLink>
        </LoginFooterText>
        
        {/* Trust Badge */}
        <TrustBadgeWrapper>
          <TrustBadgeText>Trusted by 500+ maintenance teams</TrustBadgeText>
          <TrustBadgeInfo>
            <FaCheckCircle style={{ fontSize: '1.25rem' }} />
            <span>256-bit SSL Encryption</span>
          </TrustBadgeInfo>
        </TrustBadgeWrapper>
      </LoginContainer>

      <FooterComponent />
    </GlobalContainer>
  );
};

export default LoginPage;