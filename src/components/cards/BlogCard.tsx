"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import { Blog } from "@/types";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

interface BlogCardProps {
  blog: Blog;
  variant?: "default" | "featured" | "compact";
}

export default function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative h-[500px] rounded-3xl overflow-hidden"
      >
        <Image
          src={imageError ? "/placeholder-blog.jpg" : blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <span className="tag tag-secondary w-fit mb-4">{blog.category}</span>
          
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="text-3xl font-display text-white mb-4 group-hover:text-secondary transition-colors">
              {blog.title}
            </h3>
          </Link>
          
          <p className="text-white/80 mb-6 line-clamp-2">
            {blog.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-white">{blog.author.name}</p>
                <p className="text-xs text-white/60">{formatDate(blog.publishedAt)}</p>
              </div>
            </div>
            <Link
              href={`/blog/${blog.slug}`}
              className="flex items-center gap-2 text-secondary hover:text-secondary-light transition-colors font-medium"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="group flex gap-4"
      >
        <Link
          href={`/blog/${blog.slug}`}
          className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden"
        >
          <Image
            src={imageError ? "/placeholder-blog.jpg" : blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-primary">{blog.category}</span>
          <Link href={`/blog/${blog.slug}`}>
            <h4 className="font-medium text-text-primary hover:text-primary transition-colors line-clamp-2 mt-1">
              {blog.title}
            </h4>
          </Link>
          <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime} min read
            </span>
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
        href={`/blog/${blog.slug}`}
        className="relative block aspect-[16/10] property-image-container"
      >
        <Image
          src={imageError ? "/placeholder-blog.jpg" : blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <span className="absolute top-3 left-3 tag tag-primary">{blog.category}</span>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readTime} min read
          </span>
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <h3 className="font-semibold text-lg text-text-primary hover:text-primary transition-colors line-clamp-2 mb-3">
            {blog.title}
          </h3>
        </Link>

        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {blog.excerpt}
        </p>

        {/* Author & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
          <div className="flex items-center gap-2">
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-text-primary">
              {blog.author.name}
            </span>
          </div>
          <Link
            href={`/blog/${blog.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            Read
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

