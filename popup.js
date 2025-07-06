chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { type: "getLeakData" }, (response) => {
    if (!response) {
      document.getElementById("report").innerText = "No data found.";
      return;
    }

    let html = "<ul>";
    html += `<li><b>Referrer:</b> ${response.referrer}</li>`;
    html += `<li><b>Timezone:</b> ${response.navigator.timezone}</li>`;
    html += `<li><b>User Agent:</b> ${response.navigator.userAgent}</li>`;
    html += `<li><b>Screen:</b> ${response.screen.width}x${response.screen.height}</li>`;
    html += `<li><b>Canvas FP (short):</b> ${response.canvasFingerprint?.slice(0, 30)}...</li>`;
    html += "</ul>";

    document.getElementById("report").innerHTML = html;
  });
});
