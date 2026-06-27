'use client';

import React from 'react';
import { CategoryType } from '../lib/references';

interface QuickPresetItem {
  label: React.ReactNode;
  val: string;
  valUnit: string;
}

interface AdjusterItem {
  label: React.ReactNode;
  amount: number;
}

interface PresetButtonsProps {
  category: CategoryType;
  unit: string;
  value: string;
  onChange: (val: string) => void;
  onUnitChange?: (unit: string) => void;
}

export const PresetButtons: React.FC<PresetButtonsProps> = ({
  category,
  unit,
  value,
  onChange,
  onUnitChange,
}) => {
  // Helper to handle adding/subtracting values
  const adjustValue = (amount: number) => {
    const current = parseFloat(value) || 0;
    const next = Math.max(0, current + amount);
    if (next % 1 === 0) {
      onChange(next.toString());
    } else {
      onChange(next.toFixed(2).replace(/\.?0+$/, ''));
    }
  };

  // Helper to append a digit or action from on-screen keypad
  const handleKeypadPress = (key: string) => {
    const valStr = value || '';
    if (key === 'C') {
      onChange('');
      return;
    }
    if (key === '.') {
      if (!valStr.includes('.')) {
        onChange(valStr === '' ? '0.' : valStr + '.');
      }
      return;
    }
    if (key === '←') {
      onChange(valStr.slice(0, -1));
      return;
    }
    // Limit to 6 digits to keep it reasonable
    if (valStr.replace('.', '').length >= 6) return;

    onChange(valStr === '0' ? key : valStr + key);
  };

  // Define Category-specific presets that kids can click to quickly experience
  const getQuickPresets = (): QuickPresetItem[] => {
    switch (category) {
      case 'volume':
        return [
          { label: <>💧 <ruby>水滴<rt>すいてき</rt></ruby> 1<ruby>滴<rt>てき</rt></ruby> (0.05mL)</>, val: '0.05', valUnit: 'mL' },
          { label: <>🥄 <ruby>小さじ<rt>こさじ</rt></ruby> (5mL)</>, val: '5', valUnit: 'mL' },
          { label: <>🥛 ジュース 1<ruby>杯<rt>はい</rt></ruby> (1dL)</>, val: '1', valUnit: 'dL' },
          { label: <>🥛 <ruby>給食<rt>きゅうしょく</rt></ruby>の<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby> (2dL)</>, val: '2', valUnit: 'dL' },
          { label: <>🥛 <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック (3dL)</>, val: '3', valUnit: 'dL' },
          { label: <>🧴 お<ruby>茶<rt>ちゃ</rt></ruby>ペットボトル (500mL)</>, val: '500', valUnit: 'mL' },
          { label: <>🥛 <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>パック<ruby>大<rt>だい</rt></ruby> (1L)</>, val: '1', valUnit: 'L' },
          { label: <>🧴 <ruby>大<rt>おお</rt></ruby>きなボトル (2L)</>, val: '2', valUnit: 'L' },
          { label: <>🪣 お<ruby>掃除<rt>そうじ</rt></ruby>バケツ (10L)</>, val: '10', valUnit: 'L' },
          { label: <>🛁 お<ruby>風呂<rt>ふろ</rt></ruby>1<ruby>杯<rt>はい</rt></ruby> (200L)</>, val: '200', valUnit: 'L' },
        ];
      case 'length':
        return [
          { label: <>🪙 1<ruby>円玉<rt>えんだま</rt></ruby>の<ruby>厚さ<rt>あつさ</rt></ruby> (1.5mm)</>, val: '1.5', valUnit: 'mm' },
          { label: <>🎲 サイコロ (1cm)</>, val: '1', valUnit: 'cm' },
          { label: <>📱 スマホの<ruby>長さ<rt>ながさ</rt></ruby> (15cm)</>, val: '15', valUnit: 'cm' },
          { label: <>📏 ものさし (30cm)</>, val: '30', valUnit: 'cm' },
          { label: <><ruby>傘<rt>かさ</rt></ruby>をひらいた<ruby>幅<rt>はば</rt></ruby> (1m)</>, val: '1', valUnit: 'm' },
          { label: <>🚪 ドアの<ruby>高さ<rt>たかさ</rt></ruby> (2m)</>, val: '2', valUnit: 'm' },
          { label: <>🏊 プールの<ruby>長さ<rt>ながさ</rt></ruby> (25m)</>, val: '25', valUnit: 'm' },
          { label: <>🏃 100m<ruby>走<rt>そう</rt></ruby>コース (100m)</>, val: '100', valUnit: 'm' },
          { label: <>🏫 <ruby>校庭<rt>こうてい</rt></ruby>1<ruby>周<rt>しゅう</rt></ruby> (200m)</>, val: '200', valUnit: 'm' },
          { label: <>🗻 <ruby>富士山<rt>ふじさん</rt></ruby> (3.776km)</>, val: '3.776', valUnit: 'km' },
        ];
      case 'weight':
        return [
          { label: <>🧂 <ruby>塩<rt>しお</rt></ruby> 1<ruby>粒<rt>つぶ</rt></ruby> (0.1mg)</>, val: '0.1', valUnit: 'mg' },
          { label: <>🦟 <ruby>蚊<rt>か</rt></ruby> 1<ruby>匹<rt>ひき</rt></ruby> (2mg)</>, val: '2', valUnit: 'mg' },
          { label: <>🪙 1<ruby>円玉<rt>えんだま</rt></ruby> (1g)</>, val: '1', valUnit: 'g' },
          { label: <>🍎 りんご (300g)</>, val: '300', valUnit: 'g' },
          { label: <>🥛 <ruby>中身入<rt>なかみい</rt></ruby>り<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby> (1kg)</>, val: '1', valUnit: 'kg' },
          { label: <>🎒 ランドセル (4kg)</>, val: '4', valUnit: 'kg' },
          { label: <>🐕 <ruby>柴犬<rt>しばいぬ</rt></ruby> (10kg)</>, val: '10', valUnit: 'kg' },
          { label: <>🏫 <ruby>勉強机<rt>べんきょうづくえ</rt></ruby>とイス (15kg)</>, val: '15', valUnit: 'kg' },
          { label: <><ruby>大人<rt>おとな</rt></ruby>の<ruby>体重<rt>たいじゅう</rt></ruby> (50kg)</>, val: '50', valUnit: 'kg' },
          { label: <>🚗 <ruby>軽自動車<rt>けいじどうしゃ</rt></ruby> (800kg)</>, val: '800', valUnit: 'kg' },
        ];
      case 'area':
        return [
          { label: <>✉️ <ruby>切手<rt>きって</rt></ruby>1<ruby>枚<rt>まい</rt></ruby> (1cm2)</>, val: '1', valUnit: 'cm2' },
          { label: <>📓 ノート<ruby>見開<rt>みひら</rt></ruby>き (400cm2)</>, val: '400', valUnit: 'cm2' },
          { label: <>🧹 <ruby>畳<rt>たたみ</rt></ruby>1<ruby>枚<rt>まい</rt></ruby> (1畳)</>, val: '1', valUnit: '畳' },
          { label: <>🚗 <ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>/1<ruby>坪<rt>つぼ</rt></ruby> (1坪)</>, val: '1', valUnit: '坪' },
          { label: <>🚗 <ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>3<ruby>台分<rt>だいぶん</rt></ruby> (3坪)</>, val: '3', valUnit: '坪' },
          { label: <>🎾 テニスコート (200m2)</>, val: '200', valUnit: 'm2' },
          { label: <>⚾ <ruby>東京<rt>とうきょう</rt></ruby>ドーム (1ドーム)</>, val: '1', valUnit: 'ドーム' },
        ];
      case 'speed':
        return [
          { label: <>🚶 <ruby>歩<rt>ある</rt></ruby>く<ruby>速さ<rt>はやさ</rt></ruby> (<ruby>時速<rt>じそく</rt></ruby>4km)</>, val: '4', valUnit: 'km/h' },
          { label: <>🚶 <ruby>歩<rt>ある</rt></ruby>く<ruby>速さ<rt>はやさ</rt></ruby> (<ruby>秒速<rt>びょうそく</rt></ruby>1.1m)</>, val: '1.1', valUnit: 'm/s' },
          { label: <>🚲 <ruby>自転車<rt>じてんしゃ</rt></ruby> (<ruby>時速<rt>じそく</rt></ruby>15km)</>, val: '15', valUnit: 'km/h' },
          { label: <>🚗 <ruby>自動車<rt>じどうしゃ</rt></ruby> (<ruby>時速<rt>じそく</rt></ruby>60km)</>, val: '60', valUnit: 'km/h' },
          { label: <>🐆 チーター (<ruby>時速<rt>じそく</rt></ruby>100km)</>, val: '100', valUnit: 'km/h' },
          { label: <>🚄 <ruby>新幹線<rt>しんかんせん</rt></ruby> (<ruby>時速<rt>じそく</rt></ruby>300km)</>, val: '300', valUnit: 'km/h' },
          { label: <>🔊 <ruby>音<rt>おと</rt></ruby>の<ruby>速さ<rt>はやさ</rt></ruby> (<ruby>時速<rt>じそく</rt></ruby>1225km)</>, val: '1225', valUnit: 'km/h' },
        ];
      default:
        return [];
    }
  };

  // Define Category-specific adjusters (+/- buttons)
  const getAdjusters = (): AdjusterItem[] => {
    switch (unit) {
      case 'mL':
        return [
          { label: '+10 mL', amount: 10 },
          { label: '+100 mL', amount: 100 },
          { label: '-10 mL', amount: -10 },
          { label: '-100 mL', amount: -100 },
        ];
      case 'dL':
        return [
          { label: '+0.5 dL', amount: 0.5 },
          { label: '+1 dL', amount: 1 },
          { label: '-0.5 dL', amount: -0.5 },
          { label: '-1 dL', amount: -1 },
        ];
      case 'L':
        return [
          { label: '+1 L', amount: 1 },
          { label: '+10 L', amount: 10 },
          { label: '-1 L', amount: -1 },
          { label: '-10 L', amount: -10 },
        ];
      case 'mm':
        return [
          { label: '+1 mm', amount: 1 },
          { label: '+10 mm', amount: 10 },
          { label: '-1 mm', amount: -1 },
          { label: '-10 mm', amount: -10 },
        ];
      case 'cm':
        return [
          { label: '+1 cm', amount: 1 },
          { label: '+10 cm', amount: 10 },
          { label: '-1 cm', amount: -1 },
          { label: '-10 cm', amount: -10 },
        ];
      case 'm':
        return [
          { label: '+1 m', amount: 1 },
          { label: '+10 m', amount: 10 },
          { label: '-1 m', amount: -1 },
          { label: '-10 m', amount: -10 },
        ];
      case 'km':
        return [
          { label: '+1 km', amount: 1 },
          { label: '+10 km', amount: 10 },
          { label: '-1 km', amount: -1 },
          { label: '-10 km', amount: -10 },
        ];
      case 'mg':
        return [
          { label: '+1 mg', amount: 1 },
          { label: '+10 mg', amount: 10 },
          { label: '-1 mg', amount: -1 },
          { label: '-10 mg', amount: -10 },
        ];
      case 'g':
        return [
          { label: '+10 g', amount: 10 },
          { label: '+100 g', amount: 100 },
          { label: '-10 g', amount: -10 },
          { label: '-100 g', amount: -100 },
        ];
      case 'kg':
        return [
          { label: '+1 kg', amount: 1 },
          { label: '+10 kg', amount: 10 },
          { label: '-1 kg', amount: -1 },
          { label: '-10 kg', amount: -10 },
        ];
      case 'cm2':
        return [
          { label: '+10 ㎠', amount: 10 },
          { label: '+100 ㎠', amount: 100 },
          { label: '-10 ㎠', amount: -10 },
          { label: '-100 ㎠', amount: -100 },
        ];
      case 'm2':
        return [
          { label: '+1 ㎡', amount: 1 },
          { label: '+10 ㎡', amount: 10 },
          { label: '-1 ㎡', amount: -1 },
          { label: '-10 ㎡', amount: -10 },
        ];
      case '畳':
        return [
          { label: <>+0.5 <ruby>畳<rt>じょう</rt></ruby></>, amount: 0.5 },
          { label: <>+1 <ruby>畳<rt>じょう</rt></ruby></>, amount: 1 },
          { label: <>-0.5 <ruby>畳<rt>じょう</rt></ruby></>, amount: -0.5 },
          { label: <>-1 <ruby>畳<rt>じょう</rt></ruby></>, amount: -1 },
        ];
      case '坪':
        return [
          { label: <>+0.5 <ruby>坪<rt>つぼ</rt></ruby></>, amount: 0.5 },
          { label: <>+1 <ruby>坪<rt>つぼ</rt></ruby></>, amount: 1 },
          { label: <>-0.5 <ruby>坪<rt>つぼ</rt></ruby></>, amount: -0.5 },
          { label: <>-1 <ruby>坪<rt>つぼ</rt></ruby></>, amount: -1 },
        ];
      case 'ドーム':
        return [
          { label: <>+0.5 <ruby>個分<rt>こぶん</rt></ruby></>, amount: 0.5 },
          { label: <>+1 <ruby>個分<rt>こぶん</rt></ruby></>, amount: 1 },
          { label: <>-0.5 <ruby>個分<rt>こぶん</rt></ruby></>, amount: -0.5 },
          { label: <>-1 <ruby>個分<rt>こぶん</rt></ruby></>, amount: -1 },
        ];
      case 'm/s':
        return [
          { label: '+1 m/s', amount: 1 },
          { label: '+5 m/s', amount: 5 },
          { label: '-1 m/s', amount: -1 },
          { label: '-5 m/s', amount: -5 },
        ];
      case 'km/h':
        return [
          { label: '+10 km/h', amount: 10 },
          { label: '+50 km/h', amount: 50 },
          { label: '-10 km/h', amount: -10 },
          { label: '-50 km/h', amount: -50 },
        ];
      default:
        return [
          { label: '+1', amount: 1 },
          { label: '-1', amount: -1 },
        ];
    }
  };

  const presets = getQuickPresets();
  const adjusters = getAdjusters();

  return (
    <div className="preset-keypad-panel">
      {/* 1. Adjusters (+/-) */}
      <div className="adjuster-section">
        <h4 className="preset-section-title">⚖️ <ruby>数字<rt>すうじ</rt></ruby>をふやす・へらす</h4>
        <div className="adjuster-btn-grid">
          {adjusters.map((adj, index) => {
            const isNegative = adj.amount < 0;
            return (
              <button
                key={index}
                type="button"
                onClick={() => adjustValue(adj.amount)}
                className={`adjuster-button ${isNegative ? 'is-minus' : 'is-plus'}`}
              >
                {adj.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. On-screen Keypad for easy mobile tapping */}
      <div className="keypad-section">
        <h4 className="preset-section-title">🔢 かんたんキーボード</h4>
        <div className="keypad-grid">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKeypadPress(key)}
              className="keypad-button"
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleKeypadPress('C')}
            className="keypad-button clear-button"
            style={{ gridColumn: 'span 3' }}
          >
            <ruby>全部消す<rt>ぜんぶけす</rt></ruby> (クリア)
          </button>
        </div>
      </div>

      {/* 3. Relatable Presets */}
      <div className="presets-section">
        <h4 className="preset-section-title">🌟 おもしろプリセット (ためしてみよう！)</h4>
        <div className="presets-btn-scroll">
          {presets.map((preset, index) => {
            const isSelected = value === preset.val && unit === preset.valUnit;
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (onUnitChange) {
                    onUnitChange(preset.valUnit);
                  } else {
                    const parentForm = document.getElementById('unit-converter-form');
                    if (parentForm) {
                      const unitSelector = parentForm.querySelector('select') as HTMLSelectElement;
                      if (unitSelector) {
                        unitSelector.value = preset.valUnit;
                        const event = new Event('change', { bubbles: true });
                        unitSelector.dispatchEvent(event);
                      }
                    }
                  }
                  onChange(preset.val);
                }}
                className={`preset-bubble ${isSelected ? 'is-selected' : ''}`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
