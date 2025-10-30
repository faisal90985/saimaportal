import React from 'react';
import { Home, Megaphone, Building2, FileText, Phone, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tab } from '@/app/lib/types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'villa-locator', label: 'Locator', icon: Home },
  { id: 'advertisements', label: 'Ads', icon: Megaphone },
  { id: 'management', label: 'Mgmt', icon: Building2 },
  { id: 'complaints', label: 'Complaints', icon: FileText },
  { id: 'emergency', label: 'Emergency', icon: Phone },
  { id: 'admin', label: 'Admin', icon: Shield },
];

const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-50">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "inline-flex flex-col items-center justify-center px-2 hover:bg-muted group",
              activeTab === item.id ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="w-6 h-6 mb-1 transition-transform group-hover:scale-110" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;