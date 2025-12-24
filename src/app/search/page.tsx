"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
  ArrowUpDown,
} from "lucide-react";
import PropertyCard from "@/components/cards/PropertyCard";
import SearchForm from "@/components/forms/SearchForm";
import { properties, propertyTypes, bedroomOptions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Property } from "@/types";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [sortBy, setSortBy] = useState("newest");
  const [purpose, setPurpose] = useState(searchParams.get("purpose") || "buy");

  // Filters state
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "all");

  useEffect(() => {
    let filtered = [...properties];

    // Filter by purpose
    if (purpose === "buy") {
      filtered = filtered.filter((p) => p.priceType === "sale");
    } else if (purpose === "rent") {
      filtered = filtered.filter((p) => p.priceType === "rent");
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    // Filter by bedrooms
    if (selectedBedrooms) {
      if (selectedBedrooms === "studio") {
        filtered = filtered.filter((p) => p.bedrooms === 0);
      } else {
        filtered = filtered.filter((p) => p.bedrooms >= parseInt(selectedBedrooms));
      }
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popular":
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }

    setFilteredProperties(filtered);
  }, [purpose, selectedType, selectedBedrooms, selectedStatus, sortBy]);

  const clearFilters = () => {
    setSelectedType("");
    setSelectedBedrooms("");
    setPriceMin("");
    setPriceMax("");
    setSelectedStatus("all");
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-[72px] z-30">
        <div className="container-custom py-4">
          {/* Search Form */}
          <SearchForm variant="page" />
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-[200px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-text-primary">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary-light"
                >
                  Clear All
                </button>
              </div>

              {/* Purpose */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Purpose
                </label>
                <div className="flex bg-background-alt rounded-xl p-1">
                  <button
                    onClick={() => setPurpose("buy")}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                      purpose === "buy"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-primary"
                    )}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setPurpose("rent")}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                      purpose === "rent"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-primary"
                    )}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Bedrooms
                </label>
                <select
                  value={selectedBedrooms}
                  onChange={(e) => setSelectedBedrooms(e.target.value)}
                  className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Any</option>
                  {bedroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "ready", label: "Ready to Move" },
                    { value: "off-plan", label: "Off-Plan" },
                  ].map((status) => (
                    <label
                      key={status.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status.value}
                        checked={selectedStatus === status.value}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">
                        {status.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price Range (AED)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-3 py-2 bg-background-alt border-2 border-transparent rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-3 py-2 bg-background-alt border-2 border-transparent rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-display text-text-primary">
                  Properties {purpose === "rent" ? "for Rent" : "for Sale"}
                </h1>
                <p className="text-text-muted">
                  {filteredProperties.length} properties found
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-border text-sm font-medium"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2.5 pr-10 bg-white rounded-xl border border-border text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:border-primary"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center bg-white rounded-xl border border-border p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-text-muted hover:text-primary"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-text-muted hover:text-primary"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={viewMode === "list" ? "horizontal" : "default"}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background-alt flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-text-muted" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No properties found
                </h3>
                <p className="text-text-muted mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredProperties.length > 0 && (
              <div className="mt-8 text-center">
                <button className="btn btn-outline">
                  Load More Properties
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-10 h-10 rounded-full bg-background-alt flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Filter Content */}
                <div className="space-y-6">
                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Purpose
                    </label>
                    <div className="flex bg-background-alt rounded-xl p-1">
                      <button
                        onClick={() => setPurpose("buy")}
                        className={cn(
                          "flex-1 py-3 rounded-lg font-medium transition-colors",
                          purpose === "buy"
                            ? "bg-primary text-white"
                            : "text-text-secondary"
                        )}
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => setPurpose("rent")}
                        className={cn(
                          "flex-1 py-3 rounded-lg font-medium transition-colors",
                          purpose === "rent"
                            ? "bg-primary text-white"
                            : "text-text-secondary"
                        )}
                      >
                        Rent
                      </button>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Property Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-3 bg-background-alt rounded-xl"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Bedrooms
                    </label>
                    <select
                      value={selectedBedrooms}
                      onChange={(e) => setSelectedBedrooms(e.target.value)}
                      className="w-full px-4 py-3 bg-background-alt rounded-xl"
                    >
                      <option value="">Any</option>
                      {bedroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 border-2 border-border rounded-xl font-medium"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-24 flex items-center justify-center">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

