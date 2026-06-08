# Private blessings inbox (owner only)

Guest blessings are **not shown on the public wall**. They are saved to a **Google Sheet** only you can read.

Config lives in **`site-url.js`** (or **`site-url.local.js`** on a public repo — see below).

## One-time setup (~10 minutes)

### 1. Google Sheet + Apps Script

1. Open [Google Sheets](https://sheets.google.com) → create a blank spreadsheet (e.g. “Wedding Blessings”).
2. **Extensions → Apps Script**
3. Delete any default code and paste everything from `google-apps-script/blessings-backend.gs`
4. Set `ADMIN_KEY` at the top of the script (pick a long secret only you know)
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the **Web App URL** (ends with `/exec`)

### 2. Site config

Edit **`site-url.js`** (or create **`site-url.local.js`** from `site-url.local.js.example`):

```javascript
window.BLESSINGS_CONFIG = {
    endpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    adminKey: 'same-as-ADMIN_KEY-in-script'
};
```

**Public GitHub repo?** Do not commit your real `adminKey`. Use:

```bash
cp site-url.local.js.example site-url.local.js
# edit site-url.local.js — it is gitignored
```

GitHub Actions copies `site-url.local.js` into the deploy bundle if the file exists in your repo (use a **private** repo, or add secrets via a private fork).

For a **public** repo, set `adminKey` only in Google Apps Script and open the inbox via the Sheet directly, or use a private repository.

### 3. View blessings (only you)

Open your live invitation with:

```
https://YOUR-USERNAME.github.io/wedding-invitation/?blessings=YOUR_ADMIN_KEY
```

A private **🔒 Private Blessings Inbox** panel appears. You can also read rows anytime in the Google Sheet.

## Without Google setup

If `endpoint` is empty, blessings are only queued in **that visitor’s browser** (backup). Set up the Sheet to collect messages from everyone.

## GitHub Pages

The deploy workflow publishes only site files (`index.html`, `assets/`, etc.). See **`GITHUB_DEPLOYMENT.md`**.
