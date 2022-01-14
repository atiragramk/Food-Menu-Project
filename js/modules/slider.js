
import {addZero} from "./timer";

const slider = function ({container, slide, nextSlide, prevSlide, totalCounter, currentCounter, wrapper, field}) {
    
    //slider 

    const sliders = document.querySelectorAll(slide),
          nextSlider = document.querySelector(nextSlide),
          prevSlider = document.querySelector(prevSlide),
          currentSlide = document.querySelector(currentCounter),
          totalSlide = document.querySelector(totalCounter),
          sliderWrapper = document.querySelector(wrapper),
          sliderField = document.querySelector(field),
          width = window.getComputedStyle(sliderField).width,
          sliderContent = document.querySelector(container);
        

    let currentIndex = 1,
    offset = 0;

    currentSlide.innerText = addZero(currentIndex);
    totalSlide.innerText = addZero(sliders.length);

    sliderField.style.width = 100 * sliders.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden';

    sliders.forEach(slide =>{
        slide.style.width = width;
    });

    const dotsWrapper = document.createElement('ol');

    sliderContent.style.position = 'relative';
    dotsWrapper.classList.add('carousel-indicators');
    sliderContent.append(dotsWrapper);

    for (let i = 1; i <= sliders.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dotsWrapper.append(dot);   
    } 

    const slideDots = dotsWrapper.querySelectorAll('.dot');

    function currentDot (index) {
        slideDots.forEach ((item, i) => {
            if ((i + 1) == index) {
                item.style.opacity = '1';
            } else {
                item.style.opacity = '.5';
            }
        });
    }

    function replaceWords (str) {
        return +str.replace(/\D/g, '');
        
    }

    currentDot(currentIndex);
 
    nextSlider.addEventListener('click', () => {
        currentIndex ++;      
        if (currentIndex > sliders.length) {
            currentIndex = 1;
        }
        currentSlide.innerText = addZero(currentIndex);

        if (offset == replaceWords(width)*(sliders.length - 1)) {
            offset = 0;
        } else {
            offset += replaceWords(width);
        }     
        sliderField.style.transform = `translateX(-${offset}px)`; 
        currentDot(currentIndex);
    });

    prevSlider.addEventListener('click', () => {
        currentIndex --;
        if (currentIndex < 1) {
            currentIndex = sliders.length;
        }
        currentSlide.innerText = addZero(currentIndex);

        if (offset == 0) {
            offset = replaceWords(width)*(sliders.length - 1);
        } else {
            offset -= replaceWords(width);
        }     
        sliderField.style.transform = `translateX(-${offset}px)`; 
        currentDot(currentIndex);
    });

   slideDots.forEach( (item, i) => {
    item.addEventListener('click', () => {
        currentIndex = i + 1;
        currentSlide.innerText = addZero(currentIndex);
        offset = replaceWords(width) * i;
        sliderField.style.transform = `translateX(-${offset}px)`; 
        currentDot(currentIndex);
    });
   });
};

export default slider;