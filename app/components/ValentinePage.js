import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

const loveSong = new Howl({
  src: ["/love-song.mp3"],
  autoplay: true,
  loop: true,
  volume: 0.5,
});

export function ValentinePage({ onYes }) {
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [bgColor, setBgColor] = useState("bg-gradient-to-r from-pink-300 to-pink-400");

  useEffect(() => {
    // Animasi perubahan background setiap 1.5 detik
    const interval = setInterval(() => {
      setBgColor((prev) =>
        prev === "bg-gradient-to-r from-red-300 to-pink-400"
          ? "bg-gradient-to-r from-pink-400 to-pink-500"
          : "bg-gradient-to-r from-pink-300 to-pink-400"
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;

    setNoPosition({ x: randomX, y: randomY });
    setYesSize(yesSize + 0.2);
    setIsMoved(true);
    setNoClickCount(noClickCount + 1);
    
    if (noClickCount >= 4) {
      setShowMessage(true);
    }
  };
  
  const handleYesClick = () => {
    onYes();
    setHearts([...hearts, { id: Date.now() }]);
  };

  return (
    <div className={`text-center relative overflow-hidden h-screen flex flex-col items-center justify-center w-full ${bgColor} transition-all duration-500`}>
      <h2 className="text-3xl font-bold text-white">Will You Be My Valentine? 💖</h2>
      <div className="flex gap-4 justify-center mt-6 relative">
        <motion.button
          className="px-6 py-3 bg-pink-500 text-white rounded shadow-lg"
          style={{ transform: `scale(${yesSize})` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          onClick={handleYesClick}
        >
          Yes 💘
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded shadow-lg"
          animate={isMoved ? { x: noPosition.x, y: noPosition.y, scale: [1, 0.9, 1] } : {}}
          transition={{ type: "spring", stiffness: 100 }}
          onClick={moveNoButton}
          style={noClickCount > 5 ? { opacity: 0, pointerEvents: "none" } : {}}
        >
          No 😢
        </motion.button>
      </div>

      {showMessage && (
        <p className="mt-4 text-white font-bold">Come on, just say YES! 🥺💕</p>
      )}

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-500 text-6xl"
          style={{ left: `${Math.random() * 100}%`, top: "0%" }}
          animate={{ y: [0, 500], opacity: [1, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-pink-400 opacity-50 text-2xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100], opacity: [1, 0] }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Animasi Floating */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
