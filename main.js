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
const timer = document.getElementById('time');
const inputHours = document.getElementById('inputHours');
const buttonHours = document.getElementById('addHours');
const inputTaskDiv = document.getElementById('inputTaskDiv');
const listTasks = document.getElementById('SectionTasks');

let counter = 0;
let currentActualTask = null; // Variable para almacenar la tarea actual
let isTaskAdded = false; // Bandera para rastrear si hay una tarea actual
const startingMinutes = 25;
const breakMinutes = 5;
let time = startingMinutes * 60;
let breakTime = breakMinutes * 60;
let interval;
let isBreakActive = false;

Sortable.create(listTasks, {
  animation: 150,
  chosenClass: "selected",
  dragClass: "drag",
});

function addHours() {
  const hours = parseInt(inputHours.value);
  const hoursElement = document.createElement('div');
  hoursElement.className = 'hoursAmount';
  hoursElement.innerText = hours;
  const containerHours = document.getElementById('containerHours');
  containerHours.appendChild(hoursElement);
  inputHours.style.display = "none";
  buttonHours.style.display = "none";
  inputTaskDiv.style.display = "flex";
}


buttonHours.addEventListener('click', addHours);
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

function subtractHours(hoursElement) {
  const currentHours = parseFloat(hoursElement.innerText);
  if (currentHours > 0) {
    const updatedHours = currentHours - 0.5;
    hoursElement.innerText = updatedHours;
    return true;
  }
  return false;
}

function createTaskElement(inputValue, taskId) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.id = 'task' + taskId;

  const taskLi = document.createElement('li');
  taskLi.className = 'taskText' + taskId;
  taskLi.innerText = inputValue;

  return { taskDiv, taskLi };
}

function createTaskButton(counter, callback) {
  const taskButton = document.createElement('button');
  taskButton.className = 'remove' + counter;
  taskButton.innerText = '-';
  taskButton.addEventListener('click', callback);

  return taskButton;
}

function createEditButton(counter, callback) {
  const editButton = document.createElement('button');
  editButton.className = 'edit' + counter;
  editButton.innerText = '*';
  editButton.addEventListener('click', callback);

  return editButton;
}

function createSaveButton(taskId) {
  const saveButton = document.createElement('button');
  saveButton.className = 'saveButton';
  saveButton.id = 'saveButton';
  saveButton.innerText = 'Save';
  saveButton.addEventListener('click', function () {
    const taskText = this.closest('.taskText' + taskId);
    taskText.innerText = inputEdit.value;
    saveButton.remove();
    inputEdit.remove();
  });

  return saveButton;
}

function createAddToActualButton(counter, callback) {
  const addToActualButton = document.createElement('button');
  addToActualButton.className = 'addToActual' + counter;
  addToActualButton.innerText = '^';
  addToActualButton.addEventListener('click', callback);

  return addToActualButton;
}

function handleTaskButtonClick() {
  const contenedorPadre = this.closest('.task');
  contenedorPadre.remove();
  const hoursElement = document.querySelector('.hoursAmount');
  subtractHours(hoursElement);
}

function handleEditButtonClick() {
  const contenedorPadre = this.closest('.task');
  const taskId = parseInt(contenedorPadre.id.replace('task', ''));
  const taskText = contenedorPadre.getElementsByClassName('taskText' + taskId)[0];
  const inputEdit = document.createElement('input');
  inputEdit.className = 'inputEdit';
  inputEdit.type = 'text';
  inputEdit.value = taskText.innerText;
  taskText.innerText = '';
  taskText.appendChild(inputEdit);

  const saveButton = createSaveButton(taskId);
  taskText.appendChild(saveButton);
}

function handleAddToActualButtonClick() {
  if (!isTaskAdded) {
    const contenedorPadre = this.closest('.task');
    const taskId = parseInt(contenedorPadre.id.replace('task', ''));
    const taskText = contenedorPadre.getElementsByClassName('taskText' + taskId)[0];

    const actualTaskDiv = createActualTaskElement(taskText.innerText);

    actualTasksDiv.appendChild(actualTaskDiv);
    currentActualTask = actualTaskDiv;
    isTaskAdded = true;
  }
}

function createActualTaskElement(taskText) {
  const actualTaskDiv = document.createElement('div');
  actualTaskDiv.className = 'actualTaskContainer';

  const actualTaskLi = document.createElement('li');
  actualTaskLi.className = 'actualTaskText';
  actualTaskLi.innerText = taskText;

  const actualTaskButton = document.createElement('button');
  actualTaskButton.className = 'removeActual';
  actualTaskButton.innerText = '-';
  actualTaskButton.addEventListener('click', function () {
    const contenedorPadre = this.closest('.actualTaskContainer');
    contenedorPadre.remove();
    isTaskAdded = false;
  });

  actualTaskDiv.appendChild(actualTaskLi);
  actualTaskDiv.appendChild(actualTaskButton);

  return actualTaskDiv;
}

function addTaskPendt() {
  const hoursElement = document.querySelector('.hoursAmount');
  if (subtractHours(hoursElement)) {
    const taskElement = createTaskElement(input.value, counter);
    const taskButton = createTaskButton(counter, handleTaskButtonClick);
    const editButton = createEditButton(counter, handleEditButtonClick);
    const addToActualButton = createAddToActualButton(counter, handleAddToActualButtonClick);

    taskElement.taskDiv.appendChild(taskElement.taskLi);
    taskElement.taskDiv.appendChild(taskButton);
    taskElement.taskDiv.appendChild(editButton);
    taskElement.taskDiv.appendChild(addToActualButton);
    tasks.appendChild(taskElement.taskDiv);

    input.value = '';
    counter++;
  } else {
    alert("No tienes horas suficientes para agregar más tareas");
  }
}

function setupEventListeners() {
  addButton.addEventListener('click', addTaskPendt);
}

function initializeApp() {
  initializeElements();
  setup
}