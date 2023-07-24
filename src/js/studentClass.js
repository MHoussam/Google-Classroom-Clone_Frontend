document.addEventListener("DOMContentLoaded", getMaterials);

let classesArray = []

function getMaterials() {
  fetch("http://127.0.0.1/Google-Classroom-Clone_Backend/get-class-materials.php")
    .then((response) => response.json())
    .then((class_material) => {
      materialsArray = class_material;
      displayMaterials()
    })
    .catch((error) => console.log(error))
}

function displayMaterials() {
  const materialsList = document.getElementById("posts");
  materialsList.innerHTML = "";
  materialsArray.forEach((class_material) => {
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
                        X posted a new material: ${class_material.title}
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

  getAssignments();

}

function getAssignments() {
    fetch("http://127.0.0.1/Google-Classroom-Clone_Backend/get-assignments.php")
      .then((response) => response.json())
      .then((assignment) => {
        assignmentsArray = assignment;
        displayAssignments()
      })
      .catch((error) => console.log(error))
}
  
function displayAssignments() {
    const assignmentsList = document.getElementById("posts");
    assignmentsList.innerHTML += "";
    assignmentsArray.forEach((assignment) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <a href="./sign.html" class="link">
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
                        X posted a new assignment: ${assignment.title}
                    </div>
                    
                    <div class="post-date">
                        ${assignment.due_date}
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