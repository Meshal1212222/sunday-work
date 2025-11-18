// صفحة لعرض Auth بدون AuthProvider - لاختبار التصميم فقط
import { BrowserRouter as Router } from 'react-router-dom'

export default function AuthTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '60px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#5B4E9D',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Sunday
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          منصة إدارة المشاريع الاحترافية
        </p>

        <div style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
            هذه معاينة لتصميم صفحة المصادقة
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            لرؤية النسخة الكاملة، افتح الكونسول (F12) واكتب:
          </p>
          <code style={{
            display: 'block',
            background: '#333',
            color: '#0f0',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '15px',
            fontFamily: 'monospace',
            fontSize: '12px',
            textAlign: 'left',
            direction: 'ltr',
            overflow: 'auto'
          }}>
            {`(async () => {
  if (window.indexedDB) {
    const dbs = await window.indexedDB.databases();
    for (const db of dbs) {
      window.indexedDB.deleteDatabase(db.name);
    }
  }
  localStorage.clear();
  sessionStorage.clear();
  await new Promise(r => setTimeout(r, 1000));
  window.location.href = '/sunday-work/auth';
})();`}
          </code>
        </div>
      </div>
    </div>
  )
}
