import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-32 text-center">
      <p className="text-8xl font-black text-[var(--color-brand-500)]">404</p>
      <h1 className="text-2xl font-bold text-white">Trang không tồn tại</h1>
      <p className="text-slate-400">Đường dẫn bạn yêu cầu không tồn tại.</p>
      <Link
        to="/"
        className="mt-2 rounded-lg bg-[var(--color-brand-600)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-brand-500)] transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
