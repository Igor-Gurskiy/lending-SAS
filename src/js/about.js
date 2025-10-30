export function initAbout() {
  initAboutSlider();
}

function initAboutSlider() {
  const gallery = document.querySelector(".swiper__gallery");
  const slides = document.querySelectorAll(".gallery__slide");
  const circles = document.querySelectorAll(".swiper__nav .nav__circle");
  const arrows = document.querySelectorAll(".swiper__arrow");

  let currentSlide = 0;
  let isAnimating = false;
  const totalSlides = slides.length;

  // const containerWidth = gallery.offsetWidth;
  function getContainerWidth() {
    return gallery.offsetWidth;
  }
  // const slideWidth = slides[0].offsetWidth;
  function getSlideWidth() {
    return slides[0].offsetWidth;
  }

  function lerp(start, end, progress) {
    return start + progress * (end - start);
  }

  function getScale(distance) {
    const minScale = 0.5;
    const scaleFactor = 1;
    return Math.max(Math.pow(1 - distance * 0.1, scaleFactor), minScale);
  }

function computeAnimateProps(targetSlide, slideIndex, progress = 1) {
    const currDistance = slideIndex - targetSlide; 
    const prevDistance = slideIndex - currentSlide;
    
    const containerWidth = getContainerWidth();
    const slideWidth = getSlideWidth();

    const fromScale = getScale(Math.abs(prevDistance));
    const toScale = getScale(Math.abs(currDistance));
    const scale = lerp(fromScale, toScale, progress);
    
    const baseOffset = 0.15;
    const spacing = 0.08; 
    
    let fromPosition;
    let toPosition;
    
    if (prevDistance === 0) {
        fromPosition = 0;
    } else if (prevDistance > 0) {
        fromPosition = baseOffset + (prevDistance - 1) * spacing;
    } else {
        fromPosition = -(baseOffset + (Math.abs(prevDistance) - 1) * spacing);
    }
    
    if (currDistance === 0) {
        toPosition = 0;
    } else if (currDistance > 0) {
        toPosition = baseOffset + (currDistance - 2) * spacing;
    } else {
        toPosition = -(baseOffset + (Math.abs(currDistance) - 2) * spacing);
    }
    const position = lerp(fromPosition, toPosition, progress);
    const translateX = containerWidth * position;
    const centerX = (containerWidth - slideWidth) / 2;
    return {
      transform: `translateX(${centerX + translateX}px) scale(${scale})`,
      zIndex: 100 - Math.abs(currDistance),
    };
}

  function moveSlide(targetSlide, animate = true) {
    if (isAnimating) return;
    if (targetSlide < 0 || targetSlide >= totalSlides) return;
    
    isAnimating = true;

    slides.forEach((slide, index) => {
      const props = computeAnimateProps(targetSlide, index);
      
      if (animate) {
        const animation = slide.animate([props], {
          duration: 500,
          easing: 'ease-in-out'
        });
        
        animation.finished.then(() => {
          Object.assign(slide.style, props);
        });
      } else {
        Object.assign(slide.style, props);
      }
    });

    currentSlide = targetSlide;
    updateNavigation();
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function updateNavigation() {
    circles.forEach((circle, i) => {
      circle.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    const next = (currentSlide + 1);
    moveSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1);
    moveSlide(prev);
  }

  function goToSlide(index) {
    if (index === currentSlide) return;
    moveSlide(index);
  }

  function handleResize() {
    moveSlide(currentSlide, false);
  }

  function init() {
    
    slides.forEach((slide) => {
      slide.style.position = 'absolute';
      slide.style.top = '0';
      slide.style.left = '0';
      slide.style.transition = 'none'; 
    });

    moveSlide(currentSlide, false);
    
    arrows.forEach((arrow, index) => {
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (index === 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      });
    });

    circles.forEach((circle, i) => {
      circle.addEventListener("click", (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        goToSlide(i);
      });
    });

    window.addEventListener('resize', handleResize);
  
  }

  init();

}
