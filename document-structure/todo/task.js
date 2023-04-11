const tasksInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');
const btnTasksAdd = document.getElementById('tasks__add');
let localTasksList = JSON.parse(localStorage.getItem('myTasksList'));

if (localTasksList == null || localTasksList == undefined) {
    localStorage.setItem(
        "myTasksList", 
        JSON.stringify([]),
        )
    localTasksList = localStorage.getItem('myTasksList');
} else {
    if (localTasksList.length > 0) {
        localTasksList.forEach(element => {
            tasksList.appendChild(addTask(element));
        });
    }
}

btnTasksAdd.addEventListener('click', (e) => {
    e.preventDefault();
    if (tasksInput.value.trim() !== '') {
        updateLocalStorage(tasksInput.value.trim())
        tasksList.appendChild(addTask(tasksInput.value.trim()));
        tasksInput.value = '';
    };
});

function addTask (taskText) {
    let newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.insertAdjacentHTML('afterBegin',`
    <div class="task__title">${taskText}</div>
    <a href="#" class="task__remove">&times;</a>
    `);
    newTask.addEventListener('click', (e) => {
            if (e.target.classList.contains('task__remove')) {
                updateLocalStorage(e.currentTarget.querySelector('.task__title').textContent)
                e.currentTarget.remove()
            }
        });
    return newTask;
}

function updateLocalStorage (textTask) {
    if (localTasksList.includes(textTask)) {
        localTasksList.splice(localTasksList.indexOf(textTask), 1);
    } else {
        localTasksList.push(textTask);
    };
    localStorage.setItem("myTasksList", JSON.stringify(localTasksList))
}
