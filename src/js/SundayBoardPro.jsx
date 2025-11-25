const { useState, useEffect } = React;

// ==================== 🎨 SUNDAY LOGO ====================
const SundayLogo = ({ size = 'medium', color = 'default' }) => {
  const sizes = { small: 32, medium: 40, large: 56 };
  const iconSize = sizes[size];
  const textColor = color === 'white' ? '#FFFFFF' : '#5B4D8C';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="cyan-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#5DD4D4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3DBABA', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="pink-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF6B9D', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F85A76', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="green-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#5FD4A0', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3FB87E', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="orange-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFB84D', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FF9E2C', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="35" cy="65" r="28" fill="url(#green-g)" filter="url(#logo-glow)" />
        <circle cx="35" cy="35" r="28" fill="url(#cyan-g)" filter="url(#logo-glow)" />
        <circle cx="65" cy="35" r="28" fill="url(#pink-g)" filter="url(#logo-glow)" />
        <circle cx="65" cy="65" r="28" fill="url(#orange-g)" filter="url(#logo-glow)" />
        <g transform="translate(50, 50)">
          <path d="M 0,-12 L 3,-3 L 12,0 L 3,3 L 0,12 L -3,3 L -12,0 L -3,-3 Z" fill="white" filter="url(#logo-glow)" />
        </g>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'Poppins, -apple-system, sans-serif',
          fontSize: `${iconSize * 0.7}px`,
          fontWeight: '700',
          color: textColor,
          lineHeight: '1',
          letterSpacing: '-0.02em'
        }}>
          Sunday
        </span>
        <span style={{
          fontFamily: 'Poppins, -apple-system, sans-serif',
          fontSize: `${iconSize * 0.3}px`,
          fontWeight: '400',
          color: textColor,
          opacity: 0.7,
          lineHeight: '1'
        }}>
          .com
        </span>
      </div>
    </div>
  );
};

// ==================== 📊 COLUMN DEFINITIONS ====================
const COLUMN_TYPES = {
  TEXT: 'text',
  STATUS: 'status',
  PERSON: 'person',
  DATE: 'date',
  TIMELINE: 'timeline',
  NUMBERS: 'numbers',
  RATING: 'rating',
  PROGRESS: 'progress',
  TAGS: 'tags',
  PRIORITY: 'priority',
  FILES: 'files',
  LINK: 'link',
  CHECKBOX: 'checkbox',
  LOCATION: 'location',
  PHONE: 'phone',
  EMAIL: 'email',
  DROPDOWN: 'dropdown',
  FORMULA: 'formula'
};

const DEFAULT_COLUMNS = [
  { id: 'name', title: 'المهمة', type: COLUMN_TYPES.TEXT, width: 280, locked: true, visible: true },
  { id: 'person', title: 'الشخص', type: COLUMN_TYPES.PERSON, width: 140, visible: true },
  { id: 'status', title: 'الحالة', type: COLUMN_TYPES.STATUS, width: 140, visible: true },
  { id: 'priority', title: 'الأولوية', type: COLUMN_TYPES.PRIORITY, width: 120, visible: true },
  { id: 'dueDate', title: 'تاريخ الاستحقاق', type: COLUMN_TYPES.DATE, width: 140, visible: true },
  { id: 'timeline', title: 'الجدول الزمني', type: COLUMN_TYPES.TIMELINE, width: 180, visible: true },
  { id: 'progress', title: 'التقدم', type: COLUMN_TYPES.PROGRESS, width: 140, visible: true },
  { id: 'budget', title: 'الميزانية', type: COLUMN_TYPES.NUMBERS, width: 120, visible: true },
  { id: 'rating', title: 'التقييم', type: COLUMN_TYPES.RATING, width: 120, visible: false },
  { id: 'tags', title: 'الوسوم', type: COLUMN_TYPES.TAGS, width: 160, visible: true },
  { id: 'files', title: 'الملفات', type: COLUMN_TYPES.FILES, width: 100, visible: true },
  { id: 'link', title: 'الرابط', type: COLUMN_TYPES.LINK, width: 120, visible: false },
  { id: 'location', title: 'الموقع', type: COLUMN_TYPES.LOCATION, width: 140, visible: false },
  { id: 'email', title: 'البريد', type: COLUMN_TYPES.EMAIL, width: 180, visible: false }
];

