import React from 'react';
import { StyledButton, ButtonIcon } from './Button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  to?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      {...props}
    >
      {startIcon && <ButtonIcon>{startIcon}</ButtonIcon>}
      {children}
      {endIcon && <ButtonIcon>{endIcon}</ButtonIcon>}
    </StyledButton>
  );
};

export default Button;