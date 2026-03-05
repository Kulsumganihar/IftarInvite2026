import React, { useState, useEffect } from 'react';

function LanternIntro({ onEnter }) {
  const [isClicked, setIsClicked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down and lantern hasn't been clicked yet, trigger the reveal
      if (window.scrollY > 50 && !isClicked) {
        triggerReveal();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked]);

  const triggerReveal = () => {
    setIsClicked(true);
    playBellChime();
    // Trigger curtain early - while lantern is still fading out
    // This creates an overlap for smooth transition
    setTimeout(onEnter, 500);
  };

  const handleClick = () => {
    triggerReveal();
  };

  const playBellChime = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create a bell chime sound effect
      // First note - higher pitch
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      
      osc1.frequency.setValueAtTime(800, now);
      osc1.frequency.exponentialRampToValueAtTime(600, now + 0.6);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc1.type = 'sine';
      osc1.start(now);
      osc1.stop(now + 0.6);
      
      // Second note - lower pitch (delayed)
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      
      osc2.frequency.setValueAtTime(500, now + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(350, now + 0.8);
      gain2.gain.setValueAtTime(0.25, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      osc2.type = 'sine';
      osc2.start(now + 0.1);
      osc2.stop(now + 0.8);
    } catch (e) {
      console.log('Sound effect unavailable');
    }
  };

  return (
    <div className={`lantern-container ${isClicked ? 'reveal' : ''}`}>
      <div className="lantern-wrapper">
        {/* Ambient glow */}
        <div className={`lantern-glow ${isClicked ? 'fade' : ''}`} />

        <div 
          className={`lantern-image-wrapper ${isClicked ? 'explode' : ''}`}
          onClick={handleClick}
        >
          <img 
            src="/assets/iftar/lantern.png"
            alt="Lantern"
            className="lantern-image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        </div>
        
        <div className={`lantern-text ${isClicked ? 'fade-out' : 'fade-in'}`}>
          <p className="lantern-cta">Tap the lantern</p>
        </div>

        <div className={`stars-background ${isClicked ? 'show-stars' : ''}`}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanternIntro;
