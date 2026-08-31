"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Briefcase,
  Target,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/cbt", label: "CBT", icon: BookOpen },
  { href: "/employment", label: "Jobs", icon: Briefcase },
  { href: "/life-goals", label: "Goals", icon: Target },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-3 px-4 min-w-[64px] min-h-[56px] transition-colors",
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon
                className={cn("w-6 h-6 mb-1", isActive && "stroke-[2.5]")}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
