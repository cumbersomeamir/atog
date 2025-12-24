"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Globe,
  Target,
  Heart,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Active Listings", icon: Building2 },
  { value: "10K+", label: "Verified Agents", icon: Users },
  { value: "25K+", label: "Happy Customers", icon: Heart },
  { value: "15+", label: "Years Experience", icon: Award },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in all our dealings. Every listing is verified, and every agent is vetted.",
  },
  {
    icon: Target,
    title: "Customer First",
    description: "Your satisfaction is our priority. We go above and beyond to ensure you find your perfect property.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We leverage cutting-edge technology like AI to provide you with the best real estate experience.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "With connections worldwide, we help international buyers and investors find opportunities.",
  },
];

const team = [
  {
    name: "Ahmed Al Maktoum",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
  {
    name: "Fatima Ali",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop"
            alt="Background"
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
              About Atog
            </h1>
            <p className="text-xl text-white/80">
              We&apos;re on a mission to make finding your dream property simple,
              transparent, and delightful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-custom -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Founded in 2010, Atog has grown from a small startup to become
                  the region&apos;s leading real estate platform. Our journey began
                  with a simple idea: to make property search as easy and
                  transparent as possible.
                </p>
                <p>
                  Today, we serve millions of users every month, helping them
                  find their perfect homes, connect with trusted agents, and
                  make informed decisions with our AI-powered tools and market
                  insights.
                </p>
                <p>
                  Our platform features verified listings, expert agents, and
                  innovative features like AtogEstimate™ and AtogGPT, setting
                  new standards in the real estate industry.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background-alt">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Our Values
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-20 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-secondary-dark" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Leadership Team
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Meet the people driving our vision forward
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-text-primary">{member.name}</h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
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
              Join Our Journey
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re looking for your dream home or want to be part of
              our team, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/careers"
                className="btn bg-white text-primary hover:bg-secondary hover:text-primary-dark"
              >
                View Careers
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

