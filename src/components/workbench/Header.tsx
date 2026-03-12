interface HeaderProps {
  selectedTaskName: string;
}

export function WorkbenchHeader({
  selectedTaskName,
}: HeaderProps) {
  return (
    <div className="h-16 border-b border-[#F3F4F6] px-8 flex items-center justify-between shrink-0 bg-white/60">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#111827] tracking-tight">{selectedTaskName}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
