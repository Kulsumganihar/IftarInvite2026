import React, { useState, useEffect } from 'react';

const backgroundMusic = new Audio("/assets/sounds/emotional-arabian-oud.mp3");
backgroundMusic.loop = true;   // keeps playing
backgroundMusic.volume = 0.4;  // softer background sound

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
    setTimeout(() => {
      playBackgroundMusic();
    }, 300);
    setTimeout(() => {
      onEnter();
    }, 700);
  };  

  const handleClick = () => {
    triggerReveal();
  };

  const playBackgroundMusic = () => {
  backgroundMusic.volume = 0;

  backgroundMusic.play();

  let vol = 0;

  const fade = setInterval(() => {
    if (vol < 0.4) {
      vol += 0.02;
      backgroundMusic.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);  
  };

  const playBellChime = () => {
    try {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play();
    } catch (e) {
      console.log("Audio playback failed");
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
