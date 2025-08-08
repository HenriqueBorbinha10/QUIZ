import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import ProcessingScreen from '@/components/ProcessingScreen';
import CopyIdeasScreen from '@/components/CopyIdeasScreen';
import ToolsScreen from '@/components/ToolsScreen';

type AppStep = 'home' | 'processing' | 'ideas' | 'tools';

interface UserData {
  tiktokHandle: string;
  videoTypes: string[];
  videosPerDay: number;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('home');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleContinue = (data: UserData) => {
    setUserData(data);
    setCurrentStep('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentStep('ideas');
  };

  const handleBackToSetup = () => {
    setCurrentStep('home');
  };

  const handleGenerateVideos = () => {
    setCurrentStep('tools');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep === 'home' && (
        <HomeScreen onContinue={handleContinue} />
      )}
      
      {currentStep === 'processing' && (
        <ProcessingScreen onComplete={handleProcessingComplete} />
      )}
      
      {currentStep === 'ideas' && userData && (
        <CopyIdeasScreen 
          videoTypes={userData.videoTypes}
          videosPerDay={userData.videosPerDay}
          onBack={handleBackToSetup}
          onGenerateVideos={handleGenerateVideos}
        />
      )}
      
      {currentStep === 'tools' && (
        <ToolsScreen onBack={() => setCurrentStep('ideas')} />
      )}
    </div>
  );
};

export default Index;
