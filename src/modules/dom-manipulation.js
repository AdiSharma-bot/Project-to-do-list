import App from "./app-logic.js";


// Html Element references

const htmlReferences = {
  ulElement: document.querySelector(".todo-list"),
  projectTitleElement: document.querySelector(".project-heading"),
  todoDetailsElement: document.querySelector(".to-do-details"),
  titleParaElement: document.querySelector(".title"),
  dueDatePara: document.querySelector(".due-date"),
  dateSpan: document.querySelector(".date"),
  priorityParaElement: document.querySelector(".priority-lvl"),
  prioritySpan: document.querySelector(".priority"),
  detailsDescriptionElement: document.querySelector(".description"),
  closeBtn: document.querySelector(".close"),
  terminateBtn: document.querySelector(".terminate"),
  cassetteBtns: document.querySelectorAll(".cassette-btn"),
  textSpan: document.querySelectorAll(".btn-text"),
  tapeNameInput: document.querySelector("#tape-label"),
  labelBtn: document.querySelector(".label-commit-btn"),
  abortBtn: document.querySelector(".abort-sequence-btn"),
  projectIdSpan: document.querySelector(".project-id"),
  tapeFieldset: document.querySelector(".tape-name-assign"),
  coreParametersFieldset: document.querySelector(".core-parameters"),
  titleInput: document.querySelector("#title"),
  formAbortBtn: document.querySelector(".abort"),
  dateInput: document.querySelector("#due-date"),
  formattedDateSpan: document.querySelector(".formatted-date"),
  descriptionElement: document.querySelector("#briefing"),
  formProceedBtn: document.querySelector(".proceed"),
  logFieldSet: document.querySelector(".log-and-briefing"),
  logProceed: document.querySelector(".log-proceed"),
  logRevert: document.querySelector(".log-revert"),
  tapeAssignFieldSet: document.querySelector(".tape-assigning"),
  tapeCommitBtn: document.querySelector(".commit"),
  tapeRevertBtn: document.querySelector(".tape-revert"),
  formTextSpan: document.querySelectorAll(".tape-text"),
  formTapeInput: document.querySelectorAll('input[type="radio"]'),
  entryArticleElement: document.querySelector(".entry-type"),
  entryProceedBtn: document.querySelector(".entry-proceed"),
  entryAbortBtn: document.querySelector(".entry-abort"),
  asideRemoteELement: document.querySelector(".tv-remote"),
  cassetteBtn1: document.querySelector(".cassette-no-1"),
  sectionElement: document.querySelector(".content"),
  contentFooter: document.querySelector(".content-foot"),
  todoBtnsContainerDiv: document.querySelector(".todo-btns"),
  projectTerminateBtn: document.querySelector(".terminate-project"),
  headingSpan: document.querySelector(".heading-text"),
};

// Reusable Check Functions

const checkFunctions = {
  initialChecks() {
    if (
      htmlReferences.coreParametersFieldset.classList.contains("show") ||
      htmlReferences.logFieldSet.classList.contains("show") ||
      htmlReferences.tapeAssignFieldSet.classList.contains("show") ||
      htmlReferences.tapeFieldset.classList.contains("show") ||
      htmlReferences.sectionElement.classList.contains("show") ||
      htmlReferences.entryArticleElement.classList.contains("show")
    ) {
      return false;
    }
    return true;
  },
  formChecks(requiredFields, data) {
    const rules = {
      title: { field: data.title, message: "Please fill out the title" },
      dueDate: { field: data.dueDate, message: "Please fill out the date" },
      description: {
        field: data.description,
        message: "Please fill out the description",
      },
    };

    for (let key of requiredFields) {
      const rule = rules[key];
      if (!rule.field || rule.field.trim() === "") {
        alert(rule.message);
        return false;
      }
    }
    return true;
  },
};

// Default Project to be loaded when page loads 

function defaultProject() {
  document.addEventListener("DOMContentLoaded", () => {
    App.loadProjectFromLocalStorage();
    const firstNavBtn = document.querySelector(".cassette-no-1");
    const firstFormSpan = document.querySelector(".default");
    if (App.projects.length === 0) {
      App.addProject("factory");
      App.saveProjectToLocalStorage();
    }
    App.pendingProjectId = App.projects[0].id;
    firstNavBtn.setAttribute("data-project-id", App.projects[0].id);
    firstFormSpan.setAttribute("data-project-id", App.projects[0].id);
    const firstBtnPara = firstNavBtn.querySelector("p");
    if (firstBtnPara) firstBtnPara.textContent = App.projects[0].name;
    firstFormSpan.textContent = `[${App.projects[0].name}]`;
  });
}

