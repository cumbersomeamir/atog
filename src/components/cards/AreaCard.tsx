"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Building2, ArrowRight, TrendingUp } from "lucide-react";
import { Area } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface AreaCardProps {
  area: Area;
  variant?: "default" | "large" | "compact";
}

export default function AreaCard({ area, variant = "default" }: AreaCardProps) {
  const [imageError, setImageError] = useState(false);

  if (variant === "large") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative h-[400px] rounded-3xl overflow-hidden"
      >
        <Image
          src={imageError ? "/placeholder-area.jpg" : area.image}
          alt={area.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <h3 className="text-3xl font-display text-white mb-2">
            {area.name}
          </h3>
          <p className="text-sm text-white/60 mb-4">{area.city}</p>
          
          <p className="text-white/80 mb-6 line-clamp-2">
            {area.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-white/60 mb-1">For Sale</p>
              <p className="text-lg font-semibold text-white">{area.propertiesForSale}</p>
              <p className="text-xs text-white/60">Avg. {formatPrice(area.averageSalePrice)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-white/60 mb-1">For Rent</p>
              <p className="text-lg font-semibold text-white">{area.propertiesForRent}</p>
              <p className="text-xs text-white/60">Avg. {formatPrice(area.averageRentPrice)}/yr</p>
            </div>
          </div>
          
          <Link
            href={`/areas/${area.slug}`}
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-light transition-colors font-medium"
          >
            Explore Area
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/areas/${area.slug}`}
        className="group block"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[200px] rounded-2xl overflow-hidden"
        >
          <Image
            src={imageError ? "/placeholder-area.jpg" : area.image}
            alt={area.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <h3 className="text-lg font-semibold text-white mb-1">
              {area.name}
            </h3>
            <p className="text-xs text-white/70">
              {area.propertiesForSale + area.propertiesForRent} properties
            </p>
          </div>
        </motion.div>
      </Link>
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
        href={`/areas/${area.slug}`}
        className="relative block aspect-[16/10] property-image-container"
      >
        <Image
          src={imageError ? "/placeholder-area.jpg" : area.image}
          alt={area.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/areas/${area.slug}`}>
          <h3 className="text-xl font-semibold text-text-primary hover:text-primary transition-colors mb-1">
            {area.name}
          </h3>
        </Link>
        <p className="text-sm text-text-muted mb-4">{area.city}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-10 flex items-center justify-center">
              <Home className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {area.propertiesForSale}
              </p>
              <p className="text-xs text-text-muted">For Sale</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary-20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-secondary-dark" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {area.propertiesForRent}
              </p>
              <p className="text-xs text-text-muted">For Rent</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {area.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="px-2 py-1 bg-background-alt rounded text-xs text-text-secondary"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Prices */}
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-text-muted">Avg. Sale</p>
              <p className="font-semibold text-primary">
                {formatPrice(area.averageSalePrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-text-muted">Avg. Rent</p>
              <p className="font-semibold text-secondary-dark">
                {formatPrice(area.averageRentPrice)}/yr
              </p>
            </div>
            <Link
              href={`/areas/${area.slug}`}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

