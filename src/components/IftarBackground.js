import React from 'react';

export default function IftarBackground({ children }) {
  return (
    <div className="iftar-background">
      {/* Background image */}
      <div
        className="iftar-bg-image"
        style={{
          backgroundImage: "url('/assets/iftar/iftar_bg.jpg')",
        }}
      />

      {/* Dark overlay to improve text contrast */}
      <div className="iftar-overlay" />

      {/* Soft vignette */}
      <div className="iftar-vignette" />

      {/* Content */}
      <div className="iftar-content">{children}</div>
    </div>
  );
}
