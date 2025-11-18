// صفحة لعرض Auth بدون AuthProvider - لاختبار التصميم فقط
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
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #5B4E9D 0%, #8B5CF6 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 10px 30px rgba(91, 78, 157, 0.3)',
            transform: 'rotate(-5deg)'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #5B4E9D 0%, #8B5CF6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px',
          textAlign: 'center',
          letterSpacing: '-2px'
        }}>
          Sunday
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: '20px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '50px',
          fontWeight: '500'
        }}>
          منصة إدارة المشاريع الاحترافية 🚀
        </p>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { icon: '⚡', text: 'سريع' },
            { icon: '🎯', text: 'منظم' },
            { icon: '👥', text: 'تعاوني' }
          ].map((item, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '20px',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)',
              borderRadius: '16px',
              border: '1px solid #e5e7f5'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '14px', color: '#5B4E9D', fontWeight: '600' }}>{item.text}</div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '30px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '2px solid #fbbf24'
        }}>
          <p style={{ fontSize: '18px', color: '#92400e', marginBottom: '15px', fontWeight: '700' }}>
            🎨 معاينة التصميم
          </p>
          <p style={{ fontSize: '14px', color: '#78350f', marginBottom: '20px' }}>
            لرؤية صفحة المصادقة الكاملة، افتح Console (F12) والصق الكود:
          </p>
          <code style={{
            display: 'block',
            background: '#1f2937',
            color: '#10b981',
            padding: '20px',
            borderRadius: '12px',
            fontFamily: '"Fira Code", monospace',
            fontSize: '11px',
            textAlign: 'left',
            direction: 'ltr',
            overflow: 'auto',
            lineHeight: '1.6',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)'
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
