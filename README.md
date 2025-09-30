# ChatGPT Exporter Chrome Extension

A modern Chrome extension built with WXT, React, and shadcn/ui for exporting ChatGPT conversations to various formats.

## 🚀 Features

- **Multiple Export Formats**: HTML, PDF, JSON, Text, and Markdown
- **Message Filtering**: Choose to include user messages, assistant responses, or both
- **Cross-browser Compatibility**: Built with webext-bridge for Firefox and Chrome support
- **Modern UI**: Beautiful interface using shadcn/ui components
- **Account Management**: Pro account features with authentication
- **Context Menu Integration**: Right-click to export conversations
- **Shadow DOM**: Isolated UI that won't interfere with page styles

## 🛠️ Tech Stack

- **Framework**: WXT (Web Extension Toolkit)
- **Frontend**: React 19 with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **Styling**: Tailwind CSS with OKLCH colors
- **Messaging**: webext-bridge for cross-browser compatibility
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📦 Installation

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chatgpt-exporter
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Load the extension**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `.output/chrome-mv3` folder

### Building for Production

```bash
pnpm build
```

The built extension will be in the `.output/chrome-mv3` folder.

## 🎯 Usage

### Context Menu
- Right-click on any webpage
- Select "Export This Conversation as HTML" or "Export This Conversation as PDF"
- The export dialog will appear with options

### Popup Interface
- Click the extension icon in the toolbar
- Choose export format and message types
- Click "Export" to start the process

### Keyboard Shortcut
- Press `Ctrl + Shift + E` to toggle the export dialog

## 🔧 Configuration

### Export Settings
- **Format**: Choose from PDF, HTML, JSON, Text, or Markdown
- **Message Types**: Include user messages, assistant responses, or both
- **Metadata**: Export conversation metadata and timestamps

### Account Management
- **Pro Account**: Access advanced features
- **Authentication**: Secure sign-in/sign-up system
- **Storage**: Persistent settings using Chrome storage API

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── accountSettings.tsx
│   ├── dialogComponent.tsx
│   └── exportSettings.tsx
├── entrypoints/         # Extension entry points
│   ├── background/      # Background script
│   ├── content/         # Content script
│   └── popup/           # Popup interface
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## 🔌 Extension Architecture

### Background Script
- Handles context menu creation
- Manages cross-browser messaging
- Processes export requests from popup

### Content Script
- Renders export dialog in Shadow DOM
- Handles page interaction
- Communicates with background script

### Popup Interface
- Export settings configuration
- Account management
- User interface for all features

## 🎨 UI Components

Built with shadcn/ui components:
- **Dialog**: Modal export interface
- **Button**: Action buttons with variants
- **Card**: Content containers
- **Select**: Format selection dropdown
- **Checkbox**: Message type toggles
- **Input**: Form inputs
- **Toast**: Success/error notifications

## 🔒 Permissions

The extension requires the following permissions:
- `activeTab`: Access current tab for export
- `contextMenus`: Add right-click menu options
- `storage`: Save user settings and auth state
- `notifications`: Show export status notifications
- `scripting`: Inject content scripts
- `tabs`: Query active tabs

## 🚀 Development

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm dev:firefox`: Development for Firefox
- `pnpm build:firefox`: Build for Firefox
- `pnpm compile`: TypeScript compilation check

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Functional Components**: React hooks over class components
- **Tailwind CSS**: Utility-first styling approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WXT](https://wxt.dev/) - Web Extension Toolkit
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React](https://react.dev/) - Frontend library
- [webext-bridge](https://github.com/antfu/webext-bridge) - Cross-browser messaging

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/your-username/chatgpt-exporter/issues) page
2. Create a new issue with detailed information
3. Include browser version and extension version

---

**Built with ❤️ using modern web technologies**