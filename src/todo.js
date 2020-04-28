const todo = container.querySelector('.todo-container'),
    pendUl = todo.querySelector('.todo-pend'),
    finishUl = todo.querySelector('.todo-finish'),
    todoForm = todo.querySelector('.todo-form'),
    todoText = todoForm.querySelector('input');

const PEND_LS = 'PENDING',
    FINISH_LS = 'FINISHED',
    USER_LS = 'username';

const FINISH = '✔️',
    RETURN = '🔙';

let pending = [],
  finish = [];

function createLi(text, newID, handleDel, handleFin, finText) {
  const li = document.createElement('li');
  li.id = newID;
  
  const span = document.createElement('span');
  span.innerText = text;

  const delBtn = document.createElement('Button');
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', handleDel);

  const finBtn = document.createElement('Button');
  finBtn.innerText = finText;
  finBtn.addEventListener('click', handleFin);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);

  return li;
}

function removeList(event, type, ul) {
  const owner = localStorage.getItem(USER_LS);
  const temp = event.target.parentNode;
  ul.removeChild(temp);

  if(type){
    console.log(type);
    pending = pending.filter(todo => {
      return (parseInt(todo.id) !== parseInt(temp.id)) || (todo.owner !== owner);
    })
  }else{
    console.log(type);
    finish = finish.filter(todo => {
      return (parseInt(todo.id) !== parseInt(temp.id)) || (todo.owner !== owner);
    })
  }

  saveList();
}

function clearList() {
  pending = [];
  finish = [];
}

function saveList() {
  localStorage.setItem(PEND_LS, JSON.stringify(pending));
  localStorage.setItem(FINISH_LS, JSON.stringify(finish));
}

function addList(text, finText, finText2, ul, ul2, type, owner) {
  const newID = (type ? (pending[pending.length - 1] ? pending[pending.length - 1].id : 0) : (finish[finish.length - 1] ? finish[finish.length - 1].id : 0)) + 1;
  const data = {
    text: text,
    id: newID,
    owner: owner
  };
  
  if(type){
    pending.push(data);
  }else{
    finish.push(data);
  }

  const li = createLi(text, newID, event => {
    removeList(event, type, ul);
  }, event => {
    addList(text, finText2, finText, ul2, ul, !type, owner);
    removeList(event, type, ul);
  }, finText);
  
  ul.appendChild(li);

  saveList();
  console.log(pending);
}

function getList() {
  const owner = localStorage.getItem(USER_LS);
  let includedPend = localStorage.getItem(PEND_LS);
  let includedFinish = localStorage.getItem(FINISH_LS);

  if(includedPend !== null) {
    includedPend = JSON.parse(includedPend);
    pending = includedPend;
    includedPend = includedPend.filter(function(data) {
      return data.owner === owner;
    })
    pending = pending.filter(function(data) {
      return data.owner !== owner;
    })
    includedPend.forEach(data => {
      addList(data.text, FINISH, RETURN, pendUl, finishUl, true, data.owner);
    })
  }
  if(includedFinish !== null) {
    includedFinish = JSON.parse(includedFinish);
    finish = includedFinish;
    includedFinish = includedFinish.filter(function(data) {
      return data.owner === owner;
    })
    finish = finish.filter(function(data) {
      return data.owner !== owner;
    })
    includedFinish.forEach(data => {
      addList(data.text, RETURN, FINISH, finishUl, pendUl, false, data.owner);
    })
  }

  saveList();
}

function handleSubmit(e) {
  const owner = localStorage.getItem(USER_LS);
  e.preventDefault();
  addList(todoText.value, FINISH, RETURN, pendUl, finishUl, true, owner);
  todoText.value = '';
}

function init() {
  getList();
  todoForm.addEventListener('submit', handleSubmit);
}

init();