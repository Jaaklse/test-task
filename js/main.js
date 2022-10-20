const inputTask = document.querySelector('.adding-task-input');
const taskList = document.querySelector('.task-list-checklist');
const form = document.querySelector('.adding-task-form');


let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task) {

    const classCSS = task.done ? "done" : null;
    const taskHTML = `
                <li id="${task.id}" class="task-list-task ${classCSS}">
                    <button class="button button-done" data-action="done">
                        <img class="button-img" src="img/tick.svg" alt="tick">
                    </button>
                    <span class="task-list-text">${task.text}</span>
                    <button class="button button-del" data-action="del">
                        <img class="button-img" src="img/del.svg" alt="cross">
                    </button>
                </li>`
    taskList.insertAdjacentHTML('beforeend', taskHTML);
})

checkEmpty();
form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

function addTask(event) {
    //Отмена отправки формы
    event.preventDefault();

    const textTask = inputTask.value;

    const newTask = {
        id: Date.now(),
        text: textTask,
        done: false,
    };

    tasks.push(newTask)

    const classCSS = newTask.done ? "done" : null;

    const taskHTML = `
                <li id="${newTask.id}" class="task-list-task ${classCSS}">
                    <button class="button button-done" data-action="done">
                        <img class="button-img" src="img/tick.svg" alt="tick">
                    </button>
                    <span class="task-list-text">${newTask.text}</span>
                    <button class="button button-del" data-action="del">
                        <img class="button-img" src="img/del.svg" alt="cross">
                    </button>
                </li>`
    taskList.insertAdjacentHTML('beforeend', taskHTML);

    inputTask.value = "";
    inputTask.focus();

    saveToLS();

    checkEmpty();
}

function checkEmpty() {
    if (tasks.length == 0) {
        const emptyHTML = `
                <li id="empty" class="empty">
                    <img class="empty-img" src="img/smile.png" alt="smile">
                    <span class="emptylist">Задач нет</span>
                </li>`
        taskList.insertAdjacentHTML('afterbegin', emptyHTML);
    } else {
        var emptyEl = document.querySelector('.empty');
        emptyEl ? emptyEl.remove() : null;
    }
    
}

function deleteTask(event) {
    const currentTarget = event.target;
    if (currentTarget.classList.contains("button-del")) {
        const parenNode = currentTarget.parentNode;
        const id = parenNode.id
        //const currentText = parenNode.querySelector('.task-list-text').textContent;
        //tasks.forEach(function(task) {
            //if (task.text == currentText) {
                //tasks.splice(Number(tasks.indexOf(task.text)), 1)
            //} 
        //})
        const index = tasks.findIndex(function(task) {
            return task.id === id;
        })

        tasks.splice(index, 1)

        saveToLS();
    
        parenNode.remove();
        
        checkEmpty();
    };
    
}

function doneTask(event) {
    const currentTarget = event.target;
    if (currentTarget.classList.contains("button-done")) {
        const parenNode = currentTarget.parentNode;
        const currentText = parenNode.querySelector('.task-list-text').textContent;
        tasks.forEach(function(task) {
            if (task.text == currentText) {
                task.done = !task.done
                if (task.done == true) {
                    parenNode.querySelector('.task-list-text').classList.add('done')
                } else {
                    parenNode.querySelector('.task-list-text').classList.remove('done')
                }
            } 
        })
        
        
        saveToLS();
    };
    
}

function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}