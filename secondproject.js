// Get references to the UL elements in the HTML
let ul1 = document.getElementById("ul1");
let ul2 = document.getElementById("ul2");
let ul3 = document.getElementById("ul3");

// Get reference to the submit button
let submitBtn = document.getElementById("submit");

// Add event listener to the submit button
submitBtn.addEventListener("click", saveItems);

// Add event listener when the window is loaded
window.addEventListener("load", reload);

// Function to handle saving items
function saveItems(e) {
  e.preventDefault();
  let selectTable = document.getElementById("selectTable").value;
  let itemName = document.getElementById("itemName").value;
  let itemPrice = document.getElementById("itemprice").value;

  // Call functions to save item in LI, update local storage, and update amount
  saveInLi();
  updateLocalStorage();
  updateAmount();
}

// Function to load items from local storage when the page is reloaded
function reload() {
  for (let i = 0; i < localStorage.length; i++) {
    let table = localStorage.key(i);
    let itemDetails = JSON.parse(localStorage.getItem(table));
    while (itemDetails.length !== 0) {
      let itemName = itemDetails[0];
      let itemPrice = itemDetails[1];
      itemDetails.shift();
      itemDetails.shift();
      showOnScreen(table, itemName, itemPrice);
    }
  }
  updateAmount();
}

// Function to display items on the screen
function showOnScreen(table, itemName, itemPrice) {
  if (table == "Table 1") {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode("Item is " + itemName + ". Price is " + itemPrice));

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-outline-danger btn-sm delete";
    deleteBtn.setAttribute("style", "float: right");
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);

    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-outline-dark btn-sm edit";
    editBtn.setAttribute("style", "float: right; margin-right: 4px;");
    editBtn.appendChild(document.createTextNode("Edit"));

    li.appendChild(editBtn);
    ul1.appendChild(li);
  } else if (table == "Table 2") {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode("Item is " + itemName + ". Price is " + itemPrice));

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-outline-danger btn-sm delete";
    deleteBtn.setAttribute("style", "float: right");
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);

    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-outline-dark btn-sm edit";
    editBtn.setAttribute("style", "float: right; margin-right: 4px;");
    editBtn.appendChild(document.createTextNode("Edit"));

    li.appendChild(editBtn);
    ul2.appendChild(li);
  } else {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode("Item is " + itemName + ". Price is " + itemPrice));

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-outline-danger btn-sm delete";
    deleteBtn.setAttribute("style", "float: right");
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);

    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-outline-dark btn-sm edit";
    editBtn.setAttribute("style", "float: right; margin-right: 4px;");
    editBtn.appendChild(document.createTextNode("Edit"));

    li.appendChild(editBtn);
    ul3.appendChild(li);
  }
}

// Function to save items in LI element
function saveInLi() {
  let selectTable = document.getElementById("selectTable").value;
  let itemName = document.getElementById("itemName").value;
  let itemPrice = document.getElementById("itemprice").value;

  let li = document.createElement("li");
  li.className = "list-group-item";
  li.appendChild(document.createTextNode("Item is " + itemName + ". Price is " + itemPrice));

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-outline-danger btn-sm delete";
  deleteBtn.setAttribute("style", "float: right");
  deleteBtn.appendChild(document.createTextNode("X"));
  li.appendChild(deleteBtn);

  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-outline-dark btn-sm edit";
  editBtn.setAttribute("style", "float: right; margin-right: 4px;");
  editBtn.appendChild(document.createTextNode("Edit"));

  li.appendChild(editBtn);

  if (document.getElementById("selectTable").value == "Table 1") {
    ul1.appendChild(li);
  } else if (document.getElementById("selectTable").value == "Table 2") {
    ul2.appendChild(li);
  } else {
    ul3.appendChild(li);
  }
}

