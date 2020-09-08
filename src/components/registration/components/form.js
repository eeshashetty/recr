import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
// import Send from '../img/send.svg';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
// import Checkbox from '@material-ui/core/Checkbox';
import Send from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { ReCaptcha } from 'react-recaptcha-google';
// import ReCAPTCHA from "react-google-recaptcha";

const vertical = 'top';
const horizontal = 'center';
const BASE_URL ='https://gentle-refuge-82824.herokuapp.com';
// const BASE_URL ='https://evening-beyond-53095.herokuapp.com';
// const BASE_URL = 'https://floating-lake-76261.herokuapp.com'
const regRegex=new RegExp('^1[0-9]{1}[A-Z]{3}[0-9]{4}$');
const regRegexFirstYear = new RegExp('^1[9]{1}[A-Z]{3}[0-9]{4}$');
const regPhone=new RegExp('^[1-9]{1}[0-9]{9}$');
// const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regEmail = /^[a-zA-Z]+\.[a-zA-Z]*201[0-9][a-zA-Z]?@vitstudent.ac.in$/;

class Form extends Component {
    state = {
        name: '',
        reg: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        acmw: false,
        recaptcha: '',
        openErrorSnackbar: false,
        openSuccessSnackbar: false,
        msgSnackbar: '',
        loading: false
    }

    handleChange = name => event => {
        let value = event.target.value;
        if(name==="reg") {
            value = value.toUpperCase();
        }
        this.setState({
          [name]: value,
        });
    };

    handleChecked = name => event => {
        this.setState({ [name]: event.target.checked });
        if(event.target.checked) {
            window.open('https://www.facebook.com/groups/1964884453587984/', '_blank');
            // return false;
            // browser.tabs.loadDivertedInBackground=true
            window.focus();
        }
      };
    
    onChange = (value) => {
        // console.log("Captcha value:", value);
        // console.log(recaptchaRef);
        this.setState({recaptcha: value});
    }

    onExpired = () => {
        // console.log(event.target);
        // console.log('recaptcha expired', this.recaptcha);
        // this.recaptcha.handleExpired();
        this.recaptcha.reset();
    }

    onClose = () => {
        this.setState({openSuccessSnackbar: false, openErrorSnackbar: false});
    }

