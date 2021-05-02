import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    inputValue: PropTypes.string,
  };

  state = {
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue.trim() === '') {
      toast.warn('Please, enter something');

      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };

  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState, snapshot) {

  // }

  render() {
    const { inputValue } = this.state;

    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
