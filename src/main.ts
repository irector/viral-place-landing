import './style.css'

const slider = document.querySelector('#slider')!;
const thumbs = document.querySelector('#thumbs')!;
//
// const sliderParams = {
//     thumbs: {
//         swiper: thumbs,
//         slideThumbActiveClass: 'active'
//     }
// };
//
const thumbsParams = {
    slidesPerView: 'auto',
    direction: 'horizontal',
    breakpoints: {
        1024: {
            direction: 'vertical',
        }
    }
}
//
Object.assign(thumbs, thumbsParams);
// Object.assign(slider, sliderParams);
//
// @ts-ignore
thumbs.initialize();
// slider.initialize();

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

    btn.addEventListener('click', () => {
       video.play();
    });
});

slider.addEventListener('slidechange', () => videoSlides.forEach(slide => slide.querySelector('video')!.pause()));


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

document.addEventListener('scroll', () => window.requestAnimationFrame(handleSteps), {passive: true});

document.addEventListener('ready', () => {
    handleSteps();
});
