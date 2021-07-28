// timers
const poTimer = 25;
const sbTimer = 5;
const lbTimer = 15;
// buttons header
let pomodoro = document.getElementById("btn1");
let shortBreak = document.getElementById("btn2");
let longBreak = document.getElementById("btn3");
// timer
let timer = document.getElementById("timer");
let start = document.getElementById("btnStart");
let stop = document.getElementById("btnStop");
// Get Elements
let section = document.querySelector("section");
let body = document.querySelector("body");
let quote = document.querySelector(".quote");
let alarm = document.querySelector("audio#audio2");
let roundEl = document.querySelector(".round");
let pomos = document.querySelector(".pomos");
// round
let round = 0;
let pomosTime = 0;
// check if item exists in localStorage
if (localStorage.getItem("data")) {
  var data = localStorage.getItem("data");
  data = JSON.parse(data);

  round = data.round;
  pomosTime = data.pomosTime;

  roundEl.innerHTML = round;
  pomos.innerHTML = pomosTime;
} else {
  var data = {
    "round": round,
    "pomosTime": pomosTime
  };

  localStorage.setItem("data", JSON.stringify(data));
}
// quotes

let array = [
  "You become what you study",
  "Infinitely And Beyond",
  "study well become great",
  "Do one pomodoro today better than nothing",
  "let's work hard",
  `Don't stop</br>Don't give up`
];
let i = Math.floor(Math.random() * array.length);
quote.innerHTML = array[i];

// functions

function update_data(type, value) {

  var data = localStorage.getItem("data");
  data = JSON.parse(data);

  if (type == "round") {
    data.round = value;
    localStorage.setItem("data", JSON.stringify(data));
  } else if (type == "pomosTime") {
    data.pomosTime = value;
    localStorage.setItem("data", JSON.stringify(data));
  }
}

pomodoro.onclick = function() {

  if (pomodoro.classList.contains("active")) {
  } else {
    body.style.backgroundColor = "var(--pomodoro)";
    pomodoro.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");
    start.style.color = "var(--pomodoro)";
    stop.style.color = "var(--pomodoro)";
    section.style.backgroundColor = "var(--po)";
    clearInterval(interval);
    setTimeout(function() {
      start.style.display = "block";
    }, 500);
    setTimeout(function() {
      stop.style.display = "none";
    }, 501);
    quote.innerHTML = array[i];
    timer.innerHTML = "25:00";
  }

}

shortBreak.onclick = function() {

  if (shortBreak.classList.contains("active")) {
  } else {
    body.style.backgroundColor = "var(--short-break)";
    pomodoro.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
    start.style.color = "var(--short-break)";
    stop.style.color = "var(--short-break)";
    section.style.backgroundColor = "var(--sb)";
    clearInterval(interval);
    setTimeout(function() {
      start.style.display = "block";
    }, 500);
    setTimeout(function() {
      stop.style.display = "none";
    }, 501);
    timer.innerHTML = "05:00";
    quote.innerHTML = "Good still working 💪";
  }

}

longBreak.onclick = function() {

  if (longBreak.classList.contains("active")) {
  } else {
    body.style.backgroundColor = "var(--long-break)";
    pomodoro.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");
    start.style.color = "var(--long-break)";
    stop.style.color = "var(--long-break)";
    section.style.backgroundColor = "var(--lb)";
    clearInterval(interval);
    setTimeout(function() {
      start.style.display = "block";
    }, 500);
    setTimeout(function() {
      stop.style.display = "none";
    }, 501);
    timer.innerHTML = "15:00";
    quote.innerHTML = "You deserve that 🤩"
  }

}

var interval;

start.onclick = function startTimer() {
  
  setTimeout(function() {
    start.style.display = "none";
  }, 500);
  setTimeout(function() {
    stop.style.display = "block";
  }, 501);
  
  let audio = document.querySelector("audio");
  audio.play();
  
  if (pomodoro.classList.contains("active")) {
    let time = poTimer * 60;
    
    interval = setInterval(function() {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      
      timer.innerHTML = `${minutes}:${seconds}`;
      
      if (time > 0) {
        time -= 1;
      } else {
          pomodoro.classList.remove("active");
          clearInterval(interval);
          alarm.play();
          setTimeout(function() {
            start.style.display = "block";
          }, 500);
          setTimeout(function() {
            stop.style.display = "none";
          }, 501);
          round++;
          update_data("round", round);
          roundEl.innerHTML = round;
          pomosTime = Math.round(poTimer * round);
          update_data("pomosTime", pomosTime);
          pomos.innerHTML = pomosTime;
        if (round === 4 || round === 8 || round === 12 || round === 16) {
          longBreak.classList.add("active");
          body.style.backgroundColor = "var(--long-break)";
          start.style.color = "var(--long-break)";
          stop.style.color = "var(--long-break)";
          section.style.backgroundColor = "var(--lb)";
          timer.innerHTML = "15:00";
        } else {
          shortBreak.classList.add("active");
          body.style.backgroundColor = "var(--short-break)";
          start.style.color = "var(--short-break)";
          stop.style.color = "var(--short-break)";
          section.style.backgroundColor = "var(--sb)";
          timer.innerHTML = "05:00";
        }
      }
    }, 1000);
  } else if (shortBreak.classList.contains("active")) {

      let time = sbTimer * 60;
      
      interval = setInterval(function() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
        
        timer.innerHTML = `${minutes}:${seconds}`;
      
        if (time > 0) {
          time -= 1;
        } else {
            shortBreak.classList.remove("active");
            pomodoro.classList.add("active");
            body.style.backgroundColor = "var(--pomodoro)";
            start.style.color = "var(--pomodoro)";
            stop.style.color = "var(--pomodoro)";
            section.style.backgroundColor = "var(--po)";
            clearInterval(interval);
            timer.innerHTML = "25:00";
            alarm.play();
            setTimeout(function() {
              start.style.display = "block";
            }, 500);
            setTimeout(function() {
              stop.style.display = "none";
            }, 501);
        }
      }, 1000);

  } else {
      let time = lbTimer * 60;
      
      interval = setInterval(function() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        
        timer.innerHTML = `${minutes}:${seconds}`;
      
        if (time > 0) {
          time -= 1;
        } else {
            longBreak.classList.remove("active");
            pomodoro.classList.add("active");
            body.style.backgroundColor = "var(---pomodoro)";
            start.style.color = "var(--pomodoro)";
            stop.style.color = "var(--pomodoro)";
            section.style.backgroundColor = "var(--po)";
            clearInterval(interval);
            timer.innerHTML = "25:00";
            alarm.play();
            
            setTimeout(function() {
              start.style.display = "block";
            }, 500);
              setTimeout(function() {
            stop.style.display = "none";
            }, 501);
        }
      }, 1000);
  }
}

stop.onclick = function stopTimer() {
  
  setTimeout(function() {
    start.style.display = "block";
  }, 500);
  setTimeout(function() {
    stop.style.display = "none";
  }, 501);
  
  let audio = document.querySelector("audio#audio1");
  audio.play();
  
  clearInterval(interval);
}
// problems

/*
  - record pomodoros
      -- after 4 pomodors long break
  // i can do it
  - quote under timer

  // Done
  - responsive
  - reset timer
  - sound on click
*/
