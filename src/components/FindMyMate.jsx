import { motion } from 'framer-motion';
import { useState } from 'react';
import '../index.css';

function FindMyMate() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const colleagues = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@molsoncoors.com', department: 'Marketing', location: 'Floor 3, Desk 12A', status: 'in-office', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@molsoncoors.com', department: 'Engineering', location: 'Floor 2, Desk 8B', status: 'in-office', avatar: 'MC' },
    { id: 3, name: 'Emma Williams', email: 'emma.w@molsoncoors.com', department: 'Sales', location: 'Remote', status: 'remote', avatar: 'EW' },
    { id: 4, name: 'James Martinez', email: 'james.m@molsoncoors.com', department: 'HR', location: 'Floor 4, Desk 5C', status: 'in-office', avatar: 'JM' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@molsoncoors.com', department: 'Finance', location: 'On Leave', status: 'offline', avatar: 'LA' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-office': return '#10b981';
      case 'remote': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in-office': return 'In Office';
      case 'remote': return 'Remote';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const filteredColleagues = colleagues.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #dbeafe 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle animated background dots (non-interactive) */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle at 20% 50%, #0067AC 2px, transparent 2px), radial-gradient(circle at 80% 80%, #F6DD58 2px, transparent 2px)`, backgroundSize: '50px 50px', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.03, 1] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3 }} style={{ background: 'linear-gradient(135deg, #0067AC, #002147)', borderRadius: 12, padding: 12, boxShadow: '0 6px 18px rgba(0,103,172,0.18)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#F6DD58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22V12H15V22" stroke="#F6DD58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <div>
            <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #0067AC, #002147)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.4px' }}>Find My Mate</h1>
            <p style={{ color: '#475569', marginTop: 6, fontSize: 15 }}>Locate your colleagues and see who's in the office today</p>
          </div>
        </div>

        {/* Search & Filters - frosted */}
        <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 16, boxShadow: '0 8px 30px rgba(2,6,23,0.06)', marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Search by name or department</label>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search colleagues..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e9ef', outline: 'none', fontSize: 14 }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Select Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e9ef', outline: 'none', fontSize: 14 }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 10, padding: 14, boxShadow: '0 6px 18px rgba(2,6,23,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#10b981' }} />
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{colleagues.filter(c => c.status === 'in-office').length}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>In Office Today</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 10, padding: 14, boxShadow: '0 6px 18px rgba(2,6,23,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#f59e0b' }} />
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{colleagues.filter(c => c.status === 'remote').length}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>Working Remote</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 10, padding: 14, boxShadow: '0 6px 18px rgba(2,6,23,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#6b7280' }} />
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{colleagues.filter(c => c.status === 'offline').length}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>Offline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Colleagues Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {filteredColleagues.map((colleague, idx) => (
            <motion.div key={colleague.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.28, delay: idx * 0.06 }} whileHover={{ scale: 1.02 }} style={{ background: 'linear-gradient(135deg,#ffffff, #f8fafc)', borderRadius: 12, padding: 14, boxShadow: '0 8px 30px rgba(2,6,23,0.06)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #0067AC, #002147)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{colleague.avatar}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis' }}>{colleague.name}</div>
                    <div style={{ width: 8, height: 8, borderRadius: 999, background: getStatusColor(colleague.status), flexShrink: 0 }} />
                  </div>

                  <div style={{ color: '#334155', marginBottom: 6, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis' }}>{colleague.email}</div>
                  <div style={{ color: '#0067AC', fontWeight: 600, marginBottom: 8 }}>{colleague.department}</div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#64748b' }}>
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ color: '#475569', fontSize: 13 }}>{colleague.location}</div>
                  </div>

                  <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, backgroundColor: `${getStatusColor(colleague.status)}20`, color: getStatusColor(colleague.status) }}>{getStatusLabel(colleague.status)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredColleagues.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <div style={{ color: '#64748b', fontSize: 16 }}>No colleagues found</div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default FindMyMate;
