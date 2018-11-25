import React, { Component } from "react";

class ConsoleLine extends Component {
  state = {
    editablePara: false
  };
  componentDidMount() {
    this.setState({ editablePara: this.state.editablePara });
  }
  render() {
    return (
      <div className="color-white">
        <p contentEditable={this.state.editablePara} />
      </div>
    );
  }
}

export default ConsoleLine;
