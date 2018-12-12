import React from 'react';
import Grid from '@material-ui/core/Grid';
import acmVit from '../img/acm.png';
// import acmVit from '../img/acmlogo.png';
import acmInt from '../img/acm-int.png';
import acmw from '../img/acmw.png';

const About = () => {
    return(
        <div className="section-about">
            <p className="section-about-heading">About us</p>
            <Grid container spacing={50} className="about-grid">
                <Grid item lg={4} md={4} sm={12} xs={12} className="c-align domain-grid">
                    <img src={acmInt} alt="ACM" className="section-about-img-acm"></img>
                    <p className="section-about-text">
                    Founded in 1947 in the United States, the Association for Computing 
                    Machinery (ACM) is an international, not-for-profit, professional 
                    membership society. Widely regarded as the world’s largest and most 
                    distinguished scientific and educational computing society, it has 
                    more than 100,000 active members as of 2011, and its headquarters 
                    present in New York City. ACM also conducts the annual A.M. Turing Award, 
                    which is considered to be the Nobel Prize in computing.
                    </p>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="c-align domain-grid">
                    <img src={acmVit} alt="ACM-VIT" className="section-about-img"></img>
                    <p className="section-about-text section-about-text-acm-int">
                    ACM marked its presence in VIT Vellore in 2009 as a student chapter. 
                    Since then, ACM-VIT has become one of the most prestigious chapters 
                    in the University. Just like its parent organisation, ACM-VIT strives 
                    to provide the best opportunities to students who wish to acquire new 
                    skills in the field of Computer Science. Its members have completed a 
                    plethora of projects in VIT. These include the website for Team 
                    Pravega and Team Falcons, and also the numerous tweaks us 
                    students notice in the VTOP and VTOPbeta portals, making 
                    it difficult to ignore the influence this chapter has on the 
                    University. Code2Create, Reverse Coding, Codart, Learn2Compete 
                    and PyFlask are some of the most celebrated events in VIT, which 
                    are run by ACM. Its immense influence and unparalleled popularity 
                    make ACM-VIT one of the most sought-after chapters by students.
                    </p>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="c-align domain-grid">
                    <img src={acmw} alt="ACM-W" className="section-about-img-acmw"></img>
                    <p className="section-about-text">
                    ACM believes in equal opportunity for all, irrespective of one’s gender, 
                    and the absence of women in technology is an obstacle which it aims to 
                    overcome. This idea was the one which led to the conception of ACM-W, 
                    a community for women whose aim is to reduce the gender gap in technology, 
                    by creating a safe space which female students can use to achieve their 
                    goals, without facing the hurdles they do in the outside world. 
                    </p>
                </Grid>
            </Grid>
            <p className="acm-tagline color-grey c-align mtop-four">Because Technology Matters</p>
        </div>
    );
}

export default About;