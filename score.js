// Logic Of Percentage Calculate

function calculateGrade(percentage) {
  if (percentage >= 90) {
    return "Distinction";
  } else if (percentage >= 75) {
    return "First Class";
  } else if (percentage >= 65) {
    return "Second Class";
  } else if (percentage >= 35) {
    return "Pass";
  } else {
    return "Fail";
  }
}

function generateScoreTable() {
  var storedData = localStorage.getItem("studentData");
  if (!storedData) {
    console.error("No student data found in localStorage");
    return;
  }

  var studentData = JSON.parse(storedData);
  var fullName = studentData.fullName;
  var rollNumber = studentData.rollNumber;
  var subjects = studentData.subjects;
  var scoreTableBody = document.getElementById("scoreTableBody");
  var studentInfo = document.getElementById("studentInfo");
  var remarks = document.getElementById("remarks");

  var totalMarks = 0;
  var totalObtained = 0;
  var failedSubjects = 0;

  if (fullName && rollNumber) {
    var nameRow = document.createElement("tr");
    nameRow.innerHTML =
      '<td colspan="6"><strong>Name:</strong> ' +
      fullName +
      "<br/> <br/><strong>Roll Number:</strong> " +
      rollNumber +
      "</td>";
    studentInfo.appendChild(nameRow);
  }

  for (var index = 0; index < subjects.length; index++) {
    var subject = subjects[index].subject;
    var mark = subjects[index].marks;
    var out = subjects[index].outOf;
    var percentage = (mark / out) * 100;
    var grade = calculateGrade(percentage);
    var row = document.createElement("tr");

    // Show data in the Form of table write HTML here
    row.innerHTML =
      "<td>" +
      (index + 1) +
      "</td>" +
      "<td>" +
      subject +
      "</td>" +
      "<td>" +
      out +
      "</td>" +
      "<td>" +
      mark +
      "</td>" +
      "<td>" +
      percentage.toFixed(2) +
      "%</td>" +
      "<td>" +
      grade +
      "</td>";

    if (grade === "Fail") {
      row.classList.add("failed");
      failedSubjects++;
    }
    totalMarks += parseInt(out);
    totalObtained += parseInt(mark);
    scoreTableBody.appendChild(row);
  }

  // Show Data of the Remarks
  var overallPercentage = (totalObtained / totalMarks) * 100;
  var overallGrade = calculateGrade(overallPercentage);
  if (failedSubjects > 0) {
    remarks.textContent = "Failed in " + failedSubjects + " Subjects";
    remarks.style.color = "red";
  } else {
    remarks.textContent = "Passed with " + overallGrade + " Grade";
    remarks.style.color = "green";
  }
}

// Call Function Here
generateScoreTable();

