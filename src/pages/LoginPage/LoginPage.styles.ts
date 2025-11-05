import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Using generic icon types for styling purposes, actual icons are in the component
// import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaBolt, FaArrowRight } from 'react-icons/fa'; 
import TypographyComponent from '../../components/atoms/Typography';

const Typography = TypographyComponent;

// --- Animation Keyframes ---
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// --- General Layout Components (Adapted for consistency) ---

export const GlobalContainer = styled.div`
  min-height: 100vh;
  /* Simulating bg-gradient-to-br from-slate-50 via-white to-orange-50 */
  background: linear-gradient(135deg, 
    /* FIX: Replaced neutral.lightest and primary.lightest with available theme properties or approximations */
    ${props => props.theme.colors.background.default} 0%, /* Simulating slate-50/white */
    ${props => props.theme.colors.background.paper} 50%,
    ${props => props.theme.colors.primary.light} 100% /* Simulating orange-50/100 */
  );
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
`;

// --- Navigation Components (Copied/Adapted from HomePage.styles.ts) ---

export const Nav = styled.nav<{ $scrolled: boolean }>`
  width: 100%;
  padding: 0.5rem 0;
  background-color: ${props => props.theme.colors.background.paper};
  box-shadow: ${props => props.theme.shadows.sm};
  z-index: 50;
`;

export const NavContent = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem; /* h-18 */
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

export const LogoIcon = styled.div`
  /* Simulating w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl */
  width: 3rem; 
  height: 3rem; 
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.primary.dark});
  /* FIX: Using 0.75rem for rounded-xl as borderRadiusLg is missing */
  border-radius: 0.75rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

export const LogoText = styled(Typography)`
  /* Simulating text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent */
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* fallback */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.25rem; /* sm:text-4xl */
  }
`;

export const DesktopNav = styled.div`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
`;

export const NavButton = styled(Link)`
  /* FIX: Replaced neutral.dark with neutral.medium */
  color: ${props => props.theme.colors.neutral.medium};
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.shape.borderRadius};
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary.main};
    /* FIX: Replaced neutral.lightest with neutral.light */
    background-color: ${props => props.theme.colors.neutral.light}; 
  }
`;

export const ActionButton = styled(Link)`
  /* Signup button style */
  padding: 0.625rem 1.5rem;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  color: white;
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    opacity: 0.9;
  }
`;

// Dummy mobile menu components to satisfy LoginPage.tsx imports
export const MobileMenuButton = styled.button`display: none;`;
export const MobileMenu = styled(motion.div)`display: none;`;
export const MobileNavLink = styled(Link)`display: none;`;
export const MobileActionButton = styled(Link)`display: none;`;

// --- Login Specific Components ---

export const LoginContainer = styled.div`
  flex-grow: 1; /* Allows it to take up the space between nav and footer */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1.5rem;
`;

export const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px; /* max-w-md */
  background-color: ${props => props.theme.colors.background.paper};
  /* Simulating rounded-2xl shadow-xl border border-slate-100 */
  border-radius: 1.5rem; /* 2xl */
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.neutral.light};
  padding: 2rem; 

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 3rem; /* sm:p-8 */
  }
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const HeaderTitle = styled.h1`
  /* Simulating text-3xl sm:text-4xl font-bold text-slate-900 */
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.25rem; /* sm:text-4xl */
  }
`;

export const HeaderSubtitle = styled.p`
  /* Simulating text-slate-600 */
  color: ${props => props.theme.colors.text.secondary};
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* space-y-5 */
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Label = styled.label`
  /* Simulating block text-sm font-semibold text-slate-700 mb-2 */
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const InputControl = styled.input`
  /* Simulating w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 */
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem; /* py-3, pl-11, pr-4 */
  border: 2px solid ${props => props.theme.colors.neutral.light}; /* border-2 border-slate-200 */
  /* FIX: Using 0.75rem for rounded-xl as borderRadiusLg is missing */
  border-radius: 0.75rem; 
  background-color: ${props => props.theme.colors.background.default};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary.main}; /* focus:border-orange-500 */
    outline: none;
    box-shadow: 0 0 0 1px ${props => props.theme.colors.primary.main};
  }
`;

export const InputIcon = styled.div`
  /* Simulating absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 */
  position: absolute;
  left: 0.75rem; /* left-3 */
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem; /* w-5 h-5 */
  color: ${props => props.theme.colors.text.secondary}; /* text-slate-400 */
  pointer-events: none;
`;

export const PasswordToggle = styled.button`
  /* Simulating absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 */
  position: absolute;
  right: 0.75rem; /* right-3 */
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

