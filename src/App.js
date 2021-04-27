import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';

import './App.scss';

class App extends Component {
  // static propTypes = {

  // };

  // state = {

  // };

  render() {
    return (
      <>
        <SearchBar />
        <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
      </>
    );
  }
}

export default App;
