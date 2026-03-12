"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Activity, Check, Copy, Loader2 } from "lucide-react";

interface ResponsePanelProps {
  res: any;
  loading: boolean;
  time: number | null;
  copied: boolean;
  onCopy: () => void;
  onClear: () => void;
}

export function WorkbenchResponsePanel({
  res,
  loading,
  time,
  copied,
  onCopy,
  onClear,
}: ResponsePanelProps) {
  return (
    <div className="flex-1 overflow-auto p-8 relative custom-scrollbar">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <Loader2 size={40} className="animate-spin text-brand-cyan" />
          </motion.div>
        )}

        {res && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-xl shadow-black/5 flex flex-col gap-1">
                <span className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest">Data Structure</span>
                <span className="text-lg font-bold text-[#111827]">{Array.isArray(res) ? "Collection" : typeof res === 'object' ? "Object" : "Scalar"}</span>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-xl shadow-black/5 flex flex-col gap-1">
                <span className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest">Record Count</span>
                <span className="text-lg font-bold text-[#111827]">{Array.isArray(res) ? res.length : 1}</span>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-xl shadow-black/5 flex flex-col gap-1">
                <span className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest">Latency</span>
                <span className="text-lg font-bold text-brand-cyan">{time}ms</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                 <div className="h-6 w-1 rounded-full bg-brand-cyan" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111827]">Response Body</span>
               </div>
               <div className="flex items-center gap-2">
                 <button 
                   onClick={onClear}
                   className="text-[10px] font-black tracking-widest flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#9CA3AF] hover:text-[#FF5F56] border border-[#F3F4F6] hover:shadow-md transition-all duration-300"
                 >
                    CLEAR
                 </button>
                 <button 
                   onClick={onCopy}
                   className={`text-[10px] font-black tracking-widest flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                     copied ? "bg-emerald-50 text-emerald-600 shadow-sm" : "bg-white text-[#9CA3AF] hover:text-[#111827] border border-[#F3F4F6] hover:shadow-md"
                   }`}
                 >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "COPIED" : "COPY JSON"}
                 </button>
               </div>
            </div>
            
            <div className="rounded-2xl border border-black/5 bg-[#050505] shadow-2xl overflow-hidden group relative">
              <div className="p-6 overflow-x-auto">
                <pre className="text-[13px] font-mono leading-relaxed tabular-nums">
                  {JSON.stringify(res, null, 2).split('\n').map((line, i) => {
                    const isKey = line.includes('":');
                    const isString = line.includes('"') && !isKey;
                    const isNumber = /\d/.test(line) && !line.includes('"');
                    
                    return (
                      <div key={i} className="flex group/line hover:bg-white/5 transition-colors">
                        <span className="w-10 shrink-0 text-white/10 select-none text-[10px] text-right pr-6 pt-1 font-bold group-hover/line:text-white/30 transition-colors">{i + 1}</span>
                        <span className={`
                          ${isKey ? "text-white" : ""}
                          ${isString ? "text-emerald-400" : ""}
                          ${isNumber ? "text-amber-400" : ""}
                          ${!isKey && !isString && !isNumber ? "text-white/60" : ""}
                        `}>{line}</span>
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
