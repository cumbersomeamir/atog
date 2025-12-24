"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Camera,
  Users,
  TrendingUp,
  Check,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  Building2,
} from "lucide-react";
import { propertyTypes } from "@/data/mockData";

const benefits = [
  {
    icon: TrendingUp,
    title: "Maximum Exposure",
    description: "Your property reaches millions of potential buyers",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Connect with verified, top-performing agents",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Safe and transparent selling experience",
  },
  {
    icon: Clock,
    title: "Quick Results",
    description: "Properties sell faster with our platform",
  },
];

const steps = [
  {
    number: "01",
    title: "List Your Property",
    description: "Fill out the form with your property details",
  },
  {
    number: "02",
    title: "Get Matched",
    description: "We connect you with qualified agents in your area",
  },
  {
    number: "03",
    title: "Review & Approve",
    description: "Choose the best agent and listing strategy",
  },
  {
    number: "04",
    title: "Sell & Celebrate",
    description: "Close the deal and get the best price",
  },
];

export default function SellPage() {
  const [formData, setFormData] = useState({
    propertyType: "",
    bedrooms: "",
    location: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary-light to-secondary" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary-dark mb-6">
                Sell Your Property with Confidence
              </h1>
              <p className="text-lg text-primary-dark/70 mb-8">
                List with Atog and reach millions of potential buyers. Our expert
                agents and advanced tools ensure you get the best price.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {["Free Listing", "Verified Buyers", "Expert Support"].map(
                  (item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 text-primary-dark"
                    >
                      <Check className="w-5 h-5 text-success" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="text-2xl font-display text-text-primary mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-text-muted mb-6">
                    An agent will contact you within 24 hours to discuss your
                    property.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-medium hover:text-primary-light"
                  >
                    Submit another property
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-display text-text-primary mb-6">
                    Get Started Today
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            propertyType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-background-alt rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select type</option>
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Bedrooms
                        </label>
                        <select
                          value={formData.bedrooms}
                          onChange={(e) =>
                            setFormData({ ...formData, bedrooms: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-background-alt rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select</option>
                          <option value="studio">Studio</option>
                          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <option key={n} value={n}>
                              {n} BR
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="Area/Building"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-background-alt rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-background-alt rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-background-alt rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-background-alt rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                    >
                      Get Free Valuation
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Why Sell with Atog?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We provide everything you need to sell your property quickly and at
              the best price
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-10 flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-primary" />
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

      {/* Process Steps */}
      <section className="section-padding bg-background-alt">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Selling your property is simple with our streamlined process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <span className="text-4xl font-bold text-secondary/30">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

