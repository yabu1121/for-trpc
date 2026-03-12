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
    <div className="h-48 bg-black m-4 rounded-md shrink-0 flex flex-col relative z-20">
         <div className="flex p-2 gap-1.5 text-emerald-100 items-center">
          <span>request body</span>
        </div>
      <textarea 
        value={body}
        onChange={(e) => setBody(e.target.value)}
        spellCheck={false}
        className="flex-1 w-full bg-transparent p-4 text-[13px] font-mono leading-relaxed text-emerald-100 focus:outline-none resize-none custom-scrollbar"
        placeholder="{&#10;  &#34;key&#34;: &#34;value&#34;&#10;}"
      />
    </div>
  );
}
