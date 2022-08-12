let btnAddTaskEl = document.querySelector('button')
let taskNameEl = document.querySelector('#content')

let tasks = getTaskFromLocalStorage()

renderTask(tasks)

btnAddTaskEl.addEventListener('click',function(){
    if (!taskNameEl.value){
        alert('Vui long nhap ten cong viec')
        return false
    }
    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let task = {name: taskNameEl.value}

    if (taskId == 0 || taskId){
        tasks[taskId] = task
        this.removeAttribute('id')
    }else{
        tasks.push(task)
        
    }
    
    
    // tasks.push({name: taskNameEl.value})

    taskNameEl.value = ' '

    localStorage.setItem ('tasks', JSON.stringify(tasks))
    
    renderTask(tasks)
});
function editTask(id){
    let tasks = getTaskFromLocalStorage()

    if (tasks.length > 0){
        tasks[id]
        taskNameEl.value = tasks [id].name
        btnAddTaskEl.setAttribute('id',id)
    }
}
function deleteTask(id){
    if (confirm('Ban co thuc su muon xoa ko?')){
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(getTaskFromLocalStorage())
    }
}
function renderTask(tasks = []){
    let content = '<ul>'

    tasks.forEach((task, index)=>{
        content += `<li> 
            <div class="task-name">${task.name}</div>
            <a href="#" onclick = "editTask(${index})">Sua</a>
            <a href="#" onclick = "deleteTask(${index})">Xoa</a>
        </li>`
    })

    content += '</ul>'
    document.querySelector('#result').innerHTML = content;
}
function getTaskFromLocalStorage(){
    return localStorage.getItem('tasks') ? JSON.parse (localStorage.getItem('tasks')) : []
}