import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BassGuitar = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<{ [key: string]: OscillatorNode | null }>({});

  // Bass guitar frequencies (E2, A2, D3, G3)
  const strings = [
    { note: 'E', frequency: 82.41, color: 'bg-yellow-400' },
    { note: 'A', frequency: 110.00, color: 'bg-green-400' },
    { note: 'D', frequency: 146.83, color: 'bg-blue-400' },
    { note: 'G', frequency: 196.00, color: 'bg-purple-400' }
  ];

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      // Cleanup - capture current values
      const currentOscillators = { ...oscillatorsRef.current };
      const currentAudioContext = audioContextRef.current;
      
      Object.values(currentOscillators).forEach(osc => {
        if (osc) {
          osc.stop();
        }
      });
      if (currentAudioContext) {
        currentAudioContext.close();
      }
    };
  }, []);

  const playNote = (note: string, frequency: number) => {
    if (!audioContextRef.current) return;

    // Stop any existing oscillator for this note
    if (oscillatorsRef.current[note]) {
      oscillatorsRef.current[note]?.stop();
    }

    // Create new oscillator
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Set up the sound
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';

    // Create a bass-like envelope with maximum volume
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(1.0, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContextRef.current.currentTime + 1.0);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 1.0);

    oscillatorsRef.current[note] = oscillator;
    setIsPlaying(note);

    // Reset playing state after animation
    setTimeout(() => setIsPlaying(null), 1000);
  };

  const handleStringClick = (note: string, frequency: number) => {
    playNote(note, frequency);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col items-center space-y-4 p-6 bg-gray-800 rounded-lg border-2 border-green-400"
    >
      <h3 className="text-xl text-pink-400 font-bold mb-4">🎸 Play Me! (Ya its a digital bass with 4 notes)</h3>
      
      <div className="relative">
        {/* Guitar body */}
        <div className="w-64 h-32 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full border-4 border-amber-700 shadow-lg">
          {/* Strings */}
          <div className="absolute inset-0 flex items-center justify-center space-x-8">
            {strings.map((string, index) => (
              <motion.div
                key={string.note}
                className={`w-1 h-20 ${string.color} rounded-full cursor-pointer shadow-lg`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                animate={isPlaying === string.note ? {
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => handleStringClick(string.note, string.frequency)}
              />
            ))}
          </div>
          
          {/* String labels */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center space-x-8">
            {strings.map((string) => (
              <div
                key={string.note}
                className={`text-lg font-bold ${string.color.replace('bg-', 'text-')}`}
              >
                {string.note}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-300 text-sm mt-4">
        <p>Click the strings to play notes</p>
        <p className="text-xs text-gray-400 mt-1">E A D G</p>
      </div>

      {/* Visual feedback */}
      {isPlaying && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute text-4xl"
        >
          🎵
        </motion.div>
      )}
    </motion.div>
  );
};

export default BassGuitar; 