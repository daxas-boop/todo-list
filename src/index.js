/* eslint-disable import/no-cycle */
import { renderProjects } from './UI/render-projects';
import { populateStorage, getStorage, pushStorageToProjects } from './Storage/storage';
import { Todo } from './Todo';

class Project {
  constructor(title, active) {
    this.title = title;
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
  project.title = title;
  populateStorage(projects.totalProjects);
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
