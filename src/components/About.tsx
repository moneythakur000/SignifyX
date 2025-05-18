
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About SignifyX</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our mission is to break down communication barriers through accessible technology.
          </p>
        </div>
        
        <Card className="border shadow-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-4">
                  SignifyX was created with a simple but powerful vision: to make communication more inclusive and accessible for everyone, regardless of hearing ability.
                </p>
                <p className="text-gray-600">
                  We believe that technology should bridge gaps, not create them. By translating sign language into text and speech, we're working to ensure that deaf and hard-of-hearing individuals can communicate more easily with those who don't understand sign language.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4">Technology</h3>
                <p className="text-gray-600 mb-4">
                  SignifyX uses advanced computer vision algorithms and machine learning models trained on thousands of sign language examples to accurately detect and interpret hand gestures in real-time.
                </p>
                <p className="text-gray-600">
                  Our technology continues to improve with each interaction, becoming more accurate and responsive to diverse signing styles and environments.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
