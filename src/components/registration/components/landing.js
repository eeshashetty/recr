import React from "react";
import Button from '@material-ui/core/Button';
// import acmLogo from "../img/acmlogo.png";
import acmLogo from '../img/acm.png';
import job from "../img/job.svg";
import Grid from '@material-ui/core/Grid';

const Landing = () => {
  return (
    <div className="landing">
      <br />
      <div className="c-align center-vert-hor chapter-name">
        <img src={acmLogo} alt="ACM" className="acm-logo" />
        <p className="chapter-name-text">Association for Computing Machinery</p>
      </div>
      {/* <div className="chapter-name-logo f-width">
        <img src={acm} alt="Associaltion for Computing Machinery" className="acm-xs-logo"/>
      </div> */}
        <Grid container spacing={24} className="landing-container">
          <Grid item lg={6} md={7} xs={12} className="c-align">
              <img src={job} alt="Recruitments" className="job-image" />
          </Grid>
          <Grid item lg={5} md={5} xs={12} className="marg-auto">
            <div className="landing-container-text">
              <p className="f-bold first-line">ACM</p>
              <p className="f-bold">Core Committee Selections</p>
              <p className="mtop-one">
                Right from its inception in 2009, the ACM VIT Student Chapter has
                been organising and conducting successful technical and professional
                development events. Technology is its course and education is its
                objective.
              </p>
              <p className="domains mtop-one">
                Technical | Design | Management | Research
              </p>
              <Button href="#form" className="mtop-two apply-btn" size={"large"}>
                Apply Now
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
  );
};

export default Landing;
