import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import urls from '../common/urls';
import Objective from './objective';
import Subjective from './subjective';
import Star from './star';
import { CircularProgress } from '@material-ui/core';
import {NavLink} from 'react-router-dom';

const BASE_URL = urls.BASE_URL;

const vertical = 'top';
const horizontal = 'center';

class ShowQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: '',
            openErrorSnackbar: false,
            openSuccessSnackbar: false,
            msgSnackbar: '',
            toSendArr: [],
            quizId: "",
            loading: true,
            internetIssue: false
        }
        this.getquestion();
    }

    onClose = () => {
        this.setState({openSuccessSnackbar: false, openErrorSnackbar: false});
    }

    getquestion = () => {
        let config = {headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}};
        let data = {dept: this.props.match.params.domain};
        if(this.props.match.params.domain!=='competitive')
        {
            axios.post(BASE_URL + '/api/user/quiz', data, config)
            .then(response => {
                // console.log(response);
                this.setState({loading: false});
                let data = response.data;
                if(data.success) {
                    let attempt = data.attempt;
                    let question;
                    let toSendArr=[];
                    if(!attempt.submit_status) {
                        for(let i=0;i<attempt.questions.length;i++) {
                            question = attempt.questions[i];
                            toSendArr.push({"link":"",
                            "mcq_answer":question.mcq_answer,
                            "answer":question.answer, 
                            "question_id":question.question_id._id});
                        }
                        this.setState({questions:attempt.questions, 
                            quizId: attempt._id, toSendArr: toSendArr});
                    }
                    else {
                        this.setState({openErrorSnackbar: true, 
                            msgSnackbar: 'You have already submitted the quiz!'})
                    }
                }
                else {
                    this.setState({openErrorSnackbar: true, msgSnackbar: data.message});
                }
            })
            .catch(() => {
                // console.log(err);
                this.setState({openErrorSnackbar: true, internetIssue: true,
                    msgSnackbar: 'Could not get the quiz. Please check your internet connection and try again'});
            });
        }
        else  {
            // console.log('hi');
            this.setState({loading: false});
        }
    }

    updateToSend = (qid, object) => {
        // console.log('inside update to send',qid,object);
        let toSendArr = this.state.toSendArr;
        for(let i=0;i<toSendArr.length;i++) {
            if(qid===toSendArr[i].question_id) {
                toSendArr[i]=object;
                // console.log('true');
                // console.log(toSendArr[i].question_id);
                // console.log(toSendArr[i].answer);
            }
        }
    }

    saveResponse = () => {
        // console.log(this.state.toSendArr);
        let config = {headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}};
        let data = {"quiz_id": this.state.quizId, "answers": this.state.toSendArr}
        // data = JSON.stringify(data);
        axios.post(BASE_URL + '/api/user/savequiz', data, config)
        .then(resp => {
            let data = resp.data;
            // console.log(data);
                if(data.success) {
                this.setState({openSuccessSnackbar: true, msgSnackbar: data.message});
            }
            else {
                this.setState({openErrorSnackbar: true, msgSnackbar: data.message});
            }
        })
        .catch(()=> {
            this.setState({openErrorSnackbar: true, 
                msgSnackbar: 'Could not save your responses. Please check your internet connection and try again.'});
        });
    }

    submitResponse = () => {

        let config = {headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}};
        let data = {"quiz_id": this.state.quizId, "answers": this.state.toSendArr}
        // data = JSON.stringify(data);
        axios.post(BASE_URL + '/api/user/submitquiz', data, config)
        .then(resp => {
            let data = resp.data;
            // console.log(data);
            if(data.success) {
                this.setState({openSuccessSnackbar: true, msgSnackbar: data.message});
                setTimeout(() => { this.props.history.push('/home') }, 3000);
            }
            else {
                this.setState({openErrorSnackbar: true, msgSnackbar: data.message});
            }
        })
        .catch(()=> {
            this.setState({openErrorSnackbar: true, 
                msgSnackbar: 'Could not save your responses. Please check your internet connection and try again.'});
        });
    }

    render() {
        let questions = this.state.questions;
        let question,type, qTitle, qid, number,
         showQuestions=[];
        // console.log('toSendArr',this.state.toSendArr);
        for (let i = 0; i < questions.length; i++) {
            question = questions[i];
            type = question.question_id.question_type;
            qTitle = question.question_id.question;
            qid = question.question_id._id;
            number = question.question_id.number;
            // console.log(number);
            if(type===0) {
                showQuestions.push(
                    <Objective qTitle={qTitle}
                    options={question.question_id.options} 
                    qid={qid} 
                    number={number}
                    mcq_answer={question.mcq_answer}
                    onUpdateToSend={this.updateToSend} />
                )
            }
            else if(type===1) {
                showQuestions.push(
                    <Subjective qTitle={qTitle}
                    qid={qid}
                    number={number}
                    answer={question.answer}
                    onUpdateToSend={this.updateToSend}
                    />
                );
            }
            else if(type===3) {
                showQuestions.push(
                    <Star qTitle={qTitle}
                    options={question.question_id.options} 
                    qid={qid}
                    number={number}
                    answer={question.answer}
                    onUpdateToSend={this.updateToSend}
                    />
                )
            }
        }
        // console.log(questions);
        return(
            <div className="show-question" >
                {this.state.loading ? 
                (!this.state.internetIssue && this.props.match.params.domain!=='competitive' &&
                <div className="c-align">
                    <CircularProgress className="mtop-four color-theme" size={48} />
                </div>):
                (!this.state.internetIssue && 
                <div>
                    <div className="quiz space-between center-vert">
                        <p className="f-bold">{`Welcome ${localStorage.getItem('name').split(" ")[0]}`}</p>
                        <Button className="save-btn flex-wrap" 
                        onClick={this.saveResponse}>Save</Button>
                    </div>
                    <div className="home-redirect mtop-two">
                        <NavLink to="/home" className="color-theme">Back to Home screen</NavLink>
                    </div>
                    <div className="questions-wrapper">
                        {showQuestions}
                    </div>
                    <div className="c-align">
                        <Button className="save-btn"
                        onClick={this.submitResponse}>Submit</Button>
                    </div>
                </div>
                )}
                {this.state.internetIssue && 
                <div>
                    <div className="home-redirect mtop-two">
                        <NavLink to="/home" className="color-theme">Back to Home screen</NavLink>
                    </div>
                    <div className="subjective">
                        {this.state.msgSnackbar}
                    </div>
                </div>}
                {this.props.match.params.domain==='competitive' &&
                <div>
                    <div className="home-redirect mtop-two">
                        <NavLink to="/home" className="color-theme">Back to Home screen</NavLink>
                    </div>
                    <div className="subjective">
                        <p>The first round will be held online for participants on <b>15th and 16th December</b>.</p>
                        <p> The questions can be attempted at any time during these two days. </p>
                        <p>This round is on <a href="https://www.hackerrank.com/acm-competitive" 
                        target="_blank" rel="noopener noreferrer">https://www.hackerrank.com/acm-competitive</a></p>
                        <p>All the participants must fill the <a href="https://goo.gl/forms/2qhqDRuIPJAtzqlu1" 
                        target="_blank" rel="noopener noreferrer">form</a></p>
                        <p>The participants who qualify will be eligible to enter the personal interview.
                            The details of which will be communicated later.</p>
                    </div>
                </div>}
                <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
                  open={this.state.openErrorSnackbar}
                  autoHideDuration={4000}
                  className="snackbar-error"
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		        />
                <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
                  open={this.state.openSuccessSnackbar}
                  className="snackbar-success"
                  autoHideDuration={4000}
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		        />
            </div>
        )
    }
}

export default ShowQuestion;