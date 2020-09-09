import { renderProjects } from "./DOMstuff";
export {projects, addsTodo};

let projects = [];

class Project {
    constructor(title){
        this.title = title;
        this.todosArray = [];
    }

    changeTitle(value) {
        if (typeof(value) != "undefined" && value.length > 4 ){
            this.title = value;
        } else{
            alert('Title too short');
        }
    }

    createTodo(title, description) {
        let todo = new Todo(title, description);
        this.todosArray.push(todo);
    }

    deleteTodo(index) {
        this.todosArray.splice(index,1);
    }

}

class Todo {
    constructor(title, description, dueDate, priority){
        if (typeof(title) != "undefined" && title.length >= 4 ){
            this.title = title;
        } else{
            alert ('Title too short');
            throw 'Title too short';
        }

        this.description = description;

        this.dueDate = dueDate;

        this.priority = priority;
    }

    changeTitle(value) {
        if (typeof(value) != "undefined" && value.length >= 4 ){
            this.title = value;
        } else{
            alert('Title too short');
        }
    }

    changeDescription(value) {
        this.description = value;
    }
    
    changeDueDate(value) {
        this.dueDate = value;
    }

    changePriority(value) {
        this.priority = value;
    }
}

function makeDefaultProject() {
    let defaultProject = new Project('Default project');
    projects.push(defaultProject);
    defaultProject.createTodo('Default todo', 'This is a default to do');
}

function handleButtons() {
    let $addProject = document.querySelector('#add-project');
    $addProject.addEventListener('click', () => { addProject() });
}

function addProject() {
    let project = new Project(prompt('Name of the project', 'Default name'));
    projects.push(project);
    renderProjects();
}

function addsTodo(project) {
    let title = document.querySelector('#title-todo').value;
    let description = document.querySelector('#description-todo').value;

    project.createTodo(title, description);
}

function initialize() {
    makeDefaultProject();
    renderProjects();
    handleButtons();
}

initialize();
