import styled from 'styled-components';

export const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.hasError ? props.theme.colors.error.main : props.theme.colors.border};
  border-radius: ${props => props.theme.shape.borderRadius};
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? props.theme.colors.error.main : props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 
      props.theme.colors.error.main + '20' : 
      props.theme.colors.primary.main + '20'
    };
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.background.default};
    cursor: not-allowed;
  }
`;

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error.main};
  font-size: 0.875rem;
`;