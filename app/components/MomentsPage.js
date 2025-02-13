"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Play, Pause, Heart, Moon, Sun } from "lucide-react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export function MomentsPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [randomMessage, setRandomMessage] = useState("");
  const [confettiActive, setConfettiActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const player = document.getElementById("music-player");
    if (player && player.contentWindow) {
      player.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: isPlaying ? "playVideo" : "pauseVideo" }),
        "*"
      );
    }
  }, [isPlaying]);

  const images = Array.from({ length: 31 }, (_, i) => `/images/${i}.jpg`);

  const loveMessages = [
    "🌸aooo aooo cayangggkuu!! Happy Valentine's Day!💖 yeayyy yeayyy akhirnya setelahh sekian lama aku bisa ngerayain valentine dan itu sama kamu!! 🎉 maaciii udaaa selaluuu samaa akuu yaaa sayanggg mau sedih ataupun senang, aku bangga banget punyaa kamu. 🥰🥰  walaupun kamu ngeselin, suka bikin aku marah, aku tetep sayang sama kamu <3 semogaa kitaa kedepanyaa jadii lebihh lebihh lagiii yaaa, gaa egoiss lagii dan bisa lebih ngertiin satu sama lain 💝 I LOVEEE UUUU SO MUCCHHHH SAYANGGGG!!!❤️❤️❤️ SAMPAIII KETEMUUU DII INDONESIAA!!💕💕"
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShowMessage = () => {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setRandomMessage(message);
    setShowMessage(!showMessage);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`relative text-center p-6 overflow-hidden min-h-screen bg-gradient-to-r from-red-300 via-pink-400 to-pink-500 transition-all duration-500`}>
      {confettiActive && <Confetti numberOfPieces={100} recycle={false} />}

      <button onClick={toggleDarkMode} className="absolute top-5 right-5 bg-gray-700 text-white p-2 rounded-full">
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <h2 className="text-4xl font-bold text-white drop-shadow-lg glow">💖 Happy Valentine's Day! 💖</h2>
      <p className="mt-4 font-cursive text-white">here are our beautiful moments together...</p>

      {/* Floating Hearts */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-pink-200 text-2xl"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [-20, -100], opacity: [1, 0] }}
          transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Carousel Swiper */}
      <div className="max-w-2xl mx-auto mt-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          effect="coverflow"
          className="rounded-lg shadow-lg"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[500px]">
                <Image
                  src={src}
                  alt={`Moment ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Music Player */}
      <div className="mt-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg flex items-center gap-4 relative">
        <div className="w-14 h-14 rounded-lg overflow-hidden">
          <Image
            src="/images/cover-music.jpg"
            alt="Music Cover"
            width={56}
            height={56}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-md font-semibold text-gray-800">Blue 🎶</h3>
          <p className="text-sm text-gray-500">Yung Kai</p>
        </div>
        <button
          onClick={togglePlay}
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-700 transition"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <iframe
        id="music-player"
        width="0"
        height="0"
        src="https://www.youtube.com/embed/IpFX2vq8HKw?autoplay=1&loop=1&playlist=IpFX2vq8HKw&enablejsapi=1"
        title="YouTube music player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="hidden"
      ></iframe>

      {/* Pesan Valentine */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg max-w-md mx-auto relative">
        <p className="text-lg text-gray-700">Thank you for being my Valentine! 💖</p>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition transform hover:scale-110" onClick={handleShowMessage}>
          {showMessage ? "Tutup Pesan ❤️" : "Open This Message 💌"}
        </button>
        {showMessage && (
          <div className="mt-4 bg-pink-100 text-gray-600 p-4 rounded-lg shadow-md animate-fade-in">
            <p className="text-md text-justify leading-relaxed">{randomMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
