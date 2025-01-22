'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SparkleEffect from '../components/SparkleEffect';
import { submitEnquiryForm } from '../firebase/utils';

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    projectDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    
    // Email validation (optional)
    if (formData.email.trim()) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    // Project Description validation
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = 'Project description must be at least 20 characters';
    } else if (formData.projectDescription.trim().length > 2000) {
      newErrors.projectDescription = 'Project description must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const result = await submitEnquiryForm(formData);
      if (result.success) {
        setFeedbackMessage({
          type: 'success',
          message: 'Thank you for your enquiry! We\'ll get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          mobile: '',
          projectDescription: ''
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          message: 'Failed to submit enquiry. Please try again.'
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

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <SparkleEffect />
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Get a Quote for Your Project
          </h1>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Your Email"
                />
                {errors.email && <p className="text-red-400 mt-1 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-white mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.mobile ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Your Mobile Number"
                />
                {errors.mobile && <p className="text-red-400 mt-1 text-sm">{errors.mobile}</p>}
                <p className="text-white/50 text-sm mt-1">Enter a valid 10-digit Indian mobile number</p>
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-white mb-2">Project Description *</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.projectDescription ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Tell us about your project"
                ></textarea>
                {errors.projectDescription && <p className="text-red-400 mt-1 text-sm">{errors.projectDescription}</p>}
                <p className="text-white/50 text-sm mt-1">Minimum 20 characters required</p>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Get Quote'}
              </motion.button>
            </form>
          </div>
        </motion.div>

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
      </main>
      <Footer />
    </div>
  );
}
