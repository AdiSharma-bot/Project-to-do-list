import "./css/style.css";
import cassetteUpperPart from "./assets/katana-casette-(upper).png";
import cassetteFront from "./assets/katana-strip-front(1).png";
import cassetteSide from "./assets/Katana-Casette-part.png";
import plusIcon from "./assets/+.png"
import forwardIcon from "./assets/Polygon 2.png"
import backIcon from "./assets/Polygon-1.png"

import App from "./modules/app-logic.js"
console.log("Hey! Its working perfectly fine");

const imgElements = document.querySelectorAll(".cassette-image");
imgElements.forEach((element, index) => {
  const imageType = index % 3;
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
const formattedSpan = document.querySelector(".formatted-date")
const addBtnIcon = document.querySelector(".plus-icon");
const forwardImage = document.querySelector(".forward-icon");
const backImage = document.querySelector(".back-icon");
forwardImage.src = forwardIcon;
addBtnIcon.src = plusIcon;
backImage.src = backIcon;
App.addProject("factory");
dateInput.addEventListener("input", (e) => {
  e.preventDefault();
  const [year, month, day] = dateInput.value.split("-");
  if (year && month && day) {
    formattedSpan.textContent = `${day} ${month} ${year}`;
  } else {
    formattedSpan.textContent = `dd mm yyyy` ;
  }
});

const factoryProject = App.projects[0];


App.setCurrentProjectId(factoryProject.id);

App.addTodoToCurrentProject({
  title: "Shut the main generator",
  description: "Just do it.",
  dueDate: "12-09-2023",
  priority: "high",
});


console.log("App with projects:", App.projects);
console.log("The 'Factory' project object now contains a todo:", factoryProject);
console.log("Current Project", App.getCurrentProject())
console.log(factoryProject.todos);