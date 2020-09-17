export function deleteForm() {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.add('hidden');
  const $wall = document.querySelector('#wall');
  $wall.classList.add('hidden');
}

function renderWall() {
  const $wall = document.querySelector('#wall');
  $wall.classList.remove('hidden');
  $wall.addEventListener('click', () => {
    deleteForm();
  });
}

export function renderTodoForm() {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('id', 'form-todo');

  const $labelTitle = document.createElement('label');
  const $labelTitleText = document.createElement('span');
  $labelTitleText.innerText = 'Title:*';
  const $inputTitle = document.createElement('input');
  $labelTitle.appendChild($labelTitleText);
  $inputTitle.setAttribute('type', 'text');
  $inputTitle.setAttribute('id', 'title-todo');
  $inputTitle.maxLength = 25;
  $inputTitle.required = true;
  $labelTitle.appendChild($inputTitle);
  $form.appendChild($labelTitle);

  const $labelDescription = document.createElement('label');
  $labelDescription.classList.add('label-description');
  const $labelDescriptionText = document.createElement('span');
  $labelDescriptionText.innerText = 'Description:';
  const $inputDescription = document.createElement('textarea');
  $inputDescription.setAttribute('id', 'description-todo');
  $inputDescription.maxLength = 100;
  $labelDescription.appendChild($labelDescriptionText);
  $labelDescription.appendChild($inputDescription);
  $form.appendChild($labelDescription);

  const $labelDate = document.createElement('label');
  const $labelDateText = document.createElement('span');
  $labelDateText.innerText = 'Date:*';
  const $inputDate = document.createElement('input');
  $inputDate.setAttribute('type', 'date');
  $inputDate.setAttribute('id', 'date-todo');
  $inputDate.required = true;
  $inputDate.setAttribute('min', new Date().toISOString().split('T')[0]);
  $labelDate.appendChild($labelDateText);
  $labelDate.appendChild($inputDate);
  $form.appendChild($labelDate);

  const $labelPriority = document.createElement('label');
  $labelPriority.innerText = 'Priority:';
  const $inputPriority = document.createElement('select');
  $inputPriority.setAttribute('id', 'priority-todo');
  const $LowOptionPriority = document.createElement('option');
  $LowOptionPriority.innerText = 'Low';
  $LowOptionPriority.setAttribute('value', 'low');
  $inputPriority.appendChild($LowOptionPriority);
  const $MediumOptionPriority = document.createElement('option');
  $MediumOptionPriority.innerText = 'Medium';
  $MediumOptionPriority.setAttribute('value', 'medium');
  $inputPriority.appendChild($MediumOptionPriority);
  const $HighOptionPriority = document.createElement('option');
  $HighOptionPriority.innerText = 'High';
  $HighOptionPriority.setAttribute('value', 'high');
  $inputPriority.appendChild($HighOptionPriority);
  $labelPriority.appendChild($inputPriority);
  $form.appendChild($labelPriority);

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => {
    deleteForm();
  });
  $form.appendChild($closeBtn);
  const $sendBtn = document.createElement('button');
  $sendBtn.innerText = 'Send';
  $sendBtn.classList.add('button');
  $sendBtn.classList.add('send-btn');
  $form.appendChild($sendBtn);
  $formContainer.appendChild($form);
  renderWall();

  return $form;
}

export function renderEditTodoForm(todo) {
  renderTodoForm();
  const $inputTitle = document.querySelector('#title-todo');
  const $inputDescription = document.querySelector('#description-todo');
  const $inputDate = document.querySelector('#date-todo');
  const $inputPriority = document.querySelector('#priority-todo');
  const $form = document.querySelector('#form-todo');

  $inputTitle.value = todo.title;
  $inputDescription.value = todo.description;
  $inputDate.value = todo.dueDate;
  $inputPriority.value = todo.priority;

  return $form;
}

