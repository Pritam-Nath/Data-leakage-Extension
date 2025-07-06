let leakData = {
  screen: {
    width: screen.width,
    height: screen.height,
    colorDepth: screen.colorDepth
  },
  navigator: {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  referrer: document.referrer,
  canvasFingerprint: null
};

// Detect canvas fingerprinting
function detectCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.fillText("fingerprint", 2, 2);
  const fp = canvas.toDataURL();
  leakData.canvasFingerprint = fp;
}

detectCanvasFingerprint();

// Send data to popup
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "getLeakData") {
    sendResponse(leakData);
  }
});
