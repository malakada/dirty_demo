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

function MojoLingo() {
  var panel = document.getElementById('content-panel');
  var blurb = "<h1>Mojo Lingo!</h1><p>We are a pretty stand-up sort of people, if you ask me.</p>";

  panel.innerHTML = blurb;
}

function atlRUG() {
  var panel = document.getElementById('content-panel');
  var blurb = "<h1>Hi, ATL RUG!</h1><p>Gosh you're looking good tonight.</p>";

  panel.innerHTML = blurb;
}

function mel() {
  var panel = document.getElementById('content-panel');
  var blurb = "<h1>Someone say Mel?</h1><p>She is truly the fairest in the land.</p><p>And great at dressing me.</p>";

  panel.innerHTML = blurb;
}

if (annyang) {
  var commands = {
    'say cheese': function () {
      takePhoto();
    },
    'mojo lingo': function () {
      MojoLingo();
    },
    'atlanta ruby group': function () {
      atlRUG();
    },
    'ruby group': function () {
      atlRUG();
    },
    'mel': function () {
      mel();
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
