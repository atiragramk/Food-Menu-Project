/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = function () {
  //calculator
  const res = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    sex = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalStorage(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.remove(activeClass);

      if (el.getAttribute('id') === localStorage.getItem('sex')) {
        el.classList.add(activeClass);
      }

      if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        el.classList.add(activeClass);
      }
    });
  }

  initLocalStorage('#gender div', 'calculating__choose-item_active');
  initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcCallories() {
    if (!sex || !height || !weight || !age || !ratio) {
      res.textContent = '____';
      return;
    }

    if (sex === 'female') {
      res.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      res.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  function getStaticData(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(el => {
          el.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcCallories();
      });
    });
  }

  getStaticData('#gender div', 'calculating__choose-item_active');
  getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicData(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;

        case "weight":
          weight = +input.value;
          break;

        case "age":
          age = +input.value;
      }

      calcCallories();
    });
  }

  getDynamicData('#weight');
  getDynamicData('#height');
  getDynamicData('#age');
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const card = function () {
  //Description Card
  class MenuCard {
    constructor(src, alt, subtitle, description, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.subtitle = subtitle;
      this.description = description;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }

  }

  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (card);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


const form = function (modalTimer) {
  // form 
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы скоро свяжемся с Вами',
    failure: 'Что-то пошло по пизде'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                   display: block;
                   margin: 0 auto;
               `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      axios({
        method: 'post',
        url: 'http://localhost:3000/requests',
        data: json
      }).then(data => {
        console.log(data);
        showThanksMessage(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksMessage(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksMessage(message) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimer);
    const thankModal = document.createElement('div');
    thankModal.classList.add('modal__dialog');
    thankModal.innerHTML = `
               <div class="modal__content">
                   <div class="modal__close" data-close>×</div>
                   <div class="modal__title">${message}</div>
               </div>
           `;
    document.querySelector('.modal').append(thankModal);
    setTimeout(() => {
      thankModal.remove();
      prevModal.classList.add('show');
      prevModal.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
    }, 4000);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showModal": function() { return /* binding */ showModal; },
/* harmony export */   "hideModal": function() { return /* binding */ hideModal; }
/* harmony export */ });
function showModal(modalSelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimer) {
    clearInterval(modalTimer);
  }
}

function hideModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

const modal = function (btnSelector, modalSelector, modalTimer) {
  const btnModal = document.querySelectorAll(btnSelector),
        modal = document.querySelector(modalSelector);
  btnModal.forEach(item => {
    item.addEventListener('click', () => {
      showModal(modalSelector, modalTimer);
    });
  });
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      hideModal(modalSelector);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      hideModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal(modalSelector, modalTimer);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
};

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


const slider = function (_ref) {
  let {
    container,
    slide,
    nextSlide,
    prevSlide,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
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
  currentSlide.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currentIndex);
  totalSlide.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(sliders.length);
  sliderField.style.width = 100 * sliders.length + '%';
  sliderField.style.display = 'flex';
  sliderField.style.transition = '0.5s all';
  sliderWrapper.style.overflow = 'hidden';
  sliders.forEach(slide => {
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

  function currentDot(index) {
    slideDots.forEach((item, i) => {
      if (i + 1 == index) {
        item.style.opacity = '1';
      } else {
        item.style.opacity = '.5';
      }
    });
  }

  function replaceWords(str) {
    return +str.replace(/\D/g, '');
  }

  currentDot(currentIndex);
  nextSlider.addEventListener('click', () => {
    currentIndex++;

    if (currentIndex > sliders.length) {
      currentIndex = 1;
    }

    currentSlide.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currentIndex);

    if (offset == replaceWords(width) * (sliders.length - 1)) {
      offset = 0;
    } else {
      offset += replaceWords(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;
    currentDot(currentIndex);
  });
  prevSlider.addEventListener('click', () => {
    currentIndex--;

    if (currentIndex < 1) {
      currentIndex = sliders.length;
    }

    currentSlide.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currentIndex);

    if (offset == 0) {
      offset = replaceWords(width) * (sliders.length - 1);
    } else {
      offset -= replaceWords(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;
    currentDot(currentIndex);
  });
  slideDots.forEach((item, i) => {
    item.addEventListener('click', () => {
      currentIndex = i + 1;
      currentSlide.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(currentIndex);
      offset = replaceWords(width) * i;
      sliderField.style.transform = `translateX(-${offset}px)`;
      currentDot(currentIndex);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = function (tabSelector, tabContentSelector, tabParentSelector) {
  // tabs 
  const tabs = document.querySelectorAll(tabSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabParent = document.querySelector(tabParentSelector);

  function hideTabsContent() {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabsContent();
  showTabContent();
  tabParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabContent(i);
        }
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZero": function() { return /* binding */ addZero; }
/* harmony export */ });
function addZero(num) {
  if (num >= 0 && num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}

const timer = function (timerSelector, deadline) {
  function timeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = timeRemaining(endtime);
      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(timerSelector, deadline);
};

/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








window.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setInterval(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)('.modal', modalTimer), 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-08-20');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer);
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])(modalTimer);
  (0,_modules_card__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
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
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map