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

    if (query === '') {
        return;
    };

    const response = await getPhotos(query);

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
            top: cardHeight * 2,
            behavior: "smooth",
            });
        }
    } catch (error) {
        console.log(error);
    };
};

refs.form.addEventListener('submit', onSubmitForm);


window.addEventListener('scroll', async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
    if (clientHeight + scrollTop >= scrollHeight - 5) {
        const query = refs.input.value.trim();
        const response = await getPhotos(query);

        try {
            renderCard(response.hits);
            lightbox.refresh();

            const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
        } catch (error) {
            console.log(error);
        }
    };
}
);


