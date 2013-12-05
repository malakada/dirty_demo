// Shim for all browsers.
navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);

var text_panel, annoyed_interval;

$(window).load(function() {
  text_panel = document.getElementById('content-panel');
});

if (navigator.getUserMedia) {
  navigator.getUserMedia({
    video: true
  }, onSuccess, onError);
} else {
  alert('getUserMedia is not supported in this browser.');
}

function onSuccess(stream) {
  var videoSource, mediaStreamSource;
  var video = document.getElementById('webcam');
  var photo = document.getElementById('photo');

  if(window.webkitURL) {
    videoSource = window.webkitURL.createObjectURL(stream);
  } else {
    videoSource = stream;
  }

  video.autoplay = true;
  video.src = videoSource
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

// Puts the blurb into the innerHTML of the panel.
function drawTextPanel(panel, blurb) {
  panel.innerHTML = blurb;
}

// When annyang is matching a command, let the user know.
function onResult() {
  thinkingAdam();
}

// What annyang could not match the command, let the user know.
function onResultNoMatch(result) {
  annoyedAdam();
  drawTextPanel(text_panel, '<p>What you said made no kind of sense at all. It sounded like "' + result + '", but I don\'t care to do anything with that.</p>');
}

function onResultMatch() {
  talkingAdam();
}

function ratchet() {
  var panel = document.getElementById('content-panel');
  var blurb = "<img src='/images/ratchetconf-logo.png'>"

  panel.innerHTML = blurb;
}

function mel() {
  var panel = document.getElementById('content-panel');
  var blurb = "<h1>Someone say Mel?</h1><p>She is truly the fairest in the land.</p><p>And great at dressing me.</p>";
}

function thinkingAdam() {
  $('#magic-adam').hide();
  $('#magic-adam-thinking').show();
  $('#magic-adam-annoyed').hide();
}

function talkingAdam() {
  clearInterval(annoyed_interval);
  $('#magic-adam').show();
  $('#magic-adam-thinking').hide();
  $('#magic-adam-annoyed').hide();
}

function annoyedAdam() {
  $('#magic-adam').hide();
  $('#magic-adam-thinking').hide();
  $('#magic-adam-annoyed').show();
  annoyed_interval = setInterval(function () {
    talkingAdam();
  }, 3000);
}

if (annyang) {
  var commands = {
    'say cheese': function () {
      takePhoto();
    },
    'mojo lingo': function () {
      var blurb = "<h1>Mojo Lingo!</h1><p>We are a pretty stand-up sort of people, if you ask me.</p>";
      drawTextPanel(text_panel, blurb);
    },
    'atlanta (ruby) group': function () {
      var blurb = "<h1>Hi, ATL RUG!</h1><p>Gosh you're looking good tonight.</p>";
      drawTextPanel(text_panel, blurb);
    },
    'ruby group': function () {
      var blurb = "<h1>Hi, ATL RUG!</h1><p>Gosh you're looking good tonight.</p>";
      drawTextPanel(text_panel, blurb);
    },
    'ratchet': function () {
      ratchet();
    },
    'mel': function () {
      var blurb = "<h1>Someone say Mel?</h1><p>She is truly the fairest in the land.</p><p>And great at dressing me.</p>";
      drawTextPanel(text_panel, blurb);
    },
    'hello': function () {
      var blurb = "<h1>HALLOOOO!</h1><p>I'm Adam S. Rabbit.</p><p>No, I will not be pulling a rabbit out of my top hat.</p><p>Yes, I am the best thing to grace your ocular input devices tonight.</p>";
      drawTextPanel(text_panel, blurb);
    },
    ':nomatch': function (message) {
      onResultNoMatch(message);
    }
  }
  annyang.init(commands);
  annyang.start();

  annyang.addCallback('start',          function(){console.log('start');});
  annyang.addCallback('error',          function(){console.log('error');});
  annyang.addCallback('end',            function(){console.log('end');});
  annyang.addCallback('result',         function(){ onResult();});
  annyang.addCallback('resultMatch',    function(){ onResultMatch(); });
} else {
  alert("no annyang");
}
