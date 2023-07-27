document.addEventListener("DOMContentLoaded", getTeachers);

let classesArray = []
const class_id = localStorage.getItem("class_id");
const token_value = localStorage.getItem("token_value");

function getTeachers() {
  fetch(`http://localhost/Google-Classroom-Clone_Backend/get-class-teachers.php` ,{
    method: "POST",
    mode: 'cors',
    cache: "no-cache",
    origin: "http://127.0.0.1:5500",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "class_id":class_id,
        "token_value": token_value
    })
    })
    .then((response) => response.json())
    .then((class_teacher) => {
      teachersArray = class_teacher;
      if(class_teacher.status!="0"){
        console.log(class_teacher)
        displayTeachers()
      } else {
        console.log(class_teacher.error);
    }
    })
    .catch((error) => console.log(error))
}


function displayTeachers() {
  const teachersList = document.getElementById("teachers");
  teachersList.innerHTML = "";
  teachersArray.forEach((class_teacher) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <li>
      <div class="details flex">
        <div class="image-list"></div>
        <div class="teacher-name">${class_teacher.first_name}  ${class_teacher.last_name}</div>
      </div>
    </li>
    `;
    teachersList.appendChild(listItem)
  })

  getStudents();
}

function getStudents() {
    fetch(`http://localhost/Google-Classroom-Clone_Backend/get-class-students.php` ,{
      method: "POST",
      mode: 'cors',
      cache: "no-cache",
      origin: "http://127.0.0.1:5500",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "class_id":class_id,
        "token_value": token_value
      })
      })
      .then((response) => response.json())
      .then((class_student) => {
        studentsArray = class_student;
        if(class_student.status!="0"){
          //console.log(class_student)
          displayStudents()
        } else {
          console.log(class_student.error);
      }
      })
      .catch((error) => console.log(error))
  }
  
  let count=0;
  function displayStudents() {
    const studentsList = document.getElementById("students");
    studentsList.innerHTML = "";
    studentsArray.forEach((class_student) => {
      count++;
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <li>
        <div class="details flex">
          <div class="image-list"></div>
          <div class="teacher-name">${class_student.first_name}  ${class_student.last_name}</div>
        </div>
      </li>
      `;
      studentsList.appendChild(listItem)
    })

    document.getElementById('num-students').textContent = count+' Students';
}