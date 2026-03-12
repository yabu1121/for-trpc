"use client";

import { Play, Activity } from "lucide-react";

interface RequestPanelProps {
  body: string;
  setBody: (body: string) => void;
  onExecute: () => void;
  loading: boolean;
}

export function WorkbenchRequestPanel({ body, setBody, onExecute, loading }: RequestPanelProps) {
  return (
    <div className="h-48 border-b border-[#F3F4F6] bg-[#050505] shrink-0 flex flex-col relative z-20">
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-white/5 shrink-0">
         <div className="flex gap-1.5 items-center">
           <div className="w-2 h-2 rounded-full bg-brand-cyan" />
           <span className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">Request Body (JSON)</span>
        </div>
        <button 
          onClick={onExecute}
          disabled={loading}
          className="h-7 px-4 rounded-lg bg-brand-cyan text-[#111827] text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-brand-cyan/80 active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          {loading ? <Activity size={10} className="animate-spin" /> : <Play size={10} fill="currentColor" />}
          EXECUTE
        </button>
      </div>
      <textarea 
        value={body}
        onChange={(e) => setBody(e.target.value)}
        spellCheck={false}
        className="flex-1 w-full bg-transparent p-4 text-[13px] font-mono leading-relaxed text-emerald-400 focus:outline-none resize-none custom-scrollbar"
        placeholder="{&#10;  &#34;key&#34;: &#34;value&#34;&#10;}"
      />
    </div>
  );
}
