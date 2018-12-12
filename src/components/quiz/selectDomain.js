import React, {Component} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import terms from '../../images/terms.svg';
import { Button } from '@material-ui/core';
import urls from '../common/urls';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            designSubmitted: true,
            loading: true
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
            // console.log(data);
            this.setState({loading: false});
            if(data.success) {
                let name = localStorage.getItem('name');
                this.setState({techSubmitted: false, 
                    designSubmitted: false,
                    mgtSubmitted: false});
                let result = data.result;
                let status, domain;
                if(result && result.length>0 ) {
                    for(let i=0; i<result.length; i++) {
                        domain = result[i].For;
                        // domainsAttempted.push(domain);
                        status = result[i].attempt.submit_status;
                        switch (domain) {
                            case 'technical':
                                this.setState({techSubmitted: status});
                                break;
                            case 'design':
                                this.setState({designSubmitted: status});
                                break;
                            case 'management':
                                this.setState({mgtSubmitted: status});
                                break;
                            default:
                                break;
                        }
                    }
                }
                name = name.trim();
                name = name.split(" ")[0];
                this.setState({openSuccessSnackbar: true, 
                    msgSnackbar:`Hi ${name}. Please select a domain to procceed...`
                });
                
            }
            else {
                this.setState({openErrorSnackbar: true, msgSnackbar: data.message});
            }
        })
        .catch(err=> {
            this.setState({openErrorSnackbar: true, loading: false,
                msgSnackbar: `Could not get your attempts. 
                Please check your internet connection and try again.`});
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
                        <p>The second round will be domain specific, task-based round. It is going to be conducted <b>15th and 16th of December</b>. This round will also be online.</p>
                        <p>The third and final round will be a personal interview and is going to be conducted on <b>17th and 18th of December</b>.</p>

                        <p className="f-bold">For the Management and Design department,</p>
                        <p>The first round will be an online application round. It is going to be conducted on <b>12th and 13th December</b>.
                         It will be an online round.</p>
                        <p>The second round will be a personal interview. It is going to be conducted on <b>17th and 18th of December</b>.</p>
                        <p className="f-bold mtop-one marg-zero">General Instructions:</p>
                        <p>Participants are allowed to apply for more than one domain.</p>
                        <p>You can save your responses and continue the test later on until <b>23:59 on 13th December</b>.</p>
                        <p>You can edit your saved responses.</p>
                        <p>Once you submit your test, you cannot edit any responses.</p>
                        <p>If you forget to submit before the deadline, your last saved response will be considered for evaluation.</p>
                        <p className="marg-zero"><b><u>Technical & Management:</u></b></p>
                        <p className="marg-zero mbot-one mtop-half">
                        It is <b>not</b> mandatory to answer all the questions. </p>
                        <p className="marg-zero"><b><u>Design:</u></b></p>
                        <p className="marg-zero mbot-one mtop-half">
                        <b>At least one</b> task is mandatory. Others are optional.</p>
                        {/* <p className="mtop-one"><b>Technical: </b></p> */}
                        <b><u>Note:</u></b> you can look up answers on the internet but make sure to be thorough with the answered topics. 
                        Questions related to these topics will be asked during the interview round.
                        <p className="mtop-one color-blue f-bold">Best of Luck !!</p>

                        <p className="f-bold">Choose your domain: </p>
                    </div>
                    {this.state.loading? 
                    <CircularProgress className="color-theme" size={48}/>:
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
                    </form>}
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} xs={12} className="terms-img-grid">
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                        <img src={terms} className="terms-img"/>
                    </Grid>
                </Grid>
                <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
                  open={this.state.openErrorSnackbar}
                //   autoHideDuration={10000}
                  className="snackbar-error"
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		        />
                <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
                  open={this.state.openSuccessSnackbar}
                  autoHideDuration={10000}
                  className="snackbar-success"
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		        />
            </div>
        )
    }
}

export default SelectDomain;