    componentDidMount() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        // this.recaptcha.reset();
    }

    sendData = (e) => {
        e.preventDefault();
        let name = this.state.name;
        let reg = this.state.reg.trim();
        let email = this.state.email.trim();
        let phone = this.state.phone.trim();
        let password = this.state.password;
        let gender = this.state.gender.trim();
        // let acmw = this.state.acmw;
        // let recaptcha = this.state.recaptcha;
        let data = {'gender':gender, 'email': email, 
        'name': name, 'Rnumber': reg, 'password': password, 
        'phone_number': phone };
        data = JSON.stringify(data);
        // console.log(data);
        if(name === ''){
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Name field should not be blank'});
        }
        else if(reg==='' || !regRegex.test(reg.trim())) {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Registration number is not a valid VIT registration number'});
        }
        else if(reg==='' || !regRegexFirstYear.test(reg.trim())) {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Sorry, We are accepting only first years.'});
        }
        
        else if(email==='' || !regEmail.test(email.trim())) {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Please enter a valid VIT Email address'});
        }
        else if(password.length<8) {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Password should be minimum 8 characters'});
        }
        else if(gender==='') {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Please select a gender'});
        }
        else if(phone==='' || !regPhone.test(phone.trim())) {
            this.setState({openErrorSnackbar: true, msgSnackbar: 'Please enter a valid phone number'});
        }
        // else if(recaptcha==='') {
        //     this.setState({openErrorSnackbar: true, msgSnackbar: 'Please select the recaptcha to continue'});
        // }
        // console.log(regEmail)
        else if(name && reg && email && phone && (password.length>=8) && 
        gender && regEmail.test(email.trim()) && regPhone.test(phone.trim()) && regRegex.test(reg.trim())) {
            
            this.setState({loading: true});

            axios.post(BASE_URL + '/api/user/register', data, 
            {headers: {'Content-Type' : 'application/json'}})
            .then(function(response) {
                let data = response.data;
                console.log(data);
                if(data.status==="success") {
                    this.setState({openSuccessSnackbar: true, msgSnackbar: `Congratulations you are successfully registered. 
                    We'll be in touch with you shortly.`, loading: false, name: '', reg: '', email: '', password: '', phone: '', gender: ''});
                }
                // else {
                //     this.setState({openErrorSnackbar: true, msgSnackbar: data.message, loading: false});
                // }
                // this.recaptcha.reset();
            }.bind(this))
            .catch(function(error) {
                console.log(error.response.status,error.response)
                if(error.response.status===404) {
                    this.setState({openErrorSnackbar: true, 
                        msgSnackbar: 'You are already registered. Please wait for first round of recruitments.', loading: false});    
                }
                else{
                    this.setState({openErrorSnackbar: true, 
                        msgSnackbar: 'Could not register. Please check your internet connection and try again', loading: false});
                }
            }.bind(this));
        }
        // console.log(regEmail.test(email.trim()));
        // console.log(regEmail.test(email));
    }

    render() {
        return(
            <div id="form" className="form">
                <div className="container">
                    <Typography variant="title" id="registration" className="f-bolden color-white">
                    Registration</Typography>
                    <p className="helper-text">* Only for first year students.</p>
                    <p className="helper-text">* Password will be required in the first round of recruitment.</p>
                    <form onSubmit={this.sendData} className="form-form">
                    <Grid container spacing={24}>
                        <Grid item lg={12} sm={12} xs={12} 
                        className="marg-auto c-align">
                            <TextField
                            id="name"
                            label="Name"
                            className="form-item f-width"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} className="marg-auto c-align">
                            <TextField
                            id="reg"
                            label="Registration Number"
                            className="form-item regno f-width"
                            value={this.state.reg}
                            onChange={this.handleChange('reg')}
                            margin="normal"
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} 
                        className="marg-auto c-align">
                            <TextField
                            id="email"
                            label="Email"
                            className="form-item f-width"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            />
                        </Grid>
                        <Grid item sm={12} md={12} xs={12} className="">
                            <TextField
                            id="password"
                            label="Password"
                            className="form-item f-width"
                            value={this.state.password}
                            type="password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                            />
                        </Grid>
                        {/* <img src={info} className="info"/> */}
                        {/* <Grid item sm={1} md={1} xs={1} className="tooltip-grid center-vert">
                        <Tooltip className="tooltip" title="This password will be 
                        required in first round of recruitment">
                            <Info />
                        </Tooltip>
                        </Grid> */}
                        <Grid item lg={12} md={12} sm={12} xs={12} 
                        className="marg-auto c-align">
                            <TextField
                            id="phone"
                            label="Phone Number"
                            className="form-item f-width"
                            value={this.state.phone}
                            onChange={this.handleChange('phone')}
                            margin="normal"
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}
                        className="marg-auto center-vert mtop-one f-width">
                            {/* <FormControl component="fieldset" className=""> */}
                                <FormLabel className="color-white mright-two" component="legend">Gender: </FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender"
                                    className="color-white gender-select"
                                    value={this.state.gender}
                                    onChange={this.handleChange('gender')}
                                >
                                    {/* <div className="center-vert f-width"> */}
                                        <FormControlLabel className="color-white mright-two" 
                                        value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel className="color-white" 
                                        value="male" control={<Radio />} label="Male" />
                                    {/* </div> */}
                                </RadioGroup>
                        </Grid>
                        {/* <div className="center-vert">
                        <Checkbox
                            checked={this.state.acmw}
                            onChange={this.handleChecked('acmw')}
                            value="true"
                            className="check-box"
                            />
                        <p className="checkbox-text">I would like to be a part of ACM-W Community group on facebook</p>
                        </div> */}
                    </Grid>
                    {/* <div className="mtop-one">
                        <ReCAPTCHA
                            ref={(r) => this.recaptcha = r}
                            sitekey="6LebVH8UAAAAAFag4ioneV5GVWZwIbPcIPfP15Z2"
                            className="recaptcha"
                            onChange={this.onChange}
                            onExpired={this.onExpired}
                        />
						</div> */}
                    <div className="c-align mtop-two">
                    {!this.state.loading && 
                        <Button className="apply-btn submit-btn" type="submit">
                        Submit<Send /></Button>}

                    {this.state.loading && <div className="center-vert-hor marg-auto c-align">
                        <Button disabled className="apply-btn submit-btn mright-one" type="submit">
                        Submit<Send /></Button>
                        <CircularProgress className="color-theme c-align" size={24}/>
                    </div>}
                    </div>
                    </form>
                </div>
                <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
                  open={this.state.openErrorSnackbar}
                  className="snackbar-error"
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		        />
                <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
                  open={this.state.openSuccessSnackbar}
                  className="snackbar-success"
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		        />
            </div>
        );
    }
}
export default Form;
