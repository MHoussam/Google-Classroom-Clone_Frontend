document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
      const email = document.getElementById("user-email").value;
      const password = document.getElementById("user-password").value;
  
      const getcredentials = {
          email: email,
          password: password
      };
      fetch('http://localhost/Google-Classroom-Clone_Backend/validate-student.php', { 
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
              localStorage.setItem("id", response.id)
              console.log(localStorage.getItem("id"))
              window.location.href = "classes.html";
          } else {
              console.log(response["message"]);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })