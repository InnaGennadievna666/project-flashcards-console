const { log } = require('console');
const fs = require('fs');
const path = require('path');

class Model {
  constructor() {
    this.topics = [];
    this.questions = {};
  }

  getTopics() {
    const fileNames = fs.readFileSync('./topics/otter_flashcard_data.txt', 'utf-8').split('\n').filter( (el) => el !== '')
    return fileNames;
  }

 readQuestions(getTopics) {
    const qnaObject = {};
    for (let i = 0; i < getTopics().length; i++) {
      if(i % 2 === 0) {
        qnaObject[getTopics()[i]] = getTopics()[i+1];
      }
    }
  }
}

module.exports = Model;

