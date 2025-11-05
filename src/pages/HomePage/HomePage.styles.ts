// pages/HomePage.styles.ts (FIXED: TS Errors from missing theme properties)
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TypographyComponent from '../../components/atoms/Typography';

const Typography = TypographyComponent;

// --- Global Containers ---

export const GlobalContainer = styled.div`
  min-height: 100vh;
  /* Replaced neutral.lightest with 'white' (or neutral.light) to fix TS error */
  background: linear-gradient(to bottom right, white, ${props => props.theme.colors.background.paper}, white);
`;

export const ContentWrapper = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

// --- Navigation ---

export const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease-in-out;
  ${props => props.$scrolled && `
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    box-shadow: ${props.theme.shadows.md};
  `}
`;

export const NavContent = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1rem;
  height: 4rem; /* h-16 */
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 5rem; /* sm:h-20 */
    padding: 0 2rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(to bottom right, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.primary.dark});
  border-radius: ${props => props.theme.shape.borderRadiusSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(to right, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }

  a, button {
    text-decoration: none;
    color: ${props => props.theme.colors.text.secondary};
    transition: color 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.primary.main};
    }
  }
`;

export const NavButton = styled.button`
  padding: 0.625rem 1.5rem;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: scale(1.05);
  }

  &:nth-child(2) { /* Sign In button */
    padding: 0;
    background: none;
    color: ${props => props.theme.colors.text.secondary};
    &:hover {
      color: ${props => props.theme.colors.primary.main};
      transform: none;
      background: none;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: block;
  padding: 0.5rem;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 4rem; /* Below NavContent height */
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  display: block;
  padding: 0.5rem 0;
  color: ${props => props.theme.colors.text.primary};
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

export const MobileActionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 600;

  &:first-of-type { /* Sign In/Log In */
    border: 2px solid ${props => props.theme.colors.border};
    background: white;
    color: ${props => props.theme.colors.text.primary};
  }

  &:last-of-type { /* Start Free Trial/Dashboard */
    background: ${props => props.theme.colors.primary.main};
    color: white;
  }
`;

// --- Hero Section ---

export const HeroSection = styled.section`
  padding: 8rem 0 4rem; /* pt-32 sm:pt-40, pb-16 */
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 10rem 0 6rem; /* pt-40, pb-24 */
  }
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary.light};
  color: ${props => props.theme.colors.primary.dark};
  border-radius: 9999px; /* full */
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem; /* mb-6 sm:mb-8 */
`;

export const HeroTitle = styled.h1`
  font-size: 2.25rem; /* text-4xl */
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1.5rem; /* mb-6 sm:mb-8 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 3rem; /* sm:text-5xl */
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 4.5rem; /* lg:text-7xl */
  }

  span {
    display: block;
    background: linear-gradient(to right, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem; /* text-lg */
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 2rem; /* mb-8 sm:mb-12 */
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.25rem; /* sm:text-xl */
  }
`;

export const HeroCTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: scale(1.05);
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: auto;
    padding: 1rem 2rem;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colors.border};
  background: white;
  color: ${props => props.theme.colors.text.primary};
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.primary.main};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: auto;
    padding: 1rem 2rem;
  }
`;

// --- Stats ---

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 4rem; /* mt-16 */
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    gap: 2rem; /* gap-8 */
    margin-top: 5rem; /* mt-20 */
  }
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem; /* mb-1 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.25rem; /* sm:text-4xl */
    margin-bottom: 0.5rem; /* sm:mb-2 */
  }
`;

export const StatLabel = styled.div`
  font-size: 0.75rem; /* text-xs */
  color: ${props => props.theme.colors.text.secondary};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.875rem; /* sm:text-sm */
  }
`;

// --- Features Section ---

export const FeaturesSection = styled.section`
  padding: 4rem 0; /* py-16 */
  background-color: white;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 6rem 0; /* py-24 */
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem; /* mb-12 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 4rem; /* sm:mb-16 */
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem; /* mb-4 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.25rem; /* sm:text-4xl */
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 3rem; /* lg:text-5xl */
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.125rem; /* text-lg */
  color: ${props => props.theme.colors.text.secondary};
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.25rem; /* sm:text-xl */
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* gap-6 */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; /* gap-8 */
  }
`;

