// Setting variables
var mode = true;
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
const ws = new WebSocket(
  ws_scheme + '://' + window.location.host + "/"
);
const frames = [];
const canvas = document.getElementById("TempImage");
const context = canvas.getContext("2d");
var incomingMessage = "";

function Mode(){
  if (mode == true){
    mode = false;
    
    ws.onopen = (event) => {
      console.log('Opened!');
    };

    ws.onmessage = (event) => {
      incomingMessage = event.data;
      console.log(incomingMessage);
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
  setInterval(function() {if(audio.volume < maxVolume){ audio.volume = audio.volume + 0.001; console.log(audio.volume); audio.play();}},250) 
  audio.loop = true; 
  Mode();
  await readVideo();
  changeTextTest();

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

    const quality = 0.7;

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
    
    setInterval(()=>{
        changeTextTest(incomingMessage);
      },5000);

    });

}

function changeTextTest(_incomingMessage){
  let text = document.getElementById("guided-meditation");
  switch(_incomingMessage){
    case _incomingMessage = "angry":
      text.innerHTML = "Take a deep breath";
      break;

    case _incomingMessage = "neutral":
      text.innerHTML = "Hold on to this feeling, keep it going";
      break;
    case _incomingMessage = "happy":
      text.innerHTML = "Close your eyes";
      break;

    default:
      text.innerHTML = "Listen to the water";
  }
}
  



