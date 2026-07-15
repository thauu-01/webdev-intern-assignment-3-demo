// ── Student ───────────────────────────────────────────────────────────────────
export interface Student {
  sbd: string;
  toan: number | null;
  ngu_van: number | null;
  ngoai_ngu: number | null;
  ma_ngoai_ngu: string | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  sinh_hoc: number | null;
  lich_su: number | null;
  dia_li: number | null;
  gdcd: number | null;
}

export interface SubjectScore {
  key: string;
  label: string;
  score: number | null;
  level: ScoreLevel | null;
  levelLabel: string | null;
}

export interface StudentResult {
  sbd: string;
  ma_ngoai_ngu: string | null;
  subjects: SubjectScore[];
}

// ── Score Level ───────────────────────────────────────────────────────────────
export type ScoreLevel = 'excellent' | 'good' | 'average' | 'poor';

export interface ScoreLevelCount {
  excellent: number; // >= 8
  good: number;      // 6 <= x < 8
  average: number;   // 4 <= x < 6
  poor: number;      // < 4
}

// ── Report ────────────────────────────────────────────────────────────────────
export interface SubjectReport {
  subject: string;
  label: string;
  counts: ScoreLevelCount;
  total: number;
}

export type ReportData = SubjectReport[];

// ── Ranking ───────────────────────────────────────────────────────────────────
export interface RankedStudent {
  rank: number;
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}

// ── API Response wrapper ──────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}
