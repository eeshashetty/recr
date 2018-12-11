import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import urls from '../common/urls';
import Objective from './objective';
import Subjective from './subjective';

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
            toSendArr: []
        }
        this.getquestion();
    }

    onClose = () => {
        this.setState({openSuccessSnackbar: false, openErrorSnackbar: false});
    }

    getquestion = () => {
        let config = {headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}};
        let data = {dept: this.props.match.params.domain};
        // if(data!=='competitive')
        axios.post(BASE_URL + '/api/user/quiz', data, config)
        .then(response => {
            // console.log(response);
            let data = response.data;
            if(data.success) {
                let attempt = data.attempt;
                let toSendArr=[];
                if(!attempt.submit_status) {
                    for(let i=1;i<=attempt.questions.length;i++) {
                        toSendArr.push(0);
                    }
                    this.setState({questions:attempt.questions});
                }
                else {
                    this.setState({openErrorSnackbar: true, msgSnackbar: 'You have already submitted the quiz!'})
                }
            }
            else {
                this.setState({openErrorSnackbar: true, msgSnackbar: data.message});
            }
        })
        .catch(() => {
            this.setState({openErrorSnackbar: true, 
                msgSnackbar: 'Could not get the quiz. Please check your internet connection and try again'});
        });
    }

    updateToSend = (number, object) => {
        console.log('inside update to send',number,object);
        let length = this.state.questions.length;
        let toSendArr = this.state.toSendArr;
        for(let i=0;i<length;i++) {
            if(i===(number-1)) {
                toSendArr[i]=object;
            }
        }
    }

    render() {
        let questions = this.state.questions;
        let question,type, qTitle, qid, number,
         showQuestions=[];
        console.log(questions);
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
        }
        // console.log(questions);
        return(
            <div>
                <Grid container>
                    <Grid item lg={3} md={3} sm={2}></Grid>
                    <Grid item lg={6} md={6} sm={8} xs={12}>
                    {showQuestions}
                    </Grid>
                </Grid>
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