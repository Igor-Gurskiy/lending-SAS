import "../styles/main.scss";
import { initHeader } from "./header.js";
import { initBuy } from "./buy.js";
import { initAbout } from "./about.js";
import { initSpecial } from "./special.js";

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initBuy();
    initAbout();
    initSpecial();
});