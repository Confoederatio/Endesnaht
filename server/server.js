import express from 'express';
import screenshot from 'screenshot-desktop';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());

const latestScreenshotPath = path.join(__dirname, 'latest_screenshot.jpg');

setInterval(async () => {
	try {
		// Take screenshot as a buffer (JPEG for speed)
		console.time('Updated frame.');
		const imgBuffer = await screenshot({ format: 'jpg' });
		
		// Resize and compress to JPEG, then save
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
		
		console.timeEnd('Updated frame.');
	} catch (err) {
		console.error('Screenshot error:', err);
	}
}, 50);

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