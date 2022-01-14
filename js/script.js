import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import form from './modules/form';
import card from './modules/card';
import calc from './modules/calc';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setInterval(() => showModal('.modal', modalTimer), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
    timer('.timer', '2022-02-20');
    modal('[data-modal]', '.modal', modalTimer);
    form(modalTimer);
    card();
    calc();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        nextSlide: '.offer__slider-next',
        prevSlide: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});



