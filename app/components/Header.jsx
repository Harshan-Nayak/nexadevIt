'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
   
    { title: 'Services', href: '#services' },
    { title: 'About', href: '#about' },
    { title: 'Portfolio', href: '#portfolio' },
    { title: 'Contact', href: '#contact' },
    { title: 'Careers', href: '/careers' }
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-black/80 backdrop-blur-lg' : 'py-4 bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/logo.svg"
                alt="NexaDev Logo"
                width={120}
                height={32}
                className="cursor-pointer"
              />
            </motion.div>
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-white hover:text-blue-400 transition-colors relative group"
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.a>
              ))}
              <Link href="/enquiry" >
              <motion.button
                suppressHydrationWarning
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
                className="px-6 py-2 bg-black rounded-full text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Get Started
              </motion.button></Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              suppressHydrationWarning
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 focus:outline-none"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-lg">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-2xl hover:text-blue-400 transition-colors"
                  >
                    {item.title}
                  </motion.a>
                ))}
                <Link href="/enquiry">
                <motion.button
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Get Started
                </motion.button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
