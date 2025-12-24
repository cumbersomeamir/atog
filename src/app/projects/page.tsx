"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Building2, MapPin, Calendar } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import { projects } from "@/data/mockData";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.developer.name.toLowerCase().includes(query) ||
        project.location.area.toLowerCase().includes(query)
      );
    }
    return true;
  }).filter((project) => 
    selectedStatus === "all" || project.status === selectedStatus
  );

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
              New Projects
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Explore the latest off-plan developments from top developers
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by project name, developer, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { value: "all", label: "All Projects" },
              { value: "upcoming", label: "Upcoming" },
              { value: "under-construction", label: "Under Construction" },
              { value: "ready", label: "Ready" },
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === status.value
                    ? "bg-primary text-white"
                    : "bg-background-alt text-text-secondary hover:text-primary"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container-custom py-8">
        <p className="text-text-muted mb-6">
          {filteredProjects.length} projects found
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <p className="text-text-muted">No projects found</p>
          </div>
        )}
      </section>
    </div>
  );
}

