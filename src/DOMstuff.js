import { projects, addProject } from './index.js';
import { populateStorage } from './storage.js';

export function renderProjects() {
    let $projectContainer = document.querySelector('#projects-container');
    $projectContainer.innerHTML = '';
    let $addProjectBtn = document.createElement('button');
    $addProjectBtn.setAttribute('id', 'add-project');
    $addProjectBtn.classList.add('button');
    $addProjectBtn.innerText = 'Add Project'
    $addProjectBtn.addEventListener('click', () => { addProject() });
    $projectContainer.appendChild($addProjectBtn);
    
    projects.totalProjects.forEach( project => {
       renderProject(project, $projectContainer);
    });
}

function renderProject (project, $projectContainer) {
    let $project = document.createElement('div');
    $project.classList.add('project');
    let $projectTitleBtn = document.createElement('button');
    $projectTitleBtn.innerText = project.title;
    $projectTitleBtn.classList.add('project-btn');
    $projectTitleBtn.addEventListener('click', e => { addActiveClass(e, project) });
    if (project.active === true) { 
        $projectTitleBtn.classList.add('active'), 
        renderTodoList(project.todosArray, project);
        let $addTodoBtn = document.createElement('button');
        $addTodoBtn.innerText = 'Add new todo';
        $addTodoBtn.classList.add('button');
        $addTodoBtn.classList.add('add-todo-btn');
        $addTodoBtn.addEventListener('click', () => { renderForm(project) });
        $project.appendChild($addTodoBtn);
    }
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
    
    $project.appendChild($deleteProjectBtn);
    $project.appendChild($todoListContainer);
    
    $project.appendChild($changeProjectNameBtn);
    $project.appendChild($projectTitleBtn);
    $projectContainer.appendChild($project);
    return $project;
}

function renderTodoList(todosArray, project) {
    let $todoListContainer = document.querySelector('#todo-container');
    $todoListContainer.innerHTML = '';
    
    if(project.todosArray.length === 0) {
        let $emptyTitle = document.createElement('h2');
        $emptyTitle.classList.add('empty');
        let quote = randomQuote();
        $emptyTitle.innerText = quote;
        $todoListContainer.appendChild($emptyTitle);
    }
    
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
        $todoEditBtn.addEventListener('click', () => { renderEditForm(todo) });

        $todoContainer.appendChild($todoTitle);
        $todoContainer.appendChild($todoDescription);
        $todoContainer.appendChild($todoDate);
        $todoContainer.appendChild($todoDeleteBtn);
        $todoContainer.appendChild($todoEditBtn);
        $todoListContainer.appendChild($todoContainer);
    });
}

function renderForm (project) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.remove('hidden');
    let $form = document.createElement('form');
    $form.setAttribute('onsubmit','return false')

    let $labelTitle = document.createElement('label');
    let $labelTitleText = document.createElement('span');
    $labelTitleText.innerText = 'Title';
    let $inputTitle = document.createElement('input');
    $labelTitle.appendChild($labelTitleText);
    $inputTitle.setAttribute('type', 'text');
    $inputTitle.setAttribute('id', 'title-todo');
    $labelTitle.appendChild($inputTitle);
    $form.appendChild($labelTitle);

    let $labelDescription = document.createElement('label');
    $labelDescription.classList.add('label-description');
    let $labelDescriptionText = document.createElement('span');
    $labelDescriptionText.innerText = 'Description';
    let $inputDescription = document.createElement('textarea');
    $inputDescription.setAttribute('id', 'description-todo');
    $labelDescription.appendChild($labelDescriptionText);
    $labelDescription.appendChild($inputDescription);
    $form.appendChild($labelDescription);

    let $labelDate = document.createElement('label');
    let $labelDateText = document.createElement('span');
    $labelDateText.innerText = 'Date';
    let $inputDate = document.createElement('input');
    $inputDate.setAttribute('type', 'date');
    $inputDate.setAttribute('id', 'date-todo');
    $inputDate.setAttribute('min', new Date().toISOString().split("T")[0]);
    $labelDate.appendChild($labelDateText);
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
    let $wall = document.querySelector('#wall');
    $wall.classList.remove('hidden');
    $wall.addEventListener('click', () => { deleteForm(); })
}

function deleteForm() {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.add('hidden');
    let $wall = document.querySelector('#wall');
    $wall.classList.add('hidden');
}

