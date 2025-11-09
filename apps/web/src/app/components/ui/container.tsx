import { ReactNode, CSSProperties } from 'react';

interface ContainerProps {
  children: ReactNode;
  centered?: boolean;
  minHeight?: string;
}

export const Container = ({ children, centered = false, minHeight }: ContainerProps) => {
  const style: CSSProperties = {
    ...(centered && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    ...(minHeight && { minHeight }),
  };

  return <div style={style}>{children}</div>;
};
