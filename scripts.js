var li_links = document.querySelectorAll(".links ul li");
var view_wraps = document.querySelectorAll(".view_wrap");
var grid_view = document.querySelector(".grid-view");
var list_view = document.querySelector(".list-view");

li_links.forEach(function (link) {
  link.addEventListener("click", function () {
    li_links.forEach(function (link) {
      link.classList.remove("active");
    });

    link.classList.add("active");

    var li_view = link.getAttribute("data-view");

    view_wraps.forEach(function (view) {
      view.style.display = "none";
    });

    if (li_view == "list-view") {
      list_view.style.display = "block";
    } else {
      grid_view.style.display = "block";
    }
  });
});

// FETCHING JSON DATA
const employee = fetch("object.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    myArray = data;
    initLoad(data);
  });

function initLoad(employee) {
  editSkill = 0;
  buildTable(employee, editSkill);
  buildGrid(employee);
}

function buildTable(data, editSkill) {
  var table = document.getElementById("myTable1");

  for (var i = 0; i < data.length; i++) {
    var row = `    
             <tr >
               <td>${data[i].name}</td>
               <td>${data[i].id}</td>
               <td  id="skillRow${i}">${data[i].skills}</td>            
             <td>${data[i].project}</td>
             <td>${data[i].hcm}</td>
             <td><button  class="editButton" type="button" id="edit_button${i}" value="Edit" class="edit" onclick="edit_row('${i}')"><ion-icon name="create-outline"></ion-icon></button>
            
             <button  class="save" type="button" id="save_button${i}" value="Save"  onclick="save_row('${i}')"><ion-icon name="save-outline"></ion-icon></button>
             <button  onclick="deleteRow(' ${i}')" class="close-button1" type="button" class="close" aria-label="Close"> <img src="imgs/close.jpg" style=" width: 25px" /></button>
             </td>
             </tr>`;
    table.innerHTML += row;
  }
}

function buildGrid(data) {
  var output = "";
  for (var i = 0; i < data.length; i++) {
    output += `   
    <div class="view_item">

    <button  onclick="deleteRow('${i}')"
    
      class="close-button"
      class="close-button"
      type="button"
      class="close"
      aria-label="Close"
    >
    <img src="imgs/close.jpg" style=" width: 25px; border:none;" />
    </button>
    <div class="vi_left" id="loadingImage${i}">
     
    </div>
    <div class="vi_right">
      <p class="content">

      <label>Name :</label>
        <label>${data[i].name}</label><br />

        <label>Id :</label>
        <label>${data[i].id}</label><br />

        <label>Skills :</label>
        <label  id="skillRowGrid${i}">${data[i].skills}</label>
        <br />

        <label>Project :</label>
        <label>${data[i].project}l</label><br />

        <label>Hcm :</label>
        <label>${data[i].hcm}</label><br />
      </p>
      <button  class="editButton" type="button"  id="edit_button${i}"  value="Edit" class="edit" onclick="edit_row('${i}')">Edit</button>
      <button  class="save" type="button" id="save_button${i}" value="Save"  onclick="save_row('${i}')">Save</button>

      </div>
  </div>`;
  }
  document.querySelector(".gridLoad").innerHTML = output;

  for (var i = 0; i < data.length; i++) {
    if (data[i].Gender == "Male") {
      document.getElementById("loadingImage" + i).innerHTML =
        '<img src="imgs/men.jpg">';
    } else {
      document.getElementById("loadingImage" + i).innerHTML =
        '<img src="imgs/women.jpg">';
    }
  }
}

function edit_row(no) {
  document.getElementById("edit_button" + no).style.display = "none";
  document.getElementById("save_button" + no).style.display = "block";

  var skill = document.getElementById("skillRow" + no);
  var skillData = skill.innerHTML;
  var skill = document.getElementById("skillRow" + no);
  skill.innerHTML =
    '<input type="text" id="name_text' + no + '" value="' + skillData + '">';

  var skill = document.getElementById("skillRowGrid" + no);
  var skillData = skill.innerHTML;
  var skill = document.getElementById("skillRowGrid" + no);
  skill.innerHTML =
    '<input type="text" id="name_text1' + no + '" value="' + skillData + '">';
}

function save_row(no) {
  var name_val = document.getElementById("name_text1" + no).value;
  document.getElementById("skillRowGrid" + no).innerHTML = name_val;

  var name_val = document.getElementById("name_text" + no).value;
  document.getElementById("skillRow" + no).innerHTML = name_val;

  document.getElementById("edit_button" + no).style.display = "block";
  document.getElementById("save_button" + no).style.display = "none";
}

// DELETE THE RECORD
function deleteRow(row) {
  document.getElementById("myTable1").innerHTML = "";
  myArray.splice(row, 1);
  initLoad(myArray);
}
