import React, { Component } from "react";
// import ConsoleLine from "./consoleLine";

class Console extends Component {
  state = {
    editablePara: [true, true],
    allLines: [],
    currentLine: ""
  };
  componentWillMount() {
    let allLines = this.state.allLines;
    allLines.push(
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
    this.setState({
      allLines: allLines
    });
  }
  // componentDidMount() {
  // this.setCursor();
  // }
  // task = () => {
  //   this.setCursor();
  // };
  keyPressed = event => {
    // console.log(event.keyCode);
    let keyCode = event.keyCode;
    // console.log(window.getSelection());
    // console.log(keyCode);
    if (keyCode === 13) {
      event.preventDefault();
      // console.log("enter pressed");
      // console.log(
      event.target.contentEditable = false;
      event.target.id = "inactive";
      // );
      // console.log(event.target);
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
      this.setState({ allLines: allLines });
      // this.task();
    } else if (keyCode === 9) {
      event.preventDefault();
      // console.log(event.target.textContent);
      //   this.setState({ currentLine: this.currentLine + "    " });
    }
  };
  setCursor = () => {
    let el = document.getElementById("active");
    let range = document.createRange();
    let sel = window.getSelection();
    // console.log(el.childNodes[0]);
    // if (el && el.childNodes) {
    //   if(el.childNodes[0])
    //   {range.setStart(el.childNodes[0], el.childNodes[0].length);}
    //   else {
    //     range.setStart(el.childNodes[0], 0);
    //   }
    range.setStart(el.childNodes[0], el.childNodes[0].length);
    // range.setEndAfter(el);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    // this.setState({ flag: 0 });
  };
  componentDidUpdate() {
    this.setCursor();
  }
  render() {
    let allLines = this.state.allLines;
    return (
      //   <div className="bg-black console">
      //     <p className="color-white c-align">Welcome to the Console</p>
      //     <p contentEditable={true} className="color-white outline-black">
      //       >
      //     </p>
      //   </div>
      <div className="bg-black console color-white" onClick={this.setCursor}>
        {allLines}
      </div>
    );
  }
}

export default Console;
