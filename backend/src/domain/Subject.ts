import { ScoreLevel, SCORE_THRESHOLDS } from './ScoreLevel';

/**
 * Subject — Abstract base class cho tất cả các môn học.
 * Mỗi môn học cụ thể (Toán, Lý, Hóa, ...) là một subclass .
 * Thiết kế này đảm bảo:
 *  - Mọi môn đều có cùng interface (key, label, classify, isCoreSubjectFor)
 *  - Logic phân loại điểm tập trung tại một nơi (không hardcode rải rác)
 *  - Dễ mở rộng: thêm môn mới chỉ cần tạo subclass mới
 */
export abstract class Subject {

  abstract readonly key: string;
  abstract readonly label: string;

  classify(score: number): ScoreLevel {
    if (score >= SCORE_THRESHOLDS.EXCELLENT) return ScoreLevel.EXCELLENT;
    if (score >= SCORE_THRESHOLDS.GOOD) return ScoreLevel.GOOD;
    if (score >= SCORE_THRESHOLDS.AVERAGE) return ScoreLevel.AVERAGE;
    return ScoreLevel.POOR;
  }

  /**
   * isCoreSubjectFor — kiểm tra môn có thuộc khối thi .
   * Subclass override method này để khai báo thuộc khối nào.
   * Default: không thuộc khối nào.
   */
  isCoreSubjectFor(_group: string): boolean {
    return false;
  }

  /**
   * toString —  debugging
   */
  toString(): string {
    return `Subject(${this.key}: ${this.label})`;
  }
}
