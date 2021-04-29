import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import imagesApi from './services/images-api';

import Loader from 'react-loader-spinner';
import './App.scss';

class App extends Component {
  // static propTypes = {
  // images: PropTypes.array

  // };

  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
  };

  onSearchHandle = query => {
    this.setState({ searchQuery: query, currentPage: 1, images: [] });

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
    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then(response => {
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
      })
      .finally(() => this.setState({ isLoading: false }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  // componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSearchHandle} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
        {isLoading && (
          <button className="Loader" variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </button>
          // <Loader
          //   className="Loader"
          //   type="BallTriangle"
          //   color="#303f9f"
          //   height={100}
          //   width={100}
          // />
        )}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} isLoading={isLoading}></Button>
        )}
      </>
    );
  }
}

export default App;
