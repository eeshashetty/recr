import React, { Component } from "react";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
// import { element } from "prop-types";
import axios from 'axios';
import urls from '../../common/urls';

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

const BASE_URL = urls.BASE_URL;

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
    let allLines=[];
    allLines.push(
      <div>
        <div id="console-heading" className="color-greyish-white c-align" >
          <pre>{acm}</pre>
          <p id="welcome-line" className="mtop-two">{localStorage.getItem('name')?`Welcome ${localStorage.getItem('name')}`:'Welcome to ACM Recruitments'}</p>
        </div>
        <div id="will-mount-line" className="center-vert">
          <div className="center-vert">
            <p className="line color-greyish-white">{localStorage.getItem('regno')? localStorage.getItem('regno'): 'user'}</p>
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

  // show response of login

  showResponse = (type, msg) => {
    console.log('inside showresponse')
    let allLines = this.state.allLines;
    if(type==='warning') {
      let warnLine = (
        <div id="response" className="mtop-one mbot-one center-vert">
          <div className="center-vert">
            <p className="marg-zero mright-one color-greyish-white" >$</p>
            <p className="marg-zero color-red">{msg}</p>
          </div>
        </div>
      );
      allLines.push(warnLine);
      this.setState({allLines: allLines});
      this.handleContent('random');
    }
    if(type==='error') {
      let errLine = (
        <div id="response" className="mtop-one mbot-one center-vert">
          <div className="center-vert">
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
      this.handleContent('random');
      parentEl = document.getElementById('response');
      el = document.getElementById('response').childNodes[1];
      el.contentEditable = false;
      el.id = "inactive";
      parentEl.id="a-response";
      this.setCursor();
    }
    if(type==='success') {
      let welcomeEl = document.getElementById('welcome-line');
      let willMountEl = document.getElementById('will-mount-line');
      welcomeEl.textContent = `Welcome ${this.state.name}`;
      willMountEl.childNodes[0].classList.add('marg-auto');
      willMountEl.childNodes[0].textContent = `Press Enter to continue...`;
      this.clear();
    }
  }

  // login

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
        if(data.success) {
          this.setState({name: data.name, regno: data.regno});
          localStorage.setItem('token',data.token);
          localStorage.setItem('name', data.name);
          localStorage.setItem('regno', data.regno);
          this.showResponse('success', 'Welcome');
        }
        else {
          this.showResponse('error' , data.message);
        }
    })
    .catch(error => {
        this.showResponse('error', 
        'Could not login. Please check your internet connection and try again');
        console.log(error);
    });

    allLines.push(loadingLine);
    this.setState({allLines: allLines});
    // this.handleContent('random', 'random');
    // axios.post(`${BASE_URL}/api/user/login`, data)
    // this.handleContent('random')
  }

  // display help

  displayHelp = () => {
    let allLines = this.state.allLines;
    let currentLine = (
      <div id="help mtop-one" className="">
        <div className="line center-vert mtop-one">
          <p className="marg-zero color-green mright-half">help:</p>
          <p className="marg-zero color-greyish-white">to list all the commands</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green mright-half">clear:</p>
          <p className="marg-zero color-greyish-white">to clear the screen</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green mright-half">login:</p>
          <p className="marg-zero color-greyish-white">to log in</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green mright-half">logout:</p>
          <p className="marg-zero color-greyish-white">to log out</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero mright-half color-green">reset password:</p>
          <p className="marg-zero color-greyish-white">to reset password</p>
        </div>
        <div className="line center-vert">
          <p className="marg-zero color-green mright-half">ls quiz:</p>
          <p className="marg-zero color-greyish-white">to attempt quiz</p>
        </div>
        {/* <div className="line center-vert">
          <p className="marg-zero color-green mright-half">login:</p>
          <p className="marg-zero color-greyish-white">to log in</p>
        </div> */}
        <div className="line center-vert mbot-one">
          <p className="marg-zero color-green mright-half">{'ls result: '}</p>
          <p className="marg-zero color-greyish-white">to see the result</p>
        </div>
      </div>
    );
    allLines.push(currentLine);
    this.setState({allLines: allLines});
    this.handleContent('random');
  }

  // redirect to quiz page

  listQuiz = () => {
    if(localStorage.getItem('token')) {
      window.open('/selectDomain', '_blank');
      window.focus();
    }
    else {
      this.showResponse('warning', 'Please login to continue with quiz');
    }
  }

  // logout

  logout = () => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('regno');
      let welcomeEl = document.getElementById('welcome-line');
      let willMountEl = document.getElementById('will-mount-line');
      welcomeEl.textContent = `Welcome to ACM Recruitments`;
      willMountEl.childNodes[0].classList.add('marg-auto');
      willMountEl.childNodes[0].textContent = `You are successfully logged out...`;
      this.clear();
    }
    else {
      this.showResponse('warning', 'You are already logged out!');
    }
  }

  // handle content

  handleContent = (content,target) => {
    let stack = this.state.stack;
    let allLines = this.state.allLines;
    let currentLine = (
      <div id="line" className="center-vert">
        <div className="center-vert">
          <p className="line color-greyish-white">{localStorage.getItem('regno')? localStorage.getItem('regno'): 'user'}</p>
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
        case 'clear':
          this.clear();
          break;
        case 'ls quiz':
          this.listQuiz();
          break;
        case 'login':
          if(localStorage.getItem('token')) {
            this.showResponse('warning','You are already logged in.')
          }
          else {
            this.login('reg');
            this.setState({typeLogin: true, typeReg: true});
          }
          break;
        case 'logout':
          this.logout();
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
      <div id="line" className="flex-wrap center-vert">
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
      <div id="line" className="flex-wrap center-vert">
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
    // if(localStorage.getItem('token')) {
    //   this.setState({typeLogin: false, typeReg: false, typePass: false});
    //   this.showResponse('warning','You are already logged in!');
    // }
    // else {
      if(type==='reg') {
        allLines.push(regLine);
      }
      else if(type==='pass') {
        allLines.push(passLine);
      }
      this.setState({ allLines: allLines});
    // }
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
    console.log(localStorage.getItem('regno'));
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
