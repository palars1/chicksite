const API_URL = 'https://seed-stream-penguin.glitch.me/';

/*
Доступные методы:
GET /api - получить список услуг
GET /api?service={n} - получить список барберов
GET /api?spec={n} - получить список месяца работы барбера
GET /api?spec={n}&month={n} - получить список дней работы барбера
GET /api?spec={n}&month={n}&day={n} - получить список свободных часов барбера
POST /api/order - оформить заказ
*/

const addPreload = (elem) => {
    elem.classlist.add('preload');
};

const removePreload = (elem) => {
    elem.classlist.remove('preload');
};

const startSlider = () => {
    const sliderItems = document.querySelectorAll('.slider__item');
    const sliderList = document.querySelector('.slider__list');
    const btnPrevSlide = document.querySelector('.slider__arrow-left');
    const btnNextSlide = document.querySelector('.slider__arrow-right');

    let activeSlide = 1;
    let position = 0;

    const checkSlider = () => {
        if ((activeSlide + 2 === sliderItems.length &&
            document.documentElement.offsetWidth > 560) ||
            activeSlide === sliderItems.length) {
            btnNextSlide.style.display = 'none';
        } else {
            btnNextSlide.style.display = '';
        };
        if (activeSlide === 1) {
            btnPrevSlide.style.display = 'none';
        } else {
            btnPrevSlide.style.display = '';
        };
    };

    checkSlider();
    
    const prevSlide = () => {
        sliderItems[activeSlide]?.classlist.remove('slider__item-active');
        position = -sliderItems[0].clienWidth * (activeSlide -2); 

        sliderList.style.transform = `translateX(${position}px)`;
        activeSlide -= 1;
        sliderItems[activeSlide]?.classlist.add('slider__item-active');
        checkSlider();
    };    

    const nextSlide = () => {
        sliderItems[activeSlide]?.classlist.remove('slider__item-active');
        position = -sliderItems[0].clienWidth * activeSlide; 

        sliderList.style.transform = `translateX(${position}px)`;
        activeSlide += 1;
        sliderItems[activeSlide]?.classlist.add('slider__item-active');
        checkSlider();
    };
    btnNextSlide.addEventListener('click', prevSlide);
    btnPrevSlide.addEventListener('click', nextSlide);

    window.addEventListener('resize') = () => {
        if (activeSlide +2 > sliderItems.length && 
            document.documentElement.offsetWidth > 560) {
                activeSlide = sliderItems -2;
                sliderItems[activeSlide]?.classList.add('slider__item-active')
            }

        position = -sliderItems[0].clientWidth * (activeSlide - 1);
        sliderList.style.transform = `translateX(${position}px)`;
        checkSlider();        
    };

};

const initSlider = () => {
    const slider = document.querySelector('.slider');
    const sliderContainer = document.querySelector('.slider__container');

    sliderContainer.style.display = 'none';
    addPreload(slider); 

    window.addEventListener('load', ()=> {
        removePreload(slider);

        startSlider();
        
        sliderContainer.style.display = '';        
    });
    
};

const renderPrice = (wrapper, data) => {    
    data.forEach((item) => {
        const priceItem = document.createElement('li');
        priceItem.classList.add('.price__item');
        priceItem.innerHTML = `
        <span class="price__item-title">${item.name}</span>
        <span class="price__item-count">${item.price}руб.</span>
        `;
        wrapper.append(priceItem)
    });
};

const renderService = (wrapper, data) => {
    const labels = data.map(item => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
            <input class="radio__input" type="radio" name="service" value="${item.id}">
            <span class="radio__label">${item.name}</span>
        `;
        return label;
    });
    wrapper.append(...labels)
};

const renderSpec = (wrapper, data) => {
    const labels = data.map(item => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="spec" value="${item.id}">
        <span class="radio__label radio__label-spec" style="--bg-image: url(${API_URL}${item.img})">${item.name}</span>
        `;
        return label;
    });
    wrapper.append(...labels)
};

