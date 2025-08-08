import { useEffect, useState } from 'react';
import tiktokBag from '@/assets/tiktok-bag-glow.png';

interface ProcessingScreenProps {
  onComplete: () => void;
}

const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + (100 / 30); // Complete in 3 seconds (30 intervals of 100ms)
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center fade-up">
        {/* Header */}
        <h1 className="text-2xl font-bold text-foreground">
          🌀 Sending videos...
        </h1>

        {/* Center Content */}
        <div className="flex flex-col items-center space-y-6">
          {/* TikTok Bag with Pulse Animation */}
          <div className="relative flex items-center justify-center">
            <img 
              src={tiktokBag} 
              alt="TikTok Shopping Bag" 
              className="w-48 h-48 object-contain drop-shadow-2xl z-10 relative"
            />
            
            {/* White Circular Pulse Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border-4 border-primary/30 pulse-glow"></div>
            </div>
            
            {/* Additional glow layers */}
            <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-full blur-2xl"></div>
          </div>

          {/* Loading Text */}
          <p className="text-lg text-muted-foreground">
            ⏳ Please wait, generating videos...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-full space-y-2">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-tiktok-red to-tiktok-blue transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Processing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Additional Status Messages */}
        <div className="space-y-2 text-sm text-muted-foreground">
          {progress > 20 && (
            <p className="fade-up">📊 Analyzing your content preferences...</p>
          )}
          {progress > 50 && (
            <p className="fade-up">🤖 Generating creative ideas...</p>
          )}
          {progress > 80 && (
            <p className="fade-up">✨ Finalizing your video concepts...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;