export const FeatureCard = styled.div`
  padding: 1.5rem; /* p-6 */
  /* Replaced borderRadiusLg with borderRadius to fix TS error */
  border-radius: ${props => props.theme.shape.borderRadius}; 
  border: 2px solid ${props => props.theme.colors.border}; /* border-slate-100 */
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.xl};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem; /* sm:p-8 */
  }
`;

export const FeatureIconWrapper = styled.div`
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  background: linear-gradient(to bottom right, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.primary.dark});
  border-radius: ${props => props.theme.shape.borderRadiusSm};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem; /* mb-4 */
  color: white;
  transition: transform 0.3s ease-in-out;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: 3.5rem; /* sm:w-14 */
    height: 3.5rem; /* sm:h-14 */
    margin-bottom: 1.5rem; /* sm:mb-6 */
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
        width: 1.5rem;
        height: 1.5rem;
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem; /* text-xl */
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem; /* mb-2 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem; /* sm:text-2xl */
    margin-bottom: 0.75rem; /* sm:mb-3 */
  }
`;

export const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;


// --- Testimonials Section ---

export const TestimonialsSection = styled.section`
  padding: 4rem 0; /* py-16 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 6rem 0; /* py-24 */
  }
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* gap-6 */

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; /* gap-8 */
  }
`;

export const TestimonialCard = styled.div`
  padding: 1.5rem; /* p-6 */
  background-color: white;
  /* Replaced borderRadiusLg with borderRadius to fix TS error */
  border-radius: ${props => props.theme.shape.borderRadius}; 
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: ${props => props.theme.shadows.xl};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem; /* sm:p-8 */
  }
`;

export const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary.main}; /* orange-500 */

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const TestimonialText = styled.p`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1.5rem; /* mb-6 */
  line-height: 1.6;
  font-style: italic;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem; /* sm:text-base */
  }
`;

export const AuthorName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

export const AuthorRole = styled.div`
  font-size: 0.875rem; /* text-sm */
  color: ${props => props.theme.colors.text.secondary};
`;

// --- Final CTA Section ---

export const FinalCTASection = styled.section`
  padding: 4rem 0; /* py-16 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 6rem 0; /* py-24 */
  }
`;

export const CTAContainer = styled.div`
  background: linear-gradient(to bottom right, ${props => props.theme.colors.primary.dark}, ${props => props.theme.colors.primary.main});
  border-radius: 1.5rem; /* rounded-3xl */
  padding: 2rem; /* p-8 */
  text-align: center;
  color: white;
  box-shadow: ${props => props.theme.shadows.xl};
  max-width: 56rem;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 3rem; /* sm:p-12 */
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 4rem; /* lg:p-16 */
  }
`;

export const CTATitle = styled.h2`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  margin-bottom: 1rem; /* mb-4 */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.25rem; /* sm:text-4xl */
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 3rem; /* lg:text-5xl */
  }
`;

export const CTASubtitle = styled.p`
  font-size: 1.125rem; /* text-lg */
  margin-bottom: 2.5rem; /* mb-8 sm:mb-10 */
  /* Replaced primary.lightest with white to fix TS error */
  color: white; 

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.25rem; /* sm:text-xl */
  }
`;

export const CTAButton = styled.button`
  padding: 1rem 2rem; /* px-8 sm:px-12 py-4 */
  background: white;
  color: ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.shape.borderRadius};
  font-weight: 700;
  font-size: 1.125rem; /* text-lg */
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    /* Replaced neutral.lightest with neutral.light to fix TS error */
    background: ${props => props.theme.colors.neutral.light}; 
    transform: scale(1.05);
  }
`;

// --- Footer ---

export const Footer = styled.footer`
  padding: 3rem 0; /* py-12 */
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`;

export const FooterLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem; /* mb-4 */
`;

export const FooterText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.875rem; /* text-sm */
`;