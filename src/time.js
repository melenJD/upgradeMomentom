const container = document.querySelector('.container');
const time = container.querySelector('.time-container');
const h1 = time.querySelector('h1');

function updateTime() {
  h1.innerText = getTime();
}

function getTime() {
  const nowtime = new Date();
  const hour = nowtime.getHours();
  const minute = nowtime.getMinutes();
  const second = nowtime.getSeconds();
  return `${hour < 10 ? `0${hour}`:`${hour}`
  }:${minute < 10 ? `0${minute}`:`${minute}`
  }:${second < 10 ? `0${second}`:`${second}`}`
}

function init() {
  updateTime();
  setInterval(updateTime, 1000);
}

init();