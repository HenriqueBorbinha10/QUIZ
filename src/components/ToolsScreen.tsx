import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ToolsScreenProps {
  onBack: () => void;
}

const ToolsScreen = ({ onBack }: ToolsScreenProps) => {
  const tools = [
    {
      name: "CapCut",
      description: "Professional video editing with AI features",
      type: "Video Editing",
      url: "https://www.capcut.com/"
    },
    {
      name: "Canva",
      description: "Design templates and visual content creation",
      type: "Design",
      url: "https://www.canva.com/"
    },
    {
      name: "InShot",
      description: "Mobile video editing and effects",
      type: "Video Editing",
      url: "https://www.inshot.com/"
    },
    {
      name: "VSCO",
      description: "Photo and video filters and effects",
      type: "Filters",
      url: "https://vsco.co/"
    },
    {
      name: "Loom",
      description: "Screen recording for tutorials and reactions",
      type: "Recording",
      url: "https://www.loom.com/"
    },
    {
      name: "Filmora",
      description: "Easy video editing with templates",
      type: "Video Editing",
      url: "https://filmora.wondershare.com/"
    },
    {
      name: "Pexels",
      description: "Free stock videos and images",
      type: "Assets",
      url: "https://www.pexels.com/"
    },
    {
      name: "Unsplash",
      description: "High-quality free photos",
      type: "Assets",
      url: "https://unsplash.com/"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Video Editing": "bg-tiktok-red text-tiktok-red-foreground",
      "Design": "bg-tiktok-blue text-tiktok-blue-foreground",
      "Filters": "bg-purple-500 text-white",
      "Recording": "bg-green-500 text-white",
      "Assets": "bg-orange-500 text-white"
    };
    return colors[type] || "bg-gray-500 text-white";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6 fade-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            className="mb-4 hover:bg-accent"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Copy Ideas
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">
            🛠️ Video Creation Tools
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are the essential tools you'll need to bring your copy ideas to life and create amazing TikTok videos
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <Card key={index} className="bg-card border-border p-6 hover:border-tiktok-red/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {tool.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(tool.type)}`}>
                        {tool.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full border-tiktok-blue text-tiktok-blue hover:bg-tiktok-blue hover:text-tiktok-blue-foreground"
                  onClick={() => window.open(tool.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit {tool.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="bg-muted/50 border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">💡 Pro Video Creation Tips:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li>• Use CapCut or InShot for quick mobile editing</li>
              <li>• Add trending sounds and music to boost engagement</li>
              <li>• Keep your videos under 60 seconds for better reach</li>
              <li>• Use good lighting - natural light works best</li>
            </ul>
            <ul className="space-y-2">
              <li>• Add captions for accessibility and silent viewing</li>
              <li>• Use eye-catching thumbnails and opening frames</li>
              <li>• Post consistently at peak engagement times</li>
              <li>• Engage with comments quickly after posting</li>
            </ul>
          </div>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button
            className="bg-tiktok-red hover:bg-tiktok-red/90 text-tiktok-red-foreground px-8 py-3 text-lg"
            onClick={() => window.open('https://www.tiktok.com/', '_blank')}
          >
            🚀 Start Creating on TikTok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolsScreen;