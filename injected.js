console.log("Ok injected file worked");
window.postMessage({ type: "FROM_CHROME_EXT", text: window.mynick }, "*");
