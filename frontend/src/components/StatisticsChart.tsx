import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { SubjectReport } from '../types';

interface StatisticsChartProps {
  report: SubjectReport;
}

export default function StatisticsChart({ report }: StatisticsChartProps) {
  // Dữ liệu chuẩn cho 4 cột tương ứng 4 mức điểm
  const data = [
    {
      name: 'Giỏi (≥8)',
      value: report.counts.excellent,
      color: '#10b981', // emerald-500
    },
    {
      name: 'Khá (6-8)',
      value: report.counts.good,
      color: '#3b82f6', // blue-500
    },
    {
      name: 'Trung bình (4-6)',
      value: report.counts.average,
      color: '#f59e0b', // amber-500
    },
    {
      name: 'Yếu (<4)',
      value: report.counts.poor,
      color: '#ef4444', // red-500
    },
  ];

  const formatNumber = (value: number) => {
    return value.toLocaleString('vi-VN');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Phân phối điểm môn: <span className="text-amber-600">{report.label}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Tổng số thí sinh dự thi: <span className="font-semibold text-slate-700">{formatNumber(report.total)}</span>
          </p>
        </div>
      </div>

      <div className="h-[400px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickFormatter={formatNumber}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip
              formatter={(value: any) => [formatNumber(value), 'Thí sinh']}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '8px',
                color: '#0f172a',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            {/* Vẽ 1 cột Bar duy nhất chứa các Cell màu sắc khác nhau để căn thẳng hàng tuyệt đối */}
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chú thích màu sắc tùy biến chân thực thay thế Legend lỗi của Recharts */}
      <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
          <span>Giỏi (≥8)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-blue-500"></span>
          <span>Khá (6-8)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
          <span>Trung bình (4-6)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-red-500"></span>
          <span>Yếu (&lt;4)</span>
        </div>
      </div>
    </div>
  );
}
