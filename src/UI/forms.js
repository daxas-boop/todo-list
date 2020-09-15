export { deleteForm, renderForm, renderProjectForm, renderDeletePopup }
import { addProject, changeProjectName, createTodo , editTodo, deleteProject, deleteTodo } from '../index.js';

function renderForm (project, todo) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.remove('hidden');
    let $form = document.createElement('form');
    $form.setAttribute('onsubmit','return false')

    let $labelTitle = document.createElement('label');
    let $labelTitleText = document.createElement('span');
    $labelTitleText.innerText = 'Title:*';
    let $inputTitle = document.createElement('input');
    $labelTitle.appendChild($labelTitleText);
    $inputTitle.setAttribute('type', 'text');
    $inputTitle.setAttribute('id', 'title-todo');
    $labelTitle.appendChild($inputTitle);
    $form.appendChild($labelTitle);

    let $labelDescription = document.createElement('label');
    $labelDescription.classList.add('label-description');
    let $labelDescriptionText = document.createElement('span');
    $labelDescriptionText.innerText = 'Description:';
    let $inputDescription = document.createElement('textarea');
    $inputDescription.setAttribute('id', 'description-todo');
    $labelDescription.appendChild($labelDescriptionText);
    $labelDescription.appendChild($inputDescription);
    $form.appendChild($labelDescription);

    let $labelDate = document.createElement('label');
    let $labelDateText = document.createElement('span');
    $labelDateText.innerText = 'Date:*';
    let $inputDate = document.createElement('input');
    $inputDate.setAttribute('type', 'date');
    $inputDate.setAttribute('id', 'date-todo');
    $inputDate.setAttribute('min', new Date().toISOString().split("T")[0]);
    $labelDate.appendChild($labelDateText);
    $labelDate.appendChild($inputDate);
    $form.appendChild($labelDate);

    let $labelPriority = document.createElement('label');
    $labelPriority.innerText = 'Priority:';
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

    let $closeBtn = document.createElement('span');
    $closeBtn.innerText = '×';
    $closeBtn.classList.add('close-form-btn');
    $closeBtn.addEventListener('click', () => { deleteForm(); })
    $form.appendChild($closeBtn);

    if (todo) {
        $inputTitle.value = todo.title;
        $inputDescription.value = todo.description;
        $inputDate.value = todo.dueDate;
        $inputPriority.value = todo.priority;
        let $sendBtn = document.createElement('button');
        $sendBtn.innerText = 'Send';
        $sendBtn.onclick = () => { editTodo(project, todo) };
        $sendBtn.classList.add('button');
        $sendBtn.classList.add('send-btn');  
        $form.appendChild($sendBtn);
    } else {
        let $sendBtn = document.createElement('button');
        $sendBtn.innerText = 'Send';
        $sendBtn.onclick = () => { createTodo(project) };
        $sendBtn.classList.add('button');
        $sendBtn.classList.add('send-btn');
        $form.appendChild($sendBtn);
    }

    $formContainer.appendChild($form);
    renderWall();
}

function renderProjectForm(project) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.remove('hidden');
    let $form = document.createElement('form');
    $form.setAttribute('onsubmit','return false');

    let $title = document.createElement('h2');
    $title.innerText = 'Add a new Project';
    $form.appendChild($title);

    let $labelTitle = document.createElement('label');
    let $labelTitleText = document.createElement('span');
    $labelTitleText.innerText = 'Title*';
    let $inputTitle = document.createElement('input');
    $labelTitle.appendChild($labelTitleText);
    $inputTitle.setAttribute('type', 'text');
    $inputTitle.setAttribute('id', 'project-title');
    $labelTitle.appendChild($inputTitle);
    $form.appendChild($labelTitle);

    let $closeBtn = document.createElement('span');
    $closeBtn.innerText = '×';
    $closeBtn.classList.add('close-form-btn');
    $closeBtn.addEventListener('click', () => { deleteForm(); })
    $form.appendChild($closeBtn);
    
    let $sendBtn = document.createElement('button');
    $sendBtn.innerText = 'Send';
    $sendBtn.onclick = () => { addProject($inputTitle.value),  deleteForm(); };
    $sendBtn.classList.add('button');
    $sendBtn.classList.add('send-btn');
    $form.appendChild($sendBtn);  

    if(project) {
        $inputTitle.value = project.title;
        $sendBtn.onclick = () => { changeProjectName(project) };
    }

    $formContainer.appendChild($form);
    renderWall();
}

function renderDeletePopup(project, todo) {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.remove('hidden');
    let $form = document.createElement('form');
    $form.setAttribute('onsubmit','return false');

    let $closeBtn = document.createElement('span');
    $closeBtn.innerText = '×';
    $closeBtn.classList.add('close-form-btn');
    $closeBtn.addEventListener('click', () => { deleteForm(); })
    $form.appendChild($closeBtn);

    let $title = document.createElement('h2');
    $form.appendChild($title)

    let $deleteBtn = document.createElement('button');
    $deleteBtn.innerText = 'Yes, delete it';
    $deleteBtn.classList.add('button');
    $deleteBtn.setAttribute('id', 'delete-btn')
    $form.appendChild($deleteBtn);
    $formContainer.appendChild($form);

    let $dontDeleteBtn = document.createElement('button');
    $dontDeleteBtn.innerText = "No, don't delete it";
    $dontDeleteBtn.classList.add('button');
    $dontDeleteBtn.setAttribute('id', 'close-btn')
    $form.appendChild($dontDeleteBtn);
    $formContainer.appendChild($form);
    renderWall();

    if (typeof todo === 'undefined') {
        $title.innerText = `Do you want to delete the project "${project.title}" ?`
        $deleteBtn.onclick = () => { deleteProject(project), deleteForm(); };
        $dontDeleteBtn.onclick = () => { deleteForm(); };
    } else {
        $title.innerText = `Do you want to delete the todo "${todo.title}" ?` 
        $deleteBtn.onclick = () => { deleteTodo(project, todo), deleteForm(); };
        $dontDeleteBtn.onclick = () => { deleteForm(); };
    }
}

function deleteForm() {
    let $formContainer = document.querySelector('#form-container');
    $formContainer.innerHTML = '';
    $formContainer.classList.add('hidden');
    let $wall = document.querySelector('#wall');
    $wall.classList.add('hidden');
}

function renderWall() {
    let $wall = document.querySelector('#wall');
    $wall.classList.remove('hidden');
    $wall.addEventListener('click', () => { deleteForm(); })
}
