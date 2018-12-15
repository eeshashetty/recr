import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { FormControl } from '@material-ui/core';

// let option = (
//     <FormControlLabel
//     value=""
//     control={<Radio color="primary" />}
//     label=""
//     />
// );
class Objective extends Component {
    
    state = {
        mcq_answer: 0
    }

    handleChange = event => {
        // console.log(event.target.value);
        this.setState({ mcq_answer: event.target.value });
        let object = {"link": "","mcq_answer": event.target.value, 
        "answer": "", "question_id": this.props.qid};
        this.props.onUpdateToSend(this.props.qid, object);
    };
    
    componentDidMount() {
        this.setState({mcq_answer: this.props.mcq_answer});
    }

    render() {
        // let options = this.props.options;
        // console.log('mcq-answer',this.state.mcq_answer);
        return(
            <div className="objective">
                <div className="flex-wrap center-vert">
                    <p className="flex-wrap mright-half">Q)</p>
                    <p className="marg-zero"
                     dangerouslySetInnerHTML={{ __html: this.props.qTitle }} />
                </div>
                <RadioGroup
                    aria-label="options"
                    name="options"
                    className="domain-radio"
                    value={this.state.mcq_answer.toString()}
                    onChange={this.handleChange}
                >
                    <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Web"
                    />
                    <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Android"
                    />
                    <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="IOS"
                    />
                    <FormControlLabel
                    value="4"
                    control={<Radio color="primary" />}
                    label="Blockchain"
                    />
                    <FormControlLabel
                    value="5"
                    control={<Radio color="primary" />}
                    label="Competitive"
                    />
                    <FormControlLabel
                    value="6"
                    control={<Radio color="primary" />}
                    label="Machine Learning"
                    />
                    <FormControlLabel
                    value="7"
                    control={<Radio color="primary" />}
                    label="Artificial Learning"
                    />
                </RadioGroup>
            </div>
        );
    }
}

export default Objective;