import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import { getEmployees, deleteEmployee } from "../services/employeeService";

function EmployeeList() {
  const navigate = useNavigate();

  // it is the State for search input value
  const [search, setSearch] = useState("");

  // it is the State to store employee list
  const [employees, setEmployees] = useState([]);

  /**
   * it Load employee data 
   */
  useEffect(() => {
    loadEmployees();
  }, []);

  /**
   * it Fetch employee data from service
   * and update state
   */
  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  /**
   * it Delete employee by id 
   */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id); // delete employee via service
      loadEmployees(); // refresh employee list
    }
  };

  /**
   * it Navigate to update employee page
   */
  const Update = (id) => {
    navigate("update/" + id);
  };

  // it Filter employees based on name, role, or department
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Tnavbar */}
      <nav className="navbar navbar-dark bg-dark px-3 fixed-top">
        <span className="navbar-brand">Employee Management</span>

        {/* it is the Search input and add employee button */}
        <div className="d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Role, or Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "250px" }}
          />
          <Link to="/add" className="btn btn-success">
            Add Employee
          </Link>
        </div>
      </nav>

      {/* Main content section where employee table is displayed */}
     
      <div className="emplyeeData">
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "80px", width: "100%" }}
        >
          <div className="card mx-auto">
            <div className="card-header">Employees</div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      // it Show message when no employees match the search
                      <tr>
                        <td colSpan="5" className="text-center">
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      //it Render employee rows data
                      filteredEmployees.map((emp, index) => (
                        <tr key={emp.id}>
                          <td>{index + 1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.role}</td>
                          <td>{emp.department}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => Update(emp.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(emp.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>


    </>
  );
}

export default EmployeeList;
