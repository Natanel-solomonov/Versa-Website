# Versa Waitlist Website

A beautiful, responsive waitlist landing page for Versa-shop.com.

## Features

- ✨ **Sticky Navigation Header** with VersaLogo and action buttons
- 🖼️ **Full-screen Hero Image** with WebsiteHeader.png
- 📝 **Waitlist Signup Modal** with form validation
- ℹ️ **How It Works Modal** explaining the app concept
- 📱 **Fully Responsive** design for all devices
- 🎨 **Modern UI** with smooth animations and transitions
- 🔗 **Backend Integration** with Django waitlist API

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**

   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3001`

## Backend API

The website connects to your Django backend at `http://172.20.10.8:8000/api/waitlist/`

### API Endpoints Used:

- `POST /api/waitlist/join/` - Add user to waitlist
- `GET /api/waitlist/count/` - Get waitlist count (for future use)

## File Structure

```
Versa-Website/
├── index.html          # Main landing page
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality and API calls
├── server.js           # Express server to serve the site
├── package.json        # Node.js dependencies and scripts
└── assets/
    ├── VersaLogo.png   # Logo for header
    └── WebsiteHeader.png # Hero image
```

## Deployment

### For Production:

1. Update the `API_BASE_URL` in `script.js` to your production backend URL
2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)
3. Point your Versa-shop.com domain to the deployed site

### For Squarespace Integration:

1. Export the HTML/CSS/JS files
2. Use Squarespace's Custom CSS and Code Injection features
3. Upload assets to Squarespace's file manager

## Customization

- **Colors**: Update the navy blue theme in `styles.css` (search for `#1e3a8a`)
- **Logo**: Replace `assets/VersaLogo.png` with your updated logo
- **Hero Image**: Replace `assets/WebsiteHeader.png` with your hero image
- **Content**: Modify the "How It Works" steps in `index.html`

## Browser Support

- ✅ Chrome/Edge (modern versions)
- ✅ Firefox (modern versions)
- ✅ Safari (modern versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Django REST Framework
- **Server**: Express.js (for local development)
- **Styling**: Custom CSS with Inter font
- **Icons**: Unicode symbols and custom styling













