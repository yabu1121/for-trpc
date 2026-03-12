import { Bot, Github } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-16 border-b border-black/5 px-8 flex items-center justify-between shrink-0 bg-white/60 backdrop-blur-md z-10">
      <span>for trpc</span>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <Link href="https://github.com/yabu1121/for-trpc" target="_blank" className="cursor-pointer text-[#9CA3AF] hover:text-[#111827] transition-colors">
            <Github size={18} />
          </Link>
        </div>
      </div>
    </header>
  )
}