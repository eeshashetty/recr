import React from 'react';
import Grid from '@material-ui/core/Grid';
import tech from '../img/tech.svg';
import mgt from '../img/mgt.svg';
import design from '../img/design.svg';

const Domains = () => {
    return(
    <div className="section-domain">
        <p className="section-domain-heading">Domains</p>
        <Grid container spacing={24}>
            <Grid item lg={4} md={4} sm={12} xs={12} className="c-align domain-grid">
                <img src={tech} alt="Technical" className="tech-domain"></img>
                <div className="color-theme section-domain-heading">
                    <p className="domain-name">Technical</p>
                    <p className="domain-name">&</p>
                    <p className="domain-name">Research</p>
                </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} className="c-align domain-grid">
                <img src={mgt} alt="Management" className="tech-domain mgt-domain"></img>
                <div className="color-theme section-domain-heading">
                    <p className="domain-name">Management</p>
                    <p className="domain-name">&</p>
                    <p className="domain-name">Editorial</p>
                </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} className="c-align domain-grid">
                <img src={design} alt="design" className="design-domain tech-domain"></img>
                <div className="color-theme section-domain-heading">
                    <p className="domain-name">Design</p>
                    <p className="domain-name">&</p>
                    <p className="domain-name">UI/UX</p>
                </div>
            </Grid>
        </Grid>
    </div>);
}

export default Domains;