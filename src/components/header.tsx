
"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useThemeContext } from "@/context/custom-theme-provider";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export function Header({ onSidebarToggle }: HeaderProps) {
  const { themeSettings } = useThemeContext();

  return (
    <header 
      className="flex items-center justify-between px-2 border-b"
      style={{ 
        backgroundColor: 'var(--custom-header-bg)', 
        color: 'var(--custom-header-text)' 
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onSidebarToggle}
        className="md:hidden"
        style={{ color: 'inherit' }}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      
      {/* This empty div is for spacing on md screens to help center the dropdown */}
      <div className="hidden md:block w-10"></div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-base font-semibold" style={{ color: 'inherit' }}>
            NexaAI <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <Link href="/about/version" passHref>
            <DropdownMenuItem>
              NexaAI Learner v1.0
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeToggle />
    </header>
  );
}

    