// ==================== 🚀 SUNDAY PRO BOARD ====================
const SundayBoardPro = () => {
  const [selectedView, setSelectedView] = useState('board');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowActivityFeed(false);
        setShowColumnSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const [groups, setGroups] = useState([
    {
      id: 1,
      title: 'إدارة مشاريع الاستضافة',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea',
      items: [
        {
          id: 1,
          name: 'تحديث البنية الاستضافية',
          status: { label: 'قيد التنفيذ', color: '#00c875' },
          priority: { label: 'عالية', color: '#e44258', level: 1 },
          assignee: { name: 'Ahmed', avatar: '👨‍💻', color: '#667eea' },
          dueDate: '2024-11-30',
          timeline: { start: '2024-11-15', end: '2024-11-30' },
          progress: 75,
          budget: 15000,
          rating: 4,
          tags: ['urgent', 'backend'],
          comments: 5,
          files: 3,
          link: 'https://github.com/project',
          location: 'الرياض',
          email: 'ahmed@sunday.com',
          checklist: { done: 6, total: 8 }
        },
        {
          id: 2,
          name: 'تخطيط تحسين التشغيل والأداء',
          status: { label: 'مراجعة', color: '#fdab3d' },
          priority: { label: 'متوسطة', color: '#fdab3d', level: 2 },
          assignee: { name: 'Sara', avatar: '👩‍💼', color: '#F85A76' },
          dueDate: '2024-11-25',
          timeline: { start: '2024-11-10', end: '2024-11-25' },
          progress: 45,
          budget: 8500,
          rating: 3,
          tags: ['optimization'],
          comments: 2,
          files: 1,
          link: '',
          location: 'جدة',
          email: 'sara@sunday.com',
          checklist: { done: 3, total: 6 }
        },
        {
          id: 3,
          name: 'إعادة تصميم واجهة المستخدم',
          status: { label: 'متأخر', color: '#e44258' },
          priority: { label: 'عالية', color: '#e44258', level: 1 },
          assignee: { name: 'Mohammed', avatar: '👨‍🎨', color: '#5FD4A0' },
          dueDate: '2024-11-20',
          timeline: { start: '2024-11-01', end: '2024-11-20' },
          progress: 20,
          budget: 12000,
          rating: 5,
          tags: ['design', 'ui'],
          comments: 8,
          files: 5,
          link: 'https://figma.com/design',
          location: 'دبي',
          email: 'mohammed@sunday.com',
          checklist: { done: 2, total: 10 }
        }
      ]
    },
    {
      id: 2,
      title: 'خطة نوفمبر',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb',
      items: [
        {
          id: 4,
          name: 'إطلاق الميزة الجديدة',
          status: { label: 'تم الإنجاز', color: '#00c875' },
          priority: { label: 'منخفضة', color: '#00c875', level: 3 },
          assignee: { name: 'Layla', avatar: '👩‍💻', color: '#FFB84D' },
          dueDate: '2024-11-15',
          timeline: { start: '2024-11-01', end: '2024-11-15' },
          progress: 100,
          budget: 20000,
          rating: 5,
          tags: ['launch'],
          comments: 12,
          files: 8,
          link: 'https://app.sunday.com',
          location: 'أبوظبي',
          email: 'layla@sunday.com',
          checklist: { done: 10, total: 10 }
        },
        {
          id: 5,
          name: 'تحديث المحتوى التسويقي',
          status: { label: 'جديد', color: '#c4c4c4' },
          priority: { label: 'متوسطة', color: '#fdab3d', level: 2 },
          assignee: { name: 'Khalid', avatar: '👨‍💼', color: '#5DD4D4' },
          dueDate: '2024-12-05',
          timeline: { start: '2024-11-20', end: '2024-12-05' },
          progress: 0,
          budget: 5000,
          rating: 0,
          tags: ['marketing'],
          comments: 0,
          files: 0,
          link: '',
          location: 'الدمام',
          email: 'khalid@sunday.com',
          checklist: { done: 0, total: 5 }
        }
      ]
    }
  ]);

  const totalTasks = groups.reduce((sum, g) => sum + g.items.length, 0);
  const completedTasks = groups.reduce((sum, g) =>
    sum + g.items.filter(i => i.progress === 100).length, 0
  );
  const inProgressTasks = groups.reduce((sum, g) =>
    sum + g.items.filter(i => i.progress > 0 && i.progress < 100).length, 0
  );

  const toggleColumn = (columnId) => {
    setColumns(cols => cols.map(col =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  const visibleColumns = columns.filter(col => col.visible);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* 🎯 Top Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '16px 32px',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <SundayLogo size="medium" color="white" />
            <div style={{ display: 'flex', gap: '8px' }}>
              <TopNavButton active>🏠 Home</TopNavButton>
              <TopNavButton>📊 Analytics</TopNavButton>
              <TopNavButton>⚡ Automations</TopNavButton>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <SearchBar onClick={() => setShowCommandPalette(true)} />
            <IconButton onClick={() => setShowActivityFeed(true)}>
              <span style={{ position: 'relative' }}>
                🔔
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '8px',
                  height: '8px',
                  background: '#f5576c',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}></span>
              </span>
            </IconButton>
            <IconButton>⚙️</IconButton>
            <Avatar name="You" color="#F85A76" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {/* 📂 Sidebar */}
        {showSidebar && (
          <div style={{
            width: '280px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(0,0,0,0.05)',
            padding: '24px 16px',
            overflowY: 'auto'
          }}>
            <ModernSidebar />
          </div>
        )}

        {/* 📋 Main Content */}
        <div style={{ flex: 1, padding: '32px', overflowX: 'auto', overflowY: 'auto' }}>
          {/* Board Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                  marginBottom: '12px'
                }}>
                  Golden Host - Management
                </h1>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <StatsChip icon="📋" label={`${totalTasks} مهام`} color="#667eea" />
                  <StatsChip icon="✅" label={`${completedTasks} منجز`} color="#00c875" />
                  <StatsChip icon="🚀" label={`${inProgressTasks} قيد التنفيذ`} color="#fdab3d" />
                  <StatsChip icon="👥" label="8 أعضاء" color="#F85A76" />
                  <StatsChip icon="💰" label="60,500 ر.س" color="#FFB84D" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <GradientButton gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                  ✨ مهمة جديدة
                </GradientButton>
                <GradientButton gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                  ⚡ أتمتة
                </GradientButton>
                <OutlineButton onClick={() => setShowColumnSettings(true)}>
                  ⚙️ الأعمدة
                </OutlineButton>
                <OutlineButton>👥 دعوة</OutlineButton>
              </div>
            </div>

            {/* View Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e0e0e0', paddingBottom: '0' }}>
              <ViewTab active={selectedView === 'board'} onClick={() => setSelectedView('board')}>
                📊 عرض اللوحة
              </ViewTab>
              <ViewTab active={selectedView === 'kanban'} onClick={() => setSelectedView('kanban')}>
                📌 كانبان
              </ViewTab>
              <ViewTab active={selectedView === 'calendar'} onClick={() => setSelectedView('calendar')}>
                📅 التقويم
              </ViewTab>
              <ViewTab active={selectedView === 'timeline'} onClick={() => setSelectedView('timeline')}>
                📈 الجدول الزمني
              </ViewTab>
              <ViewTab active={selectedView === 'chart'} onClick={() => setSelectedView('chart')}>
                📉 الرسوم البيانية
              </ViewTab>
            </div>
          </div>

          {/* Filters & Actions */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '16px 24px',
            marginBottom: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <FilterChip icon="👤" label="الشخص" />
            <FilterChip icon="🏷️" label="الحالة" />
            <FilterChip icon="📅" label="التاريخ" />
            <FilterChip icon="⚡" label="الأولوية" />
            <FilterChip icon="🏷" label="الوسوم" />
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <SmallButton>⇅ ترتيب</SmallButton>
              <SmallButton>🔍 بحث</SmallButton>
              <SmallButton>📊 تجميع</SmallButton>
              <SmallButton>⋯ المزيد</SmallButton>
            </div>
          </div>

          {/* Groups with Table View */}
          {groups.map(group => (
            <TableGroupCard key={group.id} group={group} columns={visibleColumns} />
          ))}

          {/* Add Group */}
          <button style={{
            width: '100%',
            padding: '20px',
            background: 'white',
            border: '2px dashed #c4c4c4',
            borderRadius: '16px',
            cursor: 'pointer',
            color: '#666',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            marginTop: '24px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#667eea';
            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#c4c4c4';
            e.currentTarget.style.background = 'white';
          }}>
            ✨ إضافة مجموعة جديدة
          </button>
        </div>
      </div>

      {/* Command Palette */}
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}

      {/* Activity Feed */}
      {showActivityFeed && (
        <ActivityFeed onClose={() => setShowActivityFeed(false)} />
      )}

      {/* Column Settings */}
      {showColumnSettings && (
        <ColumnSettings
          columns={columns}
          onToggle={toggleColumn}
          onClose={() => setShowColumnSettings(false)}
        />
      )}
    </div>
  );
};

// ==================== 📊 TABLE GROUP CARD ====================
const TableGroupCard = ({ group, columns }) => {
  const [collapsed, setCollapsed] = useState(false);

  const stats = {
    done: group.items.filter(i => i.progress === 100).length,
    total: group.items.length
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease'
    }}>
      {/* Group Header */}
      <div style={{
        background: group.gradient,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={() => setCollapsed(!collapsed)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            {collapsed ? '▶' : '▼'}
          </button>
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              margin: 0,
              marginBottom: '4px'
            }}>
              {group.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: 0 }}>
              {stats.done} من {stats.total} مكتمل • {group.items.reduce((sum, i) => sum + (i.budget || 0), 0).toLocaleString()} ر.س
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ProgressRing progress={(stats.done / stats.total) * 100} />
          <IconButton color="white">⋯</IconButton>
        </div>
      </div>

      {/* Table */}
      {!collapsed && (
        <div style={{ overflowX: 'auto' }}>
          {/* Table Header */}
          <div style={{
            display: 'flex',
            background: '#f8f9fa',
            borderBottom: '2px solid #e0e0e0',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <div style={{
              width: '50px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid #e0e0e0',
              flexShrink: 0
            }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} />
            </div>
            {columns.map(col => (
              <div key={col.id} style={{
                width: `${col.width}px`,
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                borderRight: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0
              }}>
                {getColumnIcon(col.type)}
                <span>{col.title}</span>
              </div>
            ))}
            <div style={{ width: '80px', flexShrink: 0 }}></div>
          </div>

          {/* Table Rows */}
          {group.items.map(item => (
            <TableRow key={item.id} item={item} columns={columns} />
          ))}

          {/* Add Row */}
          <button style={{
            width: '100%',
            padding: '12px 16px',
            background: 'transparent',
            border: 'none',
            color: '#667eea',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            textAlign: 'right',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            + إضافة مهمة
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== 📝 TABLE ROW ====================
const TableRow = ({ item, columns }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #f0f0f0',
          background: hovered ? '#f8f9fa' : 'white',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Checkbox */}
        <div style={{
          width: '50px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid #f0f0f0',
          flexShrink: 0
        }}>
          <input type="checkbox" style={{ cursor: 'pointer' }} />
        </div>

        {/* Columns */}
        {columns.map(col => (
          <div key={col.id} style={{
            width: `${col.width}px`,
            padding: '16px',
            borderRight: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0
          }}>
            {renderCell(col, item)}
          </div>
        ))}

        {/* Actions */}
        <div style={{
          width: '80px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexShrink: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}>
          <MiniButton onClick={() => setExpanded(!expanded)}>
            {expanded ? '▼' : '▶'}
          </MiniButton>
          <MiniButton>⋯</MiniButton>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          padding: '24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <ExpandedTaskDetails item={item} />
        </div>
      )}
    </>
  );
};

// ==================== 🎨 CELL RENDERERS ====================
const renderCell = (column, item) => {
  const value = item[column.id];

  switch (column.type) {
    case COLUMN_TYPES.TEXT:
      return (
        <div style={{ width: '100%' }}>
          <div style={{ fontWeight: '600', fontSize: '14px', color: '#2d3748', marginBottom: '4px' }}>
            {value}
          </div>
          {item.checklist && (
            <div style={{ fontSize: '12px', color: '#999' }}>
              ✓ {item.checklist.done}/{item.checklist.total}
            </div>
          )}
        </div>
      );

    case COLUMN_TYPES.PERSON:
      return value ? <Avatar name={value.name} emoji={value.avatar} color={value.color} size={32} /> : <EmptyCell />;

    case COLUMN_TYPES.STATUS:
      return value ? <StatusBadge status={value} /> : <EmptyCell />;

    case COLUMN_TYPES.PRIORITY:
      return value ? <PriorityBadge priority={value} /> : <EmptyCell />;

    case COLUMN_TYPES.DATE:
      return value ? <DateCell date={value} /> : <EmptyCell />;

    case COLUMN_TYPES.TIMELINE:
      return value ? <TimelineCell timeline={value} /> : <EmptyCell />;

    case COLUMN_TYPES.PROGRESS:
      return <ProgressCell progress={value || 0} />;

    case COLUMN_TYPES.NUMBERS:
      return value ? <NumberCell value={value} /> : <EmptyCell />;

    case COLUMN_TYPES.RATING:
      return <RatingCell rating={value || 0} />;

    case COLUMN_TYPES.TAGS:
      return value && value.length > 0 ? <TagsCell tags={value} /> : <EmptyCell />;

    case COLUMN_TYPES.FILES:
      return value > 0 ? <FilesCell count={value} /> : <EmptyCell />;

    case COLUMN_TYPES.LINK:
      return value ? <LinkCell url={value} /> : <EmptyCell />;

    case COLUMN_TYPES.LOCATION:
      return value ? <LocationCell location={value} /> : <EmptyCell />;

    case COLUMN_TYPES.EMAIL:
      return value ? <EmailCell email={value} /> : <EmptyCell />;

    default:
      return <EmptyCell />;
  }
};

// ==================== 🎨 CELL COMPONENTS ====================
const EmptyCell = () => (
  <div style={{ color: '#ccc', fontSize: '14px' }}>-</div>
);

const PriorityBadge = ({ priority }) => (
  <div style={{
    background: `${priority.color}15`,
    color: priority.color,
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  }}>
    {'🔥'.repeat(priority.level)}
    {priority.label}
  </div>
);

const DateCell = ({ date }) => {
  const isOverdue = new Date(date) < new Date();
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: isOverdue ? '#e44258' : '#666',
      fontSize: '13px',
      fontWeight: '500'
    }}>
      📅
      {new Date(date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
    </div>
  );
};

const TimelineCell = ({ timeline }) => {
  const start = new Date(timeline.start);
  const end = new Date(timeline.end);
  const total = end - start;
  const elapsed = new Date() - start;
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
        <span>{start.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}</span>
        <span>{end.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}</span>
      </div>
      <div style={{
        height: '6px',
        background: '#e0e0e0',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: progress > 100 ? '#e44258' : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    </div>
  );
};

const ProgressCell = ({ progress }) => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', fontWeight: '600', color: '#667eea' }}>{progress}%</span>
    </div>
    <div style={{
      height: '6px',
      background: '#e0e0e0',
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        transition: 'width 0.3s ease'
      }}></div>
    </div>
  </div>
);

const NumberCell = ({ value }) => (
  <div style={{
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
    fontFamily: 'monospace'
  }}>
    {value.toLocaleString()} ر.س
  </div>
);

const RatingCell = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px', fontSize: '16px' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <span key={star} style={{ color: star <= rating ? '#FFB84D' : '#e0e0e0' }}>
        ★
      </span>
    ))}
  </div>
);

const TagsCell = ({ tags }) => (
  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
    {tags.slice(0, 2).map(tag => (
      <span key={tag} style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        color: '#667eea',
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '500'
      }}>
        #{tag}
      </span>
    ))}
    {tags.length > 2 && (
      <span style={{ fontSize: '11px', color: '#999' }}>+{tags.length - 2}</span>
    )}
  </div>
);

const FilesCell = ({ count }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#666',
    fontWeight: '500'
  }}>
    📎 {count}
  </div>
);

const LinkCell = ({ url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" style={{
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }}>
    🔗 فتح
  </a>
);

const LocationCell = ({ location }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#666'
  }}>
    📍 {location}
  </div>
);

const EmailCell = ({ email }) => (
  <a href={`mailto:${email}`} style={{
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }}>
    ✉️ {email}
  </a>
);

// ==================== 📋 EXPANDED TASK DETAILS ====================
const ExpandedTaskDetails = ({ item }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
    <div>
      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', marginBottom: '12px' }}>
        📝 التفاصيل
      </h4>
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
        <DetailRow label="المهمة" value={item.name} />
        <DetailRow label="الحالة" value={item.status?.label} />
        <DetailRow label="الأولوية" value={item.priority?.label} />
        <DetailRow label="الشخص المسؤول" value={item.assignee?.name} />
      </div>
    </div>

    <div>
      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', marginBottom: '12px' }}>
        📊 التقدم والميزانية
      </h4>
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
        <DetailRow label="التقدم" value={`${item.progress}%`} />
        <DetailRow label="الميزانية" value={`${item.budget?.toLocaleString()} ر.س`} />
        <DetailRow label="التقييم" value={`${'★'.repeat(item.rating || 0)}${'☆'.repeat(5 - (item.rating || 0))}`} />
        <DetailRow label="قائمة المهام" value={`${item.checklist.done}/${item.checklist.total}`} />
      </div>
    </div>

    <div>
      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', marginBottom: '12px' }}>
        🗓️ التواريخ والمواقع
      </h4>
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
        <DetailRow label="تاريخ الاستحقاق" value={item.dueDate} />
        <DetailRow label="بداية المشروع" value={item.timeline?.start} />
        <DetailRow label="نهاية المشروع" value={item.timeline?.end} />
        <DetailRow label="الموقع" value={item.location} />
      </div>
    </div>

    <div>
      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', marginBottom: '12px' }}>
        💬 التواصل والملفات
      </h4>
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
        <DetailRow label="التعليقات" value={`${item.comments} تعليق`} />
        <DetailRow label="الملفات" value={`${item.files} ملف`} />
        <DetailRow label="البريد الإلكتروني" value={item.email} />
        <DetailRow label="الرابط" value={item.link || 'لا يوجد'} />
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '13px'
  }}>
    <span style={{ color: '#999', fontWeight: '500' }}>{label}:</span>
    <span style={{ color: '#2d3748', fontWeight: '600' }}>{value}</span>
  </div>
);

// ==================== ⚙️ COLUMN SETTINGS ====================
const ColumnSettings = ({ columns, onToggle, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
  onClick={onClose}>
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'white',
        borderRadius: '24px',
        width: '600px',
        maxHeight: '700px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '24px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>⚙️ إعدادات الأعمدة</h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            ×
          </button>
        </div>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
          اختر الأعمدة التي تريد إظهارها في اللوحة
        </p>
      </div>

      <div style={{ padding: '24px', maxHeight: '500px', overflowY: 'auto' }}>
        {columns.map(col => (
          <div key={col.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '8px',
            background: col.visible ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
            border: `1px solid ${col.visible ? '#667eea' : '#e0e0e0'}`,
            transition: 'all 0.2s ease',
            cursor: col.locked ? 'not-allowed' : 'pointer',
            opacity: col.locked ? 0.5 : 1
          }}
          onClick={() => !col.locked && onToggle(col.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {getColumnIcon(col.type)}
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
                  {col.title}
                  {col.locked && ' 🔒'}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {getColumnTypeLabel(col.type)}
                </div>
              </div>
            </div>
            <label style={{ cursor: col.locked ? 'not-allowed' : 'pointer' }}>
              <input
                type="checkbox"
                checked={col.visible}
                disabled={col.locked}
                onChange={() => !col.locked && onToggle(col.id)}
                style={{ width: '20px', height: '20px', cursor: col.locked ? 'not-allowed' : 'pointer' }}
              />
            </label>
          </div>
        ))}
      </div>

      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <button style={{
          background: 'transparent',
          border: '2px solid #667eea',
          borderRadius: '12px',
          padding: '10px 20px',
          color: '#667eea',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          + إضافة عمود جديد
        </button>
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 24px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          تطبيق
        </button>
      </div>
    </div>
  </div>
);

const getColumnIcon = (type) => {
  const icons = {
    [COLUMN_TYPES.TEXT]: '📝',
    [COLUMN_TYPES.STATUS]: '🏷️',
    [COLUMN_TYPES.PERSON]: '👤',
    [COLUMN_TYPES.DATE]: '📅',
    [COLUMN_TYPES.TIMELINE]: '📈',
    [COLUMN_TYPES.NUMBERS]: '🔢',
    [COLUMN_TYPES.RATING]: '⭐',
    [COLUMN_TYPES.PROGRESS]: '📊',
    [COLUMN_TYPES.TAGS]: '🏷',
    [COLUMN_TYPES.PRIORITY]: '🔥',
    [COLUMN_TYPES.FILES]: '📎',
    [COLUMN_TYPES.LINK]: '🔗',
    [COLUMN_TYPES.LOCATION]: '📍',
    [COLUMN_TYPES.EMAIL]: '✉️'
  };
  return <span style={{ fontSize: '18px' }}>{icons[type] || '📌'}</span>;
};

const getColumnTypeLabel = (type) => {
  const labels = {
    [COLUMN_TYPES.TEXT]: 'نص',
    [COLUMN_TYPES.STATUS]: 'حالة',
    [COLUMN_TYPES.PERSON]: 'شخص',
    [COLUMN_TYPES.DATE]: 'تاريخ',
    [COLUMN_TYPES.TIMELINE]: 'جدول زمني',
    [COLUMN_TYPES.NUMBERS]: 'أرقام',
    [COLUMN_TYPES.RATING]: 'تقييم',
    [COLUMN_TYPES.PROGRESS]: 'تقدم',
    [COLUMN_TYPES.TAGS]: 'وسوم',
    [COLUMN_TYPES.PRIORITY]: 'أولوية',
    [COLUMN_TYPES.FILES]: 'ملفات',
    [COLUMN_TYPES.LINK]: 'رابط',
    [COLUMN_TYPES.LOCATION]: 'موقع',
    [COLUMN_TYPES.EMAIL]: 'بريد إلكتروني'
  };
  return labels[type] || 'نوع العمود';
};

// ==================== 🎨 SHARED COMPONENTS ====================

const TopNavButton = ({ children, active }) => (
  <button style={{
    background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
    border: 'none',
    color: 'white',
    padding: '10px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  }}
  onMouseEnter={(e) => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
  onMouseLeave={(e) => !active && (e.currentTarget.style.background = 'transparent')}>
    {children}
  </button>
);

const SearchBar = ({ onClick }) => (
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      placeholder="بحث أو اضغط ⌘K"
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '14px',
        padding: '10px 16px 10px 44px',
        color: 'white',
        fontSize: '14px',
        width: '280px',
        outline: 'none',
        transition: 'all 0.3s ease',
        textAlign: 'right'
      }}
    />
    <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>
      🔍
    </span>
  </div>
);

const IconButton = ({ children, onClick, color = 'white' }) => (
  <button
    onClick={onClick}
    style={{
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '12px',
      width: '44px',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '18px',
      color,
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
  >
    {children}
  </button>
);

const Avatar = ({ name, emoji, color, size = 40 }) => (
  <div style={{
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: color || '#667eea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${size * 0.5}px`,
    border: '2px solid white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    flexShrink: 0
  }}>
    {emoji || name.charAt(0)}
  </div>
);

const StatsChip = ({ icon, label, color }) => (
  <div style={{
    background: `${color}15`,
    border: `1.5px solid ${color}`,
    borderRadius: '12px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: color
  }}>
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const GradientButton = ({ children, gradient }) => (
  <button style={{
    background: gradient,
    border: 'none',
    borderRadius: '14px',
    padding: '12px 24px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
  }}>
    {children}
  </button>
);

const OutlineButton = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background: 'transparent',
    border: '2px solid #667eea',
    borderRadius: '14px',
    padding: '12px 24px',
    color: '#667eea',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#667eea';
    e.currentTarget.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = '#667eea';
  }}>
    {children}
  </button>
);

const ViewTab = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'transparent',
      border: 'none',
      borderBottom: active ? '3px solid #667eea' : '3px solid transparent',
      padding: '12px 20px',
      color: active ? '#667eea' : '#666',
      fontSize: '14px',
      fontWeight: active ? '600' : '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap'
    }}
  >
    {children}
  </button>
);

const FilterChip = ({ icon, label }) => (
  <button style={{
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    borderRadius: '20px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    color: '#667eea',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    e.currentTarget.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
    e.currentTarget.style.color = '#667eea';
  }}>
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

const SmallButton = ({ children }) => (
  <button style={{
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '13px',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = '#667eea';
    e.currentTarget.style.color = '#667eea';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = '#e0e0e0';
    e.currentTarget.style.color = '#666';
  }}>
    {children}
  </button>
);

const StatusBadge = ({ status }) => (
  <div style={{
    background: status.color,
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: `0 2px 8px ${status.color}40`,
    whiteSpace: 'nowrap'
  }}>
    {status.label}
  </div>
);

const MiniButton = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background: 'rgba(102, 126, 234, 0.1)',
    border: 'none',
    borderRadius: '6px',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    flexShrink: 0
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#667eea';
    e.currentTarget.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
    e.currentTarget.style.color = 'inherit';
  }}>
    {children}
  </button>
);

const ProgressRing = ({ progress, size = 48 }) => {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r="18" stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none" />
      <circle
        cx={size/2}
        cy={size/2}
        r="18"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  );
};

const ModernSidebar = () => (
  <div>
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
        مساحات العمل
      </h3>
      <SidebarItem icon="🏠" label="الرئيسية" active />
      <SidebarItem icon="📊" label="عملي" />
      <SidebarItem icon="⭐" label="المفضلة" />
    </div>

    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
        المشاريع
      </h3>
      <SidebarItem icon="💼" label="Golden Host" badge="5" />
      <SidebarItem icon="🎨" label="فريق التصميم" badge="12" />
      <SidebarItem icon="💻" label="التطوير" badge="8" />
    </div>

    <div>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
        إجراءات سريعة
      </h3>
      <SidebarItem icon="➕" label="مهمة جديدة" />
      <SidebarItem icon="⚡" label="أتمتة" />
    </div>
  </div>
);

const SidebarItem = ({ icon, label, active, badge }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: '12px',
    background: active ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
    marginBottom: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }}
  onMouseEnter={(e) => !active && (e.currentTarget.style.background = 'rgba(0,0,0,0.02)')}
  onMouseLeave={(e) => !active && (e.currentTarget.style.background = 'transparent')}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{
        fontSize: '14px',
        fontWeight: active ? '600' : '500',
        color: active ? '#667eea' : '#2d3748'
      }}>
        {label}
      </span>
    </div>
    {badge && (
      <span style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: '600'
      }}>
        {badge}
      </span>
    )}
  </div>
);

