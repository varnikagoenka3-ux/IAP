/* ALGO-OS 98 — boot sequence, desktop, windows, tabs, flowcharts.
   Content source: "Programming Project: Pseudocode (Corrected)", Oct 28 2026, @Varnika. */
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
     Pseudocode (START and STOP added; Kaprekar written by Varnika)
  ------------------------------------------------------------------ */
  var PSEUDO = {
    ci: [
      'START',
      'FUNCTION calculate_compound_interest(principal, rate, time)',
      '    IF principal, rate or time is not a number THEN',
      '        DISPLAY "Error: inputs must be numbers"',
      '        RETURN NULL',
      '    END IF',
      '    IF principal < 0 OR rate < 0 OR time < 0 THEN',
      '        DISPLAY "Error: inputs cannot be negative"',
      '        RETURN NULL',
      '    END IF',
      '    amount <- principal * (1 + rate / 100) ^ time',
      '    interest <- amount - principal',
      '    RETURN interest',
      'END FUNCTION',
      'STOP'
    ],
    kap: [
      'START',
      '',
      'INPUT n',
      '',
      'IF n is not an integer OR n <= 0 THEN',
      '    PRINT "Error: Input must be a positive integer"',
      'ELSE',
      '    square = n * n',
      '    digits = number of digits in n',
      '    divisor = 10 ^ digits',
      '',
      '    left = square DIV divisor',
      '    right = square MOD divisor',
      '',
      '    IF left + right == n THEN',
      '        PRINT n, "is a Kaprekar number"',
      '    ELSE',
      '        PRINT n, "is not a Kaprekar number"',
      '    END IF',
      'END IF',
      '',
      'STOP'
    ],
    mob: [
      'START',
      '    total <- 0',
      '    FOR day <- 1 TO 7',
      '        REPEAT',
      '            INPUT usage',
      '            IF usage is not a number OR usage < 0 THEN',
      '                DISPLAY "Error: enter a number of 0 GB or more"',
      '            END IF',
      '        UNTIL usage is a number AND usage >= 0',
      '        total <- total + usage',
      '    END FOR',
      '    projected_monthly <- total * 4',
      '    DISPLAY "Weekly usage: ", total, " GB"',
      '    DISPLAY "Projected monthly usage: ", projected_monthly, " GB"',
      '    IF projected_monthly > 20 THEN',
      '        DISPLAY "Monthly limit may be exceeded"',
      '    ELSE',
      '        DISPLAY "Monthly limit is not expected to be exceeded"',
      '    END IF',
      'STOP'
    ]
  };

  var TOKEN_RE = /("[^"]*")|(<-)|(\b\d+(?:\.\d+)?\b)|(\b(?:FUNCTION|END|IF|THEN|ELSE|RETURN|DISPLAY|INPUT|FOR|TO|REPEAT|UNTIL|START|STOP|PRINT|DIV|MOD|AND|OR|NULL|true)\b)|([()*\/^+\-<>=,])/g;
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
     Reference implementations that mirror the pseudocode,
     used only to print the worked examples from the document.
  ------------------------------------------------------------------ */
  function compoundInterest(principal, rate, time) {
    var vals = [principal, rate, time];
    if (vals.some(function (v) { return typeof v !== 'number' || isNaN(v); })) return { error: 'Error: inputs must be numbers' };
    if (principal < 0 || rate < 0 || time < 0) return { error: 'Error: inputs cannot be negative' };
    var amount = principal * Math.pow(1 + rate / 100, time);
    return { amount: amount, interest: amount - principal };
  }
  function kapCalc(n) {
    var N = BigInt(n), sq = N * N, digits = N.toString().length, div = 10n ** BigInt(digits);
    var left = sq / div, right = sq % div;
    return { n: N, sq: sq, digits: digits, div: div, left: left, right: right, sum: left + right, ok: left + right === N };
  }
  function kapTrace(n) {
    var k = kapCalc(n);
    return '<div class="table-wrap"><table class="trace"><caption class="sr-only">Steps for n = ' + n + '</caption>' +
      '<thead><tr><th>square</th><th>digits</th><th>divisor</th><th>left</th><th>right</th><th>left + right</th><th>check</th></tr></thead><tbody>' +
      '<tr' + (k.ok ? ' class="hit"' : '') + '><td>' + k.sq + '</td><td>' + k.digits + '</td><td>' + k.div + '</td><td>' + k.left + '</td><td>' + k.right + '</td><td>' + k.sum +
      '</td><td class="' + (k.ok ? 'yes' : 'no') + '">' + (k.ok ? '&#10003; = ' + n : '&ne; ' + n) + '</td></tr></tbody></table></div>' +
      '<p class="verdict">n = ' + n + ', so PRINT: ' + n + (k.ok ? ' is a Kaprekar number' : ' is not a Kaprekar number') + '</p>';
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
     App content
  ------------------------------------------------------------------ */
  var ciEx = compoundInterest(10000, 10, 2);
  var mobEx = 5.3 * 4;

  var APPS = [
    {
      id: 'ci', exe: 'COMPOUND.EXE', name: 'Compound Interest', tone: 'pink',
      problem:
        '<h3>TASK</h3>' +
        source('<p>Returns the compound interest (A &minus; P) for annual compounding, or shows an error if any input is invalid.</p>') +
        '<h3>INPUTS</h3><ul class="chips"><li>principal</li><li>rate</li><li>time</li></ul>' +
        '<h3>FORMULA</h3><div class="formula"><b>amount</b> &larr; principal &times; (1 + rate / 100)<sup>time</sup><br><b>interest</b> &larr; amount &minus; principal</div>' +
        '<h3>OUTPUT</h3><p>The interest (A &minus; P). If an input is not a number or is negative, an error message is displayed and the function returns NULL.</p>' +
        '<h3>EXAMPLE</h3>' + example('<p>P = 10,000, R = 10, T = 2 gives A = 12,100 and interest = 2,100.</p>'),
      explain:
        '<h3>WHY THE FUNCTION RETURNS A &minus; P</h3>' +
        source('<p>Note: the formula gives A, and compound interest is A &minus; P, so the function returns A &minus; P.</p>') +
        '<h3>ORDER OF CHECKS</h3><ol>' +
        '<li>If any of <code>principal</code>, <code>rate</code> or <code>time</code> is not a number, display <em>Error: inputs must be numbers</em> and return NULL.</li>' +
        '<li>If any of them is below 0, display <em>Error: inputs cannot be negative</em> and return NULL.</li>' +
        '<li>Otherwise work out <code>amount</code>, subtract <code>principal</code>, and return the result.</li></ol>' +
        '<p>Because each error branch returns straight away, the formula only runs on valid input.</p>' +
        '<h3>WORKED EXAMPLE</h3>' +
        '<pre class="calc">amount   = 10,000 &times; (1 + 10 / 100)^2\n         = 10,000 &times; 1.1^2\n         = 10,000 &times; 1.21\n         = ' + fmt(ciEx.amount) + '\ninterest = ' + fmt(ciEx.amount) + ' &minus; 10,000\n         = ' + fmt(ciEx.interest) + '</pre>' +
        '<p>This matches the document: A = 12,100 and interest = 2,100.</p>',
      chartNote: 'Each error branch displays its message, then both reach the same RETURN NULL step.'
    },
    {
      id: 'kap', exe: 'KAPREKAR.EXE', name: 'Kaprekar Number', tone: 'lav',
      problem:
        '<h3>TASK</h3>' +
        '<p>Squares n, splits the square into a left part and a right part, and adds the two parts. If left + right = n, then n is a Kaprekar number.</p>' +
        '<h3>INPUT</h3><ul class="chips"><li>n</li></ul>' +
        '<h3>OUTPUT</h3><p>Prints <code>n is a Kaprekar number</code> or <code>n is not a Kaprekar number</code>. If n is not a positive integer, it prints an error.</p>' +
        '<h3>EXAMPLES</h3>' +
        example('<p>n = 45, 45&sup2; = 2025, split 20 | 25, 20 + 25 = 45, so it is a Kaprekar number.</p>') +
        example('<p>n = 297, 297&sup2; = 88209, split 88 | 209, 88 + 209 = 297, so it is a Kaprekar number.</p>'),
      explain:
        '<h3>HOW THE SPLIT WORKS</h3>' +
        '<p><code>digits</code> is the number of digits in n, and <code>divisor</code> is 10 raised to that. <code>left</code> is the square DIV divisor (the front of the square) and <code>right</code> is the square MOD divisor (the last <code>digits</code> digits).</p>' +
        '<h3>TRACE: n = 45</h3>' + kapTrace(45) +
        '<h3>TRACE: n = 297</h3>' + kapTrace(297) +
        '<h3>TRACE: n = 10 (not Kaprekar)</h3>' + kapTrace(10),
      chartNote: ''
    },
    {
      id: 'mob', exe: 'MOBDATA.EXE', name: 'Mobile Data Usage', tone: 'cyan',
      problem:
        '<h3>TASK</h3>' +
        source('<p>Takes 7 daily values, adds them into the weekly total, and projects the month as 4 weeks of that usage against the 20 GB limit.</p>') +
        '<h3>INPUT</h3><ul class="chips"><li>usage &times; 7 days (GB)</li></ul>' +
        '<h3>OUTPUT</h3><ul><li>Weekly usage in GB</li><li>Projected monthly usage in GB</li><li><code>Monthly limit may be exceeded</code> or <code>Monthly limit is not expected to be exceeded</code></li></ul>' +
        '<h3>LIMIT</h3><div class="formula"><b>projected_monthly</b> &larr; total &times; 4 &nbsp;&nbsp;vs&nbsp;&nbsp; 20 GB</div>' +
        '<h3>EXAMPLE</h3>' + example('<p>A weekly total of 5.3 GB gives 5.3 &times; 4 = 21.2 GB, which is above 20, so the limit may be exceeded.</p>'),
      explain:
        '<h3>ASSUMPTION FROM THE DOCUMENT</h3>' +
        source('<p>Assumption: a month is 4 weeks, so the weekly limit works out to 5 GB. Exactly 20 GB projected counts as not exceeded.</p>') +
        '<h3>INPUT VALIDATION</h3><p>Each day uses a <code>REPEAT &hellip; UNTIL</code> loop. If the value is not a number or is below 0, the error is displayed and the same day is asked again. The loop only ends once a number of 0 or more is entered, so only valid values are added to <code>total</code>.</p>' +
        '<h3>PROJECTION</h3><p>After 7 valid days, <code>total</code> is the weekly usage. Multiplying by 4 gives <code>projected_monthly</code>, which is compared with 20 using <code>&gt;</code>. That is why exactly 20 GB counts as not exceeded.</p>' +
        '<h3>WORKED EXAMPLE</h3>' +
        '<pre class="calc">total             = 5.3 GB\nprojected_monthly = 5.3 &times; 4 = ' + fmt(mobEx) + ' GB\n' + fmt(mobEx) + ' &gt; 20  &rarr;  "Monthly limit may be exceeded"</pre>',
      chartNote: 'The REPEAT … UNTIL loop is drawn as one decision: the IF and the UNTIL test the same condition, so an invalid value shows the error and returns to INPUT usage, and a valid value continues.'
    }
  ];
  var APP_BY_ID = {};
  APPS.forEach(function (a) { APP_BY_ID[a.id] = a; });
  var TABS = ['Problem', 'Pseudocode', 'Explanation', 'Flowchart', 'Try it'];

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

  /* CRT screen cycles through short, verbatim lines from each program */
  var CRT_SNIPPETS = [
    ['C:\\ALGO> TYPE COMPOUND.TXT', PSEUDO.ci[10], PSEUDO.ci[12], PSEUDO.ci[13], '', ''],
    ['C:\\ALGO> TYPE KAPREKAR.TXT', PSEUDO.kap[7], PSEUDO.kap[9], PSEUDO.kap[11], PSEUDO.kap[12], PSEUDO.kap[14]],
    ['C:\\ALGO> TYPE MOBDATA.TXT', PSEUDO.mob[1], PSEUDO.mob[2], PSEUDO.mob[9], PSEUDO.mob[11], PSEUDO.mob[14]]
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
    'Checking 20 GB limit OK',
    'Drawing flowcharts . OK',
    'Phosphor at 98% .... OK',
    'Counting days 1-7 .. OK'
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
    'Each program has five tabs: Problem, Pseudocode, Explanation, Flowchart and Try it.',
    'Drag a window by its title bar. Drag the corner grip to resize it.',
    'Double-click a title bar to enlarge a window. Press Esc to close the front window.',
    'In KAPREKAR.EXE, open Try it and enter 297. 297 squared is 88209, and 88 + 209 = 297.',
    'In MOBDATA.EXE, a projection of exactly 20 GB counts as not exceeded.',
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
      out.push(outLine('line 2: an input is not a number → THEN', 'dim'));
      out.push(outLine('DISPLAY "Error: inputs must be numbers"', 'err'));
      out.push(outLine('RETURN NULL', 'ret'));
      return out.join('');
    }
    out.push(outLine('line 2: all inputs are numbers → skip', 'dim'));
    if (p < 0 || r < 0 || t < 0) {
      out.push(outLine('line 6: an input is below 0 → THEN', 'dim'));
      out.push(outLine('DISPLAY "Error: inputs cannot be negative"', 'err'));
      out.push(outLine('RETURN NULL', 'ret'));
      return out.join('');
    }
    out.push(outLine('line 6: no input is below 0 → skip', 'dim'));
    var amount = p * Math.pow(1 + r / 100, t), interest = amount - p;
    if (!isFinite(amount)) {
      out.push(outLine('The amount is too large for this demo to display.', 'err'));
      return out.join('');
    }
    out.push(outLine('amount   <- ' + show(p) + ' * (1 + ' + show(r, 6) + ' / 100) ^ ' + show(t, 6) + ' = ' + show(amount)));
    out.push(outLine('interest <- ' + show(amount) + ' - ' + show(p) + ' = ' + show(interest)));
    out.push(outLine('RETURN ' + show(interest), 'ret'));
    out.push(outLine('Values are shown to 2 decimal places.', 'dim'));
    return out.join('');
  }

  function runKaprekar(nS) {
    var raw = String(nS).trim(), v = parseNumber(raw), out = [];
    out.push(outLine('INPUT n = ' + esc(raw || '""'), 'dim'));
    if (isNaN(v) || !Number.isInteger(v) || v <= 0) {
      out.push(outLine('n is not an integer OR n <= 0 → THEN', 'dim'));
      out.push(outLine('PRINT "Error: Input must be a positive integer"', 'err'));
      return { html: out.join('') };
    }
    if (v > 94906265) {
      out.push(outLine('This demo can check n up to 94,906,265.', 'err'));
      return { html: out.join('') };
    }
    var k = kapCalc(v);
    out.push(outLine('square = ' + v + ' * ' + v + ' = ' + k.sq));
    out.push(outLine('digits = ' + k.digits));
    out.push(outLine('divisor = 10 ^ ' + k.digits + ' = ' + k.div));
    out.push(outLine('left = ' + k.sq + ' DIV ' + k.div + ' = ' + k.left));
    out.push(outLine('right = ' + k.sq + ' MOD ' + k.div + ' = ' + k.right));
    out.push(outLine('left + right = ' + k.sum + (k.ok ? ' = ' : ' ≠ ') + v, 'dim'));
    out.push(outLine('PRINT ' + v + ', "' + (k.ok ? 'is a Kaprekar number' : 'is not a Kaprekar number') + '"', k.ok ? 'ok' : 'err'));
    return { html: out.join(''), table: '' };
  }

  function runMobile(values) {
    var out = [], total = 0;
    out.push(outLine('total <- 0', 'dim'));
    for (var d = 0; d < 7; d++) {
      var u = parseNumber(values[d]);
      if (isNaN(u) || u < 0) {
        out.push(outLine('Day ' + (d + 1) + ': INPUT usage = ' + esc(String(values[d]).trim() || '(blank)'), 'dim'));
        out.push(outLine('DISPLAY "Error: enter a number of 0 GB or more"', 'err'));
        out.push(outLine('REPEAT asks for day ' + (d + 1) + ' again. Fix the value and run again.', 'dim'));
        return { html: out.join(''), bad: d };
      }
      total += u;
    }
    total = Number(total.toFixed(10));
    var projected = Number((total * 4).toFixed(10));
    out.push(outLine('7 valid values entered · total <- ' + show(total, 4), 'dim'));
    out.push(outLine('projected_monthly <- ' + show(total, 4) + ' * 4 = ' + show(projected, 4), 'dim'));
    out.push(outLine('Weekly usage: ' + show(total, 4) + ' GB', 'ok'));
    out.push(outLine('Projected monthly usage: ' + show(projected, 4) + ' GB', 'ok'));
    out.push(outLine(projected > 20 ? 'Monthly limit may be exceeded' : 'Monthly limit is not expected to be exceeded', projected > 20 ? 'err' : 'ret'));
    out.push(outLine('Sums are rounded to 10 decimal places to avoid floating-point noise.', 'dim'));
    return { html: out.join(''), bad: -1 };
  }

  var MOB_SAMPLE = ['0.8', '0.7', '0.9', '0.6', '0.8', '0.7', '0.8'];
  function demoHTML(id) {
    var note = '<p class="demo-note">Optional. This runs the pseudocode from the Pseudocode tab with your own values. It does not change the project content.</p>';
    if (id === 'ci') {
      return '<div class="panel panel--wide demo"><h3>TRY IT</h3>' + note +
        '<form class="demo-form" data-demo="ci" autocomplete="off">' +
        '<label for="ci-p">principal<input id="ci-p" name="p" value="10000" inputmode="decimal"></label>' +
        '<label for="ci-r">rate<input id="ci-r" name="r" value="10" inputmode="decimal"></label>' +
        '<label for="ci-t">time<input id="ci-t" name="t" value="2" inputmode="decimal"></label>' +
        '<button type="submit" class="pxbtn pxbtn--sm pxbtn--cyan">RUN</button></form>' +
        '<div class="presets" role="group" aria-label="Example inputs"><span>Examples:</span>' +
        '<button type="button" class="chip-btn" data-preset="10000|10|2">Document example</button>' +
        '<button type="button" class="chip-btn" data-preset="abc|10|2">Not a number</button>' +
        '<button type="button" class="chip-btn" data-preset="-500|10|2">Negative input</button>' +
        '<button type="button" class="chip-btn" data-preset="5000|0|3">Rate of 0</button></div>' +
        '<div class="demo-out" aria-live="polite"></div></div>';
    }
    if (id === 'kap') {
      return '<div class="panel panel--wide demo"><h3>TRY IT</h3>' + note +
        '<form class="demo-form" data-demo="kap" autocomplete="off">' +
        '<label for="kap-n">n<input id="kap-n" name="n" value="45" inputmode="numeric"></label>' +
        '<button type="submit" class="pxbtn pxbtn--sm pxbtn--cyan">RUN</button></form>' +
        '<div class="presets" role="group" aria-label="Example inputs"><span>From the document:</span>' +
        ['45', '297', '9', '10', '100', '1'].map(function (v) { return '<button type="button" class="chip-btn" data-preset="' + v + '">' + v + '</button>'; }).join('') +
        '<button type="button" class="chip-btn" data-preset="4.5">4.5</button></div>' +
        '<div class="demo-out" aria-live="polite"></div><div class="demo-table"></div></div>';
    }
    return '<div class="panel panel--wide demo"><h3>TRY IT</h3>' + note +
      '<form class="demo-form demo-form--days" data-demo="mob" autocomplete="off">' +
      MOB_SAMPLE.map(function (v, i) { return '<label for="mob-d' + i + '">Day ' + (i + 1) + '<input id="mob-d' + i + '" name="d' + i + '" value="' + v + '" inputmode="decimal"></label>'; }).join('') +
      '<button type="submit" class="pxbtn pxbtn--sm pxbtn--cyan">RUN</button></form>' +
      '<div class="presets" role="group" aria-label="Example inputs"><span>Examples:</span>' +
      '<button type="button" class="chip-btn" data-preset="' + MOB_SAMPLE.join('|') + '">Week totalling 5.3 GB</button>' +
      '<button type="button" class="chip-btn" data-preset="1|0.5|0.5|1|0.5|0.5|1">Week totalling 5 GB</button>' +
      '<button type="button" class="chip-btn" data-preset="0.8|0.7|abc|0.6|0.8|0.7|0.8">An invalid value</button>' +
      '<button type="button" class="chip-btn" data-preset="||||||">Clear</button></div>' +
      '<p class="demo-note">The 5.3 GB total matches the document&rsquo;s example. The daily split is a sample, since the document gives only the weekly total.</p>' +
      '<div class="demo-out" aria-live="polite"></div></div>';
  }
  function bindDemo(id, body) {
    var form = body.querySelector('.demo-form');
    if (!form) return;
    var outEl = body.querySelector('.demo-out');
    var run = function () {
      if (id === 'ci') outEl.innerHTML = runCompound(form.p.value, form.r.value, form.t.value);
      else if (id === 'kap') { var k = runKaprekar(form.n.value); outEl.innerHTML = k.html; body.querySelector('.demo-table').innerHTML = k.table || ''; }
      else {
        var vals = [0, 1, 2, 3, 4, 5, 6].map(function (i) { return form['d' + i].value; });
        var m = runMobile(vals);
        outEl.innerHTML = m.html;
        form.querySelectorAll('input').forEach(function (inp, i) { inp.setAttribute('aria-invalid', String(i === m.bad)); });
        if (m.bad >= 0) form['d' + m.bad].focus();
      }
      blip(1320, 0.04);
    };
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    body.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var vals = b.dataset.preset.split('|');
        form.querySelectorAll('input').forEach(function (inp, i) { inp.value = vals[i] != null ? vals[i] : ''; });
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
    { id: 'mob', type: 'Program', desc: 'Takes 7 daily values, adds them into the weekly total, and projects the month as 4 weeks of that usage against the 20 GB limit.' },
    { id: 'readme', type: 'Text document', desc: 'A short tour of this desktop and how to get around it.' },
    { id: 'help', type: 'Help file', desc: 'Window controls, flowchart symbols, pseudocode colours and terminal commands.' },
    { id: 'term', type: 'Program', desc: 'A command line. Type help for the list of commands.' },
    { id: 'source', type: 'PDF document', desc: 'Programming Project: Pseudocode (Corrected) · Oct 28, 2026 · @Varnika · 3 pages. The Kaprekar pseudocode and all three flowcharts were supplied separately.' }
  ];
  function fileName(f) { return f.id === 'source' ? 'PSEUDOCODE.PDF' : SPEC[f.id].exe; }
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
        '<li>Inside a program, use the tabs. <strong>Try it</strong> runs the pseudocode with your own values.</li></ul>' +
        '<h3>MOVE AROUND</h3><ul>' +
        '<li>Drag a window by its title bar. Drag the striped corner to resize it.</li>' +
        '<li>Use the title-bar buttons to minimise, enlarge or close a window. Double-clicking the title bar also enlarges it.</li>' +
        '<li>Press <kbd>Esc</kbd> to close the front window. Taskbar buttons bring back minimised windows.</li>' +
        '<li>The ⌂ button on the taskbar clears the desktop. The ◂ DESKTOP button in each window closes it.</li></ul>' +
        '<h3>ABOUT THE CONTENT</h3>' +
        '<p>Problem statements, pseudocode, formulas and examples come from <em>Programming Project: Pseudocode (Corrected)</em>, Oct 28, 2026, by @Varnika. The Kaprekar pseudocode and the flowcharts are the latest versions supplied by @Varnika.</p>' +
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
        '<p>An earlier Kaprekar approach that tried every way of splitting n&sup2;. The current version replaced it with one split based on the digit count of n.</p></div></li></ul>') +
      '<div class="bin-actions"><button type="button" class="pxbtn pxbtn--sm" data-act="empty-bin"' + (binEmpty ? ' disabled' : '') + '>EMPTY RECYCLE BIN</button></div></div>';
  }

  var TERM_HELP = [
    ['help', 'List the commands'],
    ['dir', 'List the files in C:\\ALGO'],
    ['open <name>', 'Open compound, kaprekar, mobdata, readme, help, project or bin'],
    ['ci <principal> <rate> <time>', 'Run calculate_compound_interest'],
    ['kaprekar <n>', 'Run kaprekar_number'],
    ['mobdata <7 values>', 'Run the mobile data program for one week'],
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
      if (args.length !== 7) { print('Usage: mobdata followed by 7 daily values    e.g. mobdata 0.8 0.7 0.9 0.6 0.8 0.7 0.8'); return; }
      print(stripTags(runMobile(args).html)); return;
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
    if (idx === 2) return '<div class="panel">' + app.explain + '</div>';
    if (idx === 4) return demoHTML(app.id);
    if (idx === 1) {
      var lines = PSEUDO[app.id];
      var code = lines.map(function (l, i) { return '<span class="ln">' + (i + 1) + '</span>' + highlight(l); }).join('\n');
      return '<div class="panel panel--wide"><div class="crt-frame">' +
        '<div class="code-head"><span class="code-name">' + app.exe.replace('.EXE', '.TXT') + '</span>' +
        '<button type="button" class="pxbtn pxbtn--sm pxbtn--cyan" data-act="copy">COPY</button></div>' +
        '<div class="code" tabindex="0" aria-label="Pseudocode for ' + app.name + '"><pre>' + code + '</pre></div>' +
        '<div class="code-legend" aria-hidden="true"><span><i style="background:#51E5E0"></i>keyword</span><span><i style="background:#E98ABC"></i>assign &lt;-</span><span><i style="background:#FFB3D9"></i>text</span><span><i style="background:#FFD866"></i>number</span></div>' +
        '</div></div>';
    }
    var FIG = {
      ci: 'Flowchart for compound interest. Start, input principal, rate and time. If principal, rate or time is below 0, print Invalid input and stop. Otherwise A = principal times (1 + rate/100) to the power time, CI = A minus principal, print CI, stop.',
      kap: 'Flowchart for the Kaprekar number. Start, input n. If n is not a positive integer, print Invalid input and stop. Otherwise square n, split the square into left and right, sum = left + right. If sum equals n, print that n is a Kaprekar number, otherwise print that it is not. Stop.',
      mob: 'Flowchart for mobile data usage. Start, input data usage for 7 days, total is D1 to D7, average daily usage is total over 7, estimated monthly usage is average times 30. If the estimate is above 20 GB display that the monthly limit may be exceeded, otherwise display that it may not be. End.'
    };
    var w = wins[app.id];
    var zoom = (w && w.zoom) || (isNarrow() || (w && w.el.clientWidth < 720) ? 'zoom' : 'fit');
    return '<div class="panel panel--wide"><div class="chart-head"><h3>FLOWCHART</h3>' +
      '<div class="seg" role="group" aria-label="Flowchart size">' +
      '<button type="button" class="seg-btn" data-act="zoom" data-zoom="fit" aria-pressed="' + (zoom === 'fit') + '">FIT</button>' +
      '<button type="button" class="seg-btn" data-act="zoom" data-zoom="zoom" aria-pressed="' + (zoom === 'zoom') + '">ZOOM</button>' +
      '<button type="button" class="seg-btn" data-act="max" aria-pressed="' + !!(w && w.el.classList.contains('is-max')) + '">ENLARGE</button></div></div>' +
      '<div class="chart" data-zoom="' + zoom + '" tabindex="0" aria-label="Flowchart, scrollable">' +
      '<img src="assets/flowchart-' + ({ ci: 1, kap: 2, mob: 3 })[app.id] + '.png" alt="' + esc(FIG[app.id]) + '" width="1024" height="1536"></div></div>';
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
        return '<button type="button" class="tab' + (i === 4 ? ' tab--try' : '') + '" role="tab" id="tab-' + spec.id + '-' + i + '" aria-controls="panel-' + spec.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-tab="' + i + '">' + t.toUpperCase() + '</button>';
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
    if (idx === 4) bindDemo(id, body);
    var extra = idx === 1 ? ' · ' + PSEUDO[id].length + ' LINES' : '';
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
    var text = PSEUDO[id].join('\n');
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