export const ForgotPasswordLink = styled(Link)`
  /* Simulating text-sm text-orange-600 hover:text-orange-700 font-medium */
  font-size: 0.875rem;
  color: ${props => props.theme.colors.primary.main};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary.dark};
    text-decoration: underline;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  /* Simulating w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500 */
  width: 1rem;
  height: 1rem;
  color: ${props => props.theme.colors.primary.main};
  /* FIX: Replaced neutral.main with neutral.medium */
  border: 1px solid ${props => props.theme.colors.neutral.medium}; 
  border-radius: ${props => props.theme.shape.borderRadiusSm};
  cursor: pointer;
  
  &:checked {
    background-color: ${props => props.theme.colors.primary.main};
    border-color: ${props => props.theme.colors.primary.main};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.light};
  }
`;

export const CheckboxLabel = styled.label`
  /* Simulating ml-2 text-sm text-slate-700 */
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.primary};
`;

export const SubmitButton = styled.button`
  /* Simulating w-full py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 */
  width: 100%;
  padding: 0.875rem 1.5rem; /* py-3.5 */
  background: linear-gradient(90deg, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  color: white;
  /* FIX: Using 0.75rem for rounded-xl as borderRadiusLg is missing */
  border-radius: 0.75rem; 
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    /* Simulating hover:scale-[1.02] */
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const LoadingSpinner = styled.div`
  /* Simulating w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin */
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Divider = styled.div`
  /* Simulating relative my-6 */
  position: relative;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const DividerLine = styled.div`
  /* Simulating absolute inset-0 flex items-center */
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: ${props => props.theme.colors.neutral.light};
`;

export const DividerText = styled.div`
  /* Simulating relative flex justify-center text-sm */
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  
  span {
    /* Simulating px-4 bg-white text-slate-500 */
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* space-y-3 */
`;

export const SocialButton = styled.button`
  /* Simulating w-full py-3 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 */
  width: 100%;
  padding: 0.75rem 1rem; /* py-3 */
  border: 2px solid ${props => props.theme.colors.neutral.light};
  /* FIX: Using 0.75rem for rounded-xl as borderRadiusLg is missing */
  border-radius: 0.75rem; 
  background-color: ${props => props.theme.colors.background.paper};
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem; /* gap-3 */
  cursor: pointer;

  &:hover {
    /* FIX: Replaced neutral.main with neutral.medium */
    border-color: ${props => props.theme.colors.neutral.medium};
    /* FIX: Replaced neutral.lightest with neutral.light */
    background-color: ${props => props.theme.colors.neutral.light};
  }
`;

export const LoginFooterText = styled.p`
  /* Simulating text-center mt-6 text-slate-600 */
  text-align: center;
  margin-top: 1.5rem; /* mt-6 */
  color: ${props => props.theme.colors.text.secondary};
`;

export const FooterLink = styled(Link)`
  /* Simulating text-orange-600 hover:text-orange-700 font-semibold */
  color: ${props => props.theme.colors.primary.main};
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary.dark};
    text-decoration: underline;
  }
`;

export const TrustBadgeWrapper = styled.div`
  /* Simulating mt-8 text-center */
  margin-top: 2rem;
  text-align: center;
`;

export const TrustBadgeText = styled.p`
  /* Simulating text-xs text-slate-500 mb-2 */
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const TrustBadgeInfo = styled.div`
  /* Simulating flex items-center justify-center gap-4 text-slate-400 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  /* FIX: Replaced neutral.main with neutral.medium */
  color: ${props => props.theme.colors.neutral.medium};

  span {
    font-size: 0.875rem; /* text-sm */
  }
`;

// --- Footer Components (Copied/Adapted from HomePage.styles.ts) ---

export const Footer = styled.footer`
  /* Simulating bg-slate-800 text-white */
  /* FIX: Replaced background.dark with background.default (darker than paper) as a fallback */
  background-color: ${props => props.theme.colors.background.default}; 
  /* FIX: Replaced neutral.lightest with white for high contrast */
  color: white;
  padding: 2rem 0;
`;

export const FooterContent = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FooterLogoWrapper = styled.div`
  /* Reusing LogoIcon and LogoText styles for the footer, but adjusting text color */
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FooterLogoIcon = styled(LogoIcon)`
  /* Override LogoIcon for better contrast on dark background */
  width: 2rem; 
  height: 2rem; 
  font-size: 1.2rem;
  background: ${props => props.theme.colors.primary.main}; /* Simple solid color for contrast */
`;

export const FooterLogoText = styled(LogoText)`
  /* Override LogoText to be white/light on dark background */
  background: none;
  /* FIX: Replaced neutral.lightest with white */
  -webkit-text-fill-color: white;
  color: white;
  font-size: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem; 
  }
`;

export const FooterText = styled.p`
  /* Simulating text-sm text-slate-400 */
  font-size: 0.875rem;
  /* FIX: Replaced neutral.main with neutral.medium */
  color: ${props => props.theme.colors.neutral.medium};
`;