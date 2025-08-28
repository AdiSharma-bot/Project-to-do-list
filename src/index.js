
import './css/style.css'
import cassetteUpperPart from './assets/katana-casette-(upper).png'
import cassetteFront from './assets/katana-strip-front(1).png'
import cassetteSide from './assets/Katana-Casette-part.png'
console.log("Hey! Its working perfectly fine");

const imgElements = document.querySelectorAll(".cassette-image");
console.log(imgElements)
imgElements.forEach((element, index) => {
    const imageType = index % 3;
    if (imageType === 0) {
        element.src = cassetteUpperPart;
        
    }
    if (imageType === 1) {
        element.src = cassetteFront;
    }
    if (imageType === 2) {
        element.src = cassetteSide
    }
});