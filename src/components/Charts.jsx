import React from 'react'

// ==================== PIE CHART ====================
export function PieChart({ data, size = 200 }) {
  let currentAngle = 0
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const segments = data.map(item => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const segment = {
      color: item.color,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      percentage: Math.round(percentage),
      label: item.label,
      value: item.value
    }
    currentAngle += angle
    return segment
  })

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
        <svg width={size} height={size} viewBox="0 0 200 200">
          {segments.map((seg, i) => {
            const largeArc = (seg.endAngle - seg.startAngle) > 180 ? 1 : 0
            const startX = 100 + 100 * Math.cos((seg.startAngle - 90) * Math.PI / 180)
            const startY = 100 + 100 * Math.sin((seg.startAngle - 90) * Math.PI / 180)
            const endX = 100 + 100 * Math.cos((seg.endAngle - 90) * Math.PI / 180)
            const endY = 100 + 100 * Math.sin((seg.endAngle - 90) * Math.PI / 180)

            return (
              <path
                key={i}
                d={`M 100 100 L ${startX} ${startY} A 100 100 0 ${largeArc} 1 ${endX} ${endY} Z`}
                fill={seg.color}
                style={{
                  transition: 'opacity 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              />
            )
          })}
        </svg>
      </div>
      <div>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              fontSize: '14px'
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: seg.color,
                flexShrink: 0
              }}
            ></div>
            <span style={{ color: 'var(--text-primary)' }}>
              {seg.label} ({seg.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== BAR CHART ====================
export function BarChart({ data, height = 200, showValues = true }) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '20px',
        height: `${height}px`,
        marginTop: '20px'
      }}
    >
      {data.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            minWidth: '50px',
            maxWidth: '80px'
          }}
        >
          {showValues && (
            <div
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '4px',
                color: 'var(--text-primary)'
              }}
            >
              {item.value}
            </div>
          )}
          <div
            style={{
              width: '100%',
              height: `${(item.value / maxValue) * height}px`,
              background: item.color || '#0073EA',
              borderRadius: '6px 6px 0 0',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.filter = 'brightness(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.filter = 'brightness(1)'
            }}
          ></div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              textAlign: 'center'
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ==================== LINE CHART (SIMPLE) ====================
export function LineChart({ data, height = 200, width = 400 }) {
  const maxValue = Math.max(...data.map(d => d.value))
  const points = data.map((item, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - (item.value / maxValue) * height
    return { x, y, ...item }
  })

  const pathData = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ')

  return (
    <div style={{ width: `${width}px`, height: `${height + 40}px`, position: 'relative' }}>
      <svg width={width} height={height + 40} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="0"
            y1={(i / 4) * height}
            x2={width}
            y2={(i / 4) * height}
            stroke="var(--border-light)"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#0073EA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Area under line */}
        <path
          d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
          fill="url(#gradient)"
          opacity="0.2"
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0073EA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0073EA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#0073EA"
            stroke="#fff"
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height + 20}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

// ==================== DONUT CHART ====================
export function DonutChart({ data, size = 200, innerRadius = 60 }) {
  let currentAngle = 0
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = 100

  const segments = data.map(item => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const segment = {
      color: item.color,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      percentage: Math.round(percentage),
      label: item.label,
      value: item.value
    }
    currentAngle += angle
    return segment
  })

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
        <svg width={size} height={size} viewBox="0 0 200 200">
          {segments.map((seg, i) => {
            const largeArc = (seg.endAngle - seg.startAngle) > 180 ? 1 : 0

            const startOuterX = 100 + radius * Math.cos((seg.startAngle - 90) * Math.PI / 180)
            const startOuterY = 100 + radius * Math.sin((seg.startAngle - 90) * Math.PI / 180)
            const endOuterX = 100 + radius * Math.cos((seg.endAngle - 90) * Math.PI / 180)
            const endOuterY = 100 + radius * Math.sin((seg.endAngle - 90) * Math.PI / 180)

            const startInnerX = 100 + innerRadius * Math.cos((seg.startAngle - 90) * Math.PI / 180)
            const startInnerY = 100 + innerRadius * Math.sin((seg.startAngle - 90) * Math.PI / 180)
            const endInnerX = 100 + innerRadius * Math.cos((seg.endAngle - 90) * Math.PI / 180)
            const endInnerY = 100 + innerRadius * Math.sin((seg.endAngle - 90) * Math.PI / 180)

            return (
              <path
                key={i}
                d={`
                  M ${startOuterX} ${startOuterY}
                  A ${radius} ${radius} 0 ${largeArc} 1 ${endOuterX} ${endOuterY}
                  L ${endInnerX} ${endInnerY}
                  A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${startInnerX} ${startInnerY}
                  Z
                `}
                fill={seg.color}
                style={{
                  transition: 'opacity 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              />
            )
          })}
        </svg>

        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
            {total}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Total
          </div>
        </div>
      </div>

      <div>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              fontSize: '14px'
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: seg.color,
                flexShrink: 0
              }}
            ></div>
            <span style={{ color: 'var(--text-primary)' }}>
              {seg.label} ({seg.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
