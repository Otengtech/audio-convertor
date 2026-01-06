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
  FileText,
  Gauge,
  Type,
  RotateCcw,
  Sparkles,
  Cloud,
  Shield,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function VideoConverter() {
  // Load state from localStorage
  const loadState = () => {
    try {
      const saved = localStorage.getItem("videoConverterState");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          selectedFile: null,
          convertedAudio: null,
          isConverting: false,
          progress: 0,
          conversionSettings: parsed.conversionSettings || {
            format: "mp3",
            bitrate: "192k",
          },
          showTranscript: false,
          transcript: null,
          apiStatus: null,
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
        bitrate: "192k",
      },
      showTranscript: false,
      transcript: null,
      apiStatus: null,
    };
  };

  const [state, setState] = useState(loadState);
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedFile,
    convertedAudio,
    isConverting,
    progress,
    conversionSettings,
    showTranscript,
    transcript,
    apiStatus,
  } = state;

  const fileInputRef = useRef(null);

  // Check API status on mount
  useEffect(() => {
    checkAPIStatus();
  }, []);

  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    const stateToSave = {
      conversionSettings,
    };
    localStorage.setItem("videoConverterState", JSON.stringify(stateToSave));
  }, [conversionSettings]);

  const checkAPIStatus = async () => {
    try {
      const response = await axios.get("https://server-uhlg.onrender.com/api-status");
      setState(prev => ({ ...prev, apiStatus: response.data }));
    } catch (error) {
      console.log("API status check failed, using AssemblyAI");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setState((prev) => ({
        ...prev,
        selectedFile: file,
        convertedAudio: null,
        progress: 0,
        transcript: null,
      }));
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("video", selectedFile);

    setIsLoading(true);
    setState((prev) => ({ ...prev, isConverting: true, progress: 0 }));

    // Smooth progress animation
    let fake = 0;
    const interval = setInterval(() => {
      fake += Math.random() * 2;
      if (fake < 90) {
        setState((prev) => ({ ...prev, progress: Math.floor(fake) }));
      }
    }, 120);

    try {
      const response = await axios.post(
        "https://server-uhlg.onrender.com/extract-audio",
        formData,
        {
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setState((prev) => ({ ...prev, progress: Math.min(percent, 90) }));
            }
          },
        }
      );

      setState((prev) => ({ ...prev, progress: 100 }));

      setTimeout(() => {
        clearInterval(interval);
        setIsLoading(false);

        const blob = new Blob([response.data]);

        // Get filename from content-disposition or use default
        let filename = "audio.mp3";
        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match) filename = match[1];
        }

        const audioFile = new File([blob], filename, {
          type: response.headers["content-type"] || "audio/mpeg",
        });

        setState((prev) => ({
          ...prev,
          isConverting: false,
          convertedAudio: audioFile,
        }));
      }, 250);

    } catch (err) {
      console.error("Conversion error:", err);
      clearInterval(interval);
      setIsLoading(false);
      setState((prev) => ({ 
        ...prev, 
        isConverting: false,
        progress: 0
      }));
      
      // Show error to user
      alert(`Conversion failed: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleConvertWithTranscript = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("video", selectedFile);

    setIsLoading(true);
    setState((prev) => ({ ...prev, isConverting: true, progress: 0 }));

    try {
      const response = await axios.post(
        "https://server-uhlg.onrender.com/extract-with-transcript",
        formData
      );

      if (response.data.download_url) {
        // Download the audio
        const audioResponse = await axios.get(
          `https://server-uhlg.onrender.com${response.data.download_url}`,
          { responseType: "blob" }
        );

        const blob = new Blob([audioResponse.data]);
        const audioFile = new File([blob], "audio-with-transcript.mp3", {
          type: "audio/mpeg",
        });

        setState((prev) => ({
          ...prev,
          isConverting: false,
          convertedAudio: audioFile,
          transcript: response.data.transcript,
          showTranscript: true,
        }));
      }

    } catch (err) {
      console.error("Transcript conversion error:", err);
      setIsLoading(false);
      setState((prev) => ({ 
        ...prev, 
        isConverting: false 
      }));
      alert("Transcript feature failed, converting audio only...");
      handleConvert(); // Fallback to regular conversion
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
    setState((prev) => ({
      ...prev,
      selectedFile: null,
      convertedAudio: null,
      progress: 0,
      transcript: null,
      showTranscript: false,
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
        bitrate: "192k",
      },
      showTranscript: false,
      transcript: null,
      apiStatus: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    localStorage.removeItem("videoConverterState");
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFormatIcon = (format) => {
    const icons = {
      mp3: <Music className="w-4 h-4" />,
      aac: <Cloud className="w-4 h-4" />,
      wav: <FileAudio className="w-4 h-4" />,
      ogg: <FileText className="w-4 h-4" />,
      flac: <Zap className="w-4 h-4" />,
    };
    return icons[format] || <Music className="w-4 h-4" />;
  };

  const truncateFileName = (name, maxLength = 10) => {
    if (!name) return "";
    const dotIndex = name.lastIndexOf(".");
    const ext = dotIndex !== -1 ? name.slice(dotIndex) : "";
    const base = dotIndex !== -1 ? name.slice(0, dotIndex) : name;

    if (base.length <= maxLength) return name;
    return base.slice(0, maxLength) + "..." + ext;
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-50 p-8 border border-gray-100 rounded-2xl shadow-sm">
      {/* Header with AI Badge */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Powered by AssemblyAI</span>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Audio Extractor
        </h1>
        <p className="text-gray-500 mt-2">
          Extract high-quality audio using advanced AI processing
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Settings className="w-5 h-5" />
          <Link
            to="/features"
            className="font-medium hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
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
          onClick={() => fileInputRef.current?.click()}
          className="border-3 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all duration-300 group"
        >
          <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-12 h-12 text-blue-600 mx-auto" />
          </div>
          <p className="text-xl font-semibold text-gray-700 mt-4">
            Upload Video File
          </p>
          <p className="text-gray-400 mt-2">Supports MP4, MOV, AVI, MKV, WebM</p>
          <div className="mt-4 text-sm text-blue-600 font-medium">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span>AI-powered processing • 5 hours free/month</span>
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
            <div className="overflow-hidden max-w-full">
              <p
                className="font-semibold text-gray-800 text-lg"
                title={selectedFile.name}
              >
                {truncateFileName(selectedFile.name, 15)}
              </p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {formatFileSize(selectedFile.size)}
                </span>
                <span className="flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  {selectedFile.type.split("/")[1]?.toUpperCase() || "VIDEO"}
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

      {/* Conversion Buttons */}
      {selectedFile && !convertedAudio && (
        <div className="mt-8 space-y-4">
          <button
            onClick={handleConvert}
            disabled={!selectedFile || isConverting}
            className="w-full px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-full disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isConverting ? (
              <span className="flex justify-center items-center gap-3">
                <Loader2 className="animate-spin w-6 h-6" />
                Processing with AI... {progress}%
              </span>
            ) : (
              <span className="flex justify-center items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Extract Audio with AI
              </span>
            )}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {isConverting && (
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Processing in progress...
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Using AssemblyAI for high-quality audio extraction
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Audio Preview */}
      {convertedAudio && (
        <div className="mt-6 p-6 rounded-2xl shadow-sm bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-green-800 text-xl">
                AI Processing Complete!
              </p>
              <p className="text-green-600 flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4" />
                High-quality audio extracted
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Music className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Format</p>
                <p className="font-semibold text-gray-800">MP3</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Cloud className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Processing</p>
                <p className="font-semibold text-gray-800">AssemblyAI</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
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
            <Sparkles className="w-5 h-5 text-yellow-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">AI Powered</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">Secure Processing</p>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="w-5 h-5 text-purple-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">Cloud AI</p>
          </div>
          <div className="flex flex-col items-center">
            <Download className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-sm font-medium text-gray-700">Instant Download</p>
          </div>
        </div>
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Powered by AssemblyAI • 5 free hours per month</p>
        </div>
      </div>
    </div>
  );
}