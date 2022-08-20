import axios from "axios";

export const getPhotos = async (query, page) => {
    const BASE_URL = "https://pixabay.com/api/";
    const filtersQuery = `?key=29299874-58d5dab0a0dc045820b402d0d&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;

    return await axios.get(`${BASE_URL}${filtersQuery}`).then(response => response.data);
    };


