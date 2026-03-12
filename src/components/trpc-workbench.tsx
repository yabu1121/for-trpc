"use client";

import { useState, useMemo } from "react";
import { Zap, Search } from "lucide-react";
import { api } from "~/trpc/react";
import { apiConfig } from "~/server/api-config";
import type { TaskMap } from "./workbench/types";
import { WorkbenchSidebar } from "./workbench/Sidebar";
import { WorkbenchHeader } from "./workbench/Header";
import { WorkbenchResponsePanel } from "./workbench/ResponsePanel";

const useTasks = () => {
  const utils = api.useUtils();
  
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
            run: async (u: any, data: any) => {
              const chainParts = item.chain.split(".");
              let target = u;
              for (const p of chainParts) {
                target = target?.[p];
              }
              
              if (!target) throw new Error(`Procedure ${item.chain} not found`);

              if (item.type === "query") {
                return target.fetch(data);
              } else {
                const mutateFn = target.mutateAsync || target.mutate;
                if (!mutateFn) throw new Error(`${item.chain} has no mutate method`);
                return mutateFn(data);
              }
            }
          }
        ];
      })
    );
  }, [utils]);
};

export function TrpcWorkbench() {
  const TASKS = useTasks();
  const [activeTab, setActiveTab] = useState<"query" | "mutation">("query");
  const [selected, setSelected] = useState<string>(Object.keys(TASKS)[0] ?? "");
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [mutationBody, setMutationBody] = useState<string>("{\n  \n}");
  
  const utils = api.useUtils();

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
      let errorMessage = e.message;
      
      // Zodのエラーメッセージが含まれている場合 (JSON形式で入っていることがある)
      try {
        const parsed = JSON.parse(e.message);
        if (Array.isArray(parsed)) {
          errorMessage = parsed.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
        }
      } catch {
        // 通常の文字列エラー
      }

      setRes({ 
        error: "ERROR", 
        message: errorMessage,
        raw: e
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
    <div className="h-full flex bg-white/80 backdrop-blur-xl border border-black/5 rounded-2xl overflow-hidden font-sans shadow-2xl shadow-black/5">
      <WorkbenchSidebar 
        tasks={TASKS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedTask={selected}
        onSelectTask={(name) => {
          setSelected(name);
          if (TASKS[name]?.type === "query") {
            void runTask(name);
          } else {
            setRes(null);
            setTime(null);
          }
        }}
        loading={loading}
        taskLoading={taskLoading}
        requestBody={mutationBody}
        onRequestBodyChange={setMutationBody}
        onExecute={() => runTask(selected)}
      />

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
