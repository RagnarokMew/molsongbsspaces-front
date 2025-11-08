import React from 'react';

const FloorPlanLegend = ({ currentTime }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
      className="floor-plan-legend"
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#1a1a1a",
        }}
      >
        Current Time: {currentTime.toLocaleTimeString()} |{" "}
        {currentTime.toLocaleDateString()}
      </h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#10b981",
              borderRadius: "4px",
            }}
          ></div>
          <span style={{ fontSize: "12px", color: "#666" }}>Available</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#ef4444",
              borderRadius: "4px",
            }}
          ></div>
          <span style={{ fontSize: "12px", color: "#666" }}>Booked</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#94a3b8",
              borderRadius: "4px",
            }}
          ></div>
          <span style={{ fontSize: "12px", color: "#666" }}>
            Hover to see area
          </span>
        </div>
        {/* Bubble room legend chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "14px", height: "14px", background: "#60a5fa", borderRadius: "3px" }} />
            <span style={{ fontSize: "12px", color: "#666" }}>Bubble 1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "14px", height: "14px", background: "#34d399", borderRadius: "3px" }} />
            <span style={{ fontSize: "12px", color: "#666" }}>Bubble 2</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "14px", height: "14px", background: "#f97316", borderRadius: "3px" }} />
            <span style={{ fontSize: "12px", color: "#666" }}>Bubble 3</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "14px", height: "14px", background: "#f472b6", borderRadius: "3px" }} />
            <span style={{ fontSize: "12px", color: "#666" }}>Bubble 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanLegend;
