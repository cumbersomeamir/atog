"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Building2,
  TrendingUp,
  Calculator,
  Users,
  FileText,
  MapPin,
  Newspaper,
  User,
  Search,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Find Agent", href: "/agents", icon: Users },
  { name: "Sell Property", href: "/sell", icon: FileText },
  { name: "AtogEstimate™", href: "/estimate", icon: Calculator, badge: "NEW" },
  { name: "Transactions", href: "/transactions", icon: TrendingUp },
];

const moreLinks = [
  { name: "New Projects", href: "/projects", icon: Building2 },
  { name: "Area Guides", href: "/areas", icon: MapPin },
  { name: "Blog", href: "/blog", icon: Newspaper },
  { name: "About Us", href: "/about", icon: Home },
  { name: "Contact", href: "/contact", icon: FileText },
  { name: "Careers", href: "/careers", icon: Users },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-white shadow-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isScrolled || !isHomePage
                    ? "bg-primary"
                    : "bg-white/20 backdrop-blur-sm"
                )}
              >
                <span
                  className={cn(
                    "text-xl font-bold font-display",
                    isScrolled || !isHomePage ? "text-white" : "text-white"
                  )}
                >
                  A
                </span>
              </div>
              <span
                className={cn(
                  "text-2xl font-bold font-display transition-colors duration-300",
                  isScrolled || !isHomePage ? "text-primary" : "text-white"
                )}
              >
                Atog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                    isScrolled || !isHomePage
                      ? "text-text-secondary hover:text-primary hover:bg-primary-5"
                      : "text-white/90 hover:text-white hover:bg-white/10",
                    pathname === item.href &&
                      (isScrolled || !isHomePage
                        ? "text-primary bg-primary-5"
                        : "text-white bg-white/10")
                  )}
                >
                  {item.name}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                    isScrolled || !isHomePage
                      ? "text-text-secondary hover:text-primary hover:bg-primary-5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  More
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isMoreOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setIsMoreOpen(false)}
                      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden"
                    >
                      <div className="py-2">
                        {moreLinks.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMoreOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-primary hover:bg-primary-5 transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Link
                href="/search"
                className={cn(
                  "hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isScrolled || !isHomePage
                    ? "text-text-secondary hover:text-primary hover:bg-primary-5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Favorites */}
              <Link
                href="/favorites"
                className={cn(
                  "hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isScrolled || !isHomePage
                    ? "text-text-secondary hover:text-primary hover:bg-primary-5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Login Button */}
              <Link
                href="/login"
                className={cn(
                  "hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                  isScrolled || !isHomePage
                    ? "bg-primary text-white hover:bg-primary-light"
                    : "bg-white text-primary hover:bg-white/90"
                )}
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isScrolled || !isHomePage
                    ? "text-text-secondary hover:text-primary hover:bg-primary-5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-white font-display">
                        A
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-primary font-display">
                      Atog
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 mb-6 bg-background-alt rounded-xl text-text-secondary"
                >
                  <Search className="w-5 h-5" />
                  <span>Search properties...</span>
                </Link>

                {/* Mobile Navigation */}
                <nav className="space-y-1">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-4 mb-2">
                    Main Menu
                  </p>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary-10 text-primary"
                          : "text-text-secondary hover:text-primary hover:bg-primary-5"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded-full ml-auto">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}

                  <div className="pt-4 mt-4 border-t border-border-light">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-4 mb-2">
                      More
                    </p>
                    {moreLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-primary-10 text-primary"
                            : "text-text-secondary hover:text-primary hover:bg-primary-5"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Auth */}
                <div className="mt-8 pt-6 border-t border-border-light space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-xl font-medium"
                  >
                    <User className="w-5 h-5" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-primary text-primary rounded-xl font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

