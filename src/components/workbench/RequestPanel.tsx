"use client";

import { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";

interface RequestPanelProps {
  body: string;
  setBody: (body: string) => void;
  onExecute: () => void;
  loading: boolean;
}

export function WorkbenchRequestPanel({ body, setBody, onExecute, loading }: RequestPanelProps) {
  const [jsonError, setJsonError] = useState(false);

  // Tabキーでインデントを入れる
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const val = e.currentTarget.value;
      
      const newVal = val.substring(0, start) + "  " + val.substring(end);
      setBody(newVal);
      
      // カーソル位置を戻す
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  // JSONをフォーマットする
  const formatJson = () => {
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
      setJsonError(false);
    } catch (e) {
      setJsonError(true);
      setTimeout(() => setJsonError(false), 2000);
    }
  };

  return (
    <div className={`h-64 bg-[#0A0A0A] m-4 rounded-xl shrink-0 flex flex-col relative border transition-all duration-300 ${jsonError ? 'border-red-500/50 shadow-lg shadow-red-500/10' : 'border-white/5'}`}>
      <div className="flex px-4 py-2 border-b border-white/5 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${jsonError ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Request JSON</span>
        </div>
        <button 
          onClick={formatJson}
          className="p-1.5 hover:bg-white/5 rounded-md text-[#9CA3AF] hover:text-brand-cyan transition-all"
          title="Format JSON"
        >
          <Sparkles size={12} />
        </button>
      </div>
      <div className="flex-1 relative">
        <textarea 
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            // 簡易バリデーション
            try {
              if (e.target.value.trim()) JSON.parse(e.target.value);
              setJsonError(false);
            } catch {
              // 即座にエラーにはせず、入力中は許容する
            }
          }}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="w-full h-full bg-transparent p-4 text-[13px] font-mono leading-relaxed text-emerald-100 focus:outline-none resize-none custom-scrollbar"
          placeholder='{ "key": "value" }'
        />
        {jsonError && (
          <div className="absolute bottom-2 right-4 flex items-center gap-2 text-red-400 text-[10px] font-bold">
            <AlertCircle size={10} />
            Invalid JSON
          </div>
        )}
      </div>
    </div>
  );
}
