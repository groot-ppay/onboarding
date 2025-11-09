import { FC } from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from './loader.json';

export interface LoaderProps {
  description?: string;
}

export const Loader: FC<LoaderProps> = ({ description }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', width: '100%' }}>
    <div style={{ width: '6rem', height: '6rem' }}>
      <Lottie animationData={loaderAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
    {description && (
      <p style={{ color: 'var(--gray-900)', fontSize: '1rem', fontWeight: 600, textAlign: 'center', maxWidth: '100%' }}>
        {description}
      </p>
    )}
  </div>
);
