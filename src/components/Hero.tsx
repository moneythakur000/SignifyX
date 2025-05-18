
import { Hand } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="py-16 md:py-24 text-center">
      <div className="container">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-signify rounded-full flex items-center justify-center">
            <Hand size={32} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Converting Sign Language to
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-signify">
            Text & Speech
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          SignifyX uses advanced computer vision to recognize sign language gestures 
          and convert them into text and speech, bridging communication gaps instantly.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="bg-gradient-signify hover:opacity-90 text-white px-6 py-6 rounded-md"
            onClick={() => {
              const element = document.getElementById('demo-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Try It Now
          </Button>
          
          <Button 
            variant="outline"
            className="border-signify-blue text-signify-blue hover:bg-signify-blue/10 px-6 py-6 rounded-md"
            onClick={() => {
              const element = document.getElementById('how-it-works');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
