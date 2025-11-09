import React, { useMemo, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { Activity, Users, Clock, PieChart as PieIcon, BarChart as BarIcon, TrendingUp } from 'lucide-react'
import JSConfetti from 'js-confetti'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Configure Chart.js colors to match theme
ChartJS.defaults.color = '#64748b'
ChartJS.defaults.borderColor = 'rgba(148, 163, 184, 0.1)'

const KPI = ({ title, value, icon: Icon, accent = 'from-blue-500 to-indigo-600' }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="flex-1"
  >
    <div className={`rounded-lg overflow-hidden shadow-lg bg-gradient-to-br ${accent} text-white p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs opacity-90">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
        </div>
        <div className="p-2 bg-white/20 rounded">
          {Icon ? <Icon size={22} /> : <Activity size={22} />}
        </div>
      </div>
      <div className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
        <div className="h-2 bg-white rounded-full" style={{ width: `${Math.min(100, parseFloat(String(value)) || 0)}%` }} />
      </div>
    </div>
  </motion.div>
)

// Modern stats card component matching AdminBookings style
const StatsCard = ({ label, value, icon, color = '#1d4ed8' }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(96, 165, 250, 0.22)' }}
    style={{
      background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
      border: '1px solid rgba(148, 163, 184, 0.25)',
      borderRadius: '16px',
      padding: 'clamp(16px, 2vw, 20px) clamp(20px, 4vw, 28px)',
      textAlign: 'center',
      boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
      height: '100%'
    }}
  >
    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
    <div style={{
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1.2px',
      fontWeight: '600',
      color: color,
      marginBottom: '8px'
    }}>
      {label}
    </div>
    <div style={{
      fontSize: '36px',
      fontWeight: '700',
      color: '#0f172a',
      letterSpacing: '-0.5px'
    }}>
      {value}
    </div>
  </motion.div>
)

// Hardcoded demo data (nice colors, realistic numbers)
const demo = {
  occupancy: { occupied: 28, free: 12, total: 40, rate: 70 },
  zones: {
    labels: ['A', 'B', 'C', 'D'],
    occupied: [7, 6, 6, 9],
    totals: [11, 10, 10, 9],
  },
  trend: {
    labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
    occupancyPct: [45, 55, 60, 68, 72, 70],
  },
}

const Home = () => {

  const pieData = useMemo(() => ({
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        data: [stats.occupiedDesks, stats.availableDesks],
        backgroundColor: ['#2563eb', '#e5e7eb'],
        borderColor: ['#1e40af', '#d1d5db'],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }), [stats.occupiedDesks, stats.availableDesks])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 45%, #dbeafe 100%)',
      padding: '20px 16px 24px',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.08,
        backgroundImage: `
          radial-gradient(circle at 12% 22%, rgba(0,103,172,0.35) 0%, transparent 22%),
          radial-gradient(circle at 88% 78%, rgba(246,221,88,0.35) 0%, transparent 22%),
          radial-gradient(circle at 50% 50%, rgba(2,132,199,0.25) 0%, transparent 28%)
        `,
        animation: 'gradientShift 20s ease infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage:
          'linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.35,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        width: '100%'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            flexWrap: 'wrap'
          }}>
            <motion.div
              animate={{
                rotate: [0, 4, -4, 0],
                scale: [1, 1.04, 1]
              }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
              style={{
                background: 'linear-gradient(135deg, #0067AC, #1d4ed8)',
                borderRadius: '14px',
                padding: '14px',
                boxShadow: '0 10px 25px rgba(30, 64, 175, 0.25)'
              }}
            >
              <TrendingUp color="#bfdbfe" size={30} />
            </motion.div>
            <div>
              <h1 style={{
                fontSize: '34px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.4px',
                margin: 0
              }}>
                Office Analytics
              </h1>
              <p style={{
                color: '#475569',
                margin: '6px 0 0 0',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Real-time workspace occupancy & booking insights
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px',
            marginBottom: '28px'
          }}
        >
          <StatsCard label="Total Desks" value={loading ? '...' : stats.totalDesks} icon="🪑" color="#1d4ed8" />
          <StatsCard label="Occupied" value={loading ? '...' : stats.occupiedDesks} icon="👤" color="#b45309" />
          <StatsCard label="Available" value={loading ? '...' : stats.availableDesks} icon="✓" color="#166534" />
          <StatsCard label="Occupancy Rate" value={loading ? '...' : `${stats.occupancyRate}%`} icon="📊" color="#b91c1c" />
          <StatsCard label="Total Bookings" value={loading ? '...' : stats.totalBookings} icon="📅" color="#1d4ed8" />
          <StatsCard label="Pending" value={loading ? '...' : stats.pendingBookings} icon="⏳" color="#b45309" />
          <StatsCard label="Accepted" value={loading ? '...' : stats.acceptedBookings} icon="✅" color="#166534" />
          <StatsCard label="Total Users" value={loading ? '...' : stats.totalUsers} icon="👥" color="#1d4ed8" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.96), rgba(255, 255, 255, 0.98))',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: '18px',
              padding: '20px 24px',
              boxShadow: '0 14px 32px rgba(15, 23, 42, 0.1)'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                margin: '0 0 8px 0'
              }}>
                Desk Occupancy
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                Current occupancy distribution
              </p>
            </div>
            <div style={{ width: '100%', height: '200px' }}>
              {!loading && <Pie data={pieData} options={{
                ...{
                  animation: { duration: 900, easing: 'easeOutQuart' },
                  responsive: true,
                  maintainAspectRatio: false
                },
                plugins: { legend: { position: 'bottom', labels: { color: '#374151' } }, title: { display: false } },
              }} />}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.96), rgba(255, 255, 255, 0.98))',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: '18px',
              padding: '20px 24px',
              boxShadow: '0 14px 32px rgba(15, 23, 42, 0.1)'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                margin: '0 0 8px 0'
              }}>
                Booking Status
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                Booking request breakdown
              </p>
            </div>
            <div style={{ width: '100%', height: '200px' }}>
              {!loading && (
                <Bar data={{
                  labels: ['Pending', 'Accepted', 'Declined'],
                  datasets: [{
                    label: 'Bookings',
                    data: [stats.pendingBookings, stats.acceptedBookings, stats.declinedBookings],
                    backgroundColor: ['#fbbf24', '#86efac', '#f87171'],
                    borderRadius: 6,
                    barThickness: 28,
                  }]
                }} options={{
                  ...{
                    animation: { duration: 900, easing: 'easeOutQuart' },
                    responsive: true,
                    maintainAspectRatio: false
                  },
                  plugins: { legend: { position: 'top', labels: { boxWidth: 12 } }, title: { display: false } },
                  scales: {
                    y: { beginAtZero: true, ticks: { precision: 0 } },
                  },
                }} />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
      `}</style>
    </div>
  )
}

export default Home