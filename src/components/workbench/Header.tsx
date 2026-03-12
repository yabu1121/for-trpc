"use client";

import { Clock, Activity, Play } from "lucide-react";
import type { Task } from "./types";

interface HeaderProps {
  selectedTaskName: string;
  selectedTask?: Task;
  time: number | null;
  loading: boolean;
  onExecute: () => void;
}

export function WorkbenchHeader({
  selectedTaskName,
  selectedTask,
  time,
  loading,
  onExecute,
}: HeaderProps) {
  return (
    <div className="h-16 border-b border-[#F3F4F6] px-8 flex items-center justify-between shrink-0 bg-white/60">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#111827] tracking-tight">{selectedTaskName}</h2>
            <span className="px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-[8px] font-black uppercase tracking-widest">tRPC</span>
          </div>
          <div className="flex items-center gap-3">
            {time !== null && (
              <div className="flex items-center gap-1.5 text-[10px] text-brand-cyan font-bold uppercase tracking-widest mt-0.5">
                <Clock size={10} /> {time}ms latency
              </div>
            )}
            <span className="text-[9px] text-[#9CA3AF] font-medium mt-0.5 truncate max-w-[400px]">
              {selectedTask?.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
