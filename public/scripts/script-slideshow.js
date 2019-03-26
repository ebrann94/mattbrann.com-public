// Plan
// 1. Listen for button clicking
// 2. Depending on button pressed pick the next image to be shown
// 3. Change the CSS to hide the current image and show the next one. Have an 'active' class
(function slideShow() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slideshow__slide');

  function changeSlide(slideToBeShown) {
    slides.forEach((slide, index) => {
      if (index === slideToBeShown) {
        slide.classList.add('active-slide');
      } else if (slide.classList.contains('active-slide')) {
        slide.classList.remove('active-slide');
      }
    });
  }
  // Initialise
  changeSlide(currentSlide);

  // Depending on the button pressed advance or regress the current slide variable
  document.querySelector('.slideshow__next').addEventListener('mousedown', () => {
    currentSlide >= slides.length - 1 ? currentSlide = 0 : currentSlide++;

    changeSlide(currentSlide);
  });

  document.querySelector('.slideshow__prev').addEventListener('mousedown', () => {
    currentSlide <= 0 ? currentSlide = slides.length - 1 : currentSlide--;

    changeSlide(currentSlide);
  });
}());
