import React, { Component } from "react";
import Intro from './intro';
import Workspace from './workspace/workspace';
import Footer from '../common/footer';
import line from '../../images/line.png';

class Dashboard extends Component {
  componentDidMount() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
  }

  render() {
    return(
    <div className="dashboard">
      <img src={line} className="line-img"/>
      <Intro />
      <Workspace history={this.props.history}/>
      <Footer/>
    </div>);
  }
}

export default Dashboard;