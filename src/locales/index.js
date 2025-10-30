import en from "./en.json";
import ru from "./ru.json";
import de from "./de.json";
import fr from "./fr.json";

const translations = {
  eng: en,
  rus: ru,
  deu: de,
  fra: fr,
};

let currentLanguage = "eng";

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    updatePageText();
    updateLanguageSelector();
  }
};

export const getText = (key) => {
  const keys = key.split(".");
  let value = translations[currentLanguage];
  keys.forEach((key) => {
    value = value[key];
  });
  return value || key;
};

const updatePageText = () => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = getText(key);

      element.innerHTML = translation;
  });
};

const updateLanguageSelector = () => {
  const currentBtn  = document.querySelector(".language__current");
  const options = document.querySelectorAll(".language__option");
  const listItems = document.querySelectorAll('.language__dropdown li');

  if (currentBtn ) {
    currentBtn.textContent = getText(`languages.${currentLanguage}`);
  }

  options.forEach(option => {
    const langCode = option.getAttribute('data-lang');
    if (langCode) {
      option.textContent = getText(`languages.${langCode}`);
      option.classList.remove('current');
    }
  });

  listItems.forEach(li => {
    li.classList.remove('current');
  });

  const currentOption = document.querySelector(`[data-lang="${currentLanguage}"]`);
  if (currentOption) {
    currentOption.classList.add('current');
    const parentLi = currentOption.closest('li');
    if (parentLi) {
      parentLi.classList.add('current');
    }
  }
};

window.i18n = { setLanguage, getText, currentLanguage: () => currentLanguage };

export const getCurrentLanguage = () => currentLanguage;
