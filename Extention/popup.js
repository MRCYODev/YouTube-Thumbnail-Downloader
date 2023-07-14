document.addEventListener('DOMContentLoaded', function() {
  var videoLinkInput = document.getElementById('video-link');
  var thumbnailPreview = document.getElementById('thumbnail-preview');
  var thumbnailLink = document.getElementById('thumbnail-link');
  var resolutionSelect = document.getElementById('resolution-select');
  var downloadButton = document.getElementById('download-button');
  var previewButton = document.getElementById('preview-button');
  var thumbnailURL = '';

  videoLinkInput.addEventListener('input', function() {
    var videoLink = videoLinkInput.value;
    var videoId = getVideoId(videoLink);
    if (videoId) {
      thumbnailURL = 'https://img.youtube.com/vi/' + videoId + '/' + resolutionSelect.value + '.jpg';
      thumbnailPreview.src = thumbnailURL;
      thumbnailLink.href = thumbnailURL;
      downloadButton.disabled = false;
      previewButton.disabled = false;
    } else {
      thumbnailPreview.src = '';
      thumbnailLink.removeAttribute('href');
      downloadButton.disabled = true;
      previewButton.disabled = true;
    }
  });

  resolutionSelect.addEventListener('change', function() {
    if (thumbnailURL) {
      thumbnailURL = thumbnailURL.replace(/\/[^\/]+\.jpg$/, '/' + resolutionSelect.value + '.jpg');
      thumbnailPreview.src = thumbnailURL;
      thumbnailLink.href = thumbnailURL;
    }
  });

  downloadButton.addEventListener('click', function() {
    if (thumbnailURL) {
      chrome.runtime.sendMessage({ action: 'downloadThumbnail', url: thumbnailURL });
    }
  });

  previewButton.addEventListener('click', function() {
    if (thumbnailURL) {
      window.open(thumbnailURL);
    }
  });

  // Function to extract the video ID from the YouTube URL
  function getVideoId(url) {
    var videoId = '';
    var regex = /[?&]v=([^&#]*)/i;
    var match = regex.exec(url);
    if (match && match[1]) {
      videoId = match[1];
    }
    return videoId;
  }
});
