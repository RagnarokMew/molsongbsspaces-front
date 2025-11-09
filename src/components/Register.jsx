import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Register() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '', department: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please fill name, email and password.');
      return false;
    }
    const email = form.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      // Adjust endpoint if your backend uses a different path
      const response = await fetch('https://molsongbsspaces.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, username: form.username, email: form.email, password: form.password })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || 'Registration failed');
      }

        setSuccess('User successfully registered.');
        setForm({ name: '', username: '', email: '', password: '', confirmPassword: '', department: '' });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #001529 0%, #002147 50%, #003566 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} style={{ width: '100%', maxWidth: 720 }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: 42, display: 'inline-block', filter: 'drop-shadow(0 0 18px rgba(246,221,88,0.18))' }}>🔐</motion.div>
          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 12 }}>Create an account</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>Let your employees join the workspace.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.04)', padding: 22, borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          {error && <div style={{ marginBottom: 12, color: '#ffb4b4', background: 'rgba(255,0,0,0.03)', padding: 10, borderRadius: 8 }}>{error}</div>}
          {success && <div style={{ marginBottom: 12, color: '#bbf7d0', background: 'rgba(34,197,94,0.03)', padding: 10, borderRadius: 8 }}>{success}</div>}

          <div style={{ display: 'grid', gap: 12, marginBottom: 12 }}>

            <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
            <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <button type="submit" disabled={loading} style={{ padding: '12px 18px', background: 'linear-gradient(90deg,#F6DD58,#ffbf00)', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>{loading ? 'Creating…' : 'Create account'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
