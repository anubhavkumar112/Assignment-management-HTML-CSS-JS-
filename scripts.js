
let futureAssignment = []
let pastAssignment = []
let indexPastAssignment = 0;
let indexFutureAssignment = 0;
let userData = ["Title", 'Description', 'Batch_Name', 'Due_Date'];


let generateObject = (elementArray) => {
  let obj = {};
  for (let i = 0; i < elementArray.length; i++) {
    obj[userData[i]] = elementArray[i].value;
  }
  return obj;
}

function validate() {
  const elementArray = document.getElementsByClassName('input');
  for (let i = 0; i < elementArray.length; i++) {
    if (elementArray[i].value === "") {
      alert("Please fill all the details");
      return;
    }
  }
  
  const addAssignment = generateObject(elementArray);
  const dueDate = new Date(addAssignment['Due_Date']);
  const currentDate = new Date();
  if (dueDate.getDate() >= currentDate.getDate()) {
    futureAssignment.push(addAssignment);
    renderFutureAssignments(indexFutureAssignment++);
  } else {
    pastAssignment.push(addAssignment);
    renderPastAssignments(indexPastAssignment++);
  }
  alert("Assignment is Added");
  return;
}
function renderPastAssignments(findIndex) {
  const table = document.getElementById('pastTable');
  const tbody = table.querySelector('tbody');
  for (let row = findIndex; row < pastAssignment.length; row++) {
    let tRow = document.createElement('tr');
    let obj = pastAssignment[row];
    tbody.appendChild(tRow);
    for (let col = 0; col < 4; col++) {
      let rCol = document.createElement('td');
      rCol.innerText = obj[userData[col]];
      tRow.appendChild(rCol);
    }
  }
}
function renderFutureAssignments(findIndex) {
  const table = document.getElementById('futureTable');
  const tbody = table.querySelector('tbody');
  for (let row = findIndex; row < futureAssignment.length; row++) {
    let tRow = document.createElement('tr');
    let obj = futureAssignment[row];
    tbody.appendChild(tRow);
    for (let col = 0; col < 4; col++) {
      let rCol = document.createElement('td');
      rCol.innerText = obj[userData[col]];
      tRow.appendChild(rCol);
    }
  }
}

function callForDisplay(index) {
  let selectedBtn = document.getElementsByClassName('hello');
  for (let i = 0; i < selectedBtn.length; i++) {
    if (i === index) {
      selectedBtn[i].style.backgroundColor = "lightslategray";
    } else {
      selectedBtn[i].style.backgroundColor = "lightslategray";
    }
  }
  const firstPage = document.getElementById('firstPage');
  const secondPage = document.getElementById('secondPage');
  const thirdPage = document.getElementById('thirdPage');
  if (index === 1) {
    secondPage.style.visibility = 'visible';
    firstPage.style.visibility = 'hidden';
    thirdPage.style.visibility = 'hidden';
  } else if (index === 2) {
    thirdPage.style.visibility = 'visible';
    firstPage.style.visibility = 'hidden';
    secondPage.style.visibility = 'hidden';
  } else {
    firstPage.style.visibility = 'visible';
    secondPage.style.visibility = 'hidden';
    thirdPage.style.visibility = 'hidden';
  }
}

function Delete() {
  if (futureAssignment.length > 0) {
    futureAssignment.pop();
    const table = document.getElementById('futureTable');
    const tbody = table.querySelector('tbody');
    tbody.removeChild(tbody.lastChild);
    console.log("Element popped: " + futureAssignment);
    callForDisplay(2);
  }
}