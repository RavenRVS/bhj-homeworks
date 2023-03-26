let numberSlide = 0;
const prev = document.querySelector('.slider__arrow_prev');
const next = document.querySelector('.slider__arrow_next');
const slidersList = Array.from(document.querySelectorAll('.slider__item'));
const sliderDotsList = Array.from(document.querySelectorAll('.slider__dot'));

function changeSlide (curentSlide, direction) {
    slidersList[numberSlide].classList.remove('slider__item_active');
    sliderDotsList[numberSlide].classList.remove('slider__dot_active');
    if (curentSlide == 0 && direction < 0) {
        curentSlide = slidersList.length;
    } else if (curentSlide == slidersList.length - 1 && direction > 0) {
        curentSlide = -1;
    }
    numberSlide = curentSlide + direction;
    slidersList[numberSlide].classList.add('slider__item_active');
    sliderDotsList[numberSlide].classList.add('slider__dot_active')
};

prev.onclick = () => {
    changeSlide(numberSlide, -1);
};

next.onclick = () => {
   changeSlide(numberSlide, 1);
};

sliderDotsList.forEach((sliderDot) => sliderDot.onclick = () => {
    changeSlide(sliderDotsList.indexOf(sliderDot), 0);
});