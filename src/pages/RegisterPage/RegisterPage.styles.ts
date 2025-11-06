import styled, { keyframes, css } from 'styled-components';
import { motion, MotionProps } from 'framer-motion';

// --- Animations ---
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// --- PRIMARY BUTTON MIXIN ---
const primaryButtonStyles = (props: any) => css`
  background-color: ${props.theme.colors.primary.main};
  color: white;
  border: 1px solid ${props.theme.colors.primary.main};
  border-radius: ${props.theme.shape.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props.theme.colors.primary.dark};
    border-color: ${props.theme.colors.primary.dark};
    box-shadow: ${props.theme.shadows.md};
  }
`;
// --- END PRIMARY BUTTON MIXIN ---

// --- GLOBAL LAYOUT COMPONENTS (For Nav/Footer) ---

export const GlobalContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background.default};
`;

export const Nav = styled.nav`
  background-color: white;
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const NavContent = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.shape.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
`;

export const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

export const NavButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.shape.borderRadius};
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  
  &.active,
  &:hover {
    color: ${props => props.theme.colors.primary.main};
    background-color: ${props => props.theme.colors.neutral.light};
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  padding: 0.5rem;
  cursor: pointer;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 4rem; /* Below Nav, assuming nav height is 4rem */
  left: 0;
  right: 0;
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 40;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

// MobileActionButton FIX: Use primaryButtonStyles mixin
export const MobileActionButton = styled(NavButton)`
  ${primaryButtonStyles}; 
  margin-top: 0.5rem;
  width: 100%;
  text-align: center;
  color: white !important;
`;

export const MobileNavLink = styled(NavButton)`
  width: 100%;
  text-align: left;
  display: block;
`;

export const Footer = styled.footer`
  background-color: ${props => props.theme.colors.background.paper};
  padding: 2rem 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const FooterLogoWrapper = styled(LogoWrapper)`
  margin-bottom: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
`;


// --- Register Page Specific Components ---

export const PageContent = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background-color: ${props => props.theme.colors.background.default};
`;

export const RegisterCard = styled(motion.div)`
  width: 100%;
  max-width: 28rem; /* max-w-md */
  background-color: white;
  border-radius: ${props => props.theme.shape.borderRadius}; /* rounded-2xl */
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.border}; /* border border-slate-100 */
  padding: 1.5rem; /* p-6 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem; /* sm:p-8 */
  }
`;

export const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5rem; /* mb-6 */
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const LogoIconWrapper = styled.div`
  ${LogoIcon}
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1rem;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem; /* left-3 */
  color: ${props => props.theme.colors.text.secondary}; /* text-slate-400 */
  pointer-events: none;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

// Input and PasswordInput share the same base styling
const BaseInputStyles = css`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem; /* py-3 px-4 pl-10 */
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.shape.borderRadius};
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: ${props => props.theme.colors.background.paper};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary.main};
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary.light};
  }
`;

export const Input = styled.input`
  ${BaseInputStyles}
`;

export const PasswordInput = styled.input`
  ${BaseInputStyles}
  padding-right: 2.5rem; /* Added padding for toggle button */
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 0.75rem; /* right-3 */
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

// --- Password Strength Components ---

export const StrengthContainer = styled.div`
  margin-top: 0.5rem;
`;

export const StrengthBarWrapper = styled.div`
  height: 6px; /* h-1.5 */
  background-color: ${props => props.theme.colors.neutral.light}; /* bg-slate-200 */
  border-radius: 9999px; /* rounded-full */
  overflow: hidden;
  margin-top: 0.25rem; /* mt-1 */
`;

export const StrengthSegment = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${props => props.$width}%;
  background-color: ${props => props.$color};
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;

export const StrengthText = styled.p<{ $color: string }>`
  font-size: 0.75rem; /* text-xs */
  font-weight: 500; /* font-medium */
  color: ${props => props.$color === 'transparent' ? props.theme.colors.text.secondary : props.$color};
  transition: color 0.3s ease-in-out;
  min-height: 0.875rem; /* Ensure space when empty */
`;

// --- Match Indicator ---

export const MatchIndicator = styled.div<{ $isMatching: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
  margin-top: 0.5rem;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;

  color: ${props => props.$isMatching ? 
    props.theme.colors.success.main : 
    props.theme.colors.error.main
  };

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

// --- Submit Button ---

// FIX: Properly type the motion button component
export const SubmitButton = styled(motion.button)`
  ${primaryButtonStyles}; 
  width: 100%;
  padding: 0.75rem 1rem; /* py-3 */
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:disabled {
    background-color: ${props => props.theme.colors.neutral.medium};
    cursor: not-allowed;
    box-shadow: none;
    .arrow-icon {
      transform: translateX(0);
    }
  }

  .arrow-icon {
    margin-left: 0.25rem;
    transition: transform 0.3s ease-in-out;
  }

  &:not(:disabled):hover .arrow-icon {
    transform: translateX(4px);
  }
`;

export const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

// --- Footer Link ---

export const FooterLink = styled(motion.p)`
  margin-top: 1.5rem; /* mt-6 */
  text-align: center;
  font-size: 0.875rem; /* text-sm */
  color: ${props => props.theme.colors.text.secondary};
  
  a {
    color: ${props => props.theme.colors.primary.main};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: ${props => props.theme.colors.primary.dark};
    }
  }
`;