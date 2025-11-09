import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import FloorPlanSVG from './FloorPlanSVG';
import FloorPlanLegend from './FloorPlanLegend';

function Map() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{
        padding: '40px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #dbeafe 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 20% 50%, #0067AC 2px, transparent 2px),
                           radial-gradient(circle at 80% 80%, #F6DD58 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Animated header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '10px'
            }}>
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                style={{
                  background: 'linear-gradient(135deg, #0067AC, #002147)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 4px 15px rgba(0, 103, 172, 0.3)'
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                    stroke="#F6DD58" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path d="M9 22V12H15V22" 
                    stroke="#F6DD58" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #0067AC, #002147)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px'
              }}>
                Office Floor Plan
              </h1>
            </div>
            <p style={{
              color: '#64748b',
              marginBottom: '30px',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Interactive workspace layout with real-time availability
            </p>
          </motion.div>

          {/* Legend Component with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloorPlanLegend currentTime={currentTime} />
          </motion.div>

          {/* SVG Map Component with animation */}
          <motion.div 
            className="map-svg-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FloorPlanSVG />
          </motion.div>
        </div>
      </div>

      {/* Add CSS for mobile rotation */}
      <style>{`
        @media (max-width: 768px) {
          /* Legend stays normal - no rotation */
          .floor-plan-legend {
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 20px !important;
          }
          
          /* SVG wrapper for rotation */
          .map-svg-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            min-height: 80vh;
            overflow: hidden;
            margin: 20px 0;
          }
          
          /* Rotate the SVG container */
          .floor-plan-svg-container {
            transform: rotate(90deg) !important;
            transform-origin: center center !important;
            width: 90vh !important;
            height: 90vw !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          
          /* Make SVG bigger on mobile */
          .floor-plan-svg {
            max-width: 180% !important;
            width: 180% !important;
            height: auto !important;
          }
        }
        
        @media (min-width: 769px) {
          .map-svg-wrapper {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

export default Map;
