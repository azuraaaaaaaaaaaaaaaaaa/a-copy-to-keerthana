'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
 * HERO CONTENT SLIDER
 */
  const slideTitleE1 = document.getElementById('slide-title');
  const slideStatusE1 = document.getElementById('slide-status');
  const navDots = document.querySelectorAll('.nav-dot');
  
  // Function to update slide content based on index
  function updateSlideContent(slideIndex) {
    const nextSlideTitle = document.querySelectorAll(`[data-slide-title="${slideIndex}"]`)[0].innerHTML;
    const nextSlideStatus = document.querySelectorAll(`[data-slide-status="${slideIndex}"]`)[0].innerHTML;
  
    TweenLite.fromTo(slideTitleE1, 0.5,
      {
        autoAlpha: 1,
        y: 0
      },
      {
        autoAlpha: 0,
        y: 20,
        ease: 'Expo.easeIn',
        onComplete: function () {
          slideTitleE1.innerHTML = nextSlideTitle;
          TweenLite.to(slideTitleE1, 0.5, {
            autoAlpha: 1,
            y: 0
          });
        }
      }
    );
  
    // Update slide status or any other content if needed
    slideStatusE1.innerHTML = nextSlideStatus;
  }
  
  // Add click event listeners to each dot
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Update content when a dot is clicked
      updateSlideContent(index);
  
      // Set the active dot
      navDots.forEach((dot) => dot.classList.remove('active'));
      dot.classList.add('active');
    });
  });
  

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= slidirContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

   const slidePrev = function () {

    if (currentSlidePos <= 0) {
      currentSlidePos = sliderContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sliderContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }

/** products */







/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }
