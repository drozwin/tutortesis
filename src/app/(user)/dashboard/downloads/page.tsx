// /app/(dashboard)/dashboard/downloads/page.tsx
import { MOCK_PRODUCTS } from '@/lib/api-mock';
import { DownloadCloud } from 'lucide-react';

export default function UserDownloads() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold uppercase text-[10px]">
                {product.category.substring(0,2)}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{product.title}</h4>
                <p className="text-xs text-slate-500">Purchased on March 2026</p>
              </div>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-600 transition-colors">
              <DownloadCloud size={16} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}