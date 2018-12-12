import React from 'react';
import Grid from '@material-ui/core/Grid';
import acm from '../img/acm.png';
import vit from '../img/vit-white.png';
import fb from '../img/facebook.png';
import git from '../img/github-circle.png';

const Footer = () => {
    return(
        <div className="footer-div">
        <Grid container spacing={24} className="center-vert footer-regis">
            <Grid item lg={5} md={5} sm={4} xs={5} className="footer-logo">
                <a href="https://acmvit.in">
                    <img alt="ACM" className="acm-logo-footer" src={acm}/>
                </a>
            </Grid>
            <Grid item lg={2} md={2} sm={4} 
            className="footer-logo social-links">
                {/* <SocialIcon url="https://github.com/ACM-VIT" 
                className="mtop-one mright-half"/>
                <SocialIcon  url="https://www.facebook.com/ACM.VITU" 
                className="mright-half mtop-one"/> */}
                <a href="https://www.facebook.com/ACM.VITU" target="_blank" rel="noopener noreferrer">
                    <img alt="fb" className="git-img mright-half" src={fb}/>
                </a>
                <a href="https://github.com/ACM-VIT" target="_blank" rel="noopener noreferrer">
                    <img alt="git" src={git} className="git-img"/>
                </a>
            </Grid>
            <Grid item lg={5} md={5} sm={4} xs={5} className="footer-logo">
                <a href="http://www.vit.ac.in">
                    <img alt="VIT" className="vit-logo-footer" src={vit}/>
                </a>
            </Grid>
            <Grid item xs={12}
            className="footer-logo social-links-sm">
                <a href="https://www.facebook.com/ACM.VITU" target="_blank" rel="noopener noreferrer">
                    <img alt="fb" className="git-img mright-half" src={fb}/>
                </a>
                <a href="https://github.com/ACM-VIT" target="_blank" rel="noopener noreferrer">
                    <img alt="git" src={git} className="git-img"/>
                </a>
            </Grid>
            {/* <div className="marg-auto">&copy; 2018-19 ACM-VIT. All rights Reserved.</div> */}
        </Grid>
        </div>
    );
}
export default Footer;