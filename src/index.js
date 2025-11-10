import "./css/style.css";
import cassetteUpperPart from "./assets/katana-casette-(upper).png";
import cassetteFront from "./assets/katana-strip-front(1).png";
import cassetteSide from "./assets/Katana-Casette-part.png";
import plusIcon from "./assets/+.png";
import forwardIcon from "./assets/Polygon 2.png";
import backIcon from "./assets/Polygon-1.png";
import render from "./modules/dom-manipulation"

// Set images for cassettes 

const imgElements = document.querySelectorAll(".cassette-image");
imgElements.forEach((element, index) => {
  const imageType = index % 3;
  element.loading = "lazy";
  if (imageType === 0) {
    element.src = cassetteUpperPart;
  }
  if (imageType === 1) {
    element.src = cassetteFront;
  }
  if (imageType === 2) {
    element.src = cassetteSide;
  }
});

const dateInput = document.querySelector("#due-date");
const formattedSpan = document.querySelector(".formatted-date");
const addBtnIcon = document.querySelector(".plus-icon");
const forwardImage = document.querySelector(".forward-icon"); 
const backImage = document.querySelector(".back-icon"); 
forwardImage.src = forwardIcon; // forward cassette image
addBtnIcon.src = plusIcon;
backImage.src = backIcon; // back cassette image

// Format date input 

dateInput.addEventListener("input", (e) => {
  e.preventDefault();
  const [year, month, day] = dateInput.value.split("-");
  if (year && month && day) {
    formattedSpan.textContent = `${day} ${month} ${year}`;
  } else {
    formattedSpan.textContent = `dd mm yyyy`;
  }
});

// render everything 

render()
