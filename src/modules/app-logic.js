
const makeFirstLetterCapital = {
  capitalWord(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
  },
};
const usefulMethods = {
  addSomething(addIn, addThis) {
    addIn.push(addThis)
  },
  removeById(array, id) {
    const indexToRemove = array.findIndex(idToRemove => idToRemove.id === id);

    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
  },
  getById(array, id) {
    const idToFind= array.find(idToFind => idToFind.id === id);
    return idToFind
  }
}

class Todo {
  constructor({title, dueDate, priority, description, complete, id}) {
    (this.title = title),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.description = description),
      (this.isComplete = complete ?? false),
      (this.id = id ?? "todo-" + Math.floor(Date.now() + Math.random()).toString().slice(-6)),
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

  showData() {
    console.log(`Title: ${this.title}
Termination-Date: ${this.dueDate}
Threat-Level: ${this.priority}
Description: ${this.description}
Status: ${this.isComplete}`);

    return `Here Dude! Have Fun`;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}

class Project {
  constructor(name, id) {
    this.name = name;
    this.todos = [];
    this.id = id ?? "Project-" + Math.floor(Date.now() + Math.random()).toString().slice(-6);
    Object.assign(this, usefulMethods);
  }

  addTodo(todo) {
    this.addSomething(this.todos, todo)
  }

  removeTodoByID(todoId) {
    this.removeById(this.todos, todoId)
  }

  getTodoByID(todoId) {
    console.log(this.getById(this.todos, todoId));
    return this.getById(this.todos, todoId);
  }
}

 const App = {
   projects: [],
   currentProjectId: null,
   methods: Object.assign({}, usefulMethods),

   addProject(projectName) {
    const project = new Project(projectName)
     return this.methods.addSomething(this.projects, project);
   },

   removeProject(projectId) {
    this.methods.removeById(this.projects, projectId);
   },

   getProjectById(id) {
    return this.methods.getById(this.projects, id)
   },

   setCurrentProjectId(id) {
    this.currentProjectId = id;
   },

   getCurrentProject() {
    return this.methods.getById(this.projects, this.currentProjectId);
   },

   addTodoToCurrentProject({ title, description, dueDate, priority }) {
    const getProject = this.getCurrentProject();
    const createTodo = new Todo({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    })
    getProject.addTodo(createTodo);
   },

   init() {

   }
 };

export default App

