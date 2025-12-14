import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEmployee } from "../services/employeeService"; 

function UpdateEmployee() {
  // it Get employee id from the URL
  const { id } = useParams();

  // it Used to navigate back to employee list after update
  const navigate = useNavigate();

  // API URL to fetch employee data based on id
  const url = "http://localhost:3001/employees/" + id;

  // State variables to store employee details
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  /*
    This effect runs once when the component loads.
    It fetches the employee data using the id
    and fills the form with existing values.
  */
  useEffect(() => {
    GettingDataWithId();
  }, []);

  /*
    This function fetches employee data using the id
    and updates the state with received values.
  */
  async function GettingDataWithId() {
    let response = await fetch(url);
    response = await response.json();

    setName(response.name);
    setRole(response.role);
    setDepartment(response.department);
  }

  /*
    This function handles form submission.
    It sends updated employee data to the service
    and redirects back to the employee list.
  */
  const handleUpdate = async (e) => {
    e.preventDefault();

    const employee = { name, role, department };

    try {
      await updateEmployee(id, employee);
      alert("Employee updated successfully!");
      navigate("/");
    } catch (error) {
      alert("Error updating employee!");
    }
  };

  return (
    <div className="addEmployee">
      <div className="card w-100">
        <div className="card-header bg-dark text-white">
          Update Employee
        </div>

        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter employee name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter role"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter department"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
