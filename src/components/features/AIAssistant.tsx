"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Home,
  Calculator,
  MapPin,
  TrendingUp,
  Bot,
  User,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Home, label: "Find properties for sale in Downtown" },
  { icon: Calculator, label: "Calculate mortgage for 2M property" },
  { icon: MapPin, label: "Best areas for families" },
  { icon: TrendingUp, label: "Market trends 2024" },
];

const sampleResponses: Record<string, string> = {
  default: "Hello! I'm AtogGPT, your AI real estate assistant. I can help you find properties, calculate mortgages, explore neighborhoods, and answer questions about the real estate market. How can I assist you today?",
  "find properties": "I'd be happy to help you find properties! Based on current listings in Downtown Dubai, we have:\n\n• **Studio apartments** starting from AED 750K\n• **1-bedroom apartments** from AED 1.2M\n• **2-bedroom apartments** from AED 2M\n• **Penthouses** from AED 8M\n\nWould you like me to filter by specific criteria like price range, size, or amenities?",
  "mortgage": "For a 2M AED property with typical financing terms:\n\n**Down Payment (20%)**: AED 400,000\n**Loan Amount**: AED 1,600,000\n**Monthly Payment (25 years @ 4.5%)**: ~AED 8,880\n\nThis is an estimate. Actual rates may vary based on your profile. Would you like me to connect you with a mortgage advisor?",
  "families": "Here are the best family-friendly areas:\n\n1. **Arabian Ranches** - Excellent schools, parks, golf course\n2. **Dubai Hills Estate** - New community with great amenities\n3. **Jumeirah** - Close to beaches and schools\n4. **DAMAC Hills** - Affordable with good facilities\n\nEach area has different price points. Would you like details on any specific area?",
  "market": "**2024 Market Highlights:**\n\n📈 Average prices up 12% YoY\n🏠 Off-plan sales increased by 35%\n🌟 Dubai Marina remains top choice for rentals\n💰 Palm Jumeirah saw highest appreciation\n\nThe market shows strong momentum with continued investor interest. Want specific insights on any area?",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: sampleResponses.default,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("property") || lowerQuery.includes("find") || lowerQuery.includes("sale") || lowerQuery.includes("downtown")) {
      return sampleResponses["find properties"];
    }
    if (lowerQuery.includes("mortgage") || lowerQuery.includes("calculate") || lowerQuery.includes("loan")) {
      return sampleResponses.mortgage;
    }
    if (lowerQuery.includes("family") || lowerQuery.includes("families") || lowerQuery.includes("children") || lowerQuery.includes("school")) {
      return sampleResponses.families;
    }
    if (lowerQuery.includes("market") || lowerQuery.includes("trend") || lowerQuery.includes("2024")) {
      return sampleResponses.market;
    }
    return "I understand you're interested in real estate. Could you tell me more specifically what you're looking for? I can help with:\n\n• Property search (buy/rent)\n• Area recommendations\n• Price trends and market data\n• Mortgage calculations\n• Agent connections";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = getResponse(input);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-4 bg-primary text-white rounded-2xl shadow-2xl hover:bg-primary-light transition-all duration-300",
          isOpen && "hidden"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Sparkles className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </div>
        <span className="font-medium">AtogGPT</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AtogGPT</h3>
                    <p className="text-xs text-white/80">AI Real Estate Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                      message.role === "assistant"
                        ? "bg-primary text-white"
                        : "bg-secondary text-primary-dark"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "assistant"
                        ? "bg-background-alt text-text-primary"
                        : "bg-primary text-white"
                    )}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-[10px] opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-background-alt rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-text-muted">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-text-muted mb-2">Quick prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.label)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-background-alt rounded-full text-xs text-text-secondary hover:bg-primary-10 hover:text-primary transition-colors"
                    >
                      <prompt.icon className="w-3 h-3" />
                      <span className="truncate max-w-[150px]">{prompt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about real estate..."
                  className="flex-1 px-4 py-3 bg-background-alt rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-[10px] text-text-muted text-center mt-2">
                AtogGPT may produce inaccurate information. Verify important details.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

