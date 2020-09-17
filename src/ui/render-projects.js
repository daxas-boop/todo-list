export function addActiveClass(e) {
  const $btns = document.querySelectorAll('.project .project-btn');
  const $current = e.target;
  $btns.forEach((btn) => {
    btn.classList.remove('active');
  });
  $current.classList.add('active');
}

function randomQuote() {
  const quotes = [
    '"How can emptiness be so heavy?"',
    '"Not sad, not happy, but empty."',
    '"Why does the feeling of emptiness ocuppy so much space."',
    '"Only empty spaces can be filled."',
    '"Silence isn\'t empty, it\'s full of answers."',
    '"It\'s all blank. All empty."',
    '"I feel so empty inside."',
  ];
  const quote = quotes[Math.floor(quotes.length * Math.random())];

  return quote;
}

export function renderTodoList(project, totalProjects) {
  const $todoListContainer = document.querySelector('#todo-container');
  $todoListContainer.innerHTML = '';

  if (typeof project === 'undefined') return;

  if (project.todosArray.length === 0) {
    const $emptyTitle = document.createElement('h2');
    $emptyTitle.classList.add('empty');
    const quote = randomQuote();
    $emptyTitle.innerText = quote;
    $todoListContainer.appendChild($emptyTitle);
  }

  project.todosArray.forEach((todo) => {
    const $todoContainer = document.createElement('div');
    $todoContainer.classList.add('todo-container');
    $todoContainer.classList.add(`${todo.priority}-priority`);
    const $todoTitle = document.createElement('h4');
    $todoTitle.innerText = `${todo.title}`;
    const $todoDescription = document.createElement('p');
    $todoDescription.innerText = `${todo.description}`;
    const $todoDate = document.createElement('p');
    $todoDate.innerText = `Due Date: ${todo.dueDate}`;
    const $todoDeleteBtn = document.createElement('button');
    $todoDeleteBtn.innerText = 'Delete todo';
    $todoDeleteBtn.classList.add('delete-todo-btn');
    $todoDeleteBtn.setAttribute('data-project', `${totalProjects.indexOf(project)}`);
    $todoDeleteBtn.setAttribute('data-todo', `${project.todosArray.indexOf(todo)}`);
    const $todoEditBtn = document.createElement('button');
    $todoEditBtn.innerText = 'Edit todo';
    $todoEditBtn.classList.add('edit-todo-btn');
    $todoEditBtn.setAttribute('data-project', `${totalProjects.indexOf(project)}`);
    $todoEditBtn.setAttribute('data-todo', `${project.todosArray.indexOf(todo)}`);
    $todoContainer.appendChild($todoTitle);
    $todoContainer.appendChild($todoDescription);
    $todoContainer.appendChild($todoDate);
    $todoContainer.appendChild($todoDeleteBtn);
    $todoContainer.appendChild($todoEditBtn);
    $todoListContainer.appendChild($todoContainer);
  });
}

function renderProject(project, $projectContainer, totalProjects) {
  const $project = document.createElement('div');
  $project.classList.add('project');
  const $projectTitleBtn = document.createElement('button');
  $projectTitleBtn.innerText = `Project: ${project.title}`;
  $projectTitleBtn.classList.add('project-btn');
  $projectTitleBtn.setAttribute('data-project', `${totalProjects.indexOf(project)}`);
  const $todoListContainer = document.createElement('div');
  $todoListContainer.classList.add('todo-list-container');
  const $changeProjectNameBtn = document.createElement('button');
  $changeProjectNameBtn.setAttribute('class', 'change-project-name');
  $changeProjectNameBtn.classList.add('button');
  $changeProjectNameBtn.innerText = 'Change project name';
  $changeProjectNameBtn.setAttribute('data-project', `${totalProjects.indexOf(project)}`);
  const $deleteProjectBtn = document.createElement('button');
  $deleteProjectBtn.setAttribute('class', 'delete-project');
  $deleteProjectBtn.setAttribute('data-project', `${totalProjects.indexOf(project)}`);
  $deleteProjectBtn.innerText = 'Delete project';
  $deleteProjectBtn.classList.add('button');
  $project.appendChild($deleteProjectBtn);
  $project.appendChild($todoListContainer);
  $project.appendChild($changeProjectNameBtn);
  $project.appendChild($projectTitleBtn);
  $projectContainer.appendChild($project);

  if (project.active === true) {
    $projectTitleBtn.classList.add('active');
    const $addTodoBtn = document.createElement('button');
    $addTodoBtn.innerText = 'Add new todo';
    renderTodoList(project, totalProjects);
    $addTodoBtn.classList.add('button');
    $addTodoBtn.classList.add('add-todo-btn');
    $addTodoBtn.setAttribute('data-project', `${totalProjects.indexOf(project)}`);
    $project.appendChild($addTodoBtn);
  }
}

export function renderProjects(totalProjects, callbackFunction) {
  const $projectContainer = document.querySelector('#projects-container');
  $projectContainer.innerHTML = '';
  const $addProjectBtn = document.createElement('button');
  $addProjectBtn.setAttribute('id', 'add-project');
  $addProjectBtn.classList.add('button');
  $addProjectBtn.innerText = 'Add Project';
  $projectContainer.appendChild($addProjectBtn);
  totalProjects.forEach((project) => {
    renderProject(project, $projectContainer, totalProjects);
  });
  callbackFunction();
}
