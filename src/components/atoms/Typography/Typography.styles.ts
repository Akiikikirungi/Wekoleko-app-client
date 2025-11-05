import styled, { css } from 'styled-components';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

interface TypographyProps {
  variant: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  $gutterBottom?: boolean;
}

const getVariantStyles = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h1':
      return css`
        font-size: 3rem;
        font-weight: 800;
        line-height: 1.2;
      `;
    case 'h2':
      return css`
        font-size: 2.25rem;
        font-weight: 800;
        line-height: 1.3;
      `;
    case 'h3':
      return css`
        font-size: 1.875rem;
        font-weight: 700;
        line-height: 1.3;
      `;
    case 'h4':
      return css`
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.4;
      `;
    case 'h5':
      return css`
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.4;
      `;
    case 'h6':
      return css`
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 1.4;
      `;
    case 'subtitle1':
      return css`
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5;
      `;
    case 'subtitle2':
      return css`
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.57;
      `;
    case 'body1':
      return css`
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
      `;
    case 'body2':
      return css`
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.57;
      `;
    case 'caption':
      return css`
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1.66;
      `;
    case 'overline':
      return css`
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 2.66;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      `;
  }
};

export const StyledTypography = styled.div<TypographyProps>`
  ${props => getVariantStyles(props.variant)}
  color: ${props => props.color || 'inherit'};
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.$gutterBottom ? '0.35em' : 0};
`;