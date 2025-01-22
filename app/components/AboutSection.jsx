'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SparkleEffect from './SparkleEffect';

export default function AboutSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate floating elements only on client side
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: `${i * 1.5}s`,
      size: `${0.8 + Math.random()}rem`,
      startPos: `${Math.random() * 100}%`
    }));
    setFloatingElements(elements);
  }, []);

  if (!isMounted) return null;

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      <SparkleEffect />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 transition-all duration-1000">
        {/* Animated gradient circles */}
        <div className="absolute top-20 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 left-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="bg-none text-white bg-clip-text">NexaDev</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transforming ideas into exceptional digital experiences through innovation and expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation First",
              description: "We stay ahead of the curve with cutting-edge technologies and methodologies.",
              icon: "🚀"
            },
            {
              title: "User-Centric",
              description: "Every solution is crafted with the end-user experience in mind.",
              icon: "👥"
            },
            {
              title: "Quality Driven",
              description: "We maintain the highest standards in code quality and performance.",
              icon: "⭐"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
              <p className="text-white/80">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10+", label: "Projects Completed" },
              { number: "8+", label: "Happy Clients" },
              { number: "2+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <motion.h4
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.h4>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
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
    </section>
  );
}
