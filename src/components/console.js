import React, { Component } from "react";

class Console extends Component {
  state = {
    editablePara: [true, true],
    allLines: [],
    currentLine: "",
    stack: [],
    counter: 0
  };

  componentWillMount() {
    let allLines=[];// = this.state.allLines;
    allLines.push(
      <div id="line" className="center-vert">
        <p className="line">></p>
        <p
          id="active"
          contentEditable={true}
          onKeyDown={this.keyPressed}
          className="outline-black color-green line-text line"
        >  </p>
      </div>
    );
    this.setState({
      allLines: allLines
    });
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
            onKeyDown={this.keyPressed}
            className="outline-black color-green line-text line"
          > </p>
        </div>
      );
      allLines.push(currentLine);
      let content = target.textContent.trim();
      if(content!=='') {
        stack.push(content);
        this.setState({stack: stack, counter: stack.length});
      }
      this.setState({ allLines: allLines});
    } else if (keyCode === 9) {
        event.preventDefault();
    }
    else if (keyCode === 38) {
      event.preventDefault();
      if(counter > 0) {
        target.textContent = stack[counter-1];
        this.setState({counter: counter-1})
      }
    }
    else if(keyCode === 40) {
      event.preventDefault();
      if(counter < (stack.length-1)) {
        console.log('updated');
        target.textContent = stack[counter+1];
        this.setState({counter: counter+1});
      }
      else if(counter === (stack.length-1)) {
        console.log('executed');
        target.textContent = ' ';
        this.setState({counter: stack.length});
      }
    }
  };
  setCursor = () => {
    let el = document.getElementById("active");
    let range = document.createRange();
    let sel = window.getSelection();
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
    console.log(this.state.stack);
    console.log(this.state.counter);
    return (
      <div className="bg-black console color-white" onClick={this.setCursor}>
        {allLines}
      </div>
    );
  }
}

export default Console;
