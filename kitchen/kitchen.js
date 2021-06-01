          // БУРГЕР-МЕНЮ
document.querySelector('.burger').addEventListener('click', function(){
    document.querySelector('.burger span').classList.toggle('active');
    document.querySelector('.burger-container').classList.toggle('burger-container__display');
})

          // SWIPER 
let slider = document.querySelector('.slider'),
sliderList = slider.querySelector('.slider-list'),
sliderTrack = slider.querySelector('.slider-track'),
slides = slider.querySelectorAll('.slide'),
arrows = slider.querySelector('.slider-arrows'),
prev = arrows.children[0],
next = arrows.children[1],
slideWidth = slides[0].offsetWidth,
slideIndex = 0,
posInit = 0,
posX1 = 0,
posX2 = 0,
posY1 = 0,
posY2 = 0,
posFinal = 0,
isSwipe = false,
isScroll = false,
allowSwipe = true,
transition = true,
nextTrf = 0,
prevTrf = 0,
lastTrf = --slides.length * slideWidth,
posThreshold = slides[0].offsetWidth * 0.35,
trfRegExp = /([-0-9.]+(?=px))/,
swipeStartTime,
swipeEndTime,
getEvent = function() {
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
},
slide = function() {
  if (transition) {
    sliderTrack.style.transition = 'transform .5s';
}
  sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

  prev.classList.toggle('disabled', slideIndex === 0);
  next.classList.toggle('disabled', slideIndex === --slides.length);
},
swipeStart = function() {
  let evt = getEvent();
    if (allowSwipe) {
      swipeStartTime = Date.now();
      transition = true;
      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;
      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;
      sliderTrack.style.transition = '';
      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);
      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
},
swipeAction = function() {
  let evt = getEvent(),
  style = sliderTrack.style.transform,
  transform = +style.match(trfRegExp)[0];
  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;
  posY2 = posY1 - evt.clientY;
  posY1 = evt.clientY;
  if (!isSwipe && !isScroll) {
    let posY = Math.abs(posY2);
  if (posY > 7 || posX2 === 0) {
    isScroll = true;
    allowSwipe = false;
  } else if (posY < 7) {
    isSwipe = true;
  }
}
if (isSwipe) {
  if (slideIndex === 0) {
    if (posInit < posX1) {
      setTransform(transform, 0);
      return;
  } else {
      allowSwipe = true;
  }
}
      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

  isScroll = false;
  isSwipe = false;

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  sliderList.classList.add('grab');
  sliderList.classList.remove('grabbing');

  if (allowSwipe) {
    swipeEndTime = Date.now();
    if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
      if (posInit < posX1) {
          slideIndex--;
  } else if (posInit > posX1) {
          slideIndex++;
        }
}

  if (posInit !== posX1) {
      allowSwipe = false;
      slide();
  } else {
      allowSwipe = true;
  }
    } else {
      allowSwipe = true;
  }
},
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = event.target;

  if (target.classList.contains('next')) {
    slideIndex++;
  } else if (target.classList.contains('prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});

                    // СЛАЙДЕР ДЛЯ КАТАЛОГА 
let slideIndexCatalog = 1;
showSlides(slideIndexCatalog);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndexCatalog += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndexCatalog = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndexCatalog = 1}
  if (n < 1) {slideIndexCatalog = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexCatalog-1].style.display = "block";
  dots[slideIndexCatalog-1].className += " active";
}
          // МАТЕРИАЛЫ
const buttons = document.querySelectorAll('.general-button-materials');
for (let button of buttons) {
  button.addEventListener('click', function () {
    buttons.forEach(i => i.classList.remove('active'));
    this.classList.toggle('active');
   })
}

const MaterialsButton1 = document.querySelector('.materials-flex-container-button-1');
const MaterialsButton2 = document.querySelector('.materials-flex-container-button-2');
const MaterialsButton3 = document.querySelector('.materials-flex-container-button-3');
const MaterialsButton4 = document.querySelector('.materials-flex-container-button-4');

const MaterialText1 = document.getElementById ('materials-information-text-1');

function ClickButton1 () {
  MaterialsButton1.classList.remove('materials-flex-container-button-1__color');
  MaterialText1.textContent = 'МДФ представляет собой средней плотности древесно-волокнистую плиту. Есть две наиболее распространенные формы материала — панели и листы. Качество и срок службы от формы не зависит.';
}
function ClickButton2 () {
  MaterialsButton1.classList.remove('materials-flex-container-button-1__color');
  MaterialText1.textContent = 'ДСП';
}
function ClickButton3 () {
  MaterialsButton1.classList.remove('materials-flex-container-button-1__color');
  MaterialText1.textContent = 'ПЛАСТИК';
}
function ClickButton4 () {
  MaterialsButton1.classList.remove('materials-flex-container-button-1__color');
  MaterialText1.textContent = 'ЛДСП';
}
MaterialsButton1.addEventListener('click', ClickButton1);
MaterialsButton2.addEventListener('click', ClickButton2);
MaterialsButton3.addEventListener('click', ClickButton3);
MaterialsButton4.addEventListener('click', ClickButton4);

