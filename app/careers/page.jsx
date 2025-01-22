'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SparkleEffect from '../components/SparkleEffect';
import { submitCareerApplication } from '../firebase/utils';

const jobPositions = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'Interns will gain hands-on experience working on cutting-edge full-stack projects, utilizing the latest technologies. Candidates should demonstrate proficiency in modern tools and a strong understanding of emerging tech trends',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Interns will be actively engaged in developing dynamic projects using React Native and Flutter, gaining practical experience in cross-platform app development. A foundational understanding of these technologies is essential.',
  },
  {
    id: 'marketing',
    title: 'Marketing Interns',
    description: 'The Digital Marketing Intern will be responsible for social media marketing, web analytics, online marketing, and communication tasks on a daily basis. The role offers the opportunity to gain hands-on experience in digital marketing strategies within a collaborative team environment.',
  },
];

export default function CareersPage() {
  const [mounted, setMounted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    linkedinUrl: '',
    resumeUrl: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

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
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    
    // LinkedIn URL validation
    if (!formData.linkedinUrl.trim()) {
      newErrors.linkedinUrl = 'LinkedIn URL is required';
    } else if (!formData.linkedinUrl.includes('linkedin.com/')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn profile URL';
    }
    
    // Resume URL validation
    if (!formData.resumeUrl.trim()) {
      newErrors.resumeUrl = 'Resume URL is required';
    } else if (!formData.resumeUrl.includes('google.com')) {
      newErrors.resumeUrl = 'Please enter a valid Google Drive URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const applicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        linkedinUrl: formData.linkedinUrl,
        resumeUrl: formData.resumeUrl,
        timestamp: new Date().toISOString()
      };

      const result = await submitCareerApplication(applicationData);
      if (result.success) {
        setFeedbackMessage({
          type: 'success',
          message: 'Application submitted successfully! We\'ll get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          linkedinUrl: '',
          resumeUrl: ''
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          message: 'Failed to submit application. Please try again.'
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <SparkleEffect />
      
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Join Our Team
          </h1>
          <p className="text-white/70 text-center mb-12">
            Explore opportunities to work with cutting-edge technologies and innovative projects
          </p>

          {/* Job Positions */}
          <div className="grid md:grid-cols-1 gap-6 mb-16">
            {jobPositions.map((position) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                <p className="text-white/70 mb-4">{position.description}</p>
                <button
                  onClick={() => {
                    setSelectedRole(position.title);
                    setFormData({ ...formData, role: position.title });
                    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Apply Now →
                </button>
              </motion.div>
            ))}
          </div>

          {/* Application Form */}
          <div id="application-form" className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-400 mt-1 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-white mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.phone ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-400 mt-1 text-sm">{errors.phone}</p>}
                <p className="text-white/50 text-sm mt-1">Enter a valid 10-digit Indian mobile number</p>
              </div>

              <div>
                <label htmlFor="role" className="block text-white mb-2">Role *</label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.role ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                >
                  <option value="">Select a role</option>
                  {jobPositions.map((job, index) => (
                    <option key={index} value={job.title}>{job.title}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-400 mt-1 text-sm">{errors.role}</p>}
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-white mb-2">LinkedIn Profile URL *</label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  required
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.linkedinUrl ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
                {errors.linkedinUrl && <p className="text-red-400 mt-1 text-sm">{errors.linkedinUrl}</p>}
              </div>

              <div>
                <label htmlFor="resumeUrl" className="block text-white mb-2">Resume Google Drive URL *</label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="resumeUrl"
                  required
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.resumeUrl ? 'border-red-400' : 'border-white/20'} text-white focus:outline-none focus:border-white/40 transition-all`}
                  placeholder="https://drive.google.com/file/... or https://docs.google.com/..."
                />
                {errors.resumeUrl && <p className="text-red-400 mt-1 text-sm">{errors.resumeUrl}</p>}
                <p className="text-white/50 text-sm mt-1">Upload your resume to Google Drive, click Share, select "Anyone with the link", and paste the link here</p>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-black text-white font-semibold rounded-lg border border-white/20 hover:bg-white/10 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
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
      </AnimatePresence>

      <Footer />
    </div>
  );
}
