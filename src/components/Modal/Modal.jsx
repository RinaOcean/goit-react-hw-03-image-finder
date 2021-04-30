import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.props.onClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
