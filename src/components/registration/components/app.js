import React, {Component} from 'react';
import Landing from './landing';
import Footer from './footer';
import Form from './form';
import Domains from './domains';
import About from './about';
import '../styles/styles.css';

class Registration extends Component {
    render() {
        return(
            <div>
                <Landing/>
                <Domains/>
                <About/>
                <Form/>
                <Footer/>
            </div>
        );
    }
}

export default Registration;