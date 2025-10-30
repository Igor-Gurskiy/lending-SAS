export function initBuy() {
  initBuySlider();
}

function initBuySlider() {
  const buySection = document.querySelector(".buy");
  const background = document.querySelector(".buy__background");
  const images = document.querySelectorAll(".buy__background .bg__image");
  const circles = document.querySelectorAll(".buy .nav__circle");
  const arrows = document.querySelectorAll(".buy .nav__arrow");

  let currentSlide = 0;
  let autoPlayInterval;
  const slideInterval = 5000;
  let isAnimating = false;

  function cloneSlides() {
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    background.appendChild(firstClone);
    background.insertBefore(lastClone, images[0]);

    return document.querySelectorAll(".buy__background .bg__image");
  }

  const allImages = cloneSlides();
  const totalSlides = allImages.length;

  function updateArrows(realIndex) {
    arrows[0].classList.toggle("hidden", realIndex === 0);
    arrows[1].classList.toggle("hidden", realIndex === images.length - 1);
  }

  function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    background.style.transform = `translateX(-${index * 100}%)`;

    currentSlide = index;

    const realIndex = getRealIndex(index);

    circles.forEach((circle, i) => {
      circle.classList.toggle("active", i === realIndex);
    });

    updateArrows(realIndex);

    setTimeout(() => {
      isAnimating = false;


      if (index === 0) {

        setTimeout(() => {
          background.style.transition = "none";
          currentSlide = images.length;
          background.style.transform = `translateX(-${currentSlide * 100}%)`;
          setTimeout(() => {
            background.style.transition = "transform 1s ease-in-out";
          }, 50);
        }, 50);
      } else if (index === totalSlides - 1) {

        setTimeout(() => {
          background.style.transition = "none";
          currentSlide = 1;
          background.style.transform = `translateX(-${currentSlide * 100}%)`;
          setTimeout(() => {
            background.style.transition = "transform 1s ease-in-out";
          }, 50);
        }, 50);
      }
    }, 1000);
  }

  function getRealIndex(virtualIndex) {
    if (virtualIndex === 0) return images.length - 1;
    if (virtualIndex === totalSlides - 1) return 0;
    return virtualIndex - 1;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }

  function goToRealSlide(realIndex) {
    const virtualIndex = realIndex + 1;
    showSlide(virtualIndex);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, slideInterval);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  function init() {
    background.style.transition = "none";
    currentSlide = 1;
    background.style.transform = `translateX(-${currentSlide * 100}%)`;

    setTimeout(() => {
      background.style.transition = "transform 1s ease-in-out";
    }, 50);

    updateArrows(0);

    startAutoPlay();

    circles.forEach((circle, i) => {
      circle.addEventListener("click", (e) => {
        e.preventDefault(); 
      e.stopPropagation(); 
      console.log("Клик по кружку!", i);
        stopAutoPlay();
        goToRealSlide(i);
        startAutoPlay();
      });
    });

    arrows.forEach((arrow, index) => {
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        stopAutoPlay();
        if (index === 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        startAutoPlay();
      });
    });

    buySection.addEventListener("mouseenter", stopAutoPlay);
    buySection.addEventListener("mouseleave", startAutoPlay);
  }

  init();

}