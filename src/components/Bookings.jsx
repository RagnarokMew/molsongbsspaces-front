import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../index.css';

function Bookings() {
  // sample data (kept for now — you can wire real API calls later)
  const [bookings, setBookings] = useState([
    {
      id: 1,
      deskName: 'Desk 12A',
      location: 'Floor 3, Zone B',
      start: '2025-11-09T09:00:00Z',
      end: '2025-11-09T17:00:00Z',
      status: 'upcoming'
    },
    {
      id: 2,
      deskName: 'Meeting Room 5',
      location: 'Floor 2',
      start: '2025-11-10T14:00:00Z',
      end: '2025-11-10T15:30:00Z',
      status: 'upcoming'
    },
    {
      id: 3,
      deskName: 'Desk 8C',
      location: 'Floor 3, Zone A',
      start: '2025-11-05T09:00:00Z',
      end: '2025-11-05T17:00:00Z',
      status: 'completed'
    }
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate a load to show the friendly loading state from AdminBookings
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#4ade80';
      case 'completed':
        return '#94a3b8';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #001529 0%, #002147 50%, #003566 100%)',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background layers like AdminBookings */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.04,
        backgroundImage: 'radial-gradient(circle at 10% 20%, #0067AC 0%, transparent 20%), radial-gradient(circle at 90% 80%, #F6DD58 0%, transparent 20%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', marginBottom: '36px' }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ fontSize: '44px', marginBottom: '12px', display: 'inline-block', filter: 'drop-shadow(0 0 18px rgba(246,221,88,0.28))' }}>
            🪑
          </motion.div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg,#fff 0%, #0067AC 50%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            My Desk Reservations
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '6px' }}>View and manage your desk and room bookings</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 }} style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(0,103,172,0.12)', borderRadius: 12, padding: '18px 28px', minWidth: 180, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#0067AC' }}>{bookings.length}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 6 }}>Total Bookings</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: 12, padding: '18px 28px', minWidth: 180, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#4ade80' }}>{bookings.filter(b => b.status === 'upcoming').length}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 6 }}>Upcoming</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(246,221,88,0.12)', borderRadius: 12, padding: '18px 28px', minWidth: 180, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F6DD58' }}>{bookings.filter(b => new Date(b.start).getMonth() === new Date().getMonth()).length}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 6 }}>This Month</div>
          </motion.div>
        </motion.div>

        {/* Loading / Empty / List */}
        {loading ? (
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 48, textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, border: '3px solid rgba(246,221,88,0.12)', borderTop: '3px solid #F6DD58', borderRadius: 9999, margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Loading your bookings...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(246,221,88,0.08)', borderRadius: 16, padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 12, color: '#4ade80' }}>✓</div>
            <h2 style={{ color: '#fff', margin: '0 0 8px', fontSize: 22 }}>No bookings found</h2>
            <div style={{ color: 'rgba(255,255,255,0.6)' }}>Looks like you haven't booked any desks yet.</div>
          </div>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#fff' }}>All Bookings</h3>
            </div>

            <div style={{ display: 'grid', gap: 14, padding: 18 }}>
              {bookings.map((b, i) => (
                <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }} style={{ background: 'linear-gradient(135deg, rgba(6,12,30,0.62), rgba(6,28,60,0.58))', border: '1px solid rgba(255,255,255,0.04)', padding: 18, borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h4 style={{ margin: 0, color: '#fff', fontSize: 16 }}>{b.deskName}</h4>
                      <span style={{ backgroundColor: `${getStatusColor(b.status)}33`, color: getStatusColor(b.status), padding: '6px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700, border: `1px solid ${getStatusColor(b.status)}55` }}>{b.status}</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14 }}>📍 {b.location}</div>
                    <div style={{ color: 'rgba(255,255,255,0.82)', marginTop: 6, fontSize: 13 }}>{formatDateTime(b.start)} • {formatDateTime(b.end)}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {b.status === 'upcoming' ? (
                      <>
                        <motion.button whileHover={{ scale: 1.02 }} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #0067AC', color: '#0067AC', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Modify</motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ef4444', color: '#ef4444', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Cancel</motion.button>
                      </>
                    ) : (
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'right' }}>Completed</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* New Booking FAB */}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ marginTop: 20, padding: '12px 18px', background: 'linear-gradient(90deg,#F6DD58,#ffbf00)', color: '#002147', border: 'none', borderRadius: 10, fontWeight: 700, boxShadow: '0 8px 24px rgba(246,221,88,0.2)' }} onClick={() => window.location.href = '/map'}>
          + New Booking
        </motion.button>
      </motion.div>

      <style>{`@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

export default Bookings;