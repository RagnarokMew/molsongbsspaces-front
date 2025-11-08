import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultChips = [
  { color: '#60a5fa', label: 'Bubble 1', gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
  { color: '#34d399', label: 'Bubble 2', gradient: 'linear-gradient(135deg, #34d399, #10b981)' },
  { color: '#f97316', label: 'Bubble 3', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
  { color: '#f472b6', label: 'Bubble 4', gradient: 'linear-gradient(135deg, #f472b6, #ec4899)' },
  { color: '#94a3b8', label: 'Bubble 5', gradient: 'linear-gradient(135deg, #94a3b8, #64748b)' },
  { color: '#c084fc', label: 'Bubble 6', gradient: 'linear-gradient(135deg, #c084fc, #7c3aed)' },
  { color: '#f59e0b', label: 'Cubicle 1', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { color: '#06b6d4', label: 'Cubicle 2', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
  { color: '#a3e635', label: 'Cubicle 3', gradient: 'linear-gradient(135deg, #a3e635, #65a30d)' },
  { color: '#f97316', label: 'Cubicle 4', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' }
];

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 }
};

export default function BubbleLegendChips({ chips = defaultChips, initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls="bubble-legend-chips"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(2,6,23,0.08)',
          cursor: 'pointer',
          fontWeight: 600,
          color: '#0f172a',
          zIndex: 30
        }}
      >
        {open ? 'i' : 'i'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={open ? 0.6 : 1} transform={open ? 'rotate(45 12 12)' : 'rotate(0 12 12)'} />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="bubble-legend-chips"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            {chips.map((chip, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: '#ffffff',
                  borderRadius: '8px',
                  border: `1px solid ${chip.color}33`,
                  boxShadow: `0 2px 8px ${chip.color}20`
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: chip.gradient || chip.color,
                  borderRadius: '4px'
                }} />
                <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>{chip.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
