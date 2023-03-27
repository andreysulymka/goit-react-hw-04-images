import { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import Searchbar from "./Searchbar";
import { getPhotos } from "./services/getPhotos";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal/Modal"
import LoadMoreButton from "./LoadMoreBtn/LoadMoreBtn";
import { Base, Container } from "./App.styled";
import Notiflix from 'notiflix';

export default function App() {
  
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState('');
  const [showBTN, setShowBTN] = useState(false);

  useEffect(() => {

    const loadPhotos = () => {
      getPhotos(searchText, page)  
    .then((photos) => {
      if (photos.hits.length === 0) {
        
        throw new Error(`No photos found for "${searchText}"`);
      } else {
        setPhotos((prevState) => [...prevState, ...photos.hits]);
        setShowBTN(photos.totalHits > 12 && page < Math.ceil(photos.totalHits / 12))
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure(error.message);
      setShowBTN(false );
    })
    .finally(() => {
      setIsLoading(false);
    });
};
    if (searchText.trim() === '') {
      return;
    }
    setIsLoading(true);
    loadPhotos()
      }, [searchText, page, showBTN]);



   
  const handleFormSubmit = (inputSearch) => {
    setSearchText(inputSearch);
    setPhotos([]);
    setPage(prevState => prevState + 1)
      };

  const handleLoadMore = () => {    
    setPage(prevState => prevState + 1);
  };
 
  const modalOpen = e => {
    if (e.target.nodeName === 'IMG') {
      setShowModal(true);
      setModalImgSrc(e.target.getAttribute("data-modal"))
      };
  };

  const modalClose = () => {
    setShowModal(false);
    setModalImgSrc('')
    };

  const modalImgAlt = 'Image description';
return (
      <Base>
      <Container>
        <Searchbar onSearch={handleFormSubmit} />
        {isLoading && <Loader />}
        {photos && photos.length > 0 && (<ImageGallery photos={photos} modalOpen={modalOpen} />
          )}
          {showBTN && <LoadMoreButton onClick={handleLoadMore}/>}
        {showModal  && <Modal modalClose={modalClose} children={<img src={modalImgSrc} alt={modalImgAlt}/>}/>}
        </Container>
        </Base>
    );
}

  


 
