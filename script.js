const roleSelect = document.getElementById("roleSelect");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

let userRole = roleSelect.value;

// Modules without Timetable
const modules = [
  { id: "students", name: "Students", link: "student.html", color: "#3498db" },
  { id: "teachers", name: "Teachers", link: "teacher.html", color: "#2ecc71" },
  { id: "attendance", name: "Attendance", link: "attendance.html", color: "#9b59b6" },
  { id: "exams", name: "Exams", link: "exams.html", color: "#e74c3c" },
 
];

// Role-specific modules
function getRoleModules(role) {
  switch(role) {
    case "admin": return modules;
    case "teacher": return modules.filter(m => ["students","attendance","exams"].includes(m.id));
    case "student": return modules.filter(m => ["attendance","exams"].includes(m.id));
    case "parent": return modules.filter(m => ["attendance","exams"].includes(m.id));
    default: return modules;
  }
}

// Sidebar render
function renderSidebar() {
  sidebar.innerHTML = "";
  const roleModules = getRoleModules(userRole);
  roleModules.forEach(mod => {
    const btn = document.createElement("button");
    btn.textContent = mod.name;
    btn.onclick = () => {
      // Open module page
      window.location.href = mod.link;
    };
    sidebar.appendChild(btn);
  });
}

// Main Content render (Dashboard links)
function renderMainContent() {
  const roleModules = getRoleModules(userRole);
  mainContent.innerHTML = `<h2>Well, ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}!</h2>
  <div class="dashboard-grid">
    ${roleModules.map(m => `
      <div class="card" style="border-top:4px solid ${m.color}" onclick="window.location.href='${m.link}'">
        <h3>${m.name}</h3>
        <p>Click to manage ${m.name.toLowerCase()}</p>
      </div>
    `).join("")}
  </div>`;
}

// Role change
roleSelect.addEventListener("change", () => {
  userRole = roleSelect.value;
  renderSidebar();
  renderMainContent();
});

// Initial render
renderSidebar();
renderMainContent();
