document.addEventListener("DOMContentLoaded", getMaterials);
document.addEventListener("DOMContentLoaded",  getAssignments);
document.addEventListener("DOMContentLoaded",  getLink);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('class_id');
const token_value = localStorage.getItem("token_value");
let assignmentsArray = [];
let materialsArray =[];
function getMaterials() {
    fetch(`http://127.0.0.1/Google-Classroom-Clone_Backend/get-class-materials.php?class_id=${id}`, {
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
  const materialsList = document.getElementById("posts");
  materialsList.innerHTML = "";
  materialsArray.forEach((class_material) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <a href="./materialClass.html" class="link">
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

function getAssignments() {
    fetch(`http://127.0.0.1/Google-Classroom-Clone_Backend/get-class-assignments.php?class_id=${id}`, {
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
    const assignmentsList = document.getElementById("posts");
    assignmentsList.innerHTML += "";
    assignmentsArray.forEach((assignment) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <a href="./assignmentClass.html" class="link">
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

const title = document.getElementById("post-title").value;
const description = document.getElementById("post-description").value;
const due_date = document.getElementById("post-due-date").value;
const due_time = document.getElementById("post-due-time").value;
let cancel = document.getElementById('cancel');
let post = document.getElementById('post');

cancel.addEventListener('click', function (){
    postText.value = '';
});

function post(){
    //console.log(due_time)
}

function getLink(){
    fetch(`http://localhost/Google-Classroom-Clone_Backend/get-class-google-meet.php?class_id=${id}`, {
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
        linksArray = class_link;
        if(class_link.status!="0"){
            console.log("what " + class_link.meet_link)
            document.getElementById("join").href = `https://meet.google.com/${class_link.meet_link}`;
        } else {
                console.log(class_link.error);
        }
         
      })
      .catch((error) => console.log(error))
}