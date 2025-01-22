'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

export default function HeroSection() {
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating elements only on client side
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      delay: `${i * 2}s`,
      size: `${1 + Math.random()}rem`,
      startPos: `${Math.random() * 100}%`
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        {/* Animated gradient circles */}
        <div className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-pink-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12 md:py-20">
          <motion.div 
            className="text-center lg:text-left lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <TypeAnimation
                  sequence={[
                    'Innovating Your Digital Presence with',
                    1000,
                    'Innovating Your Digital Future with',
                    1000,
                    'Innovating Your Digital Success with',
                    1000,
                  ]}
                  wrapper="span"
                  speed={5}
                  repeat={Infinity}
                />
                <br />
                <div className="bg-gradient-to-r from-green-300 via-yellow-300 to-orange-400 text-transparent bg-clip-text animate-gradient-x font-extrabold">
                  Next-Gen Solutions
                </div>
              </h1>
              <TypeAnimation
                sequence={[
                  'Building world-class mobile apps and websites tailored to your needs',
                  1000,
                  'Creating innovative digital solutions for your business growth',
                  1000,
                  'Transforming ideas into powerful digital experiences',
                  1000,
                ]}
                wrapper="p"
                speed={40}
                repeat={Infinity}
                className="text-lg md:text-xl text-white/90 mb-8"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/enquiry">
                  <motion.button
                    suppressHydrationWarning
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-lg rounded-full text-white font-semibold transition-all hover:bg-white/30 border border-white/30"
                  >
                    Get a Quote
                  </motion.button>
                </Link>
                <motion.button
                  suppressHydrationWarning
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 md:py-4 bg-black/20 backdrop-blur-lg rounded-full text-white font-semibold hover:bg-black/30 transition-all border border-white/10"
                  onClick={() => {
                    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Our Work
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 3D Grid Animation */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] perspective-1000">
              <div className="grid-animation">
                <div className="cube">
                  <div className="cube-face front"></div>
                  <div className="cube-face back"></div>
                  <div className="cube-face right"></div>
                  <div className="cube-face left"></div>
                  <div className="cube-face top"></div>
                  <div className="cube-face bottom"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-elements">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="floating-element"
              style={{
                '--delay': element.delay,
                '--size': element.size,
                '--start-pos': element.startPos,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