// Tape creation

function createTape() {
  const labelAssignBtn = htmlReferences.labelBtn;

  function tapeInputCheck(tape) {
    if (tape === "") {
      alert("Please fill the required details");
      return false;
    }
    return true;
  }

  // Add the tape name

  function commitTapeName(tape) {
    App.addProject(tape);
    const newProject = App.projects[App.projects.length - 1];
    if (App.projects.length > 12) {
      App.removeProject(newProject.id);
    }
    setFormTapeText(newProject);
    setTapeText(newProject);
    App.saveProjectToLocalStorage();
    setBtnProjectId(newProject);
    htmlReferences.projectIdSpan.textContent = newProject.id;
  }
  function toggleTapeAssignPage() {
    htmlReferences.tapeFieldset.classList.add("hide");
    htmlReferences.tapeFieldset.classList.remove("show");
    htmlReferences.entryArticleElement.classList.toggle("show");
  }
  function setTapeText(project) {
    const spans = Array.from(htmlReferences.textSpan);
    const emptyPara = spans.find((span) => {
      const paraElement = span.querySelector("p");
      return paraElement && paraElement.textContent.trim() === "";
    });
    if (emptyPara) {
      emptyPara.querySelector("p").textContent = project.name;
    }
  }
  function setBtnProjectId(project) {
    const btns = Array.from(htmlReferences.cassetteBtns);
    const emptyBtn = btns.find((btn) => !btn.hasAttribute("data-project-id"));
    if (emptyBtn) {
      emptyBtn.setAttribute("data-project-id", project.id);
    }
  }

  function tapeFlowManager() {
    const tapeName = htmlReferences.tapeNameInput.value.trim();
    if (!tapeInputCheck(tapeName)) return;
    commitTapeName(tapeName);
    toggleTapeAssignPage();
  }

  function setFormTapeText(project) {
    const spans = Array.from(htmlReferences.formTextSpan);
    let currentSpan = spans.find((span) => span.textContent === "");
    if (!currentSpan) {
      alert("No project tapes left");
      return;
    }
    let currentInput = currentSpan.closest("label").querySelector("input");
    currentSpan.setAttribute("data-project-id", project.id);
    App.pendingProjectId = project.id;
    currentInput.checked = true;
    currentSpan.textContent = `[${project.name}]`;
  }
  function abortTapeCreation() {
    htmlReferences.tapeFieldset.classList.remove("show");
    htmlReferences.entryArticleElement.classList.add("show");
  }
  htmlReferences.abortBtn.addEventListener("click", abortTapeCreation);
  labelAssignBtn.addEventListener("click", tapeFlowManager);
}

function setTodoForm() {
  let currentLevel = "high";
  let descriptionText = null;

  selectedThreatLevel();
  setUpFormBtns();
  setDescription();

  function selectedThreatLevel() {
    document.querySelectorAll('input[name="threat"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        currentLevel = radio.value;
      });
    });
  }
  function abortTapeAssigning() {
    htmlReferences.logFieldSet.classList.add("show");
    htmlReferences.tapeAssignFieldSet.classList.remove("show");
  }
  function setUpFormBtns() {
    htmlReferences.formProceedBtn.addEventListener("click", () => {
      if (!checkFunctions.formChecks(["title", "dueDate"], getFormData()))
        return;
      proceedTodo();
    });
    htmlReferences.formAbortBtn.addEventListener("click", abortTodo);
    htmlReferences.logProceed.addEventListener("click", () => {
      setDescription();
      if (!checkFunctions.formChecks(["description"], getFormData())) return;
      proceedBriefing();
    });
    htmlReferences.tapeCommitBtn.addEventListener("click", () => {
      commitTodo();
    });
    htmlReferences.logRevert.addEventListener("click", revertBriefing);
    htmlReferences.tapeRevertBtn.addEventListener("click", abortTapeAssigning);
  }
  function assignTodoToProject() {
    htmlReferences.formTapeInput.forEach((input) => {
      input.addEventListener("change", (e) => {
        const inputSpan = e.target.closest("label").querySelector("span");
        if (!inputSpan) return;
        App.pendingProjectId = inputSpan.dataset.projectId;
      });
    });
  }
  function proceedBriefing() {
    htmlReferences.tapeAssignFieldSet.classList.add("show");
    htmlReferences.logFieldSet.classList.add("hide");
    htmlReferences.logFieldSet.classList.remove("show");
    assignTodoToProject();
  }
  function revertBriefing() {
    htmlReferences.coreParametersFieldset.classList.add("show");
    htmlReferences.logFieldSet.classList.remove("show");
  }
  function setDescription() {
    descriptionText = htmlReferences.descriptionElement.value;
  }

  function proceedTodo() {
    htmlReferences.coreParametersFieldset.classList.add("hide");
    htmlReferences.logFieldSet.classList.add("show");
    htmlReferences.coreParametersFieldset.classList.remove("show");
  }
  function commitTodo() {
    const data = getFormData();
    if (!App.pendingProjectId) {
      alert("Please assign this objective to a tape first.");
      return;
    }
    App.addTodoToProject(App.pendingProjectId, data);
    App.saveProjectToLocalStorage();
    showInitialFormAfterFormCommit();
  }

  function showInitialFormAfterFormCommit() {
    htmlReferences.entryArticleElement.classList.add("show");
    htmlReferences.tapeAssignFieldSet.classList.remove("show");
  }
  function abortTodo() {
    htmlReferences.coreParametersFieldset.classList.remove("show");
    htmlReferences.entryArticleElement.classList.add("show");
  }

  function getFormData() {
    return {
      title: htmlReferences.titleInput.value,
      description: descriptionText,
      dueDate: htmlReferences.formattedDateSpan.textContent,
      priority: currentLevel,
    };
  }
}

