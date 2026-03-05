import React from 'react';

function RSVPForm({ formData, onAttendingChange, onInputChange, onSubmit }) {
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
              onChange={onAttendingChange}
            />
            <span className="option-text">Of course I'll be there! 🎉</span>
          </label>
          <label className="attendance-option">
            <input
              type="radio"
              name="attending"
              value="Maybe"
              checked={formData.attending === 'Maybe'}
              onChange={onAttendingChange}
            />
            <span className="option-text">I'll try my best 🤞</span>
          </label>
          <label className="attendance-option">
            <input
              type="radio"
              name="attending"
              value="No"
              checked={formData.attending === 'No'}
              onChange={onAttendingChange}
            />
            <span className="option-text">Sadly can't make it 😢</span>
          </label>
        </div>
      </div>

      <div className="input-row">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Shah Rukh Khan"
          value={formData.name}
          onChange={onInputChange}
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
          onChange={onInputChange}
        />
      </div>

      <div className="input-row">
        <label htmlFor="notes">Leave a message for the host</label>
        <input
          type="text"
          id="notes"
          placeholder="e.g. Can't wait for the biryani! or Bringing dessert!"
          value={formData.notes}
          onChange={onInputChange}
        />
      </div>

      <div className="input-row">
        <label htmlFor="dietaryRestrictions">Dietary restrictions (if any)</label>
        <input
          type="text"
          id="dietaryRestrictions"
          placeholder="e.g. Vegetarian, Vegan, Gluten-free, etc."
          value={formData.dietaryRestrictions}
          onChange={onInputChange}
        />
      </div>

      <div className="actions">
        <button type="submit" onClick={onSubmit}>Submit RSVP & Choices</button>
      </div>
    </section>
  );
}

export default RSVPForm;
