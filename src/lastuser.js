let memberPending = [],
  memberFinish = [];

function addLi(text) {
  const templi = document.createElement('li');
  templi.innerText = text;

  memberUl.appendChild(templi);
}

function init() {
  memberPending = JSON.parse(localStorage.getItem(PEND_LS));
  memberFinish = JSON.parse(localStorage.getItem(FINISH_LS));

  let allLog = memberPending.concat(memberFinish);
  if(allLog.length === 0){
    addLi('비어있음');
  }
  console.log(allLog);
  allLog.sort((a, b) => {if(a.id===b.id){return 0;} return a.id > b.id ? -1 : 1});
  allLog = allLog.map((val, index) => {
    return val['owner'];
  }).filter((val, index, array) => {
    return array.indexOf(val) === index;
  })
  console.log(allLog);
  allLog.forEach(data => {
    addLi(data);
  })
};

function memberListUpdate() {
  memberUl.innerHTML = '<li class="ul-title"><b>최근 사용자 목록</b></li>';
  init();
}

init();