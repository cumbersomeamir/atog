"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowUpDown,
  Building2,
  Calendar,
  DollarSign,
  Maximize,
} from "lucide-react";
import { transactions } from "@/data/mockData";
import { formatPrice, formatDate } from "@/lib/utils";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    if (searchQuery) {
      return t.area.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  }).filter((t) => 
    filterType === "all" || t.transactionType === filterType
  );

  // Calculate stats
  const totalVolume = filteredTransactions.reduce((sum, t) => sum + t.price, 0);
  const avgPrice = totalVolume / filteredTransactions.length || 0;
  const salesCount = transactions.filter((t) => t.transactionType === "sale").length;
  const rentCount = transactions.filter((t) => t.transactionType === "rent").length;

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
              Market Transactions
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Real-time property transaction data to help you make informed decisions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-custom -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Volume", value: formatPrice(totalVolume), icon: DollarSign, color: "bg-primary" },
            { label: "Avg. Transaction", value: formatPrice(avgPrice), icon: TrendingUp, color: "bg-secondary" },
            { label: "Sales", value: salesCount.toString(), icon: Building2, color: "bg-success" },
            { label: "Rentals", value: rentCount.toString(), icon: Calendar, color: "bg-accent" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="container-custom py-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search by area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            {[
              { value: "all", label: "All" },
              { value: "sale", label: "Sales" },
              { value: "rent", label: "Rentals" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filterType === type.value
                    ? "bg-primary text-white"
                    : "bg-white text-text-secondary hover:text-primary border border-border"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background-alt">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Area</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Size</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-text-primary">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-background-alt transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`tag ${
                        transaction.transactionType === "sale" 
                          ? "tag-primary" 
                          : "tag-secondary"
                      }`}>
                        {transaction.transactionType === "sale" ? "Sale" : "Rent"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">
                      {transaction.area}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {transaction.propertyType}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {transaction.size.toLocaleString()} sqft
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary text-right">
                      {formatPrice(transaction.price)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

