chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'downloadThumbnail') {
    chrome.downloads.download({ url: message.url });
  }
});
