
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, Volume, Hand, Video, Book, Settings, Info, X } from "lucide-react";
import VideoFeed from "./VideoFeed";
import { useHandDetection } from "@/hooks/useHandDetection";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import HandVisualization from './HandVisualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SignLanguageDetection = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [sentence, setSentence] = useState<string>("");
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [activeTab, setActiveTab] = useState("detect");
  const [suggestedText, setSuggestedText] = useState<string>("");
  const { toast } = useToast();
  
  const {
    isInitialized,
    isDetecting,
    detectedGesture,
    error: detectionError,
    isLoading,
    processFrame,
    toggleDetection
  } = useHandDetection({
    confidenceThreshold,
    showLandmarks
  });
  
  const {
    isSupported: isSpeechSupported,
    speak,
    error: speechError
  } = useSpeechSynthesis();
  
  // Function to handle new gesture detection
  useEffect(() => {
    if (detectedGesture && detectedGesture.gesture && detectedGesture.gesture !== 'unknown') {
      // Add to history if this is a new detection
      setHistory(prev => {
        if (prev.length > 0 && prev[prev.length - 1] === detectedGesture.gesture) {
          return prev;
        }
        // Limit history to 20 items
        const newHistory = [...prev, detectedGesture.gesture];
        return newHistory.slice(-20);
      });
      
      // Update sentence with detected gesture
      if (detectedGesture.gesture.length === 1) {
        // If it's a single letter, add it to the sentence
        setSentence(prev => prev + detectedGesture.gesture);
      } else if (isCommonPhrase(detectedGesture.gesture)) {
        // If it's a common phrase, add it as a whole
        setSentence(prev => prev ? `${prev} ${detectedGesture.gesture}` : detectedGesture.gesture);
      }
      
      // Only speak individual words or phrases, not single letters
      if (isSpeechEnabled && isSpeechSupported && isCommonPhrase(detectedGesture.gesture)) {
        speak(detectedGesture.gesture);
      }
    }
  }, [detectedGesture, speak, isSpeechEnabled, isSpeechSupported]);

  // Function to check if a gesture is a common phrase rather than a letter
  const isCommonPhrase = useCallback((gesture: string) => {
    return gesture.length > 1 && 
           !['unknown', 'pointing', 'palmOpen', 'fist'].includes(gesture);
  }, []);

  // Generate suggestions based on the current sentence
  useEffect(() => {
    if (sentence && sentence.length > 3) {
      // Simple suggestion system based on common phrases
      const suggestions: Record<string, string> = {
        "hel": "Hello, how are you?",
        "tha": "Thank you very much",
        "ple": "Please help me",
        "i n": "I need assistance",
        "i wa": "I want to learn more",
        "i lo": "I love you",
        "goo": "Good to see you"
      };
      
      const matchedPrefix = Object.keys(suggestions).find(prefix => 
        sentence.toLowerCase().includes(prefix)
      );
      
      if (matchedPrefix) {
        setSuggestedText(suggestions[matchedPrefix]);
      } else if (sentence.length > 10) {
        // Generic suggestions for longer text
        setSuggestedText("Would you like to save this message?");
      } else {
        setSuggestedText("");
      }
    } else {
      setSuggestedText("");
    }
  }, [sentence]);
  
  // Handle errors
  useEffect(() => {
    if (detectionError) {
      toast({
        title: "Detection Error",
        description: detectionError,
        variant: "destructive"
      });
    }
    
    if (speechError) {
      toast({
        title: "Speech Error",
        description: speechError,
        variant: "destructive"
      });
    }
  }, [detectionError, speechError, toast]);

  const handleClearHistory = () => {
    setHistory([]);
  };
  
  const handleClearSentence = () => {
    setSentence("");
  };
  
  const handleSpeakSentence = () => {
    if (sentence && isSpeechSupported) {
      speak(sentence);
    }
  };
  
  const handleAcceptSuggestion = () => {
    if (suggestedText) {
      setSentence(suggestedText);
      setSuggestedText("");
      if (isSpeechEnabled && isSpeechSupported) {
        speak(suggestedText);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="detect" onValueChange={setActiveTab} value={activeTab} className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-4">
          <TabsTrigger value="detect" className="flex items-center gap-2">
            <Hand size={16} />
            <span>Detect Signs</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <Book size={16} />
            <span>Learn ASL</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info size={16} />
            <span>About</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="detect" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hand size={20} className="text-purple-600" />
                    Sign Language Detection
                  </CardTitle>
                  <CardDescription>
                    Position your hands in the camera view to detect sign language
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="relative aspect-video overflow-hidden rounded-md">
                    <VideoFeed onFrame={processFrame} isActive={isDetecting && activeTab === "detect"} />
                    
                    {/* Display detected gesture with confidence on top of video feed */}
                    {detectedGesture && detectedGesture.gesture !== 'unknown' && isDetecting && (
                      <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/80 text-purple-800 dark:text-purple-200 p-3 rounded-lg font-bold shadow-lg">
                        <div className="text-lg">{detectedGesture.gesture}</div>
                        <div className="text-xs opacity-70">
                          {Math.round(detectedGesture.confidence * 100)}% confidence
                        </div>
                      </div>
                    )}
                    
                    {/* Hand landmarks overlay */}
                    {isDetecting && detectedGesture?.landmarks && (
                      <div className="absolute inset-0">
                        <HandVisualization landmarks={detectedGesture.landmarks} />
                      </div>
                    )}
                  </div>
                  
                  {suggestedText && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
                      <p className="text-sm font-medium">Suggested completion:</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-blue-700 dark:text-blue-300">{suggestedText}</p>
                        <Button 
                          size="sm" 
                          onClick={handleAcceptSuggestion}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={toggleDetection}
                    disabled={!isInitialized || isLoading}
                    className={`${isDetecting ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"} text-white px-4 py-2 rounded-md transition-colors`}
                  >
                    {isLoading ? "Loading..." : isDetecting ? "Stop Detection" : "Start Detection"}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="speech-toggle" className="mr-2">Speech</Label>
                    <Switch
                      id="speech-toggle"
                      checked={isSpeechEnabled}
                      onCheckedChange={setIsSpeechEnabled}
                      disabled={!isSpeechSupported}
                    />
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <HandVisualization
                landmarks={detectedGesture?.landmarks}
                onConfidenceChange={setConfidenceThreshold}
                onShowLandmarksChange={setShowLandmarks}
                confidenceThreshold={confidenceThreshold}
                showLandmarks={showLandmarks}
              />
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume size={20} className="text-purple-600" />
                    Detected Text & Speech
                  </CardTitle>
                  <CardDescription>
                    Signs detected and converted to text will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[200px] max-h-[360px] overflow-y-auto">
                  {detectedGesture && detectedGesture.gesture !== 'unknown' && (
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">Currently Detecting:</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 animate-pulse-subtle">
                          {detectedGesture.gesture}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round(detectedGesture.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Current Sentence:</h3>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[60px] relative">
                      {sentence ? (
                        <p className="text-lg pr-16">{sentence}</p>
                      ) : (
                        <p className="text-gray-400">No sentence formed yet</p>
                      )}
                      
                      {sentence && (
                        <div className="absolute right-2 top-2 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={handleSpeakSentence}
                            className="h-8 w-8 p-0 rounded-full"
                            title="Speak sentence"
                          >
                            <Volume size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={handleClearSentence}
                            className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="Clear sentence"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">History:</h3>
                    {history.length === 0 ? (
                      <p className="text-gray-500">No signs detected yet</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {history.map((gesture, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-100">
                            {gesture}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleClearHistory}
                    disabled={history.length === 0}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
                  >
                    Clear History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="learn" className="mt-0">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book size={20} className="text-signify-blue" />
                Learn ASL (American Sign Language)
              </CardTitle>
              <CardDescription>
                Educational resources to help you learn sign language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">ASL Basics</h3>
                <p className="mb-4">
                  American Sign Language (ASL) is a complete, natural language that has the same linguistic properties as spoken languages. ASL is expressed by movements of the hands and face.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Video size={18} />
                        Video Tutorials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">Learn ASL through visual demonstrations</p>
                      <Button variant="outline" className="w-full" onClick={() => window.open("https://www.youtube.com/playlist?list=PL6akqFwEeSphJ6rd50AtRBKNGracfavCi", "_blank")}>
                        Watch Tutorials
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Alphabet & Numbers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">Master the ASL alphabet and numbers</p>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("learn-alphabet")}>
                        Practice Now
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Common Phrases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">Learn everyday expressions in ASL</p>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("learn-phrases")}>
                        Explore Phrases
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">ASL Grammar</h3>
                <p>
                  ASL has its own grammar, which differs from English. In ASL, information is primarily conveyed through:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Hand shape, position, movement</li>
                  <li>Facial expressions</li>
                  <li>Body postures</li>
                  <li>Spatial references</li>
                </ul>
                <p className="mt-3">
                  Unlike English, which is a sequential language where words follow one another in a set order, ASL is a simultaneous language where various grammatical features are expressed at the same time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} className="text-signify-blue" />
                Application Settings
              </CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detection Settings</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="confidence-threshold"
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.1"
                        value={confidenceThreshold}
                        onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500 w-16 text-right">
                        {Math.round(confidenceThreshold * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-landmarks">Show Hand Landmarks</Label>
                      <Switch
                        id="show-landmarks"
                        checked={showLandmarks}
                        onCheckedChange={setShowLandmarks}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Display visual markers for hand detection points
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Speech Settings</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-speech">Enable Text-to-Speech</Label>
                      <Switch
                        id="enable-speech"
                        checked={isSpeechEnabled}
                        onCheckedChange={setIsSpeechEnabled}
                        disabled={!isSpeechSupported}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Automatically speak detected phrases
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="mt-0">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info size={20} className="text-signify-blue" />
                About SignifyX
              </CardTitle>
              <CardDescription>
                Project information and team details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Project Overview</h3>
                <p className="mb-4">
                  SignifyX is a web application that translates sign language into text and speech using machine learning and computer vision. 
                  Our goal is to bridge communication gaps between the deaf or hard-of-hearing community and those who don't know sign language.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Development Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
  { name: "Pranav Jasyal", role: "Team Lead", detail: "Implemented core detection algorithm", image: "pranav.jpg" },
  { name: "Rohit Thakur", role: "UI/UX Designer", detail: "Designed the responsive interface", image: "rohit.jpg" },
  { name: "Raghav Thakur", role: "ML Engineer", detail: "Trained the hand gesture models", image: "raghav.jpg" },
  { name: "Rizul Thakur", role: "Full-Stack Developer", detail: "Developed backend integration", image: "rizul.jpg" }
].map((member, index) => (
  <Card key={index} className="overflow-hidden">
    <CardContent className="p-4 text-center">
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-16 h-16 mx-auto mb-3 rounded-full object-cover border border-gray-300 shadow-sm" 
      />
      <h4 className="font-medium">{member.name}</h4>
      <p className="text-sm font-medium text-signify-purple">{member.role}</p>
      <p className="text-xs text-gray-500 mt-1">{member.detail}</p>
    </CardContent>
  </Card>
))}

                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Technology</h3>
                <p>
                  SignifyX uses TensorFlow.js and the MediaPipe Handpose model to detect and interpret hand gestures in real-time. 
                  The application is built with React and Tailwind CSS, providing a responsive and accessible interface.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["TensorFlow.js", "MediaPipe", "React", "Tailwind CSS", "WebRTC", "Speech Synthesis API"].map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignLanguageDetection;
