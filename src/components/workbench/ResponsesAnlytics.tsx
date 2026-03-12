import React from 'react'

interface ResponsesAnlyticsProps {
  res: any;
  time: number | null;
  status?: string | number | null;
}

export const ResponsesAnlytics = ({ res, time, status }: ResponsesAnlyticsProps) => {
  if (!res && time === null) return null;

  const isError = res?.error || (typeof status === 'string' && status !== 'SUCCESS');

  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-[#9CA3AF] uppercase tracking-widest">Status</span>
        <span className={`text-[11px] font-bold ${isError ? 'text-red-500' : 'text-emerald-500'}`}>
          {status ?? (res?.error ? 'ERROR' : '200 OK')}
        </span>
      </div>
      <div className="w-[1px] h-6 bg-black/5" />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-[#9CA3AF] uppercase tracking-widest">Type</span>
        <span className="text-[11px] font-bold text-[#111827]">
          {Array.isArray(res) ? "Collection" : typeof res === 'object' ? "Object" : "Scalar"}
        </span>
      </div>
      <div className="w-[1px] h-6 bg-black/5" />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-[#9CA3AF] uppercase tracking-widest">Count</span>
        <span className="text-[11px] font-bold text-[#111827]">
          {Array.isArray(res) ? res.length : 1}
        </span>
      </div>
      <div className="w-[1px] h-6 bg-black/5" />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-[#9CA3AF] uppercase tracking-widest">Latency</span>
        <span className="text-[11px] font-bold text-brand-cyan">{time ?? 0}ms</span>
      </div>
    </div>
  )
}