// src/pages/HowToUse.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Upload, 
  Settings, 
  Download, 
  Play,
  Zap,
  Clock,
  Shield,
  Video,
  Music,
  CheckCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const HowToUse = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Video',
      description: 'Drag and drop your video file or click to browse',
      details: 'Supported formats: MP4, AVI, MOV, WEBM, MKV, and more',
      tips: ['Files up to 2GB', 'No registration required', 'Instant upload']
    },
    {
      icon: Settings,
      title: 'Adjust Settings',
      description: 'Customize your audio output format and quality',
      details: 'Choose from MP3, WAV, OGG, M4A, FLAC formats',
      tips: ['Bitrate: 128kbps to 320kbps', 'Sample rate: 44.1kHz to 96kHz', 'Preserve original quality']
    },
    {
      icon: Play,
      title: 'Process & Convert',
      description: 'Click convert and watch the magic happen locally',
      details: 'All processing happens in your browser - no server upload',
      tips: ['Real-time progress', 'No waiting in queues', 'Instant preview']
    },
    {
      icon: Download,
      title: 'Download Audio',
      description: 'Save your high-quality audio file instantly',
      details: 'Your file is ready for download immediately after conversion',
      tips: ['No watermarks', 'Full quality', 'Multiple download options']
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Fast Conversion',
      description: 'Convert videos to audio in seconds with WebAssembly technology',
      stat: '< 30 seconds'
    },
    {
      icon: Shield,
      title: '100% Private',
      description: 'Your files never leave your device. No cloud storage, no tracking.',
      stat: 'Local Processing'
    },
    {
      icon: Clock,
      title: 'No Waiting',
      description: 'Skip the queues and processing delays of other online converters',
      stat: 'Instant Start'
    }
  ];

  const supportedFormats = {
    input: [
      { name: 'MP4', codec: 'H.264, H.265' },
      { name: 'AVI', codec: 'Xvid, DivX' },
      { name: 'MOV', codec: 'MPEG-4, H.264' },
      { name: 'WEBM', codec: 'VP8, VP9' },
      { name: 'MKV', codec: 'Various' },
      { name: 'WMV', codec: 'VC-1' }
    ],
    output: [
      { name: 'MP3', quality: '128-320 kbps' },
      { name: 'WAV', quality: 'Lossless' },
      { name: 'OGG', quality: 'Variable' },
      { name: 'M4A', quality: 'AAC' },
      { name: 'FLAC', quality: 'Lossless' },
      { name: 'AAC', quality: 'High Quality' }
    ]
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

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
            How to Use
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Extract audio from videos in just 4 simple steps - completely free and private
          </motion.p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section ref={ref} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Step Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-sm border">
              {steps.map((step, index) => (
                <button
                  key={step.title}
                  onClick={() => setCurrentStep(index)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentStep === index
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  Step {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-8"
            >
              {/* <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                `steps[currentStep].iconclassName="w-8 h-8 text-purple-600`
              </div> */}
              
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {steps[currentStep].title}
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                {steps[currentStep].description}
              </p>

              <p className="text-gray-500 mb-6">
                {steps[currentStep].details}
              </p>

              <div className="space-y-3">
                {steps[currentStep].tips.map((tip, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>

            {/* Visual Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Video className="w-6 h-6 mr-2" />
                    <span className="font-semibold">video.mp4</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                  <div className="flex items-center">
                    <Music className="w-6 h-6 mr-2" />
                    <span className="font-semibold">audio.mp3</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white/20 rounded-full h-2 mb-4">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>

                <div className="text-center">
                  <p className="text-white/80 text-sm">
                    {currentStep === steps.length - 1 ? 'Complete!' : `Processing step ${currentStep + 1}...`}
                  </p>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {features.map((feature, index) => (
                  <div key={feature.title} className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-xs text-gray-600">{feature.stat}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Supported Formats
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Work with virtually any video format and export to your preferred audio format
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Formats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-center mb-6">
                <Video className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Input Videos</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {supportedFormats.input.map((format, index) => (
                  <div key={format.name} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900">{format.name}</div>
                    <div className="text-sm text-gray-500">{format.codec}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Output Formats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-center mb-6">
                <Music className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Output Audio</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {supportedFormats.output.map((format, index) => (
                  <div key={format.name} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900">{format.name}</div>
                    <div className="text-sm text-gray-500">{format.quality}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Pro Tips
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tip: 'For best quality, use MP3 at 320kbps or WAV for lossless audio',
                icon: Zap
              },
              {
                tip: 'Close other browser tabs for faster conversion speeds',
                icon: Clock
              },
              {
                tip: 'Use Chrome or Firefox for optimal performance and format support',
                icon: Shield
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm border"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-gray-600 text-sm">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToUse;