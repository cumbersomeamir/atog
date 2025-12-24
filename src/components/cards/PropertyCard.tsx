"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Verified,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Property } from "@/types";
import { formatPrice, formatArea, cn } from "@/lib/utils";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "horizontal" | "compact";
}

export default function PropertyCard({
  property,
  variant = "default",
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const priceLabel =
    property.priceType === "rent"
      ? `${formatPrice(property.price)} / ${property.rentPeriod === "yearly" ? "year" : property.rentPeriod}`
      : formatPrice(property.price);

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
      >
        {/* Image */}
        <Link
          href={`/property/${property.slug}`}
          className="relative w-full md:w-80 h-48 md:h-auto shrink-0 property-image-container"
        >
          <Image
            src={imageError ? "/placeholder-property.jpg" : property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {property.premium && (
              <span className="tag tag-secondary">Premium</span>
            )}
            {property.featured && (
              <span className="tag tag-accent">Featured</span>
            )}
            {property.status === "off-plan" && (
              <span className="tag tag-primary">Off-Plan</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
              isFavorite
                ? "bg-accent text-white"
                : "bg-white/90 text-text-secondary hover:text-accent"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
        </Link>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-2xl font-bold text-primary">{priceLabel}</p>
              {property.verified && (
                <span className="inline-flex items-center gap-1 text-xs text-success mt-1">
                  <Verified className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <span className="tag tag-primary uppercase">{property.type}</span>
          </div>

          <Link href={`/property/${property.slug}`}>
            <h3 className="font-semibold text-lg text-text-primary hover:text-primary transition-colors line-clamp-1 mb-2">
              {property.title}
            </h3>
          </Link>

          <p className="flex items-center gap-1 text-sm text-text-muted mb-4">
            <MapPin className="w-4 h-4" />
            {property.location.area}, {property.location.city}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Beds`}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4" />
              {formatArea(property.area, property.areaUnit)}
            </span>
          </div>

          {/* Agent & Actions */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-light">
            <div className="flex items-center gap-2">
              <Image
                src={property.agent.avatar}
                alt={property.agent.name}
                width={36}
                height={36}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {property.agent.name}
                </p>
                {property.agent.superAgent && (
                  <span className="flex items-center gap-1 text-xs text-secondary-dark">
                    <Star className="w-3 h-3 fill-current" />
                    Super Agent
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-primary-10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-success/10 text-success flex items-center justify-center hover:bg-success hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
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
        href={`/property/${property.slug}`}
        className="relative block aspect-[4/3] property-image-container"
      >
        <Image
          src={imageError ? "/placeholder-property.jpg" : property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.premium && (
            <span className="tag tag-secondary">Premium</span>
          )}
          {property.featured && (
            <span className="tag tag-accent">Featured</span>
          )}
          {property.status === "off-plan" && (
            <span className="tag tag-primary">Off-Plan</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
            isFavorite
              ? "bg-accent text-white"
              : "bg-white/90 text-text-secondary hover:text-accent"
          )}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </button>
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-xl font-bold text-white">{priceLabel}</p>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="tag tag-primary uppercase">{property.type}</span>
          {property.verified && (
            <span className="flex items-center gap-1 text-xs text-success">
              <Verified className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        <Link href={`/property/${property.slug}`}>
          <h3 className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[3rem]">
            {property.title}
          </h3>
        </Link>

        <p className="flex items-center gap-1 text-sm text-text-muted mb-4">
          <MapPin className="w-4 h-4" />
          {property.location.area}, {property.location.city}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-text-secondary py-3 border-t border-border-light">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            {property.bedrooms === 0 ? "Studio" : property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            {formatArea(property.area, property.areaUnit)}
          </span>
        </div>

        {/* Agent */}
        <div className="flex items-center justify-between pt-3 border-t border-border-light">
          <div className="flex items-center gap-2">
            <Image
              src={property.agent.avatar}
              alt={property.agent.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-xs font-medium text-text-primary line-clamp-1">
                {property.agent.name}
              </p>
              {property.agent.superAgent && (
                <span className="flex items-center gap-0.5 text-[10px] text-secondary-dark">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Super Agent
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg bg-primary-10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center hover:bg-success hover:text-white transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

