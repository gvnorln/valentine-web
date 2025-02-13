"use client";

import { useEffect, useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { ValentinePage } from "./components/ValentinePage";
import { MomentsPage } from "./components/MomentsPage";
import "./globals.css";

export default function ValentineApp() {
  const [page, setPage] = useState("login");
  const [hearts, setHearts] = useState([]);
  const [cuteEmojis, setCuteEmojis] = useState([]);

  // const targetDate = new Date(Date.UTC(2025, 1, 14, 0, 0, 0)).getTime();
  const targetDate = Date.now() + 5 * 1000; // 1 menit dari sekarang
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(targetDate - currentTime);
  const [bgColor, setBgColor] = useState("bg-pink-200");
  const messages = [
    "udah nggak sabar yaaa? 🥰",
    "dikit agiii kokkk! cemangattt! 😘",
    "bentar agiii ketemu valentine! 💕",
    "caaball yupsss 💖",
  ];
  const [randomMessage, setRandomMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      setTimeLeft(targetDate - now);
      setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
      setBgColor((prev) => (prev === "bg-pink-200" ? "bg-pink-300" : "bg-pink-200"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Gunakan useEffect agar elemen hati dan emoji hanya dibuat di client-side
  useEffect(() => {
    const generateFloatingElements = (emoji, count) => {
      return Array.from({ length: count }).map(() => ({
        emoji,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 3}s`,
      }));
    };

    setHearts(generateFloatingElements("❤️", 10)); // Hati melayang
    setCuteEmojis([...generateFloatingElements("🐻", 5), ...generateFloatingElements("🎀", 5)]); // Beruang dan My Melody melayang
  }, []); // hanya berjalan sekali setelah mount

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor} text-center transition-all duration-500`}>
        <h1 className="text-4xl font-bold text-pink-600 animate-bounce">AOO AOOOO SAYANGGG!!!</h1>
        <p className="text-lg mt-4 text-pink-600">{randomMessage}</p>
        <div className="mt-4 text-3xl font-semibold text-pink-800">
          {days} hari {hours} jam {minutes} menit {seconds} detik
        </div>

        {/* Hati & Emoji lucu melayang */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...hearts, ...cuteEmojis].map((item, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: item.left,
                top: item.top,
                animationDuration: item.duration,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      {page === "login" && <LoginPage onLogin={() => setPage("valentine")} />}
      {page === "valentine" && <ValentinePage onYes={() => setPage("moments")} />}
      {page === "moments" && <MomentsPage />}
    </div>
  );
}
