// Shim for all browsers.
navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);

if (navigator.getUserMedia) {
  alert('It will work!');
} else {
  alert('getUserMedia is not supported in this browser.');
}