const BigImgTree = document.querySelector('.materials-information-big-img ');
const WhiteTree = document.getElementById('white-tree');
const BlackTree = document.getElementById('black-tree');
const WhiteTreeStrigs = document.getElementById('white-tree-string');

function AppendWhiteTree () {
  BigImgTree.src="./img-kitchen/tree_white_small.png";
}
function AppendBlackTree () {
  BigImgTree.src="./img-kitchen/tree_black.png";
}
function AppendWhiteTreeStrings () {
  BigImgTree.src="./img-kitchen/tree_white_string.png";
}
WhiteTree.addEventListener('click', AppendWhiteTree);
BlackTree.addEventListener('click', AppendBlackTree);
WhiteTreeStrigs.addEventListener('click', AppendWhiteTreeStrings);

          // ФОРМА ДЛЯ ТЕЛЕФОНА
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    let keyCode;
    let FormText = document.getElementById('wrong-number-text')
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+375 (__)___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        if(new_value[6] == 5 || new_value[6] == 6 || new_value[6] == 7 || new_value[6] == 8 || new_value[6] == 9 || 
        new_value[6] == 0) {
            FormText.textContent = 'Пожалуйста, ведите номер в верном формате';
        } else if(new_value[7] == 1 || new_value[7] == 2 || new_value[7] == 6 || new_value[7] == 8 || new_value[7] == 0 || 
        new_value[7] == 5 || new_value[7] == 7 || new_value[7] == 4) {
            FormText.textContent = 'Пожалуйста, ведите номер в верном формате';
        } 
        if(new_value[6] == 1 && new_value[7] == 7 || new_value[6] == 2 && new_value[7] == 5 || new_value[6] == 2 && 
        new_value[7] == 9 || new_value[6] == 3 && new_value[7] == 3 || new_value[6] == 4 && new_value[7] == 4) {
            FormText.textContent = '';
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = "";
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});

          // ПРИКРЕПИТЬ ФАЙЛ 
let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
  let label = input.nextElementSibling,
    labelVal = label.querySelector('.input__file-button-text').innerText;

  input.addEventListener('change', function (e) {
    let countFiles = '';
    if (this.files && this.files.length >= 1)
      countFiles = this.files.length;

    if (countFiles)
      label.querySelector('.input__file-button-text').innerText = 'прикреплено файлов: ' + countFiles;
    else
      label.querySelector('.input__file-button-text').innerText = labelVal;
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
slideWidth1 = slides1 [0].offsetWidth,
slideIndex1 = 0,
posInit1 = 0,
posX1_1 = 0,
posX2_1 = 0,
posY1_1 = 0,
posY2_1 = 0,
posFinal1= 0,
isSwipe1 = false,
isScroll1 = false,
allowSwipe1 = true,
transition1 = true,
nextTrf1 = 0,
prevTrf1 = 0,
lastTrf1 = --slides1 .length * slideWidth1,
posThreshold1 = slides1 [0].offsetWidth * 0.35,
trfRegExp1 = /([-0-9.]+(?=px))/,
swipeStartTime1,
swipeEndTime1,
getEvent1 = function() {
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
},
slide1 = function() {
  if (transition1) {
    sliderTrack1.style.transition = 'transform .5s';
}
  sliderTrack1.style.transform = `translate3d(-${slideIndex1 * slideWidth1}px, 0px, 0px)`;

  prev1.classList.toggle('disabled', slideIndex1 === 0);
  next1.classList.toggle('disabled', slideIndex1 === --slides1.length);
},
swipeStart1 = function() {
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
swipeAction1 = function() {
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
  swipeEnd1 = function() {
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
  setTransform1 = function(transform1, comapreTransform1) {
    if (transform1 >= comapreTransform1) {
      if (transform1 > comapreTransform1) {
        sliderTrack1.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe1 = false;
  },
  reachEdge1 = function() {
    transition1 = false;
    swipeEnd1();
    allowSwipe1 = true;
  };

sliderTrack1.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList1.classList.add('slider-list-1-grab');

sliderTrack1.addEventListener('transitionend', () => allowSwipe1 = true);
slider1.addEventListener('touchstart', swipeStart1);
slider1.addEventListener('mousedown', swipeStart1);

arrows1.addEventListener('click', function() {
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