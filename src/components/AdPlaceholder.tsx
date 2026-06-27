'use client';

import React from 'react';

interface AdPlaceholderProps {
  slot: string; // e.g. "top-banner", "sidebar", "bottom-banner"
  style?: React.CSSProperties;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, style }) => {
  // Check if we are in development/production and render placeholder
  // If the user wants to enable Google AdSense later, they can paste their script/ins tag here
  return (
    <div 
      className="ad-placeholder-container"
      style={{
        margin: '20px auto',
        padding: '10px',
        background: '#f8fafc',
        border: '2px dashed #cbd5e1',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '100%',
        boxSizing: 'border-box',
        ...style
      }}
    >
      <div 
        style={{
          fontSize: '11px',
          color: '#94a3b8',
          letterSpacing: '1px',
          marginBottom: '5px',
          fontWeight: 'bold'
        }}
      >
        スポンサーリンク
      </div>
      <div 
        className="ad-content-box"
        style={{
          minHeight: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '13px',
          backgroundColor: '#f1f5f9',
          borderRadius: '4px'
        }}
      >
        {/*
          TODO: AdSense Integration
          Replace the content below with actual AdSense code:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={slot}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        */}
        <span>🎯 広告スペース (Slot: {slot})</span>
      </div>
    </div>
  );
};
