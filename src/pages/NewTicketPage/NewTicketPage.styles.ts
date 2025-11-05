import styled from 'styled-components';
import { motion } from 'framer-motion';

// NOTE: In a production environment, you should move the Nav, Footer, and Global 
// components to a shared Layout.styles.ts file and import them here.
// They are included below for completeness based on the HomePage.styles.ts structure.

// --- Global Layout Components (Derived from HomePage.styles.ts) ---

export const GlobalPageContainer = styled.div`
  min-height: 100vh;
  /* Matches the gradient background from the original component's outer div */
  background: linear-gradient(to bottom right, 
    ${props => props.theme.colors.background.default}, 
    ${props => props.theme.colors.background.paper}50, /* Lighter variant for gradient middle */
    ${props => props.theme.colors.background.default});
  padding-bottom: 5rem;
  /* Account for fixed navigation bar */
  padding-top: 0; 
`;

export const MainContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-top: 2rem;
`;

// --- Navigation (Required for refactored NewTicketPage.tsx) ---

export const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 50;
  top: 0;
  transition: all 0.3s ease-in-out;
  background-color: ${props => props.theme.colors.background.paper};
  box-shadow: ${props => props.theme.shadows.md};
`;

export const NavContent = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const LogoIcon = styled.div`
  color: ${props => props.theme.colors.primary.main};
  font-size: 1.5rem;
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
`;

export const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

export const NavButton = styled.a`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.shape.borderRadius};
  /* FIX: TS2339 - Changed secondary to primary */
  background-color: ${props => props.theme.colors.primary.main}; 
  color: white;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    /* FIX: TS2339 - Changed secondary to primary */
    background-color: ${props => props.theme.colors.primary.dark}; 
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  padding: 0.5rem;
  color: ${props => props.theme.colors.text.primary};
  border: none;
  background: none;
  cursor: pointer;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  padding: 0.75rem 0;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

export const MobileActionButton = styled(NavButton)`
  margin-top: 1rem;
  text-align: center;
  width: 100%;
`;


// --- Footer (Required for refactored NewTicketPage.tsx) ---

export const Footer = styled.footer`
  background-color: ${props => props.theme.colors.background.paper};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 2rem 1.5rem;
  text-align: center;
  max-width: 100%;
`;

export const FooterLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
`;


// --- Page Header (New Design) ---

export const PageHeader = styled.div`
  background-color: ${props => props.theme.colors.background.paper};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: 2rem;
  padding-top: 4rem; /* Account for fixed Nav height on mobile */
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
      padding-top: 5rem; /* Account for fixed Nav height on desktop */
  }
`;

export const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const BackButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s ease-in-out;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;


// --- Step Progress Indicators (New Design) ---

export const StepSection = styled.div`
  margin-bottom: 2rem;
  display: none; /* Hidden by default on mobile */
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: flex; /* Show on desktop */
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const StepItem = styled.div<{ isActive: boolean, isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0; 
  position: relative;
`;

export const StepCircle = styled.div<{ isActive: boolean, isCompleted: boolean }>`
  width: 2.5rem; 
  height: 2.5rem; 
  border-radius: 9999px; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.3s ease-in-out;

  background-color: ${props => 
    props.isCompleted ? props.theme.colors.success.main : 
    props.isActive ? props.theme.colors.primary.main : 
    props.theme.colors.border
  };
  color: ${props => 
    props.isCompleted || props.isActive ? 'white' : props.theme.colors.text.secondary
  };
  
  z-index: 10;
  font-size: 1.125rem;
`;

export const StepLine = styled.div<{ isCompleted: boolean, isFirst: boolean, isLast: boolean }>`
  height: 4px;
  flex-grow: 1;
  background-color: ${props => props.isCompleted ? props.theme.colors.success.main : props.theme.colors.border};
  transition: background-color 0.3s ease-in-out;
  
  /* Use a negative margin to draw the line up to the edge of the circle container */
  margin: 0 -0.5rem;
  
  /* Hiding the first half of the line for the first step */
  ${props => props.isFirst && `
    background: linear-gradient(to right, transparent 50%, ${props.isCompleted ? props.theme.colors.success.main : props.theme.colors.border} 50%);
  `}
  /* Hiding the second half of the line for the last step */
  ${props => props.isLast && `
    background: linear-gradient(to right, ${props.isCompleted ? props.theme.colors.success.main : props.theme.colors.border} 50%, transparent 50%);
  `}
`;

