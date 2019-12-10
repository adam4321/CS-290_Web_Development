/******************************************************************
** Author:        Adam Wright
** Description:   Vanilla JS application where the user can use a
**                direction pad to navigate a 4x4 table and a 
**                button to mark chosen cells yellow
******************************************************************/

// Create the parent table
let table = document.createElement('table');

// Create the header row
let headRow = document.createElement('tr');

// Fill the header
for (let i = 0; i < 4; i++) {
    let headCell = document.createElement('th');
    headCell.textContent = 'Header ' + (i+1);
    headCell.style.border = '1px solid black';
    headCell.style.padding = '5px';
    headRow.appendChild(headCell);
}

// Add header to the table
table.appendChild(headRow);

// Fill the table body
for (let i = 0; i < 4; i++) {

    // Create the table body cells
    let row = document.createElement('tr');

    for (let j = 0; j < 4; j++) {
        let cell = document.createElement('td');
        cell.textContent = (i+1) + ', ' + (j+1);
        cell.setAttribute('id', (i+1) + ' ' + (j+1));
        cell.style.border = '1px solid black';
        cell.style.padding = '5px';
        row.appendChild(cell);
    }
    table.appendChild(row);
}

// Set overall table style
table.style.borderCollapse = 'collapse';
table.style.margin = '25px';

// Create button container
let buttonDiv = document.createElement('div');

// Button name array
let buttonNames = ['up', 'left', 'down', 'right', 'Mark Cell'];

// Create buttons
for (let i = 0; i < buttonNames.length; i++) {
    let name = buttonNames[i]; 
    let temp = document.createElement('button');
    temp.textContent = name;
    temp.setAttribute('id', name);
    buttonDiv.appendChild(temp);
    temp.addEventListener("click", function(event) {
        if (name === "Mark Cell") {
            markClick();
        } else {
            moveCell(name);
        }
    });
}

// Style the buttons
buttonDiv.style.marginLeft = '40px';
buttonDiv.lastElementChild.style.marginLeft = '20px';

// Render the table to the DOM body element
document.getElementById('root').appendChild(table);

// Render the buttons to the DOM body element
document.getElementById('root').appendChild(buttonDiv);


// Set initial cell
let column = 1;
let row = 1;
document.getElementById(row + ' ' + column).style.border = '2px solid black';;

// Function to change the current cell
function moveCell(name) {

    // Set the current cell to unselected
    let cell = document.getElementById(row + ' ' + column);
    cell.style.border = '1px solid black';
    
    switch (name) {
      case "up":
        if (row !== 1) {
          row--;
        }
        break;
      case "left":
        if (column !== 1) {
          column--;
        }
        break;
      case "down":
        if (row !== 4) {
          row++;
        }
        break;
      case "right":
        if (column !== 4) {
          column++;
        }
        break;
    }

    // Update the selected cell
    cell = document.getElementById(row + ' ' + column);
    cell.style.border = '2px solid black';
}

// Function to mark the current cell yellow
function markClick() {
    let cell = document.getElementById(row + ' ' + column);
    cell.style.backgroundColor = 'yellow';
}
