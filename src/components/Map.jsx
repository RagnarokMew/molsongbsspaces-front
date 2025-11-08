import React, { useState, useEffect } from 'react';
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
        background: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#1a1a1a'
          }}>
            Office Floor Plan
          </h1>
          <p style={{
            color: '#666',
            marginBottom: '30px',
            fontSize: '16px'
          }}>
            Complete office workspace layout
          </p>

          {/* Legend Component - Will NOT rotate */}
          <FloorPlanLegend currentTime={currentTime} />

          {/* SVG Map Component - Will rotate on mobile */}
          <div className="map-svg-wrapper">
            <FloorPlanSVG />
          </div>
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
