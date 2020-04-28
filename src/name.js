const name = container.querySelector('.name-container');
const message = name.querySelector('.welcome-message');
const nameForm = name.querySelector('.name-form');
const input = nameForm.querySelector('input');
const resetBtn = name.querySelector('button');

function setName(text) {
  localStorage.setItem(USER_LS, text);
  getName();
}

function getName() {
  const username = localStorage.getItem(USER_LS);
  if(username === null) {
    nameForm.classList.remove('hide');
    message.classList.add('hide');
    resetBtn.classList.add('hide');
    todo.classList.add('hide');
  }else{
    nameForm.classList.add('hide');
    message.classList.remove('hide');
    resetBtn.classList.remove('hide');
    todo.classList.remove('hide');
    message.innerHTML = `어서오세요 <b>${username}</b>님`
  }
}

function handleReset(event) {
  localStorage.removeItem(USER_LS);
  getName();
  pendUl.innerHTML = '';
  finishUl.innerHTML = '';
}

function handleSubmit(event) {
  event.preventDefault();
  setName(input.value);
  input.value = '';
  clearList();
  getList();
}

function init() {
  nameForm.addEventListener('submit', handleSubmit);
  resetBtn.addEventListener('click', handleReset);
  getName();
}

init();