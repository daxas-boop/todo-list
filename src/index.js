/* eslint-disable no-use-before-define */
import { renderProjects, addActiveClass, renderTodoList } from './ui/render-projects';
import { getStorage, populateStorage } from './cache/storage';
import { createTodo, Todo, deleteTodo, editTodo } from './classes/todo';
import {
  renderProjectForm,
  deleteForm,
  renderDeleteProjectPopup,
  renderEditProjectNameForm,
  renderTodoForm,
  renderDeleteTodoPopup,
  renderEditTodoForm,
} from './ui/render-forms';
import {
  Project,
  totalProjects,
  createProject,
  switchActiveProject,
  deleteProject,
  changeProjectName,
} from './classes/project';

function pushStorageToProjects(storageProjects) {
  if (storageProjects) {
    storageProjects.forEach((storageProject) => {
      const project = createProject(storageProject.title, storageProject.active);
      storageProject.todosArray.forEach((todo) => {
        project.createTodo(todo.title, todo.description, todo.dueDate, todo.priority, Todo);
      });
    });
  }
}

function handleButtons() {
  const $projectBtns = document.querySelectorAll('.project .project-btn');
  $projectBtns.forEach(($projectBtn) => {
    $projectBtn.addEventListener('click', (e) => {
      handleProjectSwitch(e);
    });
  });

  const $addProjectBtn = document.querySelector('#add-project');
  $addProjectBtn.addEventListener('click', () => {
    handleAddProject();
  });

  const $deleteProjectBtns = document.querySelectorAll('.project .delete-project');
  $deleteProjectBtns.forEach(($deleteProjectBtn) => {
    $deleteProjectBtn.addEventListener('click', (e) => {
      handleDeleteProject(e);
    });
  });

  const $changeProjectNameBtns = document.querySelectorAll('.project .change-project-name');
  $changeProjectNameBtns.forEach(($changeProjectNameBtn) => {
    $changeProjectNameBtn.addEventListener('click', (e) => {
      handleChangeProjectName(e);
    });
  });

  const $addTodoBtn = document.querySelector('.project .add-todo-btn');
  $addTodoBtn.addEventListener('click', (e) => {
    handleAddTodo(e);
  });

  const $todoDeleteBtns = document.querySelectorAll('.todo-container .delete-todo-btn');
  $todoDeleteBtns.forEach(($todoDeleteBtn) => {
    $todoDeleteBtn.addEventListener('click', (e) => {
      handleDeleteTodo(e);
    });
  });

  const $editTodoBtns = document.querySelectorAll('.todo-container .edit-todo-btn');
  $editTodoBtns.forEach(($editTodoBtn) => {
    $editTodoBtn.addEventListener('click', (e) => {
      handleEditTodo(e);
    });
  });
}

function handleProjectSwitch(e) {
  const project = totalProjects[e.target.getAttribute('data-project')];
  addActiveClass(e);
  switchActiveProject(project);
  populateStorage(totalProjects);
  renderProjects(totalProjects, handleButtons);
}

function handleDeleteProject(e) {
  const project = totalProjects[e.target.getAttribute('data-project')];
  const $deleteBtn = renderDeleteProjectPopup(project);
  $deleteBtn.onclick = () => {
    if (project.active) {
      deleteProject(project);
      deleteForm();
      populateStorage(totalProjects);
      renderTodoList();
      renderProjects(totalProjects, handleButtons);
    }
    deleteProject(project);
    deleteForm();
    populateStorage(totalProjects);
    renderProjects(totalProjects, handleButtons);
  };
}

function handleAddProject() {
  const $addProjectForm = renderProjectForm();
  $addProjectForm.onsubmit = () => {
    const title = document.querySelector('#project-title').value;
    if (totalProjects.length === 0) {
      createProject(title, true);
      deleteForm();
      populateStorage(totalProjects);
      renderProjects(totalProjects, handleButtons);
      return;
    }
    createProject(title);
    deleteForm();
    populateStorage(totalProjects);
    renderProjects(totalProjects, handleButtons);
  };
}

function handleChangeProjectName(e) {
  const project = totalProjects[e.target.getAttribute('data-project')];
  const $changeProjectNameForm = renderEditProjectNameForm(project);
  $changeProjectNameForm.onsubmit = () => {
    changeProjectName(project);
    deleteForm();
    populateStorage(totalProjects);
    renderProjects(totalProjects, handleButtons);
  };
}

function handleAddTodo(e) {
  const project = totalProjects[e.target.getAttribute('data-project')];
  const $addTodoForm = renderTodoForm(project);
  $addTodoForm.onsubmit = () => {
    createTodo(project);
    deleteForm();
    populateStorage(totalProjects);
    renderProjects(totalProjects, handleButtons);
  };
}

function handleDeleteTodo(e) {
  const project = totalProjects[e.target.getAttribute('data-project')];
  const todo = project.todosArray[e.target.getAttribute('data-todo')];
  const $deleteTodoBtn = renderDeleteTodoPopup(todo);
  $deleteTodoBtn.onclick = () => {
    deleteTodo(project, todo);
    deleteForm();
    populateStorage(totalProjects);
    renderProjects(totalProjects, handleButtons);
  };
}

function handleEditTodo(e) {
  const project = totalProjects[e.target.getAttribute('data-project')];
  const todo = project.todosArray[e.target.getAttribute('data-todo')];
  const $editTodoForm = renderEditTodoForm(todo);
  $editTodoForm.onsubmit = () => {
    editTodo(todo);
    deleteForm();
    populateStorage(totalProjects);
    renderProjects(totalProjects, handleButtons);
  };
}

function defaultProject() {
  const projectDefault = new Project('Default project', true);
  totalProjects.push(projectDefault);
  projectDefault.createTodo('Default todo', 'This is a default to do', '2020-03-09', 'low', Todo);
}

function initialize() {
  const storage = getStorage();
  if (!storage) {
    defaultProject();
    populateStorage(totalProjects);
  }
  pushStorageToProjects(storage);
  renderProjects(totalProjects, handleButtons);
}

initialize();
