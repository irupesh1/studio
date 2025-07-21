
"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "lucide-react";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-2 border-b md:justify-end">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSidebarToggle}
        className="md:hidden"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <ThemeToggle />
    </header>
  );
}
