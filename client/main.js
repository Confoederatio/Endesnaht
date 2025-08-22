import './style.css'
import rocketLogo from '/rocket.png'
import screenshot from "../server/latest_screenshot.png"

const API_BASE =
	window.location.hostname === "localhost"
		? "http://localhost:3001"
		: "https://endesnaht.net";

setInterval(async() => {
	window.screenshot = await import("../server/latest_screenshot.png")
	
	document.querySelector('#app').innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>${Date.now()}</h1>
    <img id="screenshot" src="${screenshot}" alt="Server Screenshot" style="max-width: 100%; border: 1px solid #ccc; margin-top: 1em;" />
  </div>
`;
}, 1000);