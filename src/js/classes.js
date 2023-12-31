document.addEventListener("DOMContentLoaded", getClasses);

let classesArray = [];
const id = localStorage.getItem("id");
const token_value = localStorage.getItem("token_value");
// const getClassesFromID = {
//     student_id : id
// };

function getClasses() {
    // localStorage.setItem("material_id", 0);
    // localStorage.setItem("assignment_id", 0);
    // localStorage.setItem("class_id", 0);
  fetch(`http://127.0.0.1/Google-Classroom-Clone_Backend/get-student-classes.php?student_id=${id}`, {
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
    .then((class_student) => {
            classesArray = class_student;
            if(class_student.status!="0"){
                displayPosts()
            } else {
                console.log(class_student.error);
            }
    })
    .catch((error) => console.log(error))
}

function displayPosts() {
  const classesList = document.getElementById("classes");
  classesList.innerHTML = "";
  classesArray.forEach((class_student) => {
    const listItem = document.createElement("li");
    console.log(class_student.class_name)
    listItem.innerHTML = `
    <div class="class flex-column pointer">
        <div class="class-up">
            <div class="class-title-options flex">
                <div class="class-up-titles flex-column">
                    <a href="./studentClass.html?class_id=${class_student.class_id}&class_name=${class_student.class_name}&section=${class_student.section}" class="link" onclick="getClassId(${class_student.class_id})">
                        <div class="class-title">${class_student.class_name}</div>

                        <div class="class-sub-title">${class_student.section}</div>
                    </a>
                </div>

                <div class="class-options-container flex">
                    <div class="class-options flex-column">
                        <div class="google-apps-circle"></div>

                        <div class="google-apps-circle"></div>

                        <div class="google-apps-circle"></div>
                    </div>
                </div>
            </div>
            
            <div class="description"><a class="link">Tech Department</a></div>
        </div>
        
        <img src="/src/assets/images/user-profile.png" class="user-profile">
        
        <div class="class-middle">
            <div class="due">
                <div class="due-date">Due Wednesday</div>

                <div class="due-hour-first"><a href="" class="link-bk">10:00 AM – Google Classroomasd sdf sda s</a></div>
            </div>
        </div>
        
        <div class="class-end flex pointer">
            <div class="your-work">
                <abbr title='Open your work for "${class_student.class_name}"'>
                    <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7.55 0c.14-.15.33-.25.55-.25s.41.1.55.25c.12.13.2.31.2.5 0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-.19.08-.37.2-.5zM19 5v10.79C16.52 14.37 13.23 14 12 14s-4.52.37-7 1.79V5h14zM5 19v-.77C6.74 16.66 10.32 16 12 16s5.26.66 7 2.23V19H5z"></path>
                        <path d="M12 13c1.94 0 3.5-1.56 3.5-3.5S13.94 6 12 6 8.5 7.56 8.5 9.5 10.06 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z"></path>
                    </svg>
                </abbr> 
            </div>

            <div class="folder">
                <abbr title='Open folder for "${class_student.class_name} ${class_student.section}" in google drive'>
                    <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path>
                    </svg>
                </abbr> 
            </div>
        </div>
    </div>
    `;

    //console.log(class_student.class_id);
    classesList.appendChild(listItem)
  })
}

//.addEventListener('onclick', getClassId);

function getClassId (class_id) {
    //console.log("the captain: " + class_id);
    localStorage.setItem("class_id", class_id);
    console.log('class_id: ' + localStorage.getItem("class_id"));
}


//const addClassBtn = document.getElementById("add-class");

let infoModal = document.getElementById("account-info-modal");
function changeInfo() {
    infoModal.style.display = "block";
}
function cancel() {
    infoModal.style.display = "none";
}

let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

// addClassBtn.onclick = function() {
//   modal.style.display = "block";
// }

// changeInfo.onclick = function() {
//     infoModal.style.display = "block";
// }

// cancel.onclick = function() {
//     infoModal.style.display = "none";
// }

span.onclick = function() {
  modal.style.display = "none";
}
span.onclick = function() {
  infoModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal || event.target == infoModal ) {
    modal.style.display = "none";
    infoModal.style.display = "none";
  }
}
