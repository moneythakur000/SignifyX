
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';

// ASL alphabet descriptions with tips on how to form each sign
const aslAlphabet = [
  {
    letter: 'A',
    description: 'Make a fist with your hand, with your thumb resting on the side of your finger.',
    tip: 'Keep your thumb alongside your fist, not across your palm.',
    image: 'a.jpg'
  },
  {
    letter: 'B',
    description: 'Hold your hand flat, with your fingers together and thumb tucked across your palm.',
    tip: 'Keep your hand straight with fingers fully extended and touching.',
    image: 'b.jpg'
  },
  {
    letter: 'C',
    description: 'Curve your hand into a C shape.',
    tip: 'Your thumb and fingers should be curved in the same direction, as if holding a small cup.',
    image: 'c.jpg'
  },
  {
    letter: 'D',
    description: 'Make a circle with your thumb and index finger, keeping other fingers straight up.',
    tip: 'Your middle, ring, and pinky fingers should be close together and pointing up.',
    image: '/d.jpg'
  },
  {
    letter: 'E',
    description: 'Curl your fingers so the tips touch the palm. Tuck your thumb under your fingers.',
    tip: 'Your fingertips should touch your palm, with thumb tucked against your palm.',
    image: 'e.jpg'
  },
  {
    letter: 'F',
    description: 'Connect your thumb and index finger in a circle, with other fingers extended.',
    tip: 'Unlike "D", your middle, ring, and pinky fingers should be separated and extended.',
    image: 'f.jpg'
  },
  {
    letter: 'G',
    description: 'Extend your index finger and thumb, as if forming a "L" shape, but then move your thumb across your palm.',
    tip: 'The index finger points forward while the thumb is across palm pointing to the side.',
    image: 'g.jpg'
  },
  {
    letter: 'H',
    description: 'Extend your index and middle finger together, side by side. Other fingers are closed.',
    tip: 'Make sure index and middle fingers stay touching each other and are parallel.',
    image: 'h.jpg'
  },
  {
    letter: 'I',
    description: 'Make a fist and extend your pinky finger upward.',
    tip: 'Keep your pinky straight and all other fingers in a tight fist.',
    image: 'i.jpg'
  },
  {
    letter: 'J',
    description: 'Start with the sign for "I" (pinky extended), then trace the letter J in the air.',
    tip: 'The motion starts with the pinky pointing up, then curves down and away from your body.',
    image: 'j.mp4'
  },
  {
    letter: 'K',
    description: 'Form a "K" shape with your index finger, middle finger and thumb extended.',
    tip: 'Index finger points up, middle finger angles toward thumb, and thumb extends to side.',
    image: 'k.jpg'
  },
  {
    letter: 'L',
    description: 'Extend your thumb and index finger to form an "L" shape.',
    tip: 'Keep your thumb and index finger at a 90-degree angle to each other.',
    image: 'l.jpg'
  },
  {
    letter: 'M',
    description: 'Place your thumb between your ring and little finger with all fingers folded down.',
    tip: 'Your thumb should rest between your folded ring and pinky fingers.',
    image: 'm.jpg'
  },
  {
    letter: 'N',
    description: 'Place your thumb between your middle and ring fingers with all fingers folded down.',
    tip: 'Your thumb should rest between your folded middle and ring fingers.',
    image: 'n.jpg'
  },
  {
    letter: 'O',
    description: 'Form an "O" shape with all your fingers and thumb.',
    tip: 'The tips of your fingers should touch the tip of your thumb, forming a circle.',
    image: 'o.jpg'
  },
  {
    letter: 'P',
    description: 'Point your middle finger down with index extended and thumb out to the side.',
    tip: 'Your hand forms a "P" with the middle finger pointing down like the leg of the P.',
    image: 'p.jpg'
  },
  {
    letter: 'Q',
    description: 'Point your index finger down with thumb out to the side.',
    tip: 'Form a "G" shape but point your index finger downward instead of forward.',
    image: 'q.jpg'
  },
  {
    letter: 'R',
    description: 'Cross your middle finger over your index finger with both extended upward.',
    tip: 'Your index and middle fingers should be extended and crossed, forming an "R" shape.',
    image: 'r.jpg'
  },
  {
    letter: 'S',
    description: 'Make a fist with your thumb wrapped over your fingers.',
    tip: 'Your thumb should rest on top of your fingers, not alongside.',
    image: 's.jpg'
  },
  {
    letter: 'T',
    description: 'Make a fist and place your thumb between your index and middle fingers.',
    tip: 'Your thumb should be visible between your index and middle fingers.',
    image: 't.jpg'
  },
  {
    letter: 'U',
    description: 'Extend your index and middle fingers up close together, while keeping other fingers closed.',
    tip: 'Your index and middle fingers should point up and be kept close together.',
    image: 'u.jpg'
  },
  {
    letter: 'V',
    description: 'Extend your index and middle fingers in a "V" shape.',
    tip: 'Separate your index and middle fingers to form a clear "V" shape.',
    image: 'v.jpg'
  },
  {
    letter: 'W',
    description: 'Extend your thumb, index, middle and ring fingers, forming a "W" shape.',
    tip: 'Your three fingers should be separated, with pinky closed.',
    image: 'w.jpg'
  },
  {
    letter: 'X',
    description: 'Make a fist with your index finger bent in a hook shape.',
    tip: 'Your index finger should be slightly curled, as if making a hook.',
    image: 'x.jpg'
  },
  {
    letter: 'Y',
    description: 'Extend your thumb and pinky finger, keeping other fingers closed.',
    tip: 'Your thumb and pinky should form something like a "hang loose" gesture.',
    image: 'y.jpg'
  },
  {
    letter: 'Z',
    description: 'Make the sign for "Z" by tracing the letter in the air with your index finger.',
    tip: 'Start with your index finger pointed up, then draw a "Z" in space from left to right.',
    image: 'z.mp4'
  }
];

