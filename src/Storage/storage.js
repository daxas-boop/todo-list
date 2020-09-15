import {projects} from '../index.js'

export function populateStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects))
}

export function getStorage() {
    let retrievedProjects = localStorage.getItem('projects');
    retrievedProjects = JSON.parse(retrievedProjects);
    return retrievedProjects;
}

export function pushStorageToProjects(storageProjects) {
    if(storageProjects){
        storageProjects.forEach(storageProject => {
            let project = projects.createProject(storageProject.title, storageProject.active);
            
            storageProject.todosArray.forEach( todo => {
                project.createTodo(todo.title, todo.description, todo.dueDate, todo.priority);
            });
        });
    }
}
