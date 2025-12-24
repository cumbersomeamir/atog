"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Verified,
  Phone,
  MessageCircle,
  Mail,
  Home,
  Award,
  Clock,
} from "lucide-react";
import { Agent } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AgentCardProps {
  agent: Agent;
  variant?: "default" | "horizontal" | "compact";
}

export default function AgentCard({ agent, variant = "default" }: AgentCardProps) {
  const [imageError, setImageError] = useState(false);

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
          href={`/agents/${agent.slug}`}
          className="relative w-full md:w-48 h-48 md:h-auto shrink-0"
        >
          <Image
            src={imageError ? "/placeholder-avatar.jpg" : agent.avatar}
            alt={agent.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          {agent.superAgent && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-secondary text-primary-dark text-xs font-semibold rounded-full">
              <Award className="w-3 h-3" />
              Super Agent
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <Link href={`/agents/${agent.slug}`}>
                <h3 className="text-lg font-semibold text-text-primary hover:text-primary transition-colors">
                  {agent.name}
                </h3>
              </Link>
              {agent.agency && (
                <p className="text-sm text-text-muted">{agent.agency.name}</p>
              )}
            </div>
            {agent.verified && (
              <span className="flex items-center gap-1 text-xs text-success">
                <Verified className="w-4 h-4" />
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-secondary fill-secondary" />
              {agent.rating} ({agent.reviewsCount} reviews)
            </span>
            <span className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              {agent.propertiesCount} Properties
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {agent.responseTime}
            </span>
          </div>

          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
            {agent.bio}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {agent.specializations.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 bg-background-alt rounded-full text-xs text-text-secondary"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-border-light">
            <a
              href={`tel:${agent.phone}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            {agent.whatsapp && (
              <a
                href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-success text-white rounded-xl font-medium hover:bg-success/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${agent.email}`}
              className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center text-text-secondary hover:border-primary hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200"
      >
        <div className="relative w-12 h-12 shrink-0">
          <Image
            src={imageError ? "/placeholder-avatar.jpg" : agent.avatar}
            alt={agent.name}
            fill
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
          />
          {agent.superAgent && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-primary-dark" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/agents/${agent.slug}`}>
            <h4 className="font-medium text-text-primary hover:text-primary transition-colors truncate">
              {agent.name}
            </h4>
          </Link>
          <p className="text-xs text-text-muted truncate">
            {agent.propertiesCount} properties
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-secondary-dark">
          <Star className="w-3 h-3 fill-current" />
          {agent.rating}
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
        href={`/agents/${agent.slug}`}
        className="relative block aspect-[4/3]"
      >
        <Image
          src={imageError ? "/placeholder-avatar.jpg" : agent.avatar}
          alt={agent.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        {agent.superAgent && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-secondary text-primary-dark text-xs font-semibold rounded-full">
            <Award className="w-3 h-3" />
            Super Agent
          </div>
        )}
        {agent.verified && (
          <div className="absolute top-3 right-3">
            <Verified className="w-5 h-5 text-success" />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/agents/${agent.slug}`}>
          <h3 className="font-semibold text-lg text-text-primary hover:text-primary transition-colors text-center mb-1">
            {agent.name}
          </h3>
        </Link>
        {agent.agency && (
          <p className="text-sm text-text-muted text-center mb-3">
            {agent.agency.name}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-sm text-text-secondary mb-4">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            {agent.rating}
          </span>
          <span className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            {agent.propertiesCount}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {agent.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 bg-background-alt rounded text-xs text-text-secondary"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border-light">
          <a
            href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
          {agent.whatsapp && (
            <a
              href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

