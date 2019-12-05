import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


class Subjective extends Component {
  state = {
    qTitle: '',
    answer: ''
  }
  componentDidMount() {
    this.setState({
      qTitle: this.props.qTitle,
      answer: this.props.answer
    })
  }
  handleChange = name => event => {
    let { qid } = this.props;
    let { value } = event.target;
    let answer = value;
    // let object = {
    //   "answer": value, "question_id": qid
    // };
    this.setState({ [name]: value });
    this.props.onUpdateToSend(qid, answer);
  }
  render() {
    // console.log(this.state.answer);
    // let {qTitle,}
    return (
      <div className="subjective">
        <div className="center-vert flex-wrap">
          {/* <span className="marg-zero mright-half">Q)</span> */}
          <span className="marg-zero"><pre><code><b>Q)</b></code> &nbsp;{this.props.qTitle}</pre></span>
        </div>
        <TextField
          multiline
          rows="14"
          id="outlined-multiline-flexible"
          label="Answer"
          className="answer"
          value={this.state.answer}
          onChange={this.handleChange('answer')}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }
}

export default Subjective;