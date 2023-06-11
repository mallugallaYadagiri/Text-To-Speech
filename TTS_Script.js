const textarea = document.querySelector("#text");
let voicelist = document.querySelector("#voice");
let speechbtn = document.querySelector(".submit");

let synth = speechSynthesis;
let isSpeaking = true;

function voicespeech() {
  for (let voice of synth.getVoices()) {
    let option = document.createElement("option");
    option.text = voice.name;
    voicelist.add(option);
    console.log(option);
  }
}

synth.addEventListener("voicechanged", voicespeech);

function texttospeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voicelist.value) {
      utternance.voice = voice;
    }
  }
  speechSynthesis.speak(utternance);
}

speechbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      texttospeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechbtn.innerText = "Convert to Speech";
        } else {
        }
      }, 500);
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechbtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechbtn.innerText = "Resume Speech";
      }
    } else {
      speechbtn.innerText = "Convert to Speech";
    }
  }
});
