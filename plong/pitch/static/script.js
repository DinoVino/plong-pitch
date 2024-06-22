// console.log("hello world")

// Setting variables
var mode = true;
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
const ws = new WebSocket(
  ws_scheme + '://' + window.location.host + "/"
);
const frames = [];
const canvas = document.getElementById("TempImage");
const context = canvas.getContext("2d");

function Mode(){
  if (mode == true){
    mode = false;
    
    ws.onopen = (event) =>{
      console.log('Opened!');
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    };

    ws.onclose = (event) => {
      console.log("Close");
    };
  }
}

function TestMessage(){
  ws.send("hello world");
}

async function playAudio(){
  var audio = document.getElementById('river');
  console.log(audio.duration);
  audio.volume = 0;
  var maxVolume = 0.1;
  // Rewrite this nested function to a dedicated piece of code for beauty
  setInterval(function() {if(audio.volume < maxVolume){ audio.volume = audio.volume + 0.01; console.log(audio.volume); audio.play();}},250) 
  audio.loop = true;
  
  // Code might be obsolete after websocket/django channels implementation  
  var canvas = document.getElementById("TempImage");
  var context = canvas.getContext("2d");
  var feed = document.getElementById("feed");
  // var mediaDevices = navigator.mediaDevices;
  // feed.muted = true; 

  // mediaDevices
  //   .getUserMedia({
  //      video: true,
  //      audio: false,
  //    })
  //   .then((stream) =>{
  //     feed.srcObject = stream;
  //     feed.play();
  //     var width = feed.width;
  //     var height = feed.height;
  //     var delay = 250;
  //     var quality = 0.7;

  //     // rewrite the code, blob is empty due to HTML5 changes
  //     setInterval(() => {
  //       context.drawImage(feed, 0, 0, width, height);
  //       canvas.toBlob((blob) =>{
  //         if(ws.readyState == WebSocket.OPEN){
  //           if(mode ==true){
  //             ws.send(new Uint8Array([]));
  //           }else{
  //             ws.send(blob);
  //           }
  //         }
  //       }, 'image/jpeg', quality)
  //     }, delay);
  //   })
  //   .catch(alert);
  await readVideo();
  Mode();

}

async function readVideo()
{
  const webcamVideoTag = document.getElementById('feed');
  navigator.mediaDevices.getUserMedia(
    {video:true,}
  )
  .then((stream) =>{
    webcamVideoTag.srcObject = stream;
    webcamVideoTag.play();
    const videoTrack = stream.getVideoTracks()[0];
    const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
    const quality = 0.7;
    const reader = trackProcessor.readable.getReader();
    img = new ImageCapture(videoTrack);
    setInterval(() => {
      img.grabFrame()
      .then((imageBitmap) =>{
      const canvas = document.getElementById("TempImage");
      context.drawImage(imageBitmap,0,0,700,480);
      canvas.toBlob((blob) =>{
          if(ws.readyState == WebSocket.OPEN){
            if(mode ==true){
              ws.send(new Uint8Array([]));
            }else{
              ws.send(blob);
            }
          }
        }, 'image/jpeg', quality)
      });
    },500); 
    

    });

}

  
  



