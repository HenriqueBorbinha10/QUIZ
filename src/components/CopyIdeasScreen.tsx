import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CopyIdeasScreenProps {
  videoTypes: string[];
  videosPerDay: number;
  onBack: () => void;
  onGenerateVideos: () => void;
}

const CopyIdeasScreen = ({ videoTypes, videosPerDay, onBack, onGenerateVideos }: CopyIdeasScreenProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const generateIdeasForType = (type: string): string[] => {
    const ideas: Record<string, string[]> = {
      'Motivational': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ],
      'Comedy': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ],
      'Curiosities': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ],
      'Reactions': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ],
      'Comment Replies': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ],
      'Reviews': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ],
      'Trends': [
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED",
        "✅ PROCESSED"
      ]
    };

    const typeIdeas = ideas[type] || [
      "Creating amazing content just for you! 🎬",
      "New video alert! You won't want to miss this... 📢",
      "This is exactly what you've been waiting for! 🎯"
    ];

    // Shuffle the ideas based on refreshKey to get different results
    const shuffled = [...typeIdeas].sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const getAllIdeas = () => {
    const allTypeIdeas = videoTypes.flatMap(type => 
      generateIdeasForType(type).map(idea => ({ type, idea }))
    );
    return allTypeIdeas.slice(0, videosPerDay);
  };

  const allIdeas = getAllIdeas();

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const generateMoreIdeas = () => {
    setRefreshKey(prev => prev + 1);
    toast.success("Generating new video ideas...");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6 fade-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            GENERATED VIDEOS
          </h1>
          <p className="text-muted-foreground">
            Based on your selected video types: {videoTypes.join(', ')}
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-4">
          {allIdeas.map((item, index) => (
            <Card key={index} className="bg-card border-border p-4 hover:border-tiktok-red/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-tiktok-red text-tiktok-red-foreground rounded-full">
                      Video {index + 1}
                    </span>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed">
                    {item.idea}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 hover:bg-accent"
                  onClick={() => copyToClipboard(item.idea, index)}
                >
                  {copiedIndex === index ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="flex-1 border-tiktok-blue text-tiktok-blue hover:bg-tiktok-blue hover:text-tiktok-blue-foreground"
            onClick={generateMoreIdeas}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate More Videos
          </Button>
          
          <Button
            className="flex-1 bg-tiktok-red hover:bg-tiktok-red/90 text-tiktok-red-foreground"
            onClick={onGenerateVideos}
          >
            Publish Videos
          </Button>
          
          <Button
            variant="secondary"
            className="flex-1 bg-secondary hover:bg-secondary/80"
            onClick={onBack}
          >
            Back to Setup
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CopyIdeasScreen;
