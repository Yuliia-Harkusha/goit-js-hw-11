import './css/styles.css';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from 'lodash.throttle';
import { markup } from "./render";
import { getPhotos } from './pixabay';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
};

let resPage = 1;

const lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

function renderCard(arr) {
    const markupCard = arr.map(item => markup(item)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markupCard);
}

async function onSubmitForm(e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
    const query = refs.input.value.trim();
    resPage = 1; 

    if (query === '') {
        return;
    };

    const response = await getPhotos(query, resPage);

    try {
        if (response.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        if (response.totalHits > 0) {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
            renderCard(response.hits);
            lightbox.refresh();

            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: 0,
            behavior: "smooth",
            });
        }
    } catch (error) {
        console.log(error);
    };
};

async function onScrollGetMore() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const query = refs.input.value.trim();
	
    if (clientHeight + scrollTop >= scrollHeight - 10) {
        const response = await getPhotos(query, resPage+=1);

        try {
            renderCard(response.hits);
            lightbox.refresh();
        } catch (error) {
            console.log(error);
        }
    };
}

refs.form.addEventListener('submit', onSubmitForm);
window.addEventListener('scroll', throttle(onScrollGetMore, 250)
);


