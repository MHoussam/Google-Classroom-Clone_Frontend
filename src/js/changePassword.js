document.getElementById("create-account").addEventListener("click", (event) => {
    event.preventDefault();
      const newPassword = document.getElementById("new-password").value;
      const reset_token = document.getElementById("reset-token").value;
      
      const getcredentials = {
        email : localStorage.getItem("email"),
        new_password: newPassword,
        reset_token: reset_token,
      };
      fetch('http://localhost/Google-Classroom-Clone_Backend/student-forget-password-change.php', { 
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://localhost:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getcredentials),
        
    }).then(response => response.json())
      .then(response => {
          if (response["status"]) {
              console.log(response)
              if(response.status == 1){
                window.location.href = "../../index.html";
              }
              
          } else {
              console.log(response["message"]);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })