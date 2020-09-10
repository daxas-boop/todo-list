import { projects } from './index.js';

export function renderProjects() {
    let $projectContainer = document.querySelector('#projects-container');
    $projectContainer.innerHTML = '';

    projects.totalProjects.forEach( project => {
        let $project = document.createElement('div');
        $project.classList.add('project');
        let $projectTitle = document.createElement('h2');
        $projectTitle.innerText = project.title;
        let $todoListContainer = document.createElement('div');
        $todoListContainer.classList.add('todo-list-container');

        let $changeProjectNameBtn = document.createElement('button');
        $changeProjectNameBtn.setAttribute('class','change-project-name');
        $changeProjectNameBtn.classList.add('button');
        $changeProjectNameBtn.innerText = 'Change project name';
        $changeProjectNameBtn.addEventListener('click', () => { changeProjectName(project) });
        let $deleteProjectBtn = document.createElement('button');
        $deleteProjectBtn.setAttribute('class','delete-project');
        $deleteProjectBtn.innerText = 'Delete project';
        $deleteProjectBtn.classList.add('button');
        $deleteProjectBtn.addEventListener('click', () => { deleteProject(project) });
        let $addTodoBtn = document.createElement('button');
        $addTodoBtn.innerText = 'Add new todo';
        $addTodoBtn.classList.add('button');
        $addTodoBtn.addEventListener('click', () => { renderForm(project) });


        $project.appendChild($deleteProjectBtn);
        $project.appendChild($todoListContainer);
        $project.appendChild($addTodoBtn);
        $project.appendChild($changeProjectNameBtn);
        $project.appendChild($projectTitle);
        $projectContainer.appendChild($project);

        renderTodoList(project.todosArray, $project, project);
    });
    console.log('Projects rendered');
}

function renderTodoList(todosArray, $project, project) {
    let $todoListContainer = $project.querySelector('.todo-list-container')
    $todoListContainer.innerHTML = '';

    todosArray.forEach( todo => {
        let $todoContainer = document.createElement('div');
        $todoContainer.classList.add('todo-container');
        $todoContainer.classList.add(`${todo.priority}-priority`);
        let $todoTitle = document.createElement('h4');
        $todoTitle.innerText = todo.title;
        let $todoDescription = document.createElement('p');
        $todoDescription.innerText = todo.description;
        let $todoDate = document.createElement('p');
        $todoDate.innerText = todo.dueDate;
        let $todoPriority = document.createElement('p');
        $todoPriority.innerText = `${todo.priority}`
        let $todoDeleteBtn = document.createElement('button');
        $todoDeleteBtn.innerText = 'Delete todo';
        $todoDeleteBtn.classList.add('button');
        $todoDeleteBtn.addEventListener('click', () => { deleteTodo(todosArray, project, todo) });
        let $todoEditBtn = document.createElement('button');
        $todoEditBtn.innerText = 'Edit todo';
        $todoEditBtn.classList.add('button');
        $todoEditBtn.addEventListener('click', () => { editTodo(todo) });

        $todoContainer.appendChild($todoTitle);
        $todoContainer.appendChild($todoDescription);
        $todoContainer.appendChild($todoDate);
        $todoContainer.appendChild($todoDeleteBtn);
        $todoContainer.appendChild($todoEditBtn);
        $todoListContainer.appendChild($todoContainer);
    });
    
    $project.appendChild($todoListContainer);
}

function renderForm (project) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.add('form-show');
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
    let $inputDescription = document.createElement('textarea');
    $inputDescription.setAttribute('id', 'description-todo');
    $labelDescription.appendChild($inputDescription);
    $form.appendChild($labelDescription);

    let $labelDate = document.createElement('label');
    $labelDate.innerText = 'Date';
    let $inputDate = document.createElement('input');
    $inputDate.setAttribute('type', 'date');
    $inputDate.setAttribute('id', 'date-todo');
    $inputDate.setAttribute('min', new Date().toISOString().split("T")[0]);
    $labelDate.appendChild($inputDate);
    $form.appendChild($labelDate);

    let $labelPriority = document.createElement('label');
    $labelPriority.innerText = 'Priority';
    let $inputPriority = document.createElement('select');
    $inputPriority.setAttribute('id', 'priority-todo');

    let $LowOptionPriority = document.createElement('option');
    $LowOptionPriority.innerText = 'Low';
    $LowOptionPriority.setAttribute('value', 'low');
    $inputPriority.appendChild($LowOptionPriority);
    
    let $MediumOptionPriority = document.createElement('option');
    $MediumOptionPriority.innerText = 'Medium';
    $MediumOptionPriority.setAttribute('value', 'medium');
    $inputPriority.appendChild($MediumOptionPriority);

    let $HighOptionPriority = document.createElement('option');
    $HighOptionPriority.innerText = 'High';
    $HighOptionPriority.setAttribute('value', 'high');
    $inputPriority.appendChild($HighOptionPriority);

    $labelPriority.appendChild($inputPriority);
    $form.appendChild($labelPriority);

    let $sendBtn = document.createElement('button');
    $sendBtn.innerText = 'Send';
    $sendBtn.onclick = () => { createTodo(project) };
    $sendBtn.classList.add('button');    
    $form.appendChild($sendBtn);
    $formContainer.appendChild($form);
}

function deleteForm() {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
}

function changeProjectName(project) {
    project.changeTitle(prompt('new title of project'));
    renderProjects();
}

function deleteProject(project) {
    projects.deleteProject(project);
    renderProjects();
}

function deleteTodo(todosArray ,project, todo) {
    project.deleteTodo(todosArray.indexOf(todo));
    renderProjects();
}

function createTodo(project) {
    project.createTodo();
    deleteForm(); 
    renderProjects();
}

function editTodo(todo) {
    
}
