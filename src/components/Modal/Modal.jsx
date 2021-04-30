import { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="Overlay" onClick={this.props.onClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
