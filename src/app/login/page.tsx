"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome,
  Facebook,
  Apple,
} from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 flex items-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white font-display">
                    A
                  </span>
                </div>
                <span className="text-3xl font-bold text-primary font-display">
                  Atog
                </span>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex bg-background-alt rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  isLogin
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  !isLogin
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 py-3 border-2 border-border rounded-xl font-medium hover:border-primary hover:text-primary transition-colors">
                <Chrome className="w-5 h-5" />
                Continue with Google
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl font-medium hover:border-primary hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                  Facebook
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl font-medium hover:border-primary hover:text-primary transition-colors">
                  <Apple className="w-5 h-5" />
                  Apple
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-4 py-3 bg-background-alt border-2 border-transparent rounded-xl focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-sm text-text-secondary">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary-light"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {!isLogin && (
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 text-primary rounded"
                    required
                  />
                  <span className="text-sm text-text-secondary">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-text-muted mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:text-primary-light"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

