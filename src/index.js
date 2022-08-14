import './css/styles.css';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
};

