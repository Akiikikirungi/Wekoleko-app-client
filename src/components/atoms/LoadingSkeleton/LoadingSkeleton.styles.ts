import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
`;

export const SkeletonItem = styled.div<{ height?: string; width?: string; margin?: string }>`
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.background.paper} 25%,
    ${props => props.theme.colors.border} 37%,
    ${props => props.theme.colors.background.paper} 63%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0'};
  border-radius: ${props => props.theme.shape.borderRadius};
`;

export const SkeletonCard = styled.div`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.shape.borderRadius};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: 1rem;
`;