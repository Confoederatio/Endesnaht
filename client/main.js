import './style.css';
import rocketLogo from '/rocket.png';

// Import the SDK and patch the URL mappings
import { patchUrlMappings } from '@discord/embedded-app-sdk';

const isProd = process.env.NODE_ENV === 'production'; // Or use your own check

async function setupApp() {
	if (isProd) {
		// This tells the SDK to rewrite /api to your real server
		patchUrlMappings([
			{ prefix: '/api', target: 'endesnaht.net' }
		]);
	}
	
	document.querySelector('#app').innerHTML = `
  <div>
    <h1>Endesnaht (Preview)</h1>
    <img
      id="screenshot"
      alt="Server Screenshot"
      style="max-width: 100%; border: 1px solid #ccc; margin-top: 1em;"
    />
  </div>
`;
	
	const screenshotImage = document.querySelector('#screenshot');
	
	async function updateScreenshot() {
		try {
			const response = await fetch('/api/screenshot', { cache: 'no-store' });
			if (response.ok) {
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				screenshotImage.src = url;
				// Revoke previous object URL after image loads
				screenshotImage.onload = () => URL.revokeObjectURL(url);
			}
		} catch (err) {
			// Optionally handle errors
		}
		// Schedule next frame ASAP
		requestAnimationFrame(updateScreenshot);
	}
	
	updateScreenshot();
}

setupApp();