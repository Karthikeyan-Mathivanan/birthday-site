import React, { useEffect } from "react";
import "@fontsource/great-vibes";

export default function BirthdayPage() {
  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      const hearts = document.querySelectorAll(".heartline");
      hearts.forEach((el, i) => {
        el.style.transform = `translateY(${window.scrollY * 0.2 * (i + 1)}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Firework particles
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    function createParticle() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;
      const radius = Math.random() * 2 + 1;
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
      const speedX = (Math.random() - 0.5) * 4;
      const speedY = (Math.random() - 0.5) * 4;
      particles.push({ x, y, radius, color, speedX, speedY, alpha: 1 });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.01;
        if (p.alpha <= 0) particles.splice(i, 1);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    setInterval(() => {
      for (let i = 0; i < 10; i++) createParticle();
    }, 200);

    animate();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative">
      {/* Fireworks Canvas */}
      <canvas
        id="fireworksCanvas"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      ></canvas>

      {/* Background Music */}
      <audio autoPlay loop hidden>
        <source src="/birthday_bgm.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center h-screen text-center p-4 relative z-10 overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-bold text-purple-400 drop-shadow-strong-glow animate-pulse font-[\'Great Vibes\'] neon-text">
          Happy Birthday Harini!
        </h1>
        <p className="text-xl md:text-2xl mt-4 text-orange-400 max-w-xl font-[\'Lobster\']">
          You make life glow brighter, just like these neon lights 💖
        </p>
        <div className="absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="heartline absolute text-purple-400 text-4xl animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            >
              💜
            </div>
          ))}
        </div>
        <div className="absolute bottom-10 animate-bounce z-10">
          <span className="text-purple-400 text-3xl">↓</span>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 text-center relative z-10">
        <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md rounded-xl p-6 border border-purple-500 shadow-neon-purple">
          <h2 className="text-3xl font-semibold text-purple-400 mb-4">Personal Message</h2>
          <p className="text-orange-300">
            Dear Harini, <br />
            On your special day, here’s a small surprise filled with love and happiness.
            Thank you for being the light in my life. This is just the beginning. 💜
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-black text-center relative z-10">
        <h2 className="text-3xl font-semibold text-purple-400 mb-6">Wishes from Everyone 🎥</h2>
        <div className="max-w-3xl mx-auto">
          <video
            className="w-full rounded-xl border-4 border-purple-500 shadow-neon-purple"
            controls
            autoPlay
          >
            <source src="/birthday_wishes.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
}
