// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  Mail,
  Server
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const privacyPrinciples = [
    {
      icon: Lock,
      title: 'Local Processing',
      description: 'All audio conversion happens directly in your browser. Your files never leave your device.',
      details: 'We use WebAssembly and client-side processing to ensure complete privacy.'
    },
    {
      icon: Eye,
      title: 'No File Storage',
      description: 'We do not store, save, or have access to any files you process on our platform.',
      details: 'Files are temporarily processed in memory and immediately discarded after conversion.'
    },
    {
      icon: Database,
      title: 'Minimal Data Collection',
      description: 'We only collect essential data needed to provide and improve our service.',
      details: 'Basic analytics help us understand usage patterns and improve performance.'
    },
    {
      icon: Cookie,
      title: 'Transparent Cookies',
      description: 'We use cookies only for essential functionality and analytics.',
      details: 'You have full control over cookie preferences in your browser settings.'
    }
  ];

  const dataSections = [
    {
      title: 'Information We Collect',
      icon: UserCheck,
      items: [
        'Technical information (browser type, device information)',
        'Usage data (features used, conversion times)',
        'Error reports and performance metrics',
        'Optional: Email address (if you contact support)'
      ]
    },
    {
      title: 'How We Use Your Data',
      icon: Server,
      items: [
        'Provide and maintain the audio conversion service',
        'Improve website performance and user experience',
        'Respond to customer support requests',
        'Analyze usage patterns to enhance features'
      ]
    },
    {
      title: 'Data Sharing & Disclosure',
      icon: Shield,
      items: [
        'We do not sell or rent your personal data to third parties',
        'We may share anonymized, aggregated usage statistics',
        'Legal compliance when required by law',
        'Service providers (hosting, analytics) under strict contracts'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Privacy Principles */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              Our Privacy Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We built AudioExtract with privacy as a core feature, not an afterthought.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="card p-8 transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <principle.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-600 mb-4 text-lg">
                  {principle.description}
                </p>
                <p className="text-gray-500">
                  {principle.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Data Policy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Data Policy Details
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent information about how we handle your data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Legal Sections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-12">
            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <UserCheck className="w-6 h-6 text-purple-600 mr-3" />
                Your Privacy Rights
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  You have the right to:
                </p>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    'Access your personal data',
                    'Correct inaccurate data',
                    'Request data deletion',
                    'Object to data processing',
                    'Data portability',
                    'Withdraw consent'
                  ].map((right, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      {right}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Mail className="w-6 h-6 text-purple-600 mr-3" />
                Contact & Questions
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="space-y-2">
                  <li>• Email: otengebenezer326@gmail.com</li>
                  <li>• Response time: Within 48 hours</li>
                  <li>• Data protection inquiries prioritized</li>
                </ul>
              </div>
            </motion.div>

            {/* Policy Updates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 rounded-xl p-8 border border-purple-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Policy Updates
              </h3>
              <p className="text-gray-600 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-600">
                We encourage you to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;