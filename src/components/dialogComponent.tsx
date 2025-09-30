import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ExportDialogProps {
  format: 'html' | 'pdf';
  onClose: () => void;
}

export function ExportDialogComponent({ format, onClose }: ExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // TODO: Implement actual export logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`${format.toUpperCase()} export completed successfully!`);
    setIsExporting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Dialog Content */}
      <div
        className="relative bg-background border rounded-lg shadow-lg w-full max-w-lg p-6 mx-4"
        style={{
          animation: 'dialogFadeIn 0.2s ease-out',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          disabled={isExporting}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <div className="flex flex-col space-y-1.5 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Export as {format.toUpperCase()}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Your conversation will be exported as a {format.toUpperCase()} file.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              This will export the current ChatGPT conversation including:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>User messages</li>
              <li>Assistant responses</li>
              <li>Conversation metadata</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export {format.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes dialogFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

