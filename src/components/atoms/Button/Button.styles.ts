import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonStyleProps {
  variant: ButtonVariant;
  size: ButtonSize;
  $fullWidth?: boolean;
  $isLoading?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: var(--primary-color);
        color: white;
        &:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
      `;
    case 'secondary':
      return css`
        background-color: var(--surface-color);
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        &:hover:not(:disabled) {
          background-color: var(--primary-color);
          color: white;
        }
      `;
    case 'danger':
      return css`
        background-color: var(--danger-color);
        color: white;
        &:hover:not(:disabled) {
          background-color: #c81e1e;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: var(--text-color-primary);
        &:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
  }
};

export const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  position: relative;
  
  ${props => getVariantStyles(props.variant)}
  ${props => getSizeStyles(props.size)}
  
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.$isLoading && css`
    color: transparent;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      border: 2px solid;
      border-radius: 50%;
      border-color: currentColor transparent currentColor transparent;
      animation: spin 1s linear infinite;
    }
  `}
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25em;
`;