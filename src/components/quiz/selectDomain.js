import React, {Component} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import terms from '../../images/terms.svg';
import { Button } from '@material-ui/core';
import urls from '../common/urls';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

const BASE_URL = urls.BASE_URL;

const vertical = 'top';
const horizontal = 'center';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

class SelectDomain extends Component {
    constructor() {
        super();
        this.state={
            domain: '',
            openErrorSnackbar: false,
            openSuccessSnackbar: false,
            msgSnackbar: '',
            techSubmitted: true,
            mgtSubmitted: true,
            designSubmitted: true
        }
        this.getDepartments();
    }
    onClose = () => {
        this.setState({openSuccessSnackbar: false, openErrorSnackbar: false});
    }

    handleChange = event => {
        this.setState({ domain: event.target.value });
    };

    getDepartments = () => {
        let config = {headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}};
        axios.get(`${BASE_URL}/api/user/attempts`,config)
        .then(res => {
            let data = res.data;
            console.log(data);
        })
        .catch(err=> {
            console.log(err);
        });
    }

    domainSelected = (e) => {
        e.preventDefault();
        let domain = this.state.domain;
        if(domain==='') {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Please select a domain a continue'});
        }
        else {
            this.props.history.push(`/quiz/${this.state.domain}`);
        }
    }

    render() {
        return(
            <div className="select-domain">
                <Grid container>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                    <div className="intro-heading">
                        <p>INSTRUCTIONS</p>
                    </div>
                    <div className="instruction">
                        <p className="f-bold">For the Technical department,</p>
                        <p>The first round will be on 12th and 13th of December. The round will be online. You can appear for the round at any time during these dates.</p>
                        <p>The second round will be domain specific, task-based round. It is going to be conducted 15th and 16th of December. This round will also be online.</p>
                        <p>The third and final round will be a personal interview and is going to be conducted on 17th and 18th of December.</p>

                        <p className="f-bold">For the Management and Design department,</p>
                        <p>The first round will be an online application round. It is going to be conducted on 12th and 13th December. It will be an online round.</p>
                        <p>The second round will be a personal interview. It is going to be conducted on 17th and 18th of December.</p>
                        <p>Best of Luck !!</p>

                        <p className="f-bold">Choose your domain: </p>
                    </div>
                    <form onSubmit={this.domainSelected}>
                        <RadioGroup
                        aria-label="domain"
                        name="domain"
                        className="domain-radio"
                        value={this.state.domain}
                        onChange={this.handleChange}
                        >
                            <FormControlLabel
                            value="technical"
                            control={<Radio color="primary" />}
                            label="Technical"
                            disabled={this.state.techSubmitted}
                            // labelPlacement=""
                            />
                            <FormControlLabel
                            value="design"
                            control={<Radio color="primary" />}
                            label="Design"
                            disabled={this.state.designSubmitted}
                            />
                            <FormControlLabel
                            value="management"
                            control={<Radio color="primary" />}
                            label="Management"
                            disabled={this.state.mgtSubmitted}
                            />
                            <FormControlLabel
                            value="competitive"
                            control={<Radio color="primary" />}
                            label="Competititve"
                            />
                        </RadioGroup>
                        <Button className="join-btn" type="submit">BEGIN</Button>
                    </form>
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} xs={12} className="terms-img-grid">
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                        <img src={terms} className="terms-img"/>
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

export default SelectDomain;