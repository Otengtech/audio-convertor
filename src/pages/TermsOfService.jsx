// src/pages/TermsOfService.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FileText,
  Shield,
  AlertTriangle,
  Users,
  Globe,
  BookOpen
} from 'lucide-react';

const TermsOfService = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const keySections = [
    {
      icon: Users,
      title: 'User Responsibilities',
      items: [
        'You must be at least 13 years old to use this service',
        'You are responsible for the files you upload and process',
        'Do not upload copyrighted content without permission',
        'Respect our service limits and fair usage policies'
      ]
    },
    {
      icon: Shield,
      title: 'Service Usage',
      items: [
        'Service is provided "as is" without warranties',
        'We may terminate service for abusive behavior',
        'You retain all rights to your original content',
        'We process files locally on your device'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Activities',
      items: [
        'No illegal or infringing content',
        'No reverse engineering or hacking attempts',
        'No spamming or abusive behavior',
        'No commercial reselling of our service'
      ]
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
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Please read these terms carefully before using AudioExtract
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4 inline-block"
          >
            Effective: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              By accessing and using AudioExtract, you accept and agree to be bound by 
              the terms and provision of this agreement. These Terms of Service govern 
              your use of the web application.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Sections */}
      <section ref={ref} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="card p-6"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <section.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-12">
            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
                Intellectual Property
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  The AudioExtract service and its original content, features, and functionality 
                  are owned by CodeBase and are protected by international copyright, trademark, 
                  and other intellectual property laws.
                </p>
                <p>
                  You retain all rights to the original files you upload. We claim no ownership 
                  over your content. The processed audio files belong to you.
                </p>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-purple-600 mr-3" />
                Limitation of Liability
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  In no event shall AudioExtract, nor its directors, employees, partners, agents, 
                  suppliers, or affiliates, be liable for any indirect, incidental, special, 
                  consequential or punitive damages, including without limitation, loss of profits, 
                  data, use, goodwill, or other intangible losses.
                </p>
                <p>
                  The service is provided on an "as is" and "as available" basis without any 
                  warranties of any kind.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-purple-50 rounded-xl p-8 border border-purple-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Questions?
              </h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p className="text-purple-600 font-medium">
                otengebenezer326@gmail.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;