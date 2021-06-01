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

const kitchenBlock = document.querySelector('.catalog-main-container-kitchen');
const kitchenButton = document.querySelector('.catalog-button-kitchen-appear');

function KitchenButtonAppearance() {
  kitchenButton.style.opacity = '1';
}
function KitchenButtonDisappearance() {
  kitchenButton.style.opacity = '0';
}
kitchenBlock.addEventListener('mouseover', KitchenButtonAppearance);
kitchenBlock.addEventListener('mouseout', KitchenButtonDisappearance);

const BedroomChildBlock = document.querySelector('.catalog-main-container-bedroom-child');
const BedroomChildButton = document.querySelector('.catalog-button-child-bedroom-appear');

function ChildBedroomButtonAppearance() {
  BedroomChildButton.style.opacity = '1';
}
function ChildBedroomButtonDisappearance() {
  BedroomChildButton.style.opacity = '0';
}
BedroomChildBlock.addEventListener('mouseover', ChildBedroomButtonAppearance);
BedroomChildBlock.addEventListener('mouseout', ChildBedroomButtonDisappearance);

const BedroomBlock = document.getElementById('catalog-main-container-bedroom');
const BedroomButton = document.querySelector('.catalog-button-bedroom-appear');

function BedroomButtonAppearance() {
  BedroomButton.style.opacity = '1';
}
function BedroomButtonDisappearance() {
  BedroomButton.style.opacity = '0';
}
BedroomBlock.addEventListener('mouseover', BedroomButtonAppearance);
BedroomBlock.addEventListener('mouseout', BedroomButtonDisappearance);

const WardropeBlock = document.querySelector('.catalog-main-container-wardrope');
const WardropeButton = document.querySelector('.catalog-button-wrdrope-appear');

function WardropeButtonAppearance() {
  WardropeButton.style.opacity = '1';
}
function WardropeButtonDisappearance() {
  WardropeButton.style.opacity = '0';
}
WardropeBlock.addEventListener('mouseover', WardropeButtonAppearance);
WardropeBlock.addEventListener('mouseout', WardropeButtonDisappearance);

const OfficeChairBlock = document.querySelector('.catalog-main-container-chair');
const OfficeChairButton = document.querySelector('.catalog-button-office-chair-appear');

function OfficeChairButtonAppearance() {
  OfficeChairButton.style.opacity = '1';
}
function OfficeChairButtonDisappearance() {
  OfficeChairButton.style.opacity = '0';
}
OfficeChairBlock.addEventListener('mouseover', OfficeChairButtonAppearance);
OfficeChairBlock.addEventListener('mouseout', OfficeChairButtonDisappearance);

const BigWardropeBlock = document.querySelector('.catalog-big-wardrope-container');
const BigWardropeButton = document.querySelector('.catalog-button-big-wardrope-appear');

function BigWardropeButtonAppearance() {
  BigWardropeButton.style.opacity = '1';
}
function BigWardropeButtonDisappearance() {
  BigWardropeButton.style.opacity = '0';
}
BigWardropeBlock.addEventListener('mouseover', BigWardropeButtonAppearance);
BigWardropeBlock.addEventListener('mouseout', BigWardropeButtonDisappearance);

const CuttingBlock = document.querySelector('.catalog-cutting-container');
const CuttingButton = document.querySelector('.catalog-button-cutting-appear');

function CuttingButtonAppearance() {
  CuttingButton.style.opacity = '1';
}
function CuttingButtonDisappearance() {
  CuttingButton.style.opacity = '0';
}
CuttingBlock.addEventListener('mouseover', CuttingButtonAppearance);
CuttingBlock.addEventListener('mouseout', CuttingButtonDisappearance);

const LivingRoomBlock = document.getElementById('catalog-main-container-living-room');
const LivingRoomButton = document.querySelector('.catalog-button-living-room-appear');

function LivingRoomButtonAppearance() {
  LivingRoomButton.style.opacity = '1';
}
function LivingRoomButtonDisappearance() {
  LivingRoomButton.style.opacity = '0';
}
LivingRoomBlock.addEventListener('mouseover', LivingRoomButtonAppearance);
LivingRoomBlock.addEventListener('mouseout', LivingRoomButtonDisappearance);

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

          // ПЛАВНОСТЬ НАВИГАЦИИ

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1); 
        document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
    })
  })
}