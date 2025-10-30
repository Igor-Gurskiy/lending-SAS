import { setLanguage } from "../locales/index.js";

export function initHeader() {
  initLanguageSelector();
  initMenu();
}

function initLanguageSelector() {
  const currentBtn = document.querySelector(".language__current");
  const dropdown = document.querySelector(".language__dropdown");
  const options = document.querySelectorAll(".language__option");

  if (!currentBtn || !dropdown || !options) return;

  updateLanguageVisibility();

  currentBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedLang = option.getAttribute("data-lang");
      const currentLang = currentBtn.textContent.trim().toLowerCase();

      if (selectedLang && selectedLang !== currentLang) {
        currentBtn.textContent = selectedLang.toUpperCase();

        updateLanguageVisibility();

        setLanguage(selectedLang);
        dropdown.classList.remove("active");
        localStorage.setItem("preferredLanguage", selectedLang);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header__language")) {
      dropdown.classList.remove("active");
    }
  });

  function updateLanguageVisibility() {
    const currentLang = currentBtn.textContent.trim().toLowerCase();

    options.forEach((option) => {
      option.style.display = "block";
      option.closest("li").style.display = "block";
    });

    const currentOption = document.querySelector(
      `.language__option[data-lang="${currentLang}"]`
    );
    if (currentOption) {
      currentOption.style.display = "none";
      currentOption.closest("li").style.display = "none";
    }
  }
}

function initMenu() {
  const menuToggle = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector(".header__nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  nav.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("nav__link") ||
      e.target.classList.contains("social__link")
    ) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
}

