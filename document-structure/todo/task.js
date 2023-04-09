const tasksInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');
const btnTasksAdd = document.getElementById('tasks__add');
let localTasksList = JSON.parse(localStorage.getItem('myTasksList'));

if (localTasksList == null || localTasksList == undefined) {
    localStorage.setItem(
        "myTasksList", 
        JSON.stringify({
            "tasks": []
        })
    )
    localTasksList = JSON.parse(localStorage.getItem('myTasksList'));
} else {
    localTasksList["tasks"].forEach(element => {
        tasksList.appendChild(addTask(element['textTask'], element['dateTask']));
    });
}

tasksInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && tasksInput.value.trim() !== '') {
        let dateCreateTask = new Date()
        addTaskInLocalStorage(tasksInput.value.trim(), dateCreateTask)
        tasksList.appendChild(addTask(tasksInput.value.trim(), dateCreateTask));
        tasksInput.value = '';
    };
});

btnTasksAdd.addEventListener('click', (e) => {
    e.preventDefault();
    if (tasksInput.value.trim() !== '') {
        let dateCreateTask = new Date()
        addTaskInLocalStorage(tasksInput.value.trim(), dateCreateTask)
        tasksList.appendChild(addTask(tasksInput.value.trim(), dateCreateTask));
        tasksInput.value = '';
    };
});

function addTask (taskText, dateTask) {
    let newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.dataset.dateTask = dateTask;
    newTask.insertAdjacentHTML('afterBegin',`
    <div class="task__title">${taskText}</div>
    <a href="#" class="task__remove">&times;</a>
    `);
    newTask.addEventListener('click', (e) => {
            if (e.target.classList.contains('task__remove')) {
                deleteTaskInLocalStorage(e.currentTarget.dataset.dateTask)
                e.currentTarget.remove()
            }
        });
    return newTask;
}

function addTaskInLocalStorage (textTask, dateTask) {
    localTasksList["tasks"].push({"textTask": textTask, "dateTask": dateTask});
    localStorage.setItem("myTasksList", JSON.stringify(localTasksList))
}

function deleteTaskInLocalStorage (dateTask) {
    localTasksList["tasks"].every((el, i) => {
        if (el["dateTask"] == dateTask) {
            localTasksList["tasks"].splice(i,1);
            return false;
        } else {
            return true;
        }
    });
    localStorage.setItem("myTasksList", JSON.stringify(localTasksList))
}