/*************************************************************
**  Description: Client-side JavaScript file
**************************************************************/

let recordForm = document.getElementById("recordForm");

// Function to submit the form data
recordForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let req = new XMLHttpRequest();
  let queryString = "/insert";

  // String that holds the form data
  let parameterString =
    "exerciseName=" + recordForm.elements.exerciseName.value +
    "&reps=" + recordForm.elements.reps.value +
    "&weight=" + recordForm.elements.weight.value +
    "&date=" + recordForm.elements.date.value +
    "&lbs=" + recordForm.elements.lbs.value;

  req.open("GET", queryString + "?" + parameterString, true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
      let response = JSON.parse(req.responseText);
      let id = response.workouts;

      // Table of database records for the workouts
      let tbl = document.getElementById("recordTable");
      let newRow = tbl.insertRow(-1);

      // Hidden id element
      let idCell = document.createElement("td");
      idCell.textContent = id;
      idCell.style.display = "none";
      newRow.appendChild(idCell);

      // Name element
      let nameCell = document.createElement("td");
      nameCell.textContent = recordForm.elements.exerciseName.value;
      newRow.appendChild(nameCell);

      // Reps element
      let repCell = document.createElement("td");
      repCell.textContent = recordForm.elements.reps.value;
      newRow.appendChild(repCell);

      // Weight element
      let weightCell = document.createElement("td");
      weightCell.textContent = recordForm.elements.weight.value;
      newRow.appendChild(weightCell);

      // Lbs or Kgs element
      let lbsCell = document.createElement("td");
      let temp = recordForm.elements.lbs.value;
        if (temp == 1) {
            temp = 'lbs';
        } else {
            temp = 'kgs';
        }
      lbsCell.textContent = temp;
      newRow.appendChild(lbsCell);

      // Date element
      let dateCell = document.createElement("td");
      dateCell.textContent = recordForm.elements.date.value;
      newRow.appendChild(dateCell);

      // Edit button element
      let editBtnCell = document.createElement("td");
      editBtnCell.innerHTML = '<a href="/updateWorkout?id=' + id + '"><input type="button" value="Edit"></a>';
      newRow.appendChild(editBtnCell);

      // Delete button element
      let deleteBtnCell = document.createElement("td");
      deleteBtnCell.innerHTML = '<input type="button" value="Delete" onclick="deleteExercise(\'recordTable\', this, ' + id + ')">';
      newRow.appendChild(deleteBtnCell);
    } else {
      console.log("Database return error");
    }
  });
  req.send(queryString + "?" + parameterString);
});


// Function call to delete a row
function deleteExercise(tbl, curRow, rowID) {
  let table = document.getElementById(tbl);
  let rowCount = table.rows.length;
  let req = new XMLHttpRequest();
  let queryString = "/delete";

  req.open("GET", queryString + "?id=" + rowID, true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
    } else {
      console.log("Delete request error");
    }
  });

  req.send(queryString + "?id=" + rowID);

  for (let i = 0; i < rowCount; i++) {
    let row = table.rows[i];

    if (row == curRow.parentNode.parentNode) {
      table.deleteRow(i);
    }
  }
}
