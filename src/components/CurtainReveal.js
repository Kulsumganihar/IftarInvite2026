import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurtainReveal({ isVisible, onAnimationComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play();
      
      // Start fade out after video plays
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 2500);
      
      // Complete the animation
      const completeTimer = setTimeout(() => {
        onAnimationComplete?.();
      }, 4500);
      
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: fadeOut ? 2 : 1.5,
            ease: "easeInOut"
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 100,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/assets/iftar/curtain.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
