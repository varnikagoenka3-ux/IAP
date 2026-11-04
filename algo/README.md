# ALGO-OS 98 — IAP project WAS E5

Retro desktop project workspace for the Introduction to Algorithm & Programming project.

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on Netlify
Drag the extracted folder onto Netlify Drop, or connect the repository with no build command and publish directory `.`.

## Files
- `index.html` — boot screen, desktop and taskbar.
- `styles.css` — visual styling, windows, code panels, flowcharts and responsive rules.
- `script.js` — desktop interactions, six application tabs, supplied pseudocode and Python code, explanations and Try It demonstrations.
- `assets/flowchart_compound_interest.jpg` — supplied compound-interest flowchart.
- `assets/flowchart_kaprekar_number.jpg` — supplied Kaprekar flowchart.
- `assets/flowchart_mobile_data_usage.jpg` — supplied mobile-data flowchart.

## Application tabs
Each program contains: Problem, Pseudocode, Code, Explanation, Flowchart and Try it.

The mobile-data demonstration asks for a month and uses the actual number of days in that month. It asks for a year only for February so it can apply the leap-year rule.

Fonts load from Google Fonts, with local system fallbacks. Sound effects are off by default.
