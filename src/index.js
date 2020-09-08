import { renderProjects } from "./DOMstuff";

export {projects};

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

    createTodo(value) {
        let todo = new Todo(value);
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
    let project = new Project('Default project');
    projects.push(project);
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

function initialize() {
    makeDefaultProject();
    renderProjects();
    handleButtons();
}

initialize();
