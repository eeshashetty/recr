import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import urls from '../common/urls';
// import Objective from './objective';
import Subjective from './subjective';
// import Star from './star';
import { CircularProgress } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

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
      toSendResp: {},
      quizId: "",
      loading: true,
      internetIssue: false
    }
    this.getquestion();
  }

  onClose = () => {
    this.setState({ openSuccessSnackbar: false, openErrorSnackbar: false });
  }

  getquestion = () => {
    let config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
    // let data = { domain: this.props.match.params.domain };
    let domain = this.props.match.params.domain;
    if (domain !== 'competitive') {
      axios.get(BASE_URL + `/fetchquestions?domain=${domain}`, config)
        .then(response => {
          // console.log(response);
          this.setState({ loading: false });
          let data = response.data;
          // console.log(data);
          if (data.success) {
            let attempt = data.array;
            // console.log(attempt);
            // let question;
            let toSendResp = {};
            if (!data.submitted_status) {
              for (let i = 0; i < attempt.length; i++) {
                let { response, id } = attempt[i];

                // let { response, id } = question;
                // console.log(que);
                // toSendResp.push({
                //   id: response
                // });
                toSendResp[id] = response ? response : "";
              }
              this.setState({ questions: attempt, toSendResp: toSendResp });
            }
            else {
              this.setState({
                openErrorSnackbar: true,
                msgSnackbar: 'You have already submitted the quiz!'
              })
            }
          }
          else {
            this.setState({ openErrorSnackbar: true, msgSnackbar: data.message });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            openErrorSnackbar: true, internetIssue: true,
            msgSnackbar: 'Could not get the quiz. Please check your internet connection and try again'
          });
        });
    }
    else {
      // console.log('hi');
      this.setState({ loading: false });
    }
  }

  updateToSend = (qid, answer) => {
    // console.log('inside update to send',qid,object);
    let { toSendResp } = this.state;
    toSendResp[qid] = answer;
    // for (let i = 0; i < toSendArr.length; i++) {
    // if (qid === toSendArr[i].question_id) {
    // toSendArr[i] = object;

    // console.log('true');
    // console.log(toSendArr[i].question_id);
    // console.log(toSendArr[i].answer);
    // }
    // console.log(toSendResp);
    this.setState({ toSendResp: toSendResp });
  }

  saveResponse = () => {
    // console.log(this.state.toSendArr);
    let config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
    let { toSendResp } = this.state;
    let data = { "response": toSendResp, "domain": this.props.match.params.domain };
    // data = JSON.stringify(data);
    axios.post(BASE_URL + '/save', data, config)
      .then(resp => {
        let data = resp.data;
        console.log(data);
        if (data.success) {
          this.setState({ openSuccessSnackbar: true, msgSnackbar: "Response saved successfully." });
        }
        else {
          this.setState({ openErrorSnackbar: true, msgSnackbar: data.message });
        }
      })
      .catch(() => {
        this.setState({
          openErrorSnackbar: true,
          msgSnackbar: 'Could not save your responses. Please check your internet connection and try again.'
        });
      });
  }

  submitResponse = () => {

    let config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
    let { toSendResp } = this.state;
    let data = { "response": toSendResp, "domain": this.props.match.params.domain };
    // data = JSON.stringify(data);
    axios.post(BASE_URL + '/submit', data, config)
      .then(resp => {
        let data = resp.data;
        // console.log(data);
        if (data.success) {
          this.setState({ openSuccessSnackbar: true, 
            msgSnackbar: "Thank you for taking test. Your responses have been successfully recorded!!" });
          setTimeout(() => { this.props.history.push('/home') }, 3000);
        }
        else {
          this.setState({ openErrorSnackbar: true, msgSnackbar: data.message });
        }
      })
      .catch(() => {
        this.setState({
          openErrorSnackbar: true,
          msgSnackbar: 'Could not save your responses. Please check your internet connection and try again.'
        });
      });
  }

  render() {

    let domain = this.props && this.props.match.params && this.props.match.params.domain;
    // domain = domain.capitalize();
    let { questions } = this.state;
    // let question, qTitle, qid, number,
    let showQuestions = [], currQuestion;
    // console.log(questions);
    // console.log('toSendArr',this.state.toSendArr);
    for (let i = 0; i < questions.length; i++) {
      currQuestion = questions[i];
      // type = question.question_id.question_type;
      let { question, response, id } = currQuestion;

      showQuestions.push(
        <Subjective
          key={id}
          qTitle={question}
          qid={id}
          answer={response}
          onUpdateToSend={this.updateToSend}
        // number={number}
        />
      );
    }
    return (
      <div className="show-question" >
        {this.state.loading ?
          (!this.state.internetIssue && this.props.match.params.domain !== 'competitive' &&
            <div className="c-align">
              <CircularProgress className="mtop-four color-theme" size={48} />
            </div>) :
          (!this.state.internetIssue &&
            <div>
              <p className="f-bold c-align marg-zero">{domain && domain.toUpperCase()}</p>
              <div className="quiz space-between center-vert">
                <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                  {`Welcome ${localStorage.getItem('name').split(" ")[0]}`}</p>
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
        {this.props.match.params.domain === 'competitive' &&
          <div>
            <div className="home-redirect mtop-two">
              <NavLink to="/home" className="color-theme">Back to Home screen</NavLink>
            </div>
            <div className="subjective">
              <p>The first round will be held online for participants on <b>6th and 7th December</b>.</p>
              <p> The questions can be attempted at any time during these 24 hrs.</p>
              <p>This round is on <a href="https://www.hackerrank.com/acmvit-cpr20"
                target="_blank" rel="noopener noreferrer">https://www.hackerrank.com/acmvit-cpr20</a></p>
              <p>All the participants must fill the <a href="https://docs.google.com/forms/d/e/1FAIpQLSd4HJOIfAPoUNmMLyvmhQC4pnlA_gvvxC7vooKxxDrCdHxbfQ/viewform"
                target="_blank" rel="noopener noreferrer">form</a></p>
              <p>The participants who qualify will be eligible to enter the personal interview,
                the details of which will be communicated later.</p>
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
