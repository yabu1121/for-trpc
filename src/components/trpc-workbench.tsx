"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Zap, Search, GripVertical } from "lucide-react";
import { api, vanillaApi } from "~/trpc/react";
import { apiConfig } from "~/server/api-config";
import type { TaskMap } from "./workbench/types";
import { WorkbenchSidebar } from "./workbench/Sidebar";
import { WorkbenchHeader } from "./workbench/Header";
import { WorkbenchResponsePanel } from "./workbench/ResponsePanel";

const useTasks = () => {
  return useMemo((): TaskMap => {
    return Object.fromEntries(
      apiConfig.map((item) => {
        const parts = item.chain.split(".");
        const methodName = parts[parts.length - 1];
        const routerName = parts.length > 1 ? parts[0] : "";
        
        const format = (s: string) => s?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
        const label = routerName ? `${format(routerName)}: ${format(methodName!)}` : format(methodName!);

        return [
          label,
          {
            type: item.type,
            icon: item.type === "mutation" ? <Zap size={14} /> : <Search size={14} />,
            color: item.type === "mutation" ? "text-yellow-500" : "text-brand-cyan",
            description: `Execute ${item.chain} ${item.type}`,
            run: async (_utils: any, data: any) => {
              const chainParts = item.chain.split(".");
              
              // vanillaApi (Proxy) を使って動的に関数を辿る
              let target = vanillaApi as any;
              for (const p of chainParts) {
                target = target?.[p];
              }

              if (item.type === "query") {
                if (!target?.query) throw new Error(`Query ${item.chain} not found`);
                return target.query(data);
              } else {
                if (!target?.mutate) throw new Error(`Mutation ${item.chain} not found`);
                return target.mutate(data);
              }
            }
          }
        ];
      })
    );
  }, []);
};

export function TrpcWorkbench() {
  const TASKS = useTasks();
  const [activeTab, setActiveTab] = useState<"query" | "mutation">("query");
  const [selectedRouter, setSelectedRouter] = useState<string>("ALL");
  const [selected, setSelected] = useState<string>(Object.keys(TASKS)[0] ?? "");
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [mutationBody, setMutationBody] = useState<string>("{\n  \n}");
  
  // Sidebar resize state
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        // 200pxから600pxの間で調整可能にする
        const newWidth = Math.min(Math.max(200, mouseMoveEvent.clientX - 20), 600);
        setSidebarWidth(newWidth);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);
  
  const utils = api.useUtils();
  
  const routers = useMemo(() => {
    const r = apiConfig.map(item => item.chain.split(".")[0]).filter(Boolean);
    return Array.from(new Set(r)) as string[];
  }, []);

  const runTask = async (taskName: string) => {
    if (loading) return;
    
    setSelected(taskName);
    setLoading(true);
    setTaskLoading(taskName);
    setRes(null);
    setCopied(false);
    
    const start = performance.now();
    try {
      const task = TASKS[taskName];
      if (!task) return;

      let inputData = undefined;
      if (mutationBody.trim() !== "" && mutationBody.trim() !== "{}") {
        try {
          inputData = JSON.parse(mutationBody);
        } catch (err) {
          console.warn("Invalid JSON in request body", err);
        }
      }

      const result = await task.run(utils, inputData);
      setRes(result);
    } catch (e: any) {
      // tRPC / Zod のエラーをパースして見やすくする
      
      // Zodのエラーメッセージが含まれている場合 (JSON形式で入っていることがある)
      let displayMessage: string | string[] = e.message;
      try {
        const parsed = JSON.parse(e.message);
        if (Array.isArray(parsed)) {
          displayMessage = parsed.map((err: any) => `${err.path.join('.')}: ${err.message}`);
        }
      } catch {
        // 文字列内に改行(\n)が含まれる場合、配列に分割してJSON上で複数行として表示させる
        if (typeof e.message === 'string' && e.message.includes('\n')) {
          displayMessage = e.message.split('\n').filter(Boolean);
        }
      }

      setRes({ 
        status: e.data?.code ?? "ERROR", 
        message: displayMessage,
        details: e.data ? {
          path: e.data.path,
          // スタックトレースを配列にして読みやすくし、最初の5行程度に絞る
          stack: e.data.stack?.split('\n').slice(0, 5).filter(Boolean)
        } : undefined
      });
    } finally {
      setTime(Math.round(performance.now() - start));
      setLoading(false);
      setTaskLoading(null);
    }
  };

  const copyToClipboard = () => {
    if (!res) return;
    void navigator.clipboard.writeText(JSON.stringify(res, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full max-h-[calc(100vh-120px)] flex bg-white/80 backdrop-blur-xl border border-black/5 rounded-2xl overflow-hidden font-sans shadow-2xl shadow-black/5 min-h-0">
      <WorkbenchSidebar 
        tasks={TASKS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedTask={selected}
        onSelectTask={(name) => {
          setSelected(name);
          void runTask(name);
        }}
        loading={loading}
        taskLoading={taskLoading}
        requestBody={mutationBody}
        onRequestBodyChange={setMutationBody}
        onExecute={() => runTask(selected)}
        routers={routers}
        selectedRouter={selectedRouter}
        onRouterChange={setSelectedRouter}
        width={sidebarWidth}
      />

      {/* Resize handle */}
      <div
        className={`w-1 cursor-col-resize hover:bg-brand-cyan/30 transition-colors flex items-center justify-center relative group z-30 ${isResizing ? 'bg-brand-cyan/50' : 'bg-transparent'}`}
        onMouseDown={startResizing}
      >
        <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-black/5 rounded-full p-0.5 shadow-sm ${isResizing ? 'opacity-100' : ''}`}>
           <GripVertical size={10} className="text-[#9CA3AF]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white/40">        
        <WorkbenchHeader 
          selectedTaskName={selected} 
          res={res}
          time={time}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <WorkbenchResponsePanel 
            res={res}
            loading={loading}
            time={time}
            copied={copied}
            onCopy={copyToClipboard}
            onClear={() => setRes(null)}
          />
        </div>
      </div>
    </div>
  );
}
