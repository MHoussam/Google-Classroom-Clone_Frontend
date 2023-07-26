document.addEventListener("DOMContentLoaded", getMaterial);

const material_id = localStorage.getItem("material_id");

const class_id = localStorage.getItem("class_id");
const token_value = localStorage.getItem("token_value");
// const getClassesFromID = {
//   material_id: material_id
// };

function getMaterial() {
  console.log(material_id);
  fetch(`http://localhost/Google-Classroom-Clone_Backend/get-class-material-info.php?material_id=${material_id}`, {
    method: "POST",
    mode: 'cors',
    cache: "no-cache",
    origin: "http://127.0.0.1:5500",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token_value":token_value
  })
  })
  .then((response) => response.json())
  .then((class_material) => {
    if(class_material.status!="0"){
      displayMaterial(class_material)
    } else {
        console.log(class_material.error);
    }
  })
  .catch((error) => console.log(error))
}

function displayMaterial(class_material) {
  const materialsList = document.getElementById("material");
  materialsList.innerHTML = "";
    const listItem = document.createElement("div");
    console.log("class_assignment.description " + class_material.title)
    listItem.innerHTML = `
    <div class="head-left-content">
      <div class="head-h1 flex" >
        <div class="circle flex">
        <svg class="material-icon" focusable="false" width="24" height="24" viewBox="0 0 24 24">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"></path>
        </svg>
        </div>
        
        <h1 class="h1head">${class_material.title}</h1>
      </div>
      
      <div class="head-info">
      ${class_material.first_name} ${class_material.last_name} • ${class_material.date_of_upload}
      </div>
    </div>

    <hr>

    <div class="content-description" id="content-description">
    </div>

    <div class="description-header">
      ${class_material.description}
    </div>
    
    <div class="description-list">
    </div>
    `;
    materialsList.appendChild(listItem)
}