import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className={this.props.className}
        style={this.props.style}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;