import { Component } from 'react';

class Modal extends Component {
  // state = {
  //   isLoading: true,
  // };
  // componentDidMount() {
  //   this.setState({ isLoading: false });
  // }
  // // componentWillUnmount() {
  //   console.log('modal unmount');
  // }
  // componentDidUpdate(){}

  render() {
    return (
      <div className="Overlay" onClick={this.props.onClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
