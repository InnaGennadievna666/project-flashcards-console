const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  constructor() {
    this.selectedTopic = null;
  }

  displayTopics(topics) {
    console.log('Выберите тему:');
    topics.forEach((topic, index) => {
      console.log(`${index + 1}. ${topic}`);
    });
  }

  selectTopic(callback) {
    rl.question('Введите номер темы: ', (answer) => {
      const topicIndex = parseInt(answer, 10); // Преобразование ввода в число
      if (!isNaN(topicIndex)) {
        this.selectedTopic = topicIndex;
        callback(topicIndex);
      } else {
        console.log('Пожалуйста, введите действительный номер темы.');
        this.selectTopic(callback); // Повторный запрос в случае неверного ввода
      }
    });
  }

  displayQuestion(question) {
    console.log(question);
  }

  getUserAnswer(callback) {
    rl.question('Ваш ответ: ', (answer) => {
      callback(answer);
    });
  }

  displayCorrectness(isCorrect) {
    console.log(isCorrect ? '\u{1F44D}' : '\u{1F44E}');
  }

  displayResult(result) {
    console.log(`Результат игры: ${result}% правильных ответов`);
    rl.close();
  }
}

module.exports = View;
