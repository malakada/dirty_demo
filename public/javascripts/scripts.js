// Shim for all browsers.
navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);

if (navigator.getUserMedia) {
  navigator.getUserMedia({
    video: true,
    audio: true
  }, onSuccess, onError);
} else {
  alert('getUserMedia is not supported in this browser.');
}

function onSuccess(stream) {
  var video = document.getElementById('webcam');
  var photo = document.getElementById('photo');
  var videoSource, audioContext, mediaStreamSource;

  if(window.webkitURL) {
    videoSource = window.webkitURL.createObjectURL(stream);
  } else {
    videoSource = stream;
  }

  video.autoplay = true;
  video.src = videoSource

  window.audioContext || (window.audioContext = window.webkitAudioContext);

  if (window.audioContext) {
    audioContext = new window.audioContext();
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(audioContext.destination);
  }
}

function onError() {
  alert('There has been a problem retrieving the streams--did you allow access?');
}

function takePhoto() {
  var video = document.getElementById('webcam');
  var photo = document.getElementById('photo');
  var context = photo.getContext('2d');

  photo.width = video.clientWidth;
  photo.height = video.clientHeight;

  context.drawImage(video, 0, 0, photo.width, photo.height);

  var panel = document.getElementById('content-panel');
  panel.innerHTML = "Looking fabulous darlings!";
}

if (annyang) {
  var commands = {
    'say cheese': function () {
      takePhoto();
    },
    'mojo lingo': function () {
      var panel = document.getElementById('content-panel');
      panel.innerHTML = "Mojo Lingo is awesome!";
    },
    'atlanta ruby group': function () {
      var panel = document.getElementById('content-panel');
      panel.innerHTML = "Atlanta is the best!";
    },
    'ruby group': function () {
      var panel = document.getElementById('content-panel');
      panel.innerHTML = "Atlanta is the best!";
    },
    'mel': function () {
      var panel = document.getElementById('content-panel');
      panel.innerHTML = "Mel is truly the fairest in the land!";
    }
  }
  annyang.init(commands);
  annyang.start();

  annyang.addCallback('start',          function(){console.log('start');})
  annyang.addCallback('error',          function(){console.log('error');})
  annyang.addCallback('end',            function(){console.log('end');})
  annyang.addCallback('result',         function(){console.log('result');})
  annyang.addCallback('resultMatch',    function(){console.log('resultMatch');})
  annyang.addCallback('resultNoMatch',  function(){console.log('resultNoMatch');})
} else {
  alert("no annyang");
}
