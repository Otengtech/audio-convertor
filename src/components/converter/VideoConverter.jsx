import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  FileAudio, 
  Loader2, 
  Download, 
  Trash2, 
  Music, 
  Settings,
  Video,
  Zap,
  CheckCircle,
  AlertCircle,
  Volume2,
  FileText,
  Gauge,
  Type,
  RotateCcw
} from "lucide-react";

export default function VideoConverter() {
  // Load state from localStorage on 
  const loadState = () => {
    try {
      const saved = localStorage.getItem('videoConverterState');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          selectedFile: null,
          convertedAudio: null,
          isConverting: false,
          progress: 0,
          conversionSettings: parsed.conversionSettings || {
            format: "mp3",
            bitrate: "128k",
          }
        };
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    }
    
    return {
      selectedFile: null,
      convertedAudio: null,
      isConverting: false,
      progress: 0,
      conversionSettings: {
        format: "mp3",
        bitrate: "128k",
      }
    };
  };

  const [state, setState] = useState(loadState);
  const { selectedFile, convertedAudio, isConverting, progress, conversionSettings } = state;

  const fileInputRef = useRef(null);

  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    const stateToSave = {
      conversionSettings,
    };
    localStorage.setItem('videoConverterState', JSON.stringify(stateToSave));
  }, [conversionSettings]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setState(prev => ({
        ...prev,
        selectedFile: file,
        convertedAudio: null,
        progress: 0,
      }));
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("format", conversionSettings.format);
    formData.append("bitrate", conversionSettings.bitrate);

    setState(prev => ({ ...prev, isConverting: true, progress: 0 }));

    let fakeInterval = setInterval(() => {
      setState(prev => {
        if (prev.progress >= 95) {
          clearInterval(fakeInterval);
          return { ...prev, progress: 95 };
        }
        return { ...prev, progress: prev.progress + 5 };
      });
    }, 200);

    try {
      const response = await fetch("http://localhost:3001/extract-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Conversion failed: ${response.statusText}`);
      }

      const blob = await response.blob();

      clearInterval(fakeInterval);
      
      const audioFile = new File(
        [blob],
        `${selectedFile.name.replace(/\.[^/.]+$/, "")}.${conversionSettings.format}`,
        { type: `audio/${conversionSettings.format}` }
      );

      setState(prev => ({
        ...prev,
        isConverting: false,
        progress: 100,
        convertedAudio: audioFile,
      }));
    } catch (err) {
      clearInterval(fakeInterval);
      console.error("Conversion error:", err);
      setState(prev => ({ 
        ...prev, 
        isConverting: false,
        progress: 0 
      }));
      alert("Conversion failed. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!convertedAudio) return;

    const url = URL.createObjectURL(convertedAudio);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedAudio.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearFile = () => {
    setState(prev => ({
      ...prev,
      selectedFile: null,
      convertedAudio: null,
      progress: 0,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReset = () => {
    setState({
      selectedFile: null,
      convertedAudio: null,
      isConverting: false,
      progress: 0,
      conversionSettings: {
        format: "mp3",
        bitrate: "128k",
      }
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    localStorage.removeItem('videoConverterState');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFormatIcon = (format) => {
    const icons = {
      mp3: <Music className="w-4 h-4" />,
      aac: <Volume2 className="w-4 h-4" />,
      wav: <FileAudio className="w-4 h-4" />,
      ogg: <FileText className="w-4 h-4" />,
      flac: <Zap className="w-4 h-4" />,
    };
    return icons[format] || <Music className="w-4 h-4" />;
  };

  const getBitrateQuality = (bitrate) => {
    const qualities = {
      '96k': 'Good',
      '128k': 'Better', 
      '192k': 'High',
      '256k': 'Excellent',
      '320k': 'Best'
    };
    return qualities[bitrate] || 'Better';
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <Video className="w-8 h-8 text-blue-600" />
          </div>
          <Zap className="w-6 h-6 text-yellow-500" />
          <div className="p-3 bg-green-100 rounded-2xl">
            <Music className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Video to Audio Converter
        </h1>
        <p className="text-gray-500 mt-2">Extract crystal clear audio from your videos</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Converter Settings</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      {!selectedFile && (
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 group"
        >
          <div className="p-4 bg-blue-100 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-12 h-12 text-blue-600 mx-auto" />
          </div>
          <p className="text-xl font-semibold text-gray-700 mt-4">Choose Video File</p>
          <p className="text-gray-400 mt-2">Drag & drop or click to browse</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              <span>MP4, MOV, AVI</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>MKV, WebM</span>
            </div>
          </div>
        </div>
      )}

      {/* Selected File */}
      {selectedFile && (
        <div className="p-6 border border-gray-200 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-lg">{selectedFile.name}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {formatFileSize(selectedFile.size)}
                </span>
                <span className="flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  {selectedFile.type.split('/')[1]?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClearFile}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
            title="Remove file"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Conversion Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Type className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <label className="font-semibold text-gray-800 block">Audio Format</label>
              <p className="text-gray-500 text-sm">Output file type</p>
            </div>
          </div>
          <select
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 font-medium"
            value={conversionSettings.format}
            onChange={(e) =>
              setState(prev => ({
                ...prev,
                conversionSettings: {
                  ...prev.conversionSettings,
                  format: e.target.value,
                }
              }))
            }
          >
            <option value="mp3">MP3 - Most Compatible</option>
            <option value="aac">AAC - High Quality</option>
            <option value="wav">WAV - Lossless</option>
            <option value="ogg">OGG - Open Format</option>
            <option value="flac">FLAC - Studio Quality</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Gauge className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <label className="font-semibold text-gray-800 block">Audio Quality</label>
              <p className="text-gray-500 text-sm">Bitrate selection</p>
            </div>
          </div>
          <select
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 font-medium"
            value={conversionSettings.bitrate}
            onChange={(e) =>
              setState(prev => ({
                ...prev,
                conversionSettings: {
                  ...prev.conversionSettings,
                  bitrate: e.target.value,
                }
              }))
            }
          >
            <option value="96k">96 kbps - Good Quality</option>
            <option value="128k">128 kbps - Better Quality</option>
            <option value="192k">192 kbps - High Quality</option>
            <option value="256k">256 kbps - Excellent Quality</option>
            <option value="320k">320 kbps - Best Quality</option>
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={!selectedFile || isConverting}
        className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100"
      >
        {isConverting ? (
          <span className="flex justify-center items-center gap-3">
            <Loader2 className="animate-spin w-6 h-6" /> 
            Converting... {progress}%
          </span>
        ) : (
          <span className="flex justify-center items-center gap-3">
            <Zap className="w-6 h-6" />
            Convert to Audio
          </span>
        )}
      </button>

      {/* Progress Bar */}
      {isConverting && (
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Extracting audio from video...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Preview */}
      {convertedAudio && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-green-800 text-xl">Conversion Complete!</p>
              <p className="text-green-600 flex items-center gap-2 mt-1">
                <FileText className="w-4 h-4" />
                {convertedAudio.name}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
            <audio
              controls
              src={URL.createObjectURL(convertedAudio)}
              className="w-full rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getFormatIcon(conversionSettings.format)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Format</p>
                <p className="font-semibold text-gray-800">{conversionSettings.format.toUpperCase()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Gauge className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Quality</p>
                <p className="font-semibold text-gray-800">{getBitrateQuality(conversionSettings.bitrate)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Download className="w-6 h-6" /> 
            Download Audio File
          </button>
        </div>
      )}

      {/* Features Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Zap className="w-5 h-5 text-yellow-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">Fast Conversion</p>
          </div>
          <div className="flex flex-col items-center">
            <Volume2 className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">High Quality</p>
          </div>
          <div className="flex flex-col items-center">
            <Settings className="w-5 h-5 text-purple-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">Multiple Formats</p>
          </div>
          <div className="flex flex-col items-center">
            <Download className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">Instant Download</p>
          </div>
        </div>
      </div>
    </div>
  );
}