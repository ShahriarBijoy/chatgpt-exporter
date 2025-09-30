import { sendMessage, onMessage } from 'webext-bridge/background';

interface ExportMessage {
  format: 'html' | 'pdf';
  includeMessages: {
    user: boolean;
    assistant: boolean;
  };
}

export default defineBackground({
  main() {
    console.log('Background script initialized with cross-browser support');

    // Create context menus on install
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'export-chatgpt-conversation-html',
        title: 'Export This Conversation as HTML',
        contexts: ['all'],
      });
      
      chrome.contextMenus.create({
        id: 'export-chatgpt-conversation-pdf',
        title: 'Export This Conversation as PDF',
        contexts: ['all'],
      });
      
      console.log('Context menus created');
    });

    // Handle context menu clicks using webext-bridge
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      console.log('Context menu clicked:', info.menuItemId, 'on tab:', tab?.id);
      if (!tab?.id) return;

      try {
        let format: 'html' | 'pdf' | null = null;

        if (info.menuItemId === 'export-chatgpt-conversation-html') {
          format = 'html';
        } else if (info.menuItemId === 'export-chatgpt-conversation-pdf') {
          format = 'pdf';
        }

        if (format) {
          // Use webext-bridge for cross-browser messaging
          const response = await sendMessage(
            'export-conversation',
            {
              format,
              includeMessages: { user: true, assistant: true }
            },
            `content-script@${tab.id}`
          );

          console.log('Response from content script:', response);

          // Show notification
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon/48.png',
            title: 'ChatGPT Exporter',
            message: `${format.toUpperCase()} export started!`
          });
        }
      } catch (error) {
        console.error('Failed to send export message:', error);
        
        // Show error notification
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon/48.png',
          title: 'ChatGPT Exporter Error',
          message: `Export failed: ${error instanceof Error ? error.message : String(error)}`
        });
      }
    });

    // Handle export requests from popup using webext-bridge
    onMessage('popup-export', async (message) => {
      console.log('Export request from popup:', message);
      
      try {
        // Get the active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) {
          throw new Error('No active tab found');
        }

        // Forward the export request to the content script using webext-bridge
        const exportData = message.data as unknown as ExportMessage;
        const response = await sendMessage(
          'export-conversation',
          {
            format: exportData.format,
            includeMessages: exportData.includeMessages
          },
          `content-script@${tab.id}`
        );

        console.log('Export completed:', response);
        return { success: true, response };
      } catch (error) {
        console.error('Export failed:', error);
        return { success: false, error: error instanceof Error ? error.message : String(error) };
      }
    });

    console.log('Background script ready. Cross-browser messaging enabled.');
  },
});
