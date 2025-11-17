/**
 * Real Data from Monday.com
 * Fetched from actual Monday.com workspace
 */

export const mockWorkspaces = [
  {
    id: '4163103',
    name: 'الإدارة العليا',
    icon: '🏢',
    color: '#6161FF',
    members: 29,
    boards: 22
  },
  {
    id: '4152774',
    name: 'مبيعات الشركات template',
    icon: '💼',
    color: '#E74C3C',
    members: 29,
    boards: 1
  },
  {
    id: '3823324',
    name: 'IT Management Solution',
    icon: '💻',
    color: '#0073EA',
    members: 29,
    boards: 3
  },
  {
    id: '3597255',
    name: 'Level Up',
    icon: '📈',
    color: '#00CA72',
    members: 29,
    boards: 0
  },
  {
    id: '2965387',
    name: 'CRM',
    icon: '👥',
    color: '#FDAB3D',
    members: 29,
    boards: 1
  },
  {
    id: '2678373',
    name: 'Main workspace',
    icon: '📊',
    color: '#FF158A',
    members: 29,
    boards: 0
  }
]

export const mockBoards = {
  '4163103': [
    // مبيعات وعملاء (أهم البوردات)
    { id: '1933939383', name: 'مبيعات الشركات', icon: '💰', color: '#E74C3C', tasks: 218 },
    { id: '1929435129', name: 'CRM Sales 2', icon: '📊', color: '#3498DB', tasks: 159 },
    { id: '2082909220', name: 'Brandizzer clients', icon: '👥', color: '#6161FF', tasks: 117 },
    { id: '5004046796', name: 'العملاء - المنجزين', icon: '✅', color: '#00CA72', tasks: 114 },
    { id: '5004064987', name: 'العملاء الجدد', icon: '🆕', color: '#FF158A', tasks: 21 },

    // إدارة المشاريع
    { id: '2080809360', name: 'Golden Ticket-Managemnt', icon: '🎫', color: '#FDAB3D', tasks: 55 },
    { id: '2080807883', name: 'Golden Host - Managemnt', icon: '🏨', color: '#E44258', tasks: 41 },
    { id: '1937035902', name: 'Golden Ticket-الاحداث', icon: '🎉', color: '#9B59B6', tasks: 44 },
    { id: '1937038882', name: 'Level UP - Managemnt', icon: '📈', color: '#1ABC9C', tasks: 34 },
    { id: '2080806968', name: 'Brandizr - Managemnt', icon: '⚙️', color: '#34495E', tasks: 2 },

    // سوشيال ميديا
    { id: '2080808005', name: 'Golden Host -Social Media', icon: '📱', color: '#0073EA', tasks: 23 },
    { id: '2080807098', name: 'Brandizr - Social Media', icon: '📲', color: '#00D1CD', tasks: 17 },
    { id: '1937039511', name: 'Level UP -Social Media', icon: '📣', color: '#E67E22', tasks: 2 },
    { id: '2080809452', name: 'GoldeTicket -Social Media', icon: '🎫', color: '#95A5A6', tasks: 0 },

    // نمو وتطوير
    { id: '1937040156', name: 'النمو والتطوير والشراكات', icon: '🚀', color: '#27AE60', tasks: 46 },
    { id: '1962968698', name: 'مدفوعات ليفل اب', icon: '💳', color: '#F39C12', tasks: 40 },
    { id: '5054566034', name: 'الجودة والتطوير', icon: '⚙️', color: '#9B59B6', tasks: 9 },

    // تخزين وتصاميم
    { id: '1962657975', name: 'Brandizr - Managemnt Storage', icon: '📦', color: '#7F8C8D', tasks: 14 },
    { id: '1951012012', name: 'Design Weekly Tasks', icon: '🎨', color: '#E91E63', tasks: 6 },

    // نماذج ومهام متنوعة
    { id: '5079968085', name: 'New Form', icon: '📋', color: '#3498DB', tasks: 1 },
    { id: '1937039758', name: 'new1', icon: '📝', color: '#BDC3C7', tasks: 4 },

    // متابعة المتأخرات
    { id: '9999999999', name: 'المتأخرات', icon: '⚠️', color: '#E44258', tasks: 0 },
  ],
  '4152774': [
    { id: '1923982430', name: 'مبيعات الشركات', icon: '💰', color: '#E74C3C', tasks: 27 },
  ],
  '3823324': [
    { id: '1855101083', name: 'Incidents', icon: '🚨', color: '#E74C3C', tasks: 1 },
    { id: '1855101078', name: 'Tickets', icon: '🎫', color: '#F39C12', tasks: 3 },
    { id: '1855101074', name: '📌 Start here', icon: '🏁', color: '#3498DB', tasks: 1 },
  ],
  '3597255': [],
  '2965387': [
    { id: '1682731127', name: 'Accounts', icon: '👤', color: '#9B59B6', tasks: 3 },
  ],
  '2678373': []
}

