// LinguaHover — Activate Bridge Content Script
// activate.html এ inject হয় — page থেকে window.postMessage পেলে
// extension এর background কে forward করে

window.addEventListener("message", function(event) {
  // শুধু same origin থেকে আসা message নাও
  if (event.origin !== "https://linguahover.github.io") return;
  if (!event.data || event.data.source !== "linguahover-activate") return;

  if (event.data.action === "activateLicense" && event.data.key) {
    chrome.runtime.sendMessage(
      { action: "activateLicense", key: event.data.key },
      function(res) {
        // result টা page এ পাঠিয়ে দাও
        window.postMessage({
          source: "linguahover-bridge",
          action: "activateResult",
          success: res?.success || false,
          plan:    res?.plan    || "",
          error:   res?.error   || ""
        }, "*");
      }
    );
  }
});

// Page কে জানাই যে bridge ready
window.postMessage({ source: "linguahover-bridge", action: "ready" }, "*");
