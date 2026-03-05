# Google Sheets RSVP Backend Setup

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it: `Iftar RSVP 2026`
3. In Row 1, add these column headers:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Contact | Attending | Notes | Drink | Starters | Main | Dessert |

4. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```

---

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **New Project**
3. Name it: `Iftar RSVP Handler`
4. Delete all existing code and paste:

```javascript
// Google Apps Script - RSVP Handler
// This script receives RSVP data and writes it to Google Sheets

// ⚠️ IMPORTANT: Replace with your actual Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // Or your sheet tab name

function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Create timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York', // Change to your timezone
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    
    // Format starters array as comma-separated string
    const startersText = Array.isArray(data.starters) 
      ? data.starters.join(', ') 
      : data.starters || '';
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.name || '',
      data.contact || '',
      data.attending || '',
      data.notes || '',
      data.drink || '',
      startersText,
      data.main || '',
      data.dessert || ''
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'RSVP saved successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'active',
      message: 'RSVP endpoint is running' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this to verify sheet connection
function testConnection() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  Logger.log('Connected to sheet: ' + sheet.getName());
  Logger.log('Current row count: ' + sheet.getLastRow());
}
```

5. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID

---

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Configure:
   - **Description:** `RSVP Handler v1`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. Click **Authorize access** → Choose your Google account → Allow
6. Copy the **Web app URL** (looks like):
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 4: Update React Component

Open `/src/components/RSVPGoogleSheets.js` and update line 5:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

---

## Step 5: Test the Integration

1. Run your React app: `npm start`
2. Fill out the RSVP form and submit
3. Check your Google Sheet - new row should appear!

---

## Troubleshooting

### CORS Issues
The component uses `mode: 'no-cors'` which is required for Google Apps Script. This means we can't read the response, but the data still gets saved.

### Data Not Appearing
1. Check the Apps Script execution log: **View → Executions**
2. Verify the Sheet ID is correct
3. Ensure the Web App is deployed with "Anyone" access

### Redeploying After Changes
If you modify the Apps Script code:
1. Click **Deploy** → **Manage deployments**
2. Click the pencil icon ✏️ on your deployment
3. Change version to **New version**
4. Click **Deploy**

---

## Google Sheet Example

Your sheet will look like this after RSVPs come in:

| Timestamp | Name | Attending | Biryani | Haleem | Fruit Chaat | Dessert | Sharbat |
|-----------|------|-----------|---------|--------|-------------|---------|---------|
| Mar 5, 2026, 3:30 PM | Aisha Khan | Yes | Yes | No | Yes | Yes | No |
| Mar 5, 2026, 4:15 PM | Omar Ali | Yes | Yes | Yes | No | Yes | Yes |
| Mar 5, 2026, 5:00 PM | Sara Ahmed | Maybe | No | Yes | Yes | No | Yes |

---

## Security Notes

- The Web App URL is public but only accepts POST data in a specific format
- Consider adding a secret token for additional security
- You can restrict access to specific email domains if needed

---

## Email Notifications (Optional)

Add this to your Apps Script to receive email notifications:

```javascript
function sendEmailNotification(data) {
  const recipient = 'your-email@example.com';
  const subject = '🌙 New Iftar RSVP: ' + data.name;
  
  const foods = [];
  if (data.biryani) foods.push('Biryani');
  if (data.haleem) foods.push('Haleem');
  if (data.fruitChaat) foods.push('Fruit Chaat');
  if (data.dessert) foods.push('Dessert');
  if (data.sharbat) foods.push('Sharbat');
  
  const body = `
New RSVP Received!

Name: ${data.name}
Attending: ${data.attending}
Food Choices: ${foods.join(', ') || 'None selected'}

Timestamp: ${new Date().toLocaleString()}
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
```

Then call `sendEmailNotification(data);` inside `doPost()` after saving to sheet.
