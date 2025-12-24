"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Building2, ArrowRight } from "lucide-react";
import { Project } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "large";
}

export default function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const statusColors = {
    upcoming: "bg-secondary text-primary-dark",
    "under-construction": "bg-primary text-white",
    ready: "bg-success text-white",
  };

  const statusLabels = {
    upcoming: "Upcoming",
    "under-construction": "Under Construction",
    ready: "Ready",
  };

  if (variant === "large") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative h-[400px] rounded-3xl overflow-hidden"
      >
        <Image
          src={imageError ? "/placeholder-property.jpg" : project.images[0]}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <span className={cn("tag w-fit mb-4", statusColors[project.status])}>
            {statusLabels[project.status]}
          </span>
          
          <h3 className="text-2xl font-display text-white mb-2">
            {project.name}
          </h3>
          
          <p className="text-white/80 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {project.location.area}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {project.completionDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {project.propertyTypes.join(", ")}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Starting from</p>
              <p className="text-xl font-bold text-secondary">
                {formatPrice(project.priceFrom)}
              </p>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary rounded-xl font-medium hover:bg-secondary hover:text-primary-dark transition-colors"
            >
              View Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        {/* Developer Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl">
          <Image
            src={project.developer.logo}
            alt={project.developer.name}
            width={24}
            height={24}
            className="rounded"
          />
          <span className="text-xs font-medium text-text-primary">
            {project.developer.name}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover"
    >
      {/* Image */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] property-image-container"
      >
        <Image
          src={imageError ? "/placeholder-property.jpg" : project.images[0]}
          alt={project.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <span className={cn("absolute top-3 left-3 tag", statusColors[project.status])}>
          {statusLabels[project.status]}
        </span>
        
        {/* Developer Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
          <Image
            src={project.developer.logo}
            alt={project.developer.name}
            width={20}
            height={20}
            className="rounded"
          />
          <span className="text-xs font-medium text-text-primary">
            {project.developer.name}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="font-semibold text-lg text-text-primary hover:text-primary transition-colors line-clamp-1 mb-2">
            {project.name}
          </h3>
        </Link>

        <p className="flex items-center gap-1 text-sm text-text-muted mb-3">
          <MapPin className="w-4 h-4" />
          {project.location.area}, {project.location.city}
        </p>

        <div className="flex items-center gap-3 text-xs text-text-secondary mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {project.completionDate}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            {project.propertyTypes.slice(0, 2).join(", ")}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border-light">
          <div>
            <p className="text-xs text-text-muted">Starting from</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(project.priceFrom)}
            </p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

