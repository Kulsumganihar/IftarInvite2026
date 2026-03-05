// Google Apps Script - RSVP Handler
// This script receives RSVP data and writes it to Google Sheets

// ⚠️ IMPORTANT: Replace with your actual Sheet ID and tab name
const SHEET_ID = '1lpAk7Lw42btwgFMN-BcyGLu6F6DrULbHHww1cyr1ONk';
const SHEET_NAME = 'Sheet1'; // tab name in the spreadsheet

// doPost to accept JSON or form-encoded and append a row in the sheet
function doPost(e) {
  try {
    // Log the raw event for debugging (view via Executions/Logs)
    Logger.log('doPost raw event: %s', JSON.stringify(e));

    // Parse JSON body or fallback to form-encoded params
    var body = {};
    if (e.postData && e.postData.type === 'application/json') {
      body = JSON.parse(e.postData.contents || '{}');
    } else if (e.parameter) {
      // e.parameter contains query/form params
      body = e.parameter;
    }

    // Log the parsed body for debugging
    Logger.log('Parsed body: %s', JSON.stringify(body));

    // Open spreadsheet and sheet
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Header must match the order of appended columns below
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Contact',
        'Attending',
        'Notes',
        'Allergens',
        'Drink',
        'Starter',
        'Main',
        'Dessert'
      ]);
    }

    // Normalize starters (array or string)
    var startersText = Array.isArray(body.starters)
      ? body.starters.join(', ')
      : (body.starters || '');

    // Normalize allergens (accept array or string, and support legacy key)
    var allergensText = Array.isArray(body.allergens)
      ? body.allergens.join(', ')
      : (body.allergens || body.allergensOrPreferences || '');

    // Build row in the same order as the header above
    // Map contact/email and message/notes for compatibility
    var row = [
      new Date(),
      body.name || '',
      body.contact || body.email || '',
      body.attending || '',
      body.message || body.notes || '',
      allergensText,
      body.drink || '',
      startersText,
      body.main || '',
      body.dessert || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', received: body }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log('doPost error: %s', err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: small GET handler to verify deployment URL
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
