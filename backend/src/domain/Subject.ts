import { ScoreLevel, SCORE_THRESHOLDS } from './ScoreLevel';

/**
 * Subject — Abstract base class cho tất cả các môn học.
 *
 * Mỗi môn học cụ thể (Toán, Lý, Hóa, ...) là một subclass của Subject.
 * Thiết kế này đảm bảo:
 *  - Mọi môn đều có cùng interface (key, label, classify, isCoreSubjectFor)
 *  - Logic phân loại điểm tập trung tại một nơi (không hardcode rải rác)
 *  - Dễ mở rộng: thêm môn mới chỉ cần tạo subclass mới
 */
export abstract class Subject {
  /**
   * key — tên field trong MongoDB document (khớp với tên cột CSV).
   * Ví dụ: 'toan', 'vat_li', 'hoa_hoc'
   */
  abstract readonly key: string;

  /**
   * label — tên hiển thị tiếng Việt.
   * Ví dụ: 'Toán', 'Vật lí', 'Hóa học'
   */
  abstract readonly label: string;

  /**
   * classify — phân loại điểm theo 4 mức.
   *
   * Quy tắc:
   *   >= 8         → EXCELLENT (Giỏi)
   *   6 <= x < 8  → GOOD      (Khá)
   *   4 <= x < 6  → AVERAGE   (Trung bình)
   *   < 4          → POOR      (Yếu)
   *
   * Logic này được định nghĩa MỘT LẦN tại đây — tất cả subclass dùng chung.
   * Không được override ở subclass (dùng `final` pattern).
   */
  classify(score: number): ScoreLevel {
    if (score >= SCORE_THRESHOLDS.EXCELLENT) return ScoreLevel.EXCELLENT;
    if (score >= SCORE_THRESHOLDS.GOOD)      return ScoreLevel.GOOD;
    if (score >= SCORE_THRESHOLDS.AVERAGE)   return ScoreLevel.AVERAGE;
    return ScoreLevel.POOR;
  }

  /**
   * isCoreSubjectFor — kiểm tra môn có thuộc khối thi không.
   *
   * Ví dụ: MathSubject.isCoreSubjectFor('A') → true
   *         MathSubject.isCoreSubjectFor('B') → false
   *
   * Subclass override method này để khai báo thuộc khối nào.
   * Default: không thuộc khối nào.
   */
  isCoreSubjectFor(_group: string): boolean {
    return false;
  }

  /**
   * toString — tiện cho debugging
   */
  toString(): string {
    return `Subject(${this.key}: ${this.label})`;
  }
}
