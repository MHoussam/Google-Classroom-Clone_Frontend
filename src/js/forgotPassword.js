document.getElementById("create-account").addEventListener("click", (event) => {
    event.preventDefault();
      const email = document.getElementById("user-email").value;
  
      const getcredentials = {
          email: email,
      };
      fetch('http://localhost/Google-Classroom-Clone_Backend/student-forget-password.php', { 
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
                window.location.href = "changePass.html";
              }
              localStorage.setItem("email", email)
              
          } else {
              console.log(response["message"]);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })