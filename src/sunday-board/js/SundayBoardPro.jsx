// ==================== 🎨 SUNDAY BOARD PRO v2.0 ====================
// Based on professional UI designs with Workspaces, Folders, Subitems, and Discussion Panel

const { useState, useEffect, useRef, createContext, useContext } = React;

// ==================== 🎨 THEME & COLORS ====================
const THEME = {
  primary: '#6C5CE7',
  primaryLight: '#A29BFE',
  primaryDark: '#5B4D8C',
  success: '#00B894',
  warning: '#FDCB6E',
  danger: '#E74C3C',
  info: '#0984E3',
  dark: '#2D3436',
  gray: '#636E72',
  lightGray: '#B2BEC3',
  background: '#F8F9FA',
  white: '#FFFFFF',
  sidebarBg: '#F5F6F8',
  gradients: {
    primary: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
    pink: 'linear-gradient(135deg, #FD79A8 0%, #FDCB6E 100%)',
    green: 'linear-gradient(135deg, #00B894 0%, #55EFC4 100%)',
    blue: 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)',
    orange: 'linear-gradient(135deg, #E17055 0%, #FDCB6E 100%)',
  }
};

// ==================== 📊 STATUS OPTIONS ====================
const STATUS_OPTIONS = [
  { id: 'working', label: 'Working on it', color: '#FDCB6E', icon: '🔄' },
  { id: 'stuck', label: 'Stuck', color: '#E74C3C', icon: '🚫' },
  { id: 'done', label: 'Done', color: '#00B894', icon: '✅' },
  { id: 'pending', label: 'Pending', color: '#B2BEC3', icon: '⏳' },
  { id: 'review', label: 'In Review', color: '#0984E3', icon: '👀' },
];

const PRIORITY_OPTIONS = [
  { id: 'critical', label: 'Critical', color: '#E74C3C', icon: '🔴' },
  { id: 'high', label: 'High', color: '#E17055', icon: '🟠' },
  { id: 'medium', label: 'Medium', color: '#FDCB6E', icon: '🟡' },
  { id: 'low', label: 'Low', color: '#00B894', icon: '🟢' },
];

// ==================== 🎨 SUNDAY LOGO ====================
const SundayLogo = ({ size = 'medium', collapsed = false }) => {
  const sizes = { small: 28, medium: 36, large: 48 };
  const iconSize = sizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="logo-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5DD4D4" />
            <stop offset="100%" stopColor="#3DBABA" />
          </linearGradient>
          <linearGradient id="logo-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#F85A76" />
          </linearGradient>
          <linearGradient id="logo-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5FD4A0" />
            <stop offset="100%" stopColor="#3FB87E" />
          </linearGradient>
          <linearGradient id="logo-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB84D" />
            <stop offset="100%" stopColor="#FF9E2C" />
          </linearGradient>
        </defs>
        <circle cx="35" cy="65" r="26" fill="url(#logo-green)" />
        <circle cx="35" cy="35" r="26" fill="url(#logo-cyan)" />
        <circle cx="65" cy="35" r="26" fill="url(#logo-pink)" />
        <circle cx="65" cy="65" r="26" fill="url(#logo-orange)" />
        <path d="M 50,38 L 53,47 L 62,50 L 53,53 L 50,62 L 47,53 L 38,50 L 47,47 Z" fill="white" />
      </svg>
      {!collapsed && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: `${iconSize * 0.55}px`,
            fontWeight: '700',
            color: THEME.primaryDark
          }}>
            Sunday
          </span>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: `${iconSize * 0.28}px`,
            color: THEME.gray
          }}>
            Work Management
          </span>
        </div>
      )}
    </div>
  );
};

// ==================== 📁 WORKSPACE DATA ====================
const INITIAL_WORKSPACES = [
  {
    id: 'ws1',
    name: 'Main Workspace',
    icon: '🏢',
    color: THEME.primary,
    folders: [
      {
        id: 'folder1',
        name: 'Projects',
        icon: '📁',
        expanded: true,
        boards: [
          { id: 'board1', name: 'Golden Host', icon: '🏠', color: '#6C5CE7' },
          { id: 'board2', name: 'Development', icon: '💻', color: '#00B894' },
          { id: 'board3', name: 'Marketing', icon: '📈', color: '#E17055' },
        ]
      },
      {
        id: 'folder2',
        name: 'Operations',
        icon: '⚙️',
        expanded: false,
        boards: [
          { id: 'board4', name: 'Support', icon: '🎧', color: '#0984E3' },
          { id: 'board5', name: 'HR', icon: '👥', color: '#FD79A8' },
        ]
      }
    ]
  },
  {
    id: 'ws2',
    name: 'Personal',
    icon: '👤',
    color: '#00B894',
    folders: [
      {
        id: 'folder3',
        name: 'My Tasks',
        icon: '✨',
        expanded: true,
        boards: [
          { id: 'board6', name: 'Daily Tasks', icon: '📝', color: '#FDCB6E' },
        ]
      }
    ]
  }
];

// ==================== 📋 BOARD DATA ====================
const INITIAL_GROUPS = [
  {
    id: 'group1',
    title: 'Sprint 1 - Development',
    color: '#6C5CE7',
    collapsed: false,
    items: [
      {
        id: 'item1',
        name: 'Setup project infrastructure',
        status: 'done',
        priority: 'high',
        person: { name: 'Ahmed', avatar: '👨‍💻', color: '#6C5CE7' },
        date: '2026-01-20',
        creation: '2026-01-15',
        subitems: [
          { id: 'sub1', name: 'Configure database', status: 'done', person: { name: 'Ahmed', avatar: '👨‍💻' } },
          { id: 'sub2', name: 'Setup CI/CD', status: 'done', person: { name: 'Sara', avatar: '👩‍💼' } },
        ]
      },
      {
        id: 'item2',
        name: 'Design user authentication flow',
        status: 'working',
        priority: 'critical',
        person: { name: 'Sara', avatar: '👩‍💼', color: '#FD79A8' },
        date: '2026-01-22',
        creation: '2026-01-16',
        subitems: [
          { id: 'sub3', name: 'Login page design', status: 'done', person: { name: 'Mohammed', avatar: '👨‍🎨' } },
          { id: 'sub4', name: 'Forgot password flow', status: 'working', person: { name: 'Sara', avatar: '👩‍💼' } },
          { id: 'sub5', name: 'OAuth integration', status: 'pending', person: null },
        ]
      },
      {
        id: 'item3',
        name: 'API documentation',
        status: 'review',
        priority: 'medium',
        person: { name: 'Khalid', avatar: '👨‍💼', color: '#00B894' },
        date: '2026-01-25',
        creation: '2026-01-17',
        subitems: []
      },
    ]
  },
  {
    id: 'group2',
    title: 'Sprint 2 - Features',
    color: '#00B894',
    collapsed: false,
    items: [
      {
        id: 'item4',
        name: 'Dashboard analytics',
        status: 'pending',
        priority: 'high',
        person: { name: 'Layla', avatar: '👩‍💻', color: '#E17055' },
        date: '2026-01-28',
        creation: '2026-01-18',
        subitems: [
          { id: 'sub6', name: 'Chart components', status: 'pending', person: { name: 'Layla', avatar: '👩‍💻' } },
          { id: 'sub7', name: 'Data aggregation', status: 'pending', person: null },
        ]
      },
      {
        id: 'item5',
        name: 'Notification system',
        status: 'stuck',
        priority: 'critical',
        person: { name: 'Mohammed', avatar: '👨‍🎨', color: '#0984E3' },
        date: '2026-01-24',
        creation: '2026-01-14',
        subitems: []
      },
    ]
  },
];

// ==================== 💬 DISCUSSION DATA ====================
const INITIAL_DISCUSSIONS = [
  {
    id: 'd1',
    user: { name: 'Ahmed', avatar: '👨‍💻' },
    message: 'Great progress on the infrastructure setup! The CI/CD pipeline is now fully automated.',
    timestamp: '2026-01-19T10:30:00',
    reactions: ['👍', '🎉'],
  },
  {
    id: 'd2',
    user: { name: 'Sara', avatar: '👩‍💼' },
    message: 'I need help with the OAuth integration. Can someone review my PR?',
    timestamp: '2026-01-19T11:45:00',
    reactions: ['👀'],
  },
  {
    id: 'd3',
    user: { name: 'Mohammed', avatar: '👨‍🎨' },
    message: 'The notification system is stuck due to API rate limits. Looking into alternatives.',
    timestamp: '2026-01-19T14:00:00',
    reactions: [],
  },
];

