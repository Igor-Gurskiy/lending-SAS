export function initSpecial() {
  initInfo();
}

function initInfo() {
  const textSection = document.querySelectorAll(".body__text .text__item");
  
  textSection.forEach((section, index) => {
    section.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      textSection.forEach((otherSection, otherIndex) => {
        if (otherIndex !== index) {
          otherSection.classList.remove("active");
          otherSection.querySelector(".item__text").classList.remove("active");
          otherSection.querySelector(".item__circle").classList.remove("active");
        }
      });
      
      const text = section.querySelector(".item__text");
      const circle = section.querySelector(".item__circle");
      section.classList.toggle("active");
      text.classList.toggle("active");
      circle.classList.toggle("active");
    });
  });
}
