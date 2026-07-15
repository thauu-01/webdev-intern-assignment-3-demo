import { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import StatisticsChart from '../components/StatisticsChart';
import type { SubjectReport } from '../types';

const SUBJECT_OPTIONS = [
  { key: 'toan', label: 'Toán' },
  { key: 'ngu_van', label: 'Ngữ văn' },
  { key: 'ngoai_ngu', label: 'Ngoại ngữ' },
  { key: 'vat_li', label: 'Vật lí' },
  { key: 'hoa_hoc', label: 'Hóa học' },
  { key: 'sinh_hoc', label: 'Sinh học' },
  { key: 'lich_su', label: 'Lịch sử' },
  { key: 'dia_li', label: 'Địa lí' },
  { key: 'gdcd', label: 'GDCD' },
];

export default function StatisticsPage() {
  const [selectedSubject, setSelectedSubject] = useState('toan');
  const [report, setReport] = useState<SubjectReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reportService.getReport(selectedSubject);
        if (data && data.length > 0) {
          setReport(data[0]);
        }
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải báo cáo thống kê.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [selectedSubject]);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Thống kê điểm thi theo môn</h1>
          <p className="text-slate-600 mt-2">
            Phân tích tỷ lệ phân bổ điểm số theo 4 mức Giỏi, Khá, Trung bình, Yếu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="subject-select" className="text-sm font-medium text-slate-600 whitespace-nowrap">
            Chọn môn học:
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          >
            {SUBJECT_OPTIONS.map((sub) => (
              <option key={sub.key} value={sub.key}>
                {sub.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-200 shadow-md">
          <svg className="animate-spin h-10 w-10 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-slate-700 font-medium">Đang tổng hợp dữ liệu thống kê môn học...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
          <h3 className="font-bold text-white mb-1">Không thể tải dữ liệu</h3>
          <p className="text-sm text-slate-300">{error}</p>
        </div>
      )}

      {!isLoading && !error && report && <StatisticsChart report={report} />}
    </div>
  );
}
