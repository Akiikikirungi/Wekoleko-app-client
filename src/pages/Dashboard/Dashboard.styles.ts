// pages/Dashboard.styles.ts (FINAL FIX for Header Overlap)
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.default};
`;

/* --- CRITICAL FIX 1: Max Padding-Top to definitively clear BOTH fixed headers --- */
export const DashboardContentWrapper = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1.5rem;
  /* Setting to a very safe, high value to guarantee clearance (approx 208px) */
  padding-top: 13rem; 

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    /* Setting to a very safe, high value for desktop (approx 224px) */
    padding-top: 14rem; 
  }
`;

// --- Sticky Header (Dashboard Nav/Control Bar) ---

export const DashboardNav = styled.div`
  background-color: ${props => props.theme.colors.background.paper};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: fixed;
  /* CRITICAL FIX 2: Place directly below the main Nav (which is 4rem tall on mobile) */
  top: 4rem; 
  left: 0;
  right: 0;
  /* CRITICAL FIX 3: Ensure it sits below the main Nav (which should be z-index 50) */
  z-index: 40; 
  box-shadow: ${props => props.theme.shadows.sm};
  padding: 0; /* Removing redundant padding here, relying on DashboardNavContent to provide horizontal padding */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    /* Main Nav is 5rem tall on desktop */
    top: 5rem; 
  }
`;

export const DashboardNavContent = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 1rem 1.5rem;
`;

export const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SearchFilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInputWrapper = styled.div`
  flex-grow: 1;
  position: relative;

  input {
    width: 100%;
    padding: 0.625rem 1rem 0.625rem 2.5rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.shape.borderRadius};
    transition: border-color 0.2s;

    &:focus {
      border-color: ${props => props.theme.colors.primary.main};
      outline: none;
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const FilterButton = styled.button`
  padding: 0.625rem 1rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.shape.borderRadius};
  background-color: ${props => props.theme.colors.background.paper};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.primary.main};
  }

  span {
    display: none;
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      display: inline;
    }
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 100%;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: white;
  border-radius: ${props => props.theme.shape.borderRadius};
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.5rem 0;
  /* Highest z-index for dropdown to overlay everything */
  z-index: 55; 
`;

export const FilterOption = styled.button<{ $selected: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$selected ? props.theme.colors.primary.main : props.theme.colors.text.primary};
  font-weight: ${props => props.$selected ? '600' : '400'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.neutral.light};
  }
`;

// --- Stats Grid ---

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`;

export const StatCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.shape.borderRadius}; 
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const StatTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const StatIconWrapper = styled.div<{ $color: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${props => props.theme.shape.borderRadiusSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${props => props.$color};
`;

export const StatTrendIcon = styled.div`
  color: ${props => props.theme.colors.success.main};
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
`;

// --- Quick Action CTA ---

export const QuickActionCTA = styled(motion.div)`
  background: linear-gradient(to right, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  border-radius: ${props => props.theme.shape.borderRadius};
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const QuickActionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuickActionButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: white;
  color: ${props => props.theme.colors.primary.main};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: 3.5rem;
    height: 3.5rem;
    svg {
        width: 1.75rem;
        height: 1.75rem;
    }
  }
`;

// --- Ticket List/Grid ---

export const TicketSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TicketGrid = styled(motion.div)`
  display: grid;
  gap: 1rem;
`;

export const TicketCardWrapper = styled(motion.div)`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.shape.borderRadius};
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.md};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`;

export const TicketCardContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export const TicketDetails = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export const TicketTags = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span<{ $type: 'priority' | 'status' | 'overdue', $priority?: 'high' | 'medium' | 'low' }>`
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  /* Using hardcoded light colors (e.g., #fee2e2 for light red) as theme.colors.X.light doesn't exist */
  ${props => props.$type === 'priority' && props.$priority === 'high' && `
    background-color: #fee2e2; 
    color: ${props.theme.colors.error.dark};
  `}
  ${props => props.$type === 'priority' && props.$priority === 'medium' && `
    background-color: #fff7ed; 
    color: ${props.theme.colors.warning.dark};
  `}
  ${props => props.$type === 'priority' && props.$priority === 'low' && `
    background-color: #d1fae5; 
    color: ${props.theme.colors.success.dark};
  `}
  ${props => props.$type === 'overdue' && `
    background-color: #fee2e2; 
    color: ${props.theme.colors.error.dark};
  `}
  ${props => props.$type === 'status' && props.children === 'Resolved' && `
    background-color: #d1fae5; 
    color: ${props.theme.colors.success.dark};
  `}
`;

export const TicketTitle = styled.h3`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${TicketCardWrapper}:hover & {
    color: ${props => props.theme.colors.primary.main};
  }
`;

export const TicketMeta = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const MoreButton = styled.button`
  padding: 0.5rem;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

// --- Empty State ---
export const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.shape.borderRadius};
  background-color: ${props => props.theme.colors.background.paper};
  margin-top: 2rem;
`;

export const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;

  svg {
    width: 4rem;
    height: 4rem;
  }
`;

// --- Mobile FAB ---

export const MobileFAB = styled(motion.button)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(to right, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  color: white;
  border-radius: 9999px;
  box-shadow: ${props => props.theme.shadows.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  /* Ensure FAB is on top of everything */
  z-index: 60; 

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;