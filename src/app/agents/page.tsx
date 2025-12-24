"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import AgentCard from "@/components/cards/AgentCard";
import { agents } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterSuperAgent, setFilterSuperAgent] = useState(false);

  const filteredAgents = agents
    .filter((agent) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          agent.name.toLowerCase().includes(query) ||
          agent.agency?.name.toLowerCase().includes(query) ||
          agent.specializations.some((s) => s.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter((agent) => !filterSuperAgent || agent.superAgent)
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "properties":
          return b.propertiesCount - a.propertiesCount;
        case "experience":
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display text-white mb-4"
          >
            Find Your Perfect Agent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Connect with verified real estate professionals who can help you
            find your dream property
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b border-border sticky top-[72px] z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by name, agency, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-3 bg-background-alt rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterSuperAgent}
                  onChange={(e) => setFilterSuperAgent(e.target.checked)}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="text-sm text-text-secondary whitespace-nowrap">
                  Super Agents Only
                </span>
              </label>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 pr-10 bg-background-alt rounded-xl appearance-none cursor-pointer text-sm"
                >
                  <option value="rating">Top Rated</option>
                  <option value="properties">Most Properties</option>
                  <option value="experience">Most Experience</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-custom py-8">
        <p className="text-text-muted mb-6">
          {filteredAgents.length} agents found
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted">No agents found matching your criteria</p>
          </div>
        )}
      </section>
    </div>
  );
}

