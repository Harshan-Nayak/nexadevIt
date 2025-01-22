'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'End-to-end web development solutions for your business needs.',
    features: [
      'Website design and development',
      'E-commerce website development',
      'Custom web application solution',
      'Custom ERP Solutions',
      'Website maintenance and support',
      'Search engine optimization',
      'Custom CRM Solutions'
    ]
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    description: 'Comprehensive mobile app solutions for all platforms.',
    features: [
      'Mobile app design and development',
      'Cross-platform app development',
      'Custom app development',
      'E-commerce app development',
      'UI/UX design',
      'App maintenance and support',
      'App testing and quality assurance'
    ]
  },
  {
    icon: '🎨',
    title: 'Web Designing',
    description: 'Creative and responsive web design solutions.',
    features: [
      'Modern UI/UX Design',
      'Responsive Design',
      'Interactive Prototypes',
      'Brand Identity Design',
      'Visual Design Systems',
      'Animation & Motion Design',
      'Design Consultation'
    ]
  },
  {
    icon: '⚙️',
    title: 'Custom Software Development',
    description: 'Tailored software solutions for your business.',
    features: [
      'Enterprise Software Solutions',
      'Workflow Automation',
      'Legacy System Integration',
      'Cloud-Based Solutions',
      'Data Analytics Tools',
      'Business Intelligence Systems',
      'API Development & Integration'
    ]
  },
  {
    icon: '🪙',
    title: 'Blockchain Development',
    description: 'Secure and decentralized solutions for your business.',
    features: [
      'Smart contract development',
      'Cryptocurrency wallets',
      'Blockchain consulting',
      'Decentralized app (DApp) development',
      'Tokenization solutions',
      'Private blockchain implementation',
      'Blockchain-based supply chain management'
    ]
  },
  {
    icon: '🚀',
    title: 'Startup Services',
    description: 'End-to-end support for startups to scale faster.',
    features: [
      'MVP development',
      'Product prototyping',
      'Go-to-market strategy',
      'Investor pitch decks',
      'Scalability planning',
      'Growth hacking',
      'Co-development partnerships'
    ]
  }
];

const SparkleEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [trail, setTrail] = useState([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const createSparkle = useCallback((x, y) => {
    const size = Math.random() * 10 + 5;
    return {
      id: Math.random(),
      x,
      y,
      size,
      createdAt: Date.now()
    };
  }, []);

  const createTrailParticle = useCallback((x, y) => {
    return {
      id: Math.random(),
      x,
      y,
      color: `hsla(${Math.random() * 360}, 100%, 75%, 1)`,
      createdAt: Date.now()
    };
  }, []);

  const animateSparkles = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      // Update sparkles
      setSparkles((prevSparkles) => {
        const currentTime = Date.now();
        return prevSparkles
          .filter((sparkle) => currentTime - sparkle.createdAt < 1000)
          .concat(Math.random() < 0.3 ? createSparkle(mousePosition.x, mousePosition.y) : []);
      });

      // Update trail
      setTrail((prevTrail) => {
        const currentTime = Date.now();
        return prevTrail
          .filter((particle) => currentTime - particle.createdAt < 500)
          .concat(createTrailParticle(mousePosition.x, mousePosition.y));
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateSparkles);
  }, [mousePosition, createSparkle, createTrailParticle]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animateSparkles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [animateSparkles]);

  return (
    <>
      <div
        className="cursor-glow"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`
        }}
      />
      <div className="sparkle">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle-particle"
            style={{
              left: sparkle.x - sparkle.size / 2,
              top: sparkle.y - sparkle.size / 2,
              width: sparkle.size,
              height: sparkle.size
            }}
          />
        ))}
      </div>
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="sparkle-trail"
          style={{
            left: particle.x - 2,
            top: particle.y - 2,
            background: particle.color
          }}
        />
      ))}
    </>
  );
};

const ServiceCard = ({ icon, title, description, features }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }}
      className="relative p-6 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl transform transition-all duration-500 ease-out"
    >
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-4xl">{icon}</span>
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>
        </div>
        
        <p className="text-gray-200">{description}</p>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-2 text-sm text-gray-200 mt-4"
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-center space-x-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl animate-gradient-xy -z-10 group-hover:opacity-30 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [hoveredService, setHoveredService] = useState(null);

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
    <section id="services" className="relative min-h-screen py-20 overflow-hidden">
      <SparkleEffect />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 transition-all duration-1000">
        {/* Animated gradient circles */}
        <div className="absolute top-20 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 left-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            We offer a comprehensive range of technology solutions to help your business grow and succeed in the digital age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-16"
      >
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          Start Your Project
        </motion.a>
      </motion.div> */}

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
