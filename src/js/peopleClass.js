document.addEventListener("DOMContentLoaded", getTeachers);

let classesArray = []

function getTeachers() {
  fetch("")
    .then((response) => response.json())
    .then((class_teacher) => {
      teachersArray = class_teacher;
      displayTeachers()
    })
    .catch((error) => console.log(error))
}
