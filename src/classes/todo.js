/* eslint-disable no-param-reassign */
export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export function deleteTodo(project, todo) {
  project.deleteTodo(project.todosArray.indexOf(todo));
}

export function createTodo(project) {
  const title = document.querySelector('#title-todo').value;
  const description = document.querySelector('#description-todo').value;
  const dueDate = document.querySelector('#date-todo').value;
  const priority = document.querySelector('#priority-todo').value;
  project.createTodo(title, description, dueDate, priority, Todo);
}

export function editTodo(todo) {
  const title = document.querySelector('#title-todo').value;
  const description = document.querySelector('#description-todo').value;
  const dueDate = document.querySelector('#date-todo').value;
  const priority = document.querySelector('#priority-todo').value;

  todo.title = title;
  todo.dueDate = dueDate;
  todo.description = description;
  todo.priority = priority;
}
