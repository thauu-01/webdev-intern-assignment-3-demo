import { Subject } from './Subject';
import { MathSubject }       from './subjects/MathSubject';
import { LiteratureSubject } from './subjects/LiteratureSubject';
import { EnglishSubject }    from './subjects/EnglishSubject';
import { PhysicsSubject }    from './subjects/PhysicsSubject';
import { ChemistrySubject }  from './subjects/ChemistrySubject';
import { BiologySubject }    from './subjects/BiologySubject';
import { HistorySubject }    from './subjects/HistorySubject';
import { GeographySubject }  from './subjects/GeographySubject';
import { CivicsSubject }     from './subjects/CivicsSubject';

/**
 * SubjectRegistry — Singleton quản lý danh sách tất cả môn học.
 *
 * NGUYÊN TẮC QUAN TRỌNG:
 *   - Mọi service (ReportService, RankingService) PHẢI lấy danh sách môn
 *     qua SubjectRegistry — không được hardcode tên môn trong service.
 *   - Khi thêm môn mới: chỉ cần tạo subclass Subject và đăng ký tại đây.
 *
 * Cách dùng:
 *   const registry = SubjectRegistry.getInstance();
 *   const allSubjects = registry.getAll();
 *   const math = registry.getByKey('toan');
 *   const groupA = registry.getGroupSubjects('A');
 */
export class SubjectRegistry {
  // ── Singleton instance ──────────────────────────────────────────────────────
  private static instance: SubjectRegistry | null = null;

  // ── Danh sách môn — Map để lookup O(1) theo key ─────────────────────────────
  private readonly subjects: Map<string, Subject>;

  // ── Constructor private — chỉ tạo qua getInstance() ────────────────────────
  private constructor() {
    this.subjects = new Map();
    this.register(
      new MathSubject(),
      new LiteratureSubject(),
      new EnglishSubject(),
      new PhysicsSubject(),
      new ChemistrySubject(),
      new BiologySubject(),
      new HistorySubject(),
      new GeographySubject(),
      new CivicsSubject(),
    );
  }

  // ── Đăng ký môn vào Map ─────────────────────────────────────────────────────
  private register(...subjects: Subject[]): void {
    for (const subject of subjects) {
      if (this.subjects.has(subject.key)) {
        throw new Error(`SubjectRegistry: duplicate key "${subject.key}"`);
      }
      this.subjects.set(subject.key, subject);
    }
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  /** Trả về singleton instance */
  static getInstance(): SubjectRegistry {
    if (!SubjectRegistry.instance) {
      SubjectRegistry.instance = new SubjectRegistry();
    }
    return SubjectRegistry.instance;
  }

  /**
   * getAll — trả về tất cả môn học theo thứ tự đăng ký.
   * Dùng cho ReportService: lặp qua tất cả môn để tính thống kê.
   */
  getAll(): Subject[] {
    return Array.from(this.subjects.values());
  }

  /**
   * getByKey — lấy môn theo field key (tên cột CSV/MongoDB).
   * Trả về undefined nếu không tìm thấy.
   */
  getByKey(key: string): Subject | undefined {
    return this.subjects.get(key);
  }

  /**
   * getByKeyOrThrow — lấy môn theo key, ném lỗi nếu không tìm thấy.
   * Dùng khi bắt buộc phải có môn đó (e.g. validate query param).
   */
  getByKeyOrThrow(key: string): Subject {
    const subject = this.subjects.get(key);
    if (!subject) {
      const valid = Array.from(this.subjects.keys()).join(', ');
      throw new Error(`Subject "${key}" not found. Valid keys: ${valid}`);
    }
    return subject;
  }

  /**
   * getGroupSubjects — lấy danh sách môn thuộc một khối thi.
   * Dùng SubjectRegistry.isCoreSubjectFor() của từng môn.
   *
   * Ví dụ: getGroupSubjects('A') → [MathSubject, PhysicsSubject, ChemistrySubject]
   */
  getGroupSubjects(group: string): Subject[] {
    return this.getAll().filter((s) => s.isCoreSubjectFor(group));
  }

  /**
   * getGroupASubjects — shorthand cho khối A (Toán, Lý, Hóa).
   * Dùng cho RankingService Top 10 Khối A.
   */
  getGroupASubjects(): Subject[] {
    return this.getGroupSubjects('A');
  }

  /**
   * hasKey — kiểm tra key có hợp lệ không.
   * Dùng cho validator của API /report?subject=<key>
   */
  hasKey(key: string): boolean {
    return this.subjects.has(key);
  }

  /**
   * getAllKeys — danh sách tất cả key hợp lệ.
   * Dùng cho error message khi validate.
   */
  getAllKeys(): string[] {
    return Array.from(this.subjects.keys());
  }
}
