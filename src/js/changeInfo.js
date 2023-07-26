document.getElementById("submit-info-changes").addEventListener("click", (event) => {
    event.preventDefault();
    const id = localStorage.getItem("id");
    const first_name = document.getElementById("first-name-input").value;
    const last_name = document.getElementById("last-name-input").value;
    const token_value = localStorage.getItem("token_value");

    fetch(`http://localhost/Google-Classroom-Clone_Backend/update-student-profile.php?student_id=${id}&?first_name=${first_name}&?last_name=${last_name}`, { 
      method: 'POST', 
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
})
