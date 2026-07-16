import Student, { IStudent } from '../models/Student';
import { SubjectRegistry } from '../domain/SubjectRegistry';
import { ScoreLevel, SCORE_LEVEL_LABELS } from '../domain/ScoreLevel';

// ── Types 

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

// ── Service ──

export class StudentService {
  private readonly registry = SubjectRegistry.getInstance();

  /**
   * findByRegistrationNumber
   * Tra cứu điểm theo số báo danh.
   * Trả về null nếu không tìm thấy → controller xử lý 404.
   * Dùng SubjectRegistry để build danh sách môn — không hardcode.
   */
  async findByRegistrationNumber(sbd: string): Promise<StudentResult | null> {
    const student = await Student.findOne({ sbd: sbd.trim() }).lean().exec();

    if (!student) return null;

    return this.toStudentResult(student);
  }

  // ── Private helpers 

  private toStudentResult(student: IStudent): StudentResult {
    const subjects: SubjectScore[] = this.registry.getAll().map((subject) => {
      // Lấy điểm từ document theo key của môn (khớp field MongoDB)
      const raw = student[subject.key as keyof IStudent];
      const score = typeof raw === 'number' ? raw : null;

      // Dùng Subject.classify() từ domain layer 
      const level = score !== null ? subject.classify(score) : null;
      const levelLabel = level ? SCORE_LEVEL_LABELS[level] : null;

      return {
        key: subject.key,
        label: subject.label,
        score,
        level,
        levelLabel,
      };
    });

    return {
      sbd: student.sbd,
      ma_ngoai_ngu: student.ma_ngoai_ngu ?? null,
      subjects,
    };
  }
}
