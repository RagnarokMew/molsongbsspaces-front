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
    // quick simulated load to show the AdminBookings visual states
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const pendingCount = bookings.filter((b) => (b.status || 'pending') === 'pending').length;
  const acceptedCount = bookings.filter((b) => b.status === 'upcoming').length;
  const declinedCount = bookings.filter((b) => b.status === 'cancelled' || b.status === 'declined').length;

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

  const infoCardBase = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(241, 245, 249, 0.96))',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)'
  };

  const statsCardBase = {
    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '16px',
    padding: '20px 28px',
    minWidth: '200px',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
    textAlign: 'center'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 45%, #dbeafe 100%)',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
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
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <motion.div animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }} style={{ background: 'linear-gradient(135deg, #0067AC, #1d4ed8)', borderRadius: '14px', padding: '14px', boxShadow: '0 10px 25px rgba(30, 64, 175, 0.25)' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 10V17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H10" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 10V14" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.5 18V21" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.5 18H16.5" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <div>
                <h1 style={{ fontSize: '34px', fontWeight: '800', background: 'linear-gradient(135deg, #0f172a, #1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.4px', margin: 0 }}>My Bookings</h1>
                <p style={{ color: '#475569', margin: '6px 0 0 0', fontSize: '16px', fontWeight: '500' }}>View and manage your desk and room bookings</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.div whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(96, 165, 250, 0.22)' }} style={{ ...statsCardBase, border: '1px solid rgba(59, 130, 246, 0.2)', background: 'linear-gradient(135deg, #eff6ff, #f8fafc)' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '600', color: '#1d4ed8', marginBottom: '8px' }}>Total Bookings</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.5px', marginBottom: '6px' }}>{loading ? '...' : bookings.length}</div>
            <div style={{ fontSize: '12px', color: 'rgba(15, 23, 42, 0.55)' }}>All booking records fetched</div>
          </motion.div>

          <motion.div whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(217, 119, 6, 0.18)' }} style={{ ...statsCardBase, border: '1px solid rgba(217, 119, 6, 0.25)', background: 'linear-gradient(135deg, #fff7ed, #fffbeb)' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '600', color: '#b45309', marginBottom: '8px' }}>Pending Review</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#92400e', letterSpacing: '-0.5px', marginBottom: '6px' }}>{loading ? '...' : pendingCount}</div>
            <div style={{ fontSize: '12px', color: 'rgba(180, 83, 9, 0.65)' }}>Awaiting admin action</div>
          </motion.div>

          <motion.div whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(34, 197, 94, 0.22)' }} style={{ ...statsCardBase, border: '1px solid rgba(34, 197, 94, 0.25)', background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>Approved</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#14532d', letterSpacing: '-0.5px', marginBottom: '6px' }}>{loading ? '...' : acceptedCount}</div>
            <div style={{ fontSize: '12px', color: 'rgba(22, 101, 52, 0.65)' }}>Confirmed desk bookings</div>
          </motion.div>

          <motion.div whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(248, 113, 113, 0.18)' }} style={{ ...statsCardBase, border: '1px solid rgba(248, 113, 113, 0.25)', background: 'linear-gradient(135deg, #fef2f2, #fee2e2)' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '600', color: '#b91c1c', marginBottom: '8px' }}>Declined</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#991b1b', letterSpacing: '-0.5px', marginBottom: '6px' }}>{loading ? '...' : declinedCount}</div>
            <div style={{ fontSize: '12px', color: 'rgba(185, 28, 28, 0.65)' }}>Marked as unavailable</div>
          </motion.div>
        </motion.div>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(14px)', border: '1px solid rgba(148, 163, 184, 0.25)', borderRadius: '20px', padding: '48px', textAlign: 'center', boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)' }}>
            <div style={{ width: '50px', height: '50px', border: '3px solid rgba(14, 116, 144, 0.2)', borderTop: '3px solid #1d4ed8', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px', boxShadow: '0 0 15px rgba(29, 78, 216, 0.25)' }} />
            <p style={{ color: '#475569', fontSize: '14px', margin: 0, letterSpacing: '0.5px' }}>Loading booking data...</p>
          </motion.div>
        )}

        {!loading && bookings.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ background: 'rgba(255, 255, 255, 0.88)', backdropFilter: 'blur(14px)', border: '1px solid rgba(148, 163, 184, 0.24)', borderRadius: '20px', padding: '70px 36px', textAlign: 'center', boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)' }}>
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '64px', marginBottom: '20px', filter: 'drop-shadow(0 0 18px rgba(34, 197, 94, 0.35))' }}>✓</motion.div>
            <h2 style={{ fontSize: '28px', color: '#0f172a', marginBottom: '10px', fontWeight: '600', letterSpacing: '-0.5px' }}>All Clear</h2>
            <p style={{ color: '#475569', fontSize: '14px', margin: 0, letterSpacing: '0.3px' }}>No booking requests require your attention</p>
          </motion.div>
        )}

        {!loading && bookings.length > 0 && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {bookings.map((booking, index) => {
              const bookingKey = booking.id || `${booking.deskName}-${index}`;
              return (
                <motion.div key={bookingKey} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -4 }} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(241,245,249,0.96))', border: '1px solid rgba(148,163,184,0.12)', padding: 18, borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h4 style={{ margin: 0, color: '#0f172a', fontSize: 16 }}>{booking.deskName}</h4>
                      <span style={{ backgroundColor: '#f0fdf4', color: '#14532d', padding: '6px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700, border: `1px solid rgba(34,197,94,0.12)` }}>{booking.status}</span>
                    </div>
                    <div style={{ color: '#475569', fontSize: 14 }}>📍 {booking.location}</div>
                    <div style={{ color: '#1e293b', marginTop: 6, fontSize: 13 }}>{formatDateTime(booking.start)} • {formatDateTime(booking.end)}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {booking.status === 'upcoming' ? (
                      <>
                        <motion.button whileHover={{ scale: 1.02 }} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #0067AC', color: '#0067AC', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Modify</motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ef4444', color: '#ef4444', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Cancel</motion.button>
                      </>
                    ) : (
                      <div style={{ color: '#64748b', fontSize: 13, textAlign: 'right' }}>Completed</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* New Booking FAB */}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ marginTop: 20, padding: '12px 18px', background: 'linear-gradient(90deg,#F6DD58,#ffbf00)', color: '#002147', border: 'none', borderRadius: 10, fontWeight: 700, boxShadow: '0 8px 24px rgba(246,221,88,0.2)' }} onClick={() => window.location.href = '/map'}>
          + New Booking
        </motion.button>
      </div>

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } @keyframes gradientShift { 0%,100%{transform:translate(0,0);}50%{transform:translate(30px,30px);} }`}</style>
    </div>
  );
}

export default Bookings;