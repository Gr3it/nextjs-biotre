"use client";

import Link from "next/link";
import { FileText, Users, Briefcase } from "lucide-react";

interface ArchivioTabsProps {
  activeType: string;
}

export default function ArchivioTabs({ activeType }: ArchivioTabsProps) {
  const tabs = [
    { id: "bilanci", label: "Bilanci", icon: Briefcase },
    { id: "assemblea", label: "Assemblea", icon: Users },
    { id: "direttivo", label: "Direttivo", icon: FileText },
  ];

  return (
    <div className="flex p-1 bg-white border border-border rounded-xl shadow-sm">
      {tabs.map((tab) => {
        const isActive = activeType === tab.id;
        const Icon = tab.icon;
        
        return (
          <Link
            key={tab.id}
            href={`?type=${tab.id}`}
            className={`
              flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg transition-all
              ${isActive 
                ? "bg-primary-dark text-white shadow-sm" 
                : "text-text-muted hover:bg-primary/5 hover:text-primary-dark"
              }
            `}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary/60"}`} />
            <span className="text-xs font-serif font-bold tracking-tight uppercase">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
