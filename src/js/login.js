document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
      const email = document.getElementById("user-email").value;
      const password = document.getElementById("user-password").value;
  
      const getcredentials = {
          email: email,
          password: password
      };
      fetch('http://localhost/login-register-backend/signin.php', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(getcredentials),
        
    }).then(response => response.json())
      .then(data => {
          if (data["status"]) {
            //   window.location.href = "index.html";
                alert("validated")
          } else {
              console.log(data["message"]);
              
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })