import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const subjective = (
    <div className="subjective">
        <p className="question-title f-bold">Question Title</p>
        <p className="answer" spellCheck="false" contentEditable="true"></p>
    </div>
);


class Question extends Component {
    state = {
        value: ''
    }
    render() {
        // console.log(this.props.match.params.domain);
        return(
            <div className="question">
                <Grid container>
                    <Grid item lg={3} md={3} sm={2}></Grid>
                    <Grid item lg={6} md={6} sm={8} xs={12}>
                    {subjective}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Question;