// ASL numbers descriptions
const aslNumbers = [
  {
    number: '1',
    description: 'Point your index finger up with all other fingers closed.',
    tip: 'Similar to pointing, with just the index finger extended upward.',
    image: '1.mp4'
  },
  {
    number: '2',
    description: 'Extend your index and middle fingers in a "V" shape.',
    tip: 'This is the same as the letter "V".',
    image: '2.mp4'
  },
  {
    number: '3',
    description: 'Extend your thumb, index, and middle fingers.',
    tip: 'Form a "W" but with only three fingers extended.',
    image: '3.mp4'
  },
  {
    number: '4',
    description: 'Extend your four fingers with thumb closed.',
    tip: 'All fingers except the thumb should be extended and separated.',
    image: '4.mp4'
  },
  {
    number: '5',
    description: 'Extend all five fingers with palm facing forward.',
    tip: 'Spread your fingers comfortably apart in a "5" gesture.',
    image: '5.mp4'
  },
  {
    number: '6',
    description: 'Extend your thumb, pinky finger, and index finger while keeping middle and ring fingers closed.',
    tip: 'This creates the ASL "6" which looks like the number in Hawaiian gesture style.',
    image: '6.mp4'
  },
  {
    number: '7',
    description: 'Extend your thumb, index, and middle fingers while keeping ring and pinky fingers closed.',
    tip: 'Thumb, index, and middle should form a "7" shape when viewed properly.',
    image: '7.mp4'
  },
  {
    number: '8',
    description: 'Extend your thumb, index, middle, and ring fingers while keeping pinky closed.',
    tip: 'All fingers except the pinky should be extended.',
    image: '8.mp4'
  },
  {
    number: '9',
    description: 'Form an "O" with your index finger and thumb, keeping other fingers straight.',
    tip: 'The "O" shape should be clear, with other fingers extended upward.',
    image: '9.mp4'
  },
  {
    number: '10',
    description: 'Make a fist and shake it slightly side-to-side.',
    tip: 'Alternatively, you can sign "1" followed by "0".',
    image: '10.mp4'
  }
];

