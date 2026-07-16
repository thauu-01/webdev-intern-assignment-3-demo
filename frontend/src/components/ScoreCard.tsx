import type { StudentResult } from '../types';

interface ScoreCardProps {
  result: StudentResult | null;
}

export default function ScoreCard({ result }: ScoreCardProps) {
  if (!result) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md max-w-2xl">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          Bảng điểm chi tiết
        </h2>
        <p className="text-slate-500">Nhập số báo danh để xem bảng điểm chi tiết của thí sinh.</p>
      </div>
    );
  }

  // Helper color logic based on level
  const getLevelColor = (level: string | null) => {
    switch (level) {
      case 'excellent':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'good':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'average':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'poor':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md max-w-2xl animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Bảng điểm chi tiết
          </h2>
          <p className="text-sm text-slate-500 mt-1">Số báo danh: <span className="font-semibold text-amber-600">{result.sbd}</span></p>
        </div>
        {result.ma_ngoai_ngu && (
          <span className="mt-2 sm:mt-0 text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200 self-start sm:self-auto">
            Ngoại ngữ: {result.ma_ngoai_ngu}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {result.subjects.map((sub) => (
          <div
            key={sub.key}
            className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
          >
            <span className="text-sm text-slate-500 font-medium">{sub.label}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-800">
                {sub.score !== null ? sub.score.toFixed(2).replace('.00', '') : '—'}
              </span>
              {sub.score !== null && sub.level && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${getLevelColor(sub.level)}`}>
                  {sub.level === 'excellent' ? 'Giỏi' : sub.level === 'good' ? 'Khá' : sub.level === 'average' ? 'TB' : 'Yếu'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
