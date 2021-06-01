// БУРГЕР-МЕНЮ
document.querySelector('.burger').addEventListener('click', function () {
    document.querySelector('.burger span').classList.toggle('active');
    document.querySelector('.burger-container').classList.toggle('burger-container__display');
})

// УВЕЛИЧЕНИЕ КАРТИНОК
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const card4 = document.getElementById('card4');
const bigCard = document.getElementById('bigCard');

function increaseCard1() {
    bigCard.src = "./img-kitchen/slide-1.png";
}
function increaseCard2() {
    bigCard.src = "./img-kitchen/slide-2.png";
}
function increaseCard3() {
    bigCard.src = "./img-kitchen/slide-3.png";
}
function increaseCard4() {
    bigCard.src = "./img-kitchen/slide-1.png";
}
card1.addEventListener('click', increaseCard1);
card2.addEventListener('click', increaseCard2);
card3.addEventListener('click', increaseCard3);
card4.addEventListener('click', increaseCard4);

// ФОРМА ДЛЯ ТЕЛЕФОНА
window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
        let keyCode;
        let FormText = document.getElementById('wrong-number-text-2')
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+375 (__)___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            if (new_value[6] == 5 || new_value[6] == 6 || new_value[6] == 7 || new_value[6] == 8 || new_value[6] == 9 ||
                new_value[6] == 0) {
                FormText.textContent = 'Пожалуйста, ведите номер в верном формате';
            } else if (new_value[7] == 1 || new_value[7] == 2 || new_value[7] == 6 || new_value[7] == 8 || new_value[7] == 0 ||
                new_value[7] == 5 || new_value[7] == 7 || new_value[7] == 4) {
                FormText.textContent = 'Пожалуйста, ведите номер в верном формате';
            }
            if (new_value[6] == 1 && new_value[7] == 7 || new_value[6] == 2 && new_value[7] == 5 || new_value[6] == 2 &&
                new_value[7] == 9 || new_value[6] == 3 && new_value[7] == 3 || new_value[6] == 4 && new_value[7] == 4) {
                FormText.textContent = '';
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
});
// SWIPER ОТЗЫВЫ
let slider1 = document.querySelector('.slider-1'),
    sliderList1 = slider1.querySelector('.slider-list-1'),
    sliderTrack1 = slider1.querySelector('.slider-track-1'),
    slides1 = slider1.querySelectorAll('.slide-1'),
    arrows1 = slider1.querySelector('.slider-arrows-1'),
    prev1 = arrows1.children[0],
    next1 = arrows1.children[1],
    slideWidth1 = slides1[0].offsetWidth,
    slideIndex1 = 0,
    posInit1 = 0,
    posX1_1 = 0,
    posX2_1 = 0,
    posY1_1 = 0,
    posY2_1 = 0,
    posFinal1 = 0,
    isSwipe1 = false,
    isScroll1 = false,
    allowSwipe1 = true,
    transition1 = true,
    nextTrf1 = 0,
    prevTrf1 = 0,
    lastTrf1 = --slides1.length * slideWidth1,
    posThreshold1 = slides1[0].offsetWidth * 0.35,
    trfRegExp1 = /([-0-9.]+(?=px))/,
    swipeStartTime1,
    swipeEndTime1,
    getEvent1 = function () {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide1 = function () {
        if (transition1) {
            sliderTrack1.style.transition = 'transform .5s';
        }
        sliderTrack1.style.transform = `translate3d(-${slideIndex1 * slideWidth1}px, 0px, 0px)`;

        prev1.classList.toggle('disabled', slideIndex1 === 0);
        next1.classList.toggle('disabled', slideIndex1 === --slides1.length);
    },
    swipeStart1 = function () {
        let evt1 = getEvent1();
        if (allowSwipe1) {
            swipeStartTime1 = Date.now();
            transition1 = true;
            nextTrf1 = (slideIndex1 + 1) * -slideWidth1;
            prevTrf1 = (slideIndex1 - 1) * -slideWidth1;
            posInit1 = posX1_1 = evt1.clientX;
            posY1_1 = evt1.clientY;
            sliderTrack1.style.transition1 = '';
            document.addEventListener('touchmove', swipeAction1);
            document.addEventListener('mousemove', swipeAction1);
            document.addEventListener('touchend', swipeEnd1);
            document.addEventListener('mouseup', swipeEnd1);
            sliderList1.classList.remove('slider-list-1-grab');
            sliderList1.classList.add('slider-list-1-grabbing');
        }
    },
    swipeAction1 = function () {
        let evt1 = getEvent1(),
            style = sliderTrack1.style.transform,
            transform = +style.match(trfRegExp1)[0];
        posX2_1 = posX1_1 - evt1.clientX;
        posX1_1 = evt1.clientX;
        posY2_1 = posY1_1 - evt1.clientY;
        posY1_1 = evt1.clientY;
        if (!isSwipe1 && !isScroll1) {
            let posY1 = Math.abs(posY2_1);
            if (posY1 > 7 || posX2_1 === 0) {
                isScroll1 = true;
                allowSwipe1 = false;
            } else if (posY1 < 7) {
                isSwipe1 = true;
            }
        }
        if (isSwipe1) {
            if (slideIndex1 === 0) {
                if (posInit1 < posX1_1) {
                    setTransform1(transform, 0);
                    return;
                } else {
                    allowSwipe1 = true;
                }
            }
            // запрет ухода вправо на последнем слайде
            if (slideIndex1 === --slides1.length) {
                if (posInit1 > posX1_1) {
                    setTransform1(transform, lastTrf1);
                    return;
                } else {
                    allowSwipe1 = true;
                }
            }

            if (posInit1 > posX1_1 && transform < nextTrf1 || posInit1 < posX1_1 && transform > prevTrf1) {
                reachEdge1();
                return;
            }

            sliderTrack1.style.transform = `translate3d(${transform - posX2_1}px, 0px, 0px)`;
        }

    },
    swipeEnd1 = function () {
        posFinal1 = posInit1 - posX1_1;

        isScroll1 = false;
        isSwipe1 = false;

        document.removeEventListener('touchmove', swipeAction1);
        document.removeEventListener('mousemove', swipeAction1);
        document.removeEventListener('touchend', swipeEnd1);
        document.removeEventListener('mouseup', swipeEnd1);

        sliderList1.classList.add('slider-list-1-grab');
        sliderList1.classList.remove('slider-list-1-grabbing');

        if (allowSwipe1) {
            swipeEndTime1 = Date.now();
            if (Math.abs(posFinal1) > posThreshold1 || swipeEndTime1 - swipeStartTime1 < 300) {
                if (posInit1 < posX1_1) {
                    slideIndex1--;
                } else if (posInit1 > posX1_1) {
                    slideIndex1++;
                }
            }

            if (posInit1 !== posX1_1) {
                allowSwipe1 = false;
                slide1();
            } else {
                allowSwipe1 = true;
            }
        } else {
            allowSwipe1 = true;
        }
    },
    setTransform1 = function (transform1, comapreTransform1) {
        if (transform1 >= comapreTransform1) {
            if (transform1 > comapreTransform1) {
                sliderTrack1.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
            }
        }
        allowSwipe1 = false;
    },
    reachEdge1 = function () {
        transition1 = false;
        swipeEnd1();
        allowSwipe1 = true;
    };

sliderTrack1.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList1.classList.add('slider-list-1-grab');

sliderTrack1.addEventListener('transitionend', () => allowSwipe1 = true);
slider1.addEventListener('touchstart', swipeStart1);
slider1.addEventListener('mousedown', swipeStart1);

arrows1.addEventListener('click', function () {
    let target1 = event.target;

    if (target1.classList.contains('next-1')) {
        slideIndex1++;
    } else if (target1.classList.contains('prev-1')) {
        slideIndex1--;
    } else {
        return;
    }

    slide1();
});