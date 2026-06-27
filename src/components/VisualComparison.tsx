'use client';

import React, { useId } from 'react';
import { ReferenceItem, formatValue } from '../lib/references';

interface VisualComparisonProps {
  item: ReferenceItem;
  targetValueBase: number; // The user input value converted to base unit
}

// Helper to get a child-friendly fraction or decimal description
function getRatioDescription(ratio: number, unitName: string): string {
  const yaku = '<ruby>約<rt>やく</rt></ruby>';
  if (ratio < 0.001) return `ほんのすこし（${formatValue(ratio)}${unitName}）`;
  if (ratio < 0.1) return `ごくわずか（${formatValue(ratio)}${unitName}）`;
  
  // Check common fractions
  const diff1_4 = Math.abs(ratio - 0.25);
  const diff1_3 = Math.abs(ratio - 0.333);
  const diff1_2 = Math.abs(ratio - 0.5);
  const diff2_3 = Math.abs(ratio - 0.666);
  const diff3_4 = Math.abs(ratio - 0.75);

  if (diff1_4 < 0.05) return `${yaku} 4<ruby>分の<rt>ぶんの</rt></ruby>1 ${unitName}`;
  if (diff1_3 < 0.05) return `${yaku} 3<ruby>分の<rt>ぶんの</rt></ruby>1 ${unitName}`;
  if (diff1_2 < 0.05) return `${yaku} <ruby>半分<rt>はんぶん</rt></ruby>（2<ruby>分の<rt>ぶんの</rt></ruby>1 ${unitName}）`;
  if (diff2_3 < 0.05) return `${yaku} 3<ruby>分の<rt>ぶんの</rt></ruby>2 ${unitName}`;
  if (diff3_4 < 0.05) return `${yaku} 4<ruby>分の<rt>ぶんの</rt></ruby>3 ${unitName}`;

  if (ratio < 1) {
    const percent = Math.round(ratio * 10) * 10;
    return `${yaku} ${percent}% ${unitName}`;
  }

  // Large numbers
  const intPart = Math.floor(ratio);
  const fracPart = ratio - intPart;

  if (fracPart < 0.1) return `${yaku} ${intPart} ${unitName}`;
  if (Math.abs(fracPart - 0.5) < 0.15) return `${yaku} ${intPart} ${unitName} と<ruby>半分<rt>はんぶん</rt></ruby>`;
  if (fracPart > 0.8) return `${yaku} ${intPart + 1} ${unitName}`;
  
  return `${yaku} ${formatValue(ratio)} ${unitName}`;
}

// Child-friendly exclamation / comment based on the ratio
function getKidsExclamation(ratio: number): string {
  if (ratio < 0.01) return '<ruby>小さ<rt>ちいさ</rt></ruby>すぎて<ruby>見<rt>み</rt></ruby>えないかも！🔍';
  if (ratio < 0.5) return 'これより<ruby>小さ<rt>ちいさ</rt></ruby>いよ！ちっちゃいね。';
  if (ratio >= 0.5 && ratio < 0.95) return 'あとすこしで<ruby>同<rt>おな</rt></ruby>じくらい！✨';
  if (Math.abs(ratio - 1) < 0.05) return 'ピッタシ<ruby>同<rt>おな</rt></ruby>じくらい！おどろき！🎉';
  if (ratio >= 1.05 && ratio < 2) return 'これよりすこし<ruby>大<rt>おお</rt></ruby>きいよ！😲';
  if (ratio >= 2 && ratio < 5) return 'ならべるとけっこう<ruby>大<rt>おお</rt></ruby>きい！🚀';
  if (ratio >= 5 && ratio < 20) return 'いっぱい<ruby>並<rt>なら</rt></ruby>ぶね！すごい！🌟';
  return 'ケタはずれに<ruby>大<rt>おお</rt></ruby>きい！<ruby>山<rt>やま</rt></ruby>やプールレベルだ！🌋';
}

