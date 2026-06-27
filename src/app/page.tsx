'use client';

import React, { useState, useEffect } from 'react';
import { CATEGORIES, getReferencesByCategory, CategoryType, UnitInfo, ReferenceItem, EDUCATIONAL_GUIDES } from '../lib/references';
import { VisualComparison } from '../components/VisualComparison';
import { PresetButtons } from '../components/PresetButtons';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { QuizMode } from '../components/QuizMode';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('volume');
  const [inputValue, setInputValue] = useState<string>('3');
  const [selectedUnit, setSelectedUnit] = useState<string>('dL');
  const [activeMode, setActiveMode] = useState<'explore' | 'quiz'>('explore');
  const [quizCategory, setQuizCategory] = useState<CategoryType>('volume');

  // When category changes, set unit to the default for that category
  useEffect(() => {
    const categoryInfo = CATEGORIES.find((c) => c.id === activeCategory);
    if (categoryInfo && categoryInfo.units.length > 0) {
      if (activeCategory === 'volume') {
        setSelectedUnit('dL');
      } else if (activeCategory === 'length') {
        setSelectedUnit('m');
      } else if (activeCategory === 'weight') {
        setSelectedUnit('g');
      } else if (activeCategory === 'area') {
        setSelectedUnit('坪');
      } else if (activeCategory === 'speed') {
        setSelectedUnit('km/h');
      }
    }
  }, [activeCategory]);

  const categoryInfo = CATEGORIES.find((c) => c.id === activeCategory)!;
  const currentUnitInfo = categoryInfo.units.find((u) => u.value === selectedUnit) || categoryInfo.units[0];

  const handleValueChange = (val: string) => {
    // Basic sanitization for numeric entry
    if (val === '') {
      setInputValue('');
      return;
    }
    // Allow digits, one dot, and up to 3 decimals
    if (/^\d*\.?\d{0,3}$/.test(val)) {
      setInputValue(val);
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
  };

  const inputValueNumeric = parseFloat(inputValue) || 0;
  const targetValueBase = inputValueNumeric * currentUnitInfo.toBaseMultiplier;

  // Fetch all reference items for the category
  const allReferences = getReferencesByCategory(activeCategory);

  // Find the "Hero Item" - the one with the ratio closest to 1 (in log space)
  // Let's exclude things that yield division by zero.
  let heroItem: ReferenceItem = allReferences[0];
  let minDiff = Infinity;

  if (targetValueBase > 0) {
    allReferences.forEach((item) => {
      const ratio = targetValueBase / item.value;
      // We want to find the ratio closest to 1.0 (so log10(ratio) closest to 0)
      const logDiff = Math.abs(Math.log10(ratio));
      if (logDiff < minDiff) {
        minDiff = logDiff;
        heroItem = item;
      }
    });
  } else {
    // If input is 0 or empty, choose a standard default hero
    if (activeCategory === 'volume') {
      heroItem = allReferences.find((r) => r.id === 'paper-cup') || allReferences[0];
    } else if (activeCategory === 'length') {
      heroItem = allReferences.find((r) => r.id === 'ruler-30') || allReferences[0];
    } else if (activeCategory === 'weight') {
      heroItem = allReferences.find((r) => r.id === 'apple') || allReferences[0];
    } else if (activeCategory === 'area') {
      heroItem = allReferences.find((r) => r.id === 'parking-spot') || allReferences[0];
    } else {
      heroItem = allReferences.find((r) => r.id === 'walking') || allReferences[0];
    }
  }

  // Other items are references excluding the hero item
  const otherItems = allReferences.filter((r) => r.id !== heroItem.id);

  const activeThemeCategory = activeMode === 'quiz' ? quizCategory : activeCategory;
  const guide = EDUCATIONAL_GUIDES[activeThemeCategory];

  return (
    <div className={`app-container theme-${activeThemeCategory} mode-${activeMode}`}>
      <header className="app-header">
        <div className="header-logo-row">
          <span className="logo-emoji">🎒</span>
          <h1><ruby>単位<rt>たんい</rt></ruby>しらべ</h1>
        </div>
        <p className="header-tagline">
          <ruby>数字<rt>すうじ</rt></ruby>を<ruby>入<rt>い</rt></ruby>れると、<ruby>身近<rt>みぢか</rt></ruby>なモノでたとえて<ruby>答<rt>こた</rt></ruby>えるよ！
        </p>
      </header>

      {/* Mode Tabs */}
      <section className="mode-tabs-section">
        <div className="mode-tabs-container">
          <button
            type="button"
            onClick={() => setActiveMode('explore')}
            className={`mode-tab-button ${activeMode === 'explore' ? 'is-active' : ''}`}
          >
            🔍 しらべる（<ruby>自由入力<rt>じゆうにゅうりょく</rt></ruby>）
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('quiz')}
            className={`mode-tab-button ${activeMode === 'quiz' ? 'is-active' : ''}`}
          >
            🎮 クイズ（もんだいに<ruby>挑戦<rt>ちょうせん</rt></ruby>）
          </button>
        </div>
      </section>

      <main className="app-main">
        {activeMode === 'quiz' ? (
          <QuizMode onCategoryChange={setQuizCategory} />
        ) : (
          <>
            {/* Category Tabs */}
            <section className="category-tabs-section">
              <div className="tabs-container">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`category-tab-button ${activeCategory === cat.id ? 'is-active' : ''}`}
                  >
                    <span className="tab-emoji">{cat.emoji}</span>
                    <span className="tab-label" dangerouslySetInnerHTML={{ __html: cat.label }} />
                  </button>
                ))}
              </div>
              <p className="category-helper-desc" dangerouslySetInnerHTML={{ __html: `💡 ${categoryInfo.description}` }} />
            </section>

            {/* Input Form Section */}
            <section className="input-form-section">
              <form id="unit-converter-form" onSubmit={(e) => e.preventDefault()} className="converter-form">
                <div className="input-row-group">
                  <div className="number-input-wrapper">
                    <input
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9]*"
                      value={inputValue}
                      onChange={(e) => handleValueChange(e.target.value)}
                      placeholder="すうじを入れてね"
                      className="main-number-input"
                      id="main-number-input-field"
                    />
                    {inputValue && (
                      <button
                        type="button"
                        onClick={() => setInputValue('')}
                        className="input-clear-x"
                        title="クリア"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="unit-select-wrapper">
                    <select
                      value={selectedUnit}
                      onChange={handleUnitChange}
                      className="main-unit-select"
                      id="main-unit-select-field"
                    >
                      {categoryInfo.units.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              {/* Preset keypad / adjustments */}
              <PresetButtons
                category={activeCategory}
                unit={selectedUnit}
                value={inputValue}
                onChange={setInputValue}
                onUnitChange={setSelectedUnit}
              />
            </section>

            {/* Hero Visual Comparison */}
            <section className="hero-visual-section">
              <h2 className="section-title">✨ これが<ruby>一番<rt>いちばん</rt></ruby>わかりやすいよ！</h2>
              <div className="hero-visual-wrapper">
                <VisualComparison item={heroItem} targetValueBase={targetValueBase} />
              </div>
            </section>

            {/* Other Comparisons Grid */}
            <section className="other-visuals-section">
              <h2 className="section-title">🔍 ほかのモノでたとえると？</h2>
              <div className="other-cards-grid">
                {otherItems.map((item) => (
                  <VisualComparison
                    key={item.id}
                    item={item}
                    targetValueBase={targetValueBase}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <AdPlaceholder slot="top-banner" />

      {/* Explanatory Educational Info */}
      <section className="educational-guide-section">
        <div className="guide-card">
          <h3 dangerouslySetInnerHTML={{ __html: guide.title }} />
          <p dangerouslySetInnerHTML={{ __html: guide.description }} />
        </div>
        <div className="guide-card">
          <h3 dangerouslySetInnerHTML={{ __html: guide.tipsTitle }} />
          <ul>
            {guide.tips.map((tip, idx) => (
              <li key={idx}>
                {tip.emoji} <strong dangerouslySetInnerHTML={{ __html: tip.unit }} />: <span dangerouslySetInnerHTML={{ __html: tip.desc }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AdPlaceholder slot="bottom-banner" />

      <footer className="app-footer">
        <p>© 2026 <ruby>単位<rt>たんい</rt></ruby>しらべ ｜ <ruby>子<rt>こ</rt></ruby>どものための<ruby>身近<rt>みぢか</rt></ruby>な<ruby>単位<rt>たんい</rt></ruby>メーター</p>
        <p className="footer-seo-links">
          <ruby>小学生<rt>しょうがくせい</rt></ruby>の<ruby>算数<rt>さんすう</rt></ruby>・しらべ<ruby>学習<rt>がくしゅう</rt></ruby><ruby>向<rt>む</rt></ruby>け<ruby>無料<rt>むりょう</rt></ruby>ツール ｜ かさ・<ruby>長さ<rt>ながさ</rt></ruby>・<ruby>重さ<rt>おもさ</rt></ruby>の<ruby>直感的<rt>ちょっかんてき</rt></ruby><ruby>換算<rt>かんさん</rt></ruby>
        </p>
      </footer>
    </div>
  );
}
