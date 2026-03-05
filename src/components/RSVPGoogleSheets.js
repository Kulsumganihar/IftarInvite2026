import React, { useState } from 'react';

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxTEqQ82lB9qVaMLYeFrXQLAcwuBe3pqs9txqEAcww42r5baUYIwGZNzMTs1HKGO53jAg/exec';

export default function RSVPGoogleSheets({ menuSelections = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    attending: '',
    notes: '',
    allergensOrPreferences: '', // new field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // ADD THIS HERE
  const isMenuValid =
    menuSelections.drink &&
    menuSelections.starters?.length === 2 &&
    menuSelections.main &&
    menuSelections.dessert;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError('');
  };

  const handleAttendingChange = (e) => {
    setFormData(prev => ({ ...prev, attending: e.target.value }));
    setError('');
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

    // Validate menu selections
    if (!menuSelections.drink) {
      setError('Please select a beverage from the menu above');
      return;
    }
    if (!menuSelections.starters || menuSelections.starters.length !== 2) {
      setError('Please select exactly 2 starters from the menu above');
      return;
    }
    if (!menuSelections.main) {
      setError('Please select a main course from the menu above');
      return;
    }
    if (!menuSelections.dessert) {
      setError('Please select a dessert from the menu above');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine form data with menu selections
      const payload = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        // Apps Script expects `email` and `message` keys (Code.gs), map our fields to those names
        email: formData.contact,
        attending: formData.attending,
        message: formData.notes,
        guests: '',
        drink: menuSelections.drink,
        // Keep starters as an array (Apps Script will accept array or string)
        starters: Array.isArray(menuSelections.starters) ? menuSelections.starters : (menuSelections.starters ? [menuSelections.starters] : []),
        main: menuSelections.main,
        dessert: menuSelections.dessert,
        allergensOrPreferences: formData.allergensOrPreferences, // include new field
      };

      // Debug: log payload to console
      console.log('RSVP Payload:', JSON.stringify(payload, null, 2));

      // Send as form-encoded to avoid CORS preflight. Apps Script's `doPost`
      // handles form-encoded params via `e.parameter` (see Code.gs). Using
      // `application/x-www-form-urlencoded` keeps the request as a "simple"
      // request so the browser won't send an OPTIONS preflight and CORS will
      // not block the call when the web app is publicly deployed.
      const formBody = new URLSearchParams();
      formBody.append('timestamp', payload.timestamp);
      formBody.append('name', payload.name);
      formBody.append('email', payload.email || '');
      formBody.append('attending', payload.attending || '');
      formBody.append('message', payload.message || '');
      formBody.append('guests', payload.guests || '');
      formBody.append('drink', payload.drink || '');
      // Join starters into a single string for form submission
      formBody.append('starters', Array.isArray(payload.starters) ? payload.starters.join(', ') : (payload.starters || ''));
      formBody.append('main', payload.main || '');
      formBody.append('dessert', payload.dessert || '');
      formBody.append('allergensOrPreferences', payload.allergensOrPreferences || '');

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody.toString(),
      });

      setIsSubmitted(true);

    } catch (err) {
      console.error('RSVP submission error:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* eslint-disable-next-line no-unused-vars */
  const handleReset = () => {
    setFormData({
      name: '',
      contact: '',
      attending: '',
      notes: '',
      allergensOrPreferences: '', // reset new field
    });
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <section className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✨</div>
        <h2 style={{ color: '#d4af37', marginBottom: '16px' }}>You're on the guest list!</h2>
        <p style={{ color: '#c9b896', marginBottom: '8px' }}>See you at Iftar, InshaAllah 🌙</p>
        
        <div style={{ 
          background: 'rgba(212, 175, 55, 0.1)', 
          borderRadius: '12px', 
          padding: '20px', 
          marginTop: '24px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '12px', fontSize: '16px' }}>Your Selections:</h3>
          <p style={{ color: '#c9b896', fontSize: '14px', margin: '8px 0' }}>
            <strong>🥤 Drink:</strong> {menuSelections.drink}
          </p>
          <p style={{ color: '#c9b896', fontSize: '14px', margin: '8px 0' }}>
            <strong>🍟 Starters:</strong> {menuSelections.starters?.join(', ')}
          </p>
          <p style={{ color: '#c9b896', fontSize: '14px', margin: '8px 0' }}>
            <strong>🍲 Main:</strong> {menuSelections.main}
          </p>
          <p style={{ color: '#c9b896', fontSize: '14px', margin: '8px 0' }}>
            <strong>🍰 Dessert:</strong> {menuSelections.dessert}
          </p>
        </div>

      </section>
    );
  }

  return (
    <section className="card">
      <h2>Will you join us for Iftar?</h2>

      <div style={{ marginBottom: '16px' }}>
        <div className="options-grid">
          <label className="attendance-option">
            <input
              type="radio"
              name="attending"
              value="Yes"
              checked={formData.attending === 'Yes'}
              onChange={handleAttendingChange}
            />
            <span className="option-text">Of course I'll be there! 🎉</span>
          </label>
          <label className="attendance-option">
            <input
              type="radio"
              name="attending"
              value="Maybe"
              checked={formData.attending === 'Maybe'}
              onChange={handleAttendingChange}
            />
            <span className="option-text">I'll try my best 🤞</span>
          </label>
          <label className="attendance-option">
            <input
              type="radio"
              name="attending"
              value="No"
              checked={formData.attending === 'No'}
              onChange={handleAttendingChange}
            />
            <span className="option-text">Sadly can't make it 😢</span>
          </label>
        </div>
      </div>

      <div className="input-row">
        <label htmlFor="name">Your name *</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Shah Rukh Khan"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-row">
        <label htmlFor="contact">Contact (phone or email, optional)</label>
        <input
          type="text"
          id="contact"
          placeholder="e.g. +1-555-0123 or email@domain.com"
          value={formData.contact}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-row">
        <label htmlFor="notes">Leave a message for the host</label>
        <input
          type="text"
          id="notes"
          placeholder="e.g. Can't wait for the biryani!"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-row">
        <label htmlFor="allergensOrPreferences">Allergens / Preferences</label>
        <input
          type="text"
          id="allergensOrPreferences"
          placeholder="e.g. Vegetarian, nut allergy, no dairy, etc."
          value={formData.allergensOrPreferences}
          onChange={handleInputChange}
        />
      </div>

      {error && (
        <div style={{
          color: '#f87171',
          fontSize: '14px',
          textAlign: 'center',
          backgroundColor: 'rgba(248, 113, 113, 0.1)',
          padding: '10px 16px',
          borderRadius: '8px',
          marginBottom: '16px',
        }}>
          {error}
        </div>
      )}

      <div className="actions">
        <button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isSubmitting  || !isMenuValid}
          style={{
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? '⏳ Submitting...' : 'Submit RSVP & Choices ✨'}
        </button>
      </div>
    </section>
  );
}
