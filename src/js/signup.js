document.getElementById("submit-teacher").addEventListener("click", (event) => {
    event.preventDefault();
    const firstName = document.getElementById("user-f-name").value;
    const lastName = document.getElementById("user-l-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    
    const registerCredebtials = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    fetch('http://localhost/Google-Classroom-Clone_Backend-main/register-teacher.php', {
        method: "post",
        mode: 'cors',
        cache: "no-cache",
        
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(registerCredebtials), 
    })
    .then(response => response.json()) 
    .then(response => {
        if (response["status"]) {
            window.location.href = "index.html";
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
    const firstName = document.getElementById("user-f-name").value;
    const lastName = document.getElementById("user-l-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    
    const registerCredebtials = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    fetch('http://localhost/Google-Classroom-Clone_Backend-main/register-student.php', {
        method: 'POST', 
        mode: 'cors',
        cache: "no-cache",
        
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(registerCredebtials), 
    })
    .then(response => response.json()) 
    .then(response => {
        if (response["status"]) {
            window.location.href = "index.html";
        } else {
            console.log(response["message"]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
);
