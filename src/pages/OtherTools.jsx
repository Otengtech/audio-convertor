// src/pages/OtherTools.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Video,
  Wallpaper,
  Image,
  FileText,
  Code,
  Palette,
  Compass,
  Zap,
  Clock,
  Shield,
  Star,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const OtherTools = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("all");

  const tools = [
    {
      id: 1,
      name: "Background Remover",
      description:
        "Remove backgrounds from images instantly with AI-powered precision",
      icon: Video,
      category: "video",
      status: "live",
      features: [
        "Size reduction up to 80%",
        "Quality preservation",
        "Batch processing",
      ],
      rating: 4.8,
      url: "https://removerio.vercel.app",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Wallpaper Website",
      description:
        "Find more amazing and attractive wallpapers of your choice to download.",
      icon: Wallpaper,
      category: "image",
      status: "live",
      features: [
        "Wallpapers under all categories",
        "Desktop size wallpapers",
        "Mobile size wallpapers",
      ],
      rating: 4.9,
      url: "https://wallhubio.vercel.app",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      name: "Text Extractor",
      description: "Extract texts from documents with ease",
      icon: Image,
      category: "image",
      status: "live",
      features: [
        "20+ formats supported",
        "Bulk conversion",
        "Quality optimization",
      ],
      rating: 4.7,
      url: "https://docscanio.vercel.app",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 4,
      name: "CodeBase",
      description: "Learn frontend programming languages over here.",
      icon: Code,
      category: "developer",
      status: "live",
      features: [
        "Javascript made simple",
        "Html made simple",
        "Css made simple",
      ],
      rating: null,
      url: "https://codebase-f.onrender.com",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "Color Palette Generator",
      description:
        "Create beautiful color palettes from images or custom selections.",
      icon: Palette,
      category: "design",
      status: "coming-soon",
      features: [
        "Image color extraction",
        "Accessibility checking",
        "Export to multiple formats",
      ],
      rating: 4.8,
      url: "/color-palette",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const categories = [
    { id: "all", name: "All Tools", count: tools.length },
    {
      id: "video",
      name: "Video Tools",
      count: tools.filter((t) => t.category === "video").length,
    },
    {
      id: "audio",
      name: "Audio Tools",
      count: tools.filter((t) => t.category === "audio").length,
    },
    {
      id: "image",
      name: "Image Tools",
      count: tools.filter((t) => t.category === "image").length,
    },
    {
      id: "document",
      name: "Document Tools",
      count: tools.filter((t) => t.category === "document").length,
    },
    {
      id: "developer",
      name: "Developer Tools",
      count: tools.filter((t) => t.category === "developer").length,
    },
    {
      id: "design",
      name: "Design Tools",
      count: tools.filter((t) => t.category === "design").length,
    },
    {
      id: "productivity",
      name: "Productivity",
      count: tools.filter((t) => t.category === "productivity").length,
    },
  ];

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  const statusConfig = {
    live: { label: "Live", color: "bg-green-100 text-green-800" },
    beta: { label: "Beta", color: "bg-blue-100 text-blue-800" },
    "coming-soon": {
      label: "Coming Soon",
      color: "bg-purple-100 text-purple-800",
    },
  };

  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "All tools process files locally in your browser",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "No waiting in queues - get results immediately",
    },
    {
      icon: Clock,
      title: "No Time Limits",
      description: "Use our tools as much as you want, completely free",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gradient mb-6"
          >
            Explore Our Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our suite of free, privacy-focused tools designed to make
            your digital life easier and more productive.
          </motion.p>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white/90"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-purple-200 h-full flex flex-col">
                  {/* Tool Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center`}
                    >
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          statusConfig[tool.status].color
                        }`}
                      >
                        {statusConfig[tool.status].label}
                      </span>
                      {tool.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">
                            {tool.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tool Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {tool.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {tool.features.slice(0, 2).map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-xs text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                    {tool.features.length > 2 && (
                      <div className="text-xs text-gray-400">
                        +{tool.features.length - 2} more features
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    {tool.status === "coming-soon" ? (
                      <button
                        disabled
                        className="w-full bg-gray-100 text-gray-400 py-3 rounded-lg font-medium text-sm cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    ) : (
                      <button className="w-full group/btn bg-gray-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-purple-600 transition-all duration-300 flex items-center justify-center">
                        <Link
                          to={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tool.status === "beta" ? "Try Beta" : "Use Tool"}
                        </Link>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Free Tools" },
              { number: "50K+", label: "Monthly Users" },
              { number: "100%", label: "Privacy Focused" },
              { number: "∞", label: "No Limits" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OtherTools;