export const mockTeamMembers = [
  {
    id: '1',
    name: 'meshal',
    email: 'meshal.hgz@gmail.com',
    phone: '',
    photo: null,
    title: 'المدير التنفيذي',
    role: 'Admin',
    status: 'active',
    enabled: true
  },
  {
    id: '2',
    name: 'Majed',
    email: 'majedam12@hotmail.com',
    phone: '',
    photo: null,
    title: 'مدير المشروع',
    role: 'Admin',
    status: 'active',
    enabled: true
  },
  {
    id: '3',
    name: 'رشا العتيبي',
    email: 'rasha.qk@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '4',
    name: 'محمد مهنا',
    email: 'muhanna_mm@hotmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '5',
    name: 'yazeed almutairi',
    email: 'yzo.mut33@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '6',
    name: 'Salma alz',
    email: 'salma.hr@goldenhost.co',
    phone: '538669473',
    photo: null,
    title: 'موارد بشرية',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '7',
    name: 'Abdulaziz',
    email: 'abdulazizfadil70@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '8',
    name: 'محمد سالم',
    email: 'ma1600969@gmail.com',
    phone: '966552389264',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '9',
    name: 'أمل القرني',
    email: 'amlalqrny691@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '10',
    name: 'رغد العتيبي',
    email: 'raqmohamed1996@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '11',
    name: 'Badr Anaam',
    email: 'mediabuyer.adz1@gmail.com',
    phone: '',
    photo: null,
    title: 'Media Buyer',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '12',
    name: 'مصعب نور',
    email: 'mussabnoor88@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '13',
    name: 'sami alnajjar',
    email: 'samialnjjar1975@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '14',
    name: 'سليمان احمد',
    email: 'deesd6060@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '15',
    name: 'Siham Abdou',
    email: 'abdousiham222@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '16',
    name: 'fouad ae',
    email: 'aitelhajfouad@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '17',
    name: 'Amal',
    email: 'amal4ti@goldenhost.co',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '18',
    name: 'yasser mohanna',
    email: 'yassser.1323@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '19',
    name: 'Anwar',
    email: 'anwar8t8@hotmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '20',
    name: 'Amani A',
    email: 'amanialrizqi@goldenhost.co',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '21',
    name: 'mohammad.hr',
    email: 'mohammad.hr@goldenhost.co',
    phone: '0537805895',
    photo: null,
    title: 'موارد بشرية',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '22',
    name: 'Abdullah',
    email: 'abdullah.alruhimi@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '23',
    name: 'منيرة القحطاني',
    email: 'monirh94m@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '24',
    name: 'Mohamed Yasser',
    email: 'moh.yasser.co@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '25',
    name: 'MOHAMMED JAMAL',
    email: 'mohdesign92@gmail.com',
    phone: '',
    photo: null,
    title: 'مصمم',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '26',
    name: 'Abdulmajeed Yahya Alqahtani',
    email: 'abdulmajeed.alqahtani7@gmail.com',
    phone: '',
    photo: null,
    title: 'موظف',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '27',
    name: 'RokiaMeryem',
    email: 'rokiagadire@gmail.com',
    phone: '+212675971509',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '28',
    name: 'الهنوف',
    email: 'alhanouf7y@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  },
  {
    id: '29',
    name: 'Saja aljallal',
    email: 'saj1995.za@gmail.com',
    phone: '',
    photo: null,
    title: 'موظفة',
    role: 'Member',
    status: 'active',
    enabled: true
  }
]

export const mockCurrentUser = {
  id: '1',
  name: 'meshal',
  email: 'meshal.hgz@gmail.com',
  phone: '',
  photo: null,
  title: 'المدير التنفيذي',
  role: 'Admin'
}
