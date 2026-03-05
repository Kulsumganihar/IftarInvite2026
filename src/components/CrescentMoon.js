import React, { useState } from 'react';

export default function CrescentMoon() {
  const [clicks, setClicks] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleMoonClick = () => {
    // Create sparkles
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2,
      distance: 80 + Math.random() * 40
    }));
    setSparkles(newSparkles);
    
    // Clear sparkles after animation
    setTimeout(() => setSparkles([]), 800);

    // Check for easter egg
    const newClickCount = clicks + 1;
    setClicks(newClickCount);
    
    if (newClickCount === 3) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setClicks(0);
      }, 3000);
    }
  };

  return (
    <div className="crescent-moon-container">
      {/* Crescent Moon */}
      <div 
        className="crescent-moon"
        onClick={handleMoonClick}
        role="button"
        tabIndex={0}
        aria-label="Interactive crescent moon"
      >
        ☽
      </div>

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            '--angle': `${sparkle.angle}rad`,
            '--distance': `${sparkle.distance}px`
          }}
        >
          ✨
        </div>
      ))}

      {/* Easter Egg Message */}
      {showMessage && (
        <div className="easter-egg-message">
          Ramzan evenings are better with friends like you.
        </div>
      )}

      <style jsx>{`
        .crescent-moon-container {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 20;
        }

        .crescent-moon {
          font-size: 48px;
          cursor: pointer;
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
          animation: moon-glow 3s ease-in-out infinite;
        }

        .crescent-moon:hover {
          font-size: 56px;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.8));
        }

        .crescent-moon:active {
          transform: scale(0.95);
        }

        @keyframes moon-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.8));
          }
        }

        .sparkle {
          position: fixed;
          top: 78px;
          right: 78px;
          font-size: 20px;
          pointer-events: none;
          animation: sparkle-float 0.8s ease-out forwards;
        }

        @keyframes sparkle-float {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(cos(var(--angle)) * var(--distance)),
              calc(sin(var(--angle)) * var(--distance))
            ) scale(0);
          }
        }

        .easter-egg-message {
          position: fixed;
          top: 120px;
          right: 30px;
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid #d4af37;
          border-radius: 12px;
          padding: 16px 20px;
          color: #ffd700;
          font-size: 14px;
          font-weight: 500;
          max-width: 250px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: message-fade 3s ease-in-out forwards;
          z-index: 25;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 0.5px;
        }

        @keyframes message-fade {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          .crescent-moon-container {
            top: 20px;
            right: 20px;
          }

          .crescent-moon {
            font-size: 40px;
          }

          .crescent-moon:hover {
            font-size: 48px;
          }

          .easter-egg-message {
            top: 100px;
            right: 20px;
            max-width: 200px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
