import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import LocalClock from "@/components/LocalClock";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="hidden md:flex items-center gap-8 bg-card/50 backdrop-blur-md border border-border/40 rounded-full px-6 py-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Local Clock - Desktop */}
        <div className="hidden md:block bg-card/50 backdrop-blur-md border border-border/40 rounded-full px-4 py-2">
          <LocalClock />
        </div>

        {/* Mobile menu */}
        <div
          className={`absolute left-4 right-4 top-16 bg-card/80 backdrop-blur-md border border-border/40 rounded-xl p-4 shadow-lg md:hidden ${open ? "block" : "hidden"}`}
          role="menu"
        >
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors text-base font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border/30">
            <LocalClock />
          </div>
        </div>
      </div>
    </nav>
  );
};

export const ScrollIndicator = () => (
  <button
    onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
    className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
    aria-label="Scroll down"
  >
    <span className="text-sm font-medium tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
      Explore
    </span>
    <div className="flex flex-col items-center animate-bounce">
      <ChevronDown className="w-5 h-5" />
      <ChevronDown className="w-5 h-5 -mt-3 opacity-50" />
    </div>
  </button>
);

export default Navigation;
