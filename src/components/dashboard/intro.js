import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import search from '../../images/people_search.svg';

const Intro = () => {
  return (
    <div className="intro">
      <Grid container spacing={24}>
        <Grid item lg={12} md={12} xs={12}>
          <div className="intro-heading">
            <p>ACM</p>
            <p>Recruitments</p>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Grid item lg={6} md={6} xs={12}>
          <div className="intro-text">
            <p>
              Right from its inception in 2009, the ACM VIT Student Chapter has
              been organising and conducting successful technical and professional
              development events. Technology is its course and education is its
              objective.
            </p>
            <div>
              <p>We have openings in 4 domains:</p>
              <p>Technical</p>
              <p>Management</p>
              <p>Design</p>
              <p>Competitive</p>
            </div>
          </div>
          {/* <div className="join-btn-div"> */}
          <Button href="#section-console" className="join-btn mtop-one">
            Join Now
          </Button>
          {/* </div> */}
        </Grid>
        <Grid item lg={6} md={6} xs={12} className="img-search-grid mtop-two">
          <img src={search} alt="People Search"
            className="intro-img-search"></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Intro;