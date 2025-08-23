import express from 'express';
import screenshot from 'screenshot-desktop';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Hardware, getScreenSize } from 'keysender';
import robot from 'robotjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const latestScreenshotPath = path.join(__dirname, 'latest_screenshot.jpg');

// Use entire desktop as workwindow
const hardware = new Hardware();

setInterval(async () => {
	try {
		const imgBuffer = await screenshot({ format: 'jpg' });
		await sharp(imgBuffer)
		.resize({
			width: 1920,
			height: 1080,
			fit: 'inside',
			withoutEnlargement: true,
		})
		.jpeg({
			quality: 70,
			progressive: true,
			chromaSubsampling: '4:4:4',
		})
		.toFile(latestScreenshotPath);
	} catch (err) {
		console.error('Screenshot error:', err);
	}
}, 100);

// Mouse click endpoint using robotjs
app.post('/api/click', (req, res) => {
	const { x, y } = req.body;
	if (
		typeof x !== 'number' ||
		typeof y !== 'number' ||
		x < 0 || x > 1 ||
		y < 0 || y > 1
	) {
		console.log(`[CLICK] Invalid coordinates:`, req.body);
		return res.status(400).send('Invalid coordinates');
	}
	const screenSize = robot.getScreenSize();
	const absX = Math.round(x * screenSize.width);
	const absY = Math.round(y * screenSize.height);
	console.log(`[CLICK] robotjs moving mouse to: (${absX}, ${absY})`);
	robot.moveMouse(absX, absY);
	console.log(`[CLICK] robotjs clicking mouse`);
	robot.mouseClick();
	res.sendStatus(200);
});

// Key mapping for keysender
const keyMap = {
	'Esc': 'escape',
	'Backspace': 'backspace',
	'Tab': 'tab',
	'CapsLock': 'capsLock',
	'Enter': 'enter',
	'Shift': 'shift',
	'Ctrl': 'ctrl',
	'Alt': 'alt',
	'Win': 'lWin', // or 'rWin'
	'Menu': 'menu',
	'Space': 'space',
	'`': '`',
	'-': '-',
	'=': '=',
	'[': '[',
	']': ']',
	'\\': '\\',
	';': ';',
	'\'': '\'',
	',': ',',
	'.': '.',
	'/': '/',
	// F1-F12
	'F1': 'f1', 'F2': 'f2', 'F3': 'f3', 'F4': 'f4', 'F5': 'f5', 'F6': 'f6',
	'F7': 'f7', 'F8': 'f8', 'F9': 'f9', 'F10': 'f10', 'F11': 'f11', 'F12': 'f12',
	// Add more as needed
};

function getKeysenderCombo(key, modifiers) {
	const mappedKey = keyMap[key] || key.toLowerCase();
	const combo = [];
	if (modifiers) {
		if (modifiers.control) combo.push('ctrl');
		if (modifiers.shift) combo.push('shift');
		if (modifiers.alt) combo.push('alt');
		if (modifiers.command) combo.push('lWin');
	}
	if (combo.length === 0) {
		return mappedKey;
	} else {
		combo.push(mappedKey);
		return combo;
	}
}

// Keypress endpoint (press and release)
app.post('/api/keypress', async (req, res) => {
	const { key, modifiers = {} } = req.body;
	if (typeof key !== 'string' || !key.length) {
		console.log(`[KEYPRESS] Invalid key:`, req.body);
		return res.status(400).send('Invalid key');
	}
	const combo = getKeysenderCombo(key, modifiers);
	console.log(`[KEYPRESS] sendKey:`, combo, 'from', req.body);
	try {
		await hardware.keyboard.sendKey(combo);
		res.sendStatus(200);
	} catch (err) {
		console.error('[KEYPRESS] Keypress error:', err);
		res.status(500).send('Keypress failed');
	}
});

// --- THE ONLY CORRECT "HOLD" IMPLEMENTATION FOR GAMES/APPS ---
// Interval and delay are the same. Debug logs everywhere.

let holdInterval = null;
let heldCombo = null;
const HOLD_INTERVAL = 50; // ms
const HOLD_DELAY = 50;    // ms

app.post('/api/hold', async (req, res) => {
	const { key, modifiers = {}, hold } = req.body;
	if (typeof key !== 'string' || !key.length || typeof hold !== 'boolean') {
		console.log(`[HOLD] Invalid hold request:`, req.body);
		return res.status(400).send('Invalid hold request');
	}
	const combo = getKeysenderCombo(key, modifiers);
	
	// If a new key is held, stop previous interval
	if (holdInterval && (hold && JSON.stringify(heldCombo) !== JSON.stringify(combo))) {
		console.log(`[HOLD] Stopping previous hold for:`, heldCombo);
		clearInterval(holdInterval);
		holdInterval = null;
		heldCombo = null;
	}
	
	if (hold) {
		if (!holdInterval) {
			heldCombo = combo;
			console.log(`[HOLD] Starting repeated sendKey for:`, combo, 'from', req.body);
			holdInterval = setInterval(() => {
				console.log(`[HOLD] sendKey (hold):`, combo);
				hardware.keyboard.sendKey(combo, HOLD_DELAY);
			}, HOLD_INTERVAL);
		}
	} else {
		if (holdInterval) {
			console.log(`[HOLD] Stopping hold for:`, combo, 'from', req.body);
			clearInterval(holdInterval);
			holdInterval = null;
			heldCombo = null;
		}
	}
	res.sendStatus(200);
});

// Screenshot endpoint
app.get('/api/screenshot', (req, res) => {
	res.set({
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		Pragma: 'no-cache',
		Expires: '0',
		'Content-Type': 'image/jpeg',
	});
	
	if (fs.existsSync(latestScreenshotPath)) {
		res.sendFile(latestScreenshotPath);
	} else {
		res.status(404).send('Screenshot not available yet.');
	}
});

app.listen(port, () => {
	console.log(`✅ Server listening at http://localhost:${port}`);
});