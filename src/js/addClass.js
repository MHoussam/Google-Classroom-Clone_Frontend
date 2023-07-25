document.getElementById("create-class").addEventListener("click", (event) => {
      event.preventDefault();
      const className = document.getElementById("class-name-input").value;
      const classSection = document.getElementById("class-section-input").value;
      const classSubject = document.getElementById("class-subject-input").value;
      const classRoom = document.getElementById("class-room-input").value;
      const classMeeting = document.getElementById("class-meeting-input").value;
  
      const getcredentials = {
          teacher_id: 2, // localStorage.getItem("teacher_id"),
          class_name: className,
          section: classSection,
          subject: classSubject,
          room: classRoom,
          meet_link: classMeeting
      };
      fetch('http://localhost/Google-Classroom-Clone_Backend/add-class.php', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(getcredentials),
        
    }).then(response => response.json())
      .then(response => {
          if (response["status"]) {
              console.log(response)
          } else {
              console.log(data["message"]);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })
