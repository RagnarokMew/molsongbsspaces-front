import React from 'react';
import { motion } from 'framer-motion';

const FloorPlanLegend = ({ currentTime }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0, 103, 172, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 103, 172, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="floor-plan-legend"
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #0067AC, #F6DD58, #0067AC)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s linear infinite'
      }} />

      {/* Time display with pulsing indicator */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        marginBottom: '16px'
      }}>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
          }}
        />
        <h3
          style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.3px'
          }}
        >
          {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}
        </h3>
      </div>

      {/* Legend items with modern cards */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid #86efac',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}
          />
          <span style={{ fontSize: '13px', color: '#065f46', fontWeight: '600' }}>Available</span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid #fca5a5',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)'
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
            }}
          />
          <span style={{ fontSize: '13px', color: '#991b1b', fontWeight: '600' }}>Booked</span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 8px rgba(148, 163, 184, 0.1)'
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              background: 'linear-gradient(135deg, #94a3b8, #64748b)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(148, 163, 184, 0.3)'
            }}
          />
          <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>Hover to see</span>
        </motion.div>

        {/* Divider */}
        <div style={{ 
          width: '1px', 
          height: '40px', 
          background: 'linear-gradient(180deg, transparent, #cbd5e1, transparent)',
          margin: '0 4px'
        }} />

        {/* Bubble room legend chips with improved styling */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { color: '#60a5fa', label: 'Bubble 1', gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
            { color: '#34d399', label: 'Bubble 2', gradient: 'linear-gradient(135deg, #34d399, #10b981)' },
            { color: '#f97316', label: 'Bubble 3', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
            { color: '#f472b6', label: 'Bubble 4', gradient: 'linear-gradient(135deg, #f472b6, #ec4899)' }
          ].map((bubble, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '6px 12px',
                background: '#ffffff',
                borderRadius: '8px',
                border: `1px solid ${bubble.color}40`,
                boxShadow: `0 2px 8px ${bubble.color}20`
              }}
            >
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: bubble.gradient,
                borderRadius: '4px',
                boxShadow: `0 2px 6px ${bubble.color}40`
              }} />
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>{bubble.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </motion.div>
  );
};

export default FloorPlanLegend;
