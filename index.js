// =============== RGB to HSL ===============
function RGB_HSL(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	const h = s
	  ? l === r
		? (g - b) / s
		: l === g
		? 2 + (b - r) / s
		: 4 + (r - g) / s
	  : 0;
	return [
	  60 * h < 0 ? 60 * h + 360 : 60 * h,
	  100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
	  (100 * (2 * l - s)) / 2,
	];
  }
  
  // =============== RGB to CMYK ===============
  function RGB_CMYK(r, g, b) {
	let c = 1 - r / 255;
	let m = 1 - g / 255;
	let y = 1 - b / 255;
  
	const k = Math.min(c, m, y);
  
	if (k === 1) {
	  return [0, 0, 0, 1];
	}
  
	c = (c - k) / (1 - k);
	m = (m - k) / (1 - k);
	y = (y - k) / (1 - k);
  
	return [c, m, y, k];
  }
  
  // =============== RGB to HEX ===============
  const RGB_HEX = (r, g, b) => {
	return (
	  "#" +
	  [r, g, b]
		.map((x) => x.toString(16).padStart(2, "0"))
		.join("")
		.toUpperCase()
	);
  };
  
  // =============== RGB to Grayscale ===============
  function RGB_Grayscale(rgba, algorithm = "luminosity") {
	let sum = 0;
	switch (algorithm) {
	  case "averaged":
		sum += parseInt(rgba[0]);
		sum += parseInt(rgba[1]);
		sum += parseInt(rgba[2]);
		break;
	  case "luminosity":
		sum += parseFloat(rgba[0] * 0.3);
		sum += parseFloat(rgba[1] * 0.59);
		sum += parseFloat(rgba[2] * 0.11);
		break;
	}
	const g = Math.ceil(sum);
	return [g, g, g];
  }
  
  // =============== HEX to RGB ===============
  function HEX_RGB(hex) {
	const hex_color = hex.replace("#", "");
	const r = parseInt(hex_color.substring(0, 2), 16);
	const g = parseInt(hex_color.substring(2, 4), 16);
	const b = parseInt(hex_color.substring(4, 6), 16);
	return [r, g, b];
  }
  
  // =============== RGB formatter ===============
  function RGB_formatter(r, g, b, a = null) {
	let formattedRGB = `rgb(${r},${g},${b}`;
	if (a) {
	  formattedRGB += `,${a}`;
	}
	formattedRGB += ")";
	return formattedRGB;
  }
  
  // =============== selectors ===============
  const colorPicker = document.getElementById("colorpicker");
  const colorDisplay = document.getElementById("color-display");
  const grayscaleDisplay = document.getElementById("grayscale");
  
  const rValue = document.getElementById("r-value");
  const gValue = document.getElementById("g-value");
  const bValue = document.getElementById("b-value");
  
  const grValue = document.getElementById("gr-value");
  const ggValue = document.getElementById("gg-value");
  const gbValue = document.getElementById("gb-value");
  
  const cValue = document.getElementById("c-value");
  const mValue = document.getElementById("m-value");
  const yValue = document.getElementById("y-value");
  const kValue = document.getElementById("k-value");
  
  const hValue = document.getElementById("h-value");
  const sValue = document.getElementById("s-value");
  const lValue = document.getElementById("l-value");
  
  const hexValue = document.getElementById("hex-value");
  const luminValue = document.getElementById("lumin-value");
  
  const gcValue = document.getElementById("gc-value");
  const gmValue = document.getElementById("gm-value");
  const gyValue = document.getElementById("gy-value");
  const gkValue = document.getElementById("gk-value");
  
  const ghValue = document.getElementById("gh-value");
  const gsValue = document.getElementById("gs-value");
  const glValue = document.getElementById("gl-value");
  
  // =============== action starts here ===============
  colorPicker.addEventListener("input", function () {
	const HEX = this.value;
	const RGB = HEX_RGB(HEX);
	const HSL = RGB_HSL(RGB[0], RGB[1], RGB[2]);
	const CMYK = RGB_CMYK(RGB[0], RGB[1], RGB[2]);
  
	rValue.textContent = RGB[0];
	gValue.textContent = RGB[1];
	bValue.textContent = RGB[2];
  
	cValue.textContent = CMYK[0].toFixed(2);
	mValue.textContent = CMYK[1].toFixed(2);
	yValue.textContent = CMYK[2].toFixed(2);
	kValue.textContent = CMYK[3].toFixed(2);
  
	hValue.textContent = HSL[0].toFixed(2);
	sValue.textContent = HSL[1].toFixed(2);
	lValue.textContent = HSL[2].toFixed(2);
  
	hexValue.textContent = HEX;
  
	colorDisplay.style.backgroundColor = RGB_formatter(
	  RGB[0],
	  RGB[1],
	  RGB[2]
	);
  
	let grayColor = RGB_Grayscale([RGB[0], RGB[1], RGB[2]]);
	grayscaleDisplay.style.backgroundColor = RGB_formatter(...grayColor);
  
	grValue.textContent = grayColor[0];
	ggValue.textContent = grayColor[1];
	gbValue.textContent = grayColor[2];
  
	const grayCMYK = RGB_CMYK(grayColor[0], grayColor[1], grayColor[2]);
	const grayHSL = RGB_HSL(grayColor[0], grayColor[1], grayColor[2]);
  
	gcValue.textContent = grayCMYK[0].toFixed(2);
	gmValue.textContent = grayCMYK[1].toFixed(2);
	gyValue.textContent = grayCMYK[2].toFixed(2);
	gkValue.textContent = grayCMYK[3].toFixed(2);
  
	ghValue.textContent = grayHSL[0].toFixed(2);
	gsValue.textContent = grayHSL[1].toFixed(2);
	glValue.textContent = grayHSL[2].toFixed(2);
  });
  