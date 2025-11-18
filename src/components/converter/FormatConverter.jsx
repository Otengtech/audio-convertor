// src/components/converter/FormatConverter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FileAudio, Music, Headphones, Disc } from 'lucide-react';

const FormatConverter = ({ currentFormat, onFormatChange }) => {
  const formats = [
    {
      id: 'mp3',
      name: 'MP3',
      description: 'Most compatible format, good quality',
      bitrates: ['128', '192', '256', '320'],
      icon: Music,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'wav',
      name: 'WAV',
      description: 'Lossless quality, large file size',
      bitrates: ['1411'],
      icon: Disc,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'ogg',
      name: 'OGG',
      description: 'Open format, good compression',
      bitrates: ['96', '128', '192', '256'],
      icon: Headphones,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'm4a',
      name: 'M4A',
      description: 'Apple format, high efficiency',
      bitrates: ['128', '192', '256'],
      icon: FileAudio,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const currentFormatData = formats.find(f => f.id === currentFormat);

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-6">Output Format</h3>
      
      {/* Format Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {formats.map((format) => (
          <motion.button
            key={format.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFormatChange(format.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              currentFormat === format.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${format.color} rounded-lg flex items-center justify-center mb-3`}>
              <format.icon className="w-6 h-6 text-white" />
            </div>
            <div className="font-semibold text-gray-900">{format.name}</div>
            <div className="text-sm text-gray-600 mt-1">{format.description}</div>
          </motion.button>
        ))}
      </div>

      {/* Bitrate Selection */}
      {currentFormatData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t pt-6"
        >
          <h4 className="font-medium mb-4">Quality Settings</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentFormatData.bitrates.map((bitrate) => (
              <button
                key={bitrate}
                className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-center"
              >
                <div className="font-medium text-gray-900">{bitrate} kbps</div>
                <div className="text-sm text-gray-500">
                  {bitrate === '1411' ? 'CD Quality' : `${bitrate} kbps`}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Format Info */}
      {currentFormatData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${currentFormatData.color} rounded-lg flex items-center justify-center`}>
              <currentFormatData.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">{currentFormatData.name} Format</div>
              <div className="text-sm text-gray-600">{currentFormatData.description}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FormatConverter;