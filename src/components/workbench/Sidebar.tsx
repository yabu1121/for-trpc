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
  // Router 絞り込み用
  routers: string[];
  selectedRouter: string;
  onRouterChange: (router: string) => void;
  width: number;
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
  routers,
  selectedRouter,
  onRouterChange,
  width,
}: SidebarProps) {
  return (
    <div 
      className="border-r border-[#F3F4F6] bg-gray-200/30 flex flex-col shrink-0 h-full overflow-hidden"
      style={{ width: `${width}px` }}
    >
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
      
      <div className="px-4 pb-4 border-b border-[#F3F4F6]">
        <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-1 mb-2 block">Filter by Router</label>
        <select 
          value={selectedRouter}
          onChange={(e) => onRouterChange(e.target.value)}
          className="w-full bg-white border border-[#F3F4F6] rounded-xl px-4 py-2 text-sm font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-all appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
        >
          <option value="ALL">All Routers</option>
          {routers.map(r => (
            <option key={r} value={r}>{r.replace(/^./, str => str.toUpperCase())}</option>
          ))}
        </select>
      </div>

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
        {Object.entries(tasks).filter(([name, task]) => {
          const typeMatch = task.type === activeTab;
          const routerMatch = selectedRouter === "ALL" || name.toLowerCase().startsWith(selectedRouter.toLowerCase());
          return typeMatch && routerMatch;
        }).map(([name, task]) => {
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
    </div>
  );
}
