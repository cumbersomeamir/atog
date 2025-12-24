"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Map,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Star,
  Home,
  Building2,
  Award,
} from "lucide-react";
import SearchForm from "@/components/forms/SearchForm";
import PropertyCard from "@/components/cards/PropertyCard";
import ProjectCard from "@/components/cards/ProjectCard";
import BlogCard from "@/components/cards/BlogCard";
import AreaCard from "@/components/cards/AreaCard";
import AgentCard from "@/components/cards/AgentCard";
import { properties, projects, blogs, areas, agents, agencies } from "@/data/mockData";

export default function HomePage() {
  const [activeCity, setActiveCity] = useState("Dubai");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const featuredProperties = properties.filter((p) => p.featured);
  const featuredProjects = projects.filter((p) => p.featured);
  const featuredBlogs = blogs.filter((b) => b.featured);

  const quickLinks = [
    {
      title: "AtogEstimate™",
      description: "Find out how much your property is worth",
      icon: Calculator,
      href: "/estimate",
      color: "bg-secondary",
    },
    {
      title: "Search 2.0",
      description: "Find homes by drive time",
      icon: Clock,
      href: "/search?mode=commute",
      color: "bg-primary",
    },
    {
      title: "Map View",
      description: "Search for properties using a map",
      icon: Map,
      href: "/map",
      color: "bg-accent",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Listings", icon: Home },
    { value: "10K+", label: "Verified Agents", icon: Users },
    { value: "25K+", label: "Happy Customers", icon: Star },
    { value: "$2B+", label: "Transactions", icon: TrendingUp },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
        <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt="Luxury property"
            fill
            className="object-cover"
          priority
        />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary-10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container-custom relative z-10 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            {/* Video Link */}
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm hover:bg-white/20 transition-colors"
            >
              <Play className="w-4 h-4" />
              Experience the Atog Journey
            </Link>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white mb-4">
              Real homes <span className="text-secondary">live here</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light">
              Real Data. Real Agents. Real Properties.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <SearchForm variant="hero" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Agents Bar */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-secondary rounded-full" />
                <h3 className="font-display text-lg sm:text-xl text-text-primary">Top Agents</h3>
              </div>
              <Link
                href="/agents"
                className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1"
              >
                Find My Agent
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {agents.slice(0, 4).map((agent) => (
                <AgentCard key={agent.id} agent={agent} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group block p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-border-light"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center shrink-0`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors ml-auto" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Projects Section */}
      <section className="section-padding bg-background-alt">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-2">
                Browse New Projects
              </h2>
              <p className="text-text-secondary">
                Explore the latest off-plan developments
              </p>
            </div>
            {/* City Tabs */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
              {["Dubai", "Abu Dhabi", "Sharjah"].map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCity === city
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-primary"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/projects" className="btn btn-outline">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-2">
                Featured Properties
              </h2>
              <p className="text-text-secondary">
                Handpicked premium listings just for you
              </p>
            </div>
            <Link href="/search" className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-secondary" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-2">
                Discover Popular Neighbourhoods
              </h2>
              <p className="text-text-secondary">
                Explore the most sought-after areas
              </p>
            </div>
            <Link href="/areas" className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
              View All Areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {areas.slice(0, 4).map((area) => (
              <AreaCard key={area.id} area={area} variant="compact" />
            ))}
          </div>

          {/* Large Area Card */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {areas.slice(4, 6).map((area) => (
              <AreaCard key={area.id} area={area} variant="large" />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-background-alt">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-2">
                Real Estate Insights
              </h2>
              <p className="text-text-secondary">
                Stay informed with the latest market news and guides
              </p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Blog */}
            <div className="lg:col-span-2">
              <BlogCard blog={blogs[0]} variant="featured" />
            </div>
            
            {/* Blog List */}
            <div className="space-y-4">
              {blogs.slice(1, 5).map((blog) => (
                <BlogCard key={blog.id} blog={blog} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agencies */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-2">
                Featured Agencies
              </h2>
              <p className="text-text-secondary">
                Partner with the best in the business
              </p>
            </div>
            <Link href="/agencies" className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
              View All Agencies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-border-light"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={agency.logo}
                    alt={agency.name}
                    width={60}
                    height={60}
                    className="rounded-xl"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {agency.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      {agency.rating} ({agency.reviewsCount} reviews)
                    </div>
                  </div>
                  {agency.premium && (
                    <span className="tag tag-secondary ml-auto">Premium</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {agency.agentsCount} Agents
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {agency.propertiesCount} Properties
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-border-light">
                  <Link
                    href={`/agencies/${agency.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-background-alt rounded-xl text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    View Agency
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white mb-4">
                Ready to find your dream home?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of happy customers who found their perfect property with Atog
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/search"
                  className="btn bg-white text-primary hover:bg-secondary hover:text-primary-dark px-8 py-4 text-base"
                >
                  Start Searching
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/sell"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-base"
                >
                  List Your Property
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-center gap-3 text-text-muted">
              <Shield className="w-8 h-8" />
              <div>
                <p className="font-semibold text-text-primary">Verified Listings</p>
                <p className="text-sm">100% authentic properties</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <Award className="w-8 h-8" />
              <div>
                <p className="font-semibold text-text-primary">Award Winning</p>
                <p className="text-sm">Best real estate platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <Clock className="w-8 h-8" />
              <div>
                <p className="font-semibold text-text-primary">24/7 Support</p>
                <p className="text-sm">We&apos;re here to help</p>
              </div>
            </div>
          </div>
    </div>
      </section>
    </>
  );
}
