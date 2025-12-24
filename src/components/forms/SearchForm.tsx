"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  Bed,
  DollarSign,
  ChevronDown,
  X,
  Building2,
  Calculator,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { propertyTypes, bedroomOptions, priceRangesSale, priceRangesRent } from "@/data/mockData";

type SearchTab = "properties" | "projects" | "transactions" | "estimate" | "agents";

interface SearchFormProps {
  variant?: "hero" | "page";
  className?: string;
}

export default function SearchForm({ variant = "hero", className }: SearchFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>("properties");
  const [purpose, setPurpose] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [status, setStatus] = useState<"all" | "ready" | "off-plan">("all");
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: "properties" as SearchTab, label: "Properties", icon: Home },
    { id: "projects" as SearchTab, label: "New Projects", icon: Building2 },
    { id: "transactions" as SearchTab, label: "Transactions", icon: TrendingUp },
    { id: "estimate" as SearchTab, label: "AtogEstimate™", icon: Calculator },
    { id: "agents" as SearchTab, label: "Agents", icon: Users },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (purpose) params.set("purpose", purpose);
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (priceRange) params.set("price", priceRange);
    if (status !== "all") params.set("status", status);

    if (activeTab === "properties") {
      router.push(`/search?${params.toString()}`);
    } else if (activeTab === "projects") {
      router.push(`/projects?${params.toString()}`);
    } else if (activeTab === "transactions") {
      router.push(`/transactions`);
    } else if (activeTab === "estimate") {
      router.push(`/estimate`);
    } else if (activeTab === "agents") {
      router.push(`/agents?location=${location}`);
    }
  };

  const currentPriceRanges = purpose === "buy" ? priceRangesSale : priceRangesRent;

  const isHero = variant === "hero";

  return (
    <div className={cn("w-full", className)}>
      {/* Tabs */}
      <div className={cn(
        "flex items-center gap-1 mb-4 overflow-x-auto no-scrollbar pb-1",
        isHero ? "bg-white/30 backdrop-blur-md rounded-t-2xl p-1.5 border border-white/20" : "bg-background-alt rounded-xl p-1.5"
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200",
              activeTab === tab.id
                ? isHero
                  ? "bg-white text-[#0D4F4F]"
                  : "bg-white text-[#0D4F4F] shadow-sm"
                : isHero
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-[#4A4A5A] hover:text-[#0D4F4F] hover:bg-white/50"
            )}
          >
            <tab.icon className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <AnimatePresence mode="wait">
        {activeTab === "properties" && (
          <motion.form
            key="properties"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSearch}
            className={cn(
              "rounded-2xl p-4 sm:p-6",
              isHero ? "bg-white" : "bg-white shadow-lg border border-border"
            )}
          >
            {/* Purpose Toggle */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex rounded-xl border border-[#E5E5E7] bg-white p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setPurpose("buy")}
                  className={cn(
                    "px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200",
                    purpose === "buy"
                      ? "bg-[#0D4F4F] text-white shadow-sm"
                      : "bg-transparent text-[#4A4A5A] hover:bg-[#F5F5F7]"
                  )}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose("rent")}
                  className={cn(
                    "px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200",
                    purpose === "rent"
                      ? "bg-[#0D4F4F] text-white shadow-sm"
                      : "bg-transparent text-[#4A4A5A] hover:bg-[#F5F5F7]"
                  )}
                >
                  Rent
                </button>
              </div>

              {/* Status Filter */}
              <div className="hidden md:inline-flex rounded-xl border border-[#E5E5E7] bg-white p-1 gap-1">
                {(["all", "ready", "off-plan"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200",
                      status === s
                        ? "bg-[#0D4F4F] text-white shadow-sm"
                        : "bg-transparent text-[#4A4A5A] hover:bg-[#F5F5F7]"
                    )}
                  >
                    {s === "off-plan" ? "Off-Plan" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Location */}
              <div className="md:col-span-5 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter city, area, or building"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Property Type */}
              <div className="md:col-span-2 relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Property Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>

              {/* Bedrooms */}
              <div className="md:col-span-2 relative">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Beds & Baths</option>
                  {bedroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>

              {/* Price */}
              <div className="md:col-span-2 relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Price (AED)</option>
                  {currentPriceRanges.map((range, idx) => (
                    <option key={idx} value={`${range.min}-${range.max || ""}`}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="md:col-span-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors py-4"
              >
                <Search className="w-5 h-5" />
                <span className="md:hidden">Search</span>
              </button>
            </div>

            {/* AI Prompt */}
            {isHero && (
              <div className="mt-4 flex items-center justify-between p-3 bg-background-alt rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-text-secondary">
                    Want to find out more about real estate using AI?
                  </span>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1"
                >
                  Try AtogGPT
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}
          </motion.form>
        )}

        {activeTab === "projects" && (
          <motion.form
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSearch}
            className={cn(
              "rounded-2xl p-4 sm:p-6",
              isHero ? "bg-white" : "bg-white shadow-lg border border-border"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
              <div className="md:col-span-6 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search new projects by location or developer"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="md:col-span-3 relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Property Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
              <button
                type="submit"
                className="md:col-span-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors py-4"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.form>
        )}

        {activeTab === "estimate" && (
          <motion.form
            key="estimate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSearch}
            className={cn(
              "rounded-2xl p-4 sm:p-6",
              isHero ? "bg-white" : "bg-white shadow-lg border border-border"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
              <div className="md:col-span-9 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your property address to get an instant valuation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                className="md:col-span-1 flex items-center justify-center gap-2 bg-secondary text-primary-dark rounded-xl font-semibold hover:bg-secondary-light transition-colors py-4"
              >
                <Calculator className="w-5 h-5" />
              </button>
            </div>
          </motion.form>
        )}

        {activeTab === "transactions" && (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "rounded-2xl p-4 sm:p-6",
              isHero ? "bg-white" : "bg-white shadow-lg border border-border"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
              <div className="md:col-span-9 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search real estate transactions by area or building"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                className="md:col-span-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors py-4"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "agents" && (
          <motion.form
            key="agents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSearch}
            className={cn(
              "rounded-2xl p-4 sm:p-6",
              isHero ? "bg-white" : "bg-white shadow-lg border border-border"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
              <div className="md:col-span-9 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Users className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search agents by name, agency, or specialization"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background-alt border-2 border-transparent rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                className="md:col-span-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors py-4"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

