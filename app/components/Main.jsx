import React from 'react';
//import data from '../data/data';
import data from '../data/data-prod';
import Answers from 'Answers';
import Popup from 'Popup';
import Footer from 'Footer';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr:0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            questionContainerDisplay:"none",
            answerPopupDisplay: "none",
            closeDisplay:'none'

        }
        this.db = data;
        this.showAnswer = this.showAnswer.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.getPopUpText = this.getPopUpText.bind(this);
    }

    pushData() {
        let questionCounts = this.db.length;

        if(questionCounts==0){

        }
        let index=   Math.floor(Math.random() * Math.floor(questionCounts));
         let currentQuestion= this.db.splice(index, 1);
        
         this.setState({
        question :currentQuestion[0].question,
        answers : currentQuestion[0].incorrect_answers,
        correct : currentQuestion[0].correct_answer,
        nr : this.state.nr + 1,
        description : currentQuestion[0].description

        });    
    }

    componentWillMount() {
        console.log("calling component will mount in main.jsx")
       this.pushData();
    }

    showAnswer() {
        let { nr, total, score } = this.state;

        
            this.setState({
                answerPopupDisplay:"flex" 
            });
        }

    nextQuestion(){
        let { nr, total, score } = this.state;

        if(nr === total){
            this.setState({
                displayPopup: 'none',
                questionContainerDisplay:"none",
                answerPopupDisplay: "none",
                closeDisplay:'flex'

            });

    }else{
        this.pushData();
        this.setState({
            displayPopup: 'none',
            questionContainerDisplay:"flex",
            answerPopupDisplay: "none"

        });
    }
}

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        //this.pushData();
        this.setState({
            displayPopup: 'none',
            questionContainerDisplay:"flex"
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    getPopUpText(){
        return '<ul><li>Every questions have 4 answer, one of them is correct. </li><li> When question comes to screen press the buzzer.</li><li>The team who press the buzzer first will get the chance to answer.</li><li> If buzzer didnt work you can shout out loud <strong>I will answer</strong>  </li><li> you will be awarded +/- 10 points for every correct/wrong answer.</li></ul>';
    }

    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score, questionContainerDisplay,answerPopupDisplay,closeDisplay} = this.state;

        return (
            <div className="container">

                <Popup style={{display: displayPopup}} score={score} total={total} handleClick={this.handleStartQuiz} title= "Kya Aap Panchvi Fail Champu Hain?" text={this.getPopUpText()} buttonText="Lets Play!"/>

                <div className="row" style={{display: questionContainerDisplay}}>
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Question {this.state.nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>
                        <div id="submit">
                            <button className="fancy-btn" onClick={this.showAnswer} >{'Show Answer'}</button>
                        </div>
                    </div>
                </div>
                <Popup style={{display: answerPopupDisplay}} score={score} total={total} handleClick={this.nextQuestion} title= {this.state.correct} text={this.state.description} buttonText={nr===total ? 'Finish quiz' : 'Next Question'}/>
                <Popup style={{display: closeDisplay}} score={score} total={total} handleClick={function(){}} title= "Thank you" text={"Thank you"} buttonText="Thank you"/>
                <Footer />
            </div>
        );
    }
}


export default Main
