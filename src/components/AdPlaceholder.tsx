'use client';

import React, { useEffect } from 'react';

interface AdPlaceholderProps {
  slot: string; // e.g. "top-banner", "bottom-banner"
  style?: React.CSSProperties;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, style }) => {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (adsenseClientId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }
  }, [adsenseClientId]);

  // If there's no AdSense client ID configured, we hide it completely in production,
  // but show a dashed placeholder in development to visualize the layouts.
  const isDev = process.env.NODE_ENV === 'development';

  if (!adsenseClientId) {
    if (isDev) {
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
            スポンサーリンク (開発中のみ表示)
          </div>
          <div 
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
            <span>🎯 広告スペース (Slot: {slot})</span>
          </div>
        </div>
      );
    }
    return null; // Hide completely in production for clean look when ads are not configured
  }

  return (
    <div 
      className="adsense-unit-wrapper"
      style={{
        margin: '20px auto',
        textAlign: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      <div 
        style={{
          fontSize: '10px',
          color: '#94a3b8',
          marginBottom: '4px',
          letterSpacing: '0.5px'
        }}
      >
        スポンサーリンク
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
