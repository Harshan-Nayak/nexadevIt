'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SparkleEffect from './SparkleEffect';

export default function PortfolioSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "/portfolio/ecommerce.png",
      description: "Modern e-commerce solution with seamless payment integration"
    },
    {
      title: "Fitness Tracker App",
      category: "Mobile App",
      image: "/portfolio/fitness.jpg",
      description: "Cross-platform mobile app for fitness tracking"
    },
    {
      title: "AI-Powered Analytics",
      category: "AI & ML",
      image: "/portfolio/analytics.png",
      description: "Advanced analytics platform using machine learning"
    },
    {
      title: "Cab Booking Software",
      category: "IT",
      image: "/portfolio/cabBooking.png",
      description: "User Friendly Cab Booking Software"
    },
    {
      title: "Social Media Platform",
      category: "Mobile App",
      image: "/portfolio/social.png",
      description: "Feature-rich social networking platform"
    },
    {
      title: "Web Design",
      category: "Web Development",
      image: "/portfolio/delivery.png",
      description: "Customized Design Oriented Build"
    }
  ];

  const categories = ['All', 'Web Development', 'Mobile App', 'AI & ML', 'IT'];
  
  useEffect(() => {
    setIsMounted(true);
    // Generate floating elements only on client side
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: `${i * 2}s`,
      size: `${0.8 + Math.random()}rem`,
      startPos: `${Math.random() * 100}%`
    }));
    setFloatingElements(elements);
  }, []);

  if (!isMounted) return null;

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="relative min-h-screen py-20 overflow-hidden">
      <SparkleEffect />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 transition-all duration-1000">
        {/* Animated gradient circles */}
        <div className="absolute top-0 right-20 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
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
            Our <span className="bg-none  text-white bg-clip-text">Portfolio</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore our diverse range of projects that showcase our expertise and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full backdrop-blur-lg border border-white/20 transition-all ${
                selectedCategory === category 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-white/70">{project.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-white/80">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
