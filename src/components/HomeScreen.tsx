import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import tiktokBag from '@/assets/tiktok-bag-glow.png';

interface HomeScreenProps {
  onContinue: (data: {
    tiktokHandle: string;
    videoTypes: string[];
    videosPerDay: number;
  }) => void;
}

const HomeScreen = ({ onContinue }: HomeScreenProps) => {
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [selectedVideoTypes, setSelectedVideoTypes] = useState<string[]>([]);
  const [videosPerDay, setVideosPerDay] = useState<number | null>(null);
  
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const videoTypes = [
    'Motivational',
    'Comedy',
    'Curiosities',
    'Reactions',
    'Comment Replies',
    'Reviews',
    'Trends'
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleVideoType = (type: string) => {
    setSelectedVideoTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const canContinue = tiktokHandle.trim() && selectedVideoTypes.length > 0 && videosPerDay !== null;

  const handleContinue = () => {
    if (canContinue && videosPerDay !== null) {
      onContinue({
        tiktokHandle: tiktokHandle.trim(),
        videoTypes: selectedVideoTypes,
        videosPerDay
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 fade-up">
        {/* Header with TikTok Bag */}
        <div className="text-center space-y-4">
          <div className="flex justify-center relative">
            <div className="relative">
              <img 
                src={tiktokBag} 
                alt="TikTok Shopping Bag" 
                className="w-40 h-40 object-contain drop-shadow-2xl"
              />
              {/* Additional glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground text-blur">
              TIKTOK ROBOT
            </h1>
            <h2 className="text-xl font-semibold text-foreground">
              📽️ VIDEO PANEL
            </h2>
          </div>
        </div>

        {/* Interactive Options */}
        <div className="space-y-4">
          {/* Option 1: TikTok Handle */}
          <Card className="bg-card border-border">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto text-left"
              onClick={() => toggleSection('handle')}
            >
              <span className="text-lg font-medium">Enter your TikTok</span>
              {expandedSection === 'handle' ? <ChevronUp /> : <ChevronDown />}
            </Button>
            
            {expandedSection === 'handle' && (
              <div className="px-4 pb-4 slide-expand">
                <Input
                  placeholder="@your_tiktok_handle"
                  value={tiktokHandle}
                  onChange={(e) => setTiktokHandle(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            )}
          </Card>

          {/* Option 2: Video Types */}
          <Card className="bg-card border-border">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto text-left"
              onClick={() => toggleSection('types')}
            >
              <span className="text-lg font-medium">Select video type</span>
              {expandedSection === 'types' ? <ChevronUp /> : <ChevronDown />}
            </Button>
            
            {expandedSection === 'types' && (
              <div className="px-4 pb-4 slide-expand">
                <div className="grid grid-cols-2 gap-2">
                  {videoTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedVideoTypes.includes(type) ? "default" : "outline"}
                      size="sm"
                      className={`text-sm ${
                        selectedVideoTypes.includes(type)
                          ? "bg-tiktok-red text-tiktok-red-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                      onClick={() => toggleVideoType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                {selectedVideoTypes.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedVideoTypes.length} type{selectedVideoTypes.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
          </Card>

          {/* Option 3: Videos Per Day */}
          <Card className="bg-card border-border">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto text-left"
              onClick={() => toggleSection('count')}
            >
              <span className="text-lg font-medium">How many videos to post per day</span>
              {expandedSection === 'count' ? <ChevronUp /> : <ChevronDown />}
            </Button>
            
            {expandedSection === 'count' && (
              <div className="px-4 pb-4 slide-expand">
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <Button
                      key={num}
                      variant={videosPerDay === num ? "default" : "outline"}
                      size="sm"
                      className={`text-sm ${
                        videosPerDay === num
                          ? "bg-tiktok-blue text-tiktok-blue-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                      onClick={() => setVideosPerDay(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                {videosPerDay !== null && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {videosPerDay} video{videosPerDay > 1 ? 's' : ''} per day
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Continue Button */}
        <Button
          className={`w-full py-3 text-lg font-semibold ${
            canContinue
              ? "bg-tiktok-red hover:bg-tiktok-red/90 text-tiktok-red-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          onClick={handleContinue}
          disabled={!canContinue}
        >
          CONTINUE
        </Button>

        {!canContinue && (
          <p className="text-sm text-muted-foreground text-center">
            Please fill in your TikTok handle, select at least one video type, and choose videos per day to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;