interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div style={{ marginBottom: '4rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        {title}
      </h1>
      <a
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          window.history.pushState({}, '', '/login');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        style={{
          color: 'var(--gray-600)',
          fontSize: '0.875rem',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-600)'}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </a>
    </div>
    <p style={{ color: 'var(--gray-600)' }}>{subtitle}</p>
  </div>
);
