const TaskAdd = document.getElementById('addTask');
const TaskList = document.getElementById('listTask');
const InputTask = document.getElementById('inputField');
const errorWindow = document.querySelector('.window');
const errorButton = errorWindow.querySelector('button');

loadTask(); // Завантаження збережених завдань

function taskAdd() {
    const taskNew = InputTask.value.trim(); // Прибирає пробіли
    if (taskNew) {
        createTask(taskNew);
        saveTask();
        InputTask.value = '';
    } else {
        popUpWindow(); // Якщо пусто, то викликаю pop-up вікно
    }
}

TaskAdd.addEventListener('click', taskAdd);

function createTask(taskNew, isCompleted = false) {
    const taskLi = document.createElement('li');

    // Контейнер для тексту завдання
    const taskText = document.createElement('span');
    taskText.textContent = taskNew;
    
    if (isCompleted) {
        taskText.classList.add('completed'); // Додаємо клас, якщо завдання виконане
    }

    const deleteButton = document.createElement('button');
    const completeButton = document.createElement('button');

    deleteButton.textContent = "Видалити";
    completeButton.textContent = "✅";

    deleteButton.className = 'deleteTask';
    completeButton.className = 'completeTask';

    taskLi.appendChild(taskText); // Додаємо лише текст у <li>
    taskLi.appendChild(deleteButton);
    taskLi.appendChild(completeButton);
    TaskList.appendChild(taskLi);
    
    deleteButton.addEventListener('click', function () {
        taskLi.remove();
        saveTask();
    });

    completeButton.addEventListener('click', function() {
        taskText.classList.toggle('completed'); // Закреслюємо лише текст
        saveTask();
    });
}

function saveTask() {
    const myTasks = [];
    TaskList.querySelectorAll('li').forEach(function (item) {
        myTasks.push({
            text: item.firstChild.textContent.trim(),
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('myTasks', JSON.stringify(myTasks));
}
    // Допомога ChatGPT
function loadTask() {
    const myTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    myTasks.forEach(task => createTask(task.text, task.completed));
}
    // Допомога ChatGPT
function popUpWindow() {
    errorWindow.style.display = 'flex';
}
       // Допомога ChatGPT
errorButton.addEventListener('click', function () {
    errorWindow.style.display = 'none';
});
