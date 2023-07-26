function submitInfoS () {
    event.preventDefault();
    const id = localStorage.getItem("id");
    const first_name = document.getElementById("first-name-input").value;
    const last_name = document.getElementById("last-name-input").value;
    const token_value = localStorage.getItem("token_value");


    const ChangeAccountInfo = {
        student_id: id,
        first_name: first_name,
        last_name: last_name,
        token_value: token_value
    };

    fetch(`http://localhost/Google-Classroom-Clone_Backend/update-student-profile.php`, { 
      method: 'POST', 
      mode: 'cors',
        cache: "no-cache",
        origin: "http://127.0.0.1:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify(ChangeAccountInfo)
      
  }).then(response => response.json())
    .then(change => {
        if (change.status!="0") {
            console.log(change)
        } else {
            console.log(change.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    //console.log(changeredentials)
}


function submitInfoT () {
    //event.preventDefault();
    const id = localStorage.getItem("id");
    const first_name = document.getElementById("first-name-input").value;
    const last_name = document.getElementById("last-name-input").value;
    const token_value = localStorage.getItem("token_value");


    const ChangeAccountInfo = {
        teacher_id: id,
        first_name: first_name,
        last_name: last_name,
        token_value: token_value
    };

    fetch(`http://localhost/Google-Classroom-Clone_Backend/update-teacher-profile.php`, { 
      method: 'POST', 
      mode: 'cors',
        cache: "no-cache",
        origin: "http://127.0.0.1:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify(ChangeAccountInfo)
      
  }).then(response => response.json())
    .then(change => {
        if (change.status!="0") {
            console.log(change)
        } else {
            console.log(change.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    //console.log(changeredentials)
}




window.onclick = function(event) {
    let m = document.getElementById("account-info-modal");
    if (event.target == m ) {
        m.style.display = "none";
    }
  }