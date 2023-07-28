 "use strict"
// MRCA section codes

// MRCA: Using BFSAll to find ONE possible (shortest) jump to get to the author
function mrca() {
  // Get the start position and end position
  let startPosition = document.getElementById(`startInput`).value;
  let endPosition = document.getElementById(`endInput`).value;

  // If one of the input is blank, just alert undefined and do nothing
  if (startPosition === 'undefined' || endPosition === 'undefined') {
    window.alert("One of the input is blank!");
  } else {
    // Initialize and call the breath first search for finding the shortest route
    let visited = new Set();
    let str;
    visited.add(startPosition);
    str = bfs(sorted_data_guid, [[startPosition, endPosition, startPosition + " "]], visited);

    // Split the route into seperate elements, then convert those uid to first name and last name into new array
    // If we found nothing, then we return nothing
    if(str === ""){
      return "";
    }else{
      let route = split(str);
      let name_route = [];
      // Transfer the uid's into author's full name
      for (let i = 0; i < route.length; i++) {
        name_route[i] = `${sorted_data_guid[2][binarySearchBounds(sorted_data_guid[0], route[i])]} ${sorted_data_guid[3][binarySearchBounds(sorted_data_guid[0], route[i])]}`;
      }
      // Return a 2D array contains uid elements and full name elements
      return [route, name_route];
    }
  }
}

// The function bfs that uses backtracking to find all the possible routes of the references
function bfs(guidList, queue = [], visited = new Set(), counter = 0) {

  // If there's no more routes to go
  if (queue.length === 0 || counter >= 4300) {
    return "";
  }

  const visiting = queue.shift(); // The current node variables
  const currentUID = visiting[0];
  const endUID = visiting[1];
  const path = visiting[2];

  if (currentUID === endUID) { // If we hit the reference we need, we just return the path we found
    return path;
  }

  let index = binarySearchBounds(guidList[0], currentUID);  // Valid cases: Current author's references

  if (index.length > 1) { // Some lucky collisions if there is actually more than one uid
    index = index[0];
  }
  
  // Candidates: all possible references that are not being visited before
  let references = guidList[6][index];
  if(references)
  for (let i = 0; i < 10; i++) { // All ten references in each author
    let currentRef = references[i];
    if (!visited.has(currentRef)) { // If the visited set doesn't include this reference
      let length = queue.length; // Add a new queue into the existing queue
      queue[length] = [currentRef, endUID, path + currentRef + " "];
      visited.add(currentRef); // Add this new location to visited
    }
  }
  // Since we are only finding one solution, the first one will be the shortest route
  return bfs(guidList, queue, new Set(visited), counter + 1);
}

// Output the message to the website when click the search button
mrcaText.addEventListener('click', () => {
  let mrcaSearchTime = performance.now(); // Set up mrca search time
  let result = mrca(); // get the result array based on user input
  // Get the search time
  mrcaSearchTime = `MRCA search time: ${Math.floor((performance.now() - mrcaSearchTime) * 10) / 10}ms`;
  searchTimeDisplay.innerText = mrcaSearchTime; // Output the search time 
  let target = document.querySelector('#contentDiv'); // Clear the previous table
  target.innerHTML = "";
  // In case we don't actually have an result from bfs
  if(result === ""){
    // We alert the user that there is no result
    window.alert("No result! (exceed maximum stack capacity, over 3 jumps)");
  }else{
    mrcaOutput(result); // Call the mrca function and print the result
  }
})

// Outputting the result of the mrca function
function mrcaOutput(result){
  // Setting up the table, table's row, and each table's data
  let table = document.createElement('table');
  let row = document.createElement('tr');
  let start = document.querySelector('#contentDiv');

  // Intial table headers
  table.innerHTML = `<th>First Node</th><th>Second Node</th><th># Jumps</th>`;
  for(let i = 0; i < result[0].length - 1; i++){
    // Assign the nodes / references to the table
    // First Node
    let td = document.createElement('td');
    td.innerHTML = `${result[1][i]} <br> ${result[0][i]}`;
    row.appendChild(td);
    // Second node
    td = document.createElement('td');
    td.innerHTML = `${result[1][i + 1]} <br> ${result[0][i + 1]}`;
    row.appendChild(td);
    // # of jumps it happens
    td = document.createElement('td');
    td.innerHTML = `${i + 1}`;
    row.appendChild(td);

    // Append the row to the whole table
    table.appendChild(row);
    // Initialize each row once again
    row = document.createElement('tr');
  }
  // lastly append the table to the div and output it on the screen
  start.appendChild(table);
}

// Give us 100 plsease Mr ma WOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!