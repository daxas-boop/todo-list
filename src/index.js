/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import { renderProjects } from './UI/projects.js';
import { populateStorage, getStorage, pushStorageToProjects } from './Storage/storage.js';
import { Todo } from './Todo.js';

class Project {
  constructor(title, active) {
    if (title.length < 4 || title.length > 20) {
      alert('Invalid title. Title must have between 4 and 20 characters');
      throw new Error('Invalid title');
    } else {
      this.title = title;
    }
    this.active = active;
    this.todosArray = [];
  }

  createTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    this.todosArray.push(todo);
  }

  deleteTodo(index) {
    this.todosArray.splice(index, 1);
  }
}

export const projects = {
  totalProjects: [],

  deleteProject(project) {
    projects.totalProjects.splice(projects.totalProjects.indexOf(project), 1);
  },

  createProject(name, active) {
    const project = new Project(name, active);
    projects.totalProjects.push(project);
    return project;
  },
};

export function addProject(title) {
  projects.totalProjects.forEach((project) => { project.active = false; });
  projects.createProject(title, true);
  populateStorage(projects.totalProjects);
}

export function deleteProject(project) {
  projects.deleteProject(project);
  populateStorage(projects.totalProjects);
  if (project.active === true) {
    project = undefined;
  }
}

export function changeProjectName(project) {
  const title = document.querySelector('#project-title').value;
  if (title.length < 4 || title.length > 20) {
    alert('Invalid title. Title must have between 4 and 20 characters');
    throw new Error('Invalid title');
  } else {
    project.title = title;
    populateStorage(projects.totalProjects);
  }
}

export function switchActiveProject(project) {
  projects.totalProjects.forEach((item) => { item.active = false; });
  project.active = true;
  populateStorage(projects.totalProjects);
}

function defaultProject() {
  const projectDefault = new Project('Default project', true);
  projects.totalProjects.push(projectDefault);
  projectDefault.createTodo('Default todo', 'This is a default to do', '2020-03-09', 'low');
}

function initialize() {
  const storage = getStorage();
  if (!storage) { defaultProject(); populateStorage(projects.totalProjects); }
  pushStorageToProjects(storage, projects);
  renderProjects();
}

initialize();
