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
        let $changeProjectName = document.createElement('button');
        $changeProjectName.setAttribute('class','change-project-name');
        $changeProjectName.innerText = 'Change project name';
        $changeProjectName.addEventListener('click', () => { project.changeTitle(prompt('new title of project')), renderProjects(); });
        let $deleteProject = document.createElement('button');
        $deleteProject.setAttribute('class','delete-project');
        $deleteProject.innerText = 'Delete project';
        $deleteProject.addEventListener('click', () => { projects.deleteProject(project), renderProjects(); });
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
    console.log('Projects rendered');
}

function renderTodoList(todosArray, $project, project, $todoListContainer) {
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
        let $todoDelete = document.createElement('button');
        $todoDelete.innerText = 'Delete todo';
        $todoDelete.addEventListener('click', () => { 
            project.deleteTodo(todosArray.indexOf(todo));
            
        });

        $todoContainer.appendChild($todoTitle);
        $todoContainer.appendChild($todoDescription);
        $todoContainer.appendChild($todoDate);
        $todoContainer.appendChild($todoDelete);
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

    let $sendButton = document.createElement('button');
    $sendButton.innerText = 'Send';
    $sendButton.onclick = () => { project.createTodo(), hideTodoForm() };
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