// ASL common phrases
const aslPhrases = [
  {
    phrase: 'Hello',
    description: 'Touch your forehead with your dominant hand, palm facing outward, then move the hand outward and away.',
    tip: 'The movement should be smooth and slightly arced outward.',
    image: 'hello.mp4'
  },
  {
    phrase: 'Thank You',
    description: 'Touch your chin or lips with your fingertips, then move your hand outward and down, palm up.',
    tip: 'Start with your fingers flat against your mouth or chin, then extend outward gracefully.',
    image: 'thankyou.mp4'
  },
  {
    phrase: 'Please',
    description: 'Rub your flattened hand in a circular motion on your chest.',
    tip: 'Use your dominant hand with palm flat against your chest, making a circular motion.',
    image: 'please.mp4'
  },
  {
    phrase: 'Sorry',
    description: 'Make a fist and rub it in a circular motion over your chest.',
    tip: 'The circular motion should be centered on your heart or middle of chest.',
    image: 'sorry.mp4'
  },
  {
    phrase: 'How are you?',
    description: 'Point to the other person (YOU), then place your palm inward at your chest (ARE), then extend both hands palms up (HOW).',
    tip: 'This phrase combines three signs: YOU + ARE + HOW.',
    image: 'howareyou.mp4'
  },
  {
    phrase: 'I love you',
    description: 'Extend your thumb, index finger and pinky finger while keeping your ring and middle fingers folded down.',
    tip: 'This combines the letters "I," "L," and "Y" in a single gesture.',
    image: 'ilu.mp4'
  },
  {
    phrase: 'Good morning',
    description: 'Sign "good" (right flat hand placed on lips, moved forward and down into left flat palm) then sign "morning" (right "C" hand moved upward to represent the rising sun).',
    tip: 'Make sure to perform the signs in sequence: first "good" then "morning".',
    image: 'goodmorning.mp4'
  },
  {
    phrase: 'Help',
    description: 'Form a thumbs-up with your dominant hand and place it in your non-dominant palm, then raise both hands together.',
    tip: 'The upward motion symbolizes giving support or assistance.',
    image: 'help.mp4'
  },
  {
    phrase: "What's your name?",
    description: "Sign 'name' by tapping your index and middle fingers of both hands together twice, then point to the person.",
    tip: "The tapping motion represents the name sign, followed by pointing to the person you're asking.",
    image: 'whatsyourname.mp4'
  },
  {
    phrase: 'Nice to meet you',
    description: 'Sign "meet" (both hands coming together with index fingers extended) and then sign "good/nice" (right flat hand from lips moving outward and down).',
    tip: 'The signs should flow naturally from one to the other.',
    image: 'nicetomeetyou.mp4'
  }
];

// Additional resources for learning ASL
const aslResources = [
  {
    name: "Gallaudet University Resources",
    url: "https://www.gallaudet.edu/asl-connect/",
    description: "Free ASL lessons and resources from the world's premier university for deaf and hard of hearing students."
  },
  {
    name: "Lifeprint ASL University",
    url: "https://www.lifeprint.com/",
    description: "Comprehensive free ASL lessons, dictionary, and resources by Dr. Bill Vicars."
  },
  {
    name: "SignSchool",
    url: "https://www.signschool.com/",
    description: "Interactive learning platform with video lessons and games to practice ASL."
  },
  {
    name: "ASL App",
    url: "https://theaslapp.com/",
    description: "Mobile application created by deaf people to teach conversational ASL."
  }
];

