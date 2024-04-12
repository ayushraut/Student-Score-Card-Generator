var form = document.getElementById("studentForm");
var subjectsContainer = document.getElementById("subjectsContainer");
var addSubjectBtn = document.getElementById("addSubject");


function submitForm() {
  var fullName = document.getElementById("fullName").value;
  var rollNumber = document.getElementById("rollNumber").value;
  var subjects = document.getElementsByName("subject[]");
  var marks = document.getElementsByName("marks[]");
  var outOf = document.getElementsByName("outOf[]");


  // Validation Of Forms

  if (fullName.length == 0) {
    document.getElementById("p1").innerHTML = "Enter Full Name";
    document.getElementById("p1").style.color = "red";
    return false;
  }
  

  if (rollNumber.length == 0 || rollNumber.toUpperCase() !== rollNumber || !rollNumber.match(/[A-Z]{4}[0-9]{4}[A-Z]{1}/)) {
    document.getElementById("p2").innerHTML = "Enter Roll Number in uppercase (ABCD1234E)";
    document.getElementById("p2").style.color = "red";
    return false;
  }

  for (var i = 0; i < subjects.length; i++) {
    if (subjects[i].value.length == 0 || marks[i].value.length == 0) {
      document.getElementById("p3").innerHTML = "Enter All Subject Input Feild";
      document.getElementById("p3").style.color = "red";
      return false;
    }
  }

 

  var studentData = {
    fullName: fullName,
    rollNumber: rollNumber,
    subjects: [],
  };

  for (var i = 0; i < subjects.length; i++) {
    studentData.subjects.push({
      subject: subjects[i].value,
      marks: marks[i].value,
      outOf: outOf[i].value,
    });
  }

  // Data Store On localStorage

  localStorage.setItem("studentData", JSON.stringify(studentData));
  console.log(studentData);

  alert("Form Submitted Successfully");
  // Rendering To the Next page

  location.assign("score.html");
  return false;
}

let subjectIndex = 1;

// Add Subject Button And Write a HTML page here then show dynamically in index.html page

addSubjectBtn.onclick = function () {
  subjectIndex++;
  var newSubjectRow = document.createElement("div");
  newSubjectRow.className = "subjectRow";
  newSubjectRow.innerHTML =
    '<label for="subject' +
    subjectIndex +
    '">Subject:<span style="color:red" >*</span> </label><br/>' +
    '<input placeholder="Enter Subject" type="text" id="subject' +
    subjectIndex +
    '" name="subject[]" required pattern="[A-Za-z ]+">	&nbsp;' +
    '<label for="outOf' +
    subjectIndex +
    '">Out of:</label>&nbsp;' +
    '<select id="outOf' +
    subjectIndex +
    '" name="outOf[]">' +
    '<option value="50">50</option>' +
    '<option value="100">100</option>' +
    "</select>" +
    '	&nbsp;<label for="marks' +
    subjectIndex +
    '">Obtained Marks:</label>&nbsp;' +
    '<input placeholder="Enter Obtained Marks" type="number" id="marks' +
    subjectIndex +
    '" name="marks[]" min="0" required>	&nbsp;' +
    '<button id="rembtn" type="button" class="removeSubject">Remove subject</button>';
  subjectsContainer.appendChild(newSubjectRow);
  console.log("Added subject: " + subjectIndex);
};

// Remove Subject Button
subjectsContainer.onclick = function (e) {
  if (e.target.classList.contains("removeSubject")) {
    e.target.parentElement.remove();
  }
};


