
# SignifyX - Sign Language to Text & Speech Conversion

## Project Overview

SignifyX is an innovative web application that translates sign language into text and speech using advanced machine learning and computer vision technology. It aims to bridge communication gaps between deaf or hard-of-hearing individuals and those who do not understand sign language.

## Features

- **Real-time ASL Detection**: Recognizes American Sign Language gestures from A-Z and common phrases
- **Text & Speech Conversion**: Translates detected signs into readable text and spoken words
- **Visual Hand Tracking**: Visualizes hand landmarks for better understanding of gesture detection
- **Sentence Formation**: Builds coherent sentences from individual detected signs
- **Predictive Suggestions**: Offers text completion suggestions based on detected patterns
- **Educational Resources**: Provides learning materials for ASL beginners
- **Customizable Settings**: Adjustable confidence thresholds and visualization options
- **Privacy-Focused**: All processing happens locally in the browser, no data is sent to servers

## Development Team

1. Pranav Jasyal
2. Rohit Thakur
3. Raghav Thakur
4. Rizul Thakur

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Machine Learning**: TensorFlow.js, MediaPipe Handpose
- **Speech**: Web Speech API
- **Video Processing**: WebRTC

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd signifyx

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. Open the application in a web browser
2. Enable camera access when prompted
3. Position your hand(s) in view of the camera
4. Click "Start Detection" to begin recognizing sign language
5. Watch as detected signs are converted to text and optionally spoken

## Contributing

We welcome contributions to SignifyX! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The TensorFlow.js and MediaPipe teams for providing the foundation for hand tracking
- The deaf and hard-of-hearing community for inspiration and guidance
- All contributors who have helped improve this application
