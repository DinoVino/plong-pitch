console.log("hello world")

function playAudio(){
  var audio = document.getElementById('river');
  console.log(audio.duration);
  audio.volume = 0;
  var maxVolume = 0.1;
  // Rewrite this nested function to a dedicated piece of code for beauty
  setInterval(function() {if(audio.volume < maxVolume){ audio.volume = audio.volume + 0.01; console.log(audio.volume); audio.play();}},250) 
  audio.loop = true;
  
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

}


