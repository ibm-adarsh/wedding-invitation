# 💻❤️⚕️ Wedding Invitation - Tech Meets Medicine

## 🎉 Innovative Wedding Invitation for a Software Engineer & Doctor

An extraordinary, tech-themed wedding invitation featuring cutting-edge animations, interactive elements, and unique features that celebrate the union of a software engineer and a doctor.

### ✨ Unique Features

- 🖥️ **Terminal Loading Animation** - Authentic terminal boot sequence
- 💻 **Live Code Editor** - Animated code typing effect
- 🧬 **DNA Helix Animation** - Interactive double helix background
- 📊 **Matrix Rain Effect** - Falling code characters
- ⚡ **Particle System** - Dynamic particle connections
- 💓 **ECG Heartbeat Monitor** - Real-time heartbeat animation
- ⏱️ **Live Countdown Timer** - Real-time countdown to wedding
- 📈 **Progress Bar** - Relationship milestone tracker
- 🎨 **Git Merge Visualization** - Creative branch merge animation
- 🌓 **Dark/Light Mode Toggle** - Theme switcher
- 🎵 **Background Music** - With toggle control
- 🎮 **Easter Eggs** - Hidden surprises (try typing "love" or Konami code!)
- 📱 **Fully Responsive** - Perfect on all devices

## 📋 Features

- Animated floating flowers and confetti
- Background music with toggle control
- Multiple wedding event details (Haldi, Mehndi, Sangeet, Wedding, Reception)
- RSVP functionality via WhatsApp and phone
- Google Maps integration for venue
- Responsive design for all devices
- Beautiful animations and effects

## 🚀 Run Locally (Fully Offline)

No internet needed after clone — all assets are local.

```bash
# Option 1 — one command
./start.sh

# Option 2 — npm
npm start

# Option 3 — Python
python3 -m http.server 8000
```

Open **http://localhost:8000** in your browser.

Optional: add `assets/music.mp3` for background wedding music.

### Three Views for Different Guests

Use the buttons at bottom-right:

| Button | Who it's for |
|--------|----------------|
| 🪔 **Classic** | Everyone — Hindu rituals, warm invitation (default) |
| ⚕️ **Doctor** | Medical friends — subtle healing touches on bride's card |
| 💻 **Developer** | Tech friends — code editor, matrix rain, easter eggs |

Your choice is saved in the browser automatically.

## 🚀 Quick Start - Method 1 (Simplest)

Simply open the `index.html` file in your web browser:

1. Navigate to the project folder
2. Double-click on `index.html`
3. The website will open in your default browser

## 🌐 Method 2 - Using Python HTTP Server (Recommended)

For a better development experience with proper MIME types:

### If you have Python 3 installed:

```bash
python3 -m http.server 8000
```

### If you have Python 2 installed:

```bash
python -m SimpleHTTPServer 8000
```

Then open your browser and visit: `http://localhost:8000`

## 🔧 Method 3 - Using Node.js HTTP Server

If you have Node.js installed:

1. Install http-server globally (one-time setup):
```bash
npm install -g http-server
```

2. Run the server:
```bash
http-server -p 8000
```

Then open your browser and visit: `http://localhost:8000`

## 📱 Method 4 - Using VS Code Live Server

If you're using Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🚀 GitHub Pages Deployment (FREE!)

**Want to host this online for FREE?** See [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) for complete step-by-step instructions!

### Quick Deploy:
1. Create a **PUBLIC** GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Your site will be live at: `https://YOUR-USERNAME.github.io/wedding-invitation/`

**Detailed guide**: [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md)

## 🎵 Features to Test

1. **Music Toggle**: Click the music button (🎵) in the bottom-right corner
2. **Theme Toggle**: Click the theme button (🌙) to switch dark/light mode
3. **RSVP**: Click WhatsApp or Call buttons to send RSVP
4. **Map**: Click "Get Directions" to open Google Maps
5. **Animations**: Scroll through the page to see various animations
6. **Responsive**: Resize your browser to see mobile-friendly design

## 🎨 Customization Guide

### Update Names & Details:
1. **Couple Names**: Edit `index.html` (lines 42-48)
2. **Wedding Date**: Update in `index.html` (line 58) and `script.js` (line 94)
3. **Venue**: Modify `index.html` (lines 137-139)
4. **Phone Numbers**: Change in `script.js` (lines 34, 42)

### Customize Colors:
Edit CSS variables in `styles.css` (lines 12-20):
```css
--primary-color: #ff0088;    /* Pink */
--secondary-color: #00ff88;  /* Green */
--accent-color: #ffd700;     /* Gold */
```

## 🎮 Easter Eggs & Hidden Features

Try these secret features:

1. **Type "love"** anywhere on the page → Heart explosion! 💕
2. **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A → Rainbow mode! 🌈
3. **Click the DNA helix** → Heart burst animation! 💖
4. **Check browser console** → Secret messages! 🔍

## 🎨 File Structure

```
wedding-invitation/
├── index.html              # Main HTML file with structure
├── styles.css              # All styling and animations (1337 lines!)
├── script.js               # Interactive functionality (682 lines!)
├── package.json            # NPM configuration
├── README.md               # This file
└── GITHUB_DEPLOYMENT.md    # GitHub Pages deployment guide
```

## 🌟 Browser Compatibility

Works best on:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📞 Contact Information

Update the phone numbers in the code:
- Bride's Family: +91 98765 43210
- Groom's Family: +91 98765 43211

## 💡 Tips

- For best experience, use a modern browser with JavaScript enabled
- Allow audio autoplay for background music
- The website is fully responsive and works on mobile devices
- All animations are GPU-accelerated for smooth performance

## 🛠️ Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Advanced animations & gradients
- **JavaScript (ES6+)** - Interactive features
- **Canvas API** - Matrix rain, DNA helix, ECG, particles
- **Google Fonts** - Fira Code, Playfair Display, Poppins
- **No frameworks** - Pure vanilla JavaScript for performance

## 📊 Features Breakdown

### Animations:
- Terminal boot sequence
- Code typing effect
- Matrix rain background
- DNA helix rotation
- ECG heartbeat
- Particle connections
- Glitch text effect
- Progress bar shimmer
- Timeline scroll animations

### Interactive Elements:
- Music toggle
- Theme switcher (dark/light)
- Countdown timer
- RSVP buttons (WhatsApp & Call)
- Google Maps integration
- Hover effects
- Click animations

### Technical Highlights:
- Multiple canvas layers
- Intersection Observer API
- CSS Grid & Flexbox
- CSS Custom Properties
- Responsive design
- Performance optimized

## 🎊 Enjoy!

Your wedding invitation is ready to share! Simply deploy it or share the files with your guests.

---

Made with 💻 Code, ⚕️ Care, and ❤️ Love