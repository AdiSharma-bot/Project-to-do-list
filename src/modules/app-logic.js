const makeFirstLetterCapital = {
  capitalWord(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
  },
};
const usefulMethods = {
  addSomething(addIn, addThis) {
    addIn.push(addThis);
  },
  removeById(array, id) {
    const indexToRemove = array.findIndex((idToRemove) => idToRemove.id === id);

    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
  },
  getById(array, id) {
    const idToFind = array.find((idToFind) => idToFind.id === id);
    return idToFind;
  },
};

// Create Todo

class Todo {
  constructor({ title, dueDate, priority, description, complete, id }) {
    (this.title = title),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.description = description),
      (this.isComplete = complete ?? false),
      (this.id =
        id ??
        "todo-" +
          Math.random().toString(36).slice(2, 11) +
          Date.now().toString(36)),
      Object.assign(this, makeFirstLetterCapital);
  }

  editDetails(newTitle, newDescription, newDate) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDate;
  }

  setPriority(newPriority) {
    let capitalCaseWord = this.capitalWord(newPriority);

    this.priority = capitalCaseWord;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}

class Project {
  constructor(name, id) {
    this.name = name;
    this.todos = [];
    this.id =
      id ??
      "Project-" +
        Math.random().toString(36).slice(2, 11) +
        Date.now().toString(36);
    Object.assign(this, usefulMethods);
  }

  addTodo(todo) {
    this.addSomething(this.todos, todo);
  }

  removeTodoByID(todoId) {
    this.removeById(this.todos, todoId);
  }

  getTodoByID(todoId) {
    console.log(this.getById(this.todos, todoId));
    return this.getById(this.todos, todoId);
  }
}

const App = {
  projects: [],
  currentProjectId: null,
  pendingProjectId: null,
  currentTodoId: null,
  methods: Object.assign({}, usefulMethods),

  addProject(projectName) {
    const project = new Project(projectName);
    return this.methods.addSomething(this.projects, project);
  },

  removeProject(projectId) {
    this.methods.removeById(this.projects, projectId);
  },

  getProjectById(id) {
    return this.methods.getById(this.projects, id);
  },

  setCurrentProjectId(id) {
    this.currentProjectId = id;
  },
  getCurrentProjectData() {
    return this.methods.getById(this.projects, this.currentProjectId);
  },
  getPendingProjectData() {
    return this.methods.getById(this.projects, this.pendingProjectId);
  },
  addTodoToProject(projectId, data) {
    const project = this.getProjectById(projectId);
    if (!project) {
      console.error("No project found");
      return;
    }
    project.addTodo(new Todo(data));
  },
  addTodoToCurrentProject(data) {
    if (!this.currentProjectId) return;
    this.addTodoToProject(this.currentProjectId, data);
  },
  saveProjectToLocalStorage() {
    localStorage.setItem("Projects", JSON.stringify(this.projects));
  },
  loadProjectFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("Projects"));
    if (!data) return;

    this.projects = data.map((projData) => {
      const newProject = new Project(projData.name, projData.id);

      projData.todos.forEach(todoObj => {
        const properTodo = new Todo({
          title: todoObj.title,
          description: todoObj.description,
          priority: todoObj.priority,
          dueDate: todoObj.dueDate,
          complete: todoObj.isComplete,
          id: todoObj.id
        });
        newProject.addTodo(properTodo)
      });
      return newProject;
    });
    
  }
};

export default App;
