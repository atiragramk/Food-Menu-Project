
const calc = function () {
    //calculator

    const res = document.querySelector('.calculating__result span');
    let   sex,height, weight, age, ratio;
    
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

    function initLocalStorage (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach (el => {
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


    function calcCallories () {
        if (!sex || !height || !weight || !age || !ratio) {
            res.textContent = '____';
            return;
        }
        if (sex === 'female') {
            res.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio);
        } else {
            res.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7* age))*ratio);
        }
    }

    function getStaticData (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach (el => {
            el.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach (el => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcCallories ();
            });
                   
        });
    }

    getStaticData('#gender div', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicData (selector) {
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
            calcCallories ();
        });
    }

    getDynamicData('#weight');
    getDynamicData('#height');
    getDynamicData('#age');
};

export default calc;