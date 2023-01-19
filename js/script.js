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

window.addEventListener('DOMContentLoader', initSlider);
