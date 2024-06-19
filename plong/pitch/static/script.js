console.log("hello world")

function playAudio(){
  
  var audio = document.getElementById('river');
  console.log(audio.duration);
  audio.volume = 0;
  var maxVolume = 0.1;
  setInterval(function() {if(audio.volume < maxVolume){ audio.volume = audio.volume + 0.01; console.log(audio.volume); audio.play();}},250) 
  audio.loop = true;
}
