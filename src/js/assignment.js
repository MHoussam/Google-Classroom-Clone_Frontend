document.addEventListener("DOMContentLoaded", getAssignment);

const assignment_id = localStorage.getItem("assignment_id");

const class_id = localStorage.getItem("class_id");
const token_value = localStorage.getItem("token_value");
// const getClassesFromID = {
//   material_id: material_id
// };

function getAssignment() {
  console.log(assignment_id);
  fetch(`http://localhost/Google-Classroom-Clone_Backend/get-class-assignment-info.php?assignment_id=${assignment_id}`, {
    method: "POST",
    mode: 'cors',
    cache: "no-cache",
    origin: "http://127.0.0.1:5500",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token_value": token_value
  })
  })
  .then((response) => response.json())
  .then((class_assignment) => {
    //if(class_assignment.status!="0"){
      displayAssignment(class_assignment)
    //} else {
        //console.log(class_assignment.error);
    //}
  })
  .catch((error) => console.log(error))
}

function displayAssignment(class_assignment) {
  const assignmentsList = document.getElementById("assignment");
  assignmentsList.innerHTML = "";
    const listItem = document.createElement("div");
    listItem.innerHTML = `
    <div class="head-left-content">
      <div class="head-h1 flex" >
        <div class="circle flex">
        <svg class="material-icon" focusable="false" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
        </svg>
        </div>
        
        <h1 class="h1head">${class_assignment.title}</h1>
      </div>
      
      <div class="head-info">
      ${class_assignment.first_name} ${class_assignment.last_name} • ${class_assignment.date_of_upload}
      </div>

      <div class="grade-deadline flex">
        <div class="grade">100 points</div>
        <div class="deadline">Due ${class_assignment.due_date}, ${class_assignment.due_time}</div>
      </div>
    </div>

    <hr>

    <div class="content-description" id="content-description">
    </div>

    <div class="description-header">
      ${class_assignment.description}
    </div>
    
    <div class="description-list">
    </div>
    `;
    assignmentsList.appendChild(listItem)
}