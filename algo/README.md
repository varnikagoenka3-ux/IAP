# ALGO-OS 98

Retro-desktop website for the *Introduction to Algorithm & Programming* project
(Compound Interest, Kaprekar Number, Mobile Data Usage).

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000   # then visit http://localhost:8000

## Deploy on Netlify
Drag this folder onto https://app.netlify.com/drop, or connect the repo with
no build command and publish directory `.`.

## Files
- `index.html` – boot screen, desktop, taskbar
- `styles.css` – all styling (retro palette, windows, flowchart, responsive rules)
- `script.js` – content (pseudocode, problems, explanations), flowchart renderer, window manager

Fonts load from Google Fonts; fallbacks are set if offline. Sound is off by default (♪ button in the taskbar tray or Start menu).

## What's on the desktop
- PROGRAMS dock: Compound Interest, Kaprekar Number, Mobile Data Usage (tabs: Problem, Pseudocode, Explanation, Flowchart, Try it)
- Files: My Project (folder view), Read Me, Help & Legend, Terminal, Recycle Bin
- Start menu, quick-launch icons, taskbar buttons for open windows, live SYSMON panel, Tip of the Day
- Windows drag by the title bar, resize from the corner grip, minimise / enlarge / restore / close
- The CRT on the desk opens the terminal (type `help`)
