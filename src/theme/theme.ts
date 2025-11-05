// ./theme/theme.ts (updated to include dark variants for colors)
export const lightTheme = {
  colors: {
    primary: {
      main: '#FF6B00', // Vibrant orange
      dark: '#E55A00',
      light: '#FF8F4D',
    },
    accent: {
      main: '#FFD700', // Gold/yellow for highlights
    },
    success: {
      main: '#22C55E',
      dark: '#16A34A',
    },
    warning: {
      main: '#EAB308',
      dark: '#CA8A04',
    },
    error: {
      main: '#EF4444',
      dark: '#B91C1C', // Added dark variant
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #FF8F4D 0%, #FF6B00 100%)', // Updated gradient for vibrancy
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      inverted: '#FFFFFF',
    },
    border: '#E5E7EB',
    neutral: {
      light: '#F3F4F6',
      medium: '#D1D5DB',
    },
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 8px rgba(0,0,0,0.1)',
    lg: '0 8px 16px rgba(0,0,0,0.1)',
    xl: '0 12px 24px rgba(0,0,0,0.15)',
    inset: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  },
  shape: {
    borderRadius: '16px',
    borderRadiusSm: '8px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { size: 'clamp(2.5rem, 5vw, 4rem)', weight: 800 },
    h2: { size: 'clamp(1.75rem, 4vw, 2.5rem)', weight: 700 },
    h3: { size: 'clamp(1.25rem, 3vw, 1.75rem)', weight: 600 },
    body1: { size: '1rem', weight: 400 },
    body2: { size: '0.875rem', weight: 400 },
    caption: { size: '0.75rem', weight: 400 },
  },
  transitions: {
    ease: 'ease-in-out',
    duration: '0.3s',
  },
};