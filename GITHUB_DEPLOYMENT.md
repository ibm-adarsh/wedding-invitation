# Deploy on GitHub Pages (Free)

Host the wedding invitation at no cost using [GitHub Pages](https://pages.github.com/).

**Live URL format:** `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## Quick deploy

### 1. Create a public repository

1. Go to [github.com/new](https://github.com/new)
2. Name it e.g. `wedding-invitation`
3. Set visibility to **Public** (required for free Pages)
4. Create the repository

### 2. Push this project

```bash
cd wedding-invitation

git init
git add .
git commit -m "Wedding invitation — Anjali & Adarsh"

git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wedding-invitation.git
git push -u origin main
```

**Must be included in git** (already in this folder):

| File / folder | Purpose |
|---------------|---------|
| `index.html`, `styles.css`, `script.js` | Main site |
| `site-url.js` | Live URL + blessings config |
| `404.html`, `.nojekyll` | GitHub Pages fixes |
| `assets/ganesha.jpg` | Ganesha photos (required) |
| `.github/workflows/deploy-pages.yml` | Auto deploy on push |

Optional (not deployed to Pages, repo only): `BLESSINGS_SETUP.md`, `google-apps-script/`, `README.md`

### 3. Enable GitHub Pages

1. Repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Push to `main` — workflow **Deploy to GitHub Pages** runs automatically
4. After 1–2 minutes, your site is live under **Settings → Pages**

### 4. Set your live URL (WhatsApp previews)

Edit `site-url.js`:

```javascript
window.SITE_URL = 'https://YOUR-USERNAME.github.io/wedding-invitation';
```

Commit and push.

---

## What works on GitHub Pages

| Feature | Works? | Notes |
|--------|--------|--------|
| Invitation UI | ✅ | Static HTML/CSS/JS |
| Ganesha image | ✅ | `assets/ganesha.jpg` |
| Hearts / animations | ✅ | Pure client-side |
| WhatsApp / Call RSVP | ✅ | Opens phone apps |
| Background music | ✅ | YouTube — needs internet |
| Guest blessings (private) | ✅ | Google Sheet — see `BLESSINGS_SETUP.md` |
| Google Maps links | ✅ | External links |

---

## Private blessings (owner only)

Guest messages are **not** posted on the public wall. Setup: **`BLESSINGS_SETUP.md`**.

View inbox (after config):

```
https://YOUR-USERNAME.github.io/wedding-invitation/?blessings=YOUR_SECRET_KEY
```

On a **public** repo, put secrets in `site-url.local.js` (gitignored) or use a private repository.

---

## Updating after changes

```bash
git add .
git commit -m "Update wedding details"
git push origin main
```

Live site updates in ~1–2 minutes.

---

## Troubleshooting

**404 or blank page**

- `index.html` must be in the repository root
- Repo must be **Public** (or Pages enabled for private repos on your plan)
- Wait 2–3 minutes after first deploy

**Images missing**

- Commit `assets/ganesha.jpg`: `git add assets/ganesha.jpg && git commit -m "Add Ganesha image"`

**Styles or scripts broken**

- All paths are **relative** (`styles.css`, `assets/...`) — works on `/REPO-NAME/` URLs
- Do not use root-absolute paths like `/styles.css`

**Music not playing**

- Browsers may require a tap/scroll for sound after auto-open
- YouTube needs internet

**Deploy workflow failed**

- Repo → **Actions** → open the failed run for logs
- Ensure **Settings → Pages → Source** is **GitHub Actions**

---

## Share your invitation

```
🪔 You're invited!

Anjali & Adarsh
Sunday, 28 June 2026 · Jaunpur

https://YOUR-USERNAME.github.io/wedding-invitation/
```

---

## Custom domain (optional)

1. Repo **Settings** → **Pages** → **Custom domain**
2. Add **CNAME** at your registrar → `YOUR-USERNAME.github.io`
3. Enable **Enforce HTTPS**
4. Update `SITE_URL` in `site-url.js` to your domain

---

Made with 🙏 Faith, 💕 Love & ✨ Joy
