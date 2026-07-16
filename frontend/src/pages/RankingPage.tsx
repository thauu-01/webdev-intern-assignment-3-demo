import { useState, useEffect } from 'react';
import { rankingService } from '../services/rankingService';
import type { RankedStudent } from '../types';

export default function RankingPage() {
  const [rankings, setRankings] = useState<RankedStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "G-Scores - Top 10 Khối A";

    const fetchRankings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await rankingService.getTop10GroupA();
        setRankings(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải bảng xếp hạng.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span>🏆</span> Top 10 Thí sinh Khối A Điểm Cao Nhất
        </h1>
        <p className="text-slate-600 mt-2">
          Bảng xếp hạng 10 thí sinh có tổng điểm 3 môn Toán, Vật lý, Hóa học cao nhất cả nước.
          Học sinh bị khuyết điểm ở 1 trong 3 môn không được tính vào bảng xếp hạng.
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-200 shadow-md">
          <svg className="animate-spin h-10 w-10 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-slate-700 font-medium">Đang tính toán bảng xếp hạng toàn quốc...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <h3 className="font-bold text-slate-900 mb-1">Không thể tải bảng xếp hạng</h3>
          <p className="text-sm text-slate-700">{error}</p>
        </div>
      )}

      {!isLoading && !error && rankings.length > 0 && (
        <div>
          {/* ── Desktop Table View ── */}
          <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-xl shadow-md">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-sm font-semibold">
                  <th className="px-6 py-4 text-center w-20">Hạng</th>
                  <th className="px-6 py-4">Số báo danh</th>
                  <th className="px-6 py-4 text-center">Toán</th>
                  <th className="px-6 py-4 text-center">Vật lý</th>
                  <th className="px-6 py-4 text-center">Hóa học</th>
                  <th className="px-6 py-4 text-right pr-8">Tổng điểm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {rankings.map((student) => (
                  <tr key={student.sbd} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${student.rank === 1
                            ? 'bg-yellow-400 text-slate-950 ring-4 ring-yellow-400/20'
                            : student.rank === 2
                              ? 'bg-slate-300 text-slate-950 ring-4 ring-slate-300/20'
                              : student.rank === 3
                                ? 'bg-amber-600 text-white ring-4 ring-amber-600/20'
                                : 'bg-slate-200 text-slate-600'
                          }`}
                      >
                        {student.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-700">{student.sbd}</td>
                    <td className="px-6 py-4 text-center font-semibold">{student.toan.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center font-semibold">{student.vat_li.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center font-semibold">{student.hoa_hoc.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right pr-8 font-black text-amber-600 text-lg">
                      {student.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Card List View ── */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {rankings.map((student) => (
              <div
                key={student.sbd}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-base shrink-0 ${student.rank === 1
                        ? 'bg-yellow-400 text-slate-950'
                        : student.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : student.rank === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                  >
                    #{student.rank}
                  </span>
                  <div>
                    <h3 className="font-mono font-bold text-slate-800 text-lg">{student.sbd}</h3>
                    <div className="flex gap-3 text-xs text-slate-500 mt-1">
                      <span>Toán: <strong className="text-slate-700">{student.toan}</strong></span>
                      <span>Lý: <strong className="text-slate-700">{student.vat_li}</strong></span>
                      <span>Hóa: <strong className="text-slate-700">{student.hoa_hoc}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-bold">Tổng điểm</div>
                  <div className="text-xl font-black text-amber-650 mt-0.5" style={{ color: '#d97706' }}>{student.total.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