function createTodoLists() {

  function terminateLists() {
    const project = App.getCurrentProjectData();
    const allLists = htmlReferences.ulElement.querySelectorAll("li");
    if (!project || !App.currentTodoId) return;
    allLists.forEach((li) => {
      if (li.dataset.index === App.currentTodoId) {
        li.remove();
      }
    });
    project.removeTodoByID(App.currentTodoId);
    App.saveProjectToLocalStorage();
  }
  function closeListDetails(containerDiv) {
    htmlReferences.todoDetailsElement.classList.remove("show");
    htmlReferences.ulElement.classList.add("show");
    containerDiv.classList.remove("show");
    htmlReferences.contentFooter.classList.add("show");
  }
  function populateDetails(task) {
    const formattedDate = task.dueDate.split(" ").join("/");
    htmlReferences.titleParaElement.textContent = task.title;
    htmlReferences.dateSpan.textContent = formattedDate;
    htmlReferences.prioritySpan.textContent = task.priority;
    htmlReferences.detailsDescriptionElement.textContent = task.description;
  }

  function displayBtns() {
    const todoBtnsContainerDiv = document.querySelector(".todo-btns");
    const todoCloseBtn = todoBtnsContainerDiv.querySelector(".close");
    const todoTerminateBtn = todoBtnsContainerDiv.querySelector(".terminate");
    todoBtnsContainerDiv.classList.add("show");
    htmlReferences.contentFooter.classList.remove("show");
    setTodoBtnsEvent(todoCloseBtn, todoBtnsContainerDiv, todoTerminateBtn);
  }

  function setTodoBtnsEvent(closeBtn, containerDiv, terminateBtn) {
    closeBtn.addEventListener("click", () => closeListDetails(containerDiv));
    terminateBtn.addEventListener("click", () => {
      closeListDetails(containerDiv);
      terminateLists();
    });
  }

  function displayDetails(element) {
    element.addEventListener("click", (event) => {
      const clickedElement = event.target.closest("li");
      if (!clickedElement) return;
      const todoId = clickedElement.dataset.index;
      const project = App.getCurrentProjectData();
      const found = project.todos.find((t) => t.id === todoId);
      App.currentTodoId = todoId;
      populateDetails(found);
      displayBtns();
      htmlReferences.todoDetailsElement.classList.add("show");
      htmlReferences.ulElement.classList.remove("show");
    });
  }
  function renderLists(items) {
    htmlReferences.ulElement.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.title;
      li.setAttribute("data-type", "custom");
      li.setAttribute("data-index", item.id);
      htmlReferences.ulElement.appendChild(li);
      htmlReferences.ulElement.classList.add("show");
    });
  }
  return { renderLists, displayDetails };
}

// Entry form to add tape or objective 

