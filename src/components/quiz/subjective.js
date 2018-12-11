import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';


class Subjective extends Component {
    state = {
        qTitle: '',
        answer: ''
    }
    componentDidMount() {
        this.setState({qTitle: this.props.qTitle,
        answer: this.props.answer})
    }
    handleChange = name => event => {
        let object = {"link": "","mcq_answer": 0, 
        "answer": event.target.value, "question_id": this.props.qid};
        
        this.setState({[name]: event.target.value});
        this.props.onUpdateToSend(this.props.number, object);
    }
    render() {
        // console.log(this.state.qTitle);
        return(
            <div className="subjective">
                <p className="question-title f-bold">
                {this.props.qTitle}</p>
                <TextField
                id="outlined-name"
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