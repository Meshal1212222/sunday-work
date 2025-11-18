// صفحة لعرض Auth بدون AuthProvider - لاختبار التصميم فقط
import Logo from '../components/Logo'
import brand from '../assets/brand'

export default function AuthTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #5B4E9D 0%, #764ba2 50%, #8B5CF6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Main Card */}
      <div style={{
        background: 'white',
        borderRadius: '32px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
        padding: '80px 60px',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <Logo size="xl" variant="tilted" showText={false} />
          <h1 style={{
            fontSize: '56px',
            fontWeight: brand.typography.fontWeight.black,
            background: brand.colors.primary.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-2px'
          }}>
            {brand.name}
          </h1>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: brand.typography.fontSize.xl,
          color: brand.colors.gray[600],
          textAlign: 'center',
          marginBottom: brand.spacing['3xl'],
          fontWeight: brand.typography.fontWeight.medium
        }}>
          {brand.tagline} 🚀
        </p>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: brand.spacing.lg,
          marginBottom: brand.spacing['2xl']
        }}>
          {brand.features.slice(0, 3).map((item, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: brand.spacing.lg,
              background: `linear-gradient(135deg, ${brand.colors.gray[50]} 0%, #f0f4ff 100%)`,
              borderRadius: brand.borderRadius.xl,
              border: `1px solid ${brand.colors.gray[200]}`,
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '32px', marginBottom: brand.spacing.sm }}>{item.icon}</div>
              <div style={{
                fontSize: brand.typography.fontSize.sm,
                color: brand.colors.primary.main,
                fontWeight: brand.typography.fontWeight.semibold
              }}>{item.title}</div>
            </div>
          ))}
        </div>

        {/* Brand Colors Showcase */}
        <div style={{
          background: brand.colors.gray[50],
          padding: brand.spacing.xl,
          borderRadius: brand.borderRadius.xl,
          marginBottom: brand.spacing.xl
        }}>
          <h3 style={{
            fontSize: brand.typography.fontSize.lg,
            fontWeight: brand.typography.fontWeight.bold,
            color: brand.colors.gray[900],
            marginBottom: brand.spacing.lg,
            textAlign: 'center'
          }}>🎨 الهوية البصرية</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: brand.spacing.md,
            marginBottom: brand.spacing.lg
          }}>
            {[
              { name: 'Primary', color: brand.colors.primary.main },
              { name: 'Success', color: brand.colors.success },
              { name: 'Warning', color: brand.colors.warning },
              { name: 'Danger', color: brand.colors.danger },
              { name: 'Info', color: brand.colors.info }
            ].map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100%',
                  height: '50px',
                  background: c.color,
                  borderRadius: brand.borderRadius.md,
                  marginBottom: brand.spacing.sm,
                  boxShadow: brand.shadows.md
                }}></div>
                <div style={{
                  fontSize: brand.typography.fontSize.xs,
                  color: brand.colors.gray[600],
                  fontWeight: brand.typography.fontWeight.medium
                }}>{c.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: brand.spacing.xl,
          borderRadius: brand.borderRadius.xl,
          textAlign: 'center',
          border: `2px solid ${brand.colors.warning}`
        }}>
          <p style={{
            fontSize: brand.typography.fontSize.lg,
            color: '#92400e',
            marginBottom: brand.spacing.md,
            fontWeight: brand.typography.fontWeight.bold
          }}>
            💡 معاينة التصميم
          </p>
          <p style={{
            fontSize: brand.typography.fontSize.sm,
            color: '#78350f',
            marginBottom: brand.spacing.lg
          }}>
            لرؤية صفحة المصادقة الكاملة، افتح Console (F12) والصق الكود:
          </p>
          <code style={{
            display: 'block',
            background: brand.colors.gray[800],
            color: brand.colors.success,
            padding: brand.spacing.lg,
            borderRadius: brand.borderRadius.lg,
            fontFamily: brand.typography.fontFamily.code,
            fontSize: '11px',
            textAlign: 'left',
            direction: 'ltr',
            overflow: 'auto',
            lineHeight: '1.6',
            boxShadow: brand.shadows.inner
          }}>
{`(async () => {
  const dbs = await indexedDB.databases();
  dbs.forEach(db => indexedDB.deleteDatabase(db.name));
  localStorage.clear();
  sessionStorage.clear();
  setTimeout(() => location.href = '/sunday-work/auth', 1000);
})();`}
          </code>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          color: '#999',
          fontSize: '13px'
        }}>
          Made with 💜 by Claude & Meshal
        </div>
      </div>

      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '30px',
        transform: 'rotate(45deg)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        transform: 'rotate(-45deg)',
        animation: 'float 4s ease-in-out infinite'
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
      `}</style>
    </div>
  )
}
