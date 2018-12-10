import React, { Component } from "react";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
// import { element } from "prop-types";
import axios from 'axios';

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

const BASE_URL = 'http://still-wildwood-25746.herokuapp.com';

class Console extends Component {
  state = {
    editablePara: [true, true],
    allLines: [],
    currentLine: "",
    stack: [],
    counter: 0,
    cleared: false,
    typeLogin: false,
    typeReg: false,
    typePass: false,
    regno: '',
    name: '',
    gotResponse: false,
    response: ''
  };

  componentWillMount() {
    // console.log('component will mount executed');
    let allLines=[];
    allLines.push(
      <div>
        <div id="console-heading" className="color-greyish-white c-align" >
          <pre>{acm}</pre>
          <p className="mtop-two">Welcome to ACM Recruitments</p>
        </div>
        <div id="line" className="center-vert">
          <div className="center-vert">
            <p className="line color-greyish-white">{this.state.regno? this.state.regno: '18XXXdddd'}</p>
            <p className="marg-zero color-orange">@acm:</p>
            <p className="marg-zero color-blue">~</p>
            <p className="marg-zero color-greyish-white" >$</p>
          </div>
          <p
            id="active"
            contentEditable={true}
            spellCheck={false}
            onKeyDown={this.keyPressed}
            className="outline-black color-green line-text line"
          >  </p>
        </div>
      </div>
    );
    this.setState({
      allLines: allLines
    });
  }

  showResponse = (name, regno, type, msg) => {
    console.log('inside showresponse')
    let allLines = this.state.allLines;
    // let respLine;
    if(type==='error') {
      // this.clear();
      let errLine = (
        <div id="response" className="center-vert">
          <div className="center-vert">
            {/* <p className="line color-greyish-white">Please wait...</p> */}
            {/* <p className="marg-zero color-orange">@acm:</p> */}
            {/* <p className="marg-zero color-blue">~</p> */}
            <p className="marg-zero color-greyish-white" >$</p>
          </div>
          <p
            id="active"
            contentEditable={true}
            spellCheck={false}
            onKeyDown={this.keyPressed}
            className="outline-black color-red line-text line"
          >{msg}</p>
        </div>
      );
      let parentEl = document.getElementById('loading');
      let el = document.getElementById('loading').childNodes[1];
      // console.log(el);
      allLines.push(errLine);
      this.setState({allLines: allLines, gotResponse: true});
      el.contentEditable = false;
      el.id = "inactive";
      parentEl.id="not-loading";
      // console.log(document.getElementsByName('loading'))
      // console.log(document.getElementById('loading').childNodes[1]);
      // console.log(document.getElementById('loading').childNodes.item('active'));
      // console.log(document.getElementById('active'));
      this.handleContent('random');
      parentEl = document.getElementById('response');
      el = document.getElementById('response').childNodes[1];
      el.contentEditable = false;
      el.id = "inactive";
      parentEl.id="a-response";
      this.setCursor();
    }
    // allLines.push(respLine);
  }

  postData = () => {
    this.setState({typeLogin: false, typeReg: false, typePass: false});
    let stack = this.state.stack;
    let regno = stack[stack.length-2];
    let password = stack[stack.length-1];
    let data = {'regno': regno, 'password': password};
    data = JSON.stringify(data);
    stack.pop();stack.pop();
    this.setState({stack: stack, counter: stack.length});
    let allLines = this.state.allLines;
    let loadingLine = (
      <div id="loading" className="center-vert">
        <div className="center-vert">
          <p className="line color-greyish-white">Please wait...</p>
          {/* <p className="marg-zero color-orange">@acm:</p> */}
          {/* <p className="marg-zero color-blue">~</p> */}
          {/* <p className="marg-zero color-greyish-white" >$</p> */}
        </div>
        <p
          id="active"
          name="loading"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className="outline-black color-green line-text line"
        > </p>
      </div>
    );
    
    axios.post(BASE_URL + '/api/user/login', data, 
    {headers: {'Content-Type' : 'application/json'}})
    .then(response => {
        let data = response.data;
        console.log(data);
        // this.setState({response: data, name: data.name, regno: '17BCE0872'});
        // this.setState({allLines: allLines});
        if(data.success) {
          this.showResponse(data.name, data.regno, 'success');
          // this.setState({regno: data.regno, name: data.name});
            // this.setState({openSuccessSnackbar: true, msgSnackbar: `Congratulations you are successfully registered. 
            // We'll be in touch with you shortly.`, loading: false, name: '', reg: '', email: '', password: '', phone: '', gender: ''});
        }
        else {
          this.showResponse('', '', 'error' , data.message);
          // this.setState({openErrorSnackbar: true, msgSnackbar: data.message, loading: false});
        }
    }, ()=>  {
      this.setState({name: data.name, regno: '17BCE0872'});
    })
    .catch(error => {
        // this.setState({openErrorSnackbar: true, 
            // msgSnackbar: 'Could not register. Please check your internet connection and try again', loading: false});
        this.showResponse('','','error', 'Could not login. Please check your internet connection and try again');
    });

    allLines.push(loadingLine);
    this.setState({allLines: allLines});
    // this.handleContent('random', 'random');
    // axios.post(`${BASE_URL}/api/user/login`, data)
    // this.handleContent('random')
  }

