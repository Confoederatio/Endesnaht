import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import screenshot from "screenshot-desktop";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const latestScreenshotPath = path.join(__dirname, "latest_screenshot.png");

// Take a screenshot every 5 seconds and save as PNG
setInterval(async () => {
	try {
		await screenshot({ filename: latestScreenshotPath, format: "png" });
	} catch (err) {
		console.error("Screenshot error:", err);
	}
}, 5000);

// Endpoint to serve the latest screenshot
app.get(['/api/screenshot', '/api/screenshot.png'], (req, res) => {
	fs.access(latestScreenshotPath, fs.constants.F_OK, (err) => {
		if (err) {
			res.status(404).send("Screenshot not available");
			return;
		}
		res.set("Content-Type", "image/png");
		fs.createReadStream(latestScreenshotPath).pipe(res);
	});
});

// Your existing Discord token endpoint
app.post("/api/token", async (req, res) => {
	const response = await fetch(`https://discord.com/api/oauth2/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: process.env.VITE_DISCORD_CLIENT_ID,
			client_secret: process.env.DISCORD_CLIENT_SECRET,
			grant_type: "authorization_code",
			code: req.body.code,
		}),
	});
	
	const { access_token } = await response.json();
	res.send({ access_token });
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});