export const VisualComparison: React.FC<VisualComparisonProps> = ({ item, targetValueBase }) => {
  const ratio = targetValueBase / item.value;
  const description = getRatioDescription(ratio, item.unitName);
  const exclamation = getKidsExclamation(ratio);
  const idPrefix = useId();

  // Render individual SVG icons based on svgType and filling ratio (0 to 1)
  const renderItemSvg = (fillRatio: number, index: number) => {
    const p = Math.min(100, Math.max(0, fillRatio * 100));
    const fillHeight = 100 - p; // SVG coordinates y starts at top
    const uniqueId = `clip-${idPrefix}-${index}-${p.toFixed(0)}`;

    const getSvgContent = () => {
      switch (item.svgType) {
        case 'water-drop':
          return (
            <>
              {/* Empty background drop */}
              <path d="M50 10 C50 10 20 60 20 80 A 30 30 0 0 0 80 80 C 80 60 50 10 50 10 Z" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="4" />
              {/* Filled liquid drop */}
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M50 10 C50 10 20 60 20 80 A 30 30 0 0 0 80 80 C 80 60 50 10 50 10 Z" fill="#38bdf8" />
              </g>
              {/* Highlight */}
              <path d="M40 50 A 10 10 0 0 1 50 40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          );
        case 'teaspoon':
          return (
            <>
              {/* Teaspoon shape */}
              <path d="M20 70 Q 50 70 80 50 Q 95 40 90 20 Q 80 15 65 35 Q 40 60 20 65 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />
              <ellipse cx="73" cy="33" rx="14" ry="10" transform="rotate(-30 73 33)" fill="#cbd5e1" />
              <g clipPath={`url(#${uniqueId})`}>
                <ellipse cx="73" cy="33" rx="12" ry="8" transform="rotate(-30 73 33)" fill="#f97316" />
              </g>
            </>
          );
        case 'paper-cup':
          return (
            <>
              {/* Paper cup outline */}
              <polygon points="25,25 75,25 65,95 35,95" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
              {/* Inner fill */}
              <g clipPath={`url(#${uniqueId})`}>
                <polygon points="27,27 73,27 63,93 37,93" fill="#fbbf24" />
                {/* Liquid bubble effect */}
                <circle cx="50" cy="50" r="4" fill="#fff" opacity="0.4" />
              </g>
              {/* Cup rim */}
              <ellipse cx="50" cy="25" rx="25" ry="5" fill="none" stroke="#64748b" strokeWidth="4" />
            </>
          );
        case 'pet-bottle':
          return (
            <>
              {/* Bottle main body */}
              <path d="M35 15 H65 V25 H70 Q75 25 75 35 V85 Q75 95 65 95 H35 Q25 95 25 85 V35 Q25 25 30 25 H35 Z" fill="#f0fdfa" stroke="#0d9488" strokeWidth="4" />
              {/* Cap */}
              <rect x="42" y="5" width="16" height="10" rx="2" fill="#0284c7" />
              {/* Fill */}
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M35 15 H65 V25 H70 Q75 25 75 35 V85 Q75 95 65 95 H35 Q25 95 25 85 V35 Q25 25 30 25 H35 Z" fill="#2dd4bf" />
              </g>
              {/* Bottle details */}
              <line x1="30" y1="50" x2="70" y2="50" stroke="#0d9488" strokeWidth="2" opacity="0.5" />
              <line x1="30" y1="70" x2="70" y2="70" stroke="#0d9488" strokeWidth="2" opacity="0.5" />
            </>
          );
        case 'milk-carton':
          return (
            <>
              {/* Milk carton outline */}
              <path d="M30 35 L50 20 L70 35 V95 H30 Z" fill="#f8fafc" stroke="#2563eb" strokeWidth="4" />
              <path d="M30 35 H70 L50 30 Z" fill="#e2e8f0" stroke="#2563eb" strokeWidth="4" />
              {/* Liquid fill */}
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M30 35 L50 20 L70 35 V95 H30 Z" fill="#60a5fa" />
                {/* Milk icon inside */}
                <text x="50" y="70" fontSize="18" fontWeight="bold" fill="#ffffff" textAnchor="middle">MILK</text>
              </g>
            </>
          );
        case 'large-pet-bottle':
          return (
            <>
              <path d="M30 15 H70 V25 H75 V85 Q75 95 65 95 H35 Q25 95 25 85 V25 H30 Z" fill="#f0fdfa" stroke="#0369a1" strokeWidth="4" />
              <rect x="40" y="5" width="20" height="10" fill="#dc2626" />
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M30 15 H70 V25 H75 V85 Q75 95 65 95 H35 Q25 95 25 85 V25 H30 Z" fill="#38bdf8" />
              </g>
              <rect x="35" y="45" width="30" height="20" rx="3" fill="#ffffff" opacity="0.8" />
              <text x="50" y="58" fontSize="12" fill="#0369a1" textAnchor="middle" fontWeight="bold">2L</text>
            </>
          );
        case 'bucket':
          return (
            <>
              {/* Bucket shape */}
              <polygon points="20,35 80,35 70,95 30,95" fill="#f1f5f9" stroke="#475569" strokeWidth="4" />
              <path d="M20 35 A 30 10 0 0 0 80 35" fill="none" stroke="#475569" strokeWidth="4" />
              {/* Handle */}
              <path d="M20 35 C20 10 80 10 80 35" fill="none" stroke="#64748b" strokeWidth="3" />
              {/* Liquid fill */}
              <g clipPath={`url(#${uniqueId})`}>
                <polygon points="22,37 78,37 68,93 32,93" fill="#0ea5e9" />
              </g>
            </>
          );
        case 'bathtub':
          return (
            <>
              {/* Bathtub */}
              <path d="M10 50 Q10 40 25 40 H75 Q90 40 90 50 V70 Q90 90 75 90 H25 Q10 90 10 70 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" />
              {/* Shower/Faucet details */}
              <path d="M80 40 V20 H75" fill="none" stroke="#64748b" strokeWidth="4" />
              {/* Legs */}
              <rect x="20" y="90" width="10" height="8" rx="2" fill="#475569" />
              <rect x="70" y="90" width="10" height="8" rx="2" fill="#475569" />
              {/* Fill */}
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M12 50 H88 V70 Q88 88 75 88 H25 Q12 88 12 70 Z" fill="#06b6d4" />
              </g>
            </>
          );
        case 'pool':
          return (
            <>
              {/* Pool outer border */}
              <rect x="10" y="20" width="80" height="70" rx="5" fill="#94a3b8" stroke="#475569" strokeWidth="4" />
              {/* Water area */}
              <rect x="18" y="28" width="64" height="54" fill="#e0f2fe" />
              {/* Lanes */}
              <line x1="34" y1="28" x2="34" y2="82" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="50" y1="28" x2="50" y2="82" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="66" y1="28" x2="66" y2="82" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
              {/* Fill ratio */}
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="18" y="28" width="64" height="54" fill="#0284c7" />
                <line x1="34" y1="28" x2="34" y2="82" stroke="#0369a1" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="50" y1="28" x2="50" y2="82" stroke="#0369a1" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="66" y1="28" x2="66" y2="82" stroke="#0369a1" strokeWidth="2" strokeDasharray="4 2" />
              </g>
              {/* Ladder */}
              <rect x="80" y="32" width="6" height="15" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            </>
          );
        case 'coin-1yen':
          return (
            <>
              <circle cx="50" cy="50" r="40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <circle cx="50" cy="50" r="40" fill="#cbd5e1" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#94a3b8" strokeWidth="2" />
              </g>
              <text x="50" y="60" fontSize="32" fontWeight="bold" fill="#64748b" textAnchor="middle">1</text>
            </>
          );
        case 'dice':
          return (
            <>
              <rect x="15" y="15" width="70" height="70" rx="10" fill="#ffffff" stroke="#1e293b" strokeWidth="4" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="15" y="15" width="70" height="70" rx="10" fill="#f1f5f9" />
              </g>
              {/* Dots for number 5 (or filled color) */}
              <circle cx="32" cy="32" r="7" fill="#dc2626" />
              <circle cx="68" cy="32" r="7" fill="#dc2626" />
              <circle cx="50" cy="50" r="9" fill="#dc2626" />
              <circle cx="32" cy="68" r="7" fill="#dc2626" />
              <circle cx="68" cy="68" r="7" fill="#dc2626" />
            </>
          );
        case 'toilet-paper':
          return (
            <>
              {/* Outer paper outline */}
              <path d="M25 30 C25 20 75 20 75 30 V80 C75 90 25 90 25 80 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="4" />
              <ellipse cx="50" cy="30" rx="25" ry="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="4" />
              <ellipse cx="50" cy="30" rx="8" ry="4" fill="#b45309" stroke="#78350f" strokeWidth="1" />
              <g clipPath={`url(#${uniqueId})`}>
                {/* Colored visual fill */}
                <path d="M25 30 C25 20 75 20 75 30 V80 C75 90 25 90 25 80 Z" fill="#a7f3d0" />
                <ellipse cx="50" cy="30" rx="25" ry="10" fill="#6ee7b7" />
                <ellipse cx="50" cy="30" rx="8" ry="4" fill="#b45309" />
              </g>
              {/* Side fold line */}
              <path d="M55 45 V75" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
            </>
          );
        case 'smartphone':
          return (
            <>
              {/* Smartphone body */}
              <rect x="20" y="10" width="60" height="85" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="4" />
              {/* Screen */}
              <rect x="25" y="18" width="50" height="68" rx="4" fill="#0f172a" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="25" y="18" width="50" height="68" rx="4" fill="#6366f1" />
                {/* Fun face inside screen */}
                <circle cx="42" cy="46" r="3" fill="#fff" />
                <circle cx="58" cy="46" r="3" fill="#fff" />
                <path d="M45 56 Q50 60 55 56" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
              {/* Speaker / Camera */}
              <rect x="42" y="14" width="16" height="2" rx="1" fill="#475569" />
            </>
          );
        case 'ruler-30':
          return (
            <>
              {/* Ruler horizontal shape */}
              <rect x="5" y="35" width="90" height="30" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="5" y="35" width="90" height="30" rx="3" fill="#facc15" />
              </g>
              {/* Ruler ticks */}
              <line x1="15" y1="35" x2="15" y2="45" stroke="#ca8a04" strokeWidth="2" />
              <line x1="25" y1="35" x2="25" y2="41" stroke="#ca8a04" strokeWidth="1" />
              <line x1="35" y1="35" x2="35" y2="45" stroke="#ca8a04" strokeWidth="2" />
              <line x1="45" y1="35" x2="45" y2="41" stroke="#ca8a04" strokeWidth="1" />
              <line x1="55" y1="35" x2="55" y2="45" stroke="#ca8a04" strokeWidth="2" />
              <line x1="65" y1="35" x2="65" y2="41" stroke="#ca8a04" strokeWidth="1" />
              <line x1="75" y1="35" x2="75" y2="45" stroke="#ca8a04" strokeWidth="2" />
              <line x1="85" y1="35" x2="85" y2="41" stroke="#ca8a04" strokeWidth="1" />
              {/* Numbers */}
              <text x="35" y="55" fontSize="8" fill="#a16207" textAnchor="middle">10</text>
              <text x="55" y="55" fontSize="8" fill="#a16207" textAnchor="middle">20</text>
              <text x="75" y="55" fontSize="8" fill="#a16207" textAnchor="middle">30</text>
            </>
          );
        case 'umbrella':
          return (
            <>
              {/* Umbrella canopy */}
              <path d="M15 55 C15 25 85 25 85 55 C70 50 60 50 50 55 C40 50 30 50 15 55 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="4" />
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M15 55 C15 25 85 25 85 55 C70 50 60 50 50 55 C40 50 30 50 15 55 Z" fill="#ffedd5" />
              </g>
              {/* Handle stick */}
              <path d="M50 55 V80 Q50 88 44 88" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
              {/* Tip */}
              <line x1="50" y1="20" x2="50" y2="28" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
            </>
          );
        case 'door':
          return (
            <>
              <rect x="25" y="10" width="50" height="80" rx="2" fill="#edd9c0" stroke="#b07d62" strokeWidth="4" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="25" y="10" width="50" height="80" rx="2" fill="#c38e70" />
              </g>
              {/* Knob */}
              <circle cx="35" cy="50" r="4" fill="#facc15" stroke="#a16207" strokeWidth="1" />
              {/* Panels */}
              <rect x="33" y="18" width="14" height="24" fill="none" stroke="#b07d62" strokeWidth="2" />
              <rect x="53" y="18" width="14" height="24" fill="none" stroke="#b07d62" strokeWidth="2" />
            </>
          );
        case 'bus':
          return (
            <>
              {/* Bus body */}
              <rect x="10" y="25" width="80" height="45" rx="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="10" y="25" width="80" height="45" rx="5" fill="#eab308" />
              </g>
              {/* Wheels */}
              <circle cx="28" cy="70" r="10" fill="#1e293b" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="28" cy="70" r="4" fill="#ffffff" />
              <circle cx="72" cy="70" r="10" fill="#1e293b" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="72" cy="70" r="4" fill="#ffffff" />
              {/* Windows */}
              <rect x="18" y="32" width="14" height="12" rx="2" fill="#e0f2fe" stroke="#ca8a04" strokeWidth="2" />
              <rect x="38" y="32" width="14" height="12" rx="2" fill="#e0f2fe" stroke="#ca8a04" strokeWidth="2" />
              <rect x="58" y="32" width="14" height="12" rx="2" fill="#e0f2fe" stroke="#ca8a04" strokeWidth="2" />
            </>
          );
        case 'school-ground':
          return (
            <>
              {/* Ground shape */}
              <ellipse cx="50" cy="50" rx="45" ry="30" fill="#fed7aa" stroke="#c2410c" strokeWidth="4" />
              {/* Inner track field */}
              <ellipse cx="50" cy="50" rx="33" ry="20" fill="#b91c1c" stroke="#ffffff" strokeWidth="2" />
              <ellipse cx="50" cy="50" rx="23" ry="12" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <ellipse cx="50" cy="50" rx="45" ry="30" fill="#ea580c" />
                <ellipse cx="50" cy="50" rx="33" ry="20" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <ellipse cx="50" cy="50" rx="23" ry="12" fill="#4ade80" stroke="#ffffff" strokeWidth="2" />
              </g>
              <text x="50" y="54" fontSize="10" fill="#ffffff" fontWeight="bold" textAnchor="middle">SCHOOL</text>
            </>
          );
        case 'mount-fuji':
          return (
            <>
              {/* Mountain shape */}
              <polygon points="50,15 10,85 90,85" fill="#1e3a8a" stroke="#1d4ed8" strokeWidth="4" />
              {/* Snow cap */}
              <polygon points="50,15 38,42 44,48 50,42 56,48 62,42" fill="#ffffff" />
              <g clipPath={`url(#${uniqueId})`}>
                <polygon points="50,15 10,85 90,85" fill="#3b82f6" />
                <polygon points="50,15 38,42 44,48 50,42 56,48 62,42" fill="#f8fafc" />
              </g>
              {/* Sun */}
              <circle cx="80" cy="30" r="8" fill="#ef4444" />
            </>
          );
        case 'salt-grain':
          return (
            <>
              <polygon points="40,35 60,35 68,55 50,75 32,55" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
              <g clipPath={`url(#${uniqueId})`}>
                <polygon points="40,35 60,35 68,55 50,75 32,55" fill="#cbd5e1" />
              </g>
              <circle cx="50" cy="48" r="2" fill="#94a3b8" />
            </>
          );
        case 'mosquito':
          return (
            <>
              {/* Wings */}
              <ellipse cx="38" cy="40" rx="6" ry="18" fill="#e0f2fe" opacity="0.7" stroke="#94a3b8" strokeWidth="1" transform="rotate(-30 38 40)" />
              <ellipse cx="62" cy="40" rx="6" ry="18" fill="#e0f2fe" opacity="0.7" stroke="#94a3b8" strokeWidth="1" transform="rotate(30 62 40)" />
              {/* Body */}
              <ellipse cx="50" cy="50" rx="6" ry="16" fill="#475569" stroke="#334155" strokeWidth="2" />
              <circle cx="50" cy="32" r="7" fill="#334155" />
              {/* Legs */}
              <path d="M44 50 L30 54 L20 62" fill="none" stroke="#475569" strokeWidth="2" />
              <path d="M56 50 L70 54 L80 62" fill="none" stroke="#475569" strokeWidth="2" />
              {/* Needle proboscis */}
              <line x1="50" y1="25" x2="50" y2="15" stroke="#dc2626" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <circle cx="50" cy="32" r="7" fill="#dc2626" />
                <ellipse cx="50" cy="50" rx="6" ry="16" fill="#dc2626" />
              </g>
            </>
          );
        case 'apple':
          return (
            <>
              {/* Apple body */}
              <path d="M50 82 C30 82 20 66 20 48 C20 30 36 24 50 32 C64 24 80 30 80 48 C80 66 70 82 50 82 Z" fill="#fee2e2" stroke="#dc2626" strokeWidth="4" />
              {/* Stem & Leaf */}
              <path d="M50 32 Q53 18 62 14" fill="none" stroke="#78350f" strokeWidth="3" />
              <path d="M56 22 Q66 22 66 14 Q58 18 56 22 Z" fill="#22c55e" />
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M50 82 C30 82 20 66 20 48 C20 30 36 24 50 32 C64 24 80 30 80 48 C80 66 70 82 50 82 Z" fill="#ef4444" />
              </g>
            </>
          );
        case 'school-bag':
          return (
            <>
              {/* Backpack base */}
              <rect x="25" y="25" width="50" height="60" rx="8" fill="#fee2e2" stroke="#b91c1c" strokeWidth="4" />
              {/* Cover flap */}
              <path d="M25 25 H75 V60 Q50 70 25 60 Z" fill="#fca5a5" stroke="#b91c1c" strokeWidth="4" />
              {/* Buckle */}
              <rect x="46" y="55" width="8" height="12" rx="1" fill="#facc15" stroke="#a16207" strokeWidth="1" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="25" y="25" width="50" height="60" rx="8" fill="#ef4444" />
                <path d="M25 25 H75 V60 Q50 70 25 60 Z" fill="#b91c1c" />
              </g>
            </>
          );
        case 'dog':
          return (
            <>
              {/* Dog head shape */}
              <path d="M30 40 Q20 50 25 68 Q30 85 50 85 Q70 85 75 68 Q80 50 70 40 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
              {/* Ears */}
              <polygon points="23,43 10,20 33,35" fill="#f59e0b" stroke="#d97706" strokeWidth="4" />
              <polygon points="77,43 90,20 67,35" fill="#f59e0b" stroke="#d97706" strokeWidth="4" />
              {/* Snout */}
              <ellipse cx="50" cy="65" rx="12" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="50" cy="61" rx="5" ry="3" fill="#1e293b" />
              {/* Eyes */}
              <circle cx="40" cy="50" r="4" fill="#1e293b" />
              <circle cx="60" cy="50" r="4" fill="#1e293b" />
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M30 40 Q20 50 25 68 Q30 85 50 85 Q70 85 75 68 Q80 50 70 40 Z" fill="#f59e0b" />
                <polygon points="23,43 10,20 33,35" fill="#b45309" />
                <polygon points="77,43 90,20 67,35" fill="#b45309" />
              </g>
            </>
          );
        case 'desk':
          return (
            <>
              {/* Desk tabletop */}
              <rect x="15" y="30" width="70" height="15" rx="2" fill="#fed7aa" stroke="#ca8a04" strokeWidth="3" />
              {/* Legs */}
              <line x1="22" y1="45" x2="22" y2="85" stroke="#475569" strokeWidth="4" />
              <line x1="78" y1="45" x2="78" y2="85" stroke="#475569" strokeWidth="4" />
              {/* Drawers */}
              <rect x="25" y="45" width="50" height="10" fill="#f7fee7" stroke="#475569" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="15" y="30" width="70" height="15" rx="2" fill="#ca8a04" />
              </g>
            </>
          );
        case 'car':
          return (
            <>
              {/* Car body top */}
              <path d="M30 45 Q35 25 50 25 Q65 25 70 45 Z" fill="#fee2e2" stroke="#dc2626" strokeWidth="4" />
              {/* Car body bottom */}
              <rect x="15" y="45" width="70" height="25" rx="5" fill="#fca5a5" stroke="#dc2626" strokeWidth="4" />
              {/* Wheels */}
              <circle cx="32" cy="70" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="68" cy="70" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="15" y="45" width="70" height="25" rx="5" fill="#ef4444" />
                <path d="M30 45 Q35 25 50 25 Q65 25 70 45 Z" fill="#b91c1c" />
              </g>
            </>
          );
        // --- Area SVG Components ---
        case 'stamp':
          return (
            <>
              {/* Postage Stamp */}
              <rect x="20" y="20" width="60" height="60" rx="4" fill="#fee2e2" stroke="#ea580c" strokeWidth="4" strokeDasharray="3 3" />
              <rect x="25" y="25" width="50" height="50" rx="2" fill="#fff" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="25" y="25" width="50" height="50" rx="2" fill="#fdba74" />
                <circle cx="50" cy="50" r="12" fill="#ea580c" opacity="0.8" />
              </g>
            </>
          );
        case 'notebook-open':
          return (
            <>
              {/* Open Notebook */}
              <rect x="10" y="25" width="80" height="50" rx="4" fill="#ffffff" stroke="#0ea5e9" strokeWidth="4" />
              <line x1="50" y1="25" x2="50" y2="75" stroke="#0ea5e9" strokeWidth="4" />
              {/* Lines */}
              <line x1="18" y1="40" x2="42" y2="40" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="18" y1="50" x2="42" y2="50" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="18" y1="60" x2="42" y2="60" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="58" y1="40" x2="82" y2="40" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="58" y1="50" x2="82" y2="50" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="58" y1="60" x2="82" y2="60" stroke="#cbd5e1" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="10" y="25" width="80" height="50" rx="4" fill="#e0f2fe" />
                <line x1="50" y1="25" x2="50" y2="75" stroke="#0284c7" strokeWidth="4" />
                <line x1="18" y1="40" x2="42" y2="40" stroke="#93c5fd" strokeWidth="2" />
                <line x1="18" y1="50" x2="42" y2="50" stroke="#93c5fd" strokeWidth="2" />
                <line x1="18" y1="60" x2="42" y2="60" stroke="#93c5fd" strokeWidth="2" />
                <line x1="58" y1="40" x2="82" y2="40" stroke="#93c5fd" strokeWidth="2" />
                <line x1="58" y1="50" x2="82" y2="50" stroke="#93c5fd" strokeWidth="2" />
                <line x1="58" y1="60" x2="82" y2="60" stroke="#93c5fd" strokeWidth="2" />
              </g>
            </>
          );
        case 'tatami-mat':
          return (
            <>
              {/* Tatami Mat */}
              <rect x="15" y="30" width="70" height="40" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
              {/* Black borders on long sides */}
              <rect x="15" y="30" width="70" height="4" fill="#1e293b" />
              <rect x="15" y="66" width="70" height="4" fill="#1e293b" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="15" y="30" width="70" height="40" fill="#a3e635" />
                <rect x="15" y="30" width="70" height="4" fill="#1e293b" />
                <rect x="15" y="66" width="70" height="4" fill="#1e293b" />
              </g>
              {/* Woven lines */}
              <line x1="30" y1="34" x2="30" y2="66" stroke="#ca8a04" strokeWidth="1" opacity="0.3" />
              <line x1="50" y1="34" x2="50" y2="66" stroke="#ca8a04" strokeWidth="1" opacity="0.3" />
              <line x1="70" y1="34" x2="70" y2="66" stroke="#ca8a04" strokeWidth="1" opacity="0.3" />
            </>
          );
        case 'parking-spot':
          return (
            <>
              {/* Parking Spot */}
              <rect x="15" y="15" width="70" height="70" fill="#475569" stroke="#94a3b8" strokeWidth="4" />
              {/* Lines */}
              <line x1="25" y1="15" x2="25" y2="85" stroke="#ffffff" strokeWidth="3" />
              <line x1="75" y1="15" x2="75" y2="85" stroke="#ffffff" strokeWidth="3" />
              {/* A simple car outline inside */}
              <path d="M35 55 Q40 40 50 40 Q60 40 65 55 Z" fill="#94a3b8" opacity="0.4" />
              <rect x="28" y="55" width="44" height="15" rx="3" fill="#94a3b8" opacity="0.4" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="15" y="15" width="70" height="70" fill="#334155" />
                <line x1="25" y1="15" x2="25" y2="85" stroke="#facc15" strokeWidth="3" />
                <line x1="75" y1="15" x2="75" y2="85" stroke="#facc15" strokeWidth="3" />
                {/* Colored Car */}
                <path d="M35 55 Q40 40 50 40 Q60 40 65 55 Z" fill="#ef4444" />
                <rect x="28" y="55" width="44" height="15" rx="3" fill="#dc2626" />
                <circle cx="38" cy="70" r="5" fill="#1e293b" />
                <circle cx="62" cy="70" r="5" fill="#1e293b" />
              </g>
            </>
          );
        case 'tennis-court':
          return (
            <>
              {/* Tennis Court */}
              <rect x="10" y="20" width="80" height="60" rx="3" fill="#15803d" stroke="#ffffff" strokeWidth="3" />
              {/* Court Lines */}
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ffffff" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="#ffffff" strokeWidth="3" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="10" y="20" width="80" height="60" rx="3" fill="#22c55e" />
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ffffff" strokeWidth="2" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="#ffffff" strokeWidth="3" />
              </g>
              <line x1="10" y1="50" x2="90" y2="50" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />
            </>
          );
        case 'tokyo-dome':
          return (
            <>
              {/* Tokyo Dome structural outline */}
              <ellipse cx="50" cy="55" rx="45" ry="30" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
              <path d="M5 55 C5 25 95 25 95 55" fill="none" stroke="#64748b" strokeWidth="3" />
              {/* Grid Ceiling */}
              <path d="M15 45 C30 35 70 35 85 45" fill="none" stroke="#cbd5e1" strokeWidth="1" />
              <path d="M25 38 C35 30 65 30 75 38" fill="none" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="50" y1="25" x2="50" y2="55" stroke="#cbd5e1" strokeWidth="1" />
              <g clipPath={`url(#${uniqueId})`}>
                <ellipse cx="50" cy="55" rx="45" ry="30" fill="#93c5fd" />
                <path d="M5 55 C5 25 95 25 95 55" fill="none" stroke="#2563eb" strokeWidth="3" />
                <path d="M15 45 C30 35 70 35 85 45" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                <path d="M25 38 C35 30 65 30 75 38" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="50" y1="25" x2="50" y2="55" stroke="#3b82f6" strokeWidth="1.5" />
              </g>
            </>
          );
        
        // --- Speed SVG Components ---
        case 'walking':
          return (
            <>
              {/* Walking frame */}
              <circle cx="50" cy="25" r="8" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
              <path d="M50 33 V55 M50 38 L38 48 M50 38 L62 48 M50 55 L42 75 M50 55 L58 75" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
              <g clipPath={`url(#${uniqueId})`}>
                <circle cx="50" cy="25" r="8" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                <path d="M50 33 V55 M50 38 L38 48 M50 38 L62 48 M50 55 L42 75 M50 55 L58 75" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
              </g>
            </>
          );
        case 'bicycle':
          return (
            <>
              {/* Bicycle */}
              <circle cx="30" cy="65" r="14" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <circle cx="70" cy="65" r="14" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <path d="M30 65 L48 45 L66 45 M48 45 L70 65 M54 65 L48 45" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <g clipPath={`url(#${uniqueId})`}>
                <circle cx="30" cy="65" r="14" fill="none" stroke="#0d9488" strokeWidth="4" />
                <circle cx="70" cy="65" r="14" fill="none" stroke="#0d9488" strokeWidth="4" />
                <path d="M30 65 L48 45 L66 45 M48 45 L70 65 M54 65 L48 45" fill="none" stroke="#0d9488" strokeWidth="4" />
              </g>
            </>
          );
        case 'car-speed':
          return (
            <>
              {/* Car speedometer style */}
              <path d="M20 70 A 35 35 0 0 1 80 70" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
              <line x1="50" y1="70" x2="30" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M20 70 A 35 35 0 0 1 80 70" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
                <line x1="50" y1="70" x2="70" y2="40" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
              </g>
              <circle cx="50" cy="70" r="6" fill="#1e293b" />
            </>
          );
        case 'cheetah':
          return (
            <>
              {/* Paw print representation */}
              <circle cx="50" cy="55" r="18" fill="#fed7aa" stroke="#ca8a04" strokeWidth="3" />
              <circle cx="32" cy="32" r="8" fill="#fed7aa" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="50" cy="24" r="8" fill="#fed7aa" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="68" cy="32" r="8" fill="#fed7aa" stroke="#ca8a04" strokeWidth="2" />
              <g clipPath={`url(#${uniqueId})`}>
                <circle cx="50" cy="55" r="18" fill="#f59e0b" />
                <circle cx="32" cy="32" r="8" fill="#f59e0b" />
                <circle cx="50" cy="24" r="8" fill="#f59e0b" />
                <circle cx="68" cy="32" r="8" fill="#f59e0b" />
              </g>
            </>
          );
        case 'shinkansen':
          return (
            <>
              {/* Bullet Train Head */}
              <path d="M15 65 C20 40 45 35 70 35 H85 V65 Z" fill="#f1f5f9" stroke="#1d4ed8" strokeWidth="4" />
              <path d="M70 35 L80 45" stroke="#1d4ed8" strokeWidth="2" />
              <rect x="50" y="42" width="12" height="6" rx="1" fill="#1e293b" />
              <g clipPath={`url(#${uniqueId})`}>
                <path d="M15 65 C20 40 45 35 70 35 H85 V65 Z" fill="#3b82f6" />
                <path d="M15 50 H85" stroke="#1d4ed8" strokeWidth="3" />
                <rect x="50" y="42" width="12" height="6" rx="1" fill="#facc15" />
              </g>
            </>
          );
        case 'sound-speed':
          return (
            <>
              {/* Speaker sound waves */}
              <rect x="15" y="35" width="20" height="30" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
              <polygon points="35,35 60,20 60,80 35,65" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
              {/* Empty waves */}
              <path d="M70 35 A 20 20 0 0 1 70 65" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
              <path d="M80 25 A 35 35 0 0 1 80 75" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
              <g clipPath={`url(#${uniqueId})`}>
                <rect x="15" y="35" width="20" height="30" rx="3" fill="#38bdf8" />
                <polygon points="35,35 60,20 60,80 35,65" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
                <path d="M70 35 A 20 20 0 0 1 70 65" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                <path d="M80 25 A 35 35 0 0 1 80 75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
              </g>
            </>
          );
        default:
          return (
            <text x="50" y="55" fontSize="40" textAnchor="middle">
              {item.emoji}
            </text>
          );
      }
    };

    return (
      <svg
        key={`svg-${index}`}
        className="visual-comparison-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '80px',
          height: '80px',
          transition: 'transform 0.3s ease',
        }}
      >
        <defs>
          <clipPath id={uniqueId}>
            <rect x="0" y={fillHeight} width="100" height={p} />
          </clipPath>
        </defs>
        {getSvgContent()}
      </svg>
    );
  };

  // Determine how to display the items based on the ratio
  const renderVisuals = () => {
    // 0. Empty or zero input state
    if (targetValueBase === 0) {
      return (
        <div className="visual-scale-box empty-scale">
          <div className="huge-emoji">💡</div>
          <p 
            className="visual-helper-text"
            dangerouslySetInnerHTML={{ __html: 'すうじを<ruby>入力<rt>にゅうりょく</rt></ruby>するか、ボタンを<ruby>押<rt>お</rt></ruby>してためしてみよう！' }}
          />
        </div>
      );
    }

    // Edge case: target is zero or extremely tiny
    if (ratio <= 0.0001) {
      return (
        <div className="visual-scale-box tiny-scale">
          <div className="huge-emoji">🔍</div>
          <p 
            className="visual-helper-text"
            dangerouslySetInnerHTML={{ __html: '<ruby>小さ<rt>ちいさ</rt></ruby>すぎて、<ruby>顕微鏡<rt>けんびきょう</rt></ruby>でも<ruby>見<rt>み</rt></ruby>えないかもしれないね！' }}
          />
        </div>
      );
    }

    // 1. Partial display: ratio is less than 1
    if (ratio < 1) {
      return (
        <div className="visual-partial-container">
          <div className="visual-svg-stage">
            {renderItemSvg(ratio, 0)}
          </div>
          <div className="visual-percentage-bar-outer">
            <div 
              className="visual-percentage-bar-inner" 
              style={{ width: `${(ratio * 100).toFixed(1)}%` }} 
            />
          </div>
        </div>
      );
    }

    // 2. Repeats display: ratio is between 1 and 12
    if (ratio <= 12) {
      const fullCount = Math.floor(ratio);
      const partialRatio = ratio - fullCount;
      const svgList = [];

      for (let i = 0; i < fullCount; i++) {
        svgList.push(renderItemSvg(1, i));
      }
      if (partialRatio > 0.05) {
        svgList.push(renderItemSvg(partialRatio, fullCount));
      }

      return (
        <div className="visual-repeats-container">
          <div className="visual-svg-grid">
            {svgList}
          </div>
        </div>
      );
    }

    // 3. Huge scale: ratio is greater than 12
    // We show a stacked representation and a scale number
    return (
      <div className="visual-scale-box huge-scale">
        <div className="visual-stacked-graphics">
          <div className="stacked-svg-wrapper layer-3">{renderItemSvg(1, 2)}</div>
          <div className="stacked-svg-wrapper layer-2">{renderItemSvg(1, 1)}</div>
          <div className="stacked-svg-wrapper layer-1">{renderItemSvg(1, 0)}</div>
        </div>
        <div className="visual-multiplier-bubble">
          <span className="multiplier-times">×</span>
          <span className="multiplier-number">{formatValue(ratio)}</span>
        </div>
        <p 
          className="visual-helper-text"
          dangerouslySetInnerHTML={{ __html: `なんと、${item.name}が <strong>${formatValue(ratio)} ${item.unitName}</strong> も<ruby>並<rt>なら</rt></ruby>ぶよ！` }}
        />
      </div>
    );
  };

  return (
    <div className="visual-comparison-card">
      <div className="card-header-row">
        <span className="card-emoji-icon">{item.emoji}</span>
        <div className="card-title-group">
          <h3 dangerouslySetInnerHTML={{ __html: item.name }} />
          <p className="card-item-subtitle">でたとえると？</p>
        </div>
      </div>
      
      <div className="card-body-visuals">
        {renderVisuals()}
      </div>

      <div className="card-explanation-box">
        <div 
          className="card-ratio-badge"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <p 
          className="card-kid-exclamation"
          dangerouslySetInnerHTML={{ __html: exclamation }}
        />
        <p 
          className="card-description-text"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    </div>
  );
};
