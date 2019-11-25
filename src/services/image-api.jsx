export const fetchImages = (query = '', pageNumber = 1) => {

  const key = '14155377-b5b6b49493d016d7b1207d603';

  const path = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=${key}`;

  return fetch(path)
    .then(res => res.json())
    .then(data => data.hits);

};

