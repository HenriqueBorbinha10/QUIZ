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
        "You're just one decision away from changing your life. Post now! 💪",
        "Stop waiting for Monday. Your transformation starts today! 🔥",
        "Every expert was once a beginner. Start your journey now! ✨",
        "Your future self is counting on what you do today 🌟",
        "The only impossible journey is the one you never begin 🚀",
        "Dream big, start small, but most importantly, start now! 🌅",
        "Success isn't about perfection, it's about progress 📈",
        "What you do today can improve all your tomorrows ⚡",
        "The only person you are destined to become is the person you decide to be 🎯",
        "Your comfort zone is a beautiful place, but nothing ever grows there 🌱"
      ],
      'Comedy': [
        "When you realize it's Monday tomorrow... 😭",
        "Me pretending I understand what adults are talking about 🤡",
        "That awkward moment when... (add your situation) 😂",
        "POV: You're trying to be productive but... 🙃",
        "When someone says 'we need to talk'... 💀",
        "Me trying to look busy when my boss walks by 👀",
        "When WiFi is down and you realize how much you depend on it 📶",
        "That moment when you remember something embarrassing from 10 years ago 🫣",
        "Me explaining why I need another coffee ☕",
        "When you accidentally like someone's photo from 2 years ago 📱"
      ],
      'Curiosities': [
        "Did you know this? No one told you, but now you'll find out... 🤯",
        "This will blow your mind! Here's what they don't teach you... 🧠",
        "Wait until you see what happens when... 👀",
        "Scientists discovered something incredible... 🔬",
        "This fact will change how you see the world... 🌍",
        "The hidden truth behind... that nobody talks about 🕵️",
        "Ancient secrets that are still relevant today... 📜",
        "What happens inside your brain when you... 🧠",
        "The shocking reality of... that will surprise you 😱",
        "Mind-blowing facts that sound fake but are 100% true ✨"
      ],
      'Reactions': [
        "My reaction to this viral video... 😱",
        "Watching this for the first time and... 🤨",
        "This is why I can't take anything seriously... 😭",
        "Your comments vs my reaction... 💯",
        "Rating viral trends because why not... ⭐",
        "Reacting to the most controversial take I've seen... 🔥",
        "My honest thoughts on this viral moment... 💭",
        "Breaking down this trending topic because... 🧩",
        "Why everyone's talking about this and my take... 📢",
        "Watching this with fresh eyes and here's what I think... 👁️"
      ],
      'Comment Replies': [
        "Someone asked me about... so here's my answer! 💬",
        "Replying to your questions because you asked! 🤗",
        "Y'all wanted to know about... here it is! 📱",
        "Since everyone's asking... let me explain! 💡",
        "Your comment made me think... here's my take! 🧠",
        "Answering the most asked question in my DMs... 📩",
        "You guys keep asking about this, so here's the truth... 🗣️",
        "Responding to your burning questions because you deserve answers 🔥",
        "That comment that made me think... here's my response 💭",
        "Breaking down your questions one by one... 📝"
      ],
      'Reviews': [
        "I tried this viral product so you don't have to... 📦",
        "Rating this trend: Worth the hype? 🤔",
        "Honest review: Is this actually good? 💯",
        "Testing viral hacks... here's what happened! ⚡",
        "Before you buy this, watch this review! 🛍️",
        "Spending my money so you don't have to... here's the verdict 💰",
        "Real review: Does this actually work or is it a scam? 🕵️",
        "I bought the viral product everyone's obsessing over... 📱",
        "Testing the most requested product... you need to see this 👀",
        "Honest opinions on what everyone's buying right now 🛒"
      ],
      'Trends': [
        "Joining this trend because everyone's doing it... 📈",
        "This trend is everywhere! Here's my version... 🔥",
        "Late to the trend but here I am... ⏰",
        "Making this trend my own because... ✨",
        "Trend or not, this is actually fun! 🎉",
        "Jumping on this trend before it's too late... 🏃",
        "Everyone's doing this trend, so naturally I had to try... 🌊",
        "This trend hit different, so here's my take... 💫",
        "Putting my spin on the hottest trend right now... 🎭",
        "This trend is taking over and I can see why... 🚀"
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