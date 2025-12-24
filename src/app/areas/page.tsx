"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import AreaCard from "@/components/cards/AreaCard";
import { areas } from "@/data/mockData";

export default function AreasPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAreas = areas.filter((area) => {
    if (searchQuery) {
      return (
        area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        area.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">
              Explore Neighbourhoods
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Discover the perfect area for your lifestyle with our comprehensive guides
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AreaCard area={area} />
            </motion.div>
          ))}
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <p className="text-text-muted">No areas found</p>
          </div>
        )}
      </section>
    </div>
  );
}

