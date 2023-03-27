import { Component } from "react";
import Loader from "./Loader/Loader";
import Searchbar from "./Searchbar";
import { getPhotos } from "./services/getPhotos";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal/Modal"
import LoadMoreButton from "./LoadMoreBtn/LoadMoreBtn";
import { Base, Container } from "./App.styled";
import Notiflix from 'notiflix';

export default class App extends Component {
  state = {
    searchText: '',
    isLoading: false,
    photos: [],
    page: 1,
   showModal: false,
    modalImgSrc: "",
    showBTN: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      this.loadPhotos();
    }
  }

 loadPhotos = () => {
   const { searchText, page } = this.state;
    getPhotos(searchText, page)  
    .then((photos) => {
      if (photos.hits.length === 0) {
        
        throw new Error(`No photos found for "${searchText}"`);
      } else {
        this.setState((prevState) => ({
          photos: [...prevState.photos, ...photos.hits],
          showBTN: page < Math.ceil(photos.totalHits / 12),
        }));
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure(error.message);
      this.setState({ showBTN: false });
    })
    .finally(() => {
      this.setState({ isLoading: false });
    });
};

   
  handleFormSubmit = (inputSearch) => {
    this.setState({ searchText: inputSearch, photos: [], page: 1  });
  };

  handleLoadMore = () => {
    console.log("Єта кнопка")
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
 
modalOpen = e => {
    if(e.target.nodeName === 'IMG') {
      this.setState({showModal: true, modalImgSrc: e.target.getAttribute("data-modal")})
    };
  };

  modalClose = () => {
    this.setState({showModal: false, modalImgSrc: ""});
  };


  render() {
    const { photos, isLoading,showModal, modalImgSrc, modalImgAlt, showBTN } = this.state;
    return (
      <Base>
      <Container>
        <Searchbar onSearch={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {photos && photos.length > 0 && (<ImageGallery photos={photos} modalOpen={this.modalOpen} />
          )}
          {showBTN && <LoadMoreButton onClick={this.handleLoadMore}/>}
        {showModal  && <Modal modalClose={this.modalClose} children={<img src={modalImgSrc} alt={modalImgAlt}/>}/>}
        </Container>
        </Base>
    );
  }
}