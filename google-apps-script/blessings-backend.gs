/**
 * Wedding blessings — private inbox (Google Sheet)
 *
 * 1. Create a new Google Sheet
 * 2. Extensions → Apps Script → paste this file
 * 3. Set ADMIN_KEY below (same as adminKey in blessings-config.js)
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into blessings-config.js → endpoint
 */

const ADMIN_KEY = 'change-me'; // must match adminKey in site-url.js (or site-url.local.js)
const SHEET_NAME = 'Blessings';

function blessingsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Message']);
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
  }
  return sheet;
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const name = String(body.name || '').trim();
    const message = String(body.message || '').trim();
    if (!name || !message) {
      return json_({ ok: false, error: 'Name and message required' });
    }
    blessingsSheet_().appendRow([new Date(), name, message]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const key = (e.parameter.key || '').trim();
  if (key !== ADMIN_KEY) {
    return json_({ ok: false, error: 'Unauthorized' });
  }
  const sheet = blessingsSheet_();
  const rows = sheet.getDataRange().getValues();
  rows.shift();
  const blessings = rows
    .map(function (row) {
      return {
        timestamp: row[0] ? new Date(row[0]).toISOString() : '',
        name: row[1],
        message: row[2]
      };
    })
    .reverse();
  return json_({ ok: true, blessings: blessings });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
