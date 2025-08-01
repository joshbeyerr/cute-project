import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlowers, setShowFlowers] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const codeText = `/**
 * THE CODE OF LOVE
 */
Hey Girl !
Do you remember the day we first met?
// That amazing day when everything changed.
Since that day a spark begun;
// Your smile, Your laugh, Your everything.
Your beautiful soul got imprinted in my heart;
As the time went on;
The Bond grew stronger and stronger;
Journey from strangers to soulmates;
We have traveled this beautiful path together;
There have been silly fights ;
// And I'm sure there will be more.
But our love will always grow back Stronger;

All I want to say is:
Baby, I will love you forever;

Click anywhere to see something special...`;

  // Set your actual relationship start date here
  const startDate = new Date('2023-01-15T18:30:00'); // Change this to your real date!

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
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Show flowers after text is complete
      setTimeout(() => setShowFlowers(true), 1000);
    }
  }, [currentIndex, codeText]);

  // Timer effect
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

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
            <pre className="text-sm leading-relaxed whitespace-pre-wrap">
              {displayedText}
              {currentIndex < codeText.length && (
                <span className="animate-pulse">_</span>
              )}
            </pre>
          </div>
        </div>

        {/* Right side - Timer and flowers */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex >= codeText.length ? 1 : 0 }}
            transition={{ duration: 2 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl mb-4 text-pink-400">OUR LOVE TIMER</h2>
            <div className="bg-gray-900 p-6 rounded border-2 border-green-400 shadow-lg">
              <div className="text-xl">
                <span className="text-yellow-400 font-bold">{timeElapsed.days}</span> days{" "}
                <span className="text-yellow-400 font-bold">{String(timeElapsed.hours).padStart(2, '0')}</span> hours{" "}
                <span className="text-yellow-400 font-bold">{String(timeElapsed.minutes).padStart(2, '0')}</span> minutes{" "}
                <span className="text-yellow-400 font-bold">{String(timeElapsed.seconds).padStart(2, '0')}</span> seconds
              </div>
              <div className="text-sm text-gray-400 mt-2">
                ...and counting ♥
              </div>
            </div>
          </motion.div>

          {/* Simple flower animation */}
          {showFlowers && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-6xl">
                🌸🌺🌸
              </div>
            </motion.div>
          )}

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
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 text-center"
            >
              <div className="text-pink-400 text-lg mb-2">
                I LOVE YOU SO MUCH changee
              </div>
              <div className="text-yellow-400 text-sm">
                - Your Boyfriend ♥
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 