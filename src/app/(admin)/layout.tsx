"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/referrals", label: "Referrals", icon: FileText },
  { href: "/admin/progress", label: "Progress", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-slate-900 text-white">
        <div className="p-6 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <h1 className="text-lg font-bold">Turn90</h1>
              <p className="text-xs text-slate-400">Staff Dashboard</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 py-4">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Staff Account</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔄</span>
            <h1 className="text-lg font-bold">Turn90 Staff</h1>
          </div>
        </div>
        <nav className="flex border-t border-slate-700">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center py-2 text-xs transition-colors",
                  isActive
                    ? "text-blue-400 bg-slate-800"
                    : "text-slate-400"
                )}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-24">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
