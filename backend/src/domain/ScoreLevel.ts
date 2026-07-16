/**
 * ScoreLevel — 4 mức phân loại điểm thi  .
 * - EXCELLENT : >= 8
 * - GOOD      : 6 <= score < 8
 * - AVERAGE   : 4 <= score < 6
 * - POOR      : < 4
 */
export enum ScoreLevel {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  POOR = 'poor',
}

export const SCORE_LEVEL_LABELS: Record<ScoreLevel, string> = {
  [ScoreLevel.EXCELLENT]: 'Giỏi (≥ 8)',
  [ScoreLevel.GOOD]: 'Khá (6 – 8)',
  [ScoreLevel.AVERAGE]: 'Trung bình (4 – 6)',
  [ScoreLevel.POOR]: 'Yếu (< 4)',
};


export const SCORE_THRESHOLDS = {
  EXCELLENT: 8,
  GOOD: 6,
  AVERAGE: 4,
} as const;
