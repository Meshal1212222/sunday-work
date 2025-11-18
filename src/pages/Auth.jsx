import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser, createCompany } from '../firebase/auth'
import { LogIn, UserPlus, Building2, Mail, Lock, User, Key, AlertCircle, Loader2 } from 'lucide-react'
import './Auth.css'

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login', 'register', 'create-company'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerCompanyCode, setRegisterCompanyCode] = useState('')

  // Create company form
  const [companyName, setCompanyName] = useState('')
  const [companyOwnerEmail, setCompanyOwnerEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await loginUser(loginEmail, loginPassword)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await registerUser(
      registerEmail,
      registerPassword,
      registerName,
      registerCompanyCode
    )

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleCreateCompany = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const result = await createCompany(companyName, companyOwnerEmail)

    if (result.success) {
      setSuccess(`تم إنشاء الشركة بنجاح! رمز الشركة: ${result.code}`)
      setCompanyName('')
      setCompanyOwnerEmail('')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <h1 className="brand-logo">Sunday</h1>
            <p className="brand-tagline">منصة إدارة المشاريع الاحترافية</p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✨</div>
                <div className="feature-text">
                  <h3>إدارة متقدمة</h3>
                  <p>نظام شامل لإدارة المهام والمشاريع</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-text">
                  <h3>تعاون فعّال</h3>
                  <p>تواصل فوري بين أعضاء الفريق</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h3>تقارير ذكية</h3>
                  <p>تحليلات وإحصائيات مفصلة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="auth-forms">
          <div className="auth-forms-content">
            {/* Mode Selector */}
            <div className="mode-selector">
              <button
                className={`mode-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                <LogIn size={18} />
                <span>تسجيل دخول</span>
              </button>
              <button
                className={`mode-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => setMode('register')}
              >
                <UserPlus size={18} />
                <span>حساب جديد</span>
              </button>
              <button
                className={`mode-btn ${mode === 'create-company' ? 'active' : ''}`}
                onClick={() => setMode('create-company')}
              >
                <Building2 size={18} />
                <span>إنشاء شركة</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="alert alert-success">
                <AlertCircle size={18} />
                <span>{success}</span>
              </div>
            )}

            {/* Login Form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="auth-form">
                <h2 className="form-title">مرحباً بعودتك!</h2>
                <p className="form-subtitle">سجّل دخولك للمتابعة</p>

                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <div className="input-with-icon">
                    <Mail size={20} />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>كلمة المرور</label>
                  <div className="input-with-icon">
                    <Lock size={20} />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      <span>جاري تسجيل الدخول...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span>تسجيل الدخول</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Register Form */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="auth-form">
                <h2 className="form-title">إنشاء حساب جديد</h2>
                <p className="form-subtitle">انضم لفريقك الآن</p>

                <div className="form-group">
                  <label>الاسم الكامل</label>
                  <div className="input-with-icon">
                    <User size={20} />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="أحمد محمد"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <div className="input-with-icon">
                    <Mail size={20} />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>كلمة المرور</label>
                  <div className="input-with-icon">
                    <Lock size={20} />
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>رمز الشركة</label>
                  <div className="input-with-icon">
                    <Key size={20} />
                    <input
                      type="text"
                      value={registerCompanyCode}
                      onChange={(e) => setRegisterCompanyCode(e.target.value.toUpperCase())}
                      placeholder="ABC12345"
                      required
                      maxLength={8}
                    />
                  </div>
                  <small className="form-hint">اطلب رمز الشركة من المسؤول</small>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      <span>جاري إنشاء الحساب...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>إنشاء الحساب</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Create Company Form */}
            {mode === 'create-company' && (
              <form onSubmit={handleCreateCompany} className="auth-form">
                <h2 className="form-title">إنشاء شركة جديدة</h2>
                <p className="form-subtitle">ابدأ بإدارة فريقك</p>

                <div className="form-group">
                  <label>اسم الشركة</label>
                  <div className="input-with-icon">
                    <Building2 size={20} />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="شركة التقنية المتقدمة"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>البريد الإلكتروني للمسؤول</label>
                  <div className="input-with-icon">
                    <Mail size={20} />
                    <input
                      type="email"
                      value={companyOwnerEmail}
                      onChange={(e) => setCompanyOwnerEmail(e.target.value)}
                      placeholder="admin@company.com"
                      required
                    />
                  </div>
                  <small className="form-hint">سيتم إرسال رمز الشركة لهذا البريد</small>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      <span>جاري إنشاء الشركة...</span>
                    </>
                  ) : (
                    <>
                      <Building2 size={18} />
                      <span>إنشاء الشركة</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
