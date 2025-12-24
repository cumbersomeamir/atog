"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  MapPin,
  Building2,
  Bed,
  Bath,
  Maximize,
  TrendingUp,
  Home,
  ArrowRight,
  Check,
} from "lucide-react";
import { propertyTypes } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

export default function EstimatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    purpose: "sale",
  });
  const [showResult, setShowResult] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate calculation
    const basePrice = parseInt(formData.bedrooms || "1") * 800000 + parseInt(formData.area || "1000") * 1200;
    const randomFactor = 0.9 + Math.random() * 0.2;
    setEstimatedValue(Math.round(basePrice * randomFactor));
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary-light to-secondary py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-primary-dark text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              AtogEstimate™
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary-dark mb-4">
              How much is your property worth?
            </h1>
            <p className="text-lg text-primary-dark/70">
              Get an instant, AI-powered valuation of your property based on real market data
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="container-custom -mt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {!showResult ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        s <= step
                          ? "bg-primary text-white"
                          : "bg-background-alt text-text-muted"
                      }`}
                    >
                      {s < step ? <Check className="w-5 h-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-20 sm:w-32 h-1 mx-2 rounded ${
                          s < step ? "bg-primary" : "bg-background-alt"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Location */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-display text-text-primary mb-6">
                    Where is your property located?
                  </h2>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Enter address, area, or building name"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-4 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.location}
                    className="w-full mt-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Property Type */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-display text-text-primary mb-6">
                    What type of property is it?
                  </h2>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {propertyTypes.slice(0, 6).map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, propertyType: type.value })
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.propertyType === type.value
                            ? "border-primary bg-primary-5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Building2 className={`w-6 h-6 mb-2 ${
                          formData.propertyType === type.value
                            ? "text-primary"
                            : "text-text-muted"
                        }`} />
                        <p className="font-medium text-text-primary">{type.label}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border-2 border-border rounded-xl font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!formData.propertyType}
                      className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-display text-text-primary mb-6">
                    Tell us more about your property
                  </h2>
                  <div className="space-y-4 mb-6">
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
                          className="w-full px-4 py-3 bg-background-alt rounded-xl"
                          required
                        >
                          <option value="">Select</option>
                          <option value="0">Studio</option>
                          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Bathrooms
                        </label>
                        <select
                          value={formData.bathrooms}
                          onChange={(e) =>
                            setFormData({ ...formData, bathrooms: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-background-alt rounded-xl"
                          required
                        >
                          <option value="">Select</option>
                          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Area (sqft)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter property size"
                        value={formData.area}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-background-alt rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border-2 border-border rounded-xl font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-secondary text-primary-dark rounded-xl font-semibold hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
                    >
                      Get Estimate
                      <Calculator className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          ) : (
            /* Result */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-display text-text-primary mb-2">
                Your Property Estimate
              </h2>
              <p className="text-text-muted mb-6">
                Based on market data and property details
              </p>

              <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 mb-6">
                <p className="text-white/80 text-sm mb-2">Estimated Value</p>
                <p className="text-4xl font-bold text-white">
                  {formatPrice(estimatedValue)}
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Range: {formatPrice(estimatedValue * 0.9)} - {formatPrice(estimatedValue * 1.1)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-background-alt rounded-xl">
                  <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Market Trend</p>
                  <p className="font-semibold text-success">+5.2%</p>
                </div>
                <div className="p-4 bg-background-alt rounded-xl">
                  <Home className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Price/sqft</p>
                  <p className="font-semibold text-text-primary">
                    AED {Math.round(estimatedValue / parseInt(formData.area || "1000")).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-background-alt rounded-xl">
                  <Building2 className="w-5 h-5 text-secondary-dark mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Similar Sold</p>
                  <p className="font-semibold text-text-primary">24</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setStep(1);
                    setFormData({
                      location: "",
                      propertyType: "",
                      bedrooms: "",
                      bathrooms: "",
                      area: "",
                      purpose: "sale",
                    });
                  }}
                  className="flex-1 py-4 border-2 border-border rounded-xl font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
                >
                  New Estimate
                </button>
                <button className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors">
                  Talk to Agent
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

