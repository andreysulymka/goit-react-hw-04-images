

export const getPhotos = (searchText, page) => {
    return fetch(`https://pixabay.com/api/?key=33419599-8df6ee82ed12cd9ffb5884c17&q=${searchText}&page=${page}&image_type=photo&per_page=12`)
        .then((res) => res.json())
          
}

