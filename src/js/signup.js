let Credential;

document.getElementById("submit-teacher").addEventListener("click", (event) => {
    event.preventDefault();
    const first_name = document.getElementById("user-f-name").value;
    const last_name = document.getElementById("user-l-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    
    const registerCredentials = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    };

    fetch('http://localhost/Google-Classroom-Clone_Backend/register-teacher.php', {
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        origin: "http://localhost:5500",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerCredentials), 
    })
    .then(response => response.json()) 
    .then(response => {
        if (response["status"]) {
            console.log(response);
            localStorage.setItem("email", registerCredentials.email);
            window.location.href = "login.html";
        } else {
            console.log(response["message"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
);

document.getElementById("submit-student").addEventListener("click", (event) => {
    event.preventDefault();
    const first_name = document.getElementById("user-f-name").value;
    const last_name = document.getElementById("user-l-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    
    const registerCredentials = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    };

    fetch('http://localhost/Google-Classroom-Clone_Backend/register-student.php', {
        method: 'POST', 
        mode: 'cors',
        cache: "no-cache",
        origin: "http://localhost:5500",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(registerCredentials), 
    })
    .then(response => response.json()) 
    .then(response => {
        if (response["status"]) {
            // window.location.href = "index.html";
            console.log(response);
            localStorage.setItem("email", registerCredentials.email);
        } else {
            console.log(response["message"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
);

