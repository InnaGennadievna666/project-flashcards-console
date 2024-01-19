const fs = require('fs');
const path = require('path');

class Model {
  constructor() {
    this.topics = [];
    this.questions = {};
  }

  readTopics(directory) {
    this.topics = fs.readdirSync(directory).map((file) => path.basename(file, '.txt'));
  }

  readQuestions(topic, directory) {
    const filePath = path.join(directory, `${topic}.txt`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    this.questions[topic] = [];
    for (let i = 0; i < lines.length; i += 2) {
      const question = lines[i].trim();
      const answer = lines[i + 1] ? lines[i + 1].trim() : null;
      if (question && answer) {
        this.questions[topic].push({ question, answer });
      }
    }
  }
}

module.exports = Model;
