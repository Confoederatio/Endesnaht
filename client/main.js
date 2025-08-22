import './style.css';
// Other imports...
import { patchUrlMappings } from '@discord/embedded-app-sdk';

const isProd = process.env.NODE_ENV === 'production';

async function setupApp() {
	if (isProd) {
		patchUrlMappings([
			{ prefix: '/api', target: 'endesnaht.net' }
		]);
	}
	
	// Your HTML rendering code here...
	document.querySelector('#app').innerHTML = `
        <div id="main-container" style="
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            display: flex; flex-direction: column; height: 100vh; width: 100vw;
        ">
            <img id="screenshot" alt="Server Screenshot" style="
                max-width: 100%; border: 1px solid #ccc; margin: 0.5em auto 0 auto;
                display: block; height: 40vh; object-fit: contain;
            "/>
            <div id="keyboard" style="
                flex: 1 1 auto; display: flex; flex-direction: column;
                justify-content: flex-start; align-items: stretch;
                padding: 0.5em; box-sizing: border-box; overflow-y: auto;
                background: #f8f8f8;
            ">
                <!-- Your keyboard HTML rows go here -->
                <div class="kb-row">
                    <button data-key="Esc">Esc</button> <button data-key="F1">F1</button> <button data-key="F2">F2</button> <button data-key="F3">F3</button> <button data-key="F4">F4</button> <button data-key="F5">F5</button> <button data-key="F6">F6</button> <button data-key="F7">F7</button> <button data-key="F8">F8</button> <button data-key="F9">F9</button> <button data-key="F10">F10</button> <button data-key="F11">F11</button> <button data-key="F12">F12</button>
                </div>
                <div class="kb-row">
                    <button data-key="\`">\`</button> <button data-key="1">1</button> <button data-key="2">2</button> <button data-key="3">3</button> <button data-key="4">4</button> <button data-key="5">5</button> <button data-key="6">6</button> <button data-key="7">7</button> <button data-key="8">8</button> <button data-key="9">9</button> <button data-key="0">0</button> <button data-key="-">-</button> <button data-key="=">=</button> <button data-key="Backspace">←</button>
                </div>
                <div class="kb-row">
                    <button data-key="Tab">Tab</button> <button data-key="Q">Q</button> <button data-key="W">W</button> <button data-key="E">E</button> <button data-key="R">R</button> <button data-key="T">T</button> <button data-key="Y">Y</button> <button data-key="U">U</button> <button data-key="I">I</button> <button data-key="O">O</button> <button data-key="P">P</button> <button data-key="[">[</button> <button data-key="]">]</button> <button data-key="\\">\\</button>
                </div>
                <div class="kb-row">
                    <button data-key="CapsLock">Caps</button> <button data-key="A">A</button> <button data-key="S">S</button> <button data-key="D">D</button> <button data-key="F">F</button> <button data-key="G">G</button> <button data-key="H">H</button> <button data-key="J">J</button> <button data-key="K">K</button> <button data-key="L">L</button> <button data-key=";">;</button> <button data-key="'">'</button> <button data-key="Enter">⏎</button>
                </div>
                <div class="kb-row">
                    <button data-key="Shift">Shift</button> <button data-key="Z">Z</button> <button data-key="X">X</button> <button data-key="C">C</button> <button data-key="V">V</button> <button data-key="B">B</button> <button data-key="N">N</button> <button data-key="M">M</button> <button data-key=",">,</button> <button data-key=".">.</button> <button data-key="/">/</button> <button data-key="Shift">Shift</button>
                </div>
                <div class="kb-row">
                    <button data-key="Ctrl">Ctrl</button> <button data-key="Win">Win</button> <button data-key="Alt">Alt</button> <button data-key="Space" class="space-btn">Space</button> <button data-key="Alt">Alt</button> <button data-key="Win">Win</button> <button data-key="Menu">Menu</button> <button data-key="Ctrl">Ctrl</button>
                </div>
            </div>
            <button id="hold-toggle" style="
								margin: 0.5em auto 0.5em auto; display: block; padding: 0.5em 1em;
								font-size: 1.1em; border-radius: 6px; border: 1px solid #888;
								background: #eee; cursor: pointer; color: black
						">Hold: OFF</button>
        </div>
    `;
	
	const screenshotImage = document.getElementById('screenshot');
	
	screenshotImage.addEventListener('click', async (e) => {
		const rect = screenshotImage.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		await fetch('/api/click', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ x, y }),
		});
	});
	
	async function updateScreenshot() {
		try {
			const response = await fetch('/api/screenshot', { cache: 'no-store' });
			if (response.ok) {
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				screenshotImage.src = url;
				screenshotImage.onload = () => URL.revokeObjectURL(url);
			}
		} catch (err) { /* Handle errors */ }
		requestAnimationFrame(updateScreenshot);
	}
	
	updateScreenshot();
	
	// --- Keyboard Logic ---
	let modifiers = { Shift: false, Ctrl: false, Alt: false, Win: false };
	let capsLock = false; // This is now for UI only
	
	function isModifier(key) { return ['Shift', 'Ctrl', 'Alt', 'Win'].includes(key); }
	function isCapsLock(key) { return key === 'CapsLock'; }
	
	document.getElementById('keyboard').addEventListener('click', async (e) => {
		if (e.target.tagName !== 'BUTTON' || !e.target.dataset.key) return;
		
		const key = e.target.dataset.key;
		
		if (isModifier(key)) {
			modifiers[key] = !modifiers[key];
			document.querySelectorAll(`#keyboard button[data-key="${key}"]`).forEach(btn => {
				btn.classList.toggle('active', modifiers[key]);
			});
			return;
		}
		
		if (isCapsLock(key)) {
			capsLock = !capsLock;
			e.target.classList.toggle('active', capsLock);
			await fetch('/api/keypress', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ key: 'CapsLock' }),
			});
			return;
		}
		
		const currentModifiers = {
			shift: modifiers.Shift,
			control: modifiers.Ctrl,
			alt: modifiers.Alt,
			command: modifiers.Win,
		};
		
		if (holdMode) {
			// If a key is already held, release it first
			if (heldKey) {
				await fetch('/api/hold', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						key: heldKey,
						modifiers: heldModifiers,
						hold: false,
					}),
				});
			}
			// Hold the new key
			await fetch('/api/hold', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					key: key,
					modifiers: currentModifiers,
					hold: true,
				}),
			});
			heldKey = key;
			heldModifiers = currentModifiers;
			return;
		}
		
		// Normal keypress
		await fetch('/api/keypress', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				key: key,
				modifiers: currentModifiers,
			}),
		});
		
		// Reset one-time modifiers after they are used
		Object.keys(modifiers).forEach((mod) => {
			if (modifiers[mod]) {
				modifiers[mod] = false;
				document.querySelectorAll(`#keyboard button[data-key="${mod}"]`).forEach(btn => {
					btn.classList.remove('active');
				});
			}
		});
	});
	
	let holdMode = false;
	let heldKey = null;
	let heldModifiers = null;
	
	const holdToggleBtn = document.getElementById('hold-toggle');
	holdToggleBtn.addEventListener('click', async () => {
		holdMode = !holdMode;
		holdToggleBtn.textContent = `Hold: ${holdMode ? 'ON' : 'OFF'}`;
		holdToggleBtn.classList.toggle('active', holdMode);
		
		// If turning off, release the held key on server
		if (!holdMode && heldKey) {
			await fetch('/api/hold', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					key: heldKey,
					modifiers: heldModifiers,
					hold: false,
				}),
			});
			heldKey = null;
			heldModifiers = null;
		}
	});
}

setupApp();