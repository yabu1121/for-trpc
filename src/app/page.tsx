import { TrpcWorkbench } from "~/components/trpc-workbench";
import { HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="h-screen w-screen bg-[#FDFDFD] text-[#111827] flex flex-col overflow-hidden font-sans relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-cyan/5 to-transparent -z-10 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-brand-violet/5 rounded-full blur-[100px] -z-10" />

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