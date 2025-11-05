// pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  GlobalContainer,
  Nav,
  NavContent,
  LogoWrapper,
  LogoIcon,
  LogoText,
  DesktopNav,
  NavButton,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink,
  MobileActionButton,
  HeroSection,
  ContentWrapper,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroCTAWrapper,
  PrimaryButton,
  SecondaryButton,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  FeaturesSection,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIconWrapper,
  FeatureTitle,
  FeatureDescription,
  TestimonialsSection,
  TestimonialGrid,
  TestimonialCard,
  StarRating,
  TestimonialText,
  AuthorName,
  AuthorRole,
  FinalCTASection,
  CTAContainer,
  CTATitle,
  CTASubtitle,
  CTAButton,
  Footer,
  FooterLogoWrapper,
  FooterText
} from './HomePage.styles';
import { 
  FaBolt,          // Replacement for Zap
  FaMobileAlt,     // Replacement for Smartphone
  FaChartBar,      // Replacement for BarChart3
  FaBars,          // Replacement for Menu
  FaTimes,         // Replacement for X
  FaArrowRight,    // Replacement for ArrowRight
  FaChevronRight,  // Replacement for ChevronRight
  FaCheck          // Replacement for Check (for stars)
} from 'react-icons/fa';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <FaBolt />,
      title: "Lightning Fast",
      description: "Create and manage tickets in seconds with our streamlined interface"
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile First",
      description: "Access from anywhere, optimized for field work on any device"
    },
    {
      icon: <FaChartBar />,
      title: "Smart Analytics",
      description: "Real-time insights to prevent downtime and optimize workflow"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "50K+", label: "Tickets Managed" },
    { value: "40%", label: "Time Saved" }
  ];

  const testimonials = [
    { text: "Wekoleko transformed how we manage maintenance. Absolutely game-changing!", author: "Sarah Chen", role: "Operations Manager" },
    { text: "The mobile app is perfect for our field team. Simple, fast, and reliable.", author: "Marcus Johnson", role: "Field Supervisor" },
    { text: "We reduced response time by 40% in the first month. Incredible ROI.", author: "Emily Rodriguez", role: "Facility Director" }
  ];

  // Helper for closing menu and navigating
  const handleNavClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <GlobalContainer>
      {/* Navigation */}
      <Nav $scrolled={scrolled}>
        <NavContent>
          <LogoWrapper>
            <LogoIcon>
              <FaBolt />
            </LogoIcon>
            <LogoText>Wekoleko</LogoText>
          </LogoWrapper>
          
          {/* Desktop Nav */}
          <DesktopNav>
            <MobileNavLink as="a" href="#features" onClick={handleNavClick}>Features</MobileNavLink>
            <MobileNavLink as="a" href="#testimonials" onClick={handleNavClick}>Reviews</MobileNavLink>
            {isAuthenticated ? (
              <NavButton as={Link} to="/dashboard">
                Dashboard
              </NavButton>
            ) : (
              <>
                <NavButton as={Link} to="/login">
                  Sign In
                </NavButton>
                <NavButton as={Link} to="/register">
                  Start Free
                </NavButton>
              </>
            )}
          </DesktopNav>
          
          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </MobileMenuButton>
        </NavContent>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu>
            <MobileNavLink as="a" href="#features" onClick={handleNavClick}>Features</MobileNavLink>
            <MobileNavLink as="a" href="#testimonials" onClick={handleNavClick}>Reviews</MobileNavLink>
            {isAuthenticated ? (
              <MobileActionButton as={Link} to="/dashboard" onClick={handleNavClick}>
                Dashboard
              </MobileActionButton>
            ) : (
              <>
                <MobileActionButton as={Link} to="/login" onClick={handleNavClick}>
                  Sign In
                </MobileActionButton>
                <MobileActionButton as={Link} to="/register" onClick={handleNavClick}>
                  Start Free
                </MobileActionButton>
              </>
            )}
          </MobileMenu>
        )}
      </Nav>

      {/* Hero Section */}
      <HeroSection>
        <ContentWrapper>
          <HeroBadge>
            <FaBolt size={16} />
            <span>Trusted by 500+ teams</span>
          </HeroBadge>
          
          <HeroTitle>
            Maintenance Made
            <span>Simple & Smart</span>
          </HeroTitle>
          
          <HeroSubtitle>
            The modern platform for field teams to track, manage, and resolve maintenance tasks faster than ever.
          </HeroSubtitle>
          
          <HeroCTAWrapper>
            <PrimaryButton 
              as={Link} 
              to={isAuthenticated ? '/dashboard' : '/register'}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
              <FaArrowRight size={20} />
            </PrimaryButton>
            <SecondaryButton 
              as={Link} to="https://www.youtube.com/@raymond-l7f" 
              target="_blank" rel="noopener noreferrer">
              Watch Demo
            </SecondaryButton>
          </HeroCTAWrapper>

          {/* Stats */}
          <StatsGrid>
            {stats.map((stat, idx) => (
              <StatItem key={idx}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </ContentWrapper>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection id="features">
        <ContentWrapper>
          <SectionHeader>
            <SectionTitle>Everything you need</SectionTitle>
            <SectionSubtitle>
              Powerful features designed for modern maintenance teams
            </SectionSubtitle>
          </SectionHeader>
          <FeatureGrid>
            {features.map((feature, idx) => (
              <FeatureCard key={idx}>
                <FeatureIconWrapper>
                  {feature.icon}
                </FeatureIconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </ContentWrapper>
      </FeaturesSection>

      {/* Testimonials */}
      <TestimonialsSection id="testimonials">
        <ContentWrapper>
          <SectionHeader>
            <SectionTitle>Loved by teams everywhere</SectionTitle>
          </SectionHeader>
          <TestimonialGrid>
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx}>
                <StarRating>
                  {[...Array(5)].map((_, i) => (
                    <FaCheck key={i} /> /* Using FaCheck as a star replacement */
                  ))}
                </StarRating>
                <TestimonialText>
                  "{testimonial.text}"
                </TestimonialText>
                <AuthorName>{testimonial.author}</AuthorName>
                <AuthorRole>{testimonial.role}</AuthorRole>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </ContentWrapper>
      </TestimonialsSection>

      {/* Final CTA Section */}
      <FinalCTASection>
        <ContentWrapper>
          <CTAContainer>
            <CTATitle>Ready to transform your maintenance?</CTATitle>
            <CTASubtitle>
              Join hundreds of teams already saving time and reducing downtime
            </CTASubtitle>
            <CTAButton 
              as={Link} 
              to={isAuthenticated ? '/dashboard' : '/register'}
            >
              Get Started Free
              <FaChevronRight size={20} />
            </CTAButton>
          </CTAContainer>
        </ContentWrapper>
      </FinalCTASection>

      {/* Footer */}
      <Footer>
        <ContentWrapper>
          <FooterLogoWrapper>
            <LogoIcon>
              <FaBolt />
            </LogoIcon>
            <LogoText as="span">Wekoleko</LogoText>
          </FooterLogoWrapper>
          <FooterText>
            © 2025 Wekoleko. All rights reserved.
          </FooterText>
        </ContentWrapper>
      </Footer>
    </GlobalContainer>
  );
};

export default HomePage;