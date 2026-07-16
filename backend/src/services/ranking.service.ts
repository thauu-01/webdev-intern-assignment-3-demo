import Student from '../models/Student';
import { SubjectRegistry } from '../domain/SubjectRegistry';

export interface RankedStudentResult {
  rank: number;
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}

export class RankingService {
  private readonly registry = SubjectRegistry.getInstance();

  /**
   * getTop10GroupA
   * Lấy danh sách 10 thí sinh điểm cao nhất khối A (Toán, Lý, Hóa).
   * Loại học sinh thiếu 1 trong 3 môn này.
   */
  async getTop10GroupA(): Promise<RankedStudentResult[]> {
    // Lấy 3 môn khối A từ Registry
    const groupASubjects = this.registry.getGroupASubjects();
    const mathKey = 'toan';
    const physicsKey = 'vat_li';
    const chemistryKey = 'hoa_hoc';

    // lấy đúng keys class đăng ký
    const keys = groupASubjects.map(s => s.key);
    if (!keys.includes(mathKey) || !keys.includes(physicsKey) || !keys.includes(chemistryKey)) {
      throw new Error('RankingService: Thư viện môn học thiếu hoặc sai thông tin khối A');
    }

    const pipeline: any[] = [
      // 1. Chỉ lấy thí sinh có đủ 3 môn (khác null)
      {
        $match: {
          [mathKey]: { $ne: null, $type: 'number' },
          [physicsKey]: { $ne: null, $type: 'number' },
          [chemistryKey]: { $ne: null, $type: 'number' }
        }
      },
      // 2. Chiếu dữ liệu và tính tổng điểm
      {
        $project: {
          sbd: 1,
          [mathKey]: 1,
          [physicsKey]: 1,
          [chemistryKey]: 1,
          total: {
            $round: [
              { $add: [`$${mathKey}`, `$${physicsKey}`, `$${chemistryKey}`] },
              2
            ]
          }
        }
      },
      // 3. Sắp xếp: điểm tổng giảm dần, trùng điểm thì xếp theo SBD tăng dần
      {
        $sort: {
          total: -1 as const,
          sbd: 1 as const
        }
      },
      // 4. Lấy top 10
      {
        $limit: 10
      }
    ];

    const results = await Student.aggregate(pipeline).exec();

    return results.map((item, index) => ({
      rank: index + 1,
      sbd: item.sbd,
      toan: item[mathKey],
      vat_li: item[physicsKey],
      hoa_hoc: item[chemistryKey],
      total: item.total
    }));
  }
}
