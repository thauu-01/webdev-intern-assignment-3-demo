/**
 * ScoreLevel — 4 mức phân loại điểm thi theo yêu cầu đề bài.
 *
 * - EXCELLENT : >= 8
 * - GOOD      : 6 <= score < 8
 * - AVERAGE   : 4 <= score < 6
 * - POOR      : < 4
 */
export enum ScoreLevel {
  EXCELLENT = 'excellent',
  GOOD      = 'good',
  AVERAGE   = 'average',
  POOR      = 'poor',
}

/** Human-readable Vietnamese labels for each level */
export const SCORE_LEVEL_LABELS: Record<ScoreLevel, string> = {
  [ScoreLevel.EXCELLENT]: 'Giỏi (≥ 8)',
  [ScoreLevel.GOOD]:      'Khá (6 – 8)',
  [ScoreLevel.AVERAGE]:   'Trung bình (4 – 6)',
  [ScoreLevel.POOR]:      'Yếu (< 4)',
};

/** Thresholds used by Subject.classify() */
export const SCORE_THRESHOLDS = {
  EXCELLENT: 8,
  GOOD:      6,
  AVERAGE:   4,
} as const;
