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
    const email = document.getElementById("email").value;
    
    const urlParams = new URLSearchParams(window.location.search);
    const class_id = localStorage.getItem('class_id');
    const token_value = localStorage.getItem('token_value');
    const addStudent = {
        email: email,
        class_id: class_id,
        token_value: token_value
    };
    fetch(`http://localhost/Google-Classroom-Clone_Backend/add-student-to-class.php`, { 
      method: 'POST', 
      mode: 'cors',
      cache: "no-cache",
      origin: "http://127.0.0.1:5500",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(addStudent),
      
  }).then(response => response.json())
    .then(response => {
        if (response["status"] != '0') {
            console.log(response["status"])
        } else {
            console.log(response["error"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}