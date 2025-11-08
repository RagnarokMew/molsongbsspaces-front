import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingBookings();
    const interval = setInterval(fetchPendingBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPendingBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://molsongbsspaces.onrender.com/api/desk/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch desks');
      }

      const data = await response.json();
      const desksData = data.data || data;
      
      const pendingBookings = [];
      desksData.forEach(desk => {
        if (desk.bookings && desk.bookings.length > 0) {
          desk.bookings.forEach(booking => {
            pendingBookings.push({
              ...booking,
              deskId: desk._id || desk.id,
              deskName: desk.name || desk.locationId,
              locationId: desk.locationId
            });
          });
        }
      });

      setBookings(pendingBookings);
      console.log('📋 All bookings found:', pendingBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (deskId, attendanceId) => {
    try {
      setProcessingId(attendanceId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://molsongbsspaces.onrender.com/api/desk/${deskId}/attendance/${attendanceId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept booking');
      }

      alert('✅ Booking accepted!');
      fetchPendingBookings();
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking: ' + error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (deskId, attendanceId) => {
    try {
      setProcessingId(attendanceId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://molsongbsspaces.onrender.com/api/desk/${deskId}/attendance/${attendanceId}/decline`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to decline booking');
      }

      alert('❌ Booking declined!');
      fetchPendingBookings();
    } catch (error) {
      console.error('Error declining booking:', error);
      alert('Failed to decline booking: ' + error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #001529 0%, #002147 50%, #003566 100%)',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, #0067AC 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, #F6DD58 0%, transparent 20%),
          radial-gradient(circle at 50% 50%, #0067AC 0%, transparent 25%)
        `,
        animation: 'gradientShift 20s ease infinite',
        pointerEvents: 'none'
      }} />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: '48px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 0 20px rgba(246, 221, 88, 0.4))',
              display: 'inline-block'
            }}
          >
            🔐
          </motion.div>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #F6DD58 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px',
            letterSpacing: '-0.5px',
            textShadow: '0 0 30px rgba(246, 221, 88, 0.2)'
          }}>
            Admin Control Panel
          </h1>

          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '16px',
            fontWeight: '400',
            margin: '0 0 24px 0',
            letterSpacing: '0.5px'
          }}>
            Manage and approve desk booking requests
          </p>

          <div style={{
            height: '1px',
            maxWidth: '400px',
            margin: '0 auto',
            background: 'linear-gradient(90deg, transparent, rgba(246, 221, 88, 0.5), transparent)',
            boxShadow: '0 0 10px rgba(246, 221, 88, 0.3)'
          }} />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(246, 221, 88, 0.3)' }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(246, 221, 88, 0.15)',
              borderRadius: '16px',
              padding: '24px 40px',
              textAlign: 'center',
              minWidth: '180px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #F6DD58 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
              filter: 'drop-shadow(0 0 10px rgba(246, 221, 88, 0.5))'
            }}>
              {loading ? '...' : bookings.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              Total Bookings
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)' }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(74, 222, 128, 0.15)',
              borderRadius: '16px',
              padding: '24px 40px',
              textAlign: 'center',
              minWidth: '180px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#4ade80',
                marginBottom: '8px',
                filter: 'drop-shadow(0 0 10px rgba(74, 222, 128, 0.5))'
              }}
            >
              ●
            </motion.div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              Live Monitoring
            </div>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '60px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              border: '3px solid rgba(246, 221, 88, 0.1)',
              borderTop: '3px solid #F6DD58',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px',
              boxShadow: '0 0 20px rgba(246, 221, 88, 0.3)'
            }} />
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              margin: 0,
              letterSpacing: '0.5px'
            }}>
              Loading booking data...
            </p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(246, 221, 88, 0.1)',
              borderRadius: '20px',
              padding: '80px 40px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                fontSize: '72px', 
                marginBottom: '24px',
                filter: 'drop-shadow(0 0 20px rgba(74, 222, 128, 0.4))'
              }}
            >
              ✓
            </motion.div>
            <h2 style={{ 
              fontSize: '28px', 
              color: '#ffffff', 
              marginBottom: '12px',
              fontWeight: '600',
              letterSpacing: '-0.5px'
            }}>
              All Clear
            </h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.5)', 
              fontSize: '15px',
              margin: 0,
              letterSpacing: '0.3px'
            }}>
              No booking requests require your attention
            </p>
          </motion.div>
        )}

        {/* Bookings List */}
        {!loading && bookings.length > 0 && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 12px 40px rgba(246, 221, 88, 0.15)'
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Top Glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #F6DD58, transparent)',
                  boxShadow: '0 0 10px rgba(246, 221, 88, 0.5)'
                }} />

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '32px',
                  alignItems: 'center'
                }}>
                  {/* Desk Card */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 103, 172, 0.3) 0%, rgba(0, 33, 71, 0.5) 100%)',
                      border: '1px solid rgba(246, 221, 88, 0.3)',
                      padding: '20px',
                      borderRadius: '12px',
                      minWidth: '140px',
                      textAlign: 'center',
                      boxShadow: '0 0 20px rgba(246, 221, 88, 0.1), inset 0 0 20px rgba(246, 221, 88, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ 
                      fontSize: '28px', 
                      marginBottom: '10px',
                      filter: 'drop-shadow(0 0 8px rgba(246, 221, 88, 0.3))'
                    }}>
                      🪑
                    </div>
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '13px',
                      color: '#F6DD58',
                      letterSpacing: '0.3px'
                    }}>
                      {booking.locationId || booking.deskName}
                    </div>
                  </motion.div>

                  {/* Details */}
                  <div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
                      }}>
                        <div style={{ 
                          fontSize: '11px', 
                          color: 'rgba(255, 255, 255, 0.4)', 
                          marginBottom: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>
                          <span style={{ fontSize: '14px' }}>📅</span> Start Time
                        </div>
                        <div style={{ 
                          fontWeight: '500', 
                          color: '#ffffff',
                          fontSize: '14px',
                          letterSpacing: '0.2px'
                        }}>
                          {formatDateTime(booking.start)}
                        </div>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
                      }}>
                        <div style={{ 
                          fontSize: '11px', 
                          color: 'rgba(255, 255, 255, 0.4)', 
                          marginBottom: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>
                          <span style={{ fontSize: '14px' }}>⏰</span> End Time
                        </div>
                        <div style={{ 
                          fontWeight: '500', 
                          color: '#ffffff',
                          fontSize: '14px',
                          letterSpacing: '0.2px'
                        }}>
                          {booking.end ? formatDateTime(booking.end) : 'Open-ended'}
                        </div>
                      </div>

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
                      }}>
                        <div style={{ 
                          fontSize: '11px', 
                          color: 'rgba(255, 255, 255, 0.4)', 
                          marginBottom: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>
                          <span style={{ fontSize: '14px' }}>👤</span> User ID
                        </div>
                        <div style={{ 
                          fontWeight: '500', 
                          color: '#ffffff',
                          fontSize: '12px',
                          fontFamily: 'monospace',
                          letterSpacing: '0.5px'
                        }}>
                          {booking.userId ? booking.userId.slice(0, 12) + '...' : 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    {booking.status && (
                      <motion.div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 14px',
                          background: booking.status === 'pending' 
                            ? 'linear-gradient(135deg, rgba(246, 221, 88, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)'
                            : 'linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                          border: `1px solid ${booking.status === 'pending' ? 'rgba(246, 221, 88, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`,
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: booking.status === 'pending' ? '#F6DD58' : '#4ade80',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          boxShadow: `0 0 15px ${booking.status === 'pending' ? 'rgba(246, 221, 88, 0.2)' : 'rgba(74, 222, 128, 0.2)'}`
                        }}
                      >
                        <span style={{ fontSize: '8px' }}>●</span>
                        {booking.status}
                      </motion.div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '10px',
                    minWidth: '130px'
                  }}>
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 25px rgba(74, 222, 128, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAccept(booking.deskId, booking._id)}
                      disabled={processingId === booking._id}
                      style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.3) 100%)',
                        color: '#4ade80',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: processingId === booking._id ? 'not-allowed' : 'pointer',
                        opacity: processingId === booking._id ? 0.5 : 1,
                        fontSize: '13px',
                        boxShadow: '0 0 15px rgba(74, 222, 128, 0.2)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>✓</span>
                      Accept
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDecline(booking.deskId, booking._id)}
                      disabled={processingId === booking._id}
                      style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.3) 100%)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: processingId === booking._id ? 'not-allowed' : 'pointer',
                        opacity: processingId === booking._id ? 0.5 : 1,
                        fontSize: '13px',
                        boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>✗</span>
                      Decline
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes gradientShift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
      `}</style>
    </div>
  );
};

export default AdminBookings;
