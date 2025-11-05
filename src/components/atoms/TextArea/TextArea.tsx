import React from 'react';
import { 
  StyledTextArea, 
  TextAreaWrapper,
  Label,
  ErrorMessage 
} from './TextArea.styles';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <TextAreaWrapper style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && <Label>{label}</Label>}
      <StyledTextArea
        ref={ref}
        hasError={!!error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextAreaWrapper>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;