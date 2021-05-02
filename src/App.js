import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import imagesApi from './services/images-api';
import Modal from './components/Modal';
import LoaderSpinner from './components/LoaderSpinner';

import 'react-toastify/dist/ReactToastify.css';
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
        if (response.data.total === 0) {
          toast.error('Nothing matching the request');
          return;
        }
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
      .catch(error => {
        this.setState({ error });
        toast.error('Error occurred. Try later');
      })
      .finally(() => {
        if (this.state.currentPage > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
        return this.setState({ isLoading: false });
      });
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
          <Modal onClose={this.toggleModal}>
            {imageStatus === 'loading' && (
              <Loader type="Circles" color="#4b817a" height={80} width={80} />
            )}

            <img src={bigImageUrl} alt="" onLoad={this.onImageLoaded} />
          </Modal>
        )}

        <SearchBar onSubmit={this.onSearchHandle} />
        {error && (
          <h1 className="error-text">
            Ooops!Something went wrong. Try again later
          </h1>
        )}
        <ImageGallery images={images} onClick={this.onImageClick} />
        {isLoading && <LoaderSpinner />}
        {shouldRenderLoadMoreButton && (
          <Button onClick={this.fetchImages} isLoading={isLoading}></Button>
        )}
        <ToastContainer />
      </>
    );
  }
}

export default App;
