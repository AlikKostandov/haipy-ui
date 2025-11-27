import React from "react";

interface GaugeProps {
  value: number;
}

export function Gauge({ value }: GaugeProps) {

  const safeValue = Math.max(0, Math.min(100, value));

  const ringStyle: React.CSSProperties = {
    backgroundImage: `conic-gradient(var(--ac) ${safeValue * 3.6}deg, var(--track) 0)`,
  };

  return (
    <div className="gauge">
      <div className="gauge-ring" style={ringStyle} />
      <div className="gauge-hole" />
      <div className="gauge-label">{safeValue}</div>
    </div>
  );
}
