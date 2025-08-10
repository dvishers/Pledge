# Pledge v2 — Local-first family promise app (frontend)

Files:
- `index.html` — main UI
- `styles.css` — styles (modern, mobile friendly)
- `app.js` — frontend logic (localStorage + optional SMS call)
- `server.js` — example Node/Express backend that can send SMS via Twilio

How it works:
- Data is stored in browser localStorage (private to device and browser).
- Export / Import lets you backup or move promises between devices.
- Optional SMS: the frontend can call a backend endpoint `POST /send-sms` with JSON `{ to, message }`.
  - GitHub Pages cannot send SMS directly. You must deploy a small backend (example `server.js`) on a server (Render, Railway, Heroku, or your VPS).
  - The frontend expects the backend URL in `app.js` variable `SMS_ENDPOINT`.

Quick start (frontend only):
1. Place `index.html`, `styles.css`, `app.js` in the repo root.
2. Enable GitHub Pages (branch `main`, folder `/`).
3. Open your live URL and test.

SMS backend (example)
- See `server.js` for a minimal Express + Twilio example. You will need Twilio account SID, token and a 'from' number, or adapt to other SMS providers.
