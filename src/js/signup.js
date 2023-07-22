document.getElementById("signup").addEventListener("click", (event) => {
    event.preventDefault();
    const firstName = document.getElementById("username").value;
    const lastName = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    const registerCredebtials = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    fetch('http://localhost/login-register-backend/signup.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(registerCredebtials), 
    })
    .then(response => response.json()) 
    .then(response => {
        if (response["status"]) {
            window.location.href = "welcome.html";
        } else {
            console.log(response["message"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
);