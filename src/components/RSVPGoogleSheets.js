import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ⚠️ IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

const foodOptions = [
  { id: 'biryani', label: 'Biryani', emoji: '🍚' },
  { id: 'haleem', label: 'Haleem', emoji: '🍲' },
  { id: 'fruitChaat', label: 'Fruit Chaat', emoji: '🍇' },
  { id: 'dessert', label: 'Dessert', emoji: '🍰' },
  { id: 'sharbat', label: 'Sharbat', emoji: '🥤' },
];

const attendanceOptions = [
  { value: 'Yes', label: "Yes, I'll be there!", emoji: '🎉' },
  { value: 'Maybe', label: "Maybe, I'll try", emoji: '🤞' },
  { value: 'No', label: "Sorry, can't make it", emoji: '😢' },
];

export default function RSVPGoogleSheets() {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    biryani: false,
    haleem: false,
    fruitChaat: false,
    dessert: false,
    sharbat: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    setError('');
  };

  const handleAttendingChange = (value) => {
    setFormData(prev => ({ ...prev, attending: value }));
    setError('');
  };

  const handleFoodChange = (id) => {
    setFormData(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.attending) {
      setError('Please select your attendance status');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Since no-cors doesn't give us response data, we assume success
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          attending: '',
          biryani: false,
          haleem: false,
          fruitChaat: false,
          dessert: false,
          sharbat: false,
        });
      }, 5000);

    } catch (err) {
      console.error('RSVP submission error:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-12 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#0a1628] opacity-90" />
      
      {/* Decorative border */}
      <div className="absolute inset-4 border border-[#d4af37]/30 rounded-2xl pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative max-w-lg mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="text-4xl">🌙</span>
          </motion.div>
          <h2 className="text-3xl font-serif text-[#d4af37] mb-2">
            RSVP
          </h2>
          <p className="text-[#c9b896] text-sm tracking-wider">
            Will you join us for Iftar?
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Success Message */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.6 }}
                className="text-6xl mb-6"
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-serif text-[#d4af37] mb-3">
                You're on the guest list!
              </h3>
              <p className="text-[#c9b896]">
                See you at Iftar, InshaAllah 🌙
              </p>
            </motion.div>
          ) : (
            /* RSVP Form */
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-[#d4af37] text-sm font-medium tracking-wide">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: '#d4af37' }}
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-[#0a1628]/80 border border-[#d4af37]/30 rounded-lg 
                           text-white placeholder-[#6b7280] focus:outline-none focus:border-[#d4af37]
                           transition-all duration-300"
                />
              </div>

              {/* Attendance Options */}
              <div className="space-y-3">
                <label className="block text-[#d4af37] text-sm font-medium tracking-wide">
                  Will you attend?
                </label>
                <div className="grid gap-3">
                  {attendanceOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAttendingChange(option.value)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300
                        ${formData.attending === option.value
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                          : 'bg-[#0a1628]/50 border-[#d4af37]/20 text-[#c9b896] hover:border-[#d4af37]/50'
                        }`}
                    >
                      <span className="text-xl">{option.emoji}</span>
                      <span className="flex-1 text-left">{option.label}</span>
                      {formData.attending === option.value && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-[#d4af37]"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Food Options */}
              <div className="space-y-3">
                <label className="block text-[#d4af37] text-sm font-medium tracking-wide">
                  What would you like to enjoy?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {foodOptions.map((food) => (
                    <motion.button
                      key={food.id}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleFoodChange(food.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300
                        ${formData[food.id]
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                          : 'bg-[#0a1628]/50 border-[#d4af37]/20 text-[#c9b896] hover:border-[#d4af37]/50'
                        }`}
                    >
                      <span className="text-lg">{food.emoji}</span>
                      <span className="text-sm">{food.label}</span>
                      {formData[food.id] && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-[#d4af37]"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm text-center bg-red-400/10 py-2 px-4 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-medium tracking-wide transition-all duration-300
                  ${isSubmitting
                    ? 'bg-[#d4af37]/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#d4af37] to-[#f5d76e] hover:from-[#c9a030] hover:to-[#d4af37]'
                  } text-[#0a1628]`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⏳
                    </motion.span>
                    Submitting...
                  </span>
                ) : (
                  'Confirm RSVP ✨'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Decorative footer */}
        <div className="flex justify-center mt-8 gap-2 text-[#d4af37]/40">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </motion.div>
    </section>
  );
}
