import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { maper } from '../utils/maper';
import { requestApi } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoader } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    imagesPerPage: 12,
    images: [],
    query: '',
    page: 1,
    error: null,
    notFound: false,
    isLoading: false,
    imageInModal: null,
    imagesQuantity: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, imagesPerPage } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.imgFromApi(query, page, imagesPerPage);
    }
  }

  imgFromApi = async (query, page, imagesPerPage) => {
    this.setState({ notFound: false, error: null, isLoading: true });
    try {
      const data = await requestApi(query, page, imagesPerPage);
      const apiImages = data.hits;
      const totalHits = data.totalHits;
      if (apiImages.length) {
        this.setState(prevState => ({
          images: [...prevState.images, ...maper(apiImages)],
          notFound: false,
          imagesQuantity: totalHits,
        }));
      } else
        this.setState({
          images: [],
          imagesQuantity: null,
          notFound: true,
        });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onSubmit = query => {
    this.setState({
      images: [],
      query,
      page: 1,
    });
  };

  nextPageHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = e => {
    const imageInModal = e.target.dataset.url;
    this.setState({ imageInModal: imageInModal });
  };

  closeModal = () => {
    this.setState({ imageInModal: null });
  };

  render() {
    const {
      imagesPerPage,
      images,
      page,
      error,
      notFound,
      isLoading,
      imageInModal,
      imagesQuantity,
    } = this.state;
    return (
      <>
        <ToastContainer position="top-center" autoClose={2000} />
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {error && <Notification msg={error} />}
        {notFound && !error && (
          <Notification msg={'Nothing found for your request'} />
        )}
        {<ImageGallery images={images} openModal={this.openModal} />}
        {page < imagesQuantity / imagesPerPage && !isLoading && !error && (
          <ButtonLoader nextPageHandler={this.nextPageHandler} />
        )}
        {imageInModal && (
          <Modal url={imageInModal} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
