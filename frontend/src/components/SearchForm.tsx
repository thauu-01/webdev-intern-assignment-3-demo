import { useForm } from 'react-hook-form';

interface SearchFormProps {
  onSearch: (sbd: string) => void;
  isLoading: boolean;
}

interface FormValues {
  sbd: string;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { sbd: '' },
  });

  const onSubmit = (data: FormValues) => {
    onSearch(data.sbd.trim());
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md max-w-2xl">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
        Tra cứu thí sinh
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="sbd" className="block text-sm font-medium text-slate-600 mb-2">
            Số báo danh:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                id="sbd"
                type="text"
                placeholder="Nhập số báo danh (vd: 01000001)"
                {...register('sbd', {
                  required: 'Số báo danh là bắt buộc',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Số báo danh chỉ được chứa chữ số',
                  },
                  minLength: {
                    value: 8,
                    message: 'Số báo danh phải có đúng 8 chữ số',
                  },
                  maxLength: {
                    value: 8,
                    message: 'Số báo danh phải có đúng 8 chữ số',
                  },
                })}
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.sbd ? 'border-red-400 ring-red-500/20' : 'border-slate-200 focus:border-amber-400'
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-slate-950 hover:bg-slate-850 disabled:bg-slate-300 text-white font-bold rounded-lg transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Tra cứu'
              )}
            </button>
          </div>
          {errors.sbd && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <span>⚠️</span> {errors.sbd.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
