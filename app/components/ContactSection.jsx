'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { submitContactForm } from '../firebase/utils';
import SparkleEffect from './SparkleEffect';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
  const [isMounted, setIsMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setFeedbackMessage({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setFeedbackMessage({
          type: 'error',
          message: 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setFeedbackMessage({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setShowFeedback(true);
      setIsSubmitting(false);
      setTimeout(() => setShowFeedback(false), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
      <SparkleEffect />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 via-blue-600 to-cyan-500">
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
            Get in <span className="bg-none text-white bg-clip-text">Touch</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ready to start your next project? Contact us today and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            <div className="space-y-8">
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60">Phone</p>
                  <p className="text-white font-semibold">+91 7989628048</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60">Email</p>
                  <p className="text-white font-semibold">mentpath@gmail.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60">Location</p>
                  <p className="text-white font-semibold">Jabalpur, MP</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={`w-full px-6 py-4 bg-white/5 border ${errors.name ? 'border-red-400' : 'border-white/10'} rounded-lg focus:outline-none focus:border-white/30 text-white placeholder-white/50`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                />
                {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name}</p>}
              </div>
              <div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  className={`w-full px-6 py-4 bg-white/5 border ${errors.phone ? 'border-red-400' : 'border-white/10'} rounded-lg focus:outline-none focus:border-white/30 text-white placeholder-white/50`}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                />
                {errors.phone && <p className="text-red-400 mt-1 text-sm">{errors.phone}</p>}
                <p className="text-white/50 text-sm mt-1">Enter a valid 10-digit Indian mobile number</p>
              </div>
              <div>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className={`w-full px-6 py-4 bg-white/5 border ${errors.message ? 'border-red-400' : 'border-white/10'} rounded-lg focus:outline-none focus:border-white/30 text-white placeholder-white/50`}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                />
                {errors.message && <p className="text-red-400 mt-1 text-sm">{errors.message}</p>}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-8 py-4 bg-black rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
            feedbackMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {feedbackMessage.message}
        </motion.div>
      )}

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
