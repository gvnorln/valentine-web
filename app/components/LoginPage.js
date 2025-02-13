import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LoginPage({ onLogin }) {
  const [input, setInput] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState("bg-gradient-to-r from-pink-300 to-pink-400");
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const credentials = { username: "uenuen", password: "241024" };

  useEffect(() => {
    // Animasi perubahan background setiap detik
    const interval = setInterval(() => {
      setBgColor((prev) =>
        prev === "bg-gradient-to-r from-pink-300 to-pink-400"
          ? "bg-gradient-to-r from-pink-400 to-pink-500"
          : "bg-gradient-to-r from-pink-300 to-pink-400"
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Membuat elemen floating (hati, beruang, My Melody)
    const generateFloatingElements = (emoji, count) => {
      return Array.from({ length: count }).map(() => ({
        emoji,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 3}s`,
      }));
    };

    setFloatingEmojis([
      ...generateFloatingElements("❤️", 7), // Hati
      ...generateFloatingElements("🐻", 4), // Beruang
      ...generateFloatingElements("🎀", 4), // My Melody
    ]);
  }, []);

  const handleLogin = () => {
    if (input.username === credentials.username && input.password === credentials.password) {
      const audio = new Audio("/kiss.mp3");
      audio.play().catch((e) => console.error("Audio play error:", e));
      onLogin();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      alert("Aduhh salah, coba lagi dong sayang~ 😘");
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen w-full ${bgColor} transition-all duration-500`}>
      {/* Floating Emoji (hati, beruang, My Melody) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {floatingEmojis.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: item.left,
              top: item.top,
              animation: `float ${item.duration} linear infinite`,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Login Form tanpa background putih */}
      <div className="relative flex flex-col items-center p-6 rounded-lg shadow-lg w-80 text-center bg-opacity-30 backdrop-blur-md border border-white">
        <h2 className="text-2xl font-bold text-white">Halloooo sayangggg i made thiss forr you!!!❤️❤️😘😘</h2>
        
        <motion.div animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.2 }}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mt-4 border rounded bg-white text-black"
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 mt-2 border rounded bg-white text-black"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <button
              className="absolute right-3 top-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👀"}
            </button>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          className="w-full p-2 mt-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-all"
          onClick={handleLogin}
        >
          Login 💕
        </motion.button>
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
