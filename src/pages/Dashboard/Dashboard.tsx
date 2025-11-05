// pages/Dashboard.tsx (COMPLETE API INTEGRATION - FIXED)

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import API from '../../api';
import Typography from '../../components/atoms/Typography';
import LoadingSkeleton from '../../components/atoms/LoadingSkeleton';
import styled, { useTheme } from 'styled-components';

// --- Icons ---
import { 
  FaPlus, FaSearch, FaFilter, FaClock, FaCheckCircle, FaExclamationTriangle,
  FaArrowUp, FaCalendarAlt, FaEllipsisV, FaBolt, FaTimes, FaSpinner, FaRocket,
  FaClipboardList, FaExclamationCircle, FaSync
} from 'react-icons/fa';

// --- Dashboard Styles ---
import { 
  DashboardContainer,
  DashboardContentWrapper,
  DashboardNav,
  DashboardNavContent,
  HeaderTopRow,
  SearchFilterBar,
  SearchInputWrapper,
  FilterButton,
  FilterDropdown,
  FilterOption,
  StatsGrid,
  StatCard,
  StatTopRow,
  StatIconWrapper,
  StatTrendIcon,
  StatNumber,
  StatLabel,
  QuickActionCTA,
  QuickActionContent,
  QuickActionButton,
  TicketSectionHeader,
  TicketGrid,
  TicketCardWrapper,
  TicketCardContent,
  TicketDetails,
  TicketTags,
  Tag,
  TicketTitle,
  TicketMeta,
  MoreButton,
  EmptyState,
  EmptyStateIcon,
  MobileFAB
} from './Dashboard.styles';

// --- Global Styles ---
import {
  Nav, NavContent, LogoWrapper, LogoIcon, LogoText, 
  Footer, FooterLogoWrapper, FooterText, PrimaryButton, SecondaryButton 
} from '../HomePage/HomePage.styles';


// --- TYPES ---
interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'resolved' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  imageUrl?: string;
  imageId?: string;
  user: string;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  trend: 'up' | 'down' | 'flat';
}

// --- CONSTANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- HELPER FUNCTIONS ---

const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch (error) {
        return 'Invalid date';
    }
};

const isOverdue = (dueDate: string, status: string) => {
    try {
        return status !== 'resolved' && new Date(dueDate) < new Date();
    } catch (error) {
        return false;
    }
};

// --- STYLED COMPONENTS ---

const DashboardTitle = styled(Typography).attrs({
    variant: 'h2',
})`
    font-weight: 800;
`;

const QuickActionTitle = styled(Typography).attrs({
    variant: 'h4',
    gutterBottom: true, 
})`
    color: white;
    font-weight: 700;
    margin-bottom: 0.25rem;
`;

const QuickActionText = styled(Typography).attrs({
    variant: 'body1',
})`
    color: white;
`;

const SectionHeaderTitle = styled(Typography).attrs({
    variant: 'h3',
})`
    font-weight: 700;
`;

const ErrorMessageWrapper = styled.div`
    padding: 4rem;
    text-align: center;
`;

const ErrorCard = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    border: 2px solid ${props => props.theme.colors.error.main};
    border-radius: ${props => props.theme.shape.borderRadius};
    padding: 2rem;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
`;

const ErrorIcon = styled.div`
    font-size: 3rem;
    color: ${props => props.theme.colors.error.main};
    margin-bottom: 1rem;
    
    svg {
        width: 3rem;
        height: 3rem;
    }
`;

// FIX: Added styled component for error description with margin
const ErrorDescription = styled(Typography).attrs({
    variant: 'body1',
    color: 'textSecondary',
})`
    margin-bottom: 1.5rem;
`;

// FIX: Added styled component for empty state description with margin
const EmptyStateDescription = styled(Typography).attrs({
    variant: 'body1',
    color: 'textSecondary',
})`
    margin-bottom: 1.5rem;
`;

const LoadingSkeletonWrapper = styled.div`
    margin-bottom: 2rem;
