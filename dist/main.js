!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){localStorage.setItem("projects",JSON.stringify(e))}function r(){let e=document.querySelector("#projects-container");e.innerHTML="",l.totalProjects.forEach(t=>{let n=function(e,t){let n=document.createElement("div");n.classList.add("project");let d=document.createElement("h2");d.innerText=e.title;let a=document.createElement("div");a.classList.add("todo-list-container");let c=document.createElement("button");c.setAttribute("class","change-project-name"),c.classList.add("button"),c.innerText="Change project name",c.addEventListener("click",()=>{!function(e){e.changeTitle(prompt("new title of project")),r(),o(l.totalProjects)}(e)});let u=document.createElement("button");u.setAttribute("class","delete-project"),u.innerText="Delete project",u.classList.add("button"),u.addEventListener("click",()=>{!function(e){l.deleteProject(e),r(),o(l.totalProjects)}(e)});let s=document.createElement("button");return s.innerText="Add new todo",s.classList.add("button"),s.addEventListener("click",()=>{!function(e){let t=document.querySelector("#form-container");t.innerHTML="",t.classList.add("form-show");let n=document.createElement("form");n.setAttribute("onsubmit","return false");let d=document.createElement("label");d.innerText="Title";let a=document.createElement("input");a.setAttribute("type","text"),a.setAttribute("id","title-todo"),d.appendChild(a),n.appendChild(d);let c=document.createElement("label");c.innerText="Description";let u=document.createElement("textarea");u.setAttribute("id","description-todo"),c.appendChild(u),n.appendChild(c);let s=document.createElement("label");s.innerText="Date";let p=document.createElement("input");p.setAttribute("type","date"),p.setAttribute("id","date-todo"),p.setAttribute("min",(new Date).toISOString().split("T")[0]),s.appendChild(p),n.appendChild(s);let m=document.createElement("label");m.innerText="Priority";let h=document.createElement("select");h.setAttribute("id","priority-todo");let f=document.createElement("option");f.innerText="Low",f.setAttribute("value","low"),h.appendChild(f);let b=document.createElement("option");b.innerText="Medium",b.setAttribute("value","medium"),h.appendChild(b);let T=document.createElement("option");T.innerText="High",T.setAttribute("value","high"),h.appendChild(T),m.appendChild(h),n.appendChild(m);let y=document.createElement("button");y.innerText="Send",y.onclick=()=>{!function(e){e.createTodo(),i(),r(),o(l.totalProjects)}(e)},y.classList.add("button"),n.appendChild(y),t.appendChild(n)}(e)}),n.appendChild(u),n.appendChild(a),n.appendChild(s),n.appendChild(c),n.appendChild(d),t.appendChild(n),n}(t,e);!function(e,t,n){let d=t.querySelector(".todo-list-container");d.innerHTML="",e.forEach(t=>{let a=document.createElement("div");a.classList.add("todo-container"),a.classList.add(t.priority+"-priority");let c=document.createElement("h4");c.innerText=t.title;let u=document.createElement("p");u.innerText=t.description;let s=document.createElement("p");s.innerText=t.dueDate,document.createElement("p").innerText=""+t.priority;let p=document.createElement("button");p.innerText="Delete todo",p.classList.add("button"),p.addEventListener("click",()=>{!function(e,t,n){t.deleteTodo(e.indexOf(n)),r(),o(l.totalProjects)}(e,n,t)});let m=document.createElement("button");m.innerText="Edit todo",m.classList.add("button"),m.addEventListener("click",()=>{!function(e){let t=document.querySelector("#form-container");t.innerHTML="",t.classList.add("form-show");let n=document.createElement("form");n.setAttribute("onsubmit","return false");let d=document.createElement("label");d.innerText="Title";let a=document.createElement("input");a.setAttribute("type","text"),a.setAttribute("id","title-todo"),a.value=e.title,d.appendChild(a),n.appendChild(d);let c=document.createElement("label");c.innerText="Description";let u=document.createElement("textarea");u.innerText=e.description,u.setAttribute("id","description-todo"),c.appendChild(u),n.appendChild(c);let s=document.createElement("label");s.innerText="Date";let p=document.createElement("input");p.setAttribute("type","date"),p.setAttribute("id","date-todo"),p.value=e.dueDate,p.setAttribute("min",(new Date).toISOString().split("T")[0]),s.appendChild(p),n.appendChild(s);let m=document.createElement("label");m.innerText="Priority";let h=document.createElement("select");h.setAttribute("id","priority-todo");let f=document.createElement("option");f.innerText="Low",f.setAttribute("value","low"),h.appendChild(f);let b=document.createElement("option");b.innerText="Medium",b.setAttribute("value","medium"),h.appendChild(b);let T=document.createElement("option");T.innerText="High",T.setAttribute("value","high"),h.appendChild(T),h.value=e.priority,m.appendChild(h),n.appendChild(m);let y=document.createElement("button");y.innerText="Send",y.onclick=()=>{!function(e){let t=document.querySelector("#title-todo").value,n=document.querySelector("#description-todo").value,d=document.querySelector("#date-todo").value,a=document.querySelector("#priority-todo").value;e.changeTitle(t),e.changeDescription(n),e.changeDueDate(d),e.changePriority(a),o(l.totalProjects),i(),r()}(e)},y.classList.add("button"),n.appendChild(y),t.appendChild(n)}(t)}),a.appendChild(c),a.appendChild(u),a.appendChild(s),a.appendChild(p),a.appendChild(m),d.appendChild(a)}),t.appendChild(d)}(t.todosArray,n,t)})}function i(){document.querySelector("#form-container").innerHTML=""}n.r(t),n.d(t,"projects",(function(){return l}));let l={totalProjects:[],makeDefaultProject:function(){let e=new d("Default project");l.totalProjects.push(e),e.createDefaultTodo("Default todo","This is a default to do","2020-03-09","low")},deleteProject:function(e){l.totalProjects.splice(l.totalProjects.indexOf(e),1)},addProject:function(e){if(e.length<4)return void alert("Title too short");let t=new d(e);return l.totalProjects.push(t),t}};class d{constructor(e){this.title=e,this.todosArray=[]}changeTitle(e){e.length<4?alert("Title too short"):this.title=e}createDefaultTodo(e,t,n,o){let r=new a(e,t,n,o);this.todosArray.push(r)}createTodo(){let e=document.querySelector("#title-todo").value,t=document.querySelector("#description-todo").value,n=document.querySelector("#date-todo").value,o=document.querySelector("#priority-todo").value,r=new a(e,t,n,o);this.todosArray.push(r)}deleteTodo(e){this.todosArray.splice(e,1)}}class a{constructor(e,t,n,o){if(!(e.length>=4))throw alert("Title too short"),"Title too short";if(this.title=e,this.description=t,!(n.length>=4))throw alert("Please enter a date"),"No date";this.dueDate=n,this.priority=o}changeTitle(e){e.length>=4?this.title=e:alert("Title too short")}changeDescription(e){this.description=e}changeDueDate(e){if(!(e.length>=4))throw alert("Please enter a date"),"No date";this.dueDate=e}changePriority(e){this.priority=e}}function c(){document.querySelector("#add-project").addEventListener("click",()=>{l.addProject(prompt("Name of the project","Default Name")),r(),o(l.totalProjects)})}!function(){let e=function(){let e=localStorage.getItem("projects");return e=JSON.parse(e),e}();var t;e||(l.makeDefaultProject(),o(l.totalProjects)),(t=e)&&t.forEach(e=>{let t=l.addProject(e.title);e.todosArray.forEach(e=>{t.createDefaultTodo(e.title,e.description,e.dueDate,e.priority)})}),r(),c()}()}]);