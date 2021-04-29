import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Container from './components/Container';
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
    currentPage: 1,
    searchQuery: '',
  };

  onSearchHandle = query => {
    this.setState({ searchQuery: query });

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
  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;

    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`;

    axios.get(url).then(response => {
      const filteredData = response.data.hits.map(hit => {
        return {
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
        };
      });

      this.setState(prevState => ({
        images: [...prevState.images, ...filteredData],
        currentPage: prevState.currentPage + 1,
      }));
    });
  };
  // componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.onSearchHandle} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
        <Button onClick={this.fetchImages} />
      </Container>
    );
  }
}

export default App;
