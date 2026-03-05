import React from 'react';

function GuestCounter({ count }) {
  return (
    <section className="guest-counter">
      <h3>Friends joining so far</h3>
      <div className="guest-count-display">
        <span className="guest-number">{count}</span>
        <span className="guest-label">Guests confirmed</span>
      </div>
    </section>
  );
}

export default GuestCounter;
