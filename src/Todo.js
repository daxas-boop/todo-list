/* eslint-disable no-alert */
import { populateStorage } from './Storage/storage.js';
import { projects } from './index.js';

export class Todo {
  constructor(title, description, dueDate, priority) {
    if (title.length < 4 || title.length > 20) {
      alert('Invalid title. Title must have between 4 and 20 characters');
      throw new Error('Invalid title');
    } else {
      this.title = title;
    }

    this.description = description;

    if (dueDate < 4) {
      alert('Invalid due date. You need to select a due date');
      throw new Error('Invalid date');
    } else {
      this.dueDate = dueDate;
    }

    this.priority = priority;
  }
}

export function deleteTodo(project, todo) {
  project.deleteTodo(project.todosArray.indexOf(todo));
  populateStorage(projects.totalProjects);
}

export function createTodo(project) {
  const title = document.querySelector('#title-todo').value;
  const description = document.querySelector('#description-todo').value;
  const dueDate = document.querySelector('#date-todo').value;
  const priority = document.querySelector('#priority-todo').value;
  project.createTodo(title, description, dueDate, priority);
  populateStorage(projects.totalProjects);
}

export function editTodo(project, todo) {
  const title = document.querySelector('#title-todo').value;
  const description = document.querySelector('#description-todo').value;
  const dueDate = document.querySelector('#date-todo').value;
  const priority = document.querySelector('#priority-todo').value;

  if (title.length < 4 || title.length > 20) {
    alert('Invalid title. Title must have between 4 and 20 characters');
    throw new Error('Invalid title');
  } else {
    todo.title = title;
  }

  if (dueDate < 4) {
    alert('Invalid due date. You need to select a due date');
    throw new Error('Invalid date');
  } else {
    todo.dueDate = dueDate;
  }

  todo.description = description;
  todo.priority = priority;
  populateStorage(projects.totalProjects);
}
