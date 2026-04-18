const API = "http://localhost:5000";
const userRole = "teacher"; // admin/teacher/student/parent
const CURRENT_STUDENT_ID = 1;
const CHILD_STUDENT_ID = 1;

// Add exam
function addExam() {
  if (userRole !== "admin" && userRole !== "teacher") return alert("No permission to add exams.");

  const student_id = document.getElementById("examStudentId").value;
  const subject = document.getElementById("examSubject").value;
  const marks = document.getElementById("examMarks").value;
  if (!student_id || !subject || !marks) return alert("Fill all fields");

  fetch(`${API}/exams/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ student_id, subject, marks })
  }).then(() => {
    document.getElementById("examStudentId").value = "";
    document.getElementById("examSubject").value = "";
    document.getElementById("examMarks").value = "";
    loadExams();
  });
}

// Load exams
function loadExams() {
  fetch(`${API}/exams`)
    .then(res => res.json())
    .then(data => {
      let filtered = data;
      if (userRole === "student") filtered = data.filter(e => e.student_id === CURRENT_STUDENT_ID);
      if (userRole === "parent") filtered = data.filter(e => e.student_id === CHILD_STUDENT_ID);

      const tbody = document.getElementById("examTable");
      tbody.innerHTML = filtered.map(e => `
        <tr>
          <td>${e.id}</td>
          <td>${e.student_id}</td>
          <td>${e.subject}</td>
          <td>${e.marks}</td>
          ${userRole === "admin" || userRole === "teacher" ? `<td><button onclick="deleteExam(${e.id})">Delete</button></td>` : ""}
        </tr>
      `).join("");
    });

  if (userRole !== "admin" && userRole !== "teacher") document.getElementById("examForm").style.display="none";
}

// Delete
function deleteExam(id) {
  fetch(`${API}/exams/delete/${id}`, { method: "DELETE" }).then(() => loadExams());
}

function goToDashboard(){ window.location.href="index.html"; }
loadExams();
