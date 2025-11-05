import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

// Define explicit types for styled motion components
type MotionDivProps = HTMLAttributes<HTMLDivElement>;

// --- GLOBAL LAYOUT (Theme-Aware, consistent with NewTicketPage) ---

export const GlobalContainer = styled.div`
  min-height: 100vh;
  /* Matches the gradient background from NewTicketPage.styles.ts */
  background: linear-gradient(to bottom right, 
    ${props => props.theme.colors.background.default}, 
    ${props => props.theme.colors.background.paper}50, /* Lighter variant for gradient middle */
    ${props => props.theme.colors.background.default});
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem; 
`;

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
  background-color: ${props => props.theme.colors.background.paper};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const NavContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = styled.footer`
  padding: 2rem 1.5rem;
  /* FIX: neutral.dark is missing. Using neutral.medium as a fallback for a dark color. */
  background-color: ${props => props.theme.colors.neutral.medium}; 
  color: white;
  text-align: center;
  margin-top: auto;
`;

export const MainContentWrapper = styled.div`
  max-width: 900px; 
  margin: 0 auto;
  padding: 1.5rem 1rem;
  flex-grow: 1;
  width: 100%;
`;

// --- PAGE HEADER (for Back Button) ---

export const PageHeader = styled.div`
  background-color: transparent; 
  padding: 1rem 0;
`;

export const HeaderContent = styled.div`
  max-width: 900px; 
  margin: 0 auto;
  padding: 0 1rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text.secondary}; 
  transition: color 0.2s;
  margin-bottom: 1rem; 
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary.main}; 
  }

  span {
    font-weight: 500; 
  }
`;

// --- TICKET DETAIL CARD ---

export const DetailsCard = styled(motion.div).attrs<MotionDivProps>(() => ({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 100, damping: 20 }
}))`
  background-color: ${props => props.theme.colors.background.paper};
  /* FIX: borderRadiusLg is missing. Using base borderRadius. */
  border-radius: ${props => props.theme.shape.borderRadius || '1rem'};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

export const CardInnerHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border}; 
  background-color: ${props => props.theme.colors.background.default};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TicketTitle = styled.h2`
  font-size: 1.5rem; 
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary}; 
  margin-bottom: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StatusPillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

interface PillProps {
    $priority?: 'low' | 'medium' | 'high';
    $status?: 'open' | 'resolved';
}

const getPriorityColor = (priority: PillProps['$priority'], theme: any) => {
    /* FIX: Using hardcoded light hex colors for backgrounds/borders as lightest/light are missing. */
    switch (priority) {
        case 'high':
            return css`
                background-color: #fee2e2; /* Red 100 */
                color: ${theme.colors.error.dark};
                border-color: #fecaca; /* Red 200 */
            `;
        case 'medium':
            return css`
                background-color: #fff7ed; /* Orange 100 */
                color: ${theme.colors.warning.dark};
                border-color: #fed7aa; /* Orange 200 */
            `;
        default: // low
            return css`
                background-color: #dcfce7; /* Green 100 */
                color: ${theme.colors.success.dark};
                border-color: #bbf7d0; /* Green 200 */
            `;
    }
};

export const Pill = styled.span<PillProps>`
  padding: 0.35rem 0.75rem; 
  border-radius: 9999px; 
  font-weight: 600;
  border: 1px solid; 
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  
  ${props => props.$priority && getPriorityColor(props.$priority, props.theme)}
  
  ${props => props.$status === 'resolved' && css`
    background-color: #dcfce7; /* Green 100 */
    color: ${props.theme.colors.success.dark};
    border-color: #bbf7d0; /* Green 200 */
  `}
  
  ${props => props.$status === 'open' && css`
    background-color: #fff7ed; /* Orange 100 */
    color: ${props.theme.colors.warning.dark};
    border-color: #fed7aa; /* Orange 200 */
  `}
`;

export const EditButton = styled.button`
  padding: 0.625rem 0.75rem; 
  background-color: ${props => props.theme.colors.background.default};
  color: ${props => props.theme.colors.primary.main};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.shape.borderRadius}; 
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: ${props => props.theme.colors.background.default};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

// --- Card Body Sections ---

export const CardBody = styled.div`
  padding: 2rem; 
