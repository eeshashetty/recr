import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

let option = (
    <FormControlLabel
    value=""
    control={<Radio color="primary" />}
    label=""
    />
);
class Objective extends Component {
    
    state = {
        mcq_answer: 0
    }

    handleChange = event => {
        console.log(event.target.value);
        this.setState({ mcq_answer: event.target.value });
    };
    
    componentDidMount() {
        this.setState({mcq_answer: this.props.mcq_answer});
    }

    // getOptions = () => {
        
    // }

    render() {
        let options = this.props.options;
        // console.log(options);
        let showOptions=[], option;
        // showOptions.push(
        //     <RadioGroup
        //         aria-label="options"
        //         name="options"
        //         className="domain-radio"
        //         value={this.state.mcq_answer}
        //         onChange={this.handleChange}
        //     ></RadioGroup>
        // );
        for(let i=0; i< options.length; i++) {
            option = options[i];
            showOptions.push(
                <FormControlLabel
                value={option.number}
                control={<Radio color="primary" />}
                label={option.content}
                />
            );
        }
        // console.log(showOptions);
        return(
            <div className="objective">
                <p className="question-title f-bold">{this.props.qTitle}</p>
                <RadioGroup
                    aria-label="options"
                    name="options"
                    className="domain-radio"
                    value={this.state.mcq_answer}
                    onChange={this.handleChange}
                >
                {/* <FormControlLabel
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
                /> */}
                {showOptions}
                </RadioGroup>
            </div>
        );
    }

}

export default Objective;