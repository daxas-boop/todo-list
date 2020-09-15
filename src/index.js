export { projects, addProject, deleteProject, changeProjectName, createTodo ,deleteTodo, editTodo, switchActiveProject };
import { renderProjects, renderTodoList } from './UI/projects.js'
import { deleteForm } from "./UI/forms.js";
import { populateStorage, getStorage, pushStorageToProjects } from './Storage/storage.js'

let projects = {
    totalProjects: [],
    
    deleteProject: function(project) {
        projects.totalProjects.splice(projects.totalProjects.indexOf(project),1)
    },

    createProject: function(name, active) {
        let project = new Project(name, active);
        projects.totalProjects.push(project);
        return project;
    }
};

class Project {
    constructor(title, active){
        this.title = title;
        this.active = active;
        this.todosArray = [];
    }

    createTodo(title, description, dueDate, priority) {
        let todo = new Todo(title, description, dueDate, priority);
        this.todosArray.push(todo);
    }

    deleteTodo(index) {
        this.todosArray.splice(index,1);
    }
}

class Todo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function addProject(title) {
    projects.totalProjects.forEach(project =>{ project.active = false });
    projects.createProject(title, true);
    renderProjects();
    populateStorage(projects.totalProjects);
}

function deleteProject(project) {
    projects.deleteProject(project);
    populateStorage(projects.totalProjects);
    renderProjects();
    if (project.active === true ) {
        project = undefined;
        renderTodoList(project)
    }
}

function changeProjectName(project, title) {
    project.title = title;
    populateStorage(projects.totalProjects);
    renderProjects();
    deleteForm();
}

function switchActiveProject(project) {
    projects.totalProjects.forEach( item => { item.active = false });
    project.active = true;
    populateStorage(projects.totalProjects);
    renderProjects();
}

function deleteTodo(project, todo) {
    project.deleteTodo(project.todosArray.indexOf(todo));
    populateStorage(projects.totalProjects);
    renderTodoList(project);
}

function createTodo(project) {
    let title = document.querySelector('#title-todo').value;
    let description = document.querySelector('#description-todo').value;
    let dueDate = document.querySelector('#date-todo').value;
    let priority = document.querySelector('#priority-todo').value;
    project.createTodo(title, description, dueDate, priority);
    populateStorage(projects.totalProjects);
    renderTodoList(project);
    deleteForm(); 
}

function editTodo(project, todo) {
    let title = document.querySelector('#title-todo').value;
    let description = document.querySelector('#description-todo').value;
    let dueDate = document.querySelector('#date-todo').value;
    let priority = document.querySelector('#priority-todo').value;
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;

    populateStorage(projects.totalProjects);
    renderTodoList(project);
    deleteForm();
}

function defaultProject () {
    let defaultProject = new Project('Default project', true);
    projects.totalProjects.push(defaultProject);
    defaultProject.createTodo('Default todo', 'This is a default to do', '2020-03-09', 'low');
}

function initialize() {
    let storage = getStorage();
    if(!storage) { defaultProject(), populateStorage(projects.totalProjects) }
    pushStorageToProjects(storage);
    renderProjects();
}

initialize();
