
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      title: "Step 1: Sign Language Detection",
      description: "The camera captures your hand movements and gestures, which are then processed by our advanced computer vision algorithm."
    },
    {
      title: "Step 2: Gesture Recognition",
      description: "The system identifies specific patterns that match with known sign language gestures from its comprehensive database."
    },
    {
      title: "Step 3: Text Conversion",
      description: "Once recognized, the signs are instantly converted into written text, which appears on screen in real-time."
    },
    {
      title: "Step 4: Speech Synthesis",
      description: "The text is then processed by our speech engine, which produces natural-sounding spoken words to match the signs."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SignifyX uses a combination of computer vision and machine learning to translate sign language into text and speech.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-signify rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {index + 1}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg font-medium">
            All processing happens directly in your browser, ensuring privacy and rapid response times.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
