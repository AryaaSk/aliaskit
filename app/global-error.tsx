'use client'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050914',
          color: '#E2E8F0',
          fontFamily: 'monospace',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h2 style={{ color: '#FF0055', margin: 0 }}>Something went wrong</h2>
        {error.digest && (
          <p style={{ color: '#475569', margin: 0, fontSize: '12px' }}>
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={unstable_retry}
          style={{
            background: 'transparent',
            border: '1px solid #00F0FF',
            color: '#00F0FF',
            padding: '8px 20px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