const ASLAlphabetGuide: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const [showResources, setShowResources] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>American Sign Language Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Checkbox 
            id="show-images" 
            checked={showImages} 
            onCheckedChange={(checked) => setShowImages(checked as boolean)}
          />
          <label htmlFor="show-images" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Show Hand Position Images
          </label>
        </div>

        <Tabs defaultValue="alphabet" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alphabet">Alphabet</TabsTrigger>
            <TabsTrigger value="numbers">Numbers</TabsTrigger>
            <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alphabet" className="space-y-4 mt-4">
            <p className="text-muted-foreground mb-4">
              The American Sign Language alphabet is a set of 26 manual alphabetic letters used to fingerspell words. 
              Learn to form each letter correctly with the guide below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aslAlphabet.map((item) => (
                <Card key={item.letter} className="overflow-hidden">
                  <CardHeader className="p-3 bg-muted">
                    <CardTitle className="text-center text-2xl font-bold">Letter {item.letter}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {showImages && item.image && (
                      <div className="mb-4 flex justify-center">
                    {showImages && item.image && (
  <div className="mb-4 flex justify-center">
    {item.image.endsWith('.mp4') ? (
      <video
        src={item.image}
        controls
        className="h-32 w-auto object-contain"
      />
    ) : (
      <img
        src={item.image}
        alt={`ASL ${item.letter ? 'Letter ' + item.letter : item.number ? 'Number ' + item.number : item.phrase}`}
        className="h-32 w-auto object-contain"
      />
    )}
  </div>
)}

                      </div>
                    )}
                    <p className="mb-2">{item.description}</p>
                    <p className="text-sm text-muted-foreground"><strong>Tip:</strong> {item.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="numbers" className="space-y-4 mt-4">
            <p className="text-muted-foreground mb-4">
              ASL numbers have their own unique signs. Learning these will help you express quantities, 
              dates, times, and counts in American Sign Language.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aslNumbers.map((item) => (
                <Card key={item.number} className="overflow-hidden">
                  <CardHeader className="p-3 bg-muted">
                    <CardTitle className="text-center text-2xl font-bold">Number {item.number}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {showImages && item.image && (
                      <div className="mb-4 flex justify-center">
                        {item.image.endsWith('.mp4') ? (
  <video
    src={item.image}
    controls
    className="h-32 w-auto object-contain"
  />
) : (
  <img
    src={item.image}
    alt={`ASL Number ${item.number}`}
    className="h-32 w-auto object-contain"
  />
)}
                      </div>
                    )}
                    <p className="mb-2">{item.description}</p>
                    <p className="text-sm text-muted-foreground"><strong>Tip:</strong> {item.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="phrases" className="space-y-4 mt-4">
            <p className="text-muted-foreground mb-4">
              These common ASL phrases will help you with basic communication. 
              Each phrase combines multiple signs and often uses facial expressions as part of the grammar.
            </p>
            
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {aslPhrases.map((item) => (
    <Card key={item.phrase} className="overflow-hidden">
      <CardHeader className="p-3 bg-muted">
        <CardTitle className="text-center text-lg font-bold">{item.phrase}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {showImages && item.image && (
          <div className="mb-4 flex justify-center">
            {item.image.endsWith('.mp4') ? (
              <video
                src={item.image}
                controls
                className="h-32 w-auto object-contain"
              />
            ) : (
              <img
                src={item.image}
                alt={`ASL Phrase ${item.phrase}`}
                className="h-32 w-auto object-contain"
              />
            )}
          </div>
        )}
        <p className="mb-2">{item.description}</p>
        <p className="text-sm text-muted-foreground"><strong>Tip:</strong> {item.tip}</p>
      </CardContent>
    </Card>
  ))}
</div>

          </TabsContent>
        </Tabs>
        
        <Collapsible open={showResources} onOpenChange={setShowResources} className="mt-8 border rounded-md p-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Additional ASL Learning Resources
            </h3>
            {showResources ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            {aslResources.map((resource, index) => (
              <div key={index} className="border-t pt-3 first:border-t-0 first:pt-0">
                <h4 className="font-medium">{resource.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ASLAlphabetGuide;
