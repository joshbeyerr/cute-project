import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import the flower image
import flowerImage from './images/flower.jpg';

export default function App() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlowers, setShowFlowers] = useState(false);
  // Removed unused timer state since we replaced it with the flower image

  // Debug: Log the image path
  console.log("🔍 Trying to load flower image from src/images/flower.jpg");

  const codeText = `/**
 * THE CODE OF LOVE
 */
To Sanaah,
Hello (:
Ever since we met, at Einsteins, I knew something was special about you;
// A lovely day it was
Our conversation flowed so smoothly and I felt so comfortable around you;
Everything about it felt perfect and it was just one of those situations where I knew I would be being seeing a lot more of you;
After that day I wanted to meet with you every day at the library;
// Not at all to work, but because I needed to talk to you more, see your face, see your smile.
We also had some moments early on that may have been weird but were really special to me and showed that even super early on we felt serious about each other;
// Setting relationship boundaries outside taylor library, you calling me saying someone came up to you at the library and said fuck you, etc.
I wont ramble on too much, but right from when we first met until now and onwards, you have been amazing and our connection has made me feel so happy;
Thank you for being so special and being you (:

Click anywhere to see something that is also cool...`;

  // Removed unused startDate since we replaced the timer with the flower image

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < codeText.length) {
      const timer = setTimeout(() => {
        if (codeText[currentIndex] === '<') {
          // Skip HTML tags
          const nextCloseTag = codeText.indexOf('>', currentIndex);
          setDisplayedText(prev => prev + codeText.substring(currentIndex, nextCloseTag + 1));
          setCurrentIndex(nextCloseTag + 1);
        } else {
          setDisplayedText(prev => prev + codeText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      // Show flowers after text is complete with more delay
      setTimeout(() => setShowFlowers(true), 2000);
    }
  }, [currentIndex, codeText]);

  // Removed timer effect since we replaced it with the flower image

  const handleClick = () => {
    setShowFlowers(true);
  };

  return (
    <div 
      className="min-h-screen bg-black text-green-400 p-8 font-mono cursor-pointer"
      onClick={handleClick}
      style={{
        fontFamily: "'Courier New', monospace",
        background: "linear-gradient(45deg, #000000, #1a1a1a)"
      }}
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Code */}
        <div className="flex-1 pr-8">
          <div className="relative">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap mb-16">
              {displayedText}
              {currentIndex < codeText.length && (
                <span className="animate-pulse">_</span>
              )}
            </pre>
          </div>
        </div>

        {/* Right side - Flower image and animations */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ 
              opacity: currentIndex >= codeText.length ? 1 : 0,
              scale: currentIndex >= codeText.length ? 1 : 0.5,
              rotate: currentIndex >= codeText.length ? 0 : -10
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl mb-4 text-pink-400">FOR YOU !!!!!1</h2>
            <motion.div 
              className="bg-gray-900 p-6 rounded border-2 border-green-400 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={flowerImage}
                alt="Beautiful flower for you"
                className="mx-auto border-2 border-red-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                onLoad={() => {
                  console.log("✅ Flower image loaded successfully!");
                }}
                style={{ maxWidth: '400px', width: '100%' }}
              />
              <div className="text-sm text-gray-400 mt-2">
                Digital flowers (for you) (my darling) 
              </div>
            </motion.div>
          </motion.div>



          {/* Floating simple flowers */}
          {showFlowers && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    x: Math.random() * 400,
                    y: 600,
                    opacity: 0
                  }}
                  animate={{
                    y: -100,
                    opacity: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: Math.random() * 5 + 8,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "linear"
                  }}
                >
                  {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌺' : '🌷'}
                </motion.div>
              ))}
            </>
          )}

          {/* Bottom message */}
          {showFlowers && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-center mb-8 mt-12"
            >
              <div className="text-pink-400 text-lg mb-2">
                Happy National Girlfriend Day
              </div>
              <div className="text-yellow-400 text-sm">
                - From Your International Boyfriend (Canada, Toronto, Ontario, Midtown)♥
              </div>
            </motion.div>
          )}


        </div>
      </div>
    </div>
  );
} 