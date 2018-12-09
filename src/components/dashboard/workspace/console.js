import React, { Component } from "react";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

const acm = `
       d8888  .d8888b.  888b     d888 
      d88888 d88P  Y88b 8888b   d8888 
     d88P888 888    888 88888b.d88888 
    d88P 888 888        888Y88888P888 
   d88P  888 888        888 Y888P 888 
  d88P   888 888    888 888  Y8P  888 
 d8888888888 Y88b  d88P 888   "   888 
d88P     888  "Y8888P"  888       888 
`
class Console extends Component {
  state = {
    editablePara: [true, true],
    allLines: [],
    currentLine: "",
    stack: [],
    counter: 0,
    cleared: false
  };

  componentWillMount() {
    // console.log('component will mount executed');
    let allLines=[];
    allLines.push(
      <div id="line" className="center-vert">
        <p className="line">></p>
        <p
          id="active"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className="outline-black color-green line-text line"
        >  </p>
      </div>
    );
    this.setState({
      allLines: allLines
    });
  }

  clear = () => {
    console.log('inside clear');
    console.log(this.state.allLines);
    // this.setState({allLines: []});
    let allLines = this.state.allLines.slice(0,1);
    this.setState({
      allLines: allLines
    });
    console.log(this.state.allLines);
  }

  keyPressed = event => {
    let keyCode = event.keyCode;
    let target = event.target;
    let stack = this.state.stack;
    let counter = this.state.counter;
    if (keyCode === 13) {
      event.preventDefault();
      target.contentEditable = false;
      target.id = "inactive";
      let allLines = this.state.allLines;
      let currentLine = (
        <div id="line" className="center-vert">
          <p className="line">></p>
          <p
            id="active"
            contentEditable={true}
            spellCheck={false}
            onKeyDown={this.keyPressed}
            className="outline-black color-green line-text line"
          > </p>
        </div>
      );
      // allLines.push(currentLine);
      let content = target.textContent.trim();
      
      if(content!=='') {
        stack.push(content);
        this.setState({stack: stack, counter: stack.length});
      }
      if(content === 'clear') {
        this.clear();
      }
      if(content!=='clear') {
        allLines.push(currentLine);
        this.setState({ allLines: allLines});
      }
    } else if (keyCode === 9) {
        event.preventDefault();
    }
    else if (keyCode === 38) {
      event.preventDefault();
      if(counter > 0) {
        target.textContent = stack[counter-1];
        this.setState({counter: counter-1});
      }
    }
    else if(keyCode === 40) {
      event.preventDefault();
      if(counter < (stack.length-1)) {
        target.textContent = stack[counter+1];
        this.setState({counter: counter+1});
      }
      else if(counter === (stack.length-1)) {
        target.textContent = ' ';
        this.setState({counter: stack.length});
      }
    }
  };
  setCursor = () => {
    let el = document.getElementById("active");
    let range = document.createRange();
    let sel = window.getSelection();
    // console.log(el);
    if(!el) {
      el = document.getElementById("inactive");
      console.log(el);
      el.contentEditable="true";
      el.textContent=' ';
      el.id="active";
      // el.id="active"
    }
      if(!el.childNodes[0]) {
        console.log('hihihi');
        el.textContent = ' ';
      }
      range.setStart(el.childNodes[0], el.childNodes[0].length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
  };
  componentDidUpdate() {
    this.setCursor();
  }
  render() {
    let allLines = this.state.allLines;
    console.log(allLines);
    return (
      <div className="">
        {/* <div>
          {acm}
        </div> */}
        <div className="bg-grey console-top">
          <div className="center-vert">
            <FiberManualRecord className="color-red"/>
            <FiberManualRecord className="color-yellow"/>
            <FiberManualRecord className="color-green" />
          </div>
          <InfoOutlined className="color-greyish-white"/>
        </div>
        {/* <div className="c-align"><pre>{acm}</pre></div> */}
        <div className="bg-black console color-white" onClick={this.setCursor}>
          {/* {allLines} */}
          {allLines}
        </div>
      </div>
    );
  }
}

export default Console;
