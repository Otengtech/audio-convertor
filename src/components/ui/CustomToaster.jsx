// src/components/ui/CustomToaster.jsx
import { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#374151',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid #e5e7eb'
        },
        success: {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          style: {
            borderLeft: '4px solid #10b981'
          }
        },
        error: {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          style: {
            borderLeft: '4px solid #ef4444'
          }
        },
        loading: {
          icon: <Info className="w-5 h-5 text-blue-500" />,
          style: {
            borderLeft: '4px solid #3b82f6'
          }
        },
        custom: {
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
          style: {
            borderLeft: '4px solid #f59e0b'
          }
        }
      }}
    />
  );
};

export default CustomToaster;