  displayHelp = () => {
    let allLines = this.state.allLines;
    let currentLine = (
      <div id="help" className="">
        <div className="line center-vert">
          <p className="marg-zero color-green">{'help: '}</p>
          <p className="marg-zero color-greyish-white">display all the commands</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green">{'login: '}</p>
          <p className="marg-zero color-greyish-white">to log in</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green">{'reset password: '}</p>
          <p className="marg-zero color-greyish-white">to reset password</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green">{'ls quiz: '}</p>
          <p className="marg-zero color-greyish-white">to attempt quiz</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green">{'login: '}</p>
          <p className="marg-zero color-greyish-white">to log in</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green">{'ls result: '}</p>
          <p className="marg-zero color-greyish-white">to see the result</p>
        </div>
        {/* <p
          id="active"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className="outline-black color-green line-text line"
        > </p> */}
      </div>
    );
    allLines.push(currentLine);
    this.setState({allLines: allLines});
    this.handleContent('random');
  }

  handleContent = (content,target) => {
    let stack = this.state.stack;
    let allLines = this.state.allLines;
    let currentLine = (
      <div id="line" className="center-vert">
        <div className="center-vert">
          <p className="line color-greyish-white">{this.state.regno? this.state.regno: '18XXXdddd'}</p>
          <p className="marg-zero color-orange">@acm:</p>
          <p className="marg-zero color-blue">~</p>
          <p className="marg-zero color-greyish-white" >$</p>
        </div>
        <p
          id="active"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className="outline-black color-green line-text line"
        > </p>
      </div>
    );

    if(content!=='') {
      if(stack.length>=0 && content!==stack[stack.length-1]) {
        stack.push(content);
      }
      this.setState({stack: stack, counter: stack.length});
    }

    if(content === 'clear') {
      this.clear();
    }
    if(content!=='clear') {
      switch (content) {
        case 'help':
          this.displayHelp();
          break;
        case 'login':
          this.login('reg');
          this.setState({typeLogin: true, typeReg: true});
          break;
        case 'clear':
          this.clear();
          break;
        default:
          if(this.state.typePass) {
            this.postData();
          }
          else if(this.state.typeReg) {
            this.login('pass');
            this.setState({typePass: true});
          }
          else {
            allLines.push(currentLine);
            this.setState({ allLines: allLines});
            if(content==='random') {
              stack.pop(); 
              this.setState({stack: stack, counter: stack.length});
            }
          }
          break;
      }      
    }
    // if(content)
  }

  login = (type) => {
    let allLines = this.state.allLines;
    let regLine = (
      <div id="line" className="center-vert">
        <p className="line color-greyish-white">> Enter your Registration Number: </p>
        <p
          id="active"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className="regno outline-black color-green line-text line"
        > </p>
      </div>
    );

    let passLine = (
      <div id="line" className="center-vert">
        <p className="line color-greyish-white">> Enter your Password: </p>
        <p
          id="active"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          // onKeyUp={this.showPass}
          // onChange={this.showPass}
          type="password"
          className="password outline-black color-green line-text line"
        ></p>
      </div>
    );
    if(type==='reg') {
      allLines.push(regLine);
    }
    else if(type==='pass') {
      allLines.push(passLine);
    }
    this.setState({ allLines: allLines});
  }

  showPass = event => {
    // console.log('hi');
    // let content = event.target.textContent;
    // console.log(event.target.textContent);
    // event.target.textContent="*".repeat(content.length);
  }

  clear = () => {
    // console.log('inside clear');
    // console.log(this.state.allLines);
    // this.setState({allLines: []});
    let allLines = this.state.allLines.slice(0,1);
    this.setState({
      allLines: allLines
    });
    // console.log(this.state.allLines);
  }

  keyPressed = event => {
    let keyCode = event.keyCode;
    let target = event.target;
    let stack = this.state.stack;
    let counter = this.state.counter;
    // console.log(target.classList);
    // if(target.classList.contains('password') && target.textContent.length>1) {
      // target.textContent = target.textContent.split(0,1);
    // }
    if (keyCode === 13) {
      event.preventDefault();
      target.contentEditable = false;
      target.id = "inactive";
      let content = target.textContent.trim();
      this.handleContent(content,target);
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
    // else {    
    // }
  };
  setCursor = () => {
    let el = document.getElementById("active");
    let objDiv = document.getElementById("inner-console");
    let range = document.createRange();
    let sel = window.getSelection();
    // console.log(el);
    if(!el) {
      el = document.getElementById("inactive");
      // console.log(el);
      el.contentEditable="true";
      el.textContent=' ';
      el.id="active";
      // el.id="active"
    }
    if(!el.childNodes[0]) {
      // console.log('hihihi');
      el.textContent = ' ';
    }
    range.setStart(el.childNodes[0], el.childNodes[0].length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  componentDidUpdate() {
    // alert('component updated');
    this.setCursor();
  }
  render() {
    let allLines = this.state.allLines;
    console.log(this.state.regno);
    return (
      <div className="">
        {/* <div>
          {acm}
        </div> */}
        <div className="bg-grey console-top">
          <div className="center-vert">
            <FiberManualRecord className="color-red"/>
            <FiberManualRecord className="color-yellow"/>
            <FiberManualRecord className="color-circle-green" />
          </div>
          <InfoOutlined className="color-greyish-white"/>
        </div>
        {/* <div className="c-align"><pre>{acm}</pre></div> */}
        <div id="inner-console" className="bg-black console color-white" onClick={this.setCursor}>
          {/* {allLines} */}
          {allLines}
        </div>
      </div>
    );
  }
}

export default Console;
