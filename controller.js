class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
  }

  init() {
    this.model.readTopics('topics');
    this.view.displayTopics(this.model.topics);
    this.view.selectTopic((topicIndex) => {
      // Убедитесь, что введенный индекс находится в допустимом диапазоне
      if (topicIndex > 0 && topicIndex <= this.model.topics.length) {
        const topic = this.model.topics[topicIndex - 1];
        this.model.readQuestions(topic, 'topics');
        this.nextQuestion();
      } else {
        console.log('Неверный номер темы. Пожалуйста, выберите из списка.');
        this.view.selectTopic(topicIndex);
      }
    });
  }

  nextQuestion() {
    const topic = this.model.topics[this.view.selectedTopic - 1];
    const questions = this.model.questions[topic];

    if (this.currentQuestionIndex < questions.length) {
      const { question } = questions[this.currentQuestionIndex];
      this.view.displayQuestion(question);
      this.view.getUserAnswer((answer) => {
        const isCorrect = answer.trim().toLowerCase() === questions[this.currentQuestionIndex].answer.toLowerCase();
        if (isCorrect) {
          this.correctAnswers++;
        }
        this.view.displayCorrectness(isCorrect);

        // Переход к следующему вопросу
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < questions.length) {
          this.nextQuestion();
        } else {
          this.endGame();
        }
      });
    }
  }

  endGame() {
    const questions = this.model.questions[this.model.topics[this.view.selectedTopic - 1]];
    const result = (this.correctAnswers / questions.length) * 100;
    this.view.displayResult(result.toFixed(2));
  }
}

module.exports = Controller;
