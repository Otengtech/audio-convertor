// src/pages/Converter.jsx
import React from 'react';
import VideoConverter from '../components/converter/VideoConverter';

const Converter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <VideoConverter />
    </div>
  );
};

export default Converter;