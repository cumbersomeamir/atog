"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Verified,
  Star,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Building2,
  Car,
  Dumbbell,
  Waves,
  TreePine,
  Shield,
  X,
  Check,
  Calculator,
  TrendingUp,
  Eye,
} from "lucide-react";
import { properties } from "@/data/mockData";
import { formatPrice, formatArea, formatDate, cn } from "@/lib/utils";
import PropertyCard from "@/components/cards/PropertyCard";

export default function PropertyDetailPage() {
  const params = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const property = properties.find((p) => p.slug === params.slug) || properties[0];
  const similarProperties = properties.filter(
    (p) => p.id !== property.id && p.location.area === property.location.area
  ).slice(0, 4);

  const amenityIcons: Record<string, React.ReactNode> = {
    "24/7 Security": <Shield className="w-5 h-5" />,
    "Concierge": <Building2 className="w-5 h-5" />,
    "Private Parking": <Car className="w-5 h-5" />,
    "Covered Parking": <Car className="w-5 h-5" />,
    "Garden": <TreePine className="w-5 h-5" />,
    "Beach Access": <Waves className="w-5 h-5" />,
    "Pool": <Waves className="w-5 h-5" />,
    "Gym": <Dumbbell className="w-5 h-5" />,
  };

  const priceLabel =
    property.priceType === "rent"
      ? `${formatPrice(property.price)} / ${property.rentPeriod === "yearly" ? "year" : property.rentPeriod}`
      : formatPrice(property.price);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Image Gallery */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[50vh] md:h-[60vh]">
          <div
            className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
            onClick={() => {
              setCurrentImage(0);
              setShowGallery(true);
            }}
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Gallery
              </span>
            </div>
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="hidden md:block relative cursor-pointer group"
              onClick={() => {
                setCurrentImage(index + 1);
                setShowGallery(true);
              }}
            >
              <Image
                src={image}
                alt={`${property.title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
              {index === 3 && property.images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">
                    +{property.images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              isFavorite
                ? "bg-accent text-white"
                : "bg-white/90 text-text-secondary hover:text-accent"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {property.premium && (
            <span className="tag tag-secondary">Premium</span>
          )}
          {property.featured && (
            <span className="tag tag-accent">Featured</span>
          )}
          {property.verified && (
            <span className="tag tag-success flex items-center gap-1">
              <Verified className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {priceLabel}
                  </p>
                  <h1 className="text-xl sm:text-2xl font-display text-text-primary">
                    {property.title}
                  </h1>
                </div>
                <span className="tag tag-primary uppercase shrink-0">
                  {property.type}
                </span>
              </div>

              <p className="flex items-center gap-2 text-text-muted mb-4">
                <MapPin className="w-5 h-5" />
                {property.location.address}, {property.location.area}, {property.location.city}
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-10 flex items-center justify-center">
                    <Bed className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Bedrooms</p>
                    <p className="font-semibold text-text-primary">
                      {property.bedrooms === 0 ? "Studio" : property.bedrooms}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-10 flex items-center justify-center">
                    <Bath className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Bathrooms</p>
                    <p className="font-semibold text-text-primary">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-10 flex items-center justify-center">
                    <Maximize className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Area</p>
                    <p className="font-semibold text-text-primary">
                      {formatArea(property.area, property.areaUnit)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary-20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-secondary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Views</p>
                    <p className="font-semibold text-text-primary">
                      {property.viewCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-display text-text-primary mb-4">
                Description
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-display text-text-primary mb-4">
                Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 p-3 bg-background-alt rounded-xl"
                  >
                    <Check className="w-5 h-5 text-success" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-display text-text-primary mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 bg-background-alt rounded-xl"
                  >
                    {amenityIcons[amenity] || <Check className="w-5 h-5 text-primary" />}
                    <span className="text-sm text-text-secondary">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-display text-text-primary mb-4">
                Location
              </h2>
              <div className="aspect-video bg-background-alt rounded-xl flex items-center justify-center">
                <p className="text-text-muted">Map placeholder</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-muted">City</p>
                  <p className="font-medium text-text-primary">{property.location.city}</p>
                </div>
                <div>
                  <p className="text-text-muted">Area</p>
                  <p className="font-medium text-text-primary">{property.location.area}</p>
                </div>
                {property.location.building && (
                  <div>
                    <p className="text-text-muted">Building</p>
                    <p className="font-medium text-text-primary">{property.location.building}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary-20 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-secondary-dark" />
                </div>
                <h2 className="text-xl font-display text-text-primary">
                  Mortgage Calculator
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1">
                    Property Price
                  </label>
                  <input
                    type="text"
                    defaultValue={`AED ${property.price.toLocaleString()}`}
                    className="w-full px-4 py-2 bg-background-alt rounded-xl text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">
                    Down Payment (20%)
                  </label>
                  <input
                    type="text"
                    defaultValue={`AED ${(property.price * 0.2).toLocaleString()}`}
                    className="w-full px-4 py-2 bg-background-alt rounded-xl text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">
                    Est. Monthly Payment
                  </label>
                  <input
                    type="text"
                    defaultValue={`AED ${Math.round((property.price * 0.8) / (25 * 12) * 1.045).toLocaleString()}`}
                    className="w-full px-4 py-2 bg-background-alt rounded-xl text-sm font-semibold text-primary"
                    readOnly
                  />
                </div>
              </div>
              <Link
                href="/mortgage-calculator"
                className="text-sm text-primary hover:text-primary-light transition-colors"
              >
                Calculate your mortgage →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {property.agent.name}
                    </h3>
                    {property.agent.agency && (
                      <p className="text-sm text-text-muted">
                        {property.agent.agency.name}
                      </p>
                    )}
                    {property.agent.superAgent && (
                      <span className="inline-flex items-center gap-1 text-xs text-secondary-dark">
                        <Star className="w-3 h-3 fill-current" />
                        Super Agent
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    {property.agent.rating}
                  </span>
                  <span>{property.agent.propertiesCount} Properties</span>
                </div>

                <p className="text-sm text-text-muted mb-4">
                  Response time: {property.agent.responseTime}
                </p>

                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call Agent
                  </a>
                  {property.agent.whatsapp && (
                    <a
                      href={`https://wa.me/${property.agent.whatsapp.replace(/\D/g, "")}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-success text-white rounded-xl font-medium hover:bg-success/90 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-border rounded-xl font-medium text-text-primary hover:border-primary hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Email Agent
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold text-text-primary mb-4">
                  Property Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border-light">
                    <span className="text-text-muted">Reference</span>
                    <span className="font-medium text-text-primary">{property.id}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border-light">
                    <span className="text-text-muted">Status</span>
                    <span className="tag tag-primary capitalize">{property.status}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border-light">
                    <span className="text-text-muted">Listed</span>
                    <span className="font-medium text-text-primary">{formatDate(property.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-text-muted">Updated</span>
                    <span className="font-medium text-text-primary">{formatDate(property.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display text-text-primary mb-6">
              Similar Properties in {property.location.area}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? property.images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4">
              <Image
                src={property.images[currentImage]}
                alt={`${property.title} - Image ${currentImage + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === property.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentImage
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/70"
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

