import React, { Component } from "react";
import Options from "./components/options";
import Question from "./components/question";
import Score from "./components/score";
import Footer from "./components/footer";

// https://opentdb.com/
const URL = "https://opentdb.com/api.php?amount=10&category=18&encode=url3986";

class App extends Component {
  state = {
    questions: [],
    currentQuestionIndex: 0,
    counts: []
  };

  componentDidMount() {
    this.getNewQuestions();
  }

  getNewQuestions() {
    fetch(URL)
      .then(response => response.json())
      .then(json => {
        const questions = this._parseQuestions(json);
        const currentQuestionIndex = 0;
        this.setState({ questions, currentQuestionIndex });
      });
  }

  _parseQuestions(data) {
    return data.results.map(questionObj => {
      const { correct_answer, question: text } = questionObj;
      const _answers = [...questionObj.incorrect_answers, correct_answer];

      const answers = [];
      while (_answers.length) {
        const rand_index = Math.floor(Math.random() * _answers.length);
        const str = _answers.splice(rand_index, 1)[0];
        const decoded_str = decodeURIComponent(str);
        answers.push(decoded_str);
      }

      return {
        correct_answer: decodeURIComponent(correct_answer),
        text: decodeURIComponent(text),
        answers
      };
    });
  }

  handleAnswer = answer => {
    const correctAnswer = this.state.questions[this.state.currentQuestionIndex]
      .correct_answer;

    const counts = [...this.state.counts];
    if (answer === correctAnswer) {
      counts.push(1);
    } else {
      counts.push(0);
    }
    this.setState({
      counts,
      currentQuestionIndex: this.state.currentQuestionIndex + 1
    });
  };

  handleReset = () => {
    this.getNewQuestions();
  };

  render() {
    const content = this.getCurrentContent();
    return (
      <main>
        <Options onReset={this.handleReset} />
        <div className="filler" id="gameContainer">
          {content}
        </div>
        <Footer />
      </main>
    );
  }

  getCurrentContent() {
    if (this.state.currentQuestionIndex < this.state.questions.length) {
      return this.formQuestion();
    }
    return this.formScore();
  }

  formScore() {
    return (
      <Score
        score={this.state.counts.filter(count => count > 0).length}
        questions={this.state.questions}
        answers={this.state.counts}
        onReset={this.handleReset}
      />
    );
  }

  formQuestion() {
    return (
      <Question
        question={this.state.questions[this.state.currentQuestionIndex]}
        number={this.state.currentQuestionIndex + 1}
        onAnswer={this.handleAnswer}
      />
    );
  }
}

export default App;
