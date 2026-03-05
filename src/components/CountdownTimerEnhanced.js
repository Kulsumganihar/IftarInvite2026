import React, { useState, useEffect } from 'react';

export default function CountdownTimerEnhanced() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const iftarDate = new Date('2026-03-11T17:30:00').getTime();
      const now = new Date().getTime();
      const difference = iftarDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-enhanced">
      <style jsx>{`
        .countdown-enhanced {
          margin: 60px 0;
          text-align: center;
          position: relative;
        }

        .countdown-header {
          color: #d4af37;
          font-size: 20px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .lantern-icon {
          font-size: 28px;
          filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
          animation: lantern-glow 2.5s ease-in-out infinite;
        }

        @keyframes lantern-glow {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 24px rgba(212, 175, 55, 1));
            transform: scale(1.08);
          }
        }

        .countdown-container {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 24px;
          flex-wrap: wrap;
          padding: 32px 20px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(255, 215, 0, 0.04));
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 80px;
        }

        .countdown-value {
          font-size: 42px;
          font-weight: 700;
          color: #ffd700;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          min-width: 80px;
          text-align: center;
          line-height: 1;
        }

        .countdown-unit {
          font-size: 12px;
          color: rgba(212, 175, 55, 0.8);
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .countdown-separator {
          color: #d4af37;
          font-size: 28px;
          font-weight: 700;
          align-self: center;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .countdown-value {
            font-size: 32px;
          }

          .countdown-item {
            min-width: 70px;
          }

          .countdown-unit {
            font-size: 11px;
          }

          .countdown-header {
            font-size: 16px;
          }

          .lantern-icon {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="countdown-header">
        <span>Iftar Begins In</span>
        <span className="lantern-icon">🪔</span>
      </div>

      <div className="countdown-container">
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.days}</div>
          <div className="countdown-unit">Days</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-unit">Hours</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-unit">Minutes</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-unit">Seconds</div>
        </div>
      </div>
    </div>
  );
}
