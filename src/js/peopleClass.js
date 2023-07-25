document.addEventListener("DOMContentLoaded", getTeachers);

let classesArray = []
const getClassesFromID = {
  class_id: 5
};
function getTeachers() {
  fetch("http://localhost/Google-Classroom-Clone_Backend/get-class-teachers.php?class_id=5" ,{
    method: "GET",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://127.0.0.1:5500",
        headers: {
            'Accept': 'application/json',
            
        }
        
    })
    .then((response) => response.json())
    .then((class_teacher) => {
      teachersArray = class_teacher;
      displayTeachers()
    })
    .catch((error) => console.log(error))
}


function displayTeachers() {
  const teachersList = document.getElementById("posts");
  teachersList.innerHTML = "";
  teachersArray.forEach((class_teacher) => {
    const listItemTeacher = document.createElement("li");
    listItem.innerHTML = `
    <li>
      <div class="details flex">
        <div class="image-list"></div>
        <div class="teacher-name">${class_teacher.first_name}  ${class_teacher.last_name}</div>
      </div>
      <hr>
    </li>
    `;
    teachersList.appendChild(listItemTeacher)
  })

  getStudents();
}

function getStudents() {
  fetch("http://localhost/Google-Classroom-Clone_Backend/get-class-students.php")
    .then((response) => response.json())
    .then((class_student) => {
      studentsArray = class_student;
      displayStudents()
    })
    .catch((error) => console.log(error))
}

function displayStudents() {
  const studentsList = document.getElementById("posts");
  studentsList.innerHTML = "";
  studentsArray.forEach((class_student) => {
    const listItemStudents = document.createElement("li");
    listItem.innerHTML = `
    <li>
      <div class="details flex">
        <div class="image-list"></div>
        <div class="student-name">${class_student.first_name}  ${class_student.last_name}</div>
      </div>
      <hr>
    </li>
    `;
    studentsList.appendChild(listItemStudents)
  })
}