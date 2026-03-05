# Iftar Invitation

React-based RSVP invitation page with form validation and RSVP tracking.

## How to use

1. Install dependencies:
```bash
cd /Users/kganihar/Desktop/IftarInvitation
npm install
```

2. Start the React app:
```bash
npm start
```

This will open the invitation page at `http://localhost:3000` in your browser.

3. Fill out selections: Drinks (1), Starters (exactly 2), Main (1), Dessert (1).
4. Enter your RSVP details (optional name/contact, attendance, guest count).
5. Click "Submit RSVP & Choices" to see the summary.
6. Copy the summary text and share via WhatsApp, email, or messenger.

## RSVP Tracking (Optional)

If you want to collect RSVPs to a CSV file, run the backend server in a separate terminal:

```bash
node server.js
```

The server listens on port 3000 (different from React's dev server). You'll need to adjust this if you want both running simultaneously.

**Download responses:**
- CSV: http://localhost:3000/responses.csv
- JSON: http://localhost:3000/responses

## Project Structure

```
src/
  App.js              # Main React component
  App.css             # Styles for the app
  index.js            # React entry point
  components/
    MenuSection.js    # Menu category component
    RSVPForm.js       # RSVP details form
    ResultSummary.js  # Summary display & copy
public/
  index.html          # HTML entry point
server.js             # Express backend (optional)
package.json          # Dependencies
```

## Features

- ✅ Form validation (exact counts for selections)
- ✅ RSVP tracking with optional server
- ✅ Copy summary text to clipboard
- ✅ Responsive design
- ✅ Elegant typography (Great Vibes + Montserrat)

## Next Steps

- Deploy React app to Vercel, Netlify, or similar
- Host backend on Railway, Render, or similar for remote RSVPs
- Add email notifications
- Add RSVP deadline countdown



Notes and next steps
- I can make the page printable, add RSVP tracking, or add an email/send-to-WhatsApp button if you'd like.
