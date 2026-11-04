/* ALGO-OS 98 — boot sequence, desktop, windows, tabs, and EW5 project content. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = function () { return window.matchMedia('(max-width: 760px)').matches; };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fmt(v) { return Number(v.toFixed(2)).toLocaleString('en-US'); }

  /* ------------------------------------------------------------------
     Pixel-art icons (16 x 16)
  ------------------------------------------------------------------ */
  var PAL = { k: '#142A32', p: '#E98ABC', P: '#C9619B', l: '#9164B9', L: '#EBDDF7', c: '#51E5E0', w: '#FFFFFF', y: '#FFD866', Y: '#E0A92E' };
  function pixelSVG(rows) {
    var out = '';
    rows.forEach(function (row, y) {
      for (var x = 0; x < 16; x++) {
        var ch = row.charAt(x);
        if (PAL[ch]) out += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02" fill="' + PAL[ch] + '"/>';
      }
    });
    return '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + out + '</svg>';
  }

  function glyph(rows) {
    var out = '', w = rows[0].length;
    rows.forEach(function (row, y) {
      for (var x = 0; x < w; x++) if (row.charAt(x) === '#') out += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02"/>';
    });
    return '<svg viewBox="0 0 ' + w + ' ' + rows.length + '" shape-rendering="crispEdges" aria-hidden="true" focusable="false" fill="currentColor">' + out + '</svg>';
  }
  var GLYPH = {
    close: glyph(['##....##', '###..###', '.######.', '..####..', '..####..', '.######.', '###..###', '##....##']),
    min: glyph(['........', '........', '........', '........', '........', '........', '########', '########']),
    max: glyph(['########', '########', '#......#', '#......#', '#......#', '#......#', '#......#', '########'])
  };

  var ICONS = {
    ci: pixelSVG([
      '................',
      '..........k.....',
      '.........kck....',
      '........kccck...',
      '.......kccccck..',
      '.......kkkckkk..',
      '.........kck....',
      '..kkkkkk.kck....',
      '.kwyyyyykkck....',
      '.kYYYYYYkkkk....',
      '.kkkkkkkk.......',
      '.kwyyyyyk.......',
      '.kYYYYYYk.......',
      '.kkkkkkkk.......',
      '.kwyyyyyk.......',
      '..kkkkkk........'
    ]),
    kap: pixelSVG([
      '...kkkkkkkkkk...',
      '..k' + 'llllllllll' + 'k..',
      '..k' + 'lkkkkkkkkl' + 'k..',
      '..k' + 'lkcwwccckl' + 'k..',
      '..k' + 'lkccccwckl' + 'k..',
      '..k' + 'lkkkkkkkkl' + 'k..',
      '..k' + 'llllllllll' + 'k..',
      '..k' + 'lpplpplppl' + 'k..',
      '..k' + 'lPPlPPlPPl' + 'k..',
      '..k' + 'llllllllll' + 'k..',
      '..k' + 'lpplpplccl' + 'k..',
      '..k' + 'lPPlPPlccl' + 'k..',
      '..k' + 'llllllllll' + 'k..',
      '..k' + 'lpplppllll' + 'k..',
      '..k' + 'llllllllll' + 'k..',
      '...kkkkkkkkkk...'
    ]),
    mob: pixelSVG([
      '....kkkkkkkk....',
      '...k' + 'llllllll' + 'k...',
      '...k' + 'lkkkkkkl' + 'k...',
      '...k' + 'lkcccckl' + 'k...',
      '...k' + 'lkcccpkl' + 'k...',
      '...k' + 'lkccppkl' + 'k...',
      '...k' + 'lkcpppkl' + 'k...',
      '...k' + 'lkppppkl' + 'k...',
      '...k' + 'lkcccckl' + 'k...',
      '...k' + 'lkcwwckl' + 'k...',
      '...k' + 'lkcccckl' + 'k...',
      '...k' + 'lkkkkkkl' + 'k...',
      '...k' + 'llllllll' + 'k...',
      '...k' + 'lllkklll' + 'k...',
      '...k' + 'llllllll' + 'k...',
      '....kkkkkkkk....'
    ])
  };

  /* ------------------------------------------------------------------
     Pseudocode and Python code supplied for the EW5 project.
  ------------------------------------------------------------------ */
  var PSEUDO = {
    ci: [
      'START',
      'INPUT principal amount',
      'INPUT annual interest rate',
      'INPUT time in years',
      '',
      'IF principal <= 0',
      '    DISPLAY "Error: principal must be greater than 0."',
      'ELSE IF rate < 0',
      '    DISPLAY "Error: rate cannot be negative."',
      'ELSE IF time <= 0',
      '    DISPLAY "Error: time must be greater than 0."',
      'ELSE',
      '    CALCULATE amount = principal * (1 + rate / 100) ^ time',
      '    CALCULATE interest = amount - principal',
      '    DISPLAY final amount',
      '    DISPLAY compound interest',
      'END IF',
      'STOP'
    ],
    kap: [
      'START',
      'INPUT n',
      '',
      'IF n <= 0 OR n % 1 != 0',
      '    DISPLAY "Error: input must be a positive integer."',
      'ELSE',
      '    CALCULATE square = n * n',
      '    COUNT the digits in the square',
      '    SET i = 1',
      '    SET isKaprekar = FALSE',
      '    WHILE i <= digits',
      '        CALCULATE divider = 10 ^ i',
      '        CALCULATE left = square // divider',
      '        CALCULATE right = square % divider',
      '        IF right > 0 AND left + right == n',
      '            SET isKaprekar = TRUE',
      '            SET i = digits + 1  (this stops the loop early)',
      '        ELSE',
      '            SET i = i + 1',
      '        END IF',
      '    END WHILE',
      '    IF isKaprekar == TRUE',
      '        DISPLAY n, "is a Kaprekar number"',
      '    ELSE',
      '        DISPLAY n, "is not a Kaprekar number"',
      '    END IF',
      'END IF',
      'STOP'
    ],
    mob: [
      'START',
      'SET LIMIT = 20',
      'INPUT month number',
      'WHILE month < 1 OR month > 12 OR month % 1 != 0',
      '    DISPLAY "Error: month must be a whole number from 1 to 12."',
      '    INPUT month number',
      'IF month == 2',
      '    INPUT year',
      '    WHILE year < 1 OR year % 1 != 0',
      '        DISPLAY "Error: year must be a whole number, 1 or more."',
      '        INPUT year',
      '    IF year % 400 == 0 OR (year % 4 == 0 AND year % 100 != 0)',
      '        SET days = 29',
      '    ELSE',
      '        SET days = 28',
      'ELSE IF month == 4 OR month == 6 OR month == 9 OR month == 11',
      '    SET days = 30',
      'ELSE',
      '    SET days = 31',
      'SET total = 0',
      'SET day = 1',
      'WHILE day <= 7',
      '    INPUT usage',
      '    IF usage < 0',
      '        DISPLAY "Error: usage cannot be negative. Try again."',
      '    ELSE',
      '        SET total = total + usage',
      '        SET day = day + 1',
      'CALCULATE projected = (total / 7) * days',
      'DISPLAY "Month has", days, "days"',
      'DISPLAY "Total weekly usage:", total, "GB"',
      'DISPLAY "Projected monthly usage:", projected, "GB"',
      'IF projected > LIMIT',
      '    DISPLAY "Warning: you may exceed the", LIMIT, "GB limit by about", (projected - LIMIT), "GB."',
      'ELSE',
      '    DISPLAY "You are within the", LIMIT, "GB limit."',
      'END IF',
      'STOP'
    ]
  };

  var PYTHON = {
    ci: String.raw`# Compound interest

def calculate_compound_interest(principal, rate, time):
    if principal <= 0:
        print("Error: principal must be greater than 0.")
        return
    if rate < 0:
        print("Error: rate cannot be negative.")
        return
    if time <= 0:
        print("Error: time must be greater than 0.")
        return
    amount = principal * (1 + rate / 100) ** time
    return amount


principal = float(input("Enter principal amount: "))
rate = float(input("Enter annual interest rate in % (e.g. 5 for 5%): "))
time = float(input("Enter number of years (decimals allowed, e.g. 2.5): "))

result = calculate_compound_interest(principal, rate, time)

if result is not None:
    interest = result - principal
    print("Final amount:", round(result, 2))
    print("Compound interest:", round(interest, 2))`,
    kap: String.raw`# Kaprekar number

def count_digits(num):
    count = 0
    while num > 0:
        num = num // 10
        count = count + 1
    return count


def is_kaprekar(n):
    square = n * n
    digits = count_digits(square)
    i = 1
    while i <= digits:
        divider = 10 ** i
        left = square // divider
        right = square % divider
        if right > 0 and left + right == n:
            return True
        i = i + 1
    return False


def kaprekar_number(n):
    if n % 1 != 0 or n <= 0:
        print("Error: input must be a positive integer.")
        return
    n = int(n)
    if is_kaprekar(n):
        print(n, "is a Kaprekar number")
    else:
        print(n, "is not a Kaprekar number")


n = float(input("Enter a number to check: "))
kaprekar_number(n)`,
    mob: String.raw`# Data usage calculation

LIMIT = 20  # GB

month = float(input("Enter the month number (1-12): "))
while month < 1 or month > 12 or month % 1 != 0:
    print("Error: month must be a whole number from 1 to 12.")
    month = float(input("Enter the month number (1-12): "))
month = int(month)

if month == 2:
    year = float(input("Enter the year (for leap year check): "))
    while year < 1 or year % 1 != 0:
        print("Error: year must be a whole number, 1 or more.")
        year = float(input("Enter the year (for leap year check): "))
    year = int(year)
    if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
        days = 29
    else:
        days = 28
elif month == 4 or month == 6 or month == 9 or month == 11:
    days = 30
else:
    days = 31

total = 0
day = 1
while day <= 7:
    usage = float(input("Enter data usage for day " + str(day) + " (in GB): "))
    if usage < 0:
        print("Error: usage cannot be negative. Try again.")
    else:
        total = total + usage
        day = day + 1

projected = total / 7 * days
print("Month has", days, "days")
print("Total weekly usage:", round(total, 2), "GB")
print("Projected monthly usage:", round(projected, 2), "GB")

if projected > LIMIT:
    print("Warning: you may exceed the", LIMIT, "GB limit by about", round(projected - LIMIT, 2), "GB.")
else:
    print("You are within the", LIMIT, "GB limit.")`
  };

  function highlightPython(line) {
    var out = '', last = 0, re = /(#[^\n]*|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|\b(?:def|if|else|elif|return|while|for|in|and|or|not|True|False|None|print|input|int|float|range)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*(?=\s*\())/g, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      var cls = m[1].charAt(0) === '#' ? 'tk-comment' : (/^["']/.test(m[1]) ? 'tk-s' : (/^\d/.test(m[1]) ? 'tk-n' : (/^(def|if|else|elif|return|while|for|in|and|or|not|True|False|None)$/.test(m[1]) ? 'tk-k' : 'tk-fn')));
      out += '<span class="' + cls + '">' + esc(m[1]) + '</span>';
      last = re.lastIndex;
    }
    return out + esc(line.slice(last));
  }

  var TOKEN_RE = /("[^"]*")|(<-)|(\b\d+(?:\.\d+)?\b)|(\b(?:FUNCTION|END|IF|THEN|ELSE|RETURN|DISPLAY|INPUT|FOR|TO|REPEAT|UNTIL|WHILE|START|STOP|PRINT|DIV|MOD|AND|OR|NULL|true|FALSE|TRUE|SET|COUNT|CALCULATE)\b)|([()*\/^+\-<>=,])/g;
  function highlight(line) {
    var out = '', last = 0, m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(line))) {
      out += esc(line.slice(last, m.index));
      var cls = m[1] ? 'tk-s' : m[2] ? 'tk-a' : m[3] ? 'tk-n' : m[4] ? 'tk-k' : 'tk-o';
      out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
      last = TOKEN_RE.lastIndex;
    }
    return out + esc(line.slice(last));
  }

  /* ------------------------------------------------------------------
     Reference calculations used by the worked examples and Try it panels.
  ------------------------------------------------------------------ */
  function compoundInterest(principal, rate, time) {
    if (typeof principal !== 'number' || !isFinite(principal)) return { error: 'Principal must be a number.' };
    if (typeof rate !== 'number' || !isFinite(rate)) return { error: 'Rate must be a number.' };
    if (typeof time !== 'number' || !isFinite(time)) return { error: 'Time must be a number.' };
    if (principal <= 0) return { error: 'Principal must be greater than 0.' };
    if (rate < 0) return { error: 'Rate cannot be negative.' };
    if (time <= 0) return { error: 'Time must be greater than 0.' };
    var amount = principal * Math.pow(1 + rate / 100, time);
    return { amount: amount, interest: amount - principal };
  }

  function countDigitsNumber(num) {
    return String(num).length;
  }

  function kapCalc(n) {
    var N = BigInt(n), sq = N * N, digits = countDigitsNumber(sq.toString()), rows = [], found = false;
    for (var i = 1; i <= digits; i++) {
      var divider = 10n ** BigInt(i);
      var left = sq / divider;
      var right = sq % divider;
      var sum = left + right;
      var ok = right > 0n && sum === N;
      rows.push({ i: i, divider: divider, left: left, right: right, sum: sum, ok: ok });
      if (ok) { found = true; break; }
    }
    return { n: N, sq: sq, digits: digits, rows: rows, found: found };
  }

  function kapTrace(n) {
    var k = kapCalc(n);
    var rows = k.rows.map(function (r) {
      return '<tr' + (r.ok ? ' class="hit"' : '') + '><td>' + r.i + '</td><td>' + r.divider + '</td><td>' + r.left + '</td><td>' + r.right + '</td><td>' + r.sum + '</td><td class="' + (r.ok ? 'yes' : 'no') + '">' + (r.ok ? '&#10003; = ' + n : '&ne; ' + n) + '</td></tr>';
    }).join('');
    return '<div class="table-wrap"><table class="trace"><caption class="sr-only">Possible splits for ' + n + ' squared</caption>' +
      '<thead><tr><th>i</th><th>divider</th><th>left</th><th>right</th><th>left + right</th><th>check</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="verdict">square = ' + k.sq + ', digits = ' + k.digits + ', found = ' + k.found + '. ' + n + (k.found ? ' is a Kaprekar number.' : ' is not a Kaprekar number.') + '</p>';
  }

  /* ------------------------------------------------------------------
     Flowchart renderer: conventional symbols, orthogonal arrows
     node: {id, t: 'term'|'proc'|'io'|'dec', x, y (centre), w, h, lines[]}
     edge: [from, fromSide, to, toSide, label?, via?]
  ------------------------------------------------------------------ */
  var SKEW = 16;
  function port(n, side) {
    var hw = n.w / 2, hh = n.h / 2, sk = n.t === 'io' ? SKEW / 2 : 0;
    if (side === 't') return [n.x, n.y - hh];
    if (side === 'b') return [n.x, n.y + hh];
    if (side === 'l') return [n.x - hw + sk, n.y];
    return [n.x + hw - sk, n.y];
  }
  function shapeSVG(n) {
    var x0 = n.x - n.w / 2, y0 = n.y - n.h / 2, s;
    if (n.t === 'term') s = '<rect class="fc-term" x="' + x0 + '" y="' + y0 + '" width="' + n.w + '" height="' + n.h + '" rx="' + (n.h / 2) + '"/>';
    else if (n.t === 'proc') s = '<rect class="fc-proc" x="' + x0 + '" y="' + y0 + '" width="' + n.w + '" height="' + n.h + '"/>';
    else if (n.t === 'io') s = '<polygon class="fc-io" points="' + (x0 + SKEW) + ',' + y0 + ' ' + (x0 + n.w) + ',' + y0 + ' ' + (x0 + n.w - SKEW) + ',' + (y0 + n.h) + ' ' + x0 + ',' + (y0 + n.h) + '"/>';
    else s = '<polygon class="fc-dec" points="' + n.x + ',' + y0 + ' ' + (x0 + n.w) + ',' + n.y + ' ' + n.x + ',' + (y0 + n.h) + ' ' + x0 + ',' + n.y + '"/>';
    var lh = 16, txt = '';
    n.lines.forEach(function (line, i) {
      var y = n.y + (i - (n.lines.length - 1) / 2) * lh;
      txt += '<text x="' + n.x + '" y="' + y + '" class="' + (n.t === 'term' ? 'fc-tt' : 'fc-tx') + (n.t === 'term' && i === 0 && n.lines.length > 1 ? ' fc-strong' : '') + '">' + esc(line) + '</text>';
    });
    return '<g>' + s + txt + '</g>';
  }
  function edgeSVG(nodes, e) {
    var a = nodes[e[0]], b = nodes[e[2]];
    var p0 = port(a, e[1]), p1 = port(b, e[3]);
    var pts = [p0];
    var via = e[5];
    if (via) pts = pts.concat(via);
    else {
      var vA = e[1] === 't' || e[1] === 'b', vB = e[3] === 't' || e[3] === 'b';
      if (!vA && vB && p0[0] !== p1[0]) pts.push([p1[0], p0[1]]);
      else if (vA && !vB && p0[1] !== p1[1]) pts.push([p0[0], p1[1]]);
      else if (vA && vB && p0[0] !== p1[0]) { var my = (p0[1] + p1[1]) / 2; pts.push([p0[0], my], [p1[0], my]); }
      else if (!vA && !vB && p0[1] !== p1[1]) { var mx = (p0[0] + p1[0]) / 2; pts.push([mx, p0[1]], [mx, p1[1]]); }
    }
    pts.push(p1);
    var d = 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L');
    var lab = '';
    if (e[4]) {
      var lx = p0[0], ly = p0[1], anchor = 'start';
      if (e[1] === 'r') { lx += 8; ly -= 8; }
      else if (e[1] === 'l') { lx -= 8; ly -= 8; anchor = 'end'; }
      else if (e[1] === 'b') { lx += 9; ly += 16; }
      else { lx += 9; ly -= 8; }
      lab = '<text class="fc-lab" x="' + lx + '" y="' + ly + '" style="text-anchor:' + anchor + '">' + e[4] + '</text>';
    }
    return { path: '<path class="fc-edge" d="' + d + '" marker-end="url(#fc-arrow)"/>', lab: lab };
  }
  function flowchartSVG(chart, label) {
    var nodes = {};
    chart.nodes.forEach(function (n) { nodes[n.id] = n; });
    var defs = '<defs><marker id="fc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">' +
      '<path d="M0 0 L10 5 L0 10 z" fill="#142A32"/></marker></defs>';
    var style = '<style>' +
      '.fc-edge{fill:none;stroke:#142A32;stroke-width:2.2;stroke-linejoin:miter}' +
      '.fc-term{fill:#142A32;stroke:#142A32;stroke-width:2.5}' +
      '.fc-proc{fill:#FFE6F2;stroke:#142A32;stroke-width:2.5}' +
      '.fc-io{fill:#E4D6F4;stroke:#142A32;stroke-width:2.5}' +
      '.fc-dec{fill:#D2F8F6;stroke:#142A32;stroke-width:2.5}' +
      'text{font-family:"JetBrains Mono",Consolas,monospace;font-size:12.5px;font-variant-ligatures:none;dominant-baseline:middle;text-anchor:middle}' +
      '.fc-tx{fill:#142A32}.fc-tt{fill:#51E5E0}.fc-strong{font-weight:700;letter-spacing:.08em}' +
      '.fc-lab{font-family:"Press Start 2P",monospace;font-size:8.5px;fill:#6E4594;dominant-baseline:auto;paint-order:stroke;stroke:#FFFFFF;stroke-width:4px}' +
      '</style>';
    var drawn = chart.edges.map(function (e) { return edgeSVG(nodes, e); });
    var edges = drawn.map(function (d) { return d.path; }).join('');
    var labels = drawn.map(function (d) { return d.lab; }).join('');
    var shapes = chart.nodes.map(shapeSVG).join('');
    return '<svg viewBox="0 0 ' + chart.w + ' ' + chart.h + '" role="img" aria-label="' + esc(label) + '" xmlns="http://www.w3.org/2000/svg">' +
      defs + style + edges + shapes + labels + '</svg>';
  }

  var CHARTS = {
    ci: {
      w: 690, h: 750,
      nodes: [
        { id: 'st', t: 'term', x: 230, y: 44, w: 290, h: 64, lines: ['START', 'calculate_compound_interest', '(principal, rate, time)'] },
        { id: 'd1', t: 'dec', x: 230, y: 180, w: 260, h: 120, lines: ['principal, rate or time', 'is not a number?'] },
        { id: 'e1', t: 'io', x: 515, y: 180, w: 230, h: 58, lines: ['DISPLAY "Error: inputs', 'must be numbers"'] },
        { id: 'd2', t: 'dec', x: 230, y: 335, w: 260, h: 120, lines: ['principal < 0 OR', 'rate < 0 OR time < 0?'] },
        { id: 'e2', t: 'io', x: 515, y: 335, w: 230, h: 58, lines: ['DISPLAY "Error: inputs', 'cannot be negative"'] },
        { id: 'p1', t: 'proc', x: 230, y: 465, w: 330, h: 58, lines: ['amount <-', 'principal * (1 + rate / 100) ^ time'] },
        { id: 'p2', t: 'proc', x: 230, y: 555, w: 300, h: 46, lines: ['interest <- amount - principal'] },
        { id: 'p3', t: 'proc', x: 230, y: 630, w: 200, h: 46, lines: ['RETURN interest'] },
        { id: 'rn', t: 'proc', x: 515, y: 630, w: 180, h: 46, lines: ['RETURN NULL'] },
        { id: 'en', t: 'term', x: 230, y: 712, w: 200, h: 44, lines: ['END FUNCTION'] }
      ],
      edges: [
        ['st', 'b', 'd1', 't'],
        ['d1', 'r', 'e1', 'l', 'YES'],
        ['d1', 'b', 'd2', 't', 'NO'],
        ['e1', 'r', 'rn', 'r', null, [[655, 180], [655, 630]]],
        ['d2', 'r', 'e2', 'l', 'YES'],
        ['e2', 'b', 'rn', 't'],
        ['d2', 'b', 'p1', 't', 'NO'],
        ['p1', 'b', 'p2', 't'],
        ['p2', 'b', 'p3', 't'],
        ['p3', 'b', 'en', 't'],
        ['rn', 'b', 'en', 'r']
      ]
    },
    kap: {
      w: 700, h: 1290,
      nodes: [
        { id: 'st', t: 'term', x: 230, y: 40, w: 240, h: 56, lines: ['START', 'kaprekar_number(n)'] },
        { id: 'd1', t: 'dec', x: 230, y: 160, w: 240, h: 110, lines: ['n is not a positive', 'integer?'] },
        { id: 'e1', t: 'io', x: 500, y: 160, w: 240, h: 58, lines: ['DISPLAY "Error: n must', 'be a positive integer"'] },
        { id: 'r1', t: 'term', x: 500, y: 250, w: 130, h: 42, lines: ['RETURN'] },
        { id: 'f0', t: 'proc', x: 230, y: 275, w: 220, h: 46, lines: ['found <- (n = 1)'] },
        { id: 's', t: 'proc', x: 230, y: 350, w: 220, h: 46, lines: ['s <- n * n as text'] },
        { id: 'i0', t: 'proc', x: 230, y: 425, w: 160, h: 46, lines: ['i <- 1'] },
        { id: 'dl', t: 'dec', x: 230, y: 520, w: 240, h: 104, lines: ['i <= length(s) - 1 ?'] },
        { id: 'pl', t: 'proc', x: 230, y: 622, w: 300, h: 52, lines: ['left <- number made from', 'first i digits of s'] },
        { id: 'pr', t: 'proc', x: 230, y: 697, w: 300, h: 52, lines: ['right <- number made from', 'remaining digits of s'] },
        { id: 'dc', t: 'dec', x: 230, y: 808, w: 260, h: 120, lines: ['right > 0 AND', 'left + right = n ?'] },
        { id: 'ft', t: 'proc', x: 500, y: 808, w: 170, h: 46, lines: ['found <- true'] },
        { id: 'inc', t: 'proc', x: 230, y: 918, w: 180, h: 46, lines: ['i <- i + 1'] },
        { id: 'df', t: 'dec', x: 230, y: 1060, w: 190, h: 100, lines: ['found ?'] },
        { id: 'oy', t: 'io', x: 230, y: 1160, w: 270, h: 56, lines: ['DISPLAY n,', '" is a Kaprekar number"'] },
        { id: 'on', t: 'io', x: 505, y: 1060, w: 250, h: 56, lines: ['DISPLAY n,', '" is not a Kaprekar number"'] },
        { id: 'en', t: 'term', x: 230, y: 1250, w: 200, h: 44, lines: ['END FUNCTION'] }
      ],
      edges: [
        ['st', 'b', 'd1', 't'],
        ['d1', 'r', 'e1', 'l', 'YES'],
        ['e1', 'b', 'r1', 't'],
        ['d1', 'b', 'f0', 't', 'NO'],
        ['f0', 'b', 's', 't'],
        ['s', 'b', 'i0', 't'],
        ['i0', 'b', 'dl', 't'],
        ['dl', 'b', 'pl', 't', 'YES'],
        ['dl', 'r', 'df', 't', 'NO  (loop ends)', [[660, 520], [660, 985], [230, 985]]],
        ['pl', 'b', 'pr', 't'],
        ['pr', 'b', 'dc', 't'],
        ['dc', 'r', 'ft', 'l', 'YES'],
        ['dc', 'b', 'inc', 't', 'NO'],
        ['ft', 'b', 'inc', 'r'],
        ['inc', 'l', 'dl', 'l', null, [[50, 918], [50, 520]]],
        ['df', 'b', 'oy', 't', 'YES'],
        ['df', 'r', 'on', 'l', 'NO'],
        ['oy', 'b', 'en', 't'],
        ['on', 'b', 'en', 'r']
      ]
    },
    mob: {
      w: 710, h: 1310,
      nodes: [
        { id: 'st', t: 'term', x: 240, y: 36, w: 160, h: 44, lines: ['BEGIN'] },
        { id: 't0', t: 'proc', x: 240, y: 112, w: 190, h: 46, lines: ['total <- 0'] },
        { id: 'd0', t: 'proc', x: 240, y: 187, w: 190, h: 46, lines: ['day <- 1'] },
        { id: 'dd', t: 'dec', x: 240, y: 285, w: 210, h: 104, lines: ['day <= 7 ?'] },
        { id: 'in', t: 'io', x: 240, y: 390, w: 220, h: 50, lines: ['INPUT usage'] },
        { id: 'dv', t: 'dec', x: 240, y: 500, w: 270, h: 124, lines: ['usage is not a number', 'OR usage < 0 ?'] },
        { id: 'er', t: 'io', x: 545, y: 500, w: 250, h: 58, lines: ['DISPLAY "Error: enter a', 'number of 0 GB or more"'] },
        { id: 'tt', t: 'proc', x: 240, y: 612, w: 240, h: 46, lines: ['total <- total + usage'] },
        { id: 'di', t: 'proc', x: 240, y: 687, w: 200, h: 46, lines: ['day <- day + 1'] },
        { id: 'pm', t: 'proc', x: 240, y: 800, w: 300, h: 46, lines: ['projected_monthly <- total * 4'] },
        { id: 'ow', t: 'io', x: 240, y: 880, w: 330, h: 56, lines: ['DISPLAY "Weekly usage: ",', 'total, " GB"'] },
        { id: 'op', t: 'io', x: 240, y: 962, w: 360, h: 56, lines: ['DISPLAY "Projected monthly usage: ",', 'projected_monthly, " GB"'] },
        { id: 'dm', t: 'dec', x: 240, y: 1072, w: 260, h: 112, lines: ['projected_monthly', '> 20 ?'] },
        { id: 'oy', t: 'io', x: 240, y: 1178, w: 290, h: 56, lines: ['DISPLAY "Monthly limit', 'may be exceeded"'] },
        { id: 'on', t: 'io', x: 525, y: 1072, w: 260, h: 56, lines: ['DISPLAY "Monthly limit is not', 'expected to be exceeded"'] },
        { id: 'en', t: 'term', x: 240, y: 1268, w: 140, h: 44, lines: ['END'] }
      ],
      edges: [
        ['st', 'b', 't0', 't'],
        ['t0', 'b', 'd0', 't'],
        ['d0', 'b', 'dd', 't'],
        ['dd', 'b', 'in', 't', 'YES'],
        ['dd', 'r', 'pm', 't', 'NO  (7 days done)', [[688, 285], [688, 752], [240, 752]]],
        ['in', 'b', 'dv', 't'],
        ['dv', 'r', 'er', 'l', 'YES'],
        ['er', 't', 'in', 'r'],
        ['dv', 'b', 'tt', 't', 'NO'],
        ['tt', 'b', 'di', 't'],
        ['di', 'l', 'dd', 'l', null, [[52, 687], [52, 285]]],
        ['pm', 'b', 'ow', 't'],
        ['ow', 'b', 'op', 't'],
        ['op', 'b', 'dm', 't'],
        ['dm', 'b', 'oy', 't', 'YES'],
        ['dm', 'r', 'on', 'l', 'NO'],
        ['oy', 'b', 'en', 't'],
        ['on', 'b', 'en', 'r']
      ]
    }
  };

  var LEGEND = '<ul class="legend" aria-label="Flowchart symbols">' +
    '<li><svg viewBox="0 0 38 22" aria-hidden="true"><rect x="2" y="3" width="34" height="16" rx="8" fill="#142A32"/></svg>Start / end</li>' +
    '<li><svg viewBox="0 0 38 22" aria-hidden="true"><rect x="3" y="3" width="32" height="16" fill="#FFE6F2" stroke="#142A32" stroke-width="2"/></svg>Process</li>' +
    '<li><svg viewBox="0 0 38 22" aria-hidden="true"><polygon points="9,3 36,3 29,19 2,19" fill="#E4D6F4" stroke="#142A32" stroke-width="2"/></svg>Input / output</li>' +
    '<li><svg viewBox="0 0 38 22" aria-hidden="true"><polygon points="19,1 36,11 19,21 2,11" fill="#D2F8F6" stroke="#142A32" stroke-width="2"/></svg>Decision</li>' +
    '</ul>';

  function source(html) { return '<blockquote class="source"><span class="source-tag">FROM THE DOCUMENT</span>' + html + '</blockquote>'; }
  function example(html) { return '<div class="example"><span class="example-tag">EXAMPLE</span><div>' + html + '</div></div>'; }

  /* ------------------------------------------------------------------
     App content — aligned with the latest code, pseudocode and flowcharts.
  ------------------------------------------------------------------ */
  var ciEx = compoundInterest(10000, 10, 2);
  var mobExTotal = 5.3;
  var mobExDays = 30;
  var mobExProjected = mobExTotal / 7 * mobExDays;

  var APPS = [
    {
      id: 'ci', exe: 'COMPOUND.EXE', name: 'Compound Interest', tone: 'pink',
      problem:
        '<h3>PROBLEM STATEMENT</h3>' +
        '<p>Write a function called <code>calculate_compound_interest</code>. It takes principal, rate and time as inputs, assumes annual compounding, and calculates the final amount using <code>A = P(1 + R/100)^T</code>. The program then displays the final amount and compound interest. Principal and time must be greater than 0; rate cannot be negative.</p>' +
        '<h3>INPUTS</h3><ul class="chips"><li>principal</li><li>annual rate (%)</li><li>time (years)</li></ul>' +
        '<h3>FORMULAS</h3><div class="formula"><b>amount</b> &larr; principal &times; (1 + rate / 100)<sup>time</sup><br><b>interest</b> &larr; amount &minus; principal</div>' +
        '<h3>OUTPUT</h3><p>Final amount and compound interest, each rounded to 2 decimal places. Invalid principal, rate or time produces its corresponding error message.</p>' +
        '<h3>EXAMPLE</h3>' + example('<p>P = 10,000, R = 10%, T = 2 years gives A = 12,100 and compound interest = 2,100.</p>'),
      explain:
        '<h3>VALIDATION ORDER</h3><ol>' +
        '<li><code>principal</code> must be greater than 0. A zero or negative principal is rejected.</li>' +
        '<li><code>rate</code> cannot be negative. A rate of 0% is allowed.</li>' +
        '<li><code>time</code> must be greater than 0. Decimal years are allowed, such as 2.5.</li></ol>' +
        '<h3>CALCULATION</h3><p>The function calculates and returns the final amount <code>A</code>. After the function returns, the main program subtracts the principal to obtain compound interest: <code>interest = result - principal</code>.</p>' +
        '<h3>WORKED EXAMPLE</h3>' +
        '<pre class="calc">amount   = 10,000 &times; (1 + 10 / 100)^2\n         = 10,000 &times; 1.1^2\n         = 10,000 &times; 1.21\n         = ' + fmt(ciEx.amount) + '\ninterest = ' + fmt(ciEx.amount) + ' &minus; 10,000\n         = ' + fmt(ciEx.interest) + '</pre>' +
        '<p>The returned amount is 12,100. The displayed compound interest is 2,100.</p>',
      chartNote: 'The flowchart checks principal, rate and time in sequence. Each invalid branch displays its specific error and joins the STOP path.'
    },
    {
      id: 'kap', exe: 'KAPREKAR.EXE', name: 'Kaprekar Number', tone: 'lav',
      problem:
        '<h3>PROBLEM STATEMENT</h3>' +
        '<p>Write a function called <code>kaprekar_number</code> that takes a positive integer <code>n</code>. A number is a Kaprekar number if its square can be split into two parts that add up to the original number. Display the appropriate message, or an error if the input is not a positive integer.</p>' +
        '<h3>INPUT</h3><ul class="chips"><li>n (positive integer)</li></ul>' +
        '<h3>OUTPUT</h3><p><code>n is a Kaprekar number</code> or <code>n is not a Kaprekar number</code>.</p>' +
        '<h3>EXAMPLES</h3>' +
        example('<p>45&sup2; = 2025. Split 20 | 25. Since 20 + 25 = 45, 45 is a Kaprekar number.</p>') +
        example('<p>4879&sup2; = 23804641. Split 238 | 04641. Since 238 + 4641 = 4879, 4879 is a Kaprekar number.</p>'),
      explain:
        '<h3>HOW THE ALGORITHM WORKS</h3><ol>' +
        '<li>Reject the input if it is not a positive integer.</li>' +
        '<li>Square <code>n</code> and count the digits in the square.</li>' +
        '<li>Try successive right-part lengths by increasing <code>i</code> from 1. Set <code>divider = 10 ** i</code>.</li>' +
        '<li>Calculate <code>left = square // divider</code> and <code>right = square % divider</code>.</li>' +
        '<li>If <code>right &gt; 0</code> and <code>left + right == n</code>, mark it as a Kaprekar number and stop checking further splits.</li></ol>' +
        '<h3>TRACE: n = 45</h3>' + kapTrace(45) +
        '<h3>TRACE: n = 4879</h3>' + kapTrace(4879) +
        '<h3>TRACE: n = 10</h3>' + kapTrace(10) +
        '<p>The positive-right-part check prevents a split with a zero right part from being accepted.</p>',
      chartNote: 'The flowchart follows the helper functions: count the square digits, test each divisor split, and stop when a valid Kaprekar split is found.'
    },
    {
      id: 'mob', exe: 'MOBDATA.EXE', name: 'Mobile Data Usage', tone: 'cyan',
      problem:
        '<h3>PROBLEM STATEMENT</h3>' +
        '<p>A mobile user has a monthly data limit of 20 GB. Accept data usage for seven days, calculate the total weekly usage, and estimate whether the monthly limit may be exceeded. This version asks for the month and, for February, the year so the projection uses the actual number of days in that month.</p>' +
        '<h3>INPUTS</h3><ul class="chips"><li>month (1–12)</li><li>year (February only)</li><li>7 daily usage values (GB)</li></ul>' +
        '<h3>PROJECTION</h3><div class="formula"><b>average daily usage</b> = total weekly usage / 7<br><b>projected monthly usage</b> = average daily usage &times; days in month</div>' +
        '<h3>OUTPUT</h3><ul><li>Number of days in the selected month</li><li>Total weekly usage in GB</li><li>Projected monthly usage in GB</li><li>Warning if projected usage exceeds 20 GB</li></ul>' +
        '<h3>EXAMPLE</h3>' + example('<p>A weekly total of 5.3 GB in a 30-day month projects to (5.3 / 7) &times; 30 = ' + fmt(mobExProjected) + ' GB, which exceeds 20 GB.</p>'),
      explain:
        '<h3>MONTH AND YEAR VALIDATION</h3><p>The month must be a whole number from 1 to 12. If the selected month is February, the program also asks for a whole-number year. A leap year is divisible by 400, or divisible by 4 but not by 100. February then has 29 days in a leap year and 28 otherwise.</p>' +
        '<h3>DAYS IN OTHER MONTHS</h3><ul><li>April, June, September and November have 30 days.</li><li>The remaining months have 31 days.</li></ul>' +
        '<h3>SEVEN-DAY INPUT LOOP</h3><p>The program asks for seven daily usage values. If a value is negative, it displays an error and asks for that same day again. The day counter advances only after a non-negative value is added to the total.</p>' +
        '<h3>MONTHLY ESTIMATE</h3><p>After seven valid values, the program calculates the average daily usage as <code>total / 7</code>, then multiplies that average by the number of days in the selected month. The estimate is compared with the 20 GB limit. Only a result greater than 20 GB triggers the warning.</p>' +
        '<h3>WORKED EXAMPLE</h3>' +
        '<pre class="calc">weekly total       = 5.3 GB\naverage per day    = 5.3 / 7 = 0.7571 GB\nmonth length       = 30 days\nprojected usage    = 0.7571 &times; 30\n                   = ' + fmt(mobExProjected) + ' GB\n' + fmt(mobExProjected) + ' &gt; 20 GB  &rarr; warning</pre>',
      chartNote: 'For February, the chart checks the year and applies the leap-year rule. The seven-day loop repeats the same day after negative usage, then projects average daily usage across the selected month.'
    }
  ];
  var APP_BY_ID = {};
  APPS.forEach(function (a) { APP_BY_ID[a.id] = a; });
  var TABS = ['Problem', 'Pseudocode', 'Code', 'Explanation', 'Flowchart', 'Try it'];

  /* ------------------------------------------------------------------
     Extra pixel art for the operating system
  ------------------------------------------------------------------ */
  PAL.g = '#5CFF8A'; PAL.t = '#1F3F4A';
  function frame10(inner) { return inner.map(function (r) { return '..k' + r + 'k..'; }); }
  ICONS.folder = pixelSVG([
    '................', '................', '.kkkkkk.........', 'kYYYYYYk........', 'kYYYYYYYkkkkkkk.',
    'kYYYYYYYYYYYYYYk', 'kkkkkkkkkkkkkkkk', 'kyyyyyyyyyyyyyyk', 'kywwyyyyyyyyyyyk', 'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk', 'kyyyyyyyyyyyyyyk', 'kYYYYYYYYYYYYYYk', 'kYYYYYYYYYYYYYYk', 'kkkkkkkkkkkkkkkk', '................'
  ]);
  ICONS.readme = pixelSVG([
    '..kkkkkkkkk.....', '..kwwwwwwwkk....', '..kwwwwwwwklk...', '..kwwwwwwwkkkk..'
  ].concat(frame10(['wllllllwww', 'wwwwwwwwww', 'wppppppppw', 'wwwwwwwwww', 'wlllllwwww', 'wwwwwwwwww', 'wccccccccw', 'wwwwwwwwww', 'wllllllwww', 'wwwwwwwwww']), [
    '..kkkkkkkkkkkk..', '................'
  ]));
  ICONS.help = pixelSVG(['................', '...kkkkkkkkkk...'].concat(
    ['cccccccccc', 'cccwwwwccc', 'ccwwccwwcc', 'ccccccwwcc', 'cccccwwccc', 'ccccwwcccc', 'ccccwwcccc', 'cccccccccc', 'ccccwwcccc', 'cccccccccc']
      .map(function (r) { return '..k' + r + 'k..'; }),
    ['...kkkkkkkkkk...', '................', '................', '................']));
  ICONS.term = pixelSVG(['................', '.kkkkkkkkkkkkkk.', '.kllllllllllllk.', '.klkkkkkkkkkklk.'].concat(
    ['tttttttt', 'tgtttttt', 'ttgttttt', 'tgtggggt', 'tttttttt'].map(function (r) { return '.klk' + r + 'klk.'; }),
    ['.klkkkkkkkkkklk.', '.kllllllllllllk.', '.kkkkkkkkkkkkkk.', '......kkkk......', '....kllllllk....', '....kkkkkkkk....', '................']));
  function binRows(full) {
    return [full ? '......kwk.......' : '................', full ? '.....kwpwkk.....' : '.....kkkkkk.....',
      '..kkkkkkkkkkkk..', '..kLLLLLLLLLLk..', '..kkkkkkkkkkkk..']
      .concat(['LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL', 'LlLlLlLL']
        .map(function (r) { return '...k' + r + 'k...'; }), ['...kkkkkkkkkk...', '................']);
  }
  ICONS.bin = pixelSVG(binRows(true));
  ICONS.binEmpty = pixelSVG(binRows(false));
  ICONS.tip = pixelSVG(['......kkkk......', '....kkyyyykk....', '...kyyywyyyyk...', '...kyywyyyyyk...', '...kyyyyyyyyk...',
    '...kyyyyyyyyk...', '....kyyyyyyk....', '.....kyyyyk.....', '.....kkkkkk.....', '.....kllllk.....', '.....kkkkkk.....',
    '.....kllllk.....', '......kkkk......', '................', '................', '................']);
  ICONS.pdf = pixelSVG([
    '..kkkkkkkkk.....', '..kwwwwwwwkk....', '..kwwwwwwwklk...', '..kwwwwwwwkkkk..'
  ].concat(frame10(['wwwwwwwwww', 'wppppppwww', 'wpkkkkpwww', 'wppppppwww', 'wwwwwwwwww', 'wllllllllw', 'wwwwwwwwww', 'wllllllwww', 'wwwwwwwwww', 'wwwwwwwwww']), [
    '..kkkkkkkkkkkk..', '................'
  ]));

  /* ------------------------------------------------------------------
     Optional sound (off by default, never autoplays)
  ------------------------------------------------------------------ */
  var soundOn = false, actx = null;
  function blip(freq, dur) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = 'square'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.05, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(); o.stop(actx.currentTime + dur);
    } catch (e) { /* audio unavailable */ }
  }

  /* ------------------------------------------------------------------
     Boot sequence
  ------------------------------------------------------------------ */
  var boot = $('#boot'), desktop = $('#desktop');
  var BOOT_LINES = [
    ['ALGO-OS 98  BIOS v1.0', ''],
    ['Memory test ............ 640K ', 'OK'],
    ['Loading COMPOUND.EXE ...... ', 'OK'],
    ['Loading KAPREKAR.EXE ...... ', 'OK'],
    ['Loading MOBDATA.EXE ....... ', 'OK'],
    ['3 programs ready.', '']
  ];
  var bootTimers = [], entered = false, everEntered = false;

  function bootLineHTML(l) { return esc(l[0]) + (l[1] ? '<span class="ok">' + l[1] + '</span>' : ''); }
  function setProgress(p) {
    $('#loadFill').style.width = p + '%';
    $('#bootPct').textContent = String(Math.round(p)).padStart(3, '0') + '%';
    $('#loadBar').setAttribute('aria-valuenow', String(Math.round(p)));
  }
  function runBoot() {
    var log = $('#bootLog');
    log.innerHTML = '';
    setProgress(0);
    if (reduceMotion) {
      log.innerHTML = BOOT_LINES.map(bootLineHTML).join('\n');
      setProgress(100);
      return;
    }
    BOOT_LINES.forEach(function (l, i) {
      bootTimers.push(setTimeout(function () {
        log.innerHTML += (i ? '\n' : '') + bootLineHTML(l);
      }, 180 + i * 260));
    });
    var start = performance.now(), dur = 1700;
    (function tick(now) {
      if (entered) return;
      var t = Math.min(1, (now - start) / dur);
      setProgress(Math.floor(t * 20) * 5); // stepped, like an old loader
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }
  function enterDesktop() {
    if (entered) return;
    entered = true;
    bootTimers.forEach(clearTimeout);
    bootTimers = [];
    blip(660, 0.12);
    var show = function () {
      boot.hidden = true;
      boot.classList.remove('is-off');
      desktop.hidden = false;
      startClock();
      requestAnimationFrame(function () { drawWallpaper(); clampWindows(); });
      if (!everEntered) { everEntered = true; startAmbient(); }
      var first = $('.icon');
      if (first) first.focus();
    };
    if (reduceMotion) { show(); return; }
    boot.classList.add('is-off');
    setTimeout(show, 460);
  }
  function restartOS() {
    closeStart(false);
    entered = false;
    desktop.hidden = true;
    boot.hidden = false;
    runBoot();
    $('#pressStart').focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------
     Window registry: the three programs plus the OS's own files
  ------------------------------------------------------------------ */
  APPS.forEach(function (a) { a.kind = 'app'; });
  APP_BY_ID.ci.tip = 'Compound interest (A − P) with annual compounding';
  APP_BY_ID.kap.tip = 'Squares n, splits the square, checks left + right = n';
  APP_BY_ID.mob.tip = '7 days of usage, projected to a month vs 20 GB';
  var DOCS = [
    { id: 'project', exe: 'MY PROJECT', name: 'My Project', tone: 'pink', icon: 'folder', tip: 'Folder with every project file', w: 660, h: 470 },
    { id: 'readme', exe: 'README.TXT', name: 'Read Me', tone: 'lav', icon: 'readme', tip: 'A short tour of this desktop', w: 580, h: 540 },
    { id: 'help', exe: 'HELP.HLP', name: 'Help & Legend', tone: 'cyan', icon: 'help', tip: 'Controls, symbols and commands', w: 620, h: 560 },
    { id: 'term', exe: 'TERMINAL.EXE', name: 'Terminal', tone: 'lav', icon: 'term', tip: 'Type help to see commands', w: 600, h: 420 },
    { id: 'bin', exe: 'RECYCLE.BIN', name: 'Recycle Bin', tone: 'pink', icon: 'bin', tip: 'Holds one old file', w: 500, h: 360 }
  ];
  var SPEC = {};
  APPS.forEach(function (a) { SPEC[a.id] = a; a.iconSVG = function () { return ICONS[a.id]; }; });
  DOCS.forEach(function (d) { d.kind = 'doc'; SPEC[d.id] = d; d.iconSVG = function () { return d.id === 'bin' && binEmpty ? ICONS.binEmpty : ICONS[d.icon]; }; });
  var ORDER = ['ci', 'kap', 'mob', 'project', 'readme', 'help', 'term', 'bin'];
  var binEmpty = false;

  /* ------------------------------------------------------------------
     Desktop: icons, wallpaper, clock, ambient status
  ------------------------------------------------------------------ */
  function iconButton(spec, cls) {
    return '<button class="icon has-tip ' + (cls || '') + '" type="button" data-app="' + spec.id + '" data-tip="' + esc(spec.tip) + '" aria-label="Open ' + esc(spec.id === 'project' ? 'My Project folder' : spec.name) + '">' +
      spec.iconSVG() + '<span class="icon-label">' + esc(spec.exe) + '</span>' +
      (spec.kind === 'app' ? '<span class="icon-name">' + esc(spec.name) + '</span>' : '') + '</button>';
  }
  function buildIcons() {
    $('#icons').innerHTML = '<p class="dock-title" aria-hidden="true">PROGRAMS</p>' + APPS.map(function (a) { return iconButton(a); }).join('');
    $('#files').innerHTML = ['project', 'readme', 'help', 'term'].map(function (k) { return iconButton(SPEC[k], 'icon--file'); }).join('');
    renderBinIcon();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.icon[data-app], [data-open]');
      if (!b || b.closest('.win, #startMenu')) return;
      openApp(b.dataset.app || b.dataset.open, b);
    });
  }
  function renderBinIcon() {
    $('#binSlot').innerHTML = iconButton(SPEC.bin, 'icon--file icon--bin');
  }

  /* CRT screen cycles through snippets from the latest project algorithms. */
  var CRT_SNIPPETS = [
    ['C:\\ALGO> TYPE COMPOUND.TXT', 'amount = principal * (1 + rate / 100) ** time', 'interest = amount - principal', 'DISPLAY final amount', 'DISPLAY compound interest'],
    ['C:\\ALGO> TYPE KAPREKAR.TXT', 'square = n * n', 'digits = count_digits(square)', 'divider = 10 ** i', 'left = square // divider'],
    ['C:\\ALGO> TYPE MOBDATA.TXT', 'projected = total / 7 * days', 'DISPLAY month length', 'DISPLAY weekly total', 'IF projected > LIMIT']
  ];
  var crtIndex = 0;
  function showCRT(i) {
    var lines = CRT_SNIPPETS[i];
    var pre = $('#wallCode');
    pre.innerHTML = lines.map(function (l, n) {
      return n === 0 ? '<span class="crt-cmd">' + esc(l) + '</span>' : highlight(l.trim());
    }).join('\n') + '<span class="cursor crt-cursor"></span>';
    if (!reduceMotion) { pre.classList.remove('flash'); void pre.offsetWidth; pre.classList.add('flash'); }
  }

  var STATUS_MSGS = [
    'Compounding annually OK',
    'Splitting n² ....... OK',
    'Projecting selected month OK',
    'Drawing flowcharts . OK',
    'Phosphor at 98% .... OK',
    'Checking calendar days .. OK'
  ];
  var statusIndex = 0, ambientTimer = null;
  function startAmbient() {
    showCRT(0);
    renderSysmon();
    if (ambientTimer) return;
    ambientTimer = setInterval(function () {
      if (desktop.hidden || document.hidden) return;
      crtIndex = (crtIndex + 1) % CRT_SNIPPETS.length;
      showCRT(crtIndex);
      statusIndex = (statusIndex + 1) % STATUS_MSGS.length;
      var m = $('#sysMsg'); if (m) m.textContent = STATUS_MSGS[statusIndex];
    }, 7000);
  }

  function renderSysmon() {
    var rows = APPS.map(function (a) {
      var w = wins[a.id], state = !w ? 'idle' : (w.el.hidden ? 'min' : 'run');
      var bar = state === 'run' ? '████████' : state === 'min' ? '████░░░░' : '░░░░░░░░';
      var label = state === 'run' ? 'RUN' : state === 'min' ? 'MIN' : 'IDLE';
      return '<button type="button" class="sys-row" data-sys="' + a.id + '" data-state="' + state + '" aria-label="' + a.name + ': ' + (state === 'idle' ? 'not open, open it' : state === 'min' ? 'minimised, restore it' : 'open, bring to front') + '">' +
        '<span>' + a.exe + '</span><b aria-hidden="true">' + bar + '</b><span class="sys-state">' + label + '</span></button>';
    }).join('');
    var open = Object.keys(wins).length;
    $('#sysRows').innerHTML = rows;
    $('#sysMem').textContent = 'MEM 640K · ' + open + (open === 1 ? ' WINDOW' : ' WINDOWS') + ' OPEN';
  }

  var clockTimer = null;
  function startClock() {
    var el = $('#clock');
    var upd = function () {
      var d = new Date();
      el.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      el.title = d.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };
    upd();
    if (!clockTimer) clockTimer = setInterval(upd, 15000);
  }

  /* Tip of the day */
  var TIPS = [
    'Click any program in the PROGRAMS dock to open it.',
    'Each program has six tabs: Problem, Pseudocode, Code, Explanation, Flowchart and Try it.',
    'Drag a window by its title bar. Drag the corner grip to resize it.',
    'Double-click a title bar to enlarge a window. Press Esc to close the front window.',
    'In KAPREKAR.EXE, open Try it and enter 297. 297 squared is 88209, and 88 + 209 = 297.',
    'In MOBDATA.EXE, choose a month. February also asks for a year to check leap years.',
    'The CRT on the desk is a terminal. Click its screen and type help.',
    'Every open window has a button on the taskbar, so nothing gets lost.'
  ];
  var tipIndex = 0;
  function showTip(i) {
    tipIndex = (i + TIPS.length) % TIPS.length;
    $('#tipText').textContent = TIPS[tipIndex];
    $('#tipCount').textContent = 'Tip ' + (tipIndex + 1) + ' of ' + TIPS.length;
  }

  /* ------------------------------------------------------------------
     Pixel wallpaper: ordered-dither sky, sun, mountains, grid floor
  ------------------------------------------------------------------ */
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function hexRGB(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function drawWallpaper() {
    var cv = $('#wallpaper');
    if (!cv || desktop.hidden) return;
    cv.style.height = '0px';
    var W = workspace.clientWidth, H = Math.max(workspace.clientHeight, workspace.scrollHeight);
    cv.style.height = H + 'px';
    var P = 3, w = Math.ceil(W / P), h = Math.ceil(H / P);
    if (w < 2 || h < 2) return;
    cv.width = w; cv.height = h;
    var ctx = cv.getContext('2d');
    var img = ctx.createImageData(w, h), d = img.data;
    var floor = $('.floor');
    var hasFloor = getComputedStyle(floor).display !== 'none';
    var hz = hasFloor ? Math.round(floor.offsetTop / P) : h;
    function put(x, y, c) { if (x < 0 || y < 0 || x >= w || y >= h) return; var i = (y * w + x) * 4; d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255; }
    function ramp(pal, t, x, y) {
      var p = Math.max(0, Math.min(0.9999, t)) * (pal.length - 1), i = Math.floor(p), f = p - i;
      return f * 16 > BAYER[(y % 4) * 4 + (x % 4)] ? pal[Math.min(i + 1, pal.length - 1)] : pal[i];
    }
    var SKY = ['#FCE8F2', '#F9DAEA', '#F5CDE3', '#EEC2E4', '#E2B8EA', '#D3ADEB'].map(hexRGB);
    var x, y;
    for (y = 0; y < Math.min(hz, h); y++) for (x = 0; x < w; x++) put(x, y, ramp(SKY, y / Math.max(1, hz), x, y));

    // pixel clouds
    var WHITE = hexRGB('#FFFFFF'), CLOUD_SH = hexRGB('#F3C6DE');
    [[0.12, 0.12, 1], [0.44, 0.07, 0.8], [0.66, 0.18, 1.1], [0.9, 0.08, 0.7], [0.3, 0.26, 0.6]].forEach(function (c) {
      var cx = Math.round(w * c[0]), cy = Math.round(Math.min(hz, h) * c[1]), s = c[2];
      var rows = [[6, 10], [3, 20], [0, 28], [2, 26]];
      rows.forEach(function (r, i) {
        var len = Math.round(r[1] * s), off = Math.round(r[0] * s);
        for (var k = 0; k < len; k++) put(cx + off + k, cy + i * 2, i === 3 ? CLOUD_SH : WHITE), put(cx + off + k, cy + i * 2 + 1, i >= 2 ? CLOUD_SH : WHITE);
      });
    });

    if (hz > 20) {
      // striped sun sitting on the horizon
      var SUN = ['#FFE08A', '#FFD06E', '#FFB59A', '#F7A0BF', '#E98ABC'].map(hexRGB);
      var r = Math.round(Math.min(hz * 0.42, w * 0.12, 72)), scx = Math.round(w * (w * P > 1300 ? 0.84 : 0.5)), stripeStart = hz - r * 0.55;
      for (y = hz - r; y < hz; y++) {
        if (y > stripeStart) {
          var k = (y - stripeStart) / (r * 0.55), period = 7 - Math.floor(k * 3), gap = 1 + Math.floor(k * 2);
          if (((y - Math.floor(stripeStart)) % period) < gap) continue;
        }
        var half = Math.floor(Math.sqrt(r * r - (hz - y) * (hz - y)));
        for (x = scx - half; x <= scx + half; x++) put(x, y, ramp(SUN, (y - (hz - r)) / r, x, y));
      }
      // stepped mountain ranges
      var BACK = ['#E6CDF4', '#D2B4EE'].map(hexRGB), FRONT = ['#A57ACB', '#9164B9', '#7E54A8'].map(hexRGB), RIDGE = hexRGB('#E98ABC');
      for (x = 0; x < w; x++) {
        var xb = Math.floor(x / 2) * 2;
        var hb = Math.round(hz * 0.10 + hz * 0.07 * (Math.sin(xb * 0.021 + 1.3) + 0.6 * Math.sin(xb * 0.047 + 0.4) + 1.2));
        var hf = Math.round(hz * 0.05 + hz * 0.05 * (Math.sin(xb * 0.033 + 2.1) + 0.5 * Math.sin(xb * 0.09 + 0.7) + 1.1));
        if (Math.abs(x - scx) < r * 0.9) { hb = Math.round(hb * 0.45); hf = Math.round(hf * 0.5); }
        for (y = hz - hb; y < hz; y++) put(x, y, ramp(BACK, (y - (hz - hb)) / Math.max(1, hb), x, y));
        for (y = hz - hf; y < hz; y++) put(x, y, y === hz - hf ? RIDGE : ramp(FRONT, (y - (hz - hf)) / Math.max(1, hf), x, y));
      }
    }

    if (hasFloor && hz < h) {
      var CY = hexRGB('#51E5E0'), TEAL = hexRGB('#142A32'), HAZE = hexRGB('#2A4F5E'), GRID = hexRGB('#9164B9'), GRID_HI = hexRGB('#B994DC');
      for (x = 0; x < w; x++) put(x, hz, CY);
      for (y = hz + 1; y < h; y++) for (x = 0; x < w; x++) {
        var t2 = (y - hz) / 10;
        put(x, y, t2 < 1 && t2 * 16 < 16 - BAYER[(y % 4) * 4 + (x % 4)] ? HAZE : TEAL);
      }
      for (var i2 = 1; ; i2++) {
        var gy = hz + Math.round(i2 * i2 * 0.9);
        if (gy >= h) break;
        for (x = 0; x < w; x++) put(x, gy, i2 < 3 ? GRID_HI : GRID);
      }
      var vpx = w / 2, span = w * 1.6;
      for (var j = -12; j <= 12; j++) {
        var bx = vpx + j * span / 24, steps = Math.max(Math.abs(bx - vpx), h - hz);
        for (var s2 = 0; s2 <= steps; s2++) put(Math.round(vpx + (bx - vpx) * s2 / steps), Math.round(hz + (h - hz) * s2 / steps), GRID);
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ------------------------------------------------------------------
     Optional demos: they run the pseudocode as written
  ------------------------------------------------------------------ */
  function parseNumber(s) { s = String(s).trim(); if (s === '') return NaN; var v = Number(s); return isFinite(v) ? v : NaN; }
  function show(v, dp) { return Number(v.toFixed(dp == null ? 2 : dp)).toLocaleString('en-US', { maximumFractionDigits: dp == null ? 2 : dp }); }
  function outLine(text, cls) { return '<div class="out-line ' + (cls || '') + '">' + text + '</div>'; }

  function runCompound(pS, rS, tS) {
    var p = parseNumber(pS), r = parseNumber(rS), t = parseNumber(tS), out = [];
    out.push(outLine('CALL calculate_compound_interest(' + esc(String(pS).trim() || '""') + ', ' + esc(String(rS).trim() || '""') + ', ' + esc(String(tS).trim() || '""') + ')', 'dim'));
    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      out.push(outLine('The value entered could not be converted to a number before the function call.', 'err'));
      return out.join('');
    }
    if (p <= 0) { out.push(outLine('IF principal <= 0 → TRUE', 'dim')); out.push(outLine('Error: principal must be greater than 0.', 'err')); return out.join(''); }
    out.push(outLine('principal > 0 → continue', 'dim'));
    if (r < 0) { out.push(outLine('ELSE IF rate < 0 → TRUE', 'dim')); out.push(outLine('Error: rate cannot be negative.', 'err')); return out.join(''); }
    out.push(outLine('rate >= 0 → continue', 'dim'));
    if (t <= 0) { out.push(outLine('ELSE IF time <= 0 → TRUE', 'dim')); out.push(outLine('Error: time must be greater than 0.', 'err')); return out.join(''); }
    out.push(outLine('time > 0 → continue', 'dim'));
    var result = compoundInterest(p, r, t);
    if (result.error) { out.push(outLine(result.error, 'err')); return out.join(''); }
    if (!isFinite(result.amount)) { out.push(outLine('The final amount is too large for this demo to display.', 'err')); return out.join(''); }
    out.push(outLine('amount = ' + show(p) + ' * (1 + ' + show(r, 6) + ' / 100) ** ' + show(t, 6) + ' = ' + show(result.amount)));
    out.push(outLine('interest = ' + show(result.amount) + ' - ' + show(p) + ' = ' + show(result.interest)));
    out.push(outLine('Final amount: ' + show(result.amount), 'ok'));
    out.push(outLine('Compound interest: ' + show(result.interest), 'ret'));
    return out.join('');
  }

  function runKaprekar(nS) {
    var raw = String(nS).trim(), v = parseNumber(raw), out = [];
    out.push(outLine('INPUT n = ' + esc(raw || '(blank)'), 'dim'));
    if (isNaN(v) || !Number.isInteger(v) || v <= 0) {
      out.push(outLine('n <= 0 OR n % 1 != 0 → TRUE', 'dim'));
      out.push(outLine('Error: input must be a positive integer.', 'err'));
      return { html: out.join(''), table: '' };
    }
    if (v > 94906265) {
      out.push(outLine('This interactive trace is limited to n <= 94,906,265 so n * n stays within the safe integer range.', 'err'));
      return { html: out.join(''), table: '' };
    }
    var k = kapCalc(v);
    out.push(outLine('square = ' + v + ' * ' + v + ' = ' + k.sq));
    out.push(outLine('digits = count_digits(square) = ' + k.digits));
    k.rows.forEach(function (r) {
      out.push(outLine('i = ' + r.i + ' · divider = 10 ** ' + r.i + ' = ' + r.divider));
      out.push(outLine('left = ' + k.sq + ' // ' + r.divider + ' = ' + r.left));
      out.push(outLine('right = ' + k.sq + ' % ' + r.divider + ' = ' + r.right));
      out.push(outLine('right > 0 AND left + right == n → ' + (r.ok ? 'TRUE' : 'FALSE'), r.ok ? 'ok' : 'dim'));
      if (r.ok) out.push(outLine('isKaprekar = TRUE · stop checking further splits', 'ok'));
    });
    out.push(outLine(k.found ? v + ' is a Kaprekar number' : v + ' is not a Kaprekar number', k.found ? 'ok' : 'err'));
    return { html: out.join(''), table: kapTrace(v) };
  }

  function daysInMonth(month, year) {
    if (month === 2) {
      var leap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
      return leap ? 29 : 28;
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
    return 31;
  }

  function runMobile(monthS, yearS, values) {
    var out = [], total = 0, month = parseNumber(monthS), year = null, days;
    out.push(outLine('LIMIT = 20 GB', 'dim'));
    if (isNaN(month) || !Number.isInteger(month) || month < 1 || month > 12) {
      out.push(outLine('Error: month must be a whole number from 1 to 12.', 'err'));
      return { html: out.join(''), badField: 'month', bad: -1 };
    }
    out.push(outLine('month = ' + month, 'dim'));
    if (month === 2) {
      year = parseNumber(yearS);
      if (isNaN(year) || !Number.isInteger(year) || year < 1) {
        out.push(outLine('Error: year must be a whole number, 1 or more.', 'err'));
        return { html: out.join(''), badField: 'year', bad: -1 };
      }
      var leap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
      out.push(outLine('year = ' + year + ' · leap year = ' + leap, 'dim'));
    }
    days = daysInMonth(month, year || 2001);
    out.push(outLine('Month has ' + days + ' days', 'dim'));
    for (var d = 0; d < 7; d++) {
      var u = parseNumber(values[d]);
      if (isNaN(u) || u < 0) {
        out.push(outLine('Day ' + (d + 1) + ': invalid usage = ' + esc(String(values[d]).trim() || '(blank)'), 'dim'));
        out.push(outLine('Error: usage cannot be negative or blank. Try again for the same day.', 'err'));
        return { html: out.join(''), badField: 'day', bad: d };
      }
      total += u;
      out.push(outLine('Day ' + (d + 1) + ' accepted: ' + show(u, 4) + ' GB', 'dim'));
    }
    total = Number(total.toFixed(10));
    var average = total / 7;
    var projected = Number((average * days).toFixed(10));
    out.push(outLine('Total weekly usage: ' + show(total, 4) + ' GB', 'ok'));
    out.push(outLine('Average daily usage = ' + show(total, 4) + ' / 7 = ' + show(average, 4) + ' GB', 'dim'));
    out.push(outLine('Projected monthly usage = ' + show(average, 4) + ' * ' + days + ' = ' + show(projected, 4) + ' GB', 'dim'));
    out.push(outLine('Projected monthly usage: ' + show(projected, 4) + ' GB', 'ok'));
    if (projected > 20) {
      out.push(outLine('Warning: you may exceed the 20 GB limit by about ' + show(projected - 20, 4) + ' GB.', 'err'));
    } else {
      out.push(outLine('You are within the 20 GB limit.', 'ret'));
    }
    return { html: out.join(''), badField: '', bad: -1 };
  }

  var MOB_SAMPLE = ['0.8', '0.7', '0.9', '0.6', '0.8', '0.7', '0.8'];
  function demoHTML(id) {
    var note = '<p class="demo-note">Optional interactive demonstration of the supplied program logic. Change the inputs and press RUN.</p>';
    if (id === 'ci') {
      return '<div class="panel panel--wide demo"><h3>TRY IT</h3>' + note +
        '<form class="demo-form" data-demo="ci" autocomplete="off">' +
        '<label for="ci-p">principal<input id="ci-p" name="p" value="10000" inputmode="decimal"></label>' +
        '<label for="ci-r">rate (%)<input id="ci-r" name="r" value="10" inputmode="decimal"></label>' +
        '<label for="ci-t">time (years)<input id="ci-t" name="t" value="2" inputmode="decimal"></label>' +
        '<button type="submit" class="pxbtn pxbtn--sm pxbtn--cyan">RUN</button></form>' +
        '<div class="presets" role="group" aria-label="Example inputs"><span>Examples:</span>' +
        '<button type="button" class="chip-btn" data-preset="10000|10|2">Document example</button>' +
        '<button type="button" class="chip-btn" data-preset="0|10|2">Zero principal</button>' +
        '<button type="button" class="chip-btn" data-preset="10000|-1|2">Negative rate</button>' +
        '<button type="button" class="chip-btn" data-preset="5000|0|3">Rate of 0</button></div>' +
        '<div class="demo-out" aria-live="polite"></div></div>';
    }
    if (id === 'kap') {
      return '<div class="panel panel--wide demo"><h3>TRY IT</h3>' + note +
        '<form class="demo-form" data-demo="kap" autocomplete="off">' +
        '<label for="kap-n">n<input id="kap-n" name="n" value="45" inputmode="numeric"></label>' +
        '<button type="submit" class="pxbtn pxbtn--sm pxbtn--cyan">RUN</button></form>' +
        '<div class="presets" role="group" aria-label="Example inputs"><span>Examples:</span>' +
        ['45', '297', '4879', '10', '1'].map(function (v) { return '<button type="button" class="chip-btn" data-preset="' + v + '">' + v + '</button>'; }).join('') +
        '<button type="button" class="chip-btn" data-preset="4.5">4.5 (invalid)</button></div>' +
        '<div class="demo-out" aria-live="polite"></div><div class="demo-table"></div></div>';
    }
    return '<div class="panel panel--wide demo"><h3>TRY IT</h3>' + note +
      '<form class="demo-form demo-form--days" data-demo="mob" autocomplete="off">' +
      '<label for="mob-month">month (1–12)<input id="mob-month" name="month" value="11" inputmode="numeric"></label>' +
      '<label for="mob-year">year (February only)<input id="mob-year" name="year" value="2026" inputmode="numeric"></label>' +
      MOB_SAMPLE.map(function (v, i) { return '<label for="mob-d' + i + '">Day ' + (i + 1) + ' (GB)<input id="mob-d' + i + '" name="d' + i + '" value="' + v + '" inputmode="decimal"></label>'; }).join('') +
      '<button type="submit" class="pxbtn pxbtn--sm pxbtn--cyan">RUN</button></form>' +
      '<div class="presets" role="group" aria-label="Example inputs"><span>Examples:</span>' +
      '<button type="button" class="chip-btn" data-preset="11|2026|' + MOB_SAMPLE.join('|') + '">November · 30 days</button>' +
      '<button type="button" class="chip-btn" data-preset="2|2024|' + MOB_SAMPLE.join('|') + '">February 2024 · leap year</button>' +
      '<button type="button" class="chip-btn" data-preset="2|2025|' + MOB_SAMPLE.join('|') + '">February 2025 · 28 days</button>' +
      '<button type="button" class="chip-btn" data-preset="11|2026|0.8|0.7|abc|0.6|0.8|0.7|0.8">Invalid daily value</button></div>' +
      '<p class="demo-note">The monthly estimate uses average daily usage multiplied by the actual number of days in the selected month.</p>' +
      '<div class="demo-out" aria-live="polite"></div></div>';
  }

  function bindDemo(id, body) {
    var form = body.querySelector('.demo-form');
    if (!form) return;
    var outEl = body.querySelector('.demo-out');
    var run = function () {
      if (id === 'ci') outEl.innerHTML = runCompound(form.p.value, form.r.value, form.t.value);
      else if (id === 'kap') {
        var k = runKaprekar(form.n.value);
        outEl.innerHTML = k.html;
        body.querySelector('.demo-table').innerHTML = k.table || '';
      } else {
        var vals = [0, 1, 2, 3, 4, 5, 6].map(function (i) { return form['d' + i].value; });
        var m = runMobile(form.month.value, form.year.value, vals);
        outEl.innerHTML = m.html;
        form.querySelectorAll('input').forEach(function (inp) {
          inp.removeAttribute('aria-invalid');
        });
        if (m.badField === 'month') form.month.setAttribute('aria-invalid', 'true');
        if (m.badField === 'year') form.year.setAttribute('aria-invalid', 'true');
        if (m.badField === 'day' && m.bad >= 0) {
          form['d' + m.bad].setAttribute('aria-invalid', 'true');
          form['d' + m.bad].focus();
        } else if (m.badField === 'month') form.month.focus();
        else if (m.badField === 'year') form.year.focus();
      }
      blip(1320, 0.04);
    };
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    if (id === 'mob') {
      var monthInput = form.month;
      var yearInput = form.year;
      var syncYear = function () { yearInput.disabled = String(monthInput.value) !== '2'; };
      monthInput.addEventListener('input', syncYear);
      syncYear();
    }
    body.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var vals = b.dataset.preset.split('|');
        form.querySelectorAll('input').forEach(function (inp, i) { inp.value = vals[i] != null ? vals[i] : ''; });
        if (id === 'mob') form.year.disabled = String(form.month.value) !== '2';
        run();
      });
    });
    run();
  }

  /* ------------------------------------------------------------------
     OS documents: folder, read me, help, terminal, recycle bin
  ------------------------------------------------------------------ */
  var FILES = [
    { id: 'ci', type: 'Program', desc: 'Returns the compound interest (A − P) for annual compounding, or shows an error if any input is invalid.' },
    { id: 'kap', type: 'Program', desc: 'Squares n, splits the square into two parts and checks that left + right = n.' },
    { id: 'mob', type: 'Program', desc: 'Accepts a month, a February year when needed, and 7 daily data values; projects average daily usage across the actual month length against 20 GB.' },
    { id: 'readme', type: 'Text document', desc: 'A short tour of this desktop and how to get around it.' },
    { id: 'help', type: 'Help file', desc: 'Window controls, flowchart symbols, pseudocode colours and terminal commands.' },
    { id: 'term', type: 'Program', desc: 'A command line. Type help for the list of commands.' },
    { id: 'source', type: 'Project source', desc: 'Current EW5 Python code, pseudocode and the three supplied flowcharts used by this dashboard.' }
  ];
  function fileName(f) { return f.id === 'source' ? 'IAP_PROJECT_WAS_E5.FILES' : SPEC[f.id].exe; }
  function fileIcon(f) { return f.id === 'source' ? ICONS.pdf : SPEC[f.id].iconSVG(); }

  function docHTML(id) {
    if (id === 'project') {
      return '<div class="explorer"><div class="ex-path"><span class="ex-label">Address</span><span class="ex-addr">C:\\ALGO\\</span><span class="ex-count">' + FILES.length + ' objects</span></div>' +
        '<div class="ex-main"><div class="ex-grid" role="listbox" aria-label="Files in C:\\ALGO">' +
        FILES.map(function (f, i) {
          return '<button type="button" class="ex-file" role="option" aria-selected="' + (i === 0) + '" data-file="' + f.id + '">' + fileIcon(f) + '<span>' + fileName(f) + '</span></button>';
        }).join('') + '</div><aside class="ex-detail" aria-live="polite"></aside></div>' +
        '<p class="ex-hint">Click a file to see its details. Double-click, or press Enter, to open it.</p></div>';
    }
    if (id === 'readme') {
      return '<div class="notepad"><div class="np-menu" aria-hidden="true"><span>File</span><span>Edit</span><span>Search</span><span>Help</span></div><div class="np-page">' +
        '<h3>WELCOME TO ALGO-OS 98</h3>' +
        '<p>This desktop presents the <strong>Introduction to Algorithm &amp; Programming</strong> project: three programs, each with its problem, pseudocode, explanation and flowchart.</p>' +
        '<h3>OPEN A PROGRAM</h3><ul>' +
        '<li>Click an icon in the <strong>PROGRAMS</strong> dock: Compound Interest, Kaprekar Number or Mobile Data Usage.</li>' +
        '<li>You can also use the <strong>START</strong> menu, the quick-launch icons on the taskbar, or the SYSMON panel.</li>' +
        '<li>Inside a program, use the tabs: Problem, Pseudocode, Code, Explanation, Flowchart and Try it.</li>' + '<li><strong>Try it</strong> runs an interactive demonstration with your own values.</li></ul>' +
        '<h3>MOVE AROUND</h3><ul>' +
        '<li>Drag a window by its title bar. Drag the striped corner to resize it.</li>' +
        '<li>Use the title-bar buttons to minimise, enlarge or close a window. Double-clicking the title bar also enlarges it.</li>' +
        '<li>Press <kbd>Esc</kbd> to close the front window. Taskbar buttons bring back minimised windows.</li>' +
        '<li>The ⌂ button on the taskbar clears the desktop. The ◂ DESKTOP button in each window closes it.</li></ul>' +
        '<h3>ABOUT THE CONTENT</h3>' +
        '<p>The project workspace contains the latest supplied EW5 problem statements, pseudocode, Python code and flowcharts. Open each application and use its six tabs to explore the material.</p>' +
        '</div></div>';
    }
    if (id === 'help') {
      return '<div class="panel">' +
        '<h3>WINDOW CONTROLS</h3><table class="trace keys"><tbody>' +
        '<tr><td>Title bar</td><td>Drag to move · double-click to enlarge</td></tr>' +
        '<tr><td>' + GLYPH.min + ' Minimise</td><td>Hide to the taskbar</td></tr>' +
        '<tr><td>' + GLYPH.max + ' Enlarge</td><td>Fill the desktop · press again to restore</td></tr>' +
        '<tr><td>' + GLYPH.close + ' Close</td><td>Close the window (or press Esc)</td></tr>' +
        '<tr><td>Corner grip</td><td>Drag to resize</td></tr>' +
        '<tr><td>Tabs</td><td>Click, or use ← → Home End</td></tr></tbody></table>' +
        '<h3>FLOWCHART SYMBOLS</h3>' + LEGEND +
        '<p class="chart-note">Arrows show the order of steps. YES and NO label the two exits of a decision.</p>' +
        '<h3>PSEUDOCODE COLOURS</h3><ul class="color-key">' +
        '<li><i style="background:#51E5E0"></i>Keywords such as IF, FOR, RETURN</li><li><i style="background:#E98ABC"></i>Assignment arrow &lt;-</li>' +
        '<li><i style="background:#FFB3D9"></i>Text in quotes</li><li><i style="background:#FFD866"></i>Numbers</li></ul>' +
        '<h3>TERMINAL COMMANDS</h3><table class="trace keys"><tbody>' + TERM_HELP.map(function (c) { return '<tr><td><code>' + esc(c[0]) + '</code></td><td>' + esc(c[1]) + '</td></tr>'; }).join('') + '</tbody></table>' +
        '</div>';
    }
    if (id === 'term') {
      return '<div class="term"><div class="term-out" aria-live="polite"></div>' +
        '<form class="term-line" autocomplete="off"><label for="term-in">C:\\ALGO&gt;</label><input id="term-in" spellcheck="false" autocapitalize="off" aria-label="Command"></form></div>';
    }
    // recycle bin
    return '<div class="bin">' + (binEmpty
      ? '<div class="bin-empty">' + ICONS.binEmpty + '<p>The Recycle Bin is empty.</p></div>'
      : '<ul class="bin-list"><li class="bin-item">' + ICONS.readme + '<div><p class="bin-name">ANY_SPLIT.OLD</p>' +
        '<p>An earlier Kaprekar approach used one fixed split based on the digit count of n. The current version checks successive right-part lengths using the number of digits in n squared.</p></div></li></ul>') +
      '<div class="bin-actions"><button type="button" class="pxbtn pxbtn--sm" data-act="empty-bin"' + (binEmpty ? ' disabled' : '') + '>EMPTY RECYCLE BIN</button></div></div>';
  }

  var TERM_HELP = [
    ['help', 'List the commands'],
    ['dir', 'List the files in C:\\ALGO'],
    ['open <name>', 'Open compound, kaprekar, mobdata, readme, help, project or bin'],
    ['ci <principal> <rate> <time>', 'Run calculate_compound_interest'],
    ['kaprekar <n>', 'Run kaprekar_number'],
    ['mobdata <month> [year] <7 values>', 'Run the month-aware mobile data program'],
    ['ver', 'Show the system version'],
    ['date', 'Show the date and time'],
    ['cls', 'Clear the screen'],
    ['exit', 'Close the terminal']
  ];
  var OPEN_ALIASES = { compound: 'ci', ci: 'ci', 'compound.exe': 'ci', kaprekar: 'kap', kap: 'kap', 'kaprekar.exe': 'kap', mobdata: 'mob', mob: 'mob', mobile: 'mob', 'mobdata.exe': 'mob', readme: 'readme', 'readme.txt': 'readme', help: 'help', 'help.hlp': 'help', project: 'project', folder: 'project', bin: 'bin', 'recycle.bin': 'bin', terminal: 'term', term: 'term' };
  function stripTags(h) { var t = document.createElement('div'); t.innerHTML = h.replace(/<\/div>/g, '\n'); return t.textContent.trim(); }
  function termExec(cmdline, print) {
    var parts = cmdline.trim().split(/\s+/), cmd = (parts[0] || '').toLowerCase(), args = parts.slice(1);
    if (!cmd) return;
    if (cmd === 'help') { print(TERM_HELP.map(function (c) { return (c[0] + '                              ').slice(0, 30) + c[1]; }).join('\n')); return; }
    if (cmd === 'dir') { print(' Directory of C:\\ALGO\n\n' + FILES.map(function (f) { return '  ' + (fileName(f) + '                ').slice(0, 16) + f.type; }).join('\n') + '\n\n  ' + FILES.length + ' file(s)'); return; }
    if (cmd === 'ver') { print('ALGO-OS 98 [Version 1.0]'); return; }
    if (cmd === 'date') { print(new Date().toString()); return; }
    if (cmd === 'cls') { print(null); return; }
    if (cmd === 'exit') { closeApp('term'); return; }
    if (cmd === 'open' || cmd === 'run' || cmd === 'start') {
      var target = OPEN_ALIASES[(args[0] || '').toLowerCase()];
      if (!target) { print('Usage: open compound | kaprekar | mobdata | readme | help | project | bin'); return; }
      print('Opening ' + SPEC[target].exe + ' ...'); openApp(target); return;
    }
    if (cmd === 'ci' || cmd === 'compound') {
      if (args.length !== 3) { print('Usage: ci <principal> <rate> <time>    e.g. ci 10000 10 2'); return; }
      print(stripTags(runCompound(args[0], args[1], args[2]))); return;
    }
    if (cmd === 'kaprekar' || cmd === 'kap') {
      if (args.length !== 1) { print('Usage: kaprekar <n>    e.g. kaprekar 45'); return; }
      print(stripTags(runKaprekar(args[0]).html)); return;
    }
    if (cmd === 'mobdata' || cmd === 'mob') {
      var monthArg = args[0], monthNum = parseNumber(monthArg), yearArg = null, valueStart = 1;
      if (monthNum === 2) { yearArg = args[1]; valueStart = 2; }
      var dayArgs = args.slice(valueStart);
      if (dayArgs.length !== 7) { print('Usage: mobdata <month> [year for February] <7 daily values>    e.g. mobdata 11 0.8 0.7 0.9 0.6 0.8 0.7 0.8'); return; }
      print(stripTags(runMobile(monthArg, yearArg, dayArgs).html)); return;
    }
    print('Bad command or file name. Type help for the list of commands.');
  }

  function bindDoc(id, el) {
    var body = el.querySelector('.win-body');
    if (id === 'project') {
      var detail = body.querySelector('.ex-detail');
      var select = function (btn) {
        body.querySelectorAll('.ex-file').forEach(function (b) { b.setAttribute('aria-selected', String(b === btn)); b.tabIndex = b === btn ? 0 : -1; });
        var f = FILES.filter(function (x) { return x.id === btn.dataset.file; })[0];
        detail.innerHTML = '<div class="ex-big">' + fileIcon(f) + '</div><p class="ex-name">' + fileName(f) + '</p><p class="ex-type">' + f.type + '</p><p>' + esc(f.desc) + '</p>' +
          (f.id === 'source' ? '<p class="ex-type">Its contents are shown inside each program.</p>' : '<button type="button" class="pxbtn pxbtn--sm pxbtn--cyan" data-act="open-file" data-file="' + f.id + '">OPEN</button>');
      };
      var files = body.querySelectorAll('.ex-file');
      files.forEach(function (b, i) {
        b.tabIndex = i === 0 ? 0 : -1;
        b.addEventListener('click', function () { select(b); });
        b.addEventListener('dblclick', function () { if (b.dataset.file !== 'source') openApp(b.dataset.file); });
        b.addEventListener('keydown', function (e) {
          var list = Array.prototype.slice.call(files), idx = list.indexOf(b), next = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = list[Math.min(idx + 1, list.length - 1)];
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = list[Math.max(idx - 1, 0)];
          if (e.key === 'Enter') { e.preventDefault(); if (b.dataset.file !== 'source') openApp(b.dataset.file); }
          if (next) { e.preventDefault(); select(next); next.focus(); }
        });
      });
      select(files[0]);
    }
    if (id === 'term') {
      var out = body.querySelector('.term-out'), input = body.querySelector('#term-in'), history = [], hpos = 0;
      var print = function (text, cls) {
        if (text === null) { out.innerHTML = ''; return; }
        var p = document.createElement('div');
        p.className = 'term-print ' + (cls || '');
        p.textContent = text;
        out.appendChild(p);
        body.scrollTop = body.scrollHeight;
      };
      print('ALGO-OS 98 [Version 1.0]\nType help for the list of commands.\n', 'dim');
      body.querySelector('.term-line').addEventListener('submit', function (e) {
        e.preventDefault();
        var v = input.value;
        print('C:\\ALGO> ' + v, 'echo');
        if (v.trim()) { history.push(v); hpos = history.length; }
        input.value = '';
        termExec(v, print);
        blip(990, 0.02);
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); hpos = Math.max(0, hpos - 1); input.value = history[hpos]; }
        if (e.key === 'ArrowDown' && history.length) { e.preventDefault(); hpos = Math.min(history.length, hpos + 1); input.value = history[hpos] || ''; }
      });
      body.addEventListener('click', function (e) { if (!e.target.closest('input, button, a') && !window.getSelection().toString()) input.focus(); });
    }
  }

  /* ------------------------------------------------------------------
     Window manager
  ------------------------------------------------------------------ */
  var wins = {};       // id -> {el, opener, tab, zoom}
  var zTop = 10, cascade = 0, activeId = null;
  var winsRoot = $('#windows'), workspace = $('#workspace');
  var MIN_W = 340, MIN_H = 260;

  function panelHTML(app, idx) {
    if (idx === 0) return '<div class="panel">' + app.problem + '</div>';
    if (idx === 3) return '<div class="panel">' + app.explain + '</div>';
    if (idx === 5) return demoHTML(app.id);
    if (idx === 1) {
      var lines = PSEUDO[app.id];
      var code = lines.map(function (l, i) { return '<span class="ln">' + (i + 1) + '</span>' + highlight(l); }).join('\n');
      return '<div class="panel panel--wide"><div class="crt-frame">' +
        '<div class="code-head"><span class="code-name">' + app.exe.replace('.EXE', '_PSEUDOCODE.TXT') + '</span>' +
        '<button type="button" class="pxbtn pxbtn--sm pxbtn--cyan" data-act="copy" data-copy-source="pseudo">COPY</button></div>' +
        '<div class="code" tabindex="0" aria-label="Pseudocode for ' + app.name + '"><pre>' + code + '</pre></div>' +
        '<div class="code-legend" aria-hidden="true"><span><i style="background:#51E5E0"></i>keyword</span><span><i style="background:#E98ABC"></i>assignment / operator</span><span><i style="background:#FFB3D9"></i>text</span><span><i style="background:#FFD866"></i>number</span></div>' +
        '</div></div>';
    }
    if (idx === 2) {
      var pyLines = PYTHON[app.id].split('\n');
      var pyHTML = pyLines.map(function (l, i) { return '<span class="ln">' + (i + 1) + '</span>' + highlightPython(l); }).join('\n');
      return '<div class="panel panel--wide"><div class="crt-frame">' +
        '<div class="code-head"><span class="code-name">' + app.exe.replace('.EXE', '.PY') + '</span>' +
        '<button type="button" class="pxbtn pxbtn--sm pxbtn--cyan" data-act="copy" data-copy-source="python">COPY CODE</button></div>' +
        '<div class="code code--python" tabindex="0" aria-label="Python code for ' + app.name + '"><pre>' + pyHTML + '</pre></div>' +
        '<div class="code-legend" aria-hidden="true"><span><i style="background:#51E5E0"></i>keywords</span><span><i style="background:#FFB3D9"></i>strings</span><span><i style="background:#FFD866"></i>numbers</span><span><i style="background:#5CFF8A"></i>comments</span></div>' +
        '</div></div>';
    }
    var FIG = {
      ci: 'User-supplied compound-interest flowchart: input principal, rate and time; validate principal greater than zero, rate non-negative and time greater than zero; calculate amount and interest; display both results or show the relevant error.',
      kap: 'User-supplied Kaprekar flowchart: validate a positive integer, square it, count the square digits, test successive divisors and splits, and display whether the number is Kaprekar.',
      mob: 'User-supplied mobile-data flowchart: validate month and February year, determine the month length, accept seven non-negative daily usage values, project average daily usage across the month, and compare with the 20 GB limit.'
    };
    var w = wins[app.id];
    var zoom = (w && w.zoom) || (isNarrow() || (w && w.el.clientWidth < 720) ? 'zoom' : 'fit');
    var chartFile = { ci: 'flowchart_compound_interest.jpg', kap: 'flowchart_kaprekar_number.jpg', mob: 'flowchart_mobile_data_usage.jpg' }[app.id];
    return '<div class="panel panel--wide"><div class="chart-head"><h3>FLOWCHART</h3>' +
      '<div class="seg" role="group" aria-label="Flowchart size">' +
      '<button type="button" class="seg-btn" data-act="zoom" data-zoom="fit" aria-pressed="' + (zoom === 'fit') + '">FIT</button>' +
      '<button type="button" class="seg-btn" data-act="zoom" data-zoom="zoom" aria-pressed="' + (zoom === 'zoom') + '">ZOOM</button>' +
      '<button type="button" class="seg-btn" data-act="max" aria-pressed="' + !!(w && w.el.classList.contains('is-max')) + '">ENLARGE</button></div></div>' +
      '<div class="chart chart--source" data-zoom="' + zoom + '" tabindex="0" aria-label="Flowchart, scrollable">' +
      '<img class="flowchart-source" src="assets/' + chartFile + '" alt="' + esc(FIG[app.id]) + '"></div>' +
      (app.chartNote ? '<p class="chart-note">' + esc(app.chartNote) + '</p>' : '') + '</div>';
  }

  function buildWindow(spec) {
    var el = document.createElement('section');
    el.className = 'win win--' + spec.kind;
    el.dataset.app = spec.id;
    el.dataset.tone = spec.tone;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', 'title-' + spec.id);
    var title = spec.kind === 'app' ? spec.exe + ' &middot; ' + spec.name : esc(spec.exe) + (spec.id === 'project' ? ' &middot; C:\\ALGO' : '');
    var html =
      '<header class="win-bar">' + spec.iconSVG() +
      '<h2 class="win-title" id="title-' + spec.id + '">' + title + '</h2>' +
      '<span class="win-stripes" aria-hidden="true"></span>' +
      '<div class="win-ctrls"><button type="button" class="wbtn" data-act="min" aria-label="Minimise ' + esc(spec.exe) + '" title="Minimise">' + GLYPH.min + '</button>' +
      '<button type="button" class="wbtn" data-act="max" aria-label="Enlarge ' + esc(spec.exe) + ' window" aria-pressed="false" title="Enlarge">' + GLYPH.max + '</button>' +
      '<button type="button" class="wbtn wbtn--close" data-act="close" aria-label="Close ' + esc(spec.exe) + '" title="Close (Esc)">' + GLYPH.close + '</button></div></header>';
    if (spec.kind === 'app') {
      html += '<div class="tabs" role="tablist" aria-label="' + spec.name + ' sections">' + TABS.map(function (t, i) {
        return '<button type="button" class="tab' + (i === 5 ? ' tab--try' : '') + '" role="tab" id="tab-' + spec.id + '-' + i + '" aria-controls="panel-' + spec.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-tab="' + i + '">' + t.toUpperCase() + '</button>';
      }).join('') + '</div>' +
        '<div class="win-body" role="tabpanel" id="panel-' + spec.id + '" aria-labelledby="tab-' + spec.id + '-0" tabindex="-1"></div>';
    } else {
      html += '<div class="win-body win-body--doc' + (spec.id === 'term' ? ' win-body--term' : '') + '" id="panel-' + spec.id + '">' + docHTML(spec.id) + '</div>';
    }
    html += '<footer class="win-status"><span class="cell"><span class="led" aria-hidden="true"></span>READY</span>' +
      '<span class="cell cell--grow" data-status="path">C:\\ALGO\\' + (spec.id === 'project' ? '' : esc(spec.exe)) + '</span>' +
      '<span class="cell" data-status="tab">' + (spec.kind === 'app' ? '1/' + TABS.length + ' PROBLEM' : esc(spec.name.toUpperCase())) + '</span>' +
      '<button type="button" class="pxbtn pxbtn--sm back-btn" data-act="close">&#9666; DESKTOP</button></footer>' +
      '<span class="grip" aria-hidden="true" title="Drag to resize"></span>';
    el.innerHTML = html;
    return el;
  }

  function setTab(id, idx, focusTab) {
    var w = wins[id]; if (!w || SPEC[id].kind !== 'app') return;
    var app = SPEC[id];
    w.tab = idx;
    w.el.querySelectorAll('.tab').forEach(function (t, i) {
      t.setAttribute('aria-selected', String(i === idx));
      t.tabIndex = i === idx ? 0 : -1;
      if (i === idx && focusTab) t.focus();
    });
    var body = w.el.querySelector('.win-body');
    body.setAttribute('aria-labelledby', 'tab-' + id + '-' + idx);
    body.innerHTML = panelHTML(app, idx);
    body.scrollTop = 0;
    if (idx === 5) bindDemo(id, body);
    var extra = idx === 1 ? ' · ' + PSEUDO[id].length + ' LINES' : (idx === 2 ? ' · ' + PYTHON[id].split('\n').length + ' LINES' : '');
    w.el.querySelector('[data-status="tab"]').textContent = (idx + 1) + '/' + TABS.length + ' ' + TABS[idx].toUpperCase() + extra;
  }

  function wsRect() { return workspace.getBoundingClientRect(); }
  function placeWindow(el, spec) {
    if (isNarrow()) return;
    var ws = wsRect();
    if (spec.w) {
      el.style.width = Math.min(spec.w, ws.width - 24) + 'px';
      el.style.height = Math.min(spec.h, ws.height - 24) + 'px';
    }
    var wr = el.getBoundingClientRect();
    var baseLeft = ws.width >= 1100 ? 290 : 160;
    var left = baseLeft + cascade * 34, top = 18 + cascade * 26;
    cascade = (cascade + 1) % 5;
    left = Math.max(8, Math.min(left, ws.width - wr.width - 14));
    top = Math.max(8, Math.min(top, ws.height - wr.height - 14));
    el.style.left = left + 'px';
    el.style.top = top + 'px';
  }

  function animate(el, cls, ms, done) {
    if (reduceMotion) { if (done) done(); return; }
    el.classList.add(cls);
    setTimeout(function () { el.classList.remove(cls); if (done) done(); }, ms);
  }

  function openApp(id, opener) {
    if (!SPEC[id]) return;
    closeStart(false);
    var w = wins[id];
    if (w) {
      if (w.el.hidden) { w.el.hidden = false; animate(w.el, 'is-opening', 190); }
      focusWin(id, true);
      return;
    }
    var spec = SPEC[id];
    var el = buildWindow(spec);
    winsRoot.appendChild(el);
    wins[id] = { el: el, opener: opener || document.querySelector('.icon[data-app="' + id + '"]'), tab: 0 };
    if (spec.kind === 'app') setTab(id, 0);
    else bindDoc(id, el);
    placeWindow(el, spec);
    bindWindow(id);
    focusWin(id, true);
    document.querySelectorAll('.icon[data-app="' + id + '"]').forEach(function (i) { i.dataset.open = 'true'; });
    animate(el, 'is-opening', 190);
    blip(880, 0.07);
    renderTasks();
    if (id === 'term') { var inp = el.querySelector('#term-in'); if (inp) inp.focus({ preventScroll: true }); }
  }

  function closeApp(id) {
    var w = wins[id]; if (!w) return;
    var el = w.el;
    delete wins[id];
    document.querySelectorAll('.icon[data-app="' + id + '"]').forEach(function (i) { delete i.dataset.open; });
    blip(330, 0.07);
    var done = function () {
      el.remove();
      renderTasks();
      var next = topVisible();
      if (next) focusWin(next, true);
      else { activeId = null; var o = w.opener && document.body.contains(w.opener) ? w.opener : $('.icon'); if (o) o.focus(); }
    };
    if (reduceMotion || el.hidden) { done(); return; }
    el.classList.add('is-closing');
    setTimeout(done, 140);
  }

  function minimize(id) {
    var w = wins[id]; if (!w) return;
    var finish = function () {
      w.el.hidden = true;
      w.el.classList.remove('is-active');
      if (activeId === id) activeId = null;
      renderTasks();
      var next = topVisible();
      if (next) focusWin(next, true);
      else { var t = document.querySelector('.task[data-app="' + id + '"]'); if (t) t.focus(); }
    };
    blip(520, 0.05);
    animate(w.el, 'is-minimizing', 150, finish);
  }

  function topVisible() {
    var best = null, bz = -1;
    Object.keys(wins).forEach(function (k) {
      var el = wins[k].el, z = Number(el.style.zIndex || 0);
      if (!el.hidden && z > bz) { bz = z; best = k; }
    });
    return best;
  }

  function focusWin(id, moveFocus) {
    var w = wins[id]; if (!w) return;
    zTop += 1;
    w.el.style.zIndex = zTop;
    Object.keys(wins).forEach(function (k) { wins[k].el.classList.toggle('is-active', k === id); });
    activeId = id;
    if (moveFocus) {
      var t = id === 'term' ? w.el.querySelector('#term-in') : (w.el.querySelector('.tab[aria-selected="true"]') || w.el.querySelector('.win-body button, .win-body [tabindex="0"], .win-body') || w.el.querySelector('.wbtn'));
      if (t) t.focus({ preventScroll: true });
    }
    renderTasks();
  }

  function bindWindow(id) {
    var el = wins[id].el;
    el.addEventListener('pointerdown', function () { if (activeId !== id) focusWin(id, false); });
    el.addEventListener('click', function (e) {
      var act = e.target.closest('[data-act]');
      var tab = e.target.closest('.tab');
      if (tab) { setTab(id, Number(tab.dataset.tab), true); blip(1200, 0.03); return; }
      if (!act) return;
      var a = act.dataset.act;
      if (a === 'close') closeApp(id);
      else if (a === 'min') minimize(id);
      else if (a === 'copy') copyCode(id, act);
      else if (a === 'max') toggleMax(id);
      else if (a === 'zoom') setZoom(id, act.dataset.zoom);
      else if (a === 'open-file') openApp(act.dataset.file);
      else if (a === 'empty-bin') emptyBin();
    });
    el.querySelector('.win-bar').addEventListener('dblclick', function (e) {
      if (!e.target.closest('button') && !isNarrow()) toggleMax(id);
    });
    var tabs = el.querySelector('.tabs');
    if (tabs) tabs.addEventListener('keydown', function (e) {
      var cur = wins[id].tab, n = TABS.length, next = null;
      if (e.key === 'ArrowRight') next = (cur + 1) % n;
      else if (e.key === 'ArrowLeft') next = (cur - 1 + n) % n;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = n - 1;
      if (next !== null) { e.preventDefault(); setTab(id, next, true); }
    });
    makeDraggable(el);
    makeResizable(el);
  }

  function toggleMax(id) {
    var w = wins[id]; if (!w || isNarrow()) return;
    var on = !w.el.classList.contains('is-max');
    if (!reduceMotion) { w.el.classList.add('is-sizing'); setTimeout(function () { w.el.classList.remove('is-sizing'); }, 220); }
    w.el.classList.toggle('is-max', on);
    w.el.querySelectorAll('[data-act="max"]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(on));
      if (b.classList.contains('wbtn')) { b.title = on ? 'Restore size' : 'Enlarge'; b.setAttribute('aria-label', (on ? 'Restore ' : 'Enlarge ') + SPEC[id].exe + ' window'); }
    });
    blip(on ? 990 : 660, 0.05);
    if (!on) setTimeout(clampWindows, 230);
  }
  function setZoom(id, mode) {
    var w = wins[id]; if (!w) return;
    w.zoom = mode;
    var chart = w.el.querySelector('.chart');
    if (!chart) return;
    chart.dataset.zoom = mode;
    w.el.querySelectorAll('.seg-btn[data-zoom]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.zoom === mode)); });
  }

  function makeDraggable(el) {
    var bar = el.querySelector('.win-bar');
    var sx, sy, ox, oy, dragging = false;
    bar.addEventListener('pointerdown', function (e) {
      if (isNarrow() || el.classList.contains('is-max') || e.button !== 0 || e.target.closest('button')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = el.offsetLeft; oy = el.offsetTop;
      bar.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    });
    bar.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var ws = wsRect();
      var nx = Math.max(-el.offsetWidth + 160, Math.min(ox + e.clientX - sx, ws.width - 160));
      var ny = Math.max(0, Math.min(oy + e.clientY - sy, ws.height - 64));
      el.style.left = nx + 'px';
      el.style.top = ny + 'px';
    });
    var stop = function () { dragging = false; el.classList.remove('is-dragging'); };
    bar.addEventListener('pointerup', stop);
    bar.addEventListener('pointercancel', stop);
  }

  function makeResizable(el) {
    var grip = el.querySelector('.grip');
    var sx, sy, w0, h0, resizing = false;
    grip.addEventListener('pointerdown', function (e) {
      if (isNarrow() || el.classList.contains('is-max') || e.button !== 0) return;
      e.preventDefault();
      resizing = true;
      sx = e.clientX; sy = e.clientY; w0 = el.offsetWidth; h0 = el.offsetHeight;
      grip.setPointerCapture(e.pointerId);
      el.classList.add('is-resizing');
    });
    grip.addEventListener('pointermove', function (e) {
      if (!resizing) return;
      var ws = wsRect();
      var nw = Math.max(MIN_W, Math.min(w0 + e.clientX - sx, ws.width - Math.max(0, el.offsetLeft) - 8));
      var nh = Math.max(MIN_H, Math.min(h0 + e.clientY - sy, ws.height - el.offsetTop - 8));
      el.style.width = nw + 'px';
      el.style.height = nh + 'px';
    });
    var stop = function () { if (!resizing) return; resizing = false; el.classList.remove('is-resizing'); };
    grip.addEventListener('pointerup', stop);
    grip.addEventListener('pointercancel', stop);
  }

  function copyCode(id, btn) {
    var text = btn.dataset.copySource === 'python' ? PYTHON[id] : PSEUDO[id].join('\n');
    var ok = function () { btn.textContent = 'COPIED'; setTimeout(function () { btn.textContent = 'COPY'; }, 1400); };
    var fallback = function () {
      var pre = wins[id] && wins[id].el.querySelector('.code pre');
      if (!pre) return;
      var r = document.createRange(); r.selectNodeContents(pre);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      btn.textContent = 'SELECTED';
      setTimeout(function () { btn.textContent = 'COPY'; }, 1400);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  function emptyBin() {
    binEmpty = true;
    blip(180, 0.18);
    var w = wins.bin;
    if (w) w.el.querySelector('.win-body').innerHTML = docHTML('bin');
    if (w) { var ic = w.el.querySelector('.win-bar > svg'); if (ic) ic.outerHTML = ICONS.binEmpty; }
    SPEC.bin.tip = 'Empty';
    renderBinIcon();
    var slot = document.querySelector('#binSlot .icon');
    if (slot && wins.bin) slot.dataset.open = 'true';
    renderTasks();
    var back = w && w.el.querySelector('.back-btn'); if (back) back.focus();
  }

  function clampWindows() {
    if (isNarrow() || desktop.hidden) return;
    var ws = wsRect();
    Object.keys(wins).forEach(function (k) {
      var el = wins[k].el;
      if (el.classList.contains('is-max')) return;
      if (el.style.width && el.offsetWidth > ws.width - 16) el.style.width = Math.max(MIN_W, ws.width - 16) + 'px';
      if (el.style.height && el.offsetHeight > ws.height - 16) el.style.height = Math.max(MIN_H, ws.height - 16) + 'px';
      var left = Math.max(8, Math.min(el.offsetLeft, ws.width - el.offsetWidth - 8));
      var top = Math.max(8, Math.min(el.offsetTop, ws.height - el.offsetHeight - 8));
      el.style.left = left + 'px';
      el.style.top = top + 'px';
    });
  }
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { clampWindows(); drawWallpaper(); }, 100);
  });

  /* ------------------------------------------------------------------
     Taskbar: Start menu, quick launch, tasks, tray
  ------------------------------------------------------------------ */
  var tasks = $('#tasks');
  function renderTasks() {
    var ids = ORDER.filter(function (k) { return wins[k]; });
    tasks.innerHTML = ids.map(function (k) {
      var s = SPEC[k], on = !wins[k].el.hidden && activeId === k;
      return '<button type="button" class="task" data-app="' + k + '" aria-pressed="' + on + '" title="' + esc(s.exe) + (wins[k].el.hidden ? ' (minimised)' : '') + '">' + s.iconSVG() + '<span class="task-label">' + esc(s.exe) + '</span></button>';
    }).join('');
    renderSysmon();
  }
  tasks.addEventListener('click', function (e) {
    var b = e.target.closest('.task'); if (!b) return;
    var id = b.dataset.app, w = wins[id];
    if (!w) return;
    if (!w.el.hidden && activeId === id) minimize(id);
    else { if (w.el.hidden) { w.el.hidden = false; animate(w.el, 'is-opening', 190); } focusWin(id, true); }
  });

  $('#quick').innerHTML = APPS.map(function (a) {
    return '<button type="button" class="quick-btn has-tip tip-up" data-open="' + a.id + '" data-tip="' + esc(a.name) + '" aria-label="Open ' + esc(a.name) + '">' + ICONS[a.id] + '</button>';
  }).join('');

  $('#sysRows').addEventListener('click', function (e) {
    var b = e.target.closest('.sys-row'); if (b) openApp(b.dataset.sys, b);
  });

  /* Start menu */
  var startBtn = $('#startBtn'), startMenu = $('#startMenu');
  function menuItem(id, label, iconSVG, extra) {
    return '<button type="button" class="sm-item" role="menuitem" ' + extra + '>' + iconSVG + '<span>' + label + '</span></button>';
  }
  function buildStart() {
    $('#startItems').innerHTML =
      '<p class="sm-group" aria-hidden="true">PROGRAMS</p>' +
      APPS.map(function (a) { return menuItem(a.id, a.name, ICONS[a.id], 'data-open="' + a.id + '"'); }).join('') +
      '<hr>' +
      menuItem('project', 'My Project', ICONS.folder, 'data-open="project"') +
      menuItem('readme', 'Read Me', ICONS.readme, 'data-open="readme"') +
      menuItem('help', 'Help &amp; Legend', ICONS.help, 'data-open="help"') +
      menuItem('term', 'Terminal', ICONS.term, 'data-open="term"') +
      menuItem('tips', 'Tip of the Day', ICONS.tip, 'data-menu="tips"') +
      '<hr>' +
      menuItem('snd', 'Sound: <b id="smSnd">OFF</b>', '<span class="sm-glyph" aria-hidden="true">&#9834;</span>', 'data-menu="sound"') +
      menuItem('restart', 'Restart&hellip;', '<span class="sm-glyph" aria-hidden="true">&#8635;</span>', 'data-menu="restart"');
  }
  function openStart() {
    startMenu.hidden = false;
    startBtn.setAttribute('aria-expanded', 'true');
    if (!reduceMotion) { startMenu.classList.remove('is-opening'); void startMenu.offsetWidth; startMenu.classList.add('is-opening'); }
    var first = startMenu.querySelector('.sm-item'); if (first) first.focus();
    blip(740, 0.04);
  }
  function closeStart(returnFocus) {
    if (startMenu.hidden) return;
    startMenu.hidden = true;
    startBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) startBtn.focus();
  }
  startBtn.addEventListener('click', function () { if (startMenu.hidden) openStart(); else closeStart(true); });
  startMenu.addEventListener('click', function (e) {
    var b = e.target.closest('.sm-item'); if (!b) return;
    if (b.dataset.open) { closeStart(false); openApp(b.dataset.open, startBtn); return; }
    var m = b.dataset.menu;
    if (m === 'tips') { closeStart(false); var t = $('#tips'); t.hidden = false; showTip(tipIndex + 1); $('#tipNext').focus(); }
    else if (m === 'sound') { setSound(!soundOn); }
    else if (m === 'restart') { restartOS(); }
  });
  startMenu.addEventListener('keydown', function (e) {
    var items = Array.prototype.slice.call(startMenu.querySelectorAll('.sm-item')), i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeStart(true); }
    else if (e.key === 'Tab') { closeStart(false); }
  });
  document.addEventListener('pointerdown', function (e) {
    if (!startMenu.hidden && !e.target.closest('#startMenu') && !e.target.closest('#startBtn')) closeStart(false);
  });

  /* tray */
  $('#showDesktop').addEventListener('click', function () {
    Object.keys(wins).forEach(function (k) { wins[k].el.hidden = true; wins[k].el.classList.remove('is-active'); });
    activeId = null;
    renderTasks();
    var first = $('.icon'); if (first) first.focus();
  });
  function setSound(on) {
    soundOn = on;
    var b = $('#soundToggle');
    b.setAttribute('aria-pressed', String(on));
    b.querySelector('.snd-state').textContent = on ? 'ON' : 'OFF';
    var s = $('#smSnd'); if (s) s.textContent = on ? 'ON' : 'OFF';
    blip(990, 0.08);
  }
  $('#soundToggle').addEventListener('click', function () { setSound(!soundOn); });

  /* tips panel */
  $('#tipNext').addEventListener('click', function () { showTip(tipIndex + 1); blip(880, 0.03); });
  $('#tipPrev').addEventListener('click', function () { showTip(tipIndex - 1); blip(780, 0.03); });
  $('#tipClose').addEventListener('click', function () { $('#tips').hidden = true; var f = $('.icon'); if (f) f.focus(); });

  /* global keys */
  document.addEventListener('keydown', function (e) {
    if (!entered) {
      if (e.key === 'Enter' && document.activeElement === document.body) { e.preventDefault(); enterDesktop(); }
      if (e.key === 'Escape') enterDesktop();
      return;
    }
    if (e.key === 'Escape') {
      if (!startMenu.hidden) { closeStart(true); return; }
      var id = activeId && wins[activeId] && !wins[activeId].el.hidden ? activeId : topVisible();
      if (id) { e.preventDefault(); closeApp(id); }
    }
  });

  $('#pressStart').addEventListener('click', enterDesktop);
  $('#skipBoot').addEventListener('click', enterDesktop);

  /* init */
  buildIcons();
  buildStart();
  $('#tipsBulb').innerHTML = ICONS.tip;
  showTip(0);
  runBoot();
  $('#pressStart').focus({ preventScroll: true });

  // test hook for the reference functions (harmless in the browser)
  window.ALGO_OS = { compoundInterest: compoundInterest, kapCalc: kapCalc, runCompound: runCompound, runKaprekar: runKaprekar, runMobile: runMobile };
})();