function changeProjectName(project) {
    project.changeTitle(prompt('new title of project'));
    renderProjects();
    populateStorage(projects.totalProjects);
}

function deleteProject(project) {
    projects.deleteProject(project);
    renderProjects();
    populateStorage(projects.totalProjects);
    if(project.active === true) {
        let $todoListContainer = document.querySelector('#todo-container');
        $todoListContainer.innerHTML = '';
    }
}

function deleteTodo(todosArray ,project, todo) {
    project.deleteTodo(todosArray.indexOf(todo));
    renderTodoList(todosArray, project);
    populateStorage(projects.totalProjects);
}

function createTodo(project) {
    project.createTodo();
    deleteForm(); 
    renderTodoList(project.todosArray, project);
    populateStorage(projects.totalProjects);
}

function renderEditForm(todo) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.remove('hidden');
    let $form = document.createElement('form');
    $form.setAttribute('onsubmit','return false');

    let $labelTitle = document.createElement('label');
    let $labelTitleText = document.createElement('span');
    $labelTitleText.innerText = 'Title';
    let $inputTitle = document.createElement('input');
    $labelTitle.appendChild($labelTitleText);
    $inputTitle.setAttribute('type', 'text');
    $inputTitle.setAttribute('id', 'title-todo');
    $inputTitle.value = todo.title;
    $labelTitle.appendChild($inputTitle);
    $form.appendChild($labelTitle);

    let $labelDescription = document.createElement('label');
    $labelDescription.classList.add('label-description');
    let $labelDescriptionText = document.createElement('span');
    $labelDescriptionText.innerText = 'Description';
    let $inputDescription = document.createElement('textarea');
    $inputDescription.setAttribute('id', 'description-todo');
    $inputDescription.value = todo.description;
    $labelDescription.appendChild($labelDescriptionText);
    $labelDescription.appendChild($inputDescription);
    $form.appendChild($labelDescription);

    let $labelDate = document.createElement('label');
    let $labelDateText = document.createElement('span');
    $labelDateText.innerText = 'Date';
    let $inputDate = document.createElement('input');
    $inputDate.setAttribute('type', 'date');
    $inputDate.setAttribute('id', 'date-todo');
    $inputDate.value = todo.dueDate;
    $inputDate.setAttribute('min', new Date().toISOString().split("T")[0]);
    $labelDate.appendChild($labelDateText);
    $labelDate.appendChild($inputDate);
    $form.appendChild($labelDate);

    let $labelPriority = document.createElement('label');
    let $labelPriorityText = document.createElement('span');
    $labelPriorityText.innerText = 'Priority';
    $labelPriority.appendChild($labelPriorityText);
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

    $inputPriority.value = todo.priority;
    $labelPriority.appendChild($inputPriority);
    $form.appendChild($labelPriority);

    let $sendBtn = document.createElement('button');
    $sendBtn.innerText = 'Send';
    $sendBtn.onclick = () => { editTodo(todo) };
    $sendBtn.classList.add('button');    
    $form.appendChild($sendBtn);
    $formContainer.appendChild($form);
    let $wall = document.querySelector('#wall');
    $wall.classList.remove('hidden');
    $wall.addEventListener('click', () => { deleteForm(); })
}

function editTodo(todo) {
    let title = document.querySelector('#title-todo').value;
    let description = document.querySelector('#description-todo').value;
    let dueDate = document.querySelector('#date-todo').value;
    let priority = document.querySelector('#priority-todo').value;

    todo.changeTitle(title);
    todo.changeDescription(description);
    todo.changeDueDate(dueDate);
    todo.changePriority(priority);

    populateStorage(projects.totalProjects);
    deleteForm();
    renderTodoList(todosArray, project);
}

function addActiveClass(e, project) {
    let $btns = document.querySelectorAll('.project .project-btn');
    let $current = e.target;
    $btns.forEach( btn =>{ btn.classList.remove('active') });
    $current.classList.add('active');

    projects.totalProjects.forEach( item => { item.active = false });
    project.active = true;
    populateStorage(projects.totalProjects);
    renderProjects();
}

function randomQuote() {
    let quotes = ['How can emptiness be so heavy?', 'Not sad, not happy, but empty','Why does the feeling of emptiness ocuppy so much space', 'Only empty spaces can be filled'];
    let quote = quotes[Math.floor(quotes.length * Math.random())];
    
    return quote;
}
