import './style.css'

const slider = document.querySelector('#slider')!;
const thumbs = document.querySelector('#thumbs')!;

const sliderParams = {
    thumbs: {
        swiper: thumbs,
        slideThumbActiveClass: 'active'
    },
    navigation: {
        prevEl: '.slider-left',
        nextEl: '.slider-right',
    },
    loop: true,
};

const thumbsParams = {
    slidesPerView: 'auto',
    direction: 'horizontal',
    breakpoints: {
        1024: {
            direction: 'vertical',
        }
    }
}

Object.assign(thumbs, thumbsParams);
Object.assign(slider, sliderParams);

// @ts-ignore
thumbs.initialize();
// @ts-ignore
slider.initialize();

const videoSlides = Array.from(document.querySelectorAll('.slide-video'));

videoSlides.forEach(slide => {
    const video = slide.querySelector<HTMLVideoElement>('video')!;
    const btn = slide.querySelector('.play')!;

    const addClass = () => {
      slide.classList.add('active');
    };

    const removeClass = () => {
        slide.classList.remove('active');
    }

    video.addEventListener('click', () => {
       if (!video.paused) {
           video.pause();
       } else {
           video.play();
       }
    });

    video.addEventListener('pause', removeClass);
    video.addEventListener('play', addClass);
    video.addEventListener('ended', removeClass);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        video.play();
    });
});

slider.addEventListener('slidechange', () => videoSlides.forEach(slide => slide.querySelector('video')!.pause()));

const header = document.querySelector<HTMLDivElement>('#header')!;

const onScroll = () => {
    if (window.scrollY > 100) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }

    if (window.innerWidth > 1024) {
        handleSteps();
    }
}

const stepContainer = document.querySelector<HTMLDivElement>('#step-container')!;
const stepThumb = document.querySelector<HTMLDivElement>('#step-thumb')!;
const stepCount = document.querySelector<HTMLDivElement>('#step-count')!;
const steps = Array.from(document.querySelectorAll('.step'));

const handleSteps = () => {
    const containerTop = stepContainer.getBoundingClientRect().top;

    if (containerTop <= window.innerHeight) {
        steps.forEach(step => {
            // @ts-ignore
            step.offsetTop < stepThumb.offsetTop + stepThumb.offsetHeight ? step.classList.add('active') : step.classList.remove('active');
            const count = steps.filter(step => step.classList.contains('active')).length;
            stepCount.innerText = `0${count ? count : 1}`
        });
    }
};

document.addEventListener('scroll', () => window.requestAnimationFrame(onScroll), {passive: true});

document.addEventListener('ready', () => window.requestAnimationFrame(handleSteps), {passive: true});
