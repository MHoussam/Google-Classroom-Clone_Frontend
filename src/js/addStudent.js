const addStudentBTN = document.getElementById("add-student");

let modal = document.getElementById("add-student-modal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

addStudentBTN.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal ) {
    modal.style.display = "none";
  }
}



document.getElementById("add-student-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const student_email = document.getElementById("student-email").value;
    const urlParams = new URLSearchParams(window.location.search);
    const class_name = urlParams.get('class_name');

    const addStudent = {
        student_email: student_email,
        class_name: class_name

    };
    fetch('http://localhost/Google-Classroom-Clone_Backend/add-student-to-class.php', { 
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(addStudent),
      
  }).then(response => response.json())
    .then(response => {
        if (response["status"]) {
            console.log(response)
        } else {
            console.log(data["message"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
})