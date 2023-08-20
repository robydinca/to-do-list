const input = document.getElementById('inputTask');
const tasks = document.getElementById('SectionTasks');
const addButton = document.getElementById('add');
const removeButtons = document.getElementsByClassName('remove');
const addButtons = document.getElementsByClassName('task')
const actualTasksDiv = document.getElementById('actualTask');
const countdownEl = document.getElementById('countdown');
const countdownBreakEl = document.getElementById('countdownBreak')
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const startBreakButton = document.getElementById('startBreak');
const timeBreak = document.getElementById('timeBreak')
const timer = document.getElementById('time')
let counter = 0;
let currentActualTask = null; // Variable para almacenar la tarea actual
let isTaskAdded = false; // Bandera para rastrear si hay una tarea actual

const startingMinutes = 25;
const breakMinutes = 5;
let time = startingMinutes * 60;
let breakTime = breakMinutes * 60;
let interval;
let isBreakActive = false;

startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
startBreakButton.addEventListener('click', startBreakCountdown);

function startCountdown() {
    interval = setInterval(updateCountdown, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function startBreakCountdown() {
  interval = setInterval(updateBreakCountdown, 1000);
}

function pauseCountdown() {
  clearInterval(interval);
  startButton.disabled = false;
  pauseButton.disabled = true;

}

function updateBreakCountdown() {
  if (breakTime <= 0) {
    clearInterval(interval);
    timeBreak.style.display = "none";
    timer.style.display = "flex";
    countdownBreakEl.innerHTML = `${breakMinutes}:00`;
    return;
  }

  const minutesB = Math.floor(breakTime / 60);
  let secondsB = breakTime % 60;
  secondsB = secondsB < 10 ? '0' + secondsB : secondsB;
  countdownBreakEl.innerHTML = `${minutesB}:${secondsB}`;
  breakTime--;

}

function updateCountdown() {
  if (time <= 0) {
    clearInterval(interval);
    startButton.disabled = false;
    pauseButton.disabled = true;
    alert("Tomate un breve descando, to tu polla ere un makina illo");
    resetCountdown();
    timeBreak.style.display = "flex";
    timer.style.display = "none"; 
    return;
  }

  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countdownEl.innerHTML = `${minutes}:${seconds}`;
  time--;
  
}

function resetCountdown() {
  time = startingMinutes * 60;
  countdownEl.innerHTML = `${startingMinutes}:00`;
}


addButton.addEventListener('click', addTaskPendt);


function addTaskPendt() {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = 'task' + counter;

    const taskLi = document.createElement('li');
    taskLi.className = 'taskText' + counter;
    taskLi.innerText = counter + ". " + input.value;

    const taskButton = document.createElement('button');
    taskButton.className = 'remove' + counter;
    taskButton.innerText = '-';
    taskButton.addEventListener('click', function() {
        const contenedorPadre = this.closest('.task');
        contenedorPadre.remove();
      });

    const editButton = document.createElement('button');
    editButton.className = 'edit' + counter;
    editButton.innerText = '*';
    
    editButton.addEventListener('click', function() {
      const contenedorPadre = this.closest('.task');
      const taskId = parseInt(contenedorPadre.id.replace('task', '')); // Obtiene el valor de counter desde el ID
      const taskText = contenedorPadre.getElementsByClassName('taskText' + taskId)[0];
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = taskText.innerText;
      taskText.innerText = '';
      taskText.appendChild(inputEdit);
      const saveButton = document.createElement('button');
      saveButton.innerText = 'Guardar';
      saveButton.addEventListener('click', function() {
          taskText.innerText = inputEdit.value;
          saveButton.remove();
          inputEdit.remove();
      });
      taskText.appendChild(saveButton);
  });

  const addToActualButton = document.createElement('button');
  addToActualButton.className = 'addToActual' + counter;
  addToActualButton.innerText = '^';

  addToActualButton.addEventListener('click', function() {
    if (!isTaskAdded) {
      const contenedorPadre = this.closest('.task');
      const taskId = parseInt(contenedorPadre.id.replace('task', '')); // Obtiene el valor de counter desde el ID
      const taskText = contenedorPadre.getElementsByClassName('taskText' + taskId)[0];
  
      const actualTaskDiv = document.createElement('div');
      actualTaskDiv.className = 'actualTaskContainer';
  
      const actualTaskLi = document.createElement('li');
      actualTaskLi.className = 'actualTaskText';
      actualTaskLi.innerText = taskText.innerText;
  
      const actualTaskButton = document.createElement('button');
      actualTaskButton.className = 'removeActual';
      actualTaskButton.innerText = '-';
      actualTaskButton.addEventListener('click', function() {
        const contenedorPadre = this.closest('.actualTaskContainer');
        contenedorPadre.remove();
        isTaskAdded = false; // Habilitar la opción de agregar una nueva tarea
      });
  

  
      actualTaskDiv.appendChild(actualTaskLi);
      actualTaskDiv.appendChild(actualTaskButton);
      actualTasksDiv.appendChild(actualTaskDiv);
  
      // Guardamos la tarea actual en la variable y deshabilitamos la opción de agregar una nueva tarea
      currentActualTask = actualTaskDiv;
      isTaskAdded = true;
    }
  });



    taskDiv.appendChild(taskLi);
    taskDiv.appendChild(taskButton);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(addToActualButton);
    tasks.appendChild(taskDiv);

    input.value = '';
    counter++;

}



