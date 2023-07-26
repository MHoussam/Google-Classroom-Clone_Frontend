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

function addStudent() {
    const student_email = document.getElementById("email").value;
    
    const urlParams = new URLSearchParams(window.location.search);
    const class_id = localStorage.getItem('class_id');
    const token_value = localStorage.getItem('token_value');
    console.log("class_id: " + class_id);
    console.log("email: " + student_email);
    const addStudent = {
        student_email: student_email,
        class_id: class_id,
        token_value: token_value
    };
    fetch(`http://localhost/Google-Classroom-Clone_Backend/add-student-to-class.php?class_id=${class_id}&email=${student_email}&token_value=${token_value}`, { 
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(addStudent),
      
  }).then(response => response.json())
    .then(response => {
        if (response["status"] != '0') {
            console.log(response)
        } else {
            console.log(data["message"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}