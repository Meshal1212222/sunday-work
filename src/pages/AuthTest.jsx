// Sunday Brand Showcase - عرض الهوية البصرية الكاملة
import Logo from '../components/Logo'
import brand from '../assets/brand'

export default function AuthTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${brand.colors.vibrant.purple} 0%, ${brand.colors.vibrant.pink} 50%, ${brand.colors.vibrant.orange} 100%)`,
      padding: '40px 20px',
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: brand.borderRadius['3xl'],
          padding: brand.spacing['3xl'],
          marginBottom: brand.spacing.xl,
          boxShadow: brand.shadows['2xl'],
          textAlign: 'center'
        }}>
          <Logo size="xl" variant="stacked" showText={true} animated={true} />

          <p style={{
            fontSize: brand.typography.fontSize.lg,
            color: brand.colors.gray[600],
            marginTop: brand.spacing.xl,
            maxWidth: '600px',
            margin: '24px auto 0'
          }}>
            {brand.description}
          </p>
        </div>

        {/* Brand Personality */}
        <div style={{
          background: 'white',
          borderRadius: brand.borderRadius['2xl'],
          padding: brand.spacing.xl,
          marginBottom: brand.spacing.xl,
          boxShadow: brand.shadows.xl
        }}>
          <h2 style={{
            fontSize: brand.typography.fontSize['3xl'],
            fontWeight: brand.typography.fontWeight.black,
            color: brand.colors.gray[900],
            marginBottom: brand.spacing.lg,
            textAlign: 'center'
          }}>🎭 شخصية العلامة التجارية</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: brand.spacing.lg
          }}>
            {[
              { title: 'الصوت', value: brand.personality.voice, icon: '🗣️' },
              { title: 'النبرة', value: brand.personality.tone, icon: '🎵' },
              { title: 'الأسلوب', value: brand.personality.style, icon: '✨' }
            ].map((item, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${brand.colors.gray[50]} 0%, white 100%)`,
                padding: brand.spacing.lg,
                borderRadius: brand.borderRadius.xl,
                border: `2px solid ${brand.colors.gray[200]}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: brand.spacing.sm }}>{item.icon}</div>
                <h3 style={{
                  fontSize: brand.typography.fontSize.lg,
                  fontWeight: brand.typography.fontWeight.bold,
                  color: brand.colors.gray[900],
                  marginBottom: brand.spacing.sm
                }}>{item.title}</h3>
                <p style={{
                  fontSize: brand.typography.fontSize.sm,
                  color: brand.colors.gray[600]
                }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vibrant Colors */}
        <div style={{
          background: 'white',
          borderRadius: brand.borderRadius['2xl'],
          padding: brand.spacing.xl,
          marginBottom: brand.spacing.xl,
          boxShadow: brand.shadows.xl
        }}>
          <h2 style={{
            fontSize: brand.typography.fontSize['3xl'],
            fontWeight: brand.typography.fontWeight.black,
            color: brand.colors.gray[900],
            marginBottom: brand.spacing.lg,
            textAlign: 'center'
          }}>🎨 الألوان النابضة بالحياة</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: brand.spacing.md
          }}>
            {Object.entries(brand.colors.vibrant).map(([name, color]) => (
              <div
                key={name}
                style={{
                  background: color,
                  height: '120px',
                  borderRadius: brand.borderRadius.xl,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: brand.shadows.lg,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  color: 'white',
                  fontWeight: brand.typography.fontWeight.bold
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '24px', marginBottom: '8px' }}>●</span>
                <span style={{ fontSize: '12px', textTransform: 'capitalize' }}>{name}</span>
                <code style={{ fontSize: '9px', opacity: 0.8 }}>{color}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{
          background: 'white',
          borderRadius: brand.borderRadius['2xl'],
          padding: brand.spacing.xl,
          marginBottom: brand.spacing.xl,
          boxShadow: brand.shadows.xl
        }}>
          <h2 style={{
            fontSize: brand.typography.fontSize['3xl'],
            fontWeight: brand.typography.fontWeight.black,
            color: brand.colors.gray[900],
            marginBottom: brand.spacing.lg,
            textAlign: 'center'
          }}>⭐ المميزات الأساسية</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: brand.spacing.lg
          }}>
            {brand.features.map((feature, i) => (
              <div
                key={i}
                style={{
                  background: `linear-gradient(135deg, ${Object.values(brand.colors.vibrant)[i % 8]}15 0%, ${Object.values(brand.colors.vibrant)[i % 8]}05 100%)`,
                  padding: brand.spacing.lg,
                  borderRadius: brand.borderRadius.xl,
                  border: `2px solid ${Object.values(brand.colors.vibrant)[i % 8]}`,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = brand.shadows.xl
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: brand.spacing.md }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: brand.typography.fontSize.lg,
                  fontWeight: brand.typography.fontWeight.bold,
                  color: brand.colors.gray[900],
                  marginBottom: brand.spacing.sm
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: brand.typography.fontSize.sm,
                  color: brand.colors.gray[600]
                }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Variations */}
        <div style={{
          background: 'white',
          borderRadius: brand.borderRadius['2xl'],
          padding: brand.spacing.xl,
          marginBottom: brand.spacing.xl,
          boxShadow: brand.shadows.xl
        }}>
          <h2 style={{
            fontSize: brand.typography.fontSize['3xl'],
            fontWeight: brand.typography.fontWeight.black,
            color: brand.colors.gray[900],
            marginBottom: brand.spacing.lg,
            textAlign: 'center'
          }}>🌟 أشكال الشعار المختلفة</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: brand.spacing.xl,
            padding: brand.spacing.lg
          }}>
            <div style={{ textAlign: 'center', padding: brand.spacing.lg, background: brand.colors.gray[50], borderRadius: brand.borderRadius.xl }}>
              <Logo size="lg" variant="full" showText={true} animated={false} />
              <p style={{ marginTop: brand.spacing.md, fontSize: brand.typography.fontSize.sm, color: brand.colors.gray[600] }}>Full Logo</p>
            </div>
            <div style={{ textAlign: 'center', padding: brand.spacing.lg, background: brand.colors.gray[50], borderRadius: brand.borderRadius.xl }}>
              <Logo size="lg" variant="stacked" showText={true} animated={false} />
              <p style={{ marginTop: brand.spacing.md, fontSize: brand.typography.fontSize.sm, color: brand.colors.gray[600] }}>Stacked Logo</p>
            </div>
            <div style={{ textAlign: 'center', padding: brand.spacing.lg, background: brand.colors.gray[50], borderRadius: brand.borderRadius.xl }}>
              <Logo size="lg" showText={false} animated={true} />
              <p style={{ marginTop: brand.spacing.md, fontSize: brand.typography.fontSize.sm, color: brand.colors.gray[600] }}>Icon Only (Animated)</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          background: `linear-gradient(135deg, ${brand.colors.vibrant.yellow}30 0%, ${brand.colors.vibrant.orange}30 100%)`,
          padding: brand.spacing.xl,
          borderRadius: brand.borderRadius['2xl'],
          textAlign: 'center',
          border: `3px solid ${brand.colors.vibrant.orange}`,
          boxShadow: brand.shadows.xl
        }}>
          <h3 style={{
            fontSize: brand.typography.fontSize['2xl'],
            fontWeight: brand.typography.fontWeight.bold,
            color: brand.colors.gray[900],
            marginBottom: brand.spacing.md
          }}>
            🚀 جاهز للانطلاق؟
          </h3>
          <p style={{
            fontSize: brand.typography.fontSize.lg,
            color: brand.colors.gray[700],
            marginBottom: brand.spacing.lg
          }}>
            لرؤية صفحة المصادقة الكاملة، افتح Console (F12) والصق الكود:
          </p>
          <code style={{
            display: 'block',
            background: brand.colors.gray[900],
            color: brand.colors.success,
            padding: brand.spacing.lg,
            borderRadius: brand.borderRadius.xl,
            fontFamily: brand.typography.fontFamily.code,
            fontSize: brand.typography.fontSize.sm,
            textAlign: 'left',
            direction: 'ltr',
            overflow: 'auto',
            lineHeight: '1.8',
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
          marginTop: brand.spacing.xl,
          textAlign: 'center',
          color: 'white',
          fontSize: brand.typography.fontSize.lg,
          fontWeight: brand.typography.fontWeight.medium,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Made with 💜 by Claude & Meshal
        </div>
      </div>
    </div>
  )
}
