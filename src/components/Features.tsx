
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume, Mic, Hand, Clock, Zap, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Hand className="h-10 w-10 text-signify-blue" />,
      title: "Sign Language Detection",
      description: "Advanced computer vision accurately detects and interprets hand gestures in real-time."
    },
    {
      icon: <Volume className="h-10 w-10 text-signify-purple" />,
      title: "Text-to-Speech",
      description: "Instantly converts detected signs into natural-sounding speech for seamless communication."
    },
    {
      icon: <Clock className="h-10 w-10 text-signify-blue" />,
      title: "Real-Time Processing",
      description: "Minimal latency ensures fluid conversations without awkward pauses or delays."
    },
    {
      icon: <Zap className="h-10 w-10 text-signify-purple" />,
      title: "Easy to Use",
      description: "Simple interface requires no setup or training, just point your camera and start signing."
    },
    {
      icon: <Mic className="h-10 w-10 text-signify-blue" />,
      title: "Clear Voice Output",
      description: "High-quality speech synthesis delivers clear, natural-sounding voice output."
    },
    {
      icon: <Globe className="h-10 w-10 text-signify-purple" />,
      title: "Accessibility Focused",
      description: "Designed with accessibility in mind to help bridge communication gaps."
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SignifyX combines cutting-edge technology to make sign language communication effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
