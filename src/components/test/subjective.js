import React, {Component} from 'react';
// import { withStyles } from '@material-ui/core/styles';
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
        this.props.onUpdateToSend(this.props.qid, object);
    }
    render() {
        // console.log(this.state.answer);
        return(
            <div className="subjective">
                <div className="center-vert flex-wrap">
                    <p className="marg-zero mright-half">Q)</p>
                    <p className="marg-zero" dangerouslySetInnerHTML={{ __html: this.props.qTitle }} />
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