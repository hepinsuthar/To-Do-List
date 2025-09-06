let inputs = document.querySelector('input');
let btn = document.querySelector('button');
let taskList = document.getElementById('task-list');
let task = [];

// Load from localStorage
let localstoragedata = localStorage.getItem("task array");
if (localstoragedata) {
    task = JSON.parse(localstoragedata);
    maketodo();
}

// Add new task
btn.addEventListener("click", function () {
    let query = inputs.value.trim();
    inputs.value = "";
    if (query === "") {
        alert("No value entered");
        return;
    }

    let taskObj = { id: Date.now(), text: query };
    task.push(taskObj);
    localStorage.setItem("task array", JSON.stringify(task));
    maketodo();
});

function maketodo() {
    taskList.innerHTML = "";
    task.forEach(({ id, text }) => {
        let element = document.createElement('div');
        element.classList.add('todo');
        element.innerHTML = `
            <span class="task" contenteditable="false">${text}</span>
            <button class="edit">Edit</button>
            <span class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                </svg>
            </span>
        `;

        let delbtn = element.querySelector('.delete');
        let editbtn = element.querySelector('.edit');
        let taskText = element.querySelector('.task');

        // Delete Task
        delbtn.addEventListener("click", () => {
            task = task.filter(taskobj => taskobj.id !== id);
            localStorage.setItem("task array", JSON.stringify(task));
            taskList.removeChild(element);
        });

        // Edit Task
        editbtn.addEventListener("click", () => {
            if (!taskText.isContentEditable) {
                taskText.setAttribute('contenteditable', 'true');
                taskText.focus();
                editbtn.innerText = "Save";
            } else {
                taskText.setAttribute('contenteditable', 'false');
                let updatedText = taskText.innerText.trim();
                if (updatedText !== "") {
                    task = task.map(taskobj =>
                        taskobj.id === id ? { ...taskobj, text: updatedText } : taskobj
                    );
                    localStorage.setItem("task array", JSON.stringify(task));
                }
                editbtn.innerText = "Edit";
            }
        });

        taskList.appendChild(element);
    });
}
