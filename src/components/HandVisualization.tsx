
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Maximize2 } from 'lucide-react';

export interface HandVisualizationProps {
  landmarks: any[];
  onLetterDetected?: (detectedLetter: string) => void;
  onConfidenceChange?: React.Dispatch<React.SetStateAction<number>>;
  onShowLandmarksChange?: React.Dispatch<React.SetStateAction<boolean>>;
  confidenceThreshold?: number;
  showLandmarks?: boolean;
}

const HandVisualization: React.FC<HandVisualizationProps> = ({ 
  landmarks, 
  onLetterDetected,
  onConfidenceChange,
  onShowLandmarksChange,
  confidenceThreshold = 0.7,
  showLandmarks = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const popupCanvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedLetter, setDetectedLetter] = useState<string | null>(null);

  // Define finger labels for better visualization
  const fingerLabels = {
    0: "T", // Thumb
    1: "I", // Index 
    2: "M", // Middle
    3: "R", // Ring
    4: "P", // Pinky
  };

  // Draw landmarks on both the main canvas and the popup canvas
  useEffect(() => {
    const drawOnCanvas = (canvas: HTMLCanvasElement | null, isPopup: boolean = false) => {
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!showLandmarks || !landmarks || landmarks.length === 0) return;

      // Set different sizes based on whether it's the popup or main canvas
      const pointSize = isPopup ? 8 : 6;
      const lineWidth = isPopup ? 4 : 3;
      const fontSize = isPopup ? 12 : 10;
      
      // Draw points
      ctx.fillStyle = 'rgb(128, 0, 128)'; // Purple color for points
      for (const landmark of landmarks) {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Draw connections between landmarks
      if (landmarks.length >= 21) {
        ctx.strokeStyle = 'rgb(128, 0, 255)'; // Brighter purple for lines
        ctx.lineWidth = lineWidth;
        
        // Draw connections for each finger
        // Thumb (landmarks 0, 1, 2, 3, 4)
        drawFingerConnections(ctx, landmarks, [0, 1, 2, 3, 4], canvas);
        
        // Index finger (landmarks 0, 5, 6, 7, 8)
        drawFingerConnections(ctx, landmarks, [0, 5, 6, 7, 8], canvas);
        
        // Middle finger (landmarks 0, 9, 10, 11, 12)
        drawFingerConnections(ctx, landmarks, [0, 9, 10, 11, 12], canvas);
        
        // Ring finger (landmarks 0, 13, 14, 15, 16)
        drawFingerConnections(ctx, landmarks, [0, 13, 14, 15, 16], canvas);
        
        // Pinky (landmarks 0, 17, 18, 19, 20)
        drawFingerConnections(ctx, landmarks, [0, 17, 18, 19, 20], canvas);
        
        // Connect palm (0, 5, 9, 13, 17)
        drawFingerConnections(ctx, landmarks, [0, 5, 9, 13, 17, 0], canvas);

        // Add finger labels for better visualization in popup
        if (isPopup) {
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = 'white';
          
          // Add finger tip labels
          addFingerLabel(ctx, landmarks[4], "T", canvas);  // Thumb
          addFingerLabel(ctx, landmarks[8], "I", canvas);  // Index
          addFingerLabel(ctx, landmarks[12], "M", canvas); // Middle
          addFingerLabel(ctx, landmarks[16], "R", canvas); // Ring
          addFingerLabel(ctx, landmarks[20], "P", canvas); // Pinky
          
          // Add legend at bottom
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(10, canvas.height - 30, 420, 25);
          ctx.fillStyle = 'white';
          ctx.fillText("T: Thumb, I: Index, M: Middle, R: Ring, P: Pinky", 15, canvas.height - 15);
        }
      }
    };
    
    // Helper to add finger labels
    const addFingerLabel = (
      ctx: CanvasRenderingContext2D, 
      landmark: any, 
      label: string, 
      canvas: HTMLCanvasElement
    ) => {
      if (!landmark) return;
      const x = landmark.x * canvas.width;
      const y = landmark.y * canvas.height;
      
      // Add background for better visibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(x - 8, y - 8, 16, 16);
      
      // Draw the label
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    };

    // Helper to draw connections between landmarks
    const drawFingerConnections = (
      ctx: CanvasRenderingContext2D, 
      landmarks: any[], 
      indices: number[], 
      canvas: HTMLCanvasElement
    ) => {
      ctx.beginPath();
      let firstPoint = true;
      for (const idx of indices) {
        const landmark = landmarks[idx];
        if (!landmark) continue;
        
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    // Draw on main canvas
    drawOnCanvas(canvasRef.current);
    
    // Draw on popup canvas if it exists
    drawOnCanvas(popupCanvasRef.current, true);

  }, [landmarks, showLandmarks]);

  return (
    <div className="relative w-full">
      {confidenceThreshold !== undefined && onConfidenceChange && (
        <Card className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Hand Analysis</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="confidence" className="block text-sm font-medium mb-1">
                Confidence Threshold: {Math.round(confidenceThreshold * 100)}%
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="confidence"
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.1"
                  value={confidenceThreshold}
                  onChange={(e) => onConfidenceChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            {onShowLandmarksChange && (
              <div className="flex items-center">
                <input
                  id="show-landmarks"
                  type="checkbox"
                  checked={showLandmarks}
                  onChange={(e) => onShowLandmarksChange(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="show-landmarks" className="text-sm font-medium">
                  Show Hand Landmarks
                </label>
              </div>
            )}
          </div>
          
          {/* Popup display for hand landmarks */}
          {landmarks && landmarks.length > 0 && (
            <div className="mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                    <Maximize2 size={16} />
                    Expand Hand Visualization
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-[460px] p-0" align="center">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800">
                    <h4 className="font-medium text-center mb-2">Hand Landmarks</h4>
                    <div className="bg-black rounded-md overflow-hidden relative w-full h-[400px]">
                      <canvas 
                        ref={popupCanvasRef} 
                        className="w-full h-full" 
                        width={400} 
                        height={400}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </Card>
      )}
      
      <div className="absolute top-0 left-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" width={640} height={480} />
        {detectedLetter && (
          <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 text-black dark:text-white p-3 rounded-lg text-lg font-bold">
            Detected: {detectedLetter}
          </div>
        )}
      </div>
    </div>
  );
};

export default HandVisualization;
