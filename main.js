const input = document.getElementById('task');
const tasks = document.getElementById('tasks');
const addButton = document.getElementById('add');
const removeButton = document.getElementsByClassName('remove');

addButton.addEventListener('click', addTask);
removeButton.addEventListener('click', removeTask);

function addTask() {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskLi = document.createElement('li');
    taskLi.innerText = input.value;

    const taskButton = document.createElement('button');
    taskButton.className = 'remove';
    taskButton.innerText = '-';

    taskDiv.appendChild(taskLi);
    taskDiv.appendChild(taskButton);
    tasks.appendChild(taskDiv);

    input.value = '';
    
}

function removeTask() {
    const task = this.parentNode;
    const tasks = task.parentNode;
    tasks.removeChild(task);
}


