interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div style={{ marginBottom: '2rem' }}>
    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
      {title}
    </h1>
    <p style={{ color: 'var(--gray-600)' }}>{subtitle}</p>
  </div>
);
