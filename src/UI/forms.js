import { addProject, changeProjectName, deleteProject } from '../index.js';
import { renderProjects, renderTodoList } from './projects.js';
import { deleteTodo, createTodo, editTodo } from '../Todo.js';

export function deleteForm() {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.add('hidden');
  const $wall = document.querySelector('#wall');
  $wall.classList.add('hidden');
}

function renderWall() {
  const $wall = document.querySelector('#wall');
  $wall.classList.remove('hidden');
  $wall.addEventListener('click', () => { deleteForm(); });
}

export function renderTodoForm(project, todo) {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('onsubmit', 'return false');

  const $labelTitle = document.createElement('label');
  const $labelTitleText = document.createElement('span');
  $labelTitleText.innerText = 'Title:*';
  const $inputTitle = document.createElement('input');
  $labelTitle.appendChild($labelTitleText);
  $inputTitle.setAttribute('type', 'text');
  $inputTitle.setAttribute('id', 'title-todo');
  $labelTitle.appendChild($inputTitle);
  $form.appendChild($labelTitle);

  const $labelDescription = document.createElement('label');
  $labelDescription.classList.add('label-description');
  const $labelDescriptionText = document.createElement('span');
  $labelDescriptionText.innerText = 'Description:';
  const $inputDescription = document.createElement('textarea');
  $inputDescription.setAttribute('id', 'description-todo');
  $labelDescription.appendChild($labelDescriptionText);
  $labelDescription.appendChild($inputDescription);
  $form.appendChild($labelDescription);

  const $labelDate = document.createElement('label');
  const $labelDateText = document.createElement('span');
  $labelDateText.innerText = 'Date:*';
  const $inputDate = document.createElement('input');
  $inputDate.setAttribute('type', 'date');
  $inputDate.setAttribute('id', 'date-todo');
  $inputDate.setAttribute('min', new Date().toISOString().split('T')[0]);
  $labelDate.appendChild($labelDateText);
  $labelDate.appendChild($inputDate);
  $form.appendChild($labelDate);

  const $labelPriority = document.createElement('label');
  $labelPriority.innerText = 'Priority:';
  const $inputPriority = document.createElement('select');
  $inputPriority.setAttribute('id', 'priority-todo');
  const $LowOptionPriority = document.createElement('option');
  $LowOptionPriority.innerText = 'Low';
  $LowOptionPriority.setAttribute('value', 'low');
  $inputPriority.appendChild($LowOptionPriority);
  const $MediumOptionPriority = document.createElement('option');
  $MediumOptionPriority.innerText = 'Medium';
  $MediumOptionPriority.setAttribute('value', 'medium');
  $inputPriority.appendChild($MediumOptionPriority);
  const $HighOptionPriority = document.createElement('option');
  $HighOptionPriority.innerText = 'High';
  $HighOptionPriority.setAttribute('value', 'high');
  $inputPriority.appendChild($HighOptionPriority);
  $labelPriority.appendChild($inputPriority);
  $form.appendChild($labelPriority);

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => { deleteForm(); });
  $form.appendChild($closeBtn);

  if (todo) {
    $inputTitle.value = todo.title;
    $inputDescription.value = todo.description;
    $inputDate.value = todo.dueDate;
    $inputPriority.value = todo.priority;
    const $sendBtn = document.createElement('button');
    $sendBtn.innerText = 'Send';
    $sendBtn.onclick = () => { editTodo(project, todo); renderProjects(); deleteForm(); };
    $sendBtn.classList.add('button');
    $sendBtn.classList.add('send-btn');
    $form.appendChild($sendBtn);
  } else {
    const $sendBtn = document.createElement('button');
    $sendBtn.innerText = 'Send';
    $sendBtn.onclick = () => { createTodo(project); renderProjects(); deleteForm(); };
    $sendBtn.classList.add('button');
    $sendBtn.classList.add('send-btn');
    $form.appendChild($sendBtn);
  }

  $formContainer.appendChild($form);
  renderWall();
}

export function renderProjectForm(project) {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('onsubmit', 'return false');

  const $title = document.createElement('h2');
  $title.innerText = 'Add a new Project';
  $form.appendChild($title);

  const $labelTitle = document.createElement('label');
  const $labelTitleText = document.createElement('span');
  $labelTitleText.innerText = 'Title*';
  const $inputTitle = document.createElement('input');
  $labelTitle.appendChild($labelTitleText);
  $inputTitle.setAttribute('type', 'text');
  $inputTitle.setAttribute('id', 'project-title');
  $labelTitle.appendChild($inputTitle);
  $form.appendChild($labelTitle);

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => { deleteForm(); });
  $form.appendChild($closeBtn);

  const $sendBtn = document.createElement('button');
  $sendBtn.innerText = 'Send';
  $sendBtn.onclick = () => { addProject($inputTitle.value); renderProjects(); deleteForm(); };
  $sendBtn.classList.add('button');
  $sendBtn.classList.add('send-btn');
  $form.appendChild($sendBtn);

  if (project) {
    $inputTitle.value = project.title;
    $sendBtn.onclick = () => { changeProjectName(project); renderProjects(); deleteForm(); };
  }

  $formContainer.appendChild($form);
  renderWall();
}

export function renderDeletePopup(project, todo) {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('onsubmit', 'return false');

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => { deleteForm(); });
  $form.appendChild($closeBtn);

  const $title = document.createElement('h2');
  $form.appendChild($title);

  const $deleteBtn = document.createElement('button');
  $deleteBtn.innerText = 'Yes, delete it';
  $deleteBtn.classList.add('button');
  $deleteBtn.setAttribute('id', 'delete-btn');
  $form.appendChild($deleteBtn);
  $formContainer.appendChild($form);

  const $dontDeleteBtn = document.createElement('button');
  $dontDeleteBtn.innerText = "No, don't delete it";
  $dontDeleteBtn.classList.add('button');
  $dontDeleteBtn.setAttribute('id', 'close-btn');
  $form.appendChild($dontDeleteBtn);
  $formContainer.appendChild($form);
  renderWall();

  if (typeof todo === 'undefined') {
    $title.innerText = `Do you want to delete the project "${project.title}" ?`;
    $deleteBtn.onclick = () => {
      deleteProject(project); renderProjects();
      deleteForm(); if (project.active === true) { renderTodoList(); }
    };
    $dontDeleteBtn.onclick = () => { deleteForm(); };
  } else {
    $title.innerText = `Do you want to delete the todo "${todo.title}" ?`;
    $deleteBtn.onclick = () => { deleteTodo(project, todo); renderProjects(); deleteForm(); };
    $dontDeleteBtn.onclick = () => { deleteForm(); };
  }
}
