import { getNewCity } from './main.js';

var voiceRecord = document.getElementById('voice-trigger');
var input = document.querySelector('input');
var recognizer = new webkitSpeechRecognition();

recognizer.interimResults = true;
recognizer.lang = 'ru-Ru';

recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    input.value = `${result[0].transcript}`;
    getNewCity();
  } else {
    console.log('Промежуточный результат: ', result[0].transcript);
  }
};

voiceRecord.onclick = function () {
  recognizer.start()
}