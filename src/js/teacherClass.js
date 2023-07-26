document.addEventListener("DOMContentLoaded", getMaterials);
document.addEventListener("DOMContentLoaded",  getAssignments);
document.addEventListener("DOMContentLoaded",  getLink);

const urlParams = new URLSearchParams(window.location.search);
const class_id = localStorage.getItem('class_id');
const teacher_id = localStorage.getItem("id");
const token_value = localStorage.getItem("token_value");
console.log(localStorage.getItem('token_value'));
let assignmentsArray = [];
let materialsArray =[];
function getMaterials() {
    fetch(`http://127.0.0.1/Google-Classroom-Clone_Backend/get-class-materials.php?class_id=${class_id}`, {
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://127.0.0.1:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token_value":token_value
        })
    })
    .then((response) => response.json())
    .then((materials) => {
        materialsArray = materials;
            if(materialsArray.status!="0"){
                displayMaterials()
            } else {
               console.log(materialsArray.error);
            }
    })
    .catch((error) => console.log(error))
}

function displayMaterials() {
  const materialsList = document.getElementById("postsM");
  materialsList.innerHTML = "";
  materialsArray.forEach((class_material) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <a href="./materialClass.html" class="link" onclick="getMaterialId(${class_material.material_id})" class="link">
        <div class="post flex font-google-sans bold pointer">
            <div class="post-left flex">
                <div class="material flex">
                    <div class="circle flex">
                        <svg class="material-icon" focusable="false" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="post-description flex-column">
                    <div class="post-title">
                    ${class_material.first_name} ${class_material.last_name} posted a new material: ${class_material.title}
                    </div>
                    
                    <div class="post-date">
                        ${class_material.date_of_upload}
                    </div>
                </div>
            </div>

            <div class="post-right flex">
                <div class="post-copy-link flex">
                    <div class="copy-link-circles flex-column">
                        <div class="google-apps-circle"></div>
                        
                        <div class="google-apps-circle"></div>
                
                        <div class="google-apps-circle"></div>
                    </div>
                </div>
            </div>
        </div>
    
    `;
    materialsList.appendChild(listItem)
  })

}

function getMaterialId (material_id) {
    //console.log("the captain: " + class_id);
    localStorage.setItem("material_id", material_id);
    console.log('material_id: ' + localStorage.getItem("material_id"));
}

function getAssignmentId (assignment_id) {
    //console.log("the captain: " + class_id);
    localStorage.setItem("assignment_id", assignment_id);
    console.log('assignment_id: ' + localStorage.getItem("assignment_id"));
}

function getAssignments() {
    fetch(`http://127.0.0.1/Google-Classroom-Clone_Backend/get-class-assignments.php?class_id=${class_id}`, {
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://127.0.0.1:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token_value":token_value
        })
    })
    .then((response) => response.json())
    .then((assignments) => {
        assignmentsArray = assignments;
            if(assignments.status!="0"){
                displayAssignments()
            } else {
               console.log(assignments.error);
            }
    })
    .catch((error) => console.log(error))
}
  
function displayAssignments() {
    const assignmentsList = document.getElementById("postsA");
    assignmentsList.innerHTML += "";
    assignmentsArray.forEach((assignment) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <a href="./assignmentClass.html" class="link" onclick="getAssignmentId(${assignment.assignment_id})">
        <div class="post flex font-google-sans bold pointer">
            <div class="post-left flex">
                <div class="material flex">
                    <div class="circle flex">
                        <svg class="material-icon" focusable="false" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="post-description flex-column">
                    <div class="post-title">
                    ${assignment.first_name} ${assignment.last_name} posted a new assignment: ${assignment.title}
                    </div>
                    
                    <div class="post-date">
                        ${assignment.date_of_upload}
                    </div>
                </div>
            </div>
    
            <div class="post-right flex">
                <div class="post-copy-link flex">
                    <div class="copy-link-circles flex-column">
                        <div class="google-apps-circle"></div>
                        
                        <div class="google-apps-circle"></div>
                
                        <div class="google-apps-circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </a>
    `;
    assignmentsList.appendChild(listItem)
    })
  
}

document.getElementById('announce').addEventListener('onclick', openPost());

function openPost() {

}

const textarea = document.getElementById('postText');

function focus() {
  textarea.classList.add('focus');
}

let cancel = document.getElementById('cancel');
let post = document.getElementById('post');

// function cancelInfo(){
//     console.log('osta');
//     title = '';
//     console.log(title)
//     description = '';
//     due_date = '';
//     due_time = '';
// }


let title, description, due_date, due_time;
function posting(){
     title = document.getElementById("post-title").value;
     description = document.getElementById("post-description").value;
     due_date = document.getElementById("post-due-date").value;
     due_time = document.getElementById("post-due-time").value;

     if(due_date != '' && due_time !=''){
        fetch(`http://localhost/Google-Classroom-Clone_Backend/add-assignment.php?`, {
            method: "POST",
            mode: 'cors',
            cache: "no-cache",
            origin: "http://localhost:5500",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token_value":token_value,
                "class_id": class_id,
                "teacher_id": teacher_id,
                "title": title,
                "description": description,
                "due_date": due_date, 
                "due_time": due_time
            })
            
        })
        .then((response) => response.json())
        .then((add_assignment) => {
            //assignmentsArray = add_assignment;
            if(add_assignment.status!="0"){
                location.reload();
            } else {
                    console.log(add_assignment.error);    
            }
            
        })
        .catch((error) => console.log(error))
    } 
    else if(due_date == '' && due_time ==''){
        fetch(`http://localhost/Google-Classroom-Clone_Backend/add-material.php?`, {
            method: "POST",
            mode: 'cors',
            cache: "no-cache",
            origin: "http://localhost:5500",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token_value":token_value,
                "class_id": class_id,
                "teacher_id": teacher_id,
                "title": title,
                "description": description
            })
            
        })
        .then((response) => response.json())
        .then((add_material) => {
            //assignmentsArray = add_assignment;
            if(add_material.status!="0"){
                location.reload();
            } else {
                    console.log(add_material.error);    
            }
        })
        .catch((error) => console.log(error))
    }
 }

function getLink(){
    fetch(`http://localhost/Google-Classroom-Clone_Backend/get-class-google-meet.php?class_id=${class_id}`, {
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://localhost:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token_value":token_value
        })
        
    })
      .then((response) => response.json())
      .then((class_link) => {
        //linksArray = class_link;
        if(class_link.status!="0"){
            console.log("what " + class_link.meet_link)
            document.getElementById("join").href = `https://meet.google.com/${class_link.meet_link}`;
        } else {
                console.log(class_link.error);
        }
         
      })
      .catch((error) => console.log(error))
}