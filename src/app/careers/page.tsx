"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Zap,
  Globe,
  ArrowRight,
  Building2,
  Search,
} from "lucide-react";

const benefits = [
  { icon: DollarSign, title: "Competitive Salary", description: "Market-leading compensation packages" },
  { icon: Heart, title: "Health Benefits", description: "Comprehensive medical coverage" },
  { icon: Users, title: "Great Team", description: "Work with talented professionals" },
  { icon: Zap, title: "Growth", description: "Learning and development opportunities" },
  { icon: Globe, title: "Flexible Work", description: "Hybrid work options available" },
  { icon: Building2, title: "Modern Office", description: "State-of-the-art workspace" },
];

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: true,
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: false,
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: true,
  },
  {
    id: 4,
    title: "Real Estate Consultant",
    department: "Sales",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    remote: false,
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: true,
  },
  {
    id: 6,
    title: "Data Analyst",
    department: "Data",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: true,
  },
];

const departments = ["All", "Engineering", "Product", "Design", "Sales", "Marketing", "Data"];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || 
      job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop"
            alt="Office"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Help us shape the future of real estate technology. We&apos;re looking
              for talented individuals to join our growing team.
            </p>
            <a
              href="#openings"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-secondary hover:text-primary-dark transition-colors"
            >
              View Open Positions
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Why Work at Atog?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We offer a collaborative environment where innovation thrives and
              every team member can make an impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-secondary-dark" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="section-padding bg-background-alt">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Open Positions
            </h2>
            <p className="text-text-secondary">
              Find your next opportunity at Atog
            </p>
          </motion.div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === dept
                      ? "bg-primary text-white"
                      : "bg-white text-text-secondary hover:text-primary"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      {job.remote && (
                        <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                          Remote Friendly
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/careers/${job.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors shrink-0"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-muted">No positions found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
              Don&apos;t See a Perfect Fit?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for talented people. Send us your resume and
              we&apos;ll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@atog.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-secondary hover:text-primary-dark transition-colors"
            >
              Send Your Resume
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