// Function to update local storage with the item details
function updateLocalStorage() {
  let table1items = document.querySelectorAll("#ul1 li");
  let table2items = document.querySelectorAll("#ul2 li");
  let table3items = document.querySelectorAll("#ul3 li");

  let details = [];
  table1items.forEach((item) => {
    let itemName = item.firstChild.textContent.split(" is ")[1].split(".")[0];
    let itemPrice = item.firstChild.textContent.split(" is ")[2];
    details.push(itemName, itemPrice);
  });
  let stringDetails = JSON.stringify(details);
  localStorage.setItem("Table 1", stringDetails);

  details = [];
  table2items.forEach((item) => {
    let itemName = item.firstChild.textContent.split(" is ")[1].split(".")[0];
    let itemPrice = item.firstChild.textContent.split(" is ")[2];
    details.push(itemName, itemPrice);
  });
  stringDetails = JSON.stringify(details);
  localStorage.setItem("Table 2", stringDetails);

  details = [];
  table3items.forEach((item) => {
    let itemName = item.firstChild.textContent.split(" is ")[1].split(".")[0];
    let itemPrice = item.firstChild.textContent.split(" is ")[2];
    details.push(itemName, itemPrice);
  });
  stringDetails = JSON.stringify(details);
  localStorage.setItem("Table 3", stringDetails);
}

// Add event listeners for delete and edit functionality
ul1.addEventListener("click", remove);
ul2.addEventListener("click", remove);
ul3.addEventListener("click", remove);
ul1.addEventListener("click", editItem);
ul2.addEventListener("click", editItem);
ul3.addEventListener("click", editItem);

// Function to remove an item
function remove(event) {
  if (event.target.classList.contains("delete")) {
    let ul = event.target.parentNode.parentNode;
    ul.removeChild(event.target.parentNode);
    updateLocalStorage();
    updateAmount();
  }
}

// Function to edit an item
function editItem(event) {
  if (event.target.classList.contains("edit")) {
    let ul = event.target.parentNode.parentNode;
    let itemName = event.target.parentNode.firstChild.textContent.split(" is ")[1].split(".")[0];
    let itemPrice = event.target.parentNode.firstChild.textContent.split(" is ")[2];
    let tableNumber;
    if (ul.id === "ul1") {
      tableNumber = "Table 1";
    } else if (ul.id === "ul2") {
      tableNumber = "Table 2";
    } else {
      tableNumber = "Table 3";
    }
    ul.removeChild(event.target.parentNode);
    updateLocalStorage();
    updateAmount();
    document.getElementById("itemName").value = itemName;
    document.getElementById("itemprice").value = itemPrice;
    document.getElementById("selectTable").value = tableNumber;
  }
}


//Function to update total amount
function updateAmount() {
  let t1total = 0;
  let details1 = JSON.parse(localStorage.getItem("Table 1"));
  if (details1 !== null && details1.length !== 0) {
    for (let i = 1; i < details1.length; i = i + 2) {
      t1total = t1total + parseFloat(details1[i]);
    }
    document.getElementById("table1totalamount").value = t1total;
  }
  else 
  {
    document.getElementById("table1totalamount").value = 0;
  }

  let t2total = 0;
  let details2 = JSON.parse(localStorage.getItem("Table 2"));
  if (details2 !== null && details2.length !== 0) {
    for (let i = 1; i < details2.length; i = i + 2) {
      t2total = t2total + parseFloat(details2[i]);
    }
    document.getElementById("table2totalamount").value = t2total;
  } else {
    document.getElementById("table2totalamount").value = 0;
  }

  let t3total = 0;
  let details3 = JSON.parse(localStorage.getItem("Table 3"));
  if (details3 !== null && details3.length !== 0) {
    for (let i = 1; i < details3.length; i = i + 2) {
      t3total = t3total + parseFloat(details3[i]);
    }
    document.getElementById("table3totalamount").value = t3total;
  } else {
    document.getElementById("table3totalamount").value = 0;
  }
}

