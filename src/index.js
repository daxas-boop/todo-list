export { projects, addProject };
import { renderProjects } from './DOMstuff.js'
import { populateStorage, getStorage } from './storage.js'

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

    addProject: function(name, active) {
        if (name.length < 4) { alert('Title too short'); return}
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

    changeTitle(value) {
        if (value.length < 4){ alert('Title too short'); return}
        this.title = value;
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
            throw 'Title too short';
        }
    }

    changeDescription(description) {
        this.description = description;
    }
    
    changeDueDate(date) {
        if ( date.length >= 4 ){
            this.dueDate = date;
        } else{
            alert ('Please enter a date');
            throw 'No date';
        }
    }

    changePriority(priority) {
        this.priority = priority;
    }
}

function addProject() {
    projects.totalProjects.forEach(project =>{ project.active = false });
    projects.addProject(prompt('Name of the project', 'Default Name'), true);
    renderProjects();
    populateStorage(projects.totalProjects);
}

function pushStorageToProjects(storageProjects) {
    if(storageProjects){
        storageProjects.forEach(storageProject => {
            let project = projects.addProject(storageProject.title, storageProject.active);
            
            storageProject.todosArray.forEach( todo => {
                project.createDefaultTodo(todo.title, todo.description, todo.dueDate, todo.priority);
            });
        });
    }
}

function initialize() {
    let storage = getStorage();
    if(!storage) { projects.makeDefaultProject(), populateStorage(projects.totalProjects) }
    pushStorageToProjects(storage);
    renderProjects();
}

initialize();
