import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { ExportSettings, type ExportConfig } from '@/components/exportSettings';
import { AccountSettings } from '@/components/accountSettings';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster, toast } from 'react-hot-toast';
import { sendMessage } from 'webext-bridge/popup';

async function handleExport(config: ExportConfig) {
  console.log('Export configuration:', config);
  
  try {
    // Send export request to background script
    const response = await sendMessage(
      'popup-export',
      { 
        format: config.format,
        includeMessages: config.includeMessages
      },
      'background'
    );
    
    console.log('Export response:', response);
    toast.success(`Export completed successfully!`);
  } catch (error) {
    console.error('Export failed:', error);
    toast.error('Export failed. Please try again.');
  }
}

function App() {
  const [currentView, setCurrentView] = useState<'export' | 'account'>('export');

      return (
        <>
          <ScrollArea className="w-[400px] h-[500px] bg-background">
            {currentView === 'export' ? (
              <div className="space-y-4">
                <ExportSettings onExport={handleExport} />
                <div className="px-6 pb-6">
                  <AccountSettings
                    onBack={() => setCurrentView('export')}
                    onNavigateToAccount={() => setCurrentView('account')}
                  />
                </div>
              </div>
            ) : (
              <AccountSettings onBack={() => setCurrentView('export')} />
            )}
          </ScrollArea>
          <Toaster />
        </>
      );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