// ==================== 🚀 MAIN COMPONENT ====================
const SundayBoardPro = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [currentView, setCurrentView] = useState('board'); // board, date, status, priority, mywork
  const [workspaces, setWorkspaces] = useState(INITIAL_WORKSPACES);
  const [selectedBoard, setSelectedBoard] = useState('board1');
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [discussions, setDiscussions] = useState(INITIAL_DISCUSSIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [expandedSubitems, setExpandedSubitems] = useState(new Set(['item1', 'item2', 'item4']));

  const toggleSubitems = (itemId) => {
    setExpandedSubitems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleFolder = (folderId) => {
    setWorkspaces(prev => prev.map(ws => ({
      ...ws,
      folders: ws.folders.map(folder =>
        folder.id === folderId ? { ...folder, expanded: !folder.expanded } : folder
      )
    })));
  };

  const addDiscussion = (message) => {
    const newDiscussion = {
      id: `d${Date.now()}`,
      user: { name: 'You', avatar: '👤' },
      message,
      timestamp: new Date().toISOString(),
      reactions: [],
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
      background: THEME.background,
      direction: 'rtl'
    }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        workspaces={workspaces}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        onToggleFolder={toggleFolder}
        currentView={currentView}
        onChangeView={setCurrentView}
      />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Header
          boardName="Golden Host"
          onToggleDiscussion={() => setShowDiscussion(!showDiscussion)}
          showDiscussion={showDiscussion}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          currentView={currentView}
          onChangeView={setCurrentView}
        />

        {/* Board Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <MainContent
            groups={groups}
            setGroups={setGroups}
            currentView={currentView}
            expandedSubitems={expandedSubitems}
            toggleSubitems={toggleSubitems}
            searchQuery={searchQuery}
          />

          {/* Discussion Panel */}
          {showDiscussion && (
            <DiscussionPanel
              discussions={discussions}
              onAddDiscussion={addDiscussion}
              onClose={() => setShowDiscussion(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== 📂 SIDEBAR ====================
const Sidebar = ({ collapsed, onToggle, workspaces, selectedBoard, onSelectBoard, onToggleFolder, currentView, onChangeView }) => {
  return (
    <div style={{
      width: collapsed ? '60px' : '280px',
      background: THEME.white,
      borderLeft: `1px solid ${THEME.lightGray}30`,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      overflow: 'hidden'
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '16px 12px' : '20px',
        borderBottom: `1px solid ${THEME.lightGray}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between'
      }}>
        <SundayLogo size="medium" collapsed={collapsed} />
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            color: THEME.gray,
            display: collapsed ? 'none' : 'block'
          }}
        >
          ◀
        </button>
      </div>

      {/* Quick Actions */}
      {!collapsed && (
        <div style={{ padding: '16px' }}>
          <QuickAction icon="🏠" label="Home" active={currentView === 'home'} onClick={() => onChangeView('home')} />
          <QuickAction icon="📋" label="My Work" active={currentView === 'mywork'} onClick={() => onChangeView('mywork')} badge="5" />
          <QuickAction icon="🔔" label="Notifications" onClick={() => {}} badge="3" />
          <QuickAction icon="⭐" label="Favorites" onClick={() => {}} />
        </div>
      )}

      {/* Workspaces */}
      <div style={{ flex: 1, overflow: 'auto', padding: collapsed ? '8px' : '0 16px 16px' }}>
        {!collapsed && (
          <div style={{
            fontSize: '11px',
            fontWeight: '600',
            color: THEME.gray,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 0',
            marginTop: '8px'
          }}>
            Workspaces
          </div>
        )}

        {workspaces.map(workspace => (
          <WorkspaceItem
            key={workspace.id}
            workspace={workspace}
            collapsed={collapsed}
            selectedBoard={selectedBoard}
            onSelectBoard={onSelectBoard}
            onToggleFolder={onToggleFolder}
          />
        ))}

        {!collapsed && (
          <button style={{
            width: '100%',
            padding: '10px 12px',
            background: 'transparent',
            border: `1px dashed ${THEME.lightGray}`,
            borderRadius: '8px',
            color: THEME.gray,
            fontSize: '13px',
            cursor: 'pointer',
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <span>➕</span>
            <span>Add Workspace</span>
          </button>
        )}
      </div>

      {/* User */}
      <div style={{
        padding: collapsed ? '12px' : '16px',
        borderTop: `1px solid ${THEME.lightGray}30`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: THEME.gradients.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: 'white',
          fontWeight: '600'
        }}>
          👤
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: THEME.dark }}>Meshal</div>
            <div style={{ fontSize: '12px', color: THEME.gray }}>Admin</div>
          </div>
        )}
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '10px 12px',
      background: active ? `${THEME.primary}15` : 'transparent',
      border: 'none',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      marginBottom: '4px',
      transition: 'all 0.2s ease'
    }}
  >
    <span style={{ fontSize: '18px' }}>{icon}</span>
    <span style={{
      flex: 1,
      textAlign: 'right',
      fontSize: '14px',
      fontWeight: active ? '600' : '500',
      color: active ? THEME.primary : THEME.dark
    }}>
      {label}
    </span>
    {badge && (
      <span style={{
        background: THEME.danger,
        color: 'white',
        fontSize: '11px',
        fontWeight: '600',
        padding: '2px 6px',
        borderRadius: '10px',
        minWidth: '18px',
        textAlign: 'center'
      }}>
        {badge}
      </span>
    )}
  </button>
);

const WorkspaceItem = ({ workspace, collapsed, selectedBoard, onSelectBoard, onToggleFolder }) => {
  const [expanded, setExpanded] = useState(true);

  if (collapsed) {
    return (
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        background: `${workspace.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        margin: '8px auto',
        cursor: 'pointer'
      }}>
        {workspace.icon}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '8px' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '8px 12px',
          background: 'transparent',
          border: 'none',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}
      >
        <span style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: `${workspace.color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px'
        }}>
          {workspace.icon}
        </span>
        <span style={{
          flex: 1,
          textAlign: 'right',
          fontSize: '14px',
          fontWeight: '600',
          color: THEME.dark
        }}>
          {workspace.name}
        </span>
        <span style={{
          color: THEME.gray,
          fontSize: '12px',
          transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </button>

      {expanded && workspace.folders.map(folder => (
        <FolderItem
          key={folder.id}
          folder={folder}
          selectedBoard={selectedBoard}
          onSelectBoard={onSelectBoard}
          onToggle={() => onToggleFolder(folder.id)}
        />
      ))}
    </div>
  );
};

const FolderItem = ({ folder, selectedBoard, onSelectBoard, onToggle }) => (
  <div style={{ marginRight: '16px' }}>
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '6px 12px',
        background: 'transparent',
        border: 'none',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        marginBottom: '2px'
      }}
    >
      <span style={{
        color: THEME.gray,
        fontSize: '10px',
        transform: folder.expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s ease'
      }}>
        ▼
      </span>
      <span style={{ fontSize: '14px' }}>{folder.icon}</span>
      <span style={{
        flex: 1,
        textAlign: 'right',
        fontSize: '13px',
        fontWeight: '500',
        color: THEME.gray
      }}>
        {folder.name}
      </span>
    </button>

    {folder.expanded && folder.boards.map(board => (
      <BoardItem
        key={board.id}
        board={board}
        selected={selectedBoard === board.id}
        onSelect={() => onSelectBoard(board.id)}
      />
    ))}
  </div>
);

const BoardItem = ({ board, selected, onSelect }) => (
  <button
    onClick={onSelect}
    style={{
      width: 'calc(100% - 24px)',
      marginRight: '24px',
      padding: '8px 12px',
      background: selected ? `${board.color}15` : 'transparent',
      border: selected ? `1px solid ${board.color}40` : '1px solid transparent',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      marginBottom: '2px',
      transition: 'all 0.2s ease'
    }}
  >
    <span style={{
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: board.color
    }}></span>
    <span style={{ fontSize: '14px' }}>{board.icon}</span>
    <span style={{
      flex: 1,
      textAlign: 'right',
      fontSize: '13px',
      fontWeight: selected ? '600' : '500',
      color: selected ? board.color : THEME.dark
    }}>
      {board.name}
    </span>
  </button>
);

// ==================== 🔝 HEADER ====================
const Header = ({ boardName, onToggleDiscussion, showDiscussion, searchQuery, onSearch, currentView, onChangeView }) => {
  return (
    <div style={{
      background: THEME.white,
      borderBottom: `1px solid ${THEME.lightGray}30`,
      padding: '0'
    }}>
      {/* Top Row */}
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: THEME.dark,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: THEME.gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🏠
            </span>
            {boardName}
          </h1>
          <span style={{
            background: `${THEME.success}20`,
            color: THEME.success,
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            ● Active
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              style={{
                padding: '8px 16px 8px 40px',
                border: `1px solid ${THEME.lightGray}50`,
                borderRadius: '8px',
                fontSize: '14px',
                width: '200px',
                outline: 'none',
                direction: 'rtl'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: THEME.gray
            }}>
              🔍
            </span>
          </div>

          {/* Discussion Toggle */}
          <button
            onClick={onToggleDiscussion}
            style={{
              padding: '8px 16px',
              background: showDiscussion ? THEME.primary : 'transparent',
              border: `1px solid ${showDiscussion ? THEME.primary : THEME.lightGray}50`,
              borderRadius: '8px',
              color: showDiscussion ? 'white' : THEME.dark,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            💬 Discussion
          </button>

          {/* Add Task */}
          <button style={{
            padding: '8px 20px',
            background: THEME.gradients.primary,
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: `0 4px 12px ${THEME.primary}40`
          }}>
            ✨ New Task
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '0 24px',
        borderTop: `1px solid ${THEME.lightGray}20`
      }}>
        <ViewTab icon="📊" label="Board" active={currentView === 'board'} onClick={() => onChangeView('board')} />
        <ViewTab icon="📅" label="Date" active={currentView === 'date'} onClick={() => onChangeView('date')} />
        <ViewTab icon="🏷️" label="Status" active={currentView === 'status'} onClick={() => onChangeView('status')} />
        <ViewTab icon="🔥" label="Priority" active={currentView === 'priority'} onClick={() => onChangeView('priority')} />
        <ViewTab icon="📈" label="Chart" active={currentView === 'chart'} onClick={() => onChangeView('chart')} />
        <ViewTab icon="📆" label="Calendar" active={currentView === 'calendar'} onClick={() => onChangeView('calendar')} />
      </div>
    </div>
  );
};

const ViewTab = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 16px',
      background: 'transparent',
      border: 'none',
      borderBottom: active ? `2px solid ${THEME.primary}` : '2px solid transparent',
      color: active ? THEME.primary : THEME.gray,
      fontSize: '13px',
      fontWeight: active ? '600' : '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease'
    }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

// ==================== 📋 MAIN CONTENT ====================
const MainContent = ({ groups, setGroups, currentView, expandedSubitems, toggleSubitems, searchQuery }) => {
  // My Work View - shows all tasks assigned to current user
  if (currentView === 'mywork') {
    return <MyWorkView groups={groups} />;
  }

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '24px',
      background: THEME.background
    }}>
      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <FilterButton icon="👤" label="Person" />
        <FilterButton icon="🏷️" label="Status" />
        <FilterButton icon="🔥" label="Priority" />
        <FilterButton icon="📅" label="Date" />
        <div style={{ marginRight: 'auto' }}></div>
        <button style={{
          padding: '6px 12px',
          background: 'transparent',
          border: `1px solid ${THEME.lightGray}50`,
          borderRadius: '6px',
          color: THEME.gray,
          fontSize: '13px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ⇅ Sort
        </button>
        <button style={{
          padding: '6px 12px',
          background: 'transparent',
          border: `1px solid ${THEME.lightGray}50`,
          borderRadius: '6px',
          color: THEME.gray,
          fontSize: '13px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ⚙️ Columns
        </button>
      </div>

      {/* Groups */}
      {groups.map(group => (
        <GroupCard
          key={group.id}
          group={group}
          expandedSubitems={expandedSubitems}
          toggleSubitems={toggleSubitems}
          searchQuery={searchQuery}
        />
      ))}

      {/* Add Group */}
      <button style={{
        width: '100%',
        padding: '16px',
        background: THEME.white,
        border: `2px dashed ${THEME.lightGray}50`,
        borderRadius: '12px',
        color: THEME.gray,
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '16px'
      }}>
        ➕ Add New Group
      </button>
    </div>
  );
};

// ==================== 📋 MY WORK VIEW ====================
const MyWorkView = ({ groups }) => {
  // Collect all tasks from all groups
  const allTasks = groups.flatMap(group =>
    group.items.map(item => ({ ...item, groupName: group.title, groupColor: group.color }))
  );

  // Group by status
  const tasksByStatus = {
    overdue: allTasks.filter(t => new Date(t.date) < new Date() && t.status !== 'done'),
    today: allTasks.filter(t => {
      const today = new Date().toISOString().split('T')[0];
      return t.date === today && t.status !== 'done';
    }),
    thisWeek: allTasks.filter(t => {
      const taskDate = new Date(t.date);
      const today = new Date();
      const weekEnd = new Date(today.setDate(today.getDate() + 7));
      return taskDate <= weekEnd && taskDate >= new Date() && t.status !== 'done';
    }),
    done: allTasks.filter(t => t.status === 'done'),
  };

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '24px',
      background: THEME.background
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: THEME.dark,
          margin: 0,
          marginBottom: '8px'
        }}>
          📋 My Work
        </h2>
        <p style={{ color: THEME.gray, margin: 0 }}>
          All your assigned tasks in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard
          icon="🔴"
          label="Overdue"
          count={tasksByStatus.overdue.length}
          color={THEME.danger}
        />
        <StatCard
          icon="📅"
          label="Due Today"
          count={tasksByStatus.today.length}
          color={THEME.warning}
        />
        <StatCard
          icon="📆"
          label="This Week"
          count={tasksByStatus.thisWeek.length}
          color={THEME.info}
        />
        <StatCard
          icon="✅"
          label="Completed"
          count={tasksByStatus.done.length}
          color={THEME.success}
        />
      </div>

      {/* Overdue Section */}
      {tasksByStatus.overdue.length > 0 && (
        <MyWorkSection
          title="Overdue"
          icon="🔴"
          color={THEME.danger}
          tasks={tasksByStatus.overdue}
        />
      )}

      {/* Today Section */}
      {tasksByStatus.today.length > 0 && (
        <MyWorkSection
          title="Due Today"
          icon="📅"
          color={THEME.warning}
          tasks={tasksByStatus.today}
        />
      )}

      {/* This Week Section */}
      {tasksByStatus.thisWeek.length > 0 && (
        <MyWorkSection
          title="This Week"
          icon="📆"
          color={THEME.info}
          tasks={tasksByStatus.thisWeek}
        />
      )}

      {/* Done Section */}
      {tasksByStatus.done.length > 0 && (
        <MyWorkSection
          title="Completed"
          icon="✅"
          color={THEME.success}
          tasks={tasksByStatus.done}
          collapsed
        />
      )}
    </div>
  );
};

const StatCard = ({ icon, label, count, color }) => (
  <div style={{
    background: THEME.white,
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    borderRight: `4px solid ${color}`
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <span style={{ fontSize: '24px' }}>{icon}</span>
      <div>
        <div style={{
          fontSize: '28px',
          fontWeight: '700',
          color: THEME.dark
        }}>
          {count}
        </div>
        <div style={{
          fontSize: '13px',
          color: THEME.gray
        }}>
          {label}
        </div>
      </div>
    </div>
  </div>
);

const MyWorkSection = ({ title, icon, color, tasks, collapsed: initialCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  return (
    <div style={{
      background: THEME.white,
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderBottom: collapsed ? 'none' : `1px solid ${THEME.lightGray}20`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: THEME.dark,
            margin: 0
          }}>
            {title}
          </h3>
          <span style={{
            background: `${color}20`,
            color: color,
            padding: '2px 10px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            {tasks.length}
          </span>
        </div>
        <span style={{
          color: THEME.gray,
          transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </div>

      {!collapsed && (
        <div>
          {tasks.map(task => (
            <MyWorkTask key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

const MyWorkTask = ({ task }) => {
  const status = STATUS_OPTIONS.find(s => s.id === task.status) || STATUS_OPTIONS[3];

  return (
    <div style={{
      padding: '14px 20px',
      borderBottom: `1px solid ${THEME.lightGray}15`,
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <input type="checkbox" checked={task.status === 'done'} readOnly />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: THEME.dark,
          marginBottom: '4px'
        }}>
          {task.name}
        </div>
        <div style={{
          fontSize: '12px',
          color: THEME.gray,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: task.groupColor
          }}></span>
          {task.groupName}
        </div>
      </div>
      <div style={{
        background: status.color,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600'
      }}>
        {status.label}
      </div>
      <div style={{
        fontSize: '13px',
        color: new Date(task.date) < new Date() && task.status !== 'done' ? THEME.danger : THEME.gray,
        fontWeight: new Date(task.date) < new Date() && task.status !== 'done' ? '600' : '400'
      }}>
        {new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
};

const FilterButton = ({ icon, label }) => (
  <button style={{
    padding: '6px 12px',
    background: THEME.white,
    border: `1px solid ${THEME.lightGray}50`,
    borderRadius: '6px',
    color: THEME.dark,
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  }}>
    <span>{icon}</span>
    <span>{label}</span>
    <span style={{ color: THEME.lightGray }}>▼</span>
  </button>
);

// ==================== 📦 GROUP CARD ====================
const GroupCard = ({ group, expandedSubitems, toggleSubitems, searchQuery }) => {
  const [collapsed, setCollapsed] = useState(group.collapsed);

  const filteredItems = searchQuery
    ? group.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : group.items;

  const stats = {
    total: filteredItems.length,
    done: filteredItems.filter(i => i.status === 'done').length
  };

  return (
    <div style={{
      background: THEME.white,
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      {/* Group Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          background: group.color,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            color: 'white',
            fontSize: '14px',
            transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}>
            ▼
          </span>
          <h3 style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            margin: 0
          }}>
            {group.title}
          </h3>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {stats.done}/{stats.total}
          </span>
        </div>

        <button style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 10px',
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer'
        }}>
          ⋯
        </button>
      </div>

      {/* Table */}
      {!collapsed && (
        <div>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 120px 120px 130px 120px',
            background: '#F8F9FA',
            borderBottom: `1px solid ${THEME.lightGray}30`,
            fontSize: '12px',
            fontWeight: '600',
            color: THEME.gray
          }}>
            <div style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input type="checkbox" />
            </div>
            <div style={{ padding: '12px' }}>Task</div>
            <div style={{ padding: '12px', textAlign: 'center' }}>Creation</div>
            <div style={{ padding: '12px', textAlign: 'center' }}>Person</div>
            <div style={{ padding: '12px', textAlign: 'center' }}>Status</div>
            <div style={{ padding: '12px', textAlign: 'center' }}>Date</div>
          </div>

          {/* Table Rows */}
          {filteredItems.map(item => (
            <TaskRow
              key={item.id}
              item={item}
              expanded={expandedSubitems.has(item.id)}
              onToggle={() => toggleSubitems(item.id)}
              groupColor={group.color}
            />
          ))}

          {/* Add Task */}
          <button style={{
            width: '100%',
            padding: '12px 20px',
            background: 'transparent',
            border: 'none',
            color: group.color,
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>➕</span>
            <span>Add Task</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== 📝 TASK ROW ====================
const TaskRow = ({ item, expanded, onToggle, groupColor }) => {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_OPTIONS.find(s => s.id === item.status) || STATUS_OPTIONS[3];
  const hasSubitems = item.subitems && item.subitems.length > 0;

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50px 1fr 120px 120px 130px 120px',
          borderBottom: `1px solid ${THEME.lightGray}20`,
          background: hovered ? '#F8F9FA' : 'white',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Checkbox */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input type="checkbox" />
        </div>

        {/* Task Name */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasSubitems && (
            <button
              onClick={onToggle}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                background: expanded ? `${groupColor}20` : 'transparent',
                border: `1px solid ${THEME.lightGray}50`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: THEME.gray
              }}
            >
              {expanded ? '▼' : '▶'}
            </button>
          )}
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: THEME.dark
          }}>
            {item.name}
          </span>
          {hasSubitems && (
            <span style={{
              background: `${groupColor}20`,
              color: groupColor,
              padding: '2px 6px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '500'
            }}>
              {item.subitems.length}
            </span>
          )}
        </div>

        {/* Creation Date */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', color: THEME.gray }}>
            {new Date(item.creation).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Person */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.person ? (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: item.person.color || THEME.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} title={item.person.name}>
              {item.person.avatar}
            </div>
          ) : (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: `2px dashed ${THEME.lightGray}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: THEME.lightGray,
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              +
            </div>
          )}
        </div>

        {/* Status */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: status.color,
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            minWidth: '90px',
            textAlign: 'center'
          }}>
            {status.label}
          </div>
        </div>

        {/* Date */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            fontSize: '13px',
            color: new Date(item.date) < new Date() && item.status !== 'done' ? THEME.danger : THEME.gray,
            fontWeight: new Date(item.date) < new Date() && item.status !== 'done' ? '600' : '400'
          }}>
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Subitems */}
      {expanded && hasSubitems && (
        <div style={{ background: '#FAFAFA' }}>
          {item.subitems.map((subitem, index) => (
            <SubitemRow key={subitem.id} subitem={subitem} isLast={index === item.subitems.length - 1} />
          ))}
          <button style={{
            width: '100%',
            padding: '10px 20px 10px 70px',
            background: 'transparent',
            border: 'none',
            color: THEME.gray,
            fontSize: '13px',
            cursor: 'pointer',
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>➕</span>
            <span>Add Subitem</span>
          </button>
        </div>
      )}
    </>
  );
};

const SubitemRow = ({ subitem, isLast }) => {
  const status = STATUS_OPTIONS.find(s => s.id === subitem.status) || STATUS_OPTIONS[3];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '50px 1fr 120px 120px 130px 120px',
      borderBottom: isLast ? 'none' : `1px solid ${THEME.lightGray}15`,
      fontSize: '13px'
    }}>
      <div style={{ padding: '10px' }}></div>
      <div style={{ padding: '10px 10px 10px 50px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: THEME.lightGray }}>↳</span>
        <span style={{ color: THEME.gray }}>{subitem.name}</span>
      </div>
      <div style={{ padding: '10px' }}></div>
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {subitem.person ? (
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: THEME.lightGray,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            {subitem.person.avatar}
          </div>
        ) : (
          <span style={{ color: THEME.lightGray }}>-</span>
        )}
      </div>
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          background: `${status.color}30`,
          color: status.color,
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600'
        }}>
          {status.label}
        </div>
      </div>
      <div style={{ padding: '10px' }}></div>
    </div>
  );
};

// ==================== 💬 DISCUSSION PANEL ====================
const DiscussionPanel = ({ discussions, onAddDiscussion, onClose }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onAddDiscussion(message);
      setMessage('');
    }
  };

  return (
    <div style={{
      width: '360px',
      background: THEME.white,
      borderRight: `1px solid ${THEME.lightGray}30`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${THEME.lightGray}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: THEME.dark,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          💬 Board Discussion
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: THEME.gray,
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px'
      }}>
        {discussions.map(discussion => (
          <DiscussionMessage key={discussion.id} discussion={discussion} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px',
        borderTop: `1px solid ${THEME.lightGray}30`
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end'
        }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            style={{
              flex: 1,
              padding: '12px',
              border: `1px solid ${THEME.lightGray}50`,
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'none',
              minHeight: '44px',
              maxHeight: '120px',
              outline: 'none',
              direction: 'rtl'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: THEME.gradients.primary,
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ➤
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '8px'
        }}>
          <button style={{
            padding: '4px 8px',
            background: 'transparent',
            border: `1px solid ${THEME.lightGray}50`,
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>📎</button>
          <button style={{
            padding: '4px 8px',
            background: 'transparent',
            border: `1px solid ${THEME.lightGray}50`,
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>😊</button>
          <button style={{
            padding: '4px 8px',
            background: 'transparent',
            border: `1px solid ${THEME.lightGray}50`,
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>@</button>
        </div>
      </div>
    </div>
  );
};

const DiscussionMessage = ({ discussion }) => {
  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: THEME.gradients.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          flexShrink: 0
        }}>
          {discussion.user.avatar}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: THEME.dark
            }}>
              {discussion.user.name}
            </span>
            <span style={{
              fontSize: '12px',
              color: THEME.gray
            }}>
              {timeAgo(discussion.timestamp)}
            </span>
          </div>

          <p style={{
            fontSize: '14px',
            color: THEME.dark,
            margin: 0,
            lineHeight: '1.5'
          }}>
            {discussion.message}
          </p>

          {discussion.reactions.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '4px',
              marginTop: '8px'
            }}>
              {discussion.reactions.map((reaction, i) => (
                <span key={i} style={{
                  background: '#F0F0F0',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}>
                  {reaction}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export
window.SundayBoardPro = SundayBoardPro;
