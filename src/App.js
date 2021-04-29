import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import axios from 'axios';

import './App.scss';

const API_KEY = '20659430-8e33c69d8b4c60137606db57c';
const BASE_URL = 'https://pixabay.com/api';

class App extends Component {
  // static propTypes = {
  // images: PropTypes.array

  // };

  state = {
    images: [],
  };

  onSearchHandle = query => {
    console.log(query);

    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=1&per_page=12&key=${API_KEY}`;

    axios.get(url).then(response => {
      const filteredData = response.data.hits.map(hit => {
        return {
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
        };
      });
      console.log(this.state.images);
      this.setState({
        images: filteredData,
      });
      console.log(this.state.images);
    });

    // if (!response.ok) {
    //   throw response;
    // }

    // console.log({ hits });
    // return response
    //   .json()
    //   .then(({ hits }) => {
    //     // this.incrementPage();

    //     return hits;
    //   })
    //   .catch(err => {
    //     console.warn(err);
    //   });
  };
  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSearchHandle} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
        <Button />
      </>
    );
  }
}

export default App;
