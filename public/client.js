console.log('Client-side log');

const btn = document.getElementById("submit-btn"); 
btn.addEventListener("click", submitDataToServer);

// Submit clicked so post the data to the server
function submitDataToServer() {
  console.log("SUBMIT clicked!!!"); // display a message on the console

  // create an object to post to the server
  // IMPORTANT: ONE NAME - VALUE PAIR FOR EACH FIELD
  let dataObj = {fname: document.getElementById("firstName").value,
                 sname: document.getElementById("surName").value,
                 wname: document.getElementById("email").value,
                 pname: document.getElementById("career").value};

  // JUST USE THESE LINES AS THEY ARE - NO NEED TO CHANGE
  event.preventDefault();  // prevents 2 calls to this function!!
  const requestMsg = new XMLHttpRequest();
  requestMsg.open('post', '/putData', true);
  requestMsg.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
  requestMsg.send(JSON.stringify(dataObj));
  
  document.getElementById("firstName"). value = '';
  document.getElementById("surName"). value = '';
  document.getElementById("email"). value = '';
  document.getElementById("career"). value = '';
  	
  //need to update the screen so that the new user is displayed
  getDataFromServer();
}


function displayData() {
  console.log("displayData()");

  // define variables that reference elements on our page
  const rowList = document.getElementById('users');
  rowList.innerHTML = ''; // clear all the list items
  
  // parse our response to convert to JSON
  let users = JSON.parse(this.responseText);
  
  // iterate through every row and add it to our page
  users.forEach( function(row) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = row['first_name']+' '+row['surname'];
    rowList.appendChild(newListItem);
  });
}


// Send a request to the server to query the db and send the data back 
function getDataFromServer() {
  console.log("getData()"); // display a debug message

  // request the data from the database
  const requestMsg = new XMLHttpRequest();
  requestMsg.addEventListener("load", displayData); // attach a listener
  requestMsg.open('get', '/getData'); // open a HTTP GET request
  requestMsg.send();
}




