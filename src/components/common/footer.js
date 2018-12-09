import React from 'react';
// import Grid from '@material-ui/core/Grid';
import fb from '../../images/fb.svg';
import insta from '../../images/insta.svg';
import twitter from '../../images/twitter.svg';

const Footer = () => {
    return(
        <div className="footer">
            <a className="color-white" href="https://acmvit.in"
             target="_blank" rel="noopener noreferrer">
                <p>acmvit.in</p>
            </a>
            <div>
                <a href="https://www.instagram.com/acmvitu/" target="_blank" 
                rel="noopener noreferrer">
                    <img src={insta} className="footer-img" alt="insta" />
                </a>
                <a href="https://twitter.com/acm_vit" target="_blank" 
                rel="noopener noreferrer">
                    <img src={twitter} className="footer-img" alt="twitter" />
                </a>
                <a href="https://www.facebook.com/ACM.VITU/" target="_blank" 
                rel="noopener noreferrer">
                    <img src={fb} className="footer-img" alt="facebook" />
                </a>
            </div>
        </div>
    );
}

export default Footer;