`;

const RefreshButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: ${props => props.theme.colors.primary.main};
    color: white;
    border: none;
    border-radius: ${props => props.theme.shape.borderRadius};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
        background-color: ${props => props.theme.colors.primary.dark};
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    svg {
        width: 1rem;
        height: 1rem;
        ${props => props.disabled && `
            animation: spin 1s linear infinite;
        `}
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

// --- DASHBOARD COMPONENT ---
const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [scrolled, setScrolled] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Fetch tickets with React Query
  const { 
    data: tickets, 
    isLoading, 
    error, 
    refetch,
    isFetching 
  } = useQuery<Ticket[], Error>(
    'tickets',
    async () => {
      try {
        const response = await API.get('/tickets');
        return response.data;
      } catch (err: any) {
        // Handle specific error cases
        if (err.response?.status === 401) {
          // Token expired or invalid - will be handled by axios interceptor
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(err.response?.data?.msg || 'Failed to fetch tickets');
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000, // Consider data fresh for 30 seconds
      onError: (error: Error) => {
        console.error('Error fetching tickets:', error);
      }
    }
  );

  // Scroll effect for the main Nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Invalidate query when returning from create page
  useEffect(() => {
    const handleFocus = () => {
      queryClient.invalidateQueries('tickets');
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [queryClient]);

  // Manual refresh handler
  const handleRefresh = () => {
    refetch();
  };

  // --- FILTERING LOGIC ---
  const filteredTickets = tickets ? tickets
    .filter(ticket => 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ticket => {
      if (filterPriority === 'all') return true;
      return ticket.priority === filterPriority;
    })
    .sort((a, b) => {
      // Resolved tickets go to bottom
      if (a.status === 'resolved' && b.status !== 'resolved') return 1;
      if (a.status !== 'resolved' && b.status === 'resolved') return -1;
      
      // Then sort by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Finally sort by due date (earliest first)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    : [];

  const openTickets = filteredTickets.filter(t => t.status !== 'resolved');
  const resolvedTickets = filteredTickets.filter(t => t.status === 'resolved');

  // --- STATS CALCULATION ---
  const totalTickets = tickets?.length || 0;
  const totalOpen = tickets ? tickets.filter(t => t.status !== 'resolved').length : 0;
  const totalResolved = tickets ? tickets.filter(t => t.status === 'resolved').length : 0;
  const overdueTickets = tickets ? tickets.filter(t => isOverdue(t.dueDate, t.status)).length : 0;
  
  const statData: StatItem[] = [
    { 
      label: 'Total Tickets', 
      value: totalTickets, 
      icon: FaClipboardList, 
      color: theme.colors.primary.main, 
      trend: 'up' 
    }, 
    { 
      label: 'Open Tickets', 
      value: totalOpen, 
      icon: FaExclamationTriangle, 
      color: theme.colors.warning.main, 
      trend: 'flat' 
    },
    { 
      label: 'Resolved', 
      value: totalResolved, 
      icon: FaCheckCircle, 
      color: theme.colors.success.main, 
      trend: 'up' 
    },
    { 
      label: 'Overdue', 
      value: overdueTickets, 
      icon: FaClock, 
      color: theme.colors.error.main, 
      trend: 'down' 
    },
  ];

  // --- ERROR STATE ---
  if (error) {
    return (
      <DashboardContainer>
        <Nav $scrolled={scrolled}>
          <NavContent>
            <LogoWrapper as={Link} to="/">
              <LogoIcon><FaBolt /></LogoIcon>
              <LogoText as="span">Wekoleko</LogoText>
            </LogoWrapper>
          </NavContent>
        </Nav>

        <ErrorMessageWrapper>
          <ErrorCard>
            <ErrorIcon>
              <FaExclamationCircle />
            </ErrorIcon>
            <Typography variant="h3" gutterBottom>
              Failed to Load Dashboard
            </Typography>
            {/* FIX: Changed from inline style to styled component */}
            <ErrorDescription>
              {error.message || 'Unable to fetch tickets. Please try again.'}
            </ErrorDescription>
            <RefreshButton onClick={() => refetch()}>
              <FaSync />
              Retry
            </RefreshButton>
          </ErrorCard>
        </ErrorMessageWrapper>

        <Footer>
          <DashboardContentWrapper>
            <FooterLogoWrapper>
              <LogoIcon><FaBolt /></LogoIcon>
              <LogoText as="span">Wekoleko</LogoText>
            </FooterLogoWrapper>
            <FooterText>
              © {new Date().getFullYear()} Wekoleko. All rights reserved.
            </FooterText>
          </DashboardContentWrapper>
        </Footer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* --- 1. Main Navigation (z-index: 50) --- */}
      <Nav $scrolled={scrolled}>
        <NavContent>
          <LogoWrapper as={Link} to="/">
            <LogoIcon><FaBolt /></LogoIcon>
            <LogoText as="span">Wekoleko</LogoText>
          </LogoWrapper>
          <PrimaryButton as={Link} to="/new">
            <FaPlus />
            New Ticket
          </PrimaryButton>
        </NavContent>
      </Nav>
      
      {/* --- 2. Dashboard Control Bar (z-index: 40) --- */}
      <DashboardNav>
        <DashboardNavContent>
          <HeaderTopRow>
            <DashboardTitle>Dashboard</DashboardTitle>
            <HeaderActions>
              <RefreshButton 
                onClick={handleRefresh}
                disabled={isFetching}
                title="Refresh tickets"
              >
                <FaSync />
                <span style={{ display: 'none' }}>Refresh</span>
              </RefreshButton>
              <PrimaryButton 
                as={Link} 
                to="/new" 
                style={{ display: 'none' }}
              > 
                <FaPlus />
                New Ticket
              </PrimaryButton>
            </HeaderActions>
          </HeaderTopRow>

          <SearchFilterBar>
            <SearchInputWrapper>
              <input 
                type="text" 
                placeholder="Search tickets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
              />
              <FaSearch />
            </SearchInputWrapper>
            
            <div style={{ position: 'relative' }}> 
              <FilterButton 
                onClick={() => setFilterOpen(!filterOpen)}
                disabled={isLoading}
              >
                <FaFilter />
                <span>
                  Filter: {filterPriority === 'all' 
                    ? 'All' 
                    : filterPriority.charAt(0).toUpperCase() + filterPriority.slice(1)}
                </span>
              </FilterButton>

              {filterOpen && (
                <FilterDropdown>
                  {['all', 'high', 'medium', 'low'].map(priority => (
                    <FilterOption
                      key={priority}
                      $selected={filterPriority === priority}
                      onClick={() => {
                        setFilterPriority(priority as any);
                        setFilterOpen(false);
                      }}
                    >
                      Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </FilterOption>
                  ))}
                </FilterDropdown>
              )}
            </div>
          </SearchFilterBar>
        </DashboardNavContent>
      </DashboardNav>

      {/* --- 3. Dashboard Content --- */}
      <DashboardContentWrapper>
        {isLoading ? (
          <LoadingSkeletonWrapper>
            <LoadingSkeleton count={5} />
          </LoadingSkeletonWrapper>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Stats Grid */}
            <StatsGrid variants={containerVariants}>
              {statData.map((stat, index) => (
                <StatCard key={index} variants={itemVariants}>
                  <StatTopRow>
                    <StatIconWrapper $color={stat.color}>
                      <stat.icon size={20} />
                    </StatIconWrapper>
                    <StatTrendIcon>
                      {stat.trend === 'up' ? <FaArrowUp /> : stat.trend === 'down' ? <FaTimes /> : null}
                    </StatTrendIcon>
                  </StatTopRow>
                  <StatNumber>{stat.value}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>

            {/* Quick Action CTA */}
            <QuickActionCTA 
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <QuickActionContent>
                <div>
                  <QuickActionTitle>
                    Need Help?
                  </QuickActionTitle>
                  <QuickActionText>
                    Create a new ticket and assign it to your team in seconds.
                  </QuickActionText>
                </div>
                <QuickActionButton as={Link} to="/new">
                  <FaPlus />
                </QuickActionButton>
              </QuickActionContent>
            </QuickActionCTA>

            {/* No Tickets at All - Empty State */}
            {totalTickets === 0 && (
              <EmptyState
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <EmptyStateIcon>
                  <FaRocket />
                </EmptyStateIcon>
                <Typography variant="h3" gutterBottom>
                  Welcome to Your Dashboard!
                </Typography>
                {/* FIX: Changed from inline style to styled component */}
                <EmptyStateDescription>
                  You don't have any tickets yet. Create your first maintenance ticket to get started.
                </EmptyStateDescription>
                <PrimaryButton as={Link} to="/new">
                  <FaPlus />
                  Create First Ticket
                </PrimaryButton>
              </EmptyState>
            )}

            {/* Open Tickets Section */}
            {totalTickets > 0 && (
              <motion.div variants={itemVariants}>
                <TicketSectionHeader>
                  <SectionHeaderTitle>
                    Open Tickets ({openTickets.length})
                  </SectionHeaderTitle>
                </TicketSectionHeader>
                <TicketGrid variants={containerVariants}>
                  {openTickets.length > 0 ? (
                    openTickets.map(ticket => (
                      <TicketCardWrapper 
                        key={ticket._id} 
                        variants={itemVariants} 
                        as={Link} 
                        to={`/tickets/${ticket._id}`}
                      >
                        <TicketCardContent>
                          <TicketDetails>
                            <TicketTags>
                              <Tag 
                                $type="priority" 
                                $priority={ticket.priority}
                              >
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                              </Tag>
                              {isOverdue(ticket.dueDate, ticket.status) && (
                                <Tag $type="overdue">
                                  Overdue
                                </Tag>
                              )}
                            </TicketTags>
                            <TicketTitle>{ticket.title}</TicketTitle>
                            <TicketMeta>
                              <FaCalendarAlt size={14} />
                              Due: {formatDate(ticket.dueDate)}
                            </TicketMeta>
                          </TicketDetails>
                          <MoreButton onClick={(e) => {
                            e.preventDefault();
                            // Add menu logic here if needed
                          }}>
                            <FaEllipsisV />
                          </MoreButton>
                        </TicketCardContent>
                      </TicketCardWrapper>
                    ))
                  ) : (
                    <EmptyState
                      key="no-open-tickets"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EmptyStateIcon>
                        <FaCheckCircle />
                      </EmptyStateIcon>
                      <Typography variant="h4" gutterBottom>
                        All clear!
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        No open tickets matching your criteria.
                      </Typography>
                    </EmptyState>
                  )}
                </TicketGrid>
              </motion.div>
            )}

            {/* Resolved Tickets Section */}
            {totalTickets > 0 && (
              <motion.div variants={itemVariants} style={{ marginTop: '2rem' }}>
                <TicketSectionHeader>
                  <SectionHeaderTitle>
                    Resolved Tickets ({resolvedTickets.length})
                  </SectionHeaderTitle>
                </TicketSectionHeader>
                <TicketGrid variants={containerVariants}>
                  {resolvedTickets.length > 0 ? (
                    resolvedTickets.map(ticket => (
                      <TicketCardWrapper 
                        key={ticket._id} 
                        variants={itemVariants}
                        as={Link} 
                        to={`/tickets/${ticket._id}`}
                      >
                        <TicketCardContent>
                          <TicketDetails>
                            <TicketTags>
                              <Tag $type="status">Resolved</Tag>
                            </TicketTags>
                            <TicketTitle>{ticket.title}</TicketTitle>
                            <TicketMeta>
                              <FaCalendarAlt size={14} />
                              Resolved: {formatDate(ticket.dueDate)}
                            </TicketMeta>
                          </TicketDetails>
                          <MoreButton onClick={(e) => {
                            e.preventDefault();
                            // Add menu logic here if needed
                          }}>
                            <FaEllipsisV />
                          </MoreButton>
                        </TicketCardContent>
                      </TicketCardWrapper>
                    ))
                  ) : (
                    <EmptyState
                      key="no-resolved-tickets"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EmptyStateIcon>
                        <FaClock />
                      </EmptyStateIcon>
                      <Typography variant="h4" gutterBottom>
                        No resolved tickets
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Complete some tasks to see them here!
                      </Typography>
                    </EmptyState>
                  )}
                </TicketGrid>
              </motion.div>
            )}
          </motion.div>
        )}
      </DashboardContentWrapper>

      {/* --- Mobile FAB --- */}
      <MobileFAB as={Link} to="/new">
        <FaPlus />
      </MobileFAB>

      {/* --- Footer --- */}
      <Footer>
        <DashboardContentWrapper>
          <FooterLogoWrapper>
            <LogoIcon><FaBolt /></LogoIcon>
            <LogoText as="span">Wekoleko</LogoText>
          </FooterLogoWrapper>
          <FooterText>
            © {new Date().getFullYear()} Wekoleko. All rights reserved.
          </FooterText>
        </DashboardContentWrapper>
      </Footer>
    </DashboardContainer>
  );
};

export default Dashboard;