export function renderProjectForm() {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('id', 'form-project');

  const $title = document.createElement('h2');
  $title.innerText = 'Add a new Project';
  $form.appendChild($title);

  const $labelTitle = document.createElement('label');
  const $labelTitleText = document.createElement('span');
  $labelTitleText.innerText = 'Title*';
  const $inputTitle = document.createElement('input');
  $labelTitle.appendChild($labelTitleText);
  $inputTitle.setAttribute('type', 'text');
  $inputTitle.maxLength = 25;
  $inputTitle.required = true;
  $inputTitle.setAttribute('id', 'project-title');
  $labelTitle.appendChild($inputTitle);
  $form.appendChild($labelTitle);

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => {
    deleteForm();
  });
  $form.appendChild($closeBtn);

  const $sendBtn = document.createElement('button');
  $sendBtn.innerText = 'Send';
  $sendBtn.classList.add('button');
  $sendBtn.classList.add('send-btn');
  $form.appendChild($sendBtn);
  $formContainer.appendChild($form);
  renderWall();

  return $form;
}

export function renderEditProjectNameForm(project) {
  renderProjectForm();
  const $formTitle = document.querySelector('#form-project h2');
  $formTitle.innerText = 'Edit the name of the Project';
  const $inputTitle = document.querySelector('#project-title');
  const $form = document.querySelector('#form-project');
  $inputTitle.value = project.title;

  return $form;
}

export function renderDeleteProjectPopup(project) {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('onsubmit', 'return false');

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => {
    deleteForm();
  });
  $form.appendChild($closeBtn);

  const $title = document.createElement('h2');
  $title.classList.add('form-title');
  $title.innerText = `Do you want to delete the project "${project.title}" ?`;
  $form.appendChild($title);

  const $deleteBtn = document.createElement('button');
  $deleteBtn.innerText = 'Yes, delete it';
  $deleteBtn.classList.add('button');
  $deleteBtn.setAttribute('id', 'delete-btn');
  $form.appendChild($deleteBtn);
  $formContainer.appendChild($form);

  const $dontDeleteBtn = document.createElement('button');
  $dontDeleteBtn.innerText = "No, don't delete it";
  $dontDeleteBtn.classList.add('button');
  $dontDeleteBtn.setAttribute('id', 'close-btn');
  $dontDeleteBtn.onclick = () => {
    deleteForm();
  };
  $form.appendChild($dontDeleteBtn);
  $formContainer.appendChild($form);
  renderWall();

  return $deleteBtn;
}

export function renderDeleteTodoPopup(todo) {
  const $formContainer = document.querySelector('#form-container');
  $formContainer.innerHTML = '';
  $formContainer.classList.remove('hidden');
  const $form = document.createElement('form');
  $form.setAttribute('onsubmit', 'return false');

  const $closeBtn = document.createElement('span');
  $closeBtn.innerText = '×';
  $closeBtn.classList.add('close-form-btn');
  $closeBtn.addEventListener('click', () => {
    deleteForm();
  });
  $form.appendChild($closeBtn);

  const $title = document.createElement('h2');
  $title.classList.add('form-title');
  $title.innerText = `Do you want to delete the todo "${todo.title}" ?`;
  $form.appendChild($title);

  const $deleteBtn = document.createElement('button');
  $deleteBtn.innerText = 'Yes, delete it';
  $deleteBtn.classList.add('button');
  $deleteBtn.setAttribute('id', 'delete-btn');
  $form.appendChild($deleteBtn);
  $formContainer.appendChild($form);

  const $dontDeleteBtn = document.createElement('button');
  $dontDeleteBtn.innerText = "No, don't delete it";
  $dontDeleteBtn.classList.add('button');
  $dontDeleteBtn.setAttribute('id', 'close-btn');
  $dontDeleteBtn.onclick = () => {
    deleteForm();
  };
  $form.appendChild($dontDeleteBtn);
  $formContainer.appendChild($form);
  renderWall();

  return $deleteBtn;
}
