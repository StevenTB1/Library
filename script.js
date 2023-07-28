"use strict"
// Search Book Program
// A program that allows user to search and show relative information
// October 20th - November 7th
// Author: @Steven Chow, Enshuo Zhang, Alex Zhao

// Get user input from html, and then use the same fucntion to search using different sorted array
function search() {

  // Get the inputType(firstname? lastname?) and the actual user input and saved as variables
  let inputType = document.getElementById('searchType').value;
  let userInput = document.getElementById('searchInput').value;
  // Empty array to save the results (in indices)
  let result = [];
  // Various search cases and various assignments to the result array (using different sorted datas)
  if (inputType === "bname") {
    result = binarySearchBounds(sorted_data_bookName[0], userInput);
    return sortResult(result, sorted_data_bookName);

  } else if (inputType === "fname") {
    result = binarySearchBounds(sorted_data_firstName[0], userInput);
    return sortResult(result, sorted_data_firstName);

  } else if (inputType === "gender") {
    result = binarySearchBounds(sorted_data_gender[0], userInput);
    return sortResult(result, sorted_data_gender);

  } else if (inputType === "uid") {
    result = binarySearchBounds(sorted_data_guid[0], userInput);
    return sortResult(result, sorted_data_guid);

  } else if (inputType === "lname") {
    result = binarySearchBounds(sorted_data_lastName[0], userInput);
    return sortResult(result, sorted_data_lastName);
  }
  return result;
}

// A function that sorts the result array in respects to the last name (second-level sort)
function sortResult(result, dataArray) {
  // A new 7 parallel array that only contains the result index (multiple entries)
  let newArr = [];
  if (typeof result !== 'number') {
    // The starting index of the result array, since the way we search it sorts the result array
    let startIndex = result[0];
    // The ending index of the result array on it's original data array
    let endIndex = result[result.length - 1];
    // Since we need to sort by last name, put Array[3], which is last name first
    newArr = [sliceArray(dataArray[3], startIndex, endIndex + 1),
    sliceArray(dataArray[1], startIndex, endIndex + 1),
    sliceArray(dataArray[2], startIndex, endIndex + 1),
    sliceArray(dataArray[3], startIndex, endIndex + 1),
    sliceArray(dataArray[4], startIndex, endIndex + 1),
    sliceArray(dataArray[5], startIndex, endIndex + 1),
    sliceArray(dataArray[6], startIndex, endIndex + 1)
    ];

    // Since new array is created, now we can sort this new Array by last name
    newArr = mergeSort(newArr);
    return newArr;
    // The case that the result is a single index
  } else {
    return [dataArray[3][result], dataArray[1][result], dataArray[2][result], dataArray[3][result], dataArray[4][result], dataArray[5][result], dataArray[6][result]];
  }
}


let btnText = document.querySelector('#btnText'); // Get the button id

// Output the message to the website when click the search button
btnText.addEventListener('click', () => {
  // Calculate the current time, used for displaying how long the search time function takes
  let searchTime = performance.now();
  // get the result array based on user input
  let result = search();
  // Get the time it takes and output to the website
  searchTime = `Search Time: ${Math.floor((performance.now() - searchTime) * 100) / 100}ms`;
  searchTimeDisplay.innerText = searchTime;
  // Clear the previous table
  let target = document.querySelector('#contentDiv');
  target.innerHTML = "";
  
  if(result.length <= 0 || result[0].length <= 0){ // If there is no result
    window.alert("There is no result!"); // Alert the user that there is no result
  } else {
    // Output the message to the website
    tableOutput(result, sorted_data_guid);
  }
})

// Outputing messages to the website
function tableOutput(result, uidArray) {
  // Setting up the table, table's row, and each table's data
  let table = document.createElement('table');
  let row = document.createElement('tr');
  let start = document.querySelector('#contentDiv');

  // Intial table headers
  table.innerHTML = `<th>Book Name</th><th>First Name</th><th>Last Name</th><th>Gender</th>
                     <th>Author's Unique ID</th><th> References</th>`;

  // If the result is an single element(no multiple entries), only add one row to the table and return the table
  if (typeof result[0] === 'string') {

    // Create a for loop that assign the table cells and append it to the row
    let td = document.createElement('td');
    td.innerHTML = `1. ${result[1]}`;
    row.appendChild(td);
    // First Name
    td = document.createElement('td');
    td.innerHTML = `${result[2]}`;
    row.appendChild(td);
    // Last Name
    td = document.createElement('td');
    td.innerHTML = `${result[3]}`;
    row.appendChild(td);
    // UID
    td = document.createElement('td');
    td.innerHTML = `${result[4]}`;
    row.appendChild(td);
    // Gender
    td = document.createElement('td');
    td.innerHTML = `${result[5]}`;
    row.appendChild(td);

    // For displaying all the referneces, use a for loop for displaying all the references in the cell
    td = document.createElement('td');
    for (let j = 0; j < 10; j++) {
      // Find the index in the uidArray, then get the name of each uid's
      let referenceIndex = binarySearchBounds(uidArray[0], result[6][j]);
      let referenceName = `${uidArray[2][referenceIndex]} ${uidArray[3][referenceIndex]}`;
      // If the name is not the last one, add a single line break after each reference
      if (j !== 9){
        td.innerHTML += `${j + 1}. ${referenceName} <br> (${result[6][j]}) <br> <br>`;
      }
      else td.innerHTML += `${j + 1}. ${referenceName} <br> (${result[6][j]}) <br> <br>`;
    }
    // Append the last table cell to the row, and append this last row to the table, then append this table to div
    row.appendChild(td);
    table.appendChild(row);
    start.appendChild(table);
  } else {
    // Generate the table rows
    for (let i = 0; i < result[0].length; i++) {
      // Assign the table cells under the table headers
      // Book Name
      let td = document.createElement('td');
      td.innerHTML = `${i + 1}. ${result[1][i]}`;
      row.appendChild(td);
      // First Name
      td = document.createElement('td');
      td.innerHTML = `${result[2][i]}`;
      row.appendChild(td);
      // Last Name
      td = document.createElement('td');
      td.innerHTML = `${result[3][i]}`;
      row.appendChild(td);
      // UID
      td = document.createElement('td');
      td.innerHTML = `${result[4][i]}`;
      row.appendChild(td);
      // Gender
      td = document.createElement('td');
      td.innerHTML = `${result[5][i]}`;
      row.appendChild(td);
      
      // List all the references by their full name
      td = document.createElement('td');
      for (let j = 0; j < 10; j++) {
        // Get each index of the ten references in array uidArray
        let referenceIndex = binarySearchBounds(uidArray[0], result[6][i][j]);
        // Get each references' name using the indexes
        let referenceName = `${uidArray[2][referenceIndex]} ${uidArray[3][referenceIndex]}`;
        if (j !== 9) {
          // If it's not the last one, add a single line break
          td.innerHTML += `${j + 1}. ${referenceName} <br> (${result[6][i][j]}) <br> <br>`;
        } else {
          // If it's the last one, do not add
          td.innerHTML += `${j + 1}. ${referenceName} <br> (${result[6][i][j]}) <br> <br>`;
        }
      }
      // Append the reference td to the rows
      row.appendChild(td);
      // Append the row to the whole table
      table.appendChild(row);
      // Initialize each row
      row = document.createElement('tr');
    }
    // After the result array loop, append the last row to the table
    table.appendChild(row);
    // Append this table to start
    start.appendChild(table);
  }
}