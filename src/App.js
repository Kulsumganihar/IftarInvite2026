import React, { useState } from 'react';
import './App.css';
import IftarBackground from './components/IftarBackground';
import MenuSection from './components/MenuSection';
import LanternIntro from './components/LanternIntro';
import GlitterCanvas from './components/GlitterCanvas';
import CurtainReveal from './components/CurtainReveal';
import CrescentMoon from './components/CrescentMoon';
import CountdownTimerEnhanced from './components/CountdownTimerEnhanced';
import RSVPGoogleSheets from './components/RSVPGoogleSheets';

function App() {
  const [showInvite, setShowInvite] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [formData, setFormData] = useState({
    drink: '',
    starters: [],
    main: '',
    dessert: '',
  });

  const handleDrinkChange = (e) => {
    setFormData(prev => ({ ...prev, drink: e.target.value }));
  };

  const handleStarterChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const starters = checked
        ? [...prev.starters, value]
        : prev.starters.filter(s => s !== value);
      
      if (starters.length > 2) {
        alert('Please select exactly 2 starters total.');
        return prev;
      }
      return { ...prev, starters };
    });
  };

  const handleMainChange = (e) => {
    setFormData(prev => ({ ...prev, main: e.target.value }));
  };

  const handleDessertChange = (e) => {
    setFormData(prev => ({ ...prev, dessert: e.target.value }));
  };

  return (
    <IftarBackground>
      <GlitterCanvas />
      
      {/* Curtain appears on top of everything during transition */}
      <CurtainReveal isVisible={showCurtain} onAnimationComplete={() => setShowCurtain(false)} />
      
      {!showInvite ? (
        <div className="lantern-screen">
          <LanternIntro 
            onEnter={() => {
              setShowCurtain(true);
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
            <div className="ornament-line">
              <span className="ornament-dot" />
              <span className="ornament-stars">✦ ☽ ✦</span>
              <span className="ornament-dot" />
            </div>

            <p className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم</p>

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
              <p>11 March 2026</p>
            </div>
            <div className="detail-item">
              <h3>🕌 Time</h3>
              <p>5:30 PM onwards (Iftar at sunset)</p>
            </div>
            <div className="detail-item">
              <h3>👗 Dress</h3>
              <p>Bring out your favourite traditional fits and let's turn this Iftar into a proper festive Ramzan evening.</p>
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

          {/* Menu Sections */}
          <MenuSection 
            title="Beverages"
            instruction="Select one"
            type="radio"
            options={[
              'Mohabbat ka sharbat',
              'Spicy Mango Kulki',
              'Lemonade'
            ]}
            value={formData.drink}
            onChange={handleDrinkChange}
            fieldName="drink"
          />

          <MenuSection 
            title="Appetizers & Starters"
            instruction="Select exactly 2 items (mix and match)"
            type="checkbox"
            groups={{
              'Non-Vegetarian': [
                'Chicken Samosa',
                'Chicken Kebab',
                'Egg Chilli',
                'Mint Chicken',
                'Mutton Special'
              ],
              'Vegetarian': [
                'Aalu samosa',
                'Onion Samosa',
                'Paneer Chilli',
                'Hara Bhara Kebab'
              ]
            }}
            values={formData.starters}
            onChange={handleStarterChange}
            fieldName="starter"
          />

          <MenuSection 
            title="Main Courses"
            instruction="Select one"
            type="radio"
            groups={{
              'Non-Vegetarian': [
                'Chicken Biryani',
                'Ghee rice + Chicken curry'
              ],
              'Vegetarian': [
                'Veg Pulao',
                'Ghee Rice + Veg curry'
              ]
            }}
            value={formData.main}
            onChange={handleMainChange}
            fieldName="main"
          />

          <MenuSection 
            title="Sweet Finales"
            instruction="Select one"
            type="radio"
            options={[
              'Sher khurma',
              'Gulab jamun'
            ]}
            value={formData.dessert}
            onChange={handleDessertChange}
            fieldName="dessert"
          />

          {/* RSVP Form with Google Sheets Integration */}
          <RSVPGoogleSheets 
            menuSelections={{
              drink: formData.drink,
              starters: formData.starters,
              main: formData.main,
              dessert: formData.dessert
            }}
          />

          </div>
        </div>
        </>
      )}
    </IftarBackground>
  );
}

export default App;
