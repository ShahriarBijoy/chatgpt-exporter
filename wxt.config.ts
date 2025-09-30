import { defineConfig } from 'wxt';
import { resolve } from 'path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  vite: () => ({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }),
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      manifest_version: manifestVersion,
      name: 'ChatGPT Exporter',
      version: '2.0.0',
      description: 'Export ChatGPT conversations to a file',
      permissions: ['activeTab', 'scripting', 'tabs', 'contextMenus', 'declarativeNetRequest', 'storage', 'notifications'],
      action: {
        default_popup: 'popup/index.html',
      },
    };
  },
});
