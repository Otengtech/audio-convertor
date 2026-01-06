// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Play, Download, Shield, Zap } from 'lucide-react';
import VideoConverter from '../components/converter/VideoConverter';
import HowToUse from '../components/ui/HowToUse';

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { number: '50K+', label: 'Videos Converted' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '24/7', label: 'Service Available' },
    { number: '10+', label: 'Audio Formats' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Extract Audio from Videos Instantly
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Convert MP4 to MP3 and other audio formats with crystal clear quality. 
              No registration required.Very Fast and Free Forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/converter" className="btn-primary bg-gradient-to-r from-purple-600 to-pink-600 text-lg text-white rounded-full px-8 py-3 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Converting Free</span>
              </Link>
              <Link to="/features" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-pink-500" />
                <span>100% Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-pink-500" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-pink-500" />
                <span>No Watermarks</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HowToUse />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Extract Your Audio?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-purple-100 mb-8"
          >
            Join thousands of users who trust AudioExtract for their audio conversion needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/converter"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-full transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Convert Your First Video Free</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;