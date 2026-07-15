import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import ScoreCard from '../components/ScoreCard';
import { studentService } from '../services/studentService';
import type { StudentResult } from '../types';

export default function SearchPage() {
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (sbd: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setHasSearched(true);
    
    try {
      const data = await studentService.getBySbd(sbd);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tra cứu điểm số.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tra cứu điểm thi THPT 2024</h1>
        <p className="text-slate-600 mt-2">
          Nhập số báo danh gồm 8 chữ số để xem bảng điểm chi tiết các môn thi của thí sinh.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200 max-w-2xl shadow-md">
            <svg className="animate-spin h-10 w-10 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-slate-700 font-medium">Đang truy vấn dữ liệu thí sinh...</p>
          </div>
        )}

        {/* Error / Not Found State */}
        {!isLoading && error && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl max-w-2xl flex items-start gap-3 shadow-md">
            <span className="text-lg">❌</span>
            <div>
              <h3 className="font-bold text-slate-900">Tra cứu thất bại</h3>
              <p className="text-sm text-slate-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Success / Init state */}
        {!isLoading && !error && (
          <ScoreCard result={result} />
        )}
      </div>
    </div>
  );
}
