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
    recoveryInProgress: false,
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
        <div id="will-mount-line" className="flex-wrap">
          <div className="flex-box">
            <p className="line color-greyish-white marg-zero">{localStorage.getItem('regno')? localStorage.getItem('regno'): 'user'}</p>
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

  // show response general function

  showResponse = (type, msg) => {

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
      let parentEl;
      if(document.getElementById('loading')) {
        parentEl = document.getElementById('loading');
      }
      if(parentEl && parentEl.childNodes && parentEl.childNodes[1]) {
        let el = document.getElementById('loading').childNodes[1];
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
    }
    if(type==='success') {
      let welcomeEl = document.getElementById('welcome-line');
      let willMountEl = document.getElementById('will-mount-line');
      if(localStorage.getItem('token')) {
        willMountEl.childNodes[0].classList.add('marg-auto');
        welcomeEl.textContent = `Welcome ${this.state.name}`;
        willMountEl.childNodes[0].textContent = `Press Enter to continue...`;
        this.clear();
      }
      else {
        let successLine = (
          <div id="response" className="mtop-one mbot-one center-vert">
            <div className="center-vert">
              <p className="marg-zero color-greyish-white" >$</p>
            </div>
            <p
              id="active"
              contentEditable={true}
              spellCheck={false}
              onKeyDown={this.keyPressed}
              className="outline-black color-circle-green line-text line"
            >{msg}</p>
          </div>
        );
        let parentEl;
        if(document.getElementById('loading')) {
          parentEl = document.getElementById('loading');
        }
        if(parentEl && parentEl.childNodes && parentEl.childNodes[1]) {
          let el = document.getElementById('loading').childNodes[1];
          allLines.push(successLine);
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
      }
    }
  }

  // authorize login data

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
    
    axios.post(BASE_URL + '/login', data, 
    {headers: {'Content-Type' : 'application/json'}})
    .then(response => {
        let data = response.data;
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
    .catch(() => {
        this.showResponse('error', 
        'Could not login. Please check your internet connection and try again');
        // console.log(error);
    });

    allLines.push(loadingLine);
    this.setState({allLines: allLines});
  }

  // show result

  showResult = (dept, code) => {
    // let arr = [];
    let msg,color;
    if(code === 0 ) {
      msg = `You haven't been evaluated yet! Please stay tuned`;
      color='orange';
    }
    else if(code===1) {
      msg = `We are sorry to inform you that you did not clear 
      the first round of recruitment. We wish you best of luck and 
      hope you will continue to be a part of ACM by participating in 
      our events and workshops.`;
      color= 'red';
    }
    else if(code === 2) {
      msg= `Congratulations you have cleared first round of recruitments.
      Please stay tuned to the website for the next round.`;
      color='circle-green';
    }
    let currentLine = (
      <div id="response" className="mtop-one mbot-one flex-box mleft-half">
        <div className="flex-box">
          <p className="marg-zero color-greyish-white" >{dept}: </p>
        </div>
        <p
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className={`outline-black color-${color} line-text line`}
        >{msg}</p>
      </div>
    );
    return(currentLine);
  }

  display = (arr) => {
    let allLines = this.state.allLines;
    allLines.push(arr);
    this.setState({allLines: allLines});
  }

  // forgot password post method

  recoverAccount = () => {
    this.setState({recoveryInProgress: false});
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
    let stack = this.state.stack;
    let email = stack[stack.length-1];
    let data = {'email': email};
    data = JSON.stringify(data);
    stack.pop();
    this.setState({stack: stack, counter: stack.length});
    axios.post(`${BASE_URL}/api/user/forgotpassword`,data, 
    {headers: {'Content-Type' : 'application/json'}})
    .then(response=> {
      let data = response.data;
        if(data.success) {
          this.showResponse('success', data.message);
        }
        else {
          this.showResponse('error' , data.message);
        }
    })
    .catch((err)=> {
      this.showResponse('error', 
        'Could not login. Please check your internet connection and try again');
        // console.log(err);
    })
    allLines.push(loadingLine);
  }

  // handle help command

  displayHelp = () => {
    let allLines = this.state.allLines;
    let currentLine = (
      <div id="help mtop-one" className="">
        <div className="flex-wrap line center-vert mtop-one">
          <p className="marg-zero color-green mright-half">help</p>
          <p className="marg-zero color-greyish-white">list all the commands</p>
        </div>
        <div className="flex-wrap line center-vert">
          <p className="marg-zero color-green mright-half">clear</p>
          <p className="marg-zero color-greyish-white">clear the screen</p>
        </div>
        <div className="flex-wrap line center-vert">
          <p className="marg-zero color-green mright-half">login</p>
          <p className="marg-zero color-greyish-white">log in</p>
        </div>
        <div className="flex-wrap line center-vert">
          <p className="marg-zero color-green mright-half">logout</p>
          <p className="marg-zero color-greyish-white">log out</p>
        </div>
        <div className="flex-wrap line center-vert">
          <p className="marg-zero mright-half color-green">forgot password</p>
          <p className="marg-zero color-greyish-white">account recovery</p>
        </div>
        <div className="flex-wrap line center-vert">
          <p className="marg-zero color-green mright-half">attempt test</p>
          <p className="marg-zero color-greyish-white">take test</p>
        </div>
        {/* <div className="line center-vert">
          <p className="marg-zero color-green mright-half">login:</p>
          <p className="marg-zero color-greyish-white">to log in</p>
        </div> */}
        <div className="line center-vert mbot-one">
          <p className="marg-zero color-green mright-half">view result</p>
          <p className="marg-zero color-greyish-white">see the result</p>
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
      this.handleContent('random');
      setTimeout(() => {
        window.open('/home', '_blank');
        window.focus();
      }, 1000);     
    }
    else {
      this.showResponse('warning', 'Please login to take the test');
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
      <div id="line" className="flex-wrap">
        <div className="flex-box">
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
        case 'attempt test':
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
        case 'forgot password':
        if(localStorage.getItem('token')) {
          this.showResponse('warning', 'You need to logout before resetting the password!!')
        }
        else {
          this.setState({recoveryInProgress: true});
          this.enterEmail();
        }
          break;
        case 'view result':
          this.viewResult();
          break;  
        default:
          if(this.state.typePass) {
            this.postData();
          }
          else if(this.state.typeReg) {
            this.login('pass');
            this.setState({typePass: true});
          }
          else if(this.state.recoveryInProgress) {
            this.recoverAccount();
          }
          else {
            if(content==='random') {
              allLines.push(currentLine);
              this.setState({ allLines: allLines});
              stack.pop(); 
              this.setState({stack: stack, counter: stack.length});
            }
            else {
              if(content==='') {
                allLines.push(currentLine);
                this.setState({ allLines: allLines});
              }
              else {
                this.showResponse('warning', 'Command does not exist');
              }
            }
          }
          break;
      }
    }
  }

  //view result

  viewResult = () => {
    if(localStorage.getItem('token')) {
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
      allLines.push(loadingLine);
      this.getResult();
      this.setState({allLines: allLines});
    }
    else {
      this.showResponse('warning', 'You are not logged in. Please login to continue');
    }
  }

  //get result
  getResult = () => {
    let allLines = this.state.allLines;
    let config = {headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}};
    axios.get(`${BASE_URL}/api/user/result`,config)
    .then(res => {
        let data = res.data;
        let showArr=[];
        if(data && data.success) {
          let technical = data.technical;
          let management = data.management;
          let design = data.design;
          showArr.push(this.showResult('design', design));
          showArr.push(this.showResult('management', management));
          showArr.push(this.showResult('technical', technical));
          allLines.push(showArr);
        }
        this.setState({allLines: allLines});
        let parentEl;
        if(document.getElementById('loading')) {
          parentEl = document.getElementById('loading');
        }
        if(parentEl && parentEl.childNodes && parentEl.childNodes[1]) {
          let el = document.getElementById('loading').childNodes[1];
          // allLines.push(currentLine);
          // this.setState({allLines: allLines, gotResponse: true});
          this.handleContent('random');
          el.contentEditable = false;
          el.id = "inactive";
          parentEl.id="not-loading";
          
          parentEl = document.getElementById('response');
          if(parentEl && parentEl.childNodes && parentEl.childNodes[1]) {
            el = document.getElementById('response').childNodes[1];
            el.contentEditable = false;
            el.id = "inactive";
            parentEl.id="a-response";
          }
          this.setCursor();
        }
    })
    .catch(()=> {
      this.showResponse('error', 
        'Could not get your result. Please check your internet connection and try again');
    })
  }


  // handle login command

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
          type="password"
          className="password flex-wrap outline-black color-green line-text line"
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
    // }
  }

  // handle forgot password command

  enterEmail = () => {
    let allLines = this.state.allLines;
    let emailLine = (
      <div id="line" className="flex-wrap center-vert">
        <p className="line color-greyish-white">> Enter your registred email: </p>
        <p
          id="active"
          contentEditable={true}
          spellCheck={false}
          onKeyDown={this.keyPressed}
          className="regno outline-black color-green line-text line"
        > </p>
      </div>
    );
    allLines.push(emailLine);
    this.setState({allLines: allLines});
  }

  showPass = event => {
    // console.log('hi');
    // let content = event.target.textContent;
    // console.log(event.target.textContent);
    // event.target.textContent="*".repeat(content.length);
  }

  // clear command

  clear = () => {
    let allLines = this.state.allLines.slice(0,1);
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
    
  };
  setCursor = () => {
    let el = document.getElementById("active");
    let objDiv = document.getElementById("inner-console");
    let range = document.createRange();
    let sel = window.getSelection();
    
    if(!el) {
      el = document.getElementById("inactive");
      
      el.contentEditable="true";
      el.textContent=' ';
      el.id="active";
      
    }
    if(!el.childNodes[0]) {
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
    this.setCursor();
  }
  render() {
    let allLines = this.state.allLines;
    return (
      <div className="">
        <div className="bg-grey console-top">
          <div className="center-vert">
            <FiberManualRecord className="color-red"/>
            <FiberManualRecord className="color-yellow"/>
            <FiberManualRecord className="color-circle-green" />
          </div>
          <InfoOutlined className="color-greyish-white"/>
        </div>
        <div id="inner-console" className="bg-black console color-white" onClick={this.setCursor}>
          {allLines}
        </div>
      </div>
    );
  }
}

export default Console;
