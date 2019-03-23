import React, { Component } from "react";
import "./App.css";
import Options from "./components/options";
import Question from "./components/question";
import Score from "./components/score";

// https://opentdb.com/
const URL = "https://opentdb.com/api.php?amount=10&category=18";

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
    // fetch(URL)
    //   .then(response => response.json())
    //   .then(json => {
    //     const questions = this._parseQuestions(json);
    //     const currentQuestionIndex = 0;
    //     this.setState({ questions, currentQuestionIndex });
    //   });

    // TODO: NEED TO RESTORE WHEN DONE
    const questions = {
      response_code: 0,
      results: [
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
          correct_answer: "1000",
          incorrect_answers: ["512", "1024", "500"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "The programming language &#039;Swift&#039; was created to replace what other programming language?",
          correct_answer: "Objective-C",
          incorrect_answers: ["C#", "Ruby", "C++"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "Which computer hardware device provides an interface for all other connected devices to communicate?",
          correct_answer: "Motherboard",
          incorrect_answers: [
            "Central Processing Unit",
            "Hard Disk Drive",
            "Random Access Memory"
          ]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "medium",
          question:
            "Nvidia&#039;s headquarters are based in which Silicon Valley city?",
          correct_answer: "Santa Clara",
          incorrect_answers: ["Palo Alto", "Cupertino", "Mountain View"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
          correct_answer: ".svg",
          incorrect_answers: [".png", ".jpeg", ".gif"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "medium",
          question:
            "What did the name of the Tor Anonymity Network orignially stand for?",
          correct_answer: "The Onion Router",
          incorrect_answers: [
            "The Only Router",
            "The Orange Router",
            "The Ominous Router"
          ]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "hard",
          question:
            "The internet domain .fm is the country-code top-level domain for which Pacific Ocean island nation?",
          correct_answer: "Micronesia",
          incorrect_answers: ["Fiji", "Tuvalu", "Marshall Islands"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "medium",
          question: "How many cores does the Intel i7-6950X have?",
          correct_answer: "10",
          incorrect_answers: ["12", "8", "4"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "On Twitter, what is the character limit for a Tweet?",
          correct_answer: "140",
          incorrect_answers: ["120", "160", "100"]
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "medium",
          question: ".at is the top-level domain for what country?",
          correct_answer: "Austria",
          incorrect_answers: ["Argentina", "Australia", "Angola"]
        }
      ]
    };
    this.setState({
      questions: this._parseQuestions(questions),
      currentQuestionIndex: 0,
      counts: []
    });
  }

  _parseQuestions(data) {
    return data.results.map(questionObj => {
      const { correct_answer, question: text } = questionObj;
      const _answers = [...questionObj.incorrect_answers, correct_answer];

      const answers = [];
      while (_answers.length) {
        const rand_index = Math.floor(Math.random() * _answers.length);
        answers.push(_answers.splice(rand_index, 1)[0]);
      }

      return { correct_answer, text, answers };
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
        <div className="gameContainer">{content}</div>
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
