import { ResponsesAnlytics } from "./ResponsesAnlytics";

interface HeaderProps {
  selectedTaskName: string;
  res: any;
  time: number | null;
}

export function WorkbenchHeader({
  selectedTaskName,
  res,
  time
}: HeaderProps) {
  return (
    <div className="h-16 border-b border-black/5 px-8 flex items-center justify-between shrink-0 bg-white/60 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#111827] tracking-tight">{selectedTaskName}</h2>
            <span className="px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-[8px] font-black uppercase tracking-widest">tRPC</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <ResponsesAnlytics res={res} time={time} />
      </div>
    </div>
  );
}
