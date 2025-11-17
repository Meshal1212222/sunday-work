import { HelpCircle, BookOpen, MessageCircle, Video, FileText } from 'lucide-react'
import './Help.css'

export default function Help() {
  const helpSections = [
    {
      icon: BookOpen,
      title: 'دليل الاستخدام',
      description: 'تعلم كيفية استخدام جميع ميزات النظام',
      link: '#'
    },
    {
      icon: Video,
      title: 'فيديوهات تعليمية',
      description: 'شاهد دروس فيديو خطوة بخطوة',
      link: '#'
    },
    {
      icon: MessageCircle,
      title: 'الدعم الفني',
      description: 'تواصل مع فريق الدعم للحصول على المساعدة',
      link: '#'
    },
    {
      icon: FileText,
      title: 'الأسئلة الشائعة',
      description: 'إجابات على الأسئلة الأكثر شيوعاً',
      link: '#'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <HelpCircle size={32} />
          <div>
            <h1>المساعدة والدعم</h1>
            <p className="page-subtitle">نحن هنا لمساعدتك</p>
          </div>
        </div>
      </div>

      <div className="help-grid">
        {helpSections.map((section, index) => (
          <a href={section.link} key={index} className="help-card">
            <div className="help-icon">
              <section.icon size={32} />
            </div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </a>
        ))}
      </div>

      <div className="contact-section">
        <h2>هل تحتاج إلى مساعدة إضافية؟</h2>
        <p>فريق الدعم الفني متاح على مدار الساعة لمساعدتك</p>
        <button className="btn-primary">تواصل مع الدعم</button>
      </div>
    </div>
  )
}
