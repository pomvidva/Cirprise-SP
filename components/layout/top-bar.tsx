"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutList,
  ClipboardCheck,
  MessageCircle,
  Settings,
  ChevronDown,
  User,
  Briefcase,
  Flag,
  SlidersHorizontal,
  Gift,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Projects", href: "/projects", icon: LayoutList },
  { label: "My Projects", href: "/my-projects", icon: ClipboardCheck },
  { label: "Messages", href: "/messages", icon: MessageCircle },
];

// The Settings dropdown items. "Sign out" is handled separately below
// so it can sit under a divider.
const settingsItems: NavItem[] = [
  { label: "Profile info", href: "/settings/profile", icon: User },
  { label: "Professional background", href: "/settings/background", icon: Briefcase },
  { label: "Social accounts", href: "/settings/social", icon: Flag },
  { label: "Account settings", href: "/settings/account", icon: SlidersHorizontal },
  { label: "Referrals", href: "/settings/referrals", icon: Gift },
];

export function TopBar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses = (active: boolean) =>
    cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
      active
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    );

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-900">Respondent</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={linkClasses(isActive(item.href))}>
                <Icon className="h-4 w-4" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}

          <div ref={settingsRef} className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((open) => !open)}
              className={linkClasses(settingsOpen)}
              aria-haspopup="menu"
              aria-expanded={settingsOpen}
            >
              <Settings className="h-4 w-4" strokeWidth={2} />
              Settings
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-180")}
                strokeWidth={2}
              />
            </button>

            {settingsOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
              >
                {/* Profile header */}
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                    {/* Swap for the real user avatar when auth is wired up:
                        <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" /> */}
                  </div>
                  <span className="truncate text-sm text-slate-600">user@example.com</span>
                </div>

                <div className="my-2 border-t border-slate-100" />

                {/* Menu items */}
                {settingsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm font-medium transition",
                        isActive(item.href)
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={2} />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="my-2 border-t border-slate-100" />

                {/* Sign out */}
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={2} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}