// ==================== ⌘ COMMAND PALETTE ====================
const CommandPalette = ({ onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '15vh'
  }}
  onClick={onClose}>
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        width: '600px',
        maxHeight: '500px',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}
    >
      <input
        type="text"
        placeholder="اكتب أمر أو ابحث..."
        autoFocus
        style={{
          width: '100%',
          padding: '20px 24px',
          border: 'none',
          background: 'transparent',
          fontSize: '16px',
          outline: 'none',
          textAlign: 'right',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}
      />
      <div style={{ padding: '12px' }}>
        <CommandItem icon="✨" label="إنشاء مهمة جديدة" shortcut="⌘N" />
        <CommandItem icon="🔍" label="بحث في المهام" shortcut="⌘F" />
        <CommandItem icon="⚙️" label="الإعدادات" shortcut="⌘," />
        <CommandItem icon="🌙" label="تبديل الوضع" shortcut="⌘T" />
        <CommandItem icon="📊" label="عرض التقارير" shortcut="⌘R" />
        <CommandItem icon="⚡" label="إنشاء أتمتة" shortcut="⌘A" />
      </div>
    </div>
  </div>
);

const CommandItem = ({ icon, label, shortcut }) => (
  <div style={{
    padding: '12px 16px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'}
  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </div>
    <span style={{
      fontSize: '12px',
      color: '#999',
      background: 'rgba(0,0,0,0.05)',
      padding: '4px 8px',
      borderRadius: '6px',
      fontFamily: 'monospace'
    }}>
      {shortcut}
    </span>
  </div>
);

// ==================== 📰 ACTIVITY FEED ====================
const ActivityFeed = ({ onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    height: '100%',
    background: 'rgba(255,255,255,0.98)',
    backdropFilter: 'blur(20px)',
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    boxShadow: '-8px 0 32px rgba(0,0,0,0.2)',
    zIndex: 1000,
    overflow: 'auto'
  }}>
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>آخر النشاطات</h2>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            opacity: 0.6
          }}
        >
          ×
        </button>
      </div>

      <ActivityItem
        icon="✅"
        color="#43e97b"
        title="مهمة مكتملة"
        description="أحمد أكمل 'تصميم واجهة المستخدم'"
        time="منذ دقيقتين"
      />
      <ActivityItem
        icon="💬"
        color="#667eea"
        title="تعليق جديد"
        description="سارة علقت على 'مراجعة Backend API'"
        time="منذ 15 دقيقة"
      />
      <ActivityItem
        icon="📎"
        color="#FFB84D"
        title="ملف مرفق"
        description="محمد أضاف 3 ملفات إلى 'اختبار الأمان'"
        time="منذ ساعة"
      />
      <ActivityItem
        icon="🔥"
        color="#e44258"
        title="أولوية عالية"
        description="ليلى غيرت أولوية 'تحديث قاعدة البيانات'"
        time="منذ ساعتين"
      />
      <ActivityItem
        icon="⭐"
        color="#FFB84D"
        title="تقييم جديد"
        description="خالد قيم المشروع بـ 5 نجوم"
        time="منذ 3 ساعات"
      />
    </div>
  </div>
);

const ActivityItem = ({ icon, color, title, description, time }) => (
  <div style={{
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '8px',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)'}
  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      background: `${color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      flexShrink: 0
    }}>
      {icon}
    </div>
    <div style={{ flex: 1, textAlign: 'right' }}>
      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>{description}</div>
      <div style={{ fontSize: '12px', color: '#666' }}>{time}</div>
    </div>
  </div>
);

// SundayBoardPro component is now available globally
