/* eslint-disable no-param-reassign */
export class Project {
  constructor(title, active) {
    this.title = title;
    this.active = active;
    this.todosArray = [];
  }

  createTodo(title, description, dueDate, priority, Todo) {
    const todo = new Todo(title, description, dueDate, priority);
    this.todosArray.push(todo);
  }

  deleteTodo(index) {
    this.todosArray.splice(index, 1);
  }
}

export const totalProjects = [];

export function createProject(name, active) {
  const project = new Project(name, active);
  totalProjects.push(project);
  return project;
}

export function deleteProject(project) {
  totalProjects.splice(totalProjects.indexOf(project), 1);
  project = undefined;
}

export function changeProjectName(project) {
  const title = document.querySelector('#project-title').value;
  project.title = title;
}

export function switchActiveProject(project) {
  totalProjects.forEach((item) => {
    item.active = false;
  });
  project.active = true;
}
