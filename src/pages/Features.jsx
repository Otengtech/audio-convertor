// src/pages/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Lock, 
  Cloud, 
  Settings, 
  Download,
  Zap,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

const Features = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const mainFeatures = [
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'All processing happens locally in your browser. Your files never leave your device.',
      features: ['Local processing', 'No file storage', 'End-to-end security']
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Convert videos to audio in seconds with our optimized conversion engine.',
      features: ['WebAssembly powered', 'Batch processing', 'Multi-threaded conversion']
    },
    {
      icon: Settings,
      title: 'Advanced Controls',
      description: 'Fine-tune your audio with professional-grade editing tools. This will be added soon.',
      features: ['Audio normalization', 'Noise reduction', 'EQ controls', 'Bitrate adjustment']
    },
    {
      icon: Cloud,
      title: 'Cloud Ready',
      description: 'Optional cloud processing for larger files and additional features.',
      features: ['5GB file support', 'Extract within seconds', 'Team collaboration']
    }
  ];

  const secondaryFeatures = [
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Support for all popular audio formats including MP3, WAV, OGG, M4A, FLAC'
    },
    {
      icon: Shield,
      title: 'No Watermarks',
      description: 'Get clean, professional audio files without any watermarks or branding'
    },
    {
      icon: Users,
      title: 'Fast Extraction',
      description: 'Extraction of audio from video happens very fast with all audio formats'
    },
    {
      icon: BarChart3,
      title: 'Quality Analytics',
      description: 'Get detailed analytics about your audio quality and conversion metrics'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gradient mb-6"
          >
            Powerful Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need to extracT audio from any video.
          </motion.p>
        </div>
      </section>

      {/* Main Features */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="card p-8 transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">
              And So Much More
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Additional features that make AudioExtract the ultimate audio extraction tool
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-left text-md">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;