import { useState } from "react";
import { 
  FileText, 
  FileCode, 
  File, 
  Download, 
  Bot, 
  User,
  FileImage,
  Settings,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ExportSettingsProps {
  onExport?: (settings: ExportConfig) => void;
}

export interface ExportConfig {
  format: 'pdf' | 'html' | 'json' | 'text' | 'markdown';
  includeMessages: {
    user: boolean;
    assistant: boolean;
  };
}

export function ExportSettings({ onExport }: ExportSettingsProps) {
  const [format, setFormat] = useState<ExportConfig['format']>('pdf');
  const [includeMessages, setIncludeMessages] = useState<ExportConfig['includeMessages']>({
    user: true,
    assistant: true,
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: FileImage },
    { value: 'html', label: 'HTML Web Page', icon: FileCode },
    { value: 'json', label: 'JSON Data', icon: FileCode },
    { value: 'text', label: 'Plain Text', icon: FileText },
    { value: 'markdown', label: 'Markdown', icon: File },
  ];

  const handleMessageTypeChange = (type: 'user' | 'assistant', checked: boolean) => {
    setIncludeMessages(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleExport = () => {
    const config: ExportConfig = {
      format,
      includeMessages
    };
    onExport?.(config);
  };

  const selectedFormat = formatOptions.find(opt => opt.value === format);
  const IconComponent = selectedFormat?.icon || File;

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-xl">
          <Download className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Export ChatGPT Conversation</h1>
          <p className="text-sm text-muted-foreground">
            Choose your export format and message types
          </p>
        </div>
      </div>

      {/* Export Format Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <IconComponent className="w-4 h-4 text-primary" />
            Export Format
          </CardTitle>
          <CardDescription className="text-sm">
            Select the file format for your export
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={format} onValueChange={(value) => setFormat(value as ExportConfig['format'])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format..." />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <OptionIcon className="w-4 h-4 mr-2" />
                    {option.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Message Types Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Settings className="w-4 h-4 text-primary" />
            Message Types
          </CardTitle>
          <CardDescription className="text-sm">
            Choose which messages to include
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="user-messages"
                checked={includeMessages.user}
                onCheckedChange={(checked) => handleMessageTypeChange('user', checked as boolean)}
              />
              <div className="flex items-center space-x-2 flex-1">
                <User className="w-4 h-4 text-blue-600" />
                <Label htmlFor="user-messages" className="text-sm font-medium cursor-pointer">
                  User Messages
                </Label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="assistant-messages"
                checked={includeMessages.assistant}
                onCheckedChange={(checked) => handleMessageTypeChange('assistant', checked as boolean)}
              />
              <div className="flex items-center space-x-2 flex-1">
                <Bot className="w-4 h-4 text-green-600" />
                <Label htmlFor="assistant-messages" className="text-sm font-medium cursor-pointer">
                  Assistant Messages
                </Label>
              </div>
            </div>

            {/* Validation Message */}
            {!includeMessages.user && !includeMessages.assistant && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <p className="text-xs text-destructive">
                  Please select at least one message type
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      <Button 
        onClick={handleExport} 
        className="w-full" 
        size="lg"
        disabled={!includeMessages.user && !includeMessages.assistant}
      >
        <Download className="w-4 h-4 mr-2" />
        Export as {selectedFormat?.label}
      </Button>

      {/* Status Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {includeMessages.user && includeMessages.assistant ? 'All messages' : 
           includeMessages.user ? 'User messages only' : 
           includeMessages.assistant ? 'Assistant messages only' : 'No messages selected'}
        </p>
      </div>
    </div>
  );
}