export const StepText = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

export const StepTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

export const StepSubtitle = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
`;


// --- Form Card & Steps (Retained & Refined) ---

export const FormCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: 1rem; /* rounded-2xl */
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 2rem; /* p-6 sm:p-8 */
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2.5rem;
  }
`;

export const FormStep = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */
`;

export const FormNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

export const CharacterCounter = styled.p<{ isOverLimit?: boolean }>`
  font-size: 0.75rem; /* text-xs */
  color: ${props => props.isOverLimit ? props.theme.colors.error.main : props.theme.colors.text.secondary};
  margin-top: 0.25rem;
  text-align: right;
`;

// --- Priority Selector (Refined Design) ---

export const PrioritySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem; /* gap-3 */
`;

export const PriorityButtonCard = styled.button<{ isSelected: boolean; priorityColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem; /* p-4 */
  
  /* FIX: Changed border to always be a distinguishable color when NOT selected */
  border: 2px solid ${props => props.isSelected ? props.theme.colors.primary.main : props.theme.colors.border};
  
  border-radius: 0.75rem; /* rounded-xl */
  
  /* FIX: Use a slightly darker background when NOT selected for contrast */
  background-color: ${props => props.isSelected ? `${props.theme.colors.primary.main}10` : props.theme.colors.background.default};
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

export const PriorityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const PriorityLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

export const PriorityDescription = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
`;

export const PriorityDot = styled.span<{ color: string }>`
  width: 0.75rem; /* w-3 */
  height: 0.75rem; /* h-3 */
  border-radius: 50%;
  background-color: ${props => props.color};
`;

// --- Image Upload Components (Retained & Refined) ---

export const ImageUploadArea = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  border: 2px dashed ${props => props.isDragging ? props.theme.colors.primary.main : props.theme.colors.border};
  border-radius: 0.75rem; /* rounded-xl */
  padding: 3rem 2rem; /* p-8 sm:p-12 */
  cursor: pointer;
  
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    background-color: ${props => `${props.theme.colors.primary.main}05`}; /* Very light primary background */
  }
`;

export const ImagePreview = styled.div`
  position: relative;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 16rem; /* h-64 */
  object-fit: cover;
  border-radius: 0.75rem; /* rounded-xl */
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.75rem; /* top-3 */
  right: 0.75rem; /* right-3 */
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  background-color: ${props => props.theme.colors.error.main};
  color: white;
  border-radius: 9999px; /* full */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.error.dark};
  }
`;

// --- Summary Box (New Design) ---

export const SummaryBox = styled.div`
  background-color: ${props => props.theme.colors.background.default};
  border-radius: 0.75rem; /* rounded-xl */
  padding: 1.5rem; /* p-4 sm:p-6 */
  border: 1px solid ${props => props.theme.colors.border};
`;

export const SummaryHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.75rem; /* mb-3 */
  font-size: 1rem;
`;

export const SummaryItem = styled.p`
  font-size: 0.875rem; /* text-sm */
  line-height: 1.5;
  margin-bottom: 0.25rem;
`;

export const SummaryLabel = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  margin-right: 0.25rem;
`;

export const SummaryValue = styled.span<{ color?: string }>`
  font-weight: 500;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// --- Typography style replacements ---

export const BackButtonText = styled.span`
  font-weight: 500;
`;

export const PageTitle = styled.h1`
  font-weight: 700;
  font-size: 1.875rem; /* text-3xl from original */
  color: ${props => props.theme.colors.text.primary};
`;

export const MobileStepTitle = styled.h2`
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

export const FormSectionLabel = styled.p`
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem; /* This is the 'gutterBottom' equivalent */
`;

export const UploadText = styled.p`
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;