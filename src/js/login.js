document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
      const email = document.getElementById("user-email").value;
      const password = document.getElementById("user-password").value;
  
      const getcredentials = {
          email: email,
          password: password
      };
      fetch('http://127.0.0.1/Google-Classroom-Clone_Backend/validate-student.php', { 
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://127.0.0.1:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getcredentials),
        
    }).then(response => response.json())
      .then(response => {
          if (response["status"]=="1") {            
            console.log('status: ' + response.status)
            console.log('response: ' + response.id)
            localStorage.setItem("id", response.id)
            console.log('id: ' + localStorage.getItem("id"))
            localStorage.setItem("token_value",response.token_value)
            console.log(localStorage.getItem("token_value"));
            window.location.href = "./src/html/classes.html";
          } else {
              console.log(response["message"]);
              
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })