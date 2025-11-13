/**
 * Mock Data - Structured like Monday.com
 * Used for development and testing
 */

export const mockWorkspaces = [
  {
    id: '1',
    name: 'مساحة العمل الرئيسية',
    icon: '🏢',
    color: '#6161FF',
    members: 24,
    boards: 6
  },
  {
    id: '2',
    name: 'التسويق الرقمي',
    icon: '📊',
    color: '#00CA72',
    members: 12,
    boards: 3
  },
  {
    id: '3',
    name: 'تطوير المنتج',
    icon: '💻',
    color: '#FDAB3D',
    members: 18,
    boards: 4
  }
]

export const mockBoards = {
  '1': [
    { id: 'b1', name: 'مشروع التطبيق الجديد', icon: '📱', color: '#6161FF', tasks: 24 },
    { id: 'b2', name: 'التسويق الرقمي', icon: '📊', color: '#00CA72', tasks: 18 },
    { id: 'b3', name: 'تطوير Backend', icon: '⚙️', color: '#FDAB3D', tasks: 31 },
    { id: 'b4', name: 'إدارة المحتوى', icon: '✍️', color: '#E44258', tasks: 12 },
    { id: 'b5', name: 'خدمة العملاء', icon: '💬', color: '#0073EA', tasks: 8 },
    { id: 'b6', name: 'الموارد البشرية', icon: '👥', color: '#FF158A', tasks: 15 }
  ],
  '2': [
    { id: 'b7', name: 'حملة وسائل التواصل', icon: '📱', color: '#00CA72', tasks: 14 },
    { id: 'b8', name: 'إنشاء المحتوى', icon: '✨', color: '#6161FF', tasks: 22 },
    { id: 'b9', name: 'تحليل البيانات', icon: '📈', color: '#0073EA', tasks: 9 }
  ],
  '3': [
    { id: 'b10', name: 'تصميم UI/UX', icon: '🎨', color: '#FF158A', tasks: 16 },
    { id: 'b11', name: 'Frontend Development', icon: '💻', color: '#6161FF', tasks: 28 },
    { id: 'b12', name: 'Backend Development', icon: '⚙️', color: '#FDAB3D', tasks: 19 },
    { id: 'b13', name: 'Testing & QA', icon: '🔍', color: '#00CA72', tasks: 11 }
  ]
}

export const mockTeamMembers = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@company.com',
    phone: '+966501234567',
    photo: null,
    title: 'مدير المشروع',
    role: 'Admin',
    status: 'active'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@company.com',
    phone: '+966507654321',
    photo: null,
    title: 'مطورة Frontend',
    role: 'Member',
    status: 'active'
  },
  {
    id: '3',
    name: 'خالد سعيد',
    email: 'khaled@company.com',
    phone: '+966509876543',
    photo: null,
    title: 'مطور Backend',
    role: 'Member',
    status: 'active'
  },
  {
    id: '4',
    name: 'نورة حسن',
    email: 'noura@company.com',
    phone: '+966502468135',
    photo: null,
    title: 'مصممة UI/UX',
    role: 'Member',
    status: 'active'
  },
  {
    id: '5',
    name: 'محمد عبدالله',
    email: 'mohammed@company.com',
    phone: '+966503691472',
    photo: null,
    title: 'مختص تسويق',
    role: 'Member',
    status: 'active'
  }
]

export const mockCurrentUser = {
  id: '1',
  name: 'أحمد محمد',
  email: 'ahmed@company.com',
  phone: '+966501234567',
  photo: null,
  title: 'مدير المشروع',
  role: 'Admin'
}
