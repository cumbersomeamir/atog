"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";
import { blogs } from "@/data/mockData";

const categories = [
  "All",
  "Investment",
  "Buying Guide",
  "Luxury",
  "Off-Plan",
  "Market Report",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs.find((b) => b.featured);

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">
              Real Estate Insights
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Expert advice, market trends, and guides to help you make informed decisions
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-border sticky top-[72px] z-30">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-background-alt text-text-secondary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredBlog && selectedCategory === "All" && !searchQuery && (
        <section className="container-custom py-8">
          <BlogCard blog={featuredBlog} variant="featured" />
        </section>
      )}

      {/* Blog Grid */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs
            .filter((b) => b.id !== featuredBlog?.id || searchQuery || selectedCategory !== "All")
            .map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted">No articles found</p>
          </div>
        )}
      </section>
    </div>
  );
}

