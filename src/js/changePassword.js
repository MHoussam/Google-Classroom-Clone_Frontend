document.getElementById("create-account").addEventListener("click", (event) => {
    event.preventDefault();
      const newPassword = document.getElementById("new-password").value;
      const reset_token = document.getElementById("reset-token").value;
      if(!localStorage.getItem("teacher_email") == null){
        const email = localStorage.getItem("teacher_email");
        const url = "http://localhost/Google-Classroom-Clone_Backend/teacher-forget-password-change.php";
      }else{
        const email = localStorage.getItem("student_email")
        const url = "http://localhost/Google-Classroom-Clone_Backend/student-forget-password-change.php";
      }
      const getCredentials = {
        email : email,
        new_password: newPassword,
        reset_token: reset_token,
      };
      fetch(url, { 
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://localhost:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getCredentials),
        
    }).then(response => response.json())
      .then(response => {
          if (response["status"]) {
              console.log(response)
              if(response.status == 1){
              }
              
          } else {
              console.log(response["message"]);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })