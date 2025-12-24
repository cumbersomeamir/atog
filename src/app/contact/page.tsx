"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+971 800 ATOG",
      link: "tel:+971800ATOG",
    },
    {
      icon: Mail,
      title: "Email",
      value: "hello@atog.com",
      link: "mailto:hello@atog.com",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Downtown Dubai, Boulevard Plaza Tower 1, Office 1501",
      link: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Sun - Thu: 9AM - 6PM",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Have a question or need assistance? We&apos;re here to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-custom -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-10 flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">
                {info.title}
              </h3>
              <p className="text-sm text-text-muted">{info.value}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-display text-text-primary mb-6">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-success/10 rounded-2xl p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-muted mb-4">
                  Thank you for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="text-primary font-medium hover:text-primary-light"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="property">Property Inquiry</option>
                      <option value="agent">Agent Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-display text-text-primary mb-6">
              Our Location
            </h2>
            <div className="bg-background-alt rounded-2xl h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Map placeholder</p>
                <p className="text-sm text-text-muted mt-2">
                  Downtown Dubai, Boulevard Plaza Tower 1
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6 p-6 bg-success/10 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    Chat with us on WhatsApp
                  </h3>
                  <p className="text-sm text-text-muted">
                    Get instant support 24/7
                  </p>
                </div>
                <a
                  href="https://wa.me/971800ATOG"
                  className="px-4 py-2 bg-success text-white rounded-xl font-medium hover:bg-success/90 transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

