import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Console from './console';
// import Button from '@material-ui/core/Button';
import acm from '../../../images/acm-logo.svg'

class Workspace extends Component {
    render() {
        return(
            <div className="workspace">
                <Grid container spacing={24}>
                <Grid item lg={6} md={6} sm={12} xs={12} className="console-workspace-xs">
                        <div className="workspace-right-text">
                            <div>
                                <p className="f-bold marg-zero">Here is our console,</p>
                                <p className="f-bold marg-zero">we hope that you know your way around.</p>
                                <p>Don't worry if you are not well versed 
                                    with how a console works, just type in
                                </p>
                                <p className="help-text">help</p>
                                <p className="marg-zero">and work your way through.</p>
                                <p className="marg-zero">It's quite easy!</p>
                            </div>
                            {/* {!localStorage.getItem('token') && 
                                <div>
                                    <p>Haven't registered yet? <b>Register now</b></p>
                                    <Button href="/registration" className="join-btn register-btn mtop-one">
                                        Register
                                    </Button>
                                </div>
                            } */}
                        </div>
                    </Grid>
                    <Grid id="section-console" item lg={6} md={6} sm={12} xs={12}>
                        <Console history={this.props.history} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className="console-workspace-lg">
                        <div className="workspace-right-text">
                            <div>
                                <p className="marg-zero"><b>Here is our console,</b></p>
                                <p className="marg-zero"><b>we hope that you know way around.</b></p>
                                <p>Don't worry if you are not well versed 
                                    with how a console works, just type in
                                </p>
                                <p className="help-text">help</p>
                                <p className="marg-zero">and work your way through.</p>
                                <p className="marg-zero">It's quite easy!</p>
                            </div>
                            {/* {!localStorage.getItem('token') && 
                                <div>
                                    <p>Haven't registered yet? <b>Register now</b></p>
                                    <Button href="/registration" className="join-btn register-btn mtop-one">
                                        Register
                                    </Button>
                                </div>
                            } */}
                            <img className="" src={acm} alt="ACM"/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Workspace;