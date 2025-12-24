"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Apple,
  PlayCircle,
} from "lucide-react";

const footerLinks = {
  properties: {
    title: "Properties",
    links: [
      { name: "Properties for Sale", href: "/search?purpose=buy" },
      { name: "Properties for Rent", href: "/search?purpose=rent" },
      { name: "New Projects", href: "/projects" },
      { name: "Off-Plan Properties", href: "/search?status=off-plan" },
      { name: "Luxury Properties", href: "/search?type=luxury" },
      { name: "Commercial Properties", href: "/search?type=commercial" },
    ],
  },
  explore: {
    title: "Explore",
    links: [
      { name: "Area Guides", href: "/areas" },
      { name: "Building Guides", href: "/buildings" },
      { name: "Transactions", href: "/transactions" },
      { name: "AtogEstimate™", href: "/estimate" },
      { name: "Map Search", href: "/map" },
      { name: "Blog", href: "/blog" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { name: "Find an Agent", href: "/agents" },
      { name: "Sell Your Property", href: "/sell" },
      { name: "Property Management", href: "/services/management" },
      { name: "Mortgage Calculator", href: "/mortgage-calculator" },
      { name: "Property Valuation", href: "/estimate" },
      { name: "Investment Advisory", href: "/services/investment" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Contact Us", href: "/contact" },
      { name: "Partner With Us", href: "/partners" },
      { name: "Agent Portal", href: "/agent-portal" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

const popularAreas = [
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "JBR",
  "Dubai Hills",
  "DIFC",
  "Arabian Ranches",
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display mb-2">
                Stay Updated with Atog
              </h3>
              <p className="text-white/70">
                Get the latest property listings and market insights delivered to
                your inbox
              </p>
            </div>
            <form className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white-50 focus:outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-primary-dark font-semibold rounded-xl hover:bg-secondary-light transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-dark font-display">
                  A
                </span>
              </div>
              <span className="text-2xl font-bold font-display">Atog</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-xs">
              Your trusted partner in finding the perfect property. Discover
              premium real estate with verified listings and expert guidance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+971800ATOG"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+971 800 ATOG</span>
              </a>
              <a
                href="mailto:hello@atog.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hello@atog.com</span>
              </a>
              <p className="flex items-start gap-3 text-white/70">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>
                  Downtown Dubai, Boulevard Plaza Tower 1, Office 1501
                </span>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary-dark transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Areas */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="font-semibold mb-4">Popular Areas</h4>
          <div className="flex flex-wrap gap-2">
            {popularAreas.map((area) => (
              <Link
                key={area}
                href={`/areas/${area.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-secondary hover:text-primary-dark transition-all duration-200"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* App Download */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-2">Download Our App</h4>
              <p className="text-sm text-white/70">
                Search properties on the go with our mobile app
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block">
                    Download on the
                  </span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <PlayCircle className="w-6 h-6" />
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block">
                    Get it on
                  </span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Atog. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

