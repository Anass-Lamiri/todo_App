
let input = document.getElementById('text_input');
let btn = document.getElementById('add');


input.addEventListener("keypress",function(event){
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById('add').click()
    }
})

// check if there is any data in localStorage and display it
let arr;
if (localStorage.tasks != null) {
    arr = JSON.parse(localStorage.tasks);
    showData()
}else {
    arr = [];
}
// on input field
input.onclick = function() {
    elemStyle()
}

// Storing data && displaying the data in the UI
btn.onclick = function() {
    if (input.value != "" && input.value != " ") {
        let newTask = {
            text:input.value 
        }
        arr.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(arr) ) 
        
        showData()
        clearData()
    }else {
        return false
    }

}

// creating the input data
function showData() {
    let task = ''
    for(let i=0;i<arr.length;i++) {
        task += `<span class="task_list task_list${i}">
            <p class="pa${i}">${arr[i].text}</p>
            <div class="edit_dlt">
                <img src="/img/edit.png" onclick='editData(${i})' id="edit_btn${i}" class="edit" alt="edit">
                <img src="/img/delete_icon.png" class="delete" onclick='deleteData(${i})'alt="delete">
                <img src="/img/icon.svg" class="svg" id="end-editing${i}">
            </div>
        </span>`
    }
    document.getElementById('tasks').innerHTML = task;
    
}

function clearData() {
    input.value = ""
}


// delete the data from the UI and localStorage
function deleteData(i) {
    arr.splice(i,1)
    localStorage.tasks = JSON.stringify(arr)
    showData()
}


function elemStyle() {

    input.style.color = 'black';

} 


function editData(i) {

    let pa = document.querySelector(`.pa${i}`)
    let task_list = document.querySelector(`.task_list${i}`)

    let edit_btn = document.getElementById(`edit_btn${i}`);
    let end_button = document.getElementById(`end-editing${i}`);
    let done_btn = document.querySelector(`.svg`);


    edit_btn.addEventListener("click", function() {
        console.log("o");
        pa.contentEditable = true;
        pa.style.width = '50%'
        task_list.style.backgroundColor = "#dddbdb";
    });
    end_button.addEventListener("click", function() {
        pa.contentEditable = false;
        task_list.style.backgroundColor = "#fff";

        arr[i].text = pa.innerHTML
        localStorage.tasks = JSON.stringify(arr)
        console.log(pa.innerHTML);
    })
}

