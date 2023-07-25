document.getElementById("submit-info-changes").addEventListener("click", (event) => {
    event.preventDefault();
    const firstName = document.getElementById("first-name-input").value;
    const lastName = document.getElementById("last-name-input").value;

    const changecredentials = {
        student_id: localStorage.getItem(id),
        first_name: firstName,
        last_name: lastName
    };
    fetch('http://localhost/Google-Classroom-Clone_Backend/update-student-profile.php', { 
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(changecredentials),
      
  }).then(response => response.json())
    .then(response => {
        if (response["status"]) {
            console.log(response)
        } else {
            console.log(response["error"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
})
