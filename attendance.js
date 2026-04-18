const API = "http://localhost:5000";
const userRole = "teacher"; // admin/teacher/student/parent
const CURRENT_STUDENT_ID = 1;
const CHILD_STUDENT_ID = 1;

// Add attendance
function addAttendance() {
  if (userRole !== "admin" && userRole !== "teacher") return alert("No permission to add attendance.");

  const student_id = document.getElementById("studentId").value;
  const date = document.getElementById("attendanceDate").value;
  const status = document.getElementById("attendanceStatus").value;
  if (!student_id || !date || !status) return alert("Fill all fields");

  fetch(`${API}/attendance/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ student_id, date, status })
  }).then(() => {
    document.getElementById("studentId").value = "";
    document.getElementById("attendanceDate").value = "";
    loadAttendance();
  });
}

// Load attendance
function loadAttendance() {
  fetch(`${API}/attendance`)
    .then(res => res.json())
    .then(data => {
      let filtered = data;
      if (userRole === "student") filtered = data.filter(a => a.student_id === CURRENT_STUDENT_ID);
      if (userRole === "parent") filtered = data.filter(a => a.student_id === CHILD_STUDENT_ID);

      const tbody = document.getElementById("attendanceTable");
      tbody.innerHTML = filtered.map(a => `
        <tr>
          <td>${a.id}</td>
          <td>${a.student_id}</td>
          <td>${a.date}</td>
          <td>${a.status}</td>
          ${userRole === "admin" || userRole === "teacher" ? `<td><button onclick="deleteAttendance(${a.id})">Delete</button></td>` : ""}
        </tr>
      `).join("");
    });

  if (userRole !== "admin" && userRole !== "teacher") document.getElementById("attendanceForm").style.display="none";
}

// Delete
function deleteAttendance(id) {
  fetch(`${API}/attendance/delete/${id}`, { method: "DELETE" }).then(() => loadAttendance());
}

function goToDashboard(){ window.location.href="index.html"; }
loadAttendance();
