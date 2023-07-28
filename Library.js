"use strict"
// Library Section Codes

// Get the 'listText' button for generate the list
let text = document.querySelector('#listText');
// Setting up the nodes to only display 100 at a time in order not to crash the website!!!
let node1 = 0;
let node2 = 100;

// Output the message to the website when click the generate button
text.addEventListener('click', () => {
  // Get the sort type from the user
  let sortType = document.getElementById('searchType').value;
  // Create a new button at the same time for browsing through 100 by 100 elements
  let buttonGenerate = document.querySelector('#button');
  buttonGenerate.innerHTML = `<button id="nodeAdd" type='button' onClick='{nodeAdd}'><span>Next 100 Elements</span></button>`;

  let nextButton = document.querySelector('#nodeAdd');
  // If the user click the next button, we need to add node value and output next 100
  nextButton.addEventListener('click', () => {
    // Add the node when there's something in the content Div, then output next 100
    if (contentDiv.innerHTML !== "" || contentDiv.innerHTML !== 'undefined') {
      node1 += 100;
      node2 += 100;
    }
    // Depends on the sortType, we display the 100 elements table (after it's generated)
    if (sortType === "bname") {
      // We use different data arrays (bookName, firstName, lastName etc.)
      listDisplay(sorted_data_bookName, node1, node2);
      
    } else if (sortType === "fname") {
      listDisplay(sorted_data_firstName, node1, node2);
      
    } else if (sortType === "lname") {
      listDisplay(sorted_data_lastName, node1, node2);
      
    } else if (sortType === "uid") {
      listDisplay(sorted_data_guid, node1, node2);
      
    } else if (sortType === "gender") {
      listDisplay(sorted_data_gender, node1, node2);
    }
  })
  
  // Depends on the sortType, we display the big table (before it's not generated
  if (sortType === "bname") {
    // If the node is not from 1 - 100, that means we need to initialize the node value
    if (node1 !== 0 && node2 !== 100) node1 = 0, node2 = 100;
    // generate the new table with sorted bookname data
    listDisplay(sorted_data_bookName, node1, node2);
    
  }else if (sortType === "fname") {
    // If the node is not from 1 - 100, that means we need to initialize the node value
    if (node1 !== 0 && node2 !== 100) node1 = 0, node2 = 100;
    // generate the new table with sorted firstname data
    listDisplay(sorted_data_firstName, node1, node2);
    
  } else if (sortType === "lname") {
    // If the node is not from 1 - 100, that means we need to initialize the node value
    if (node1 !== 0 && node2 !== 100) node1 = 0, node2 = 100;
    // generate the new table with sorted lastname data
    listDisplay(sorted_data_lastName, node1, node2);
    
  } else if (sortType === "uid") {
    // If the node is not from 1 - 100, that means we need to initialize the node value
    if (node1 !== 0 && node2 !== 100) node1 = 0, node2 = 100;
    // generate the new table with sorted uid data
    listDisplay(sorted_data_guid, node1, node2);
    
  } else if (sortType === "gender"){
    // If the node is not from 1 - 100, that means we need to initialize the node value
    if (node1 !== 0 && node2 !== 100) node1 = 0, node2 = 100;
    // generate the new table with sorted gender data
    listDisplay(sorted_data_gender, node1, node2);
  }
})

// Display the whole list to the website
function listDisplay(data, node1, node2) {
  // Setting up the table, table's row, and each table's data
  // Initialize the divisor elements (table, td, th)
  contentDiv.innerHTML = "";
  let table = document.createElement('table');
  let row = document.createElement('tr');
  let start = document.querySelector('#contentDiv');
  table.innerHTML = `<th>Book Name</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>Unique Author ID</th><th>References</th>`; // Initalize table headers

  let generateTime = performance.now(); // Record the time it takes to generate the table

  for (let i = node1; i < node2; i++) {
    // Assign the nodes / references to the table
    // book name
    let td = document.createElement('td');
    td.innerHTML = `${i + 1}. ${data[1][i]}`;
    row.appendChild(td);
    
    // first name
    td = document.createElement('td');
    td.innerHTML = `${data[2][i]}`;
    row.appendChild(td);
    
    // last name
    td = document.createElement('td');
    td.innerHTML = `${data[3][i]}`;
    row.appendChild(td);
    
    // gender
    td = document.createElement('td');
    td.innerHTML = `${data[4][i]}`;
    row.appendChild(td);
    // uid
    td = document.createElement('td');
    td.innerHTML = `${data[5][i]}`;
    row.appendChild(td);

    // For displaying all the referneces, use a for loop for displaying all the references in the cell
    td = document.createElement('td');
    for (let j = 0; j < 10; j++) {
      // Find the index in the uidArray, then get the name of each uid's
      let referenceIndex = binarySearchBounds(sorted_data_guid[0], data[6][i][j]);
      let referenceName = `${sorted_data_guid[2][referenceIndex]} ${sorted_data_guid[3][referenceIndex]}`;
      // If the name is not the last one, add a single line break after each reference
      if (j !== 9) {
        // If it's not the last one, add a single line break
        td.innerHTML += `${j + 1}. ${referenceName} <br> (${data[6][i][j]}) <br> <br>`;
      } else {
        // If it's the last one, do not add
        td.innerHTML += `${j + 1}. ${referenceName} <br> (${data[6][i][j]}) <br> <br>`; 
      }
    }
    row.appendChild(td);    // Append this larger cell to the row
    table.appendChild(row); // Append the row to the whole table
    row = document.createElement('tr'); // Initialize each row once again
  }
  
  start.appendChild(table); // Append the last sub table to div

  generateTime = `Generate time: ${Math.floor((performance.now() - generateTime) * 100) / 100}ms`;
  searchTimeDisplay.innerText = generateTime; // Calculate and display the time to the website
}
