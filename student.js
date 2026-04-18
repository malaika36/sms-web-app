const API = "http://localhost:5000"; // backend URL

// Add student
function addStudent() {
  const name = document.getElementById("studentName").value;
  const cls = document.getElementById("studentClass").value;
  const marks = document.getElementById("studentMarks").value;

  if (!name || !cls || !marks) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${API}/students/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, cls, marks })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("studentName").value = "";
      document.getElementById("studentClass").value = "";
      document.getElementById("studentMarks").value = "";
      loadStudents();
    })
    .catch(err => console.error(err));
}

// Load all students
function loadStudents() {
  fetch(`${API}/students`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("studentTable");
      tbody.innerHTML = data.map(s => `
        <tr>
          <td>${s.id}</td>
          <td>${s.name}</td>
          <td>${s.class}</td>
          <td>${s.marks}</td>
          <td>
            <button onclick="deleteStudent(${s.id})">Delete</button>
          </td>
        </tr>
      `).join("");
    })
    .catch(err => console.error(err));
}

// Delete student
function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  fetch(`${API}/students/delete/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => {
      loadStudents(); // refresh table
    })
    .catch(err => console.error(err));
}
// Go back to dashboard
function goToDashboard() {
  window.location.href = "index.html";
}

// Initial load
loadStudents();
