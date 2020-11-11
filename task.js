showTask();
let addTask = document.querySelector('#addTask');
let addTaskBtn = document.querySelector('#addTaskBtn');

addTaskBtn.addEventListener("click", function(){
    taskValue = addTask.value;
    if(taskValue.trim() != 0){
        let task = sessionStorage.getItem("localTask");
        if(task == null){
            tasks =[];
        }else{
            tasks = JSON.parse(task);
        }
        tasks.push({'taskName':taskValue});
        sessionStorage.setItem("localTask",JSON.stringify(tasks));
        taskValue.value = '';
    }
    showTask();
})

function showTask(){
    let task = sessionStorage.getItem('localTask');
    if(task == null){
        tasks = []
    }else {
        tasks = JSON.parse(task)
    }
    let list = '';
    let addedTaskList = document.querySelector('#addedTaskList');
    tasks.forEach((element,i) => {

        list +=`<tr>
                <th scope="row">${i+1}</th>
                <td>${element.taskName}</td>
                <td><button type="button" onclick="editTask(${i})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                <td><button type="button" onclick="deleteTask(${i})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });

    addedTaskList.innerHTML = list;
}

function editTask(index) {
    let saveIndex = document.querySelector('#saveIndex');
    let addTaskBtn = document.querySelector('#addTaskBtn');
    let saveTaskBtn = document.querySelector('#saveTaskBtn');
    saveIndex.value = index;
    let task = sessionStorage.getItem("localTask");
    let tasks = JSON.parse(task); 
    
    addTask.value = tasks[index]['taskName'];
    addTaskBtn.style.display="none";
    saveTaskBtn.style.display="block";

}



let saveTaskBtn = document.querySelector("#saveTaskBtn");
saveTaskBtn.addEventListener("click", function(){
    let addTaskBtn = document.querySelector("#addTaskBtn");
    let task = sessionStorage.getItem("localTask");
    let tasks = JSON.parse(task); 
    let saveIndex = document.querySelector("#saveIndex").value;
    
    for (keys in tasks[saveIndex]) {
        if(keys == 'taskName'){
            tasks[saveIndex].taskName = addTask.value;
        }
      }
    
    saveTaskBtn.style.display="none";
    addTaskBtn.style.display="block";
    sessionStorage.setItem("localTask", JSON.stringify(tasks));
    addTask.value='';
    showTask();
})

function deleteTask(index){
    let task = sessionStorage.getItem("localTask");
    let tasks = JSON.parse(task);
    tasks.splice(index, 1);
    sessionStorage.setItem("localTask", JSON.stringify(tasks));
    showTask();
}