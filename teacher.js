const API = "http://localhost:5000";
const userRole = "admin"; // admin or user

// Add teacher
function addTeacher() {
  if (userRole !== "admin") {
    alert("You do not have permission to add teachers.");
    return;
  }

  const name = document.getElementById("teacherName").value;
  const subject = document.getElementById("teacherSubject").value;

  if (!name || !subject) {
    alert("Fill all fields");
    return;
  }

  fetch(`${API}/teachers/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, subject })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";
    loadTeachers();
  });
}

// ✅ DELETE TEACHER (FIX)
function deleteTeacher(id) {
  if (userRole !== "admin") {
    alert("You do not have permission to delete teachers.");
    return;
  }

  fetch(`${API}/teachers/delete/${id}`, {
    method: "DELETE",
    headers: {
      "role": userRole
    }
  })
  .then(res => res.json())
  .then(() => loadTeachers());
}

// Load teachers
function loadTeachers() {
  fetch(`${API}/teachers`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("teacherTable");
      tbody.innerHTML = data.map(t => `
        <tr>
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>${t.subject}</td>
          ${
            userRole === "admin"
              ? `<td><button onclick="deleteTeacher(${t.id})">Delete</button></td>`
              : ""
          }
        </tr>
      `).join("");
    });

  if (userRole !== "admin") {
    document.getElementById("teacherForm").style.display = "none";
  }
}

loadTeachers();

function goToDashboard() {
  window.location.href = "index.html";
}
