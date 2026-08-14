// Headless loader for the dendrynexus engine + compiled game.
// Stubs the browser globals that scene on-display blocks touch, then loads out/game.json.
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// ---- browser stubs (scene on-display JS touches these) ----
function dummyNode() {
  const n = {
    className: '', src: '', id: '', innerHTML: '', innerText: '', textContent: '',
    style: {}, classList: { add() {}, remove() {}, toggle() {} },
    appendChild() { return n; }, removeChild() {}, remove() {},
    setAttribute() {}, getAttribute() { return null; },
    querySelector() { return dummyNode(); }, querySelectorAll() { return []; },
    addEventListener() {}, children: [], parentNode: null,
  };
  return n;
}
globalThis.document = {
  createElement: () => dummyNode(),
  createTextNode: () => dummyNode(),
  querySelector: () => dummyNode(),
  querySelectorAll: () => [],
  getElementById: () => dummyNode(),
  body: dummyNode(),
};
globalThis.window = globalThis.window || {
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  addEventListener() {},
};
globalThis.localStorage = globalThis.window.localStorage;
globalThis.Image = function () { return dummyNode(); };
globalThis.Audio = function () { return { play() {}, pause() {} }; };

export const engineLib = require(join(root, 'node_modules', 'dendrynexus', 'lib', 'engine.js'));

export function loadGame() {
  const json = readFileSync(join(root, 'out', 'game.json'), 'utf8');
  return new Promise((resolve, reject) => {
    engineLib.convertJSONToGame(json, (err, game) => (err ? reject(err) : resolve(game)));
  });
}

// Minimal recording UI: swallows output, records choice lockouts.
export function makeSimUI() {
  const SimUI = function () {
    this.lockouts = new Map(); // title -> {seen, locked}
  };
  engineLib.UserInterface.makeParentOf(SimUI);
  SimUI.prototype.displayChoices = function (choices) {
    for (const c of choices) {
      const key = String(c.title).replace(/<[^>]*>/g, '').slice(0, 60);
      const rec = this.lockouts.get(key) || { seen: 0, locked: 0 };
      rec.seen++;
      if (!c.canChoose) rec.locked++;
      this.lockouts.set(key, rec);
    }
  };
  SimUI.prototype.displayGameOver = function () {}; // default prints; silence it
  return new SimUI();
}

// Construct an engine and install the browser-global dendryUI the scene JS expects
// (post_event's turn-advance reads dendryUI.dendryEngine.state.currentHands).
export function makeEngine(ui, game) {
  const eng = new engineLib.DendryEngine(ui, game);
  globalThis.dendryUI = { dendryEngine: eng, audioQueue: [], audioPlaylist: [] };
  return eng;
}

// mulberry32 PRNG for Math.random override (full determinism incl. game JS blocks)
export function seededRandom(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
