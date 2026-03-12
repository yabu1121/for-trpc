"use client";

import { Terminal, Activity, Play, Loader2 } from "lucide-react";
import type { TaskMap } from "./types";
import { WorkbenchRequestPanel } from "./RequestPanel";

interface SidebarProps {
  tasks: TaskMap;
  activeTab: "query" | "mutation";
  onTabChange: (tab: "query" | "mutation") => void;
  selectedTask: string;
  onSelectTask: (name: string) => void;
  loading: boolean;
  taskLoading: string | null;
  requestBody: string;
  onRequestBodyChange: (body: string) => void;
  onExecute: () => void;
}

export function WorkbenchSidebar({
  tasks,
  activeTab,
  onTabChange,
  selectedTask,
  onSelectTask,
  loading,
  taskLoading,
  requestBody,
  onRequestBodyChange,
  onExecute,
}: SidebarProps) {
  return (
    <div className="w-80 border-r border-[#F3F4F6] bg-white/80 flex flex-col shrink-0">
      <div className="p-6 border-b border-[#F3F4F6] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#111827]">Procedures</span>
        </div>
      </div>

      <WorkbenchRequestPanel 
        body={requestBody}
        setBody={onRequestBodyChange}
        onExecute={onExecute}
        loading={loading}
      />
      
      <div className="flex border-b border-[#F3F4F6] p-2 gap-2 bg-[#F9FAFB]/50">
        <button 
          onClick={() => onTabChange("query")}
          className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'query' ? 'bg-white text-brand-cyan shadow-sm border border-black/5' : 'text-[#9CA3AF] hover:text-[#111827]'}`}
        >
          Queries
        </button>
        <button 
          onClick={() => onTabChange("mutation")}
          className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'mutation' ? 'bg-white text-brand-cyan shadow-sm border border-black/5' : 'text-[#9CA3AF] hover:text-[#111827]'}`}
        >
          Mutations
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {Object.entries(tasks).filter(([_, task]) => task.type === activeTab).map(([name, task]) => {
          const isLoading = taskLoading === name;
          const isSelected = selectedTask === name;
              
          return (
            <div key={name} className="relative group">
              <button
                onClick={() => onSelectTask(name)}
                disabled={loading && !isLoading}
                className={`w-full text-left p-4 pr-12 text-sm rounded-xl transition-all duration-300 relative overflow-hidden flex items-center gap-3 border ${
                  isSelected 
                    ? "bg-[#111827] text-white border-transparent shadow-xl shadow-black/10 scale-[1.02] z-10" 
                    : "bg-white text-[#6B7280] border-[#F3F4F6] hover:border-brand-cyan/30 hover:shadow-md hover:text-[#111827]"
                } ${loading && !isLoading ? "opacity-50 grayscale" : ""}`}
              >
                <span className="font-bold tracking-tight">{name}</span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin text-brand-cyan" />
                  ) : (
                    <div className={`p-1.5 rounded-full transition-transform duration-300 group-hover:scale-110 ${isSelected ? "bg-brand-cyan text-black" : "bg-[#F3F4F6] text-[#9CA3AF]"}`}>
                      <Play size={10} fill="currentColor" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    
      <div className="p-4 border-t border-[#F3F4F6] bg-[#F9FAFB]/50">
        <div className="p-4 rounded-xl border border-dashed border-[#E5E7EB] flex flex-col items-center justify-center text-center gap-2">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Network Status</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold text-[#111827]">CONNECTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
