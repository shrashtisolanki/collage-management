import React, { useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Search, Menu, X, Plus, Book
} from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy Data
  const courses = [
    { name: "Computer Science 101", students: 120, faculty: 5, progress: "75%" },
    { name: "Mathematics Fundamentals", students: 80, faculty: 3, progress: "60%" },
    { name: "Biology Lab", students: 90, faculty: 4, progress: "85%" },
    { name: "History of Art", students: 60, faculty: 2, progress: "50%" },
  ];

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const studentStatusData = [
    { name: "Completed", value: 150, color: "#10b981" },
    { name: "In Progress", value: 280, color: "#3b82f6" },
    { name: "Not Started", value: 110, color: "#f59e0b" },
  ];

  const facultyWorkloadData = [
    { department: "Computer Science", completed: 20, remaining: 10, overdue: 5 },
    { department: "Mathematics", completed: 15, remaining: 12, overdue: 3 },
    { department: "Biology", completed: 18, remaining: 8, overdue: 4 },
    { department: "Art", completed: 10, remaining: 15, overdue: 2 },
  ];

  const budgetPieData = [
    { name: "Science Dept", value: 28, color: "#14b8a6" },
    { name: "Arts Dept", value: 20, color: "#3b82f6" },
    { name: "Engineering", value: 23, color: "#10b981" },
    { name: "Admin", value: 20, color: "#f59e0b" },
    { name: "Others", value: 9, color: "#ef4444" },
  ];

  const enrollmentLineData = [
    { month: "Jan", enrolled: 100, graduated: 50 },
    { month: "Feb", enrolled: 120, graduated: 60 },
    { month: "Mar", enrolled: 110, graduated: 55 },
    { month: "Apr", enrolled: 130, graduated: 65 },
    { month: "May", enrolled: 140, graduated: 70 },
    { month: "Jun", enrolled: 150, graduated: 75 },
  ];

  const departmentCostData = [
    { dept: "Sales", actual: 50000 },
    { dept: "Marketing", actual: 30000 },
    { dept: "IT", actual: 40000 },
    { dept: "Design", actual: 20000 },
    { dept: "Contracts", actual: 25000 },
    { dept: "Dev", actual: 35000 },
  ];

  const timeData = [
    { category: "Planned Completion", value: 73 },
    { category: "Actual Completion", value: 82 },
  ];

  const costData = [
    { category: "Actual", value: 6, planned: 8, budget: 6 },
  ];

  const progressData = [
    { task: "Course Analysis", percent: 100 },
    { task: "Student Enrollment", percent: 75 },
    { task: "Faculty Review", percent: 50 },
    { task: "Budget Allocation", percent: 90 },
  ];

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              {/* === Full Dashboard === */}
              <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside
                  className={`${
                    sidebarOpen ? "w-64" : "w-20"
                  } bg-secondary text-white transition-all duration-300 flex flex-col`}
                >
                  <div className="p-4 flex items-center justify-between">
                    <h1
                      className={`font-bold text-xl ${
                        sidebarOpen ? "block" : "hidden"
                      }`}
                    >
                      CM
                    </h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                      {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                  </div>

                  <nav className="flex-1 p-4 space-y-2">
                    <div className="text-sm font-medium mb-2">College Courses</div>
                    {filteredCourses.map((c, i) => (
                      <button
                        key={i}
                        className="w-full text-left py-2 px-3 hover:bg-primary rounded transition flex items-center space-x-2"
                      >
                        <Book size={16} />
                        <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                          {c.name}
                        </span>
                      </button>
                    ))}
                    <button className="w-full text-left py-2 px-3 hover:bg-primary rounded transition flex items-center space-x-2">
                      <Plus size={16} />
                      <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                        New Course
                      </span>
                    </button>
                  </nav>
                </aside>

                {/* === Main Section === */}
                <div className="flex-1 overflow-auto bg-bgMain">
                  {/* Header */}
                  <header className="bg-secondary text-white p-4 flex items-center justify-between">
                    <div className="flex space-x-6">
                      <span className="font-medium">My Dashboard</span>
                      <span>Courses</span>
                      <span>Faculty</span>
                      <span>Students</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-3 text-white opacity-50"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Search courses"
                          className="pl-10 pr-4 py-2 bg-primary rounded text-white placeholder-white opacity-80 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={() => {
                          localStorage.removeItem("isLoggedIn");
                          window.location.href = "/login";
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  </header>

                  {/* Sub Tabs */}
                  <nav className="bg-white border-b p-4 flex space-x-6 text-gray-600">
                    <span className="border-b-2 border-primary pb-2">Overview</span>
                    <span>List</span>
                    <span>Board</span>
                    <span>Plan</span>
                    <span>Calendar</span>
                    <span>Files</span>
                    <span>Dashboard</span>
                  </nav>

                  {/* Widgets Grid */}
                  <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* === Summary Table === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Summary</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left">Course</th>
                            <th>Students</th>
                            <th>Faculty</th>
                            <th>Grades</th>
                            <th>Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((c, i) => (
                            <tr key={i}>
                              <td>{c.name}</td>
                              <td className="text-center">{c.students}</td>
                              <td className="text-center">{c.faculty}</td>
                              <td className="text-center">A/B</td>
                              <td className="text-center">{c.progress}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* === Student Status === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Student Status</h3>
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie data={studentStatusData} dataKey="value" innerRadius={40} outerRadius={70}>
                            {studentStatusData.map((e, i) => (
                              <Cell key={i} fill={e.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Faculty Workload === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Faculty Workload</h3>
                      <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={facultyWorkloadData} layout="vertical">
                          <XAxis type="number" />
                          <YAxis dataKey="department" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="completed" stackId="a" fill="#10b981" />
                          <Bar dataKey="remaining" stackId="a" fill="#3b82f6" />
                          <Bar dataKey="overdue" stackId="a" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Budget === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Budget Allocation</h3>
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie data={budgetPieData} dataKey="value" outerRadius={70}>
                            {budgetPieData.map((e, i) => (
                              <Cell key={i} fill={e.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Enrollment === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Enrollment vs Graduation</h3>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={enrollmentLineData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="enrolled" stroke="#3b82f6" />
                          <Line type="monotone" dataKey="graduated" stroke="#10b981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Department Cost === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Department Cost Breakdown</h3>
                      <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={departmentCostData}>
                          <XAxis dataKey="dept" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="actual" fill="#14b8a6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Time === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Time</h3>
                      <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={timeData} layout="vertical">
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" />
                          <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Cost === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Cost</h3>
                      <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={costData}>
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="actual" fill="#14b8a6" />
                          <Bar dataKey="planned" fill="#3b82f6" />
                          <Bar dataKey="budget" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* === Progress === */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h3 className="font-semibold mb-2">Course Progress</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left">Task Name</th>
                            <th className="text-left">Percent Complete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {progressData.map((p, i) => (
                            <tr key={i}>
                              <td>{p.task}</td>
                              <td>
                                <div className="bg-gray-200 h-2 rounded-full">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${p.percent}%` }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </main>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
