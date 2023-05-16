const input = document.getElementById('inputTask');
const tasks = document.getElementById('SectionTasks');
const addButton = document.getElementById('add');
const removeButtons = document.getElementsByClassName('remove');
const addButtons = document.getElementsByClassName('task')
let counter = 1;



addButton.addEventListener('click', addTask);



function addTask() {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = 'task' + counter;

    const taskLi = document.createElement('li');
    taskLi.className = 'taskText' + counter;
    taskLi.innerText = input.value;

    const taskButton = document.createElement('button');
    taskButton.className = 'remove' + counter;
    taskButton.innerText = '-';
    taskButton.addEventListener('click', function() {
        const contenedorPadre = this.closest('.task');
        contenedorPadre.remove();
      });

    const editButton = document.createElement('button');
    editButton.className = 'edit' + counter;
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', function() {
      const hermanoLi = this.previousSibling;
      
    });


    taskDiv.appendChild(taskLi);
    taskDiv.appendChild(taskButton);
    taskDiv.appendChild(editButton);  
    tasks.appendChild(taskDiv);

    input.value = '';
    counter++;
}



