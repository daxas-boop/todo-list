import { projects,  switchActiveProject } from '../index.js';
import { renderTodoForm, renderProjectForm, renderDeletePopup} from './forms.js'
export {renderProjects, renderTodoList}

function renderProjects() {
    let $projectContainer = document.querySelector('#projects-container');
    $projectContainer.innerHTML = '';
    let $addProjectBtn = document.createElement('button');
    $addProjectBtn.setAttribute('id', 'add-project');
    $addProjectBtn.classList.add('button');
    $addProjectBtn.innerText = 'Add Project'
    $addProjectBtn.addEventListener('click', () => { renderProjectForm() });
    $projectContainer.appendChild($addProjectBtn);
    projects.totalProjects.forEach( project => {
       renderProject(project, $projectContainer);
    });
}

function renderProject (project, $projectContainer) {
    let $project = document.createElement('div');
    $project.classList.add('project');
    let $projectTitleBtn = document.createElement('button');
    $projectTitleBtn.innerText = `Project: ${project.title}`;
    $projectTitleBtn.classList.add('project-btn');
    $projectTitleBtn.addEventListener('click', e => { addActiveClass(e), switchActiveProject(project) });
    if (project.active === true) { 
        $projectTitleBtn.classList.add('active'), 
        renderTodoList(project);
        let $addTodoBtn = document.createElement('button');
        $addTodoBtn.innerText = 'Add new todo';
        $addTodoBtn.classList.add('button');
        $addTodoBtn.classList.add('add-todo-btn');
        $addTodoBtn.addEventListener('click', () => { renderTodoForm(project) });
        $project.appendChild($addTodoBtn);
    }
    let $todoListContainer = document.createElement('div');
    $todoListContainer.classList.add('todo-list-container');
    let $changeProjectNameBtn = document.createElement('button');
    $changeProjectNameBtn.setAttribute('class','change-project-name');
    $changeProjectNameBtn.classList.add('button');
    $changeProjectNameBtn.innerText = 'Change project name';
    $changeProjectNameBtn.addEventListener('click', () => { renderProjectForm(project) });
    let $deleteProjectBtn = document.createElement('button');
    $deleteProjectBtn.setAttribute('class','delete-project');
    $deleteProjectBtn.innerText = 'Delete project';
    $deleteProjectBtn.classList.add('button');
    $deleteProjectBtn.addEventListener('click', () => { renderDeletePopup(project) });
    $project.appendChild($deleteProjectBtn);
    $project.appendChild($todoListContainer);
    $project.appendChild($changeProjectNameBtn);
    $project.appendChild($projectTitleBtn);
    $projectContainer.appendChild($project);
}

function renderTodoList(project) {
    let $todoListContainer = document.querySelector('#todo-container');
    $todoListContainer.innerHTML = '';

    if (typeof project === 'undefined') return;
    
    if(project.todosArray.length === 0) {
        let $emptyTitle = document.createElement('h2');
        $emptyTitle.classList.add('empty');
        let quote = randomQuote();
        $emptyTitle.innerText = quote;
        $todoListContainer.appendChild($emptyTitle);
    }

    project.todosArray.forEach( todo => {
        let $todoContainer = document.createElement('div');
        $todoContainer.classList.add('todo-container');
        $todoContainer.classList.add(`${todo.priority}-priority`);
        let $todoTitle = document.createElement('h4');
        $todoTitle.innerText = `${todo.title}`;
        let $todoDescription = document.createElement('p');
        $todoDescription.innerText = `${todo.description}`;
        let $todoDate = document.createElement('p');
        $todoDate.innerText = `Due Date: ${todo.dueDate}`;
        let $todoDeleteBtn = document.createElement('button');
        $todoDeleteBtn.innerText = 'Delete todo';
        $todoDeleteBtn.classList.add('delete-todo-btn');
        $todoDeleteBtn.addEventListener('click', () => { renderDeletePopup(project, todo) });
        let $todoEditBtn = document.createElement('button');
        $todoEditBtn.innerText = 'Edit todo';
        $todoEditBtn.classList.add('edit-todo-btn');
        $todoEditBtn.addEventListener('click', () => { renderTodoForm(project, todo) });
        $todoContainer.appendChild($todoTitle);
        $todoContainer.appendChild($todoDescription);
        $todoContainer.appendChild($todoDate);
        $todoContainer.appendChild($todoDeleteBtn);
        $todoContainer.appendChild($todoEditBtn);
        $todoListContainer.appendChild($todoContainer);
    });
}

function addActiveClass(e) {
    let $btns = document.querySelectorAll('.project .project-btn');
    let $current = e.target;
    $btns.forEach( btn =>{ btn.classList.remove('active') });
    $current.classList.add('active');
}

function randomQuote() {
    let quotes = ['"How can emptiness be so heavy?"', 
    '"Not sad, not happy, but empty."',
    '"Why does the feeling of emptiness ocuppy so much space."',
    '"Only empty spaces can be filled."',
    '"Silence isn\'t empty, it\'s full of answers."',
    '"It\'s all blank. All empty."',
    '"I feel so empty inside."'];
    let quote = quotes[Math.floor(quotes.length * Math.random())];
    
    return quote;
}
