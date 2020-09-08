import {projects} from './index.js'

export function renderProjects() {
    let $projectContainer = document.querySelector('#projects-container');
    $projectContainer.innerHTML = '';

    projects.forEach( project => {
        let $project = document.createElement('div');
        $project.classList.add('project');
        let $projectTitle = document.createElement('h2');
        $projectTitle.innerText = project.title;
        let $changeProjectName = document.createElement('button');
        $changeProjectName.setAttribute('class','change-project-name')
        $changeProjectName.innerText = 'Change project name';
        $changeProjectName.addEventListener('click', () => { project.changeTitle(prompt('new title of project')), renderProjects() });
        let $addTodo = document.createElement('button');
        $addTodo.innerText = 'Add new todo';
        $addTodo.addEventListener('click', () => { project.createTodo(prompt('todo')),renderTodoList(project.todosArray) });
        $project.appendChild($addTodo);
        $project.appendChild($changeProjectName);
        $project.appendChild($projectTitle);
        $projectContainer.appendChild($project);
        
        renderTodoList(project.todosArray);
    });

}

function renderTodoList(todosArray) {
    let $todoList = document.querySelector('#todo-list');
    $todoList.innerHTML = '';

    todosArray.forEach( todo => {
        let $todo = document.createElement('div');
        $todo.classList.add('todo');
        let $todoTitle = document.createElement('h3');
        $todoTitle.innerText = todo.title;
        $todo.appendChild($todoTitle);
        $todoList.appendChild($todo);
    });
}