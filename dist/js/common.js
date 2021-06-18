window.onscroll = function () {
    scrollFunction();
};


function scrollFunction() {
    if (document.body.querySelector(".header")) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.body.querySelector(".header").classList.add('scroll');
        } else {
            document.body.querySelector(".header").classList.remove('scroll');
        }
    } else {

    }

}

// document.onload = () => {
//     scrollFunction();
// };
scrollFunction();



let allLazyLoad = [...document.querySelectorAll('.lazyload')];

function allLozadImg() {
    allLazyLoad.forEach((el) => {
        const observer = lozad(el); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
        observer.observe();
        el.addEventListener('load', () => {
            el.classList.add('is-loaded')
        })
        // if (el.loaded()) {
        //     el.classList.add('is-loaded');
        // }
    })
}

allLozadImg();


//switching language

let langHome = [...document.querySelectorAll('.home-select-lang > a')];
let langHomeBg = [...document.querySelectorAll('.home-hero__bg > .img')];
let langHomeDots = [...document.querySelectorAll('.home-hero-slider .slider-dot')];
let homeheroPause = document.querySelector('.home-hero-slider .slider-play');
let rtlOrNot = 0;
function checkIfRtl() {
    let elm = document.getElementsByTagName('html');
    if(elm[0].dir==='rtl'||elm[0].style.direction==='rtl') {
        rtlOrNot = -1;
    } else {

        rtlOrNot = 1;
    }

}
let currentActiveHome = 0;
let nextActiveDotHome = 1;
function dotsChanging(dots, bg, btns) {

    let dotsLength = dots.length;
    checkIfRtl();
    dots.forEach((dot, i) => {
        if (dot.classList.contains('active')) {
            currentActiveHome = i;
            nextActiveDotHome = currentActiveHome + (rtlOrNot);
            console.log('next active = ' + nextActiveDotHome)
        } else {

        }
    });
    if (rtlOrNot > 0) {
        if (nextActiveDotHome > (dotsLength - 1)) {
            nextActiveDotHome = 0;
        } else {

        }


    } else {

        console.log('tut');
        if (nextActiveDotHome < 0) {
            nextActiveDotHome = (dotsLength - 1);
            console.log('next active = ' + nextActiveDotHome)
        } else {

        }
    }


    dots.forEach((dot2) => {
        if (dot2.classList.contains('active')) {
            dot2.classList.remove('active');
        }
    })
    bg.forEach((dot2) => {
        if (dot2.classList.contains('active')) {
            dot2.classList.remove('active');
        }
    })
    btns.forEach((dot2) => {
        if (dot2.classList.contains('active')) {
            dot2.classList.remove('active');
        }
    })
    dots[nextActiveDotHome].classList.add('active');
    bg[nextActiveDotHome].classList.add('active');
    btns[nextActiveDotHome].classList.add('active');


}

function dotsHomeHeroTimeout() {
    dotsChanging(langHomeDots, langHomeBg, langHome);
}
function stopHomeHeroTimer() {
    clearInterval(homeHeroTimer);
}


function changeBgHomeHeroLang() {
    if (!langHome.length) {

    } else {
        homeheroPause.addEventListener('click', () => {
            if (homeheroPause.classList.contains('active')) {
                homeHeroTimer = setInterval(dotsHomeHeroTimeout, 2400);
            } else {
                stopHomeHeroTimer();
            }
            homeheroPause.classList.toggle('active');
        })
        langHome.forEach((btn, k) => {
            btn.addEventListener('mouseover', () => {
                if (btn.classList.contains('active')) {

                } else {
                    document.querySelector('.home-select-lang > a.active').classList.remove('active');
                    document.querySelector('.home-hero__bg > .img.active').classList.remove('active');
                    document.querySelector('.home-hero-slider .slider-dot.active').classList.remove('active');
                    btn.classList.add('active');
                    langHomeBg[k].classList.add('active');
                    langHomeDots[k].classList.add('active');
                }
            })

        });
        langHomeDots.forEach((dot, j) => {
            dot.id = j;
            dot.addEventListener('click', () => {
                homeheroPause.classList.remove('active');
                stopHomeHeroTimer();
                homeHeroTimer = setInterval(dotsHomeHeroTimeout, 2400);
                if (dot.classList.contains('active')) {

                } else {
                    document.querySelector('.home-select-lang > a.active').classList.remove('active');
                    document.querySelector('.home-hero__bg > .img.active').classList.remove('active');
                    document.querySelector('.home-hero-slider .slider-dot.active').classList.remove('active');
                    dot.classList.add('active');
                    langHomeBg[j].classList.add('active');
                    langHome[j].classList.add('active');
                }
            })
        })
        if (window.innerWidth > 768) {
            stopHomeHeroTimer();
        } else {
            homeHeroTimer = setInterval(dotsHomeHeroTimeout, 2400);
        }
    }
}

changeBgHomeHeroLang();

//open search field

let searchBtnLink = [...document.querySelectorAll('.header__search-btn')];

function ifHaveSearchBtn() {
    if (!searchBtnLink.length) {

    } else {
        searchBtnLink.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                if (btn.classList.contains('open')) {
                    if (btn.closest('.header__search').querySelector('input').value === '') {
                        e.preventDefault();
                        btn.classList.remove('open');

                    } else {

                    }
                } else {
                    e.preventDefault();
                    btn.classList.add('open');

                }
            })
        })

    }
}
ifHaveSearchBtn();

//lang menu

let langBtn = document.querySelector('.header__lang > span');

function openLangMenu() {
    if (!langBtn) {

    } else {
        langBtn.addEventListener('click', () => {
            langBtn.closest('.header__lang').classList.add('open');
        })
    }
}
openLangMenu();


document.body.addEventListener('click', (e) => {
    let trg = e.target;
    if (!trg.closest('.header__lang')) {
        if (document.querySelector('.header__lang')) {
            document.querySelector('.header__lang').classList.remove('open');

        }
    }
    if (!trg.closest('.header__search')) {
        if ([...document.querySelectorAll('.header__search-btn')].length) {
            [...document.querySelectorAll('.header__search-btn')].forEach((btn) => {
                btn.classList.remove('open')
            });
        }

    }
});


let subMenuOpeners = [...document.querySelectorAll('.menu-list .menu-item-has-children > a')];
let subMobMenu = [...document.querySelectorAll('.menu-list__go-back-mob')];
function openSubMenuHeader() {
    if (!subMenuOpeners.length) {

    } else {
        subMenuOpeners.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.closest('.menu-list').classList.add('mobile-only');
                btn.classList.toggle('open');
            })
        })
        subMobMenu.forEach((btn2) => {
            btn2.addEventListener('click', () => {
                btn2.closest('.menu-list').classList.remove('mobile-only');
                [...btn2.closest('.menu-list').querySelectorAll('.menu-item-has-children > a')].forEach((crk) => {
                    crk.classList.remove('open')
                });
            })
        })
    }
}
openSubMenuHeader();
//open menu

let burgerBtn = document.querySelector('.burger-btn');
let closeMenu = document.querySelector('.close-menu');
let headerMenu = document.querySelector('.header-menu');

function openBigMenu() {
    if(!burgerBtn) {

    } else {
        burgerBtn.addEventListener('click', () => {
            headerMenu.classList.add('open');
            document.body.classList.add('no-scroll');
        });
        closeMenu.addEventListener('click', () => {
            headerMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
            headerMenu.querySelector('.menu-list').classList.remove('mobile-only');
            subMenuOpeners.forEach((btn2) => {
                btn2.classList.remove('open');
            })
        })
    }
}
openBigMenu();


let jsSlider = [...document.querySelectorAll('.js-slider')];
let jsSliderLength = [...document.querySelectorAll('.js-slider .single-slide')].length;
let jsSliderText = document.querySelector('.js-slider-text');
let dots = [];
let slides = [];
//start interval
let bigSliderTimer = setInterval(dotsSliderTimeout, 2400);
//function on interval
function dotsSliderTimeout() {
    dotsChangeSlide(dots, slides, activeSlideBig, jsSliderLength);
}
//cleartimeout
stopSliderTimer();
function stopSliderTimer() {
    clearInterval(bigSliderTimer);
}
//function starts in interval
let activeSlideBig = 0;
let nextActiveSlideBig = 1;
function dotsChangeSlide(dots, slides, j, length) {

    dots.forEach((dot, k) => {

    })

    dots[j].classList.remove('active');
    slides[j].classList.remove('active');
    let next = j + 1;
    if (next > (length - 1)) {
        next = 0;
    } else {
        next = j + 1;
    }

    dots[next].classList.add('active');
    slides[next].classList.add('active');
    if (jsSliderText) {
        let textSlider = jsSliderText.querySelector('.text-slides');
        textSlider.className = '';
        textSlider.classList.add(`text-slides`);
        textSlider.classList.add(`text-slides--${next}`);
    } else {

    }
    activeSlideBig = next;
}


function createSlider() {
    if (!jsSlider.length) {

    } else {
        bigSliderTimer = setInterval(dotsSliderTimeout, 3500);

        jsSlider.forEach((sld, k) => {
            let slides1 = [...sld.querySelectorAll('.single-slide')];
            let slidesLength = slides1.length;
            let dots1 = [...sld.querySelectorAll('.slider-dot')];
            dots = dots1;
            slides = slides1;
            let playBtn = sld.querySelector('.slider-play');

            playBtn.addEventListener('click', () => {
                if (playBtn.classList.contains('active')) {
                    bigSliderTimer = setInterval(dotsSliderTimeout, 3500);

                } else {
                    stopSliderTimer();
                }
                playBtn.classList.toggle('active');

            })
            dots1.forEach((dot,j) => {
                dot.addEventListener('click', () => {
                    stopSliderTimer();
                    if (dot.classList.contains('active')) {

                    } else {
                        let activeDot = dot.closest('.js-slider').querySelector('.slider-dot.active');
                        let activeSlide = dot.closest('.js-slider').querySelector('.single-slide.active');

                        activeDot.classList.remove('active');
                        activeSlide.classList.remove('active');
                        dot.classList.add('active');
                        slides[j].classList.add('active');
                        playBtn.classList.remove('active');
                        if (jsSliderText) {
                            let textSlider = jsSliderText.querySelector('.text-slides');
                            textSlider.className = '';
                            textSlider.classList.add(`text-slides`);
                            textSlider.classList.add(`text-slides--${j}`);
                        } else {

                        }
                        activeSlideBig = j;
                        nextActiveSlideBig = j + 1;
                    }
                    bigSliderTimer = setInterval(dotsSliderTimeout, 3500);
                })
            })
        })
    }
}
createSlider();

let textSlides = document.querySelector('.single-text-slide');

console.log(textSlides.offsetWidth);


// bigSliderTimer = setInterval(dotsSliderBig, 2400);


let newsTrackSlider = document.querySelector('.news-track');

let newsTrackArrows = [...document.querySelectorAll('.news .swiper-arrow')];

function createNewsSlider() {
    if (!newsTrackSlider) {

    } else {
        let currentSlide = 0;
        let nextSlide = 1;
        let slidesLength = [...newsTrackSlider.querySelectorAll('.single-news')].length;
        newsTrackArrows.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('js-next')) {
                     if ((currentSlide + 1) > (slidesLength - 1)) {
                         nextSlide = 0;
                     } else {
                         nextSlide = currentSlide + 1;
                     }
                } else {
                    if ((currentSlide - 1) < 0) {
                        nextSlide = slidesLength - 1;
                    } else {
                        nextSlide = currentSlide - 1;
                    }
                }
                newsTrackSlider.className = '';
                newsTrackSlider.classList.add(`news-track`);
                newsTrackSlider.classList.add(`news-track--${nextSlide}`);
                currentSlide = nextSlide;
            })
        })
    }
}

createNewsSlider();


let footerSpanMenu = [...document.querySelectorAll('.footer-menu > span')];

function openFooterMenuMob() {
    if (!footerSpanMenu.length) {

    } else {
        footerSpanMenu.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('open');
            })
        })
    }
}
openFooterMenuMob();

//create knowledge slider

let knowTrackSlider = document.querySelector('.knowledge-list');

let knowTrackArrows = [...document.querySelectorAll('.knowledge .swiper-arrow')];

function createKnowSlider() {
    if (!knowTrackSlider) {

    } else {
        let currentSlide = 0;
        let nextSlide = 1;
        let slidesLength = [...knowTrackSlider.querySelectorAll('.single-knowledge')].length;
        knowTrackArrows.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('js-next')) {
                    if ((currentSlide + 1) > (slidesLength - 1)) {
                        nextSlide = 0;
                    } else {
                        nextSlide = currentSlide + 1;
                    }
                } else {
                    if ((currentSlide - 1) < 0) {
                        nextSlide = slidesLength - 1;
                    } else {
                        nextSlide = currentSlide - 1;
                    }
                }
                knowTrackSlider.className = '';
                knowTrackSlider.classList.add(`knowledge-list`);
                knowTrackSlider.classList.add(`knowledge-list--${nextSlide}`);
                currentSlide = nextSlide;
            })
        })
    }
}

createKnowSlider();

