import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import imagesApi from './services/images-api';
import Modal from './components/Modal';

import './App.scss';

class App extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    currentPage: PropTypes.number,
    searchQuery: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    showModal: PropTypes.bool,
    bigImageUrl: PropTypes.string,
    imageStatus: PropTypes.string,
  };

  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    bigImageUrl: '',
    imageStatus: 'loading',
  };

  onSearchHandle = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });

    // if (!response.ok) {
    //   throw response;
    // }

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

        if (this.state.currentPage > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onImageClick = url => {
    this.setState({ bigImageUrl: url });
    this.toggleModal();
    this.setState({ imageStatus: 'loading' });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageLoaded = () => {
    this.setState({ imageStatus: 'loaded' });
  };

  // componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  render() {
    const {
      images,
      isLoading,
      error,
      showModal,
      bigImageUrl,
      imageStatus,
    } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <>
        {showModal && (
          <Modal onClick={this.toggleModal}>
            {imageStatus === 'loading' && (
              <Loader type="Circles" color="#4b817a" height={80} width={80} />
            )}

            <img src={bigImageUrl} alt="" onLoad={this.onImageLoaded} />
          </Modal>
        )}
        {error && <h1>Ooops!Something went wrong. Try again</h1>}
        <SearchBar onSubmit={this.onSearchHandle} />
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={this.onImageClick} />
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
        )}
        {shouldRenderLoadMoreButton && (
          <Button onClick={this.fetchImages} isLoading={isLoading}></Button>
        )}
      </>
    );
  }
}

export default App;
