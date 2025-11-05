import styled, { css } from 'styled-components';

interface InputWrapperProps {
  $fullWidth?: boolean;
}

interface StyledInputProps {
  $hasError?: boolean;
  disabled?: boolean;
}

interface InputIconProps {
  position: 'left' | 'right';
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: inline-flex;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${props => props.$hasError ? 'var(--danger-color)' : 'var(--border-color)'};
  border-radius: 8px;
  background-color: var(--surface-color);
  color: var(--text-color-primary);
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? 'var(--danger-color)' : 'var(--primary-color)'};
    box-shadow: 0 0 0 3px ${props => props.$hasError 
      ? 'rgba(239, 68, 68, 0.2)' 
      : 'rgba(90, 103, 216, 0.2)'};
  }
  
  &::placeholder {
    color: var(--text-color-secondary);
  }
  
  ${props => props.disabled && css`
    background-color: var(--background-color);
    cursor: not-allowed;
    opacity: 0.7;
  `}
  
  ${props => props.$hasError && css`
    &:focus {
      border-color: var(--danger-color);
    }
  `}
`;

export const InputIcon = styled.span<InputIconProps>`
  position: absolute;
  top: 50%;
  ${props => props.position === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  transform: translateY(-50%);
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const HelperText = styled.div`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;