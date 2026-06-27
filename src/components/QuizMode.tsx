'use client';

import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../lib/quiz';
import { getReferencesByCategory, CATEGORIES, ReferenceItem, CategoryType } from '../lib/references';
import { VisualComparison } from './VisualComparison';

interface QuizModeProps {
  onCategoryChange?: (category: CategoryType) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ onCategoryChange }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Notify parent of the category change for the current question
  useEffect(() => {
    if (questions.length > 0 && onCategoryChange) {
      onCategoryChange(questions[currentIndex].category);
    }
  }, [currentIndex, questions, onCategoryChange]);

  // Initialize and shuffle quiz questions
  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    // Shuffle and pick 5 questions
    const shuffled = [...QUIZ_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (questions.length === 0) {
    return <div className="quiz-loading"><ruby>問題<rt>もんだい</rt></ruby>を<ruby>用意<rt>ようい</rt></ruby>しているよ...⏳</div>;
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);
    
    if (index === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  // Get visual reference values for displaying answer visuals
  const getQuestionVisuals = () => {
    const cat = CATEGORIES.find((c) => c.id === currentQuestion.category);
    const unitInfo = cat?.units.find((u) => u.value === currentQuestion.visualUnit);
    const multiplier = unitInfo?.toBaseMultiplier || 1;
    const valueBase = parseFloat(currentQuestion.visualValue) * multiplier;
    const refItem = getReferencesByCategory(currentQuestion.category).find(
      (r) => r.id === currentQuestion.visualItemId
    );

    return {
      valueBase,
      refItem,
    };
  };

  const { valueBase, refItem } = getQuestionVisuals();

  // Score evaluation badge emoji & comment
  const getScoreFeedback = () => {
    const ratio = score / questions.length;
    if (ratio === 1) return { emoji: '👑', title: 'パーフェクト！', desc: '単位マスターだね！ものすごすぎる！🎉' };
    if (ratio >= 0.6) return { emoji: '🏅', title: 'すごい！', desc: 'たくさん正解できたね！あとすこしで満点！🌟' };
    return { emoji: '👍', title: 'がんばったね！', desc: 'クイズで単位のことがわかってきたかな？もう一度チャレンジしてみよう！💪' };
  };

  const feedback = getScoreFeedback();

  if (isFinished) {
    return (
      <div className="quiz-finished-card">
        <div className="finished-emoji">{feedback.emoji}</div>
        <h2 dangerouslySetInnerHTML={{ __html: feedback.title }} />
        <p className="finished-score">
          <ruby>点数<rt>てんすう</rt></ruby>：<strong>{score}</strong> / {questions.length} <ruby>問正解<rt>もんせいかい</rt></ruby>！
        </p>
        <p className="finished-desc" dangerouslySetInnerHTML={{ __html: feedback.desc }}></p>
        
        <button type="button" onClick={startNewQuiz} className="quiz-restart-button">
          もういちどクイズであそぶ 🔄
        </button>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQuestion.answerIndex;

  return (
    <div className="quiz-container-card">
      {/* Quiz Progress Info */}
      <div className="quiz-progress-header">
        <span className="quiz-badge">🎮 クイズモード</span>
        <span className="quiz-steps">
          <ruby>問題<rt>もんだい</rt></ruby> <strong>{currentIndex + 1}</strong> / {questions.length}
        </span>
      </div>

      {/* Mascot Question Box */}
      <div className="quiz-question-bubble">
        <div className="mascot-avatar">🦁</div>
        <div className="bubble-text">
          <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        </div>
      </div>

      {/* Multiple-Choice Answer Buttons */}
      <div className="quiz-options-grid">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = '';
          if (hasAnswered) {
            if (index === currentQuestion.answerIndex) {
              buttonClass = 'is-correct-option'; // Show green for correct answer
            } else if (index === selectedOption) {
              buttonClass = 'is-incorrect-option'; // Show red if chosen incorrect
            } else {
              buttonClass = 'is-disabled-option';
            }
          }

          return (
            <button
              key={index}
              type="button"
              disabled={hasAnswered}
              onClick={() => handleOptionClick(index)}
              className={`quiz-option-button ${buttonClass}`}
            >
              <span className="option-letter">{['A', 'B', 'C'][index]}</span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel (Shows after answering) */}
      {hasAnswered && (
        <div className={`quiz-feedback-panel ${isCorrect ? 'is-correct' : 'is-incorrect'}`}>
          <div className="feedback-result-row">
            <span className="feedback-result-stamp">
              {isCorrect ? '⭕ せいかい！' : '❌ おしい！'}
            </span>
          </div>
          <p className="feedback-explanation" dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }} />

          {/* Visual Explanation Card */}
          {refItem && (
            <div className="feedback-visual-stage">
              <p className="visual-stage-title">👀 <ruby>目<rt>め</rt></ruby>で<ruby>見<rt>み</rt></ruby>てたしかめてみよう：</p>
              <div className="quiz-embedded-visual">
                <VisualComparison item={refItem} targetValueBase={valueBase} />
              </div>
            </div>
          )}

          <button type="button" onClick={handleNextClick} className="quiz-next-button">
            {currentIndex + 1 < questions.length ? 'つぎのもんだいへ ➡️' : 'けっかを見る 🏁'}
          </button>
        </div>
      )}
    </div>
  );
};
