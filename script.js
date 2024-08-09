const btn = document.querySelector("#search-btn");
const result = document.getElementById("result");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let inpt;
btn.addEventListener("click", () => {
   inpt = document.querySelector("#inpt-word").value;
  fetch(`${url}${inpt}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      trans = `${data[0].phonetics[0].audio}`;
      result.innerHTML = `
            <div class="word">
                <h3>${inpt}</h3>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>//${data[0].phonetics[0].text}//</p>
                <div class="circle">                
                 <i class="fa-solid fa-volume-high" onclick="speak()"></i>
                </div>
                               
                                 
            </div>
            <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                 ${data[0].meanings[0].definitions[0].example}
            </p>
      `;
      
    })
    .catch((error) => {
      result.innerHTML = "Couldn't Find The Word Meaning";
      result.style.marginTop = "45px";
      result.style.fontSize = "30px";
    });
});
/*function soundPlay() {
  let au = document.querySelector("#myAudio");
  let tbtn = document.querySelector("#trans");
  tbtn.addEventListener("click", () => {
    au.play();
  });
}
  */
function speak() {
  
  var utterence = new SpeechSynthesisUtterance(inpt);
  speechSynthesis.speak(utterence);
}

//for mic

document.querySelector("#mic").addEventListener("click", function () {
    let speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      document.getElementById("inpt-word").setAttribute("value",transcript);
      console.log(transcript);
    });
    if (speech == true) {
      recognition.start();
    }
  });