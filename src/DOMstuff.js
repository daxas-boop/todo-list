import {projects, addsTodo} from './index.js'

export function renderProjects() {
    let $projectContainer = document.querySelector('#projects-container');
    $projectContainer.innerHTML = '';

    projects.forEach( project => {
        let $project = document.createElement('div');
        $project.classList.add('project');
        let $projectTitle = document.createElement('h2');
        $projectTitle.innerText = project.title;
        let $todoListContainer = document.createElement('div');
        $todoListContainer.classList.add('todo-list-container');
        let $changeProjectName = document.createElement('button');
        $changeProjectName.setAttribute('class','change-project-name');
        $changeProjectName.innerText = 'Change project name';
        $changeProjectName.addEventListener('click', () => { project.changeTitle(prompt('new title of project')), renderProjects() });
        let $deleteProject = document.createElement('button');
        $deleteProject.setAttribute('class','delete-project');
        $deleteProject.innerText = 'Delete project';
        $deleteProject.addEventListener('click', () => { projects.splice(projects.indexOf(project),1), renderProjects() });
        let $addTodo = document.createElement('button');
        $addTodo.innerText = 'Add new todo';
        $addTodo.addEventListener('click', () => { renderForm(project), showTodoForm() });

        $project.appendChild($deleteProject);
        $project.appendChild($todoListContainer);
        $project.appendChild($addTodo);
        $project.appendChild($changeProjectName);
        $project.appendChild($projectTitle);
        $projectContainer.appendChild($project);

        renderTodoList(project.todosArray, $project, project, $todoListContainer);
    });

}

function renderTodoList(todosArray, $project, project, $todoListContainer) {
    $todoListContainer.innerHTML = '';

    todosArray.forEach( todo => {
        let $todoContainer = document.createElement('div');
        $todoContainer.classList.add('todo-container');
        let $todoTitle = document.createElement('h4');
        $todoTitle.innerText = todo.title;
        let $todoDescription = document.createElement('p');
        $todoDescription.innerText = todo.description;
        let $todoDelete = document.createElement('button');
        $todoDelete.innerText = 'Delete todo';
        $todoDelete.addEventListener('click', () => { project.deleteTodo(todosArray.indexOf(todo)), renderTodoList(todosArray, $project, project, $todoListContainer) });

        $todoContainer.appendChild($todoDescription);
        $todoContainer.appendChild($todoDelete);
        $todoContainer.appendChild($todoTitle);
        $todoListContainer.appendChild($todoContainer);
    });
    
    $project.appendChild($todoListContainer);
}

function renderForm (project) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    let $form = document.createElement('form');
    $form.setAttribute('onsubmit','return false')

    let $labelTitle = document.createElement('label');
    $labelTitle.innerText = 'Title';
    let $inputTitle = document.createElement('input');
    $inputTitle.setAttribute('type', 'text');
    $inputTitle.setAttribute('id', 'title-todo');
    $labelTitle.appendChild($inputTitle);
    $form.appendChild($labelTitle);

    let $labelDescription = document.createElement('label');
    $labelDescription.innerText = 'Description';
    let $inputDescription = document.createElement('input');
    $inputDescription.setAttribute('type', 'text');
    $inputDescription.setAttribute('id', 'description-todo');
    $labelDescription.appendChild($inputDescription);
    $form.appendChild($labelDescription);

    let $sendButton = document.createElement('button');
    $sendButton.innerText = 'Send';
    $sendButton.addEventListener('click', () => { addsTodo(project), hideTodoForm(), renderProjects() });
    $form.appendChild($sendButton);

    $formContainer.appendChild($form);
}

function showTodoForm() {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.classList.add('form-show');
}

function hideTodoForm() {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.classList.remove('form-show');
}