import { Search, Bell, User, Menu, Store } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const shopName = user?.shopName || "";

  const getTitle = () => {
    if (location === "/") return "Dashboard";
    const segment = location.split("/")[1];
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

  return (
    <header className="h-16 lg:h-20 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8 transition-all select-none">
      <div className="flex items-center gap-3">
        {/* Hamburger menu — visible below lg (mobile + iPad portrait) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Open navigation menu"
          data-testid="button-hamburger-menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h2 className="text-lg lg:text-2xl font-display font-bold text-foreground leading-tight">{getTitle()}</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span className="text-primary font-medium">{getTitle()}</span>
          </div>
        </div>
      </div>

      {/* Center — Shop name + Tab name (logo-style gradient) */}
      {shopName && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 rounded-full px-5 py-2 shadow-md border border-white/20 bg-gradient-to-br from-blue-900 via-red-700 to-red-900">
          <Store className="w-5 h-5 text-white drop-shadow" />
          <span className="text-lg lg:text-2xl font-display font-bold whitespace-nowrap bg-gradient-to-r from-blue-300 via-red-300 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
            {shopName} Wines {getTitle()}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative hidden lg:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            placeholder="Global search..."
            className="pl-10 pr-4 py-2 rounded-full bg-secondary/50 border border-transparent focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all w-36 lg:w-64 text-sm font-medium"
          />
        </div>

        <button className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors text-muted-foreground">
          <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="absolute top-2 right-2 lg:top-2.5 lg:right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
        </button>

        <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-border/50">
          <div className="text-right hidden sm:block">
            <p className="text-xs lg:text-sm font-bold text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Manager</p>
          </div>
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 border-2 border-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
            <User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
