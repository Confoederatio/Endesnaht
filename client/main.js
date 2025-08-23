import './style.css';
// Other imports...
import { patchUrlMappings } from '@discord/embedded-app-sdk';

const isProd = process.env.NODE_ENV === 'production';

async function setupApp() {
	if (isProd) {
		patchUrlMappings([{ prefix: '/api', target: 'endesnaht.net' }]);
	}
	
	// Your HTML rendering code here...
	document.querySelector('#app').innerHTML = `
        <div id="main-container" style="
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            display: flex; flex-direction: column; height: 100dvh; width: 100vw;
            background: #222;
        ">
            <div id="screenshot-container" style="
                position: relative; overflow: hidden; touch-action: none;
                flex: 1 1 0; /* Let this container grow and shrink */
                min-height: 0; /* Prevents overflow in flex containers */
                border-bottom: 1px solid #ccc;
                display: flex; align-items: center; justify-content: center;
            ">
                <div id="screenshot-transformer" style="
                    /* This is the stable aspect-ratio box. It will never collapse. */
                    aspect-ratio: 1920 / 1080;
                    max-width: 100%;
                    max-height: 100%;
                    touch-action: none;
                    will-change: transform;
                ">
                    <img id="screenshot" alt="Server Screenshot" style="
                        width: 100%; height: 100%;
                        display: block; /* Removes extra space below image */
                        user-select: none;
                        background: black;
                    " draggable="false" />
                </div>
            </div>
            <div id="keyboard" style="
                flex: 0 0 auto; /* Don't grow, size based on content */
                display: flex; flex-direction: column;
                justify-content: flex-start; align-items: stretch;
                padding: 0.5em; box-sizing: border-box; overflow-y: auto;
                background: #333;
                max-height: 45vh; /* Max height to keep keys square-ish and viewable */
            ">
                <!-- Keyboard HTML is now cleaner, relying on style.css -->
                <div class="kb-row">
                    <button data-key="Esc">Esc</button> <button data-key="F1">F1</button> <button data-key="F2">F2</button> <button data-key="F3">F3</button> <button data-key="F4">F4</button> <button data-key="F5">F5</button> <button data-key="F6">F6</button> <button data-key="F7">F7</button> <button data-key="F8">F8</button> <button data-key="F9">F9</button> <button data-key="F10">F10</button> <button data-key="F11">F11</button> <button data-key="F12">F12</button>
                </div>
                <div class="kb-row">
                    <button data-key="\`">\`</button> <button data-key="1">1</button> <button data-key="2">2</button> <button data-key="3">3</button> <button data-key="4">4</button> <button data-key="5">5</button> <button data-key="6">6</button> <button data-key="7">7</button> <button data-key="8">8</button> <button data-key="9">9</button> <button data-key="0">0</button> <button data-key="-">-</button> <button data-key="=">=</button> <button data-key="Backspace" class="special-key" style="flex-grow: 1.5;">←</button>
                </div>
                <div class="kb-row">
                    <button data-key="Tab" class="special-key" style="flex-grow: 1.5;">Tab</button> <button data-key="Q">Q</button> <button data-key="W">W</button> <button data-key="E">E</button> <button data-key="R">R</button> <button data-key="T">T</button> <button data-key="Y">Y</button> <button data-key="U">U</button> <button data-key="I">I</button> <button data-key="O">O</button> <button data-key="P">P</button> <button data-key="[">[</button> <button data-key="]">]</button> <button data-key="\\" class="special-key" style="flex-grow: 1.5;">\\</button>
                </div>
                <div class="kb-row">
                    <button data-key="CapsLock" class="special-key" style="flex-grow: 1.75;">Caps</button> <button data-key="A">A</button> <button data-key="S">S</button> <button data-key="D">D</button> <button data-key="F">F</button> <button data-key="G">G</button> <button data-key="H">H</button> <button data-key="J">J</button> <button data-key="K">K</button> <button data-key="L">L</button> <button data-key=";">;</button> <button data-key="'">'</button> <button data-key="Enter" class="special-key" style="flex-grow: 1.75;">⏎</button>
                </div>
                <div class="kb-row">
                    <button data-key="Shift" class="special-key" style="flex-grow: 2.25;">Shift</button> <button data-key="Z">Z</button> <button data-key="X">X</button> <button data-key="C">C</button> <button data-key="V">V</button> <button data-key="B">B</button> <button data-key="N">N</button> <button data-key="M">M</button> <button data-key=",">,</button> <button data-key=".">.</button> <button data-key="/">/</button> <button data-key="Shift" class="special-key" style="flex-grow: 2.25;">Shift</button>
                </div>
                <div class="kb-row">
                    <button data-key="Ctrl" class="special-key">Ctrl</button> <button data-key="Win" class="special-key">Win</button> <button data-key="Alt" class="special-key">Alt</button> <button data-key="Space" class="space-btn" style="flex-grow: 6;">Space</button> <button data-key="Alt" class="special-key">Alt</button> <button data-key="Win" class="special-key">Win</button> <button data-key="Menu" class="special-key">Menu</button> <button data-key="Ctrl" class="special-key">Ctrl</button>
                </div>
            <button id="hold-toggle" style="
                margin: 0.5em auto 0.5em auto; display: block; padding: 0.5em 1em;
                font-size: 1.1em; border-radius: 6px; border: 1px solid #888;
                background: #ddd; cursor: pointer; color: black
            ">Hold: OFF</button>
            </div>
        </div>
    `;
	
	// --- Screenshot Pinch/Pan/Zoom Logic ---
	const screenshotContainer = document.getElementById('screenshot-container');
	const screenshotTransformer = document.getElementById(
		'screenshot-transformer'
	);
	const screenshotImage = document.getElementById('screenshot');
	
	let scale = 1;
	let panX = 0;
	let panY = 0;
	let startX = 0;
	let startY = 0;
	let startDist = 0;
	let lastScale = 1;
	let isPinching = false;
	let lastTouchEnd = 0;
	
	function setTransform() {
		screenshotTransformer.style.transform = `scale(${scale}) translate(${
			panX / scale
		}px, ${panY / scale}px)`;
	}
	
	screenshotContainer.addEventListener('touchstart', (e) => {
		if (e.touches.length === 2) {
			isPinching = true;
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			startDist = Math.hypot(dx, dy);
			lastScale = scale;
			startX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - panX;
			startY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - panY;
		}
	});
	
	screenshotContainer.addEventListener(
		'touchmove',
		(e) => {
			if (e.touches.length === 2 && isPinching) {
				const dx = e.touches[0].clientX - e.touches[1].clientX;
				const dy = e.touches[0].clientY - e.touches[1].clientY;
				const dist = Math.hypot(dx, dy);
				scale = Math.max(1, Math.min(lastScale * (dist / startDist), 5));
				
				const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
				const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
				panX = centerX - startX;
				panY = centerY - startY;
				
				setTransform();
				e.preventDefault();
			}
		},
		{ passive: false }
	);
	
	let lastTap = 0;
	
	screenshotContainer.addEventListener('touchend', (e) => {
		if (e.touches.length < 2) {
			isPinching = false;
		}
		if (e.touches.length === 0) {
			const now = Date.now();
			if (now - lastTap < 300) {
				// Double-tap detected
				scale = 1;
				panX = 0;
				panY = 0;
				setTransform();
			}
			lastTap = now;
		}
	});
	
	screenshotImage.addEventListener('dragstart', (e) => e.preventDefault());
	
	// --- Screenshot Click Logic ---
	screenshotImage.addEventListener('click', async (e) => {
		if (isPinching) return;
		const rect = screenshotImage.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		
		await fetch('/api/click', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ x, y }),
		});
	});
	
	// --- Screenshot Refresh Logic ---
	async function updateScreenshot() {
		try {
			const response = await fetch('/api/screenshot', { cache: 'no-store' });
			if (response.ok) {
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				screenshotImage.src = url;
				screenshotImage.onload = () => {
					URL.revokeObjectURL(url);
					// NO MORE JAVASCRIPT STABILIZATION NEEDED!
					// The CSS 'aspect-ratio' property handles everything.
				};
			}
		} catch (err) {
			/* Handle errors */
		}
		requestAnimationFrame(updateScreenshot);
	}
	
	updateScreenshot();
	
	// --- Keyboard Logic ---
	let modifiers = { Shift: false, Ctrl: false, Alt: false, Win: false };
	let capsLock = false;
	
	function isModifier(key) {
		return ['Shift', 'Ctrl', 'Alt', 'Win'].includes(key);
	}
	function isCapsLock(key) {
		return key === 'CapsLock';
	}
	
	document.getElementById('keyboard').addEventListener('click', async (e) => {
		if (e.target.tagName !== 'BUTTON' || !e.target.dataset.key) return;
		const key = e.target.dataset.key;
		
		if (isModifier(key)) {
			modifiers[key] = !modifiers[key];
			document
			.querySelectorAll(`#keyboard button[data-key="${key}"]`)
			.forEach((btn) => {
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
		
		await fetch('/api/keypress', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				key: key,
				modifiers: currentModifiers,
			}),
		});
		
		Object.keys(modifiers).forEach((mod) => {
			if (modifiers[mod]) {
				modifiers[mod] = false;
				document
				.querySelectorAll(`#keyboard button[data-key="${mod}"]`)
				.forEach((btn) => {
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