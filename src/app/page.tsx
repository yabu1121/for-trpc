import { TrpcWorkbench } from "~/components/trpc-workbench";
import { api, HydrateClient } from "~/trpc/server";
import { Terminal, Github, Bot } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  await api.project.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="h-screen w-screen bg-[#FDFDFD] text-[#111827] flex flex-col overflow-hidden font-sans relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-cyan/5 to-transparent -z-10 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-brand-violet/5 rounded-full blur-[100px] -z-10" />

        <header className="h-16 border-b border-black/5 px-8 flex items-center justify-between shrink-0 bg-white/60 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <div className="p-2 rounded-xl bg-[#111827] text-white shadow-lg shadow-black/10 flex items-center justify-center">
                <Bot size={18} className="text-brand-cyan" />
             </div>
             <div className="flex flex-col">
               <h1 className="text-sm font-black tracking-tighter uppercase leading-none">
                  TRPC<span className="text-brand-cyan ml-0.5 tracking-[0.2em] text-[10px]">Bench</span>
               </h1>
               <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest mt-0.5">Development Environment</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 group cursor-default">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">System Operational</span>
             </div>
             <div className="h-4 w-[1px] bg-black/5" />
             <div className="flex items-center gap-4">
               <button className="text-[#9CA3AF] hover:text-[#111827] transition-colors">
                 <Github size={18} />
               </button>
               <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#111827] to-[#1F2937] p-[1px]">
                 <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                   <div className="h-7 w-7 rounded-lg bg-[#111827]" />
                 </div>
               </div>
             </div>
          </div>
        </header>

        <div className="flex-1 p-6 z-10">
          <TrpcWorkbench />
        </div>
        
        <footer className="h-10 border-t border-black/5 px-8 flex items-center justify-between shrink-0 bg-white/40 backdrop-blur-sm text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">
          <div>v0.1.0-alpha</div>
        </footer>
      </main>
    </HydrateClient>
  );
}