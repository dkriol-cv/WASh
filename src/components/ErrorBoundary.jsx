import React from 'react';

/**
 * Global error boundary — catches React render errors and
 * shows a recovery screen instead of a blank white page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Erro desconhecido' };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: '#0f1f36',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: '2rem',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ fontSize: '3rem' }}>⚠️</div>
        <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#fdec00', margin: 0 }}>
          Ocorreu um erro
        </h2>
        <p style={{ opacity: 0.7, maxWidth: 400 }}>
          O curso encontrou um problema. Por favor, recarregue a página ou reinicie a atividade no LMS.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#fdec00',
            color: '#0f1f36',
            border: 'none',
            borderRadius: '2rem',
            padding: '0.75rem 2rem',
            fontWeight: 900,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Recarregar
        </button>
        {process.env.NODE_ENV !== 'production' && (
          <pre style={{ fontSize: '0.65rem', opacity: 0.4, maxWidth: 600, overflow: 'auto' }}>
            {this.state.message}
          </pre>
        )}
      </div>
    );
  }
}
