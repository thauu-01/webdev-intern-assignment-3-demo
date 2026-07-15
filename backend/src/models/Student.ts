import { Schema, model, Document, Model } from 'mongoose';

// ── TypeScript interface ──────────────────────────────────────────────────────

/**
 * Raw student document stored in MongoDB.
 * Field names match the CSV column headers exactly.
 */
export interface IStudent extends Document {
  /** Số báo danh — unique identifier */
  sbd: string;

  // ── Môn bắt buộc ─────────────────────────────────────────────────
  toan:     number | null; // Toán
  ngu_van:  number | null; // Ngữ văn
  ngoai_ngu: number | null; // Ngoại ngữ
  ma_ngoai_ngu: string | null; // Mã ngoại ngữ (N1, N2, …)

  // ── Môn tự chọn (có thể null nếu thí sinh không thi) ─────────────
  vat_li:   number | null; // Vật lí
  hoa_hoc:  number | null; // Hóa học
  sinh_hoc: number | null; // Sinh học
  lich_su:  number | null; // Lịch sử
  dia_li:   number | null; // Địa lí
  gdcd:     number | null; // Giáo dục công dân
}

// ── Mongoose Schema ───────────────────────────────────────────────────────────

const scoreField = { type: Number, default: null, min: 0, max: 10 };

const studentSchema = new Schema<IStudent>(
  {
    sbd: {
      type:     String,
      required: [true, 'Số báo danh là bắt buộc'],
      unique:   true,
      trim:     true,
      index:    true,
    },

    // Mandatory subjects
    toan:         { ...scoreField },
    ngu_van:      { ...scoreField },
    ngoai_ngu:    { ...scoreField },
    ma_ngoai_ngu: { type: String, default: null, trim: true },

    // Elective subjects
    vat_li:   { ...scoreField },
    hoa_hoc:  { ...scoreField },
    sinh_hoc: { ...scoreField },
    lich_su:  { ...scoreField },
    dia_li:   { ...scoreField },
    gdcd:     { ...scoreField },
  },
  {
    collection: 'students',
    timestamps: false, // CSV data has no timestamps
    versionKey: false,
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
// Unique index on sbd is declared via `unique: true` above.
// The migration script (createIndexes.ts) will call ensureIndexes() to
// materialise it, so we do NOT call syncIndexes() here automatically.

// ── Static helpers ────────────────────────────────────────────────────────────
interface IStudentModel extends Model<IStudent> {
  /**
   * Find a student by registration number.
   * Returns null if not found (caller should handle 404).
   */
  findByRegistrationNumber(sbd: string): Promise<IStudent | null>;
}

studentSchema.statics.findByRegistrationNumber = function (
  sbd: string
): Promise<IStudent | null> {
  return this.findOne({ sbd: sbd.trim() }).exec();
};

// ── Export ────────────────────────────────────────────────────────────────────
const Student = model<IStudent, IStudentModel>('Student', studentSchema);

export default Student;
