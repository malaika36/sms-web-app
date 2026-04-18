const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // your MySQL root username
  password: "root123",  // your MySQL root password
  database: "sm_db" // make sure this DB exists
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {    console.log("MySQL Connected");
  }
});

/* ================= STUDENTS ================= */

// Add student
app.post("/students/add", (req, res) => {
  const { name, cls, marks } = req.body;
  const sql = "INSERT INTO students (name, class, marks) VALUES (?, ?, ?)";
  db.query(sql, [name, cls, marks], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student added successfully" });
  });
});

// Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ================= TEACHERS ================= */

// Add teacher
app.post("/teachers/add", (req, res) => {
  const { name, subject } = req.body;
  const sql = "INSERT INTO teachers (name, subject) VALUES (?, ?)";
  db.query(sql, [name, subject], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Teacher added successfully" });
  });
});

// Get all teachers
app.get("/teachers", (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ================= ATTENDANCE ================= */

// Add attendance
app.post("/attendance/add", (req, res) => {
  const { student_id, date, status } = req.body;
  const sql = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";
  db.query(sql, [student_id, date, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Attendance added successfully" });
  });
});

// Get attendance
app.get("/attendance", (req, res) => {
  db.query("SELECT * FROM attendance", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ================= EXAMS ================= */

// Add exam
app.post("/exams/add", (req, res) => {
  const { student_id, subject, marks } = req.body;
  const sql = "INSERT INTO exams (student_id, subject, marks) VALUES (?, ?, ?)";
  db.query(sql, [student_id, subject, marks], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Exam added successfully" });
  });
});

// Get exams
app.get("/exams", (req, res) => {
  db.query("SELECT * FROM exams", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
app.delete("/teachers/delete/:id", (req, res) => {
  const id = req.params.id;
  const userRole = req.headers.role; // example: "admin"

  // 🔐 Permission check
  if (userRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  db.query(
    "DELETE FROM teachers WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      res.json({ message: "Teacher deleted successfully" });
    }
  );
});

app.delete("/attendance/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM attendance WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Attendance deleted successfully" });
  });
});
app.delete("/exams/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM exams WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted successfully" });
  });
});
app.delete("/students/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Exam deleted successfully" });
  });
});
/* ================= START SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
