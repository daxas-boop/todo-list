export { projects };
import { renderProjects } from './DOMstuff.js'

let projects = {
    totalProjects: [],

    makeDefaultProject: function () {
        let defaultProject = new Project('Default project');
        projects.totalProjects.push(defaultProject);
        defaultProject.createDefaultTodo('Default todo', 'This is a default to do', '2020-03-09', 'low');
    },
    
    deleteProject: function(project) {
        projects.totalProjects.splice(projects.totalProjects.indexOf(project),1)
    },

    addProject: function() {
        let project = new Project(prompt('Name of the project', 'Default name'));
        projects.totalProjects.push(project);
    }
};

class Project {
    constructor(title){
        this.title = title;
        this.todosArray = [];
    }

    changeTitle(value) {
        if (value && value.length > 4 ){
            this.title = value;
        } else{
            alert('Title too short');
        }
    }

    createDefaultTodo(title, description, dueDate, priority) {
        let todo = new Todo(title, description, dueDate, priority);
        this.todosArray.push(todo);
    }

    createTodo() {
        let title = document.querySelector('#title-todo').value;
        let description = document.querySelector('#description-todo').value;
        let dueDate = document.querySelector('#date-todo').value;
        let priority = document.querySelector('#priority-todo').value;

        let todo = new Todo(title, description, dueDate, priority);
        this.todosArray.push(todo);
    }

    deleteTodo(index) {
        this.todosArray.splice(index,1);
    }

}

class Todo {
    constructor(title, description, dueDate, priority){
        if ( title.length >= 4 ){
            this.title = title;
        } else{
            alert ('Title too short');
            throw 'Title too short';
        }

        this.description = description;

        
        if ( dueDate.length >= 4 ){
            this.dueDate = dueDate;
        } else{
            alert ('Please enter a date');
            throw 'No date';
        }

        this.priority = priority;
    }

    changeTitle(title) {
        if ( title.length >= 4 ){
            this.title = title;
        } else{
            alert('Title too short');
        }
    }

    changeDescription(description) {
        this.description = description;
    }
    
    changeDueDate(date) {
        this.dueDate = date;
    }

    changePriority(priority) {
        this.priority = priority;
    }
}

function handleButtons() {
    let $addProject = document.querySelector('#add-project');
    $addProject.addEventListener('click', () => { projects.addProject(), renderProjects(); });
}

function initialize() {
    projects.makeDefaultProject();
    renderProjects();
    handleButtons();
}

initialize();
