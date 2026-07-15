import Student from '../models/Student';
import { SubjectRegistry }                 from '../domain/SubjectRegistry';
import { Subject }                         from '../domain/Subject';
import { ScoreLevel, SCORE_LEVEL_LABELS, SCORE_THRESHOLDS } from '../domain/ScoreLevel';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ScoreLevelCount {
  excellent: number;   // >= 8
  good:      number;   // 6 <= x < 8
  average:   number;   // 4 <= x < 6
  poor:      number;   // < 4
}

export interface SubjectReport {
  key:    string;
  label:  string;
  counts: ScoreLevelCount;
  total:  number;          // tổng thí sinh có điểm môn này (không tính null)
  labels: Record<ScoreLevel, string>;
}

// ── Service ────────────────────────────────────────────────────────────────────

export class ReportService {
  private readonly registry = SubjectRegistry.getInstance();

  /**
   * getReport
   *
   * Nếu subjectKey có → thống kê 1 môn
   * Nếu không có     → thống kê tất cả môn
   *
   * Dùng MongoDB $facet để tính song song tất cả môn trong 1 query duy nhất.
   * Không tự viết logic phân loại điểm — dùng SCORE_THRESHOLDS từ domain.
   */
  async getReport(subjectKey?: string): Promise<SubjectReport[]> {
    if (subjectKey) {
      const subject = this.registry.getByKeyOrThrow(subjectKey);
      return [await this.getSubjectReport(subject)];
    }

    // Tất cả môn — chạy song song
    const subjects = this.registry.getAll();
    const results  = await Promise.all(
      subjects.map((s) => this.getSubjectReport(s))
    );
    return results;
  }

  // ── Private ─────────────────────────────────────────────────────────────────

  /**
   * getSubjectReport — dùng MongoDB aggregation để đếm 4 mức điểm.
   *
   * Pipeline:
   *   $match  → chỉ lấy documents có điểm môn đó (loại null)
   *   $group  → đếm theo 4 mức dùng $cond + SCORE_THRESHOLDS
   *
   * Không dùng Subject.classify() trong aggregation vì MongoDB không gọi
   * được JS method. Thay vào đó dùng chính SCORE_THRESHOLDS để build
   * $cond expression — đảm bảo ngưỡng luôn nhất quán với domain layer.
   */
  private async getSubjectReport(subject: Subject): Promise<SubjectReport> {
    const field = subject.key;
    const { EXCELLENT, GOOD, AVERAGE } = SCORE_THRESHOLDS;

    const pipeline = [
      // Loại bỏ document không có điểm môn này
      { $match: { [field]: { $ne: null, $type: 'number' } } },

      // Đếm 4 mức trong 1 $group — cùng ngưỡng với Subject.classify()
      {
        $group: {
          _id: null,
          excellent: {
            $sum: { $cond: [{ $gte: [`$${field}`, EXCELLENT] }, 1, 0] },
          },
          good: {
            $sum: {
              $cond: [
                { $and: [{ $gte: [`$${field}`, GOOD] }, { $lt: [`$${field}`, EXCELLENT] }] },
                1, 0,
              ],
            },
          },
          average: {
            $sum: {
              $cond: [
                { $and: [{ $gte: [`$${field}`, AVERAGE] }, { $lt: [`$${field}`, GOOD] }] },
                1, 0,
              ],
            },
          },
          poor: {
            $sum: { $cond: [{ $lt: [`$${field}`, AVERAGE] }, 1, 0] },
          },
          total: { $sum: 1 },
        },
      },
    ];

    const [result] = await Student.aggregate(pipeline).exec();

    const counts: ScoreLevelCount = result
      ? {
          excellent: result.excellent,
          good:      result.good,
          average:   result.average,
          poor:      result.poor,
        }
      : { excellent: 0, good: 0, average: 0, poor: 0 };

    return {
      key:    subject.key,
      label:  subject.label,
      counts,
      total:  result?.total ?? 0,
      labels: SCORE_LEVEL_LABELS,
    };
  }
}
