import express from 'express';
import screenshot from 'screenshot-desktop';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import sharp from 'sharp';
import robot from 'robotjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Needed for JSON POST bodies

const latestScreenshotPath = path.join(__dirname, 'latest_screenshot.jpg');

// Screenshot loop
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

// Mouse click endpoint
app.post('/api/click', (req, res) => {
	const { x, y } = req.body;
	if (
		typeof x !== 'number' ||
		typeof y !== 'number' ||
		x < 0 || x > 1 ||
		y < 0 || y > 1
	) {
		return res.status(400).send('Invalid coordinates');
	}
	const screenSize = robot.getScreenSize();
	const absX = Math.round(x * screenSize.width);
	const absY = Math.round(y * screenSize.height);
	console.log(`Clicked on:`, absX, absY);
	robot.moveMouse(absX, absY);
	robot.mouseClick();
	res.sendStatus(200);
});

// At the top, keep track of held keys
let heldState = {
	key: null,
	modifiers: [],
};

let currentlyHeld = null;

app.post('/api/hold', (req, res) => {
	const { key, modifiers = {}, hold } = req.body;
	if (typeof key !== 'string' || !key.length || typeof hold !== 'boolean') {
		return res.status(400).send('Invalid hold request');
	}
	
	// Map display key to robotjs key
	const keyMap = {
		'Esc': 'escape',
		'Backspace': 'backspace',
		'Tab': 'tab',
		'CapsLock': 'caps_lock',
		'Enter': 'enter',
		'Shift': 'shift',
		'Ctrl': 'control',
		'Alt': 'alt',
		'Win': 'command',
		'Menu': 'menu',
		'Space': 'space',
		'`': 'grave',
		'-': 'minus',
		'=': 'equal',
		'[': 'open_bracket',
		']': 'close_bracket',
		'\\': 'backslash',
		';': 'semicolon',
		'\'': 'apostrophe',
		',': 'comma',
		'.': 'period',
		'/': 'slash',
	};
	
	let robotKey = keyMap[key] || key.toLowerCase();
	
	// Get active modifiers
	const activeModifiers = [];
	if (modifiers.shift) activeModifiers.push('shift');
	if (modifiers.control) activeModifiers.push('control');
	if (modifiers.alt) activeModifiers.push('alt');
	if (modifiers.command) activeModifiers.push('command');
	
	try {
		// If a key is already held, release it first
		if (currentlyHeld && (hold && (currentlyHeld.robotKey !== robotKey || JSON.stringify(currentlyHeld.activeModifiers) !== JSON.stringify(activeModifiers)))) {
			robot.keyToggle(currentlyHeld.robotKey, 'up', currentlyHeld.activeModifiers);
			currentlyHeld = null;
		}
		
		if (hold) {
			robot.keyToggle(robotKey, 'down', activeModifiers);
			currentlyHeld = { robotKey, activeModifiers };
			res.sendStatus(200);
		} else {
			robot.keyToggle(robotKey, 'up', activeModifiers);
			currentlyHeld = null;
			res.sendStatus(200);
		}
	} catch (err) {
		console.error('Hold error:', err);
		res.status(500).send('Hold failed');
	}
	
	console.log(`Hold event:`, req.body);
});

// Keypress endpoint
app.post('/api/keypress', (req, res) => {
	const { key, modifiers = {} } = req.body;
	if (typeof key !== 'string' || !key.length) {
		return res.status(400).send('Invalid key');
	}
	
	// Map display key to robotjs key
	const keyMap = {
		'Esc': 'escape',
		'Backspace': 'backspace',
		'Tab': 'tab',
		'CapsLock': 'caps_lock',
		'Enter': 'enter',
		'Shift': 'shift',
		'Ctrl': 'control',
		'Alt': 'alt',
		'Win': 'command',
		'Menu': 'menu',
		'Space': 'space',
		'`': 'grave',
		'-': 'minus',
		'=': 'equal',
		'[': 'open_bracket',
		']': 'close_bracket',
		'\\': 'backslash',
		';': 'semicolon',
		'\'': 'apostrophe',
		',': 'comma',
		'.': 'period',
		'/': 'slash',
	};
	
	let robotKey = keyMap[key] || key.toLowerCase();
	
	// Get active modifiers
	const activeModifiers = [];
	if (modifiers.shift) activeModifiers.push('shift');
	if (modifiers.control) activeModifiers.push('control');
	if (modifiers.alt) activeModifiers.push('alt');
	if (modifiers.command) activeModifiers.push('command');
	
	try {
		robot.keyTap(robotKey, activeModifiers);
		res.sendStatus(200);
	} catch (err) {
		console.error('Keypress error:', err);
		res.status(500).send('Keypress failed');
	}
	
	console.log(`Keypress event:`, req.body);
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

process.on('exit', () => {
	if (heldState.key) {
		robot.keyToggle(heldState.key, 'up', heldState.modifiers);
		for (const mod of heldState.modifiers) {
			robot.keyToggle(mod, 'up');
		}
	}
});