`;

export const DetailSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: ${props => props.theme.shape.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  
  img {
    width: 100%;
    height: 20rem; 
    object-fit: cover;
    display: block;
    transition: transform 0.3s;
  }
  
  &:hover img {
      transform: scale(1.02);
  }
`;

export const ImageViewOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${ImageWrapper}:hover & {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const ViewImageButton = styled.button`
  opacity: 0;
  transition: opacity 0.3s;
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: ${props => props.theme.colors.text.primary};
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 600;
  border: none;
  cursor: pointer;
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

// --- View Mode Styles ---

export const DetailSection = styled.div`
  /* Container for individual sections (Description, Image, etc.) */
`;

export const SectionTitle = styled.h3`
  font-size: 1rem; 
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.primary.main}; 
  }
`;

export const DescriptionText = styled.p`
  color: ${props => props.theme.colors.text.secondary}; 
  line-height: 1.6;
  white-space: pre-wrap;
  padding-left: 0.25rem;
`;

export const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const InfoBlock = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.background.default}; 
  border-radius: ${props => props.theme.shape.borderRadius}; 
  border: 1px solid ${props => props.theme.colors.border};
`;

export const InfoLabel = styled.p`
  font-size: 0.75rem; 
  color: ${props => props.theme.colors.text.secondary}; 
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoValue = styled.p`
  font-size: 1.25rem; 
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary}; 
`;

// --- Action Buttons (Consistent with Atom Button component philosophy) ---

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border}; 
  margin-top: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const BaseButton = css`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.shape.borderRadius}; 
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 150px;
  cursor: pointer;
  
  @media (min-width: 640px) {
      flex: 0 1 auto;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  ${BaseButton}
  background-color: ${props => props.theme.colors.primary.main}; 
  color: white;
  border: 1px solid ${props => props.theme.colors.primary.dark};

  &:hover {
    background-color: ${props => props.theme.colors.primary.dark}; 
  }
`;

export const ResolveButton = styled.button`
  ${BaseButton}
  background-color: ${props => props.theme.colors.success.main}; 
  color: white;
  border: 1px solid ${props => props.theme.colors.success.dark};
  
  &:hover {
    background-color: ${props => props.theme.colors.success.dark}; 
  }
`;

export const SecondaryButton = styled.button`
  ${BaseButton}
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.primary}; 
  background-color: ${props => props.theme.colors.background.paper};

  &:hover {
    background-color: ${props => props.theme.colors.background.default}; 
  }
`;

export const DeleteButton = styled.button`
  ${BaseButton}
  /* FIX: error.light is missing. Using hex fallback. */
  border: 1px solid #fecaca; 
  color: ${props => props.theme.colors.error.main}; 
  background-color: ${props => props.theme.colors.background.paper};

  &:hover {
    /* FIX: error.lightest is missing. Using hex fallback. */
    background-color: #fef2f2; 
  }
`;

// --- Form Element Styles (Consistent with NewTicketPage form inputs) ---

const BaseFormElement = css`
  width: 100%;
  padding: 0.75rem 1rem; 
  border: 1px solid ${props => props.theme.colors.border}; 
  border-radius: ${props => props.theme.shape.borderRadius}; 
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary.main}; 
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}30;
    outline: none;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary}; 
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  ${BaseFormElement}
`;

export const Select = styled.select`
  ${BaseFormElement}
`;

export const Textarea = styled.textarea`
  ${BaseFormElement}
  resize: vertical;
`;

export const ImageUploadLabel = styled.label`
  display: block;
  border: 2px dashed ${props => props.theme.colors.border}; 
  border-radius: ${props => props.theme.shape.borderRadius};
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.theme.colors.background.default};

  &:hover {
    border-color: ${props => props.theme.colors.primary.main}; 
    /* FIX: primary.lightest is missing. Using hex fallback (Orange-50). */
    background-color: #fff7ed; 
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.colors.text.secondary}; 
    margin: 0 auto 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.text.secondary}; 
  }
`;

// --- Modal Styles ---

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.9); 
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  width: 100%;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem; 
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  z-index: 1010;

  &:hover {
    background-color: ${props => props.theme.colors.background.default}; 
  }
`;

export const ImageInModal = styled.img`
  width: 100%;
  height: auto;
  max-height: 90vh;
  object-fit: contain;
  border-radius: ${props => props.theme.shape.borderRadius};
`;

// --- Loading Spinner for Buttons ---
export const Spinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;