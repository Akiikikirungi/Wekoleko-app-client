import React from 'react';
import { 
  InputWrapper, 
  StyledInput, 
  InputIcon, 
  ErrorMessage, 
  HelperText 
} from './Input.styles';
import { FaExclamationCircle } from 'react-icons/fa';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  startIcon,
  endIcon,
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  ...props
}, ref) => {
  return (
    <div>
      <InputWrapper $fullWidth={fullWidth}>
        {startIcon && <InputIcon position="left">{startIcon}</InputIcon>}
        <StyledInput
          ref={ref}
          $hasError={!!error}
          disabled={disabled}
          style={{
            paddingLeft: startIcon ? '2.75rem' : '1rem',
            paddingRight: endIcon ? '2.75rem' : '1rem'
          }}
          {...props}
        />
        {endIcon && <InputIcon position="right">{endIcon}</InputIcon>}
      </InputWrapper>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle />
          {error}
        </ErrorMessage>
      )}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;