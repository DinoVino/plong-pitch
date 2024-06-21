// console.log("hello world")

// Setting variables
var mode = true;
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
const ws = new WebSocket(
  ws_scheme + '://' + window.location.host + "/"
);

function Mode(){
  if (mode == true){
    mode = false;
    
    ws.onopen = (event) =>{
      console.log('Opened!');
    };

    ws.onmessage = (event) => {
      console.log("WS data received" + event.data);
    };

    ws.onclose = (event) => {
      console.log("Close");
    };
  }
}

function TestMessage(){
  ws.send("hello world");
}

function playAudio(){
  var audio = document.getElementById('river');
  console.log(audio.duration);
  audio.volume = 0;
  var maxVolume = 0.1;
  // Rewrite this nested function to a dedicated piece of code for beauty
  setInterval(function() {if(audio.volume < maxVolume){ audio.volume = audio.volume + 0.01; console.log(audio.volume); audio.play();}},250) 
  audio.loop = true;
  // Code might be obsolete after websocket/django channels implementation  
  /*
  let feed = document.getElementById("feed");
  let mediaDevices = navigator.mediaDevices;
  feed.muted = true; 

  mediaDevices
    .getUserMedia({
       video: true,
       audio: false,
     })
    .then((stream) =>{
      feed.srcObject = stream;
      feed.addEventListener("loadedmetadata",() =>{
        feed.play();
      });
    })
    .catch(alert);
  */
  Mode();

}