const renderMounth = (wrapper, data) => {
    const labels = data.map(mounth => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="mounth" value="${mounth}">
        <span class="radio__label>${new intl.DateTimeFormat('ru-RU', {
            mounth: 'long'
        }).format(new date(mounth))}</span>
        `;
        return label;
    });
    wrapper.append(...labels)
};

const renderDay = (wrapper, data, mounth) => {
    const labels = data.map(day => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="day" value="${day}">
        <span class="radio__label>${new intl.DateTimeFormat('ru-RU', {
            mounth: 'long', day: 'numeric'
        }).format(new date('${mounth}/${day}'))}</span>
        `;
        return label;
    });
    wrapper.append(...labels)
};

const renderTime = (wrapper, data) => {
    const labels = data.map(time => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="time" value="${time}">
        <span class="radio__label>${time}</span>
        `;
        return label;
    });
    wrapper.append(...labels)
};

const initServise = () => {
    const priseList = document.querySelector('.price__list');
    const reserveFieldsetService = document.querySelector('reserve__fieldset-service');
    priceList.textContent = '';
    addPreload(priceList);

    reserveFieldsetService.innerHTML = '<legend class="reserve__legend">Услуги</legend>';
    addPreload(reserveFieldsetService);

    fetch(`${API_URL}/api`)
        .then((response)=> {
        return response.json();
        })
        .then((data) => {
            renderPrice(data);
            removePreload(priceList);
            return data;
        })
        .then((data) => {
            renderService(reserveFieldsetService);
            removePreload(reserveFieldsetService);
        })
};

const addDisabled = (arr)=> {
    arr.forEach(elem => {
        elem.disabled = true;
    });
};

const removeDisabled = (arr)=> {
    arr.forEach(elem => {
        elem.disabled = false;
    });
};

const initReserve = ()=> {
    const reserveForm = document.querySelector('.reserve__form');
    const { fieldspec, fielddata, fieldmounth, fieldday, fieldtime, btn } = reserveForm;
    
    addDisabled([fieldspec, fielddata, fieldmounth, fieldday, fieldtime, btn]);
    reserveForm.addEventListener('change', async event => {
        const target = event.target;

        if (target.name === 'service') {
            addDisabled([fieldspec, fielddata, fieldmounth, fieldday, fieldtime, btn]);
            fieldspec.innerHTML = '<legend class="reserve__legend">Специалист</legend>';
            addPreload(fieldspec);

            const response = await fetch(`${API_URL}/api?service${target.value}`);
            const data = await response.json();
                
            renderSpec(fieldspec, data);
            removePreload(fieldspec);
            removeDisabled([fieldspec]);
        };

        if (target.name === 'spec') {
            addDisabled([fielddata, fieldmounth, fieldday, fieldtime, btn]);
            addPreload(fieldmounth);

            const response = await fetch(`${API_URL}/api?spec${target.value}`);
            const data = await response.json();
            
            fieldmounth.textContent = '';
            renderMounth(fieldmounth, data);
            removePreload(fieldmounth);
            removeDisabled([fielddata, fieldmounth]);
        };

        if (target.name === 'mounth') {
            addDisabled([fieldday, fieldtime, btn]);
            addPreload(fieldday);

            const response = await fetch(`${API_URL}/api?spec${reserveForm.spec.value}&mounth=${reserveForm.mounth.value}`);
            const data = await response.json();
            
            fieldday.textContent = '';
            renderDay(fieldday, data, reserveForm.mounth.value);
            removePreload(fieldday);
            removeDisabled([fieldday]);
        };

        if (target.name === 'day') {
            addDisabled([fieldtime, btn]);
            addPreload(fieldtime);

            const response = await fetch(`${API_URL}/api?spec${reserveForm.spec.value}&mounth=${reserveForm.mounth.value}&day=${target.value}`);
            const data = await response.json();
            
            fieldtime.textContent = '';
            renderTime(fieldtime, data);
            removePreload(fieldtime);
            removeDisabled([fieldtime]);
        };

        if (target.name === 'time') {
            removeDisabled([btn]);
        };

    });

};

const init = () => {
    initSlider();
    initServise();
    initReserve();
};

window.addEventListener('DOMContentLoader', init);
