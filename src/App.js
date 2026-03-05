import React, { useState } from 'react';
import './App.css';
import IftarBackground from './components/IftarBackground';
import LanternIntro from './components/LanternIntro';
import GlitterCanvas from './components/GlitterCanvas';
import CurtainReveal from './components/CurtainReveal';
import CrescentMoon from './components/CrescentMoon';
import CountdownTimerEnhanced from './components/CountdownTimerEnhanced';
import RSVPGoogleSheets from './components/RSVPGoogleSheets';

function App() {
  const [showInvite, setShowInvite] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);

  return (
    <IftarBackground>
      <GlitterCanvas />
      
      {/* Curtain appears on top of everything during transition */}
      <CurtainReveal isVisible={showCurtain} onAnimationComplete={() => setShowCurtain(false)} />
      
      {!showInvite ? (
        <div className="lantern-screen">
          <LanternIntro 
            onEnter={() => {
              // Start curtain immediately when lantern is clicked
              setShowCurtain(true);
              // Delay showing invite to let curtain cover the transition
              setTimeout(() => {
                setShowInvite(true);
              }, 1000);
            }}
          />
        </div>
      ) : (
        <>
          <CrescentMoon />
          <div className="scrollable-page fade-in-content">
          <section className="intro-section">
            {/* Ornament line */}
            <div className="ornament-line">
              <span className="ornament-dot" />
              <span className="ornament-stars">✦ ☽ ✦</span>
              <span className="ornament-dot" />
            </div>

            {/* Arabic Bismillah */}
            <p className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم</p>

            {/* Main invitation text */}
            <div className="intro-text">
              <p className="prelude">with great joy & warm hearts</p>
              <h1 className="main-line">YOU ARE</h1>
              <h1 className="main-line-accent">INVITED</h1>
              <p className="sub-line">To A Grand Iftar Party</p>
              <p className="accent-line">RAMADAN MUBARAK ☽</p>
              <p className="scroll-hint">SCROLL TO OPEN YOUR INVITATION</p>
            </div>
          </section>

          <div className="container">

          <section className="event-details">
            <div className="detail-item">
              <h3>📅 Date</h3>
              <p>15 March 2026</p>
            </div>
            <div className="detail-item">
              <h3>🕌 Time</h3>
              <p>6:25 PM onwards (Iftar at sunset)</p>
            </div>
            <div className="detail-item">
              <h3>📍 Venue</h3>
              <a 
                href="https://www.google.com/maps/search/Flat+BG54+Wing+11+Phase-I+Innovative+Oak+garden+Bhoganahalli+Road+Panathur+Bengaluru+560103"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-link"
                style={{ cursor: 'pointer' }}
              >
                <p>Flat No – BG54, Wing – 11, Phase-I<br />Innovative Oak garden<br />Bhoganahalli Road, Panathur<br />Bengaluru, Karnataka - 560103</p>
              </a>
            </div>
          </section>

          <section className="invitation-note">
            <p>
              As the sun sets and our fast breaks, we gather together to celebrate the spirit of Ramadan. 
              This evening is about sharing warmth, joy, and delicious moments with those we cherish. 
              We would be honored to have you at our table. Please let us know your presence and select your favorite dishes below.
            </p>
          </section>

          {/* Enhanced Countdown Timer */}
          <CountdownTimerEnhanced />

          {/* RSVP Form with Google Sheets Integration */}
          <RSVPGoogleSheets />

          </div>
        </div>
        </>
      )}
    </IftarBackground>
  );
}

export default App;
