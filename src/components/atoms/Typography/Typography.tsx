import React from 'react';
import { StyledTypography } from './Typography.styles';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  component?: React.ElementType;
  color?: string;
  align?: 'left' | 'center' | 'right';
  gutterBottom?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  component,
  color,
  align,
  gutterBottom = false,
  children,
  className,
  ...props
}) => {
  return (
    <StyledTypography
      as={component || getDefaultComponent(variant)}
      variant={variant}
      color={color}
      align={align}
      $gutterBottom={gutterBottom}
      className={className}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

const getDefaultComponent = (variant: string): React.ElementType => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
      return 'h6';
    default:
      return 'p';
  }
};

export default Typography;