function setInitialForm() {
  let optionSelected = null;

  const showInitialForm = () => {
    htmlReferences.entryArticleElement.classList.add("show");
  };

  const addClickEvents = () => {
    const tapeParaElement =
      htmlReferences.entryArticleElement.querySelector(".tape");
    const objectiveParaElement =
      htmlReferences.entryArticleElement.querySelector(".objective");

    tapeParaElement.addEventListener("click", () => {
      addClickBackground(tapeParaElement, objectiveParaElement);
      optionSelected = "tape";
    });
    objectiveParaElement.addEventListener("click", () => {
      addClickBackground(objectiveParaElement, tapeParaElement);
      optionSelected = "objective";
    });
  };

  function addClickBackground(element1, element2) {
    if (element1.style.backgroundColor === "transparent") {
      element1.style.backgroundColor = "#f800b2d6";
      element2.style.backgroundColor = "transparent";
    } else {
      element1.style.backgroundColor = "transparent";
    }
  }

  const setInitialBtns = () => {
    const addBtn = htmlReferences.asideRemoteELement.querySelector(".add-btn");
    htmlReferences.entryProceedBtn.addEventListener("click", formPages);
    htmlReferences.entryAbortBtn.addEventListener(
      "click",
      hideInitialEntryForm
    );
    addBtn.addEventListener("click", () => {
      if (checkFunctions.initialChecks()) showInitialForm();
    });
  };

  function hideInitialEntryForm() {
    htmlReferences.entryArticleElement.classList.remove("show");
  }

  function formPages() {
    switch (optionSelected) {
      case "tape":
        htmlReferences.tapeFieldset.classList.add("show");
        htmlReferences.entryArticleElement.classList.remove("show");
        htmlReferences.coreParametersFieldset.classList.remove("show");
        break;
      case "objective":
        htmlReferences.coreParametersFieldset.classList.add("show");
        htmlReferences.entryArticleElement.classList.remove("show");
        htmlReferences.tapeFieldset.classList.remove("show");
        break;
    }
  }

  addClickEvents();
  setInitialBtns();
}

// Add tape effects and delete tapes
function tapeCassettesManager() {
  const lists = createTodoLists();

  const handleCassetteEffect = () => {
    let activeBtn = null;
    htmlReferences.cassetteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const activeSpan = btn.querySelector("span");
        if (activeBtn === btn) {
          btn.classList.remove("selected");
          hideProjectTodoLists();
          activeBtn = null;
          return;
        }
        if (activeBtn !== null) return;
        if (checkFunctions.initialChecks() && activeSpan.textContent !== "") {
          btn.classList.add("selected");
          activeBtn = btn;
          setProjectHeading(activeBtn);
          App.setCurrentProjectId(btn.dataset.projectId);
          renderProjectLists();
          displayProjectTodoLists();
        } else {
          return;
        }
      });
    });
  };

  function setProjectHeading(btn) {
    htmlReferences.headingSpan.textContent = btn.textContent;
  }

  function hideProjectTodoLists() {
    htmlReferences.sectionElement.classList.remove("show");
    htmlReferences.ulElement.classList.remove("show");
    htmlReferences.contentFooter.classList.remove("show");
    htmlReferences.todoDetailsElement.classList.remove("show");
    htmlReferences.todoBtnsContainerDiv.classList.remove("show");
  }
  function displayProjectTodoLists() {
    htmlReferences.sectionElement.classList.add("show");
    htmlReferences.ulElement.classList.add("show");
    htmlReferences.contentFooter.classList.add("show");
  }

  function renderProjectLists() {
    const project = App.getCurrentProjectData();
    const custom = project.todos;
    lists.renderLists(custom);
    lists.displayDetails(htmlReferences.ulElement);
  }
  function removeProject() {
    const btns = Array.from(htmlReferences.cassetteBtns);
    const spans = Array.from(htmlReferences.formTextSpan);
    const currentBtn = btns.find(
      (btn) => btn.dataset.projectId === App.currentProjectId
    );
    const currentSpan = spans.find(
      (span) => span.dataset.projectId === App.currentProjectId
    );
    const currentPara = currentBtn.querySelector("p");
    if (App.getCurrentProjectData().name === App.projects[0].name) {
      alert("Default project can't be removed");
      return;
    }
    App.removeProject(App.currentProjectId);
    App.saveProjectToLocalStorage();
    currentPara.textContent = "";
    currentSpan.textContent = "";
    currentBtn.removeAttribute("data-project-id");
    hideProjectTodoLists();
  }
  htmlReferences.projectTerminateBtn.addEventListener("click", () => {
    const confirmRemoval = confirm(
      "Are you sure you want to remove this project?"
    );
    if (confirmRemoval) {
      removeProject();
    } else {
      return;
    }
  });

  handleCassetteEffect();
}
// Main rendering function

export default function render() {
  defaultProject();
  tapeCassettesManager();
  setInitialForm();
  setTodoForm();
  createTape();
  createTodoLists();
}
