import React from 'react';
import {NavLink} from 'react-router-dom';

const Error = () => {
    return (
        <div className="show-question">
            <div className="home-redirect mtop-two">
                <NavLink to="/" className="color-theme">Back to ACM Recruitments</NavLink>
            </div>
            <div className="subjective">
                <p>Seems like you have entered a wrong url!!!</p>
            </div>
        </div>
    );
}

export default Error;