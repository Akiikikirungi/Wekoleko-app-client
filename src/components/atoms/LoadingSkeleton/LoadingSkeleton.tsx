import React from 'react';
import { 
  SkeletonWrapper,
  SkeletonItem,
  SkeletonCard 
} from './LoadingSkeleton.styles';

interface LoadingSkeletonProps {
  type?: 'ticket' | 'details' | 'form';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'ticket',
  count = 1 
}) => {
  const renderTicketSkeleton = () => (
    <SkeletonCard>
      <SkeletonItem height="28px" width="60%" margin="0 0 1rem 0" />
      <SkeletonItem height="16px" width="30%" margin="0 0 1rem 0" />
      <SkeletonItem height="16px" width="100%" margin="0 0 0.5rem 0" />
      <SkeletonItem height="16px" width="90%" margin="0 0 1rem 0" />
      <SkeletonItem height="200px" width="100%" margin="0 0 1rem 0" />
      <SkeletonItem height="36px" width="120px" />
    </SkeletonCard>
  );

  const renderDetailsSkeleton = () => (
    <SkeletonCard>
      <SkeletonItem height="40px" width="70%" margin="0 0 1rem 0" />
      <SkeletonItem height="20px" width="30%" margin="0 0 2rem 0" />
      <SkeletonItem height="16px" width="100%" margin="0 0 0.5rem 0" />
      <SkeletonItem height="16px" width="100%" margin="0 0 0.5rem 0" />
      <SkeletonItem height="16px" width="80%" margin="0 0 2rem 0" />
      <SkeletonItem height="300px" width="100%" margin="0 0 1rem 0" />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <SkeletonItem height="36px" width="120px" />
        <SkeletonItem height="36px" width="120px" />
      </div>
    </SkeletonCard>
  );

  const renderFormSkeleton = () => (
    <SkeletonCard>
      <SkeletonItem height="24px" width="40%" margin="0 0 1rem 0" />
      <SkeletonItem height="48px" width="100%" margin="0 0 1.5rem 0" />
      <SkeletonItem height="24px" width="40%" margin="0 0 1rem 0" />
      <SkeletonItem height="120px" width="100%" margin="0 0 1.5rem 0" />
      <SkeletonItem height="24px" width="40%" margin="0 0 1rem 0" />
      <SkeletonItem height="48px" width="100%" margin="0 0 1.5rem 0" />
      <SkeletonItem height="36px" width="120px" />
    </SkeletonCard>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'ticket':
        return renderTicketSkeleton();
      case 'details':
        return renderDetailsSkeleton();
      case 'form':
        return renderFormSkeleton();
      default:
        return renderTicketSkeleton();
    }
  };

  return (
    <SkeletonWrapper>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </SkeletonWrapper>
  );
};

export default LoadingSkeleton;