import { onMessage } from 'webext-bridge/content-script';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../popup/style.css';
import { ExportDialogComponent } from '@/components/dialogComponent';
import { Toaster } from 'react-hot-toast';

interface ExportMessage {
  format: 'html' | 'pdf';
  includeMessages: {
    user: boolean;
    assistant: boolean;
  };
}

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    // Store format for when dialog mounts
    let currentFormat: 'html' | 'pdf' = 'html';
    let reactRoot: ReactDOM.Root | null = null;

    // Create Shadow DOM UI for the dialog
    const ui = await createShadowRootUi(ctx, {
      name: "chatgpt-exporter-dialog",
      position: "overlay",
      onMount: (container, shadow, shadowHost) => {
        
        // Style the shadow host
        Object.assign(shadowHost.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '999999',
          pointerEvents: 'auto',
        });

        // Style the container
        Object.assign(container.style, {
          width: '100%',
          height: '100%',
          position: 'relative',
        });

        // Create React root if it doesn't exist
        if (!reactRoot) {
          reactRoot = ReactDOM.createRoot(container);
        }

        // Render the dialog component
        reactRoot.render(
          <React.StrictMode>
            <ExportDialogComponent
              format={currentFormat}
              onClose={() => {
                ui.remove();
              }}
            />
            <Toaster />
          </React.StrictMode>
        );


        return reactRoot;
      },
      onRemove(root) {
        if (root) {
          root.unmount();
          reactRoot = null;
        }
      },
    });

    // Use webext-bridge for cross-browser compatibility
    onMessage('export-conversation', async (message) => {
      
      try {
        const { format, includeMessages } = message.data as unknown as ExportMessage;
        
        // For testing: removed ChatGPT page check
        // if (!window.location.hostname.includes('chatgpt.com') && 
        //     !window.location.hostname.includes('openai.com')) {
        //   throw new Error('This extension only works on ChatGPT pages');
        // }

        // Set the format
        currentFormat = format;
        
        // Mount the UI
        ui.mount();

        return {
          status: 'success',
          format,
          includeMessages,
          message: `${format.toUpperCase()} export dialog opened`
        };
      } catch (error) {
        return {
          status: 'error',
          error: error instanceof Error ? error.message : String(error)
        };
      }
    });
  },
});
