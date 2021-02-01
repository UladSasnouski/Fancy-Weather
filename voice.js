var voiceRecord = document.getElementById('voice-trigger');
var input = document.querySelector('input');

// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    input.value = `${result[0].transcript}`;
  } else {
    console.log('Промежуточный результат: ', result[0].transcript);
  }
};

// Начинаем слушать микрофон и распознавать голос


voiceRecord.onclick = function() {
    recognizer.start()
}