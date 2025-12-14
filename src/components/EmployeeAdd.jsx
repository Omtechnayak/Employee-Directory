import { createEmployee } from "../services/employeeService"; 
import { Navigate, useNavigate } from "react-router-dom";

function EmployeeAdd() {

  // It Used to navigate between pages 
  const navigate = useNavigate();

  /*
    This function is called when the add employee form is submitted.
    It collects form values, validates them, and sends the data
    to the service to create a new employee.
  */
  const handleAddEmployee = async (e) => {
    e.preventDefault(); //it  prevent default form submission 

    // it Creates employee object from form input values
    const employee = {
      name: e.target.name.value,
      role: e.target.role.value,
      department: e.target.department.value,
    };

    //It  Check if any field is empty before submitting
    if (!employee.name || !employee.role || !employee.department) {
      alert("Please fill all fields");
      return;
    }

    try {
      //it  Call API service to add employee
      const result = await createEmployee(employee);

      // it Show success message and redirect to home page
      alert("Employee added");
      navigate('/');

      // it Reset form fields after successful submission
      e.target.reset();
    } catch (error) {
      //it Log error if something goes wrong
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="addEmployee">
      <div className="card w-100">
        <div className="card-header bg-dark text-white">
          Add Employee
        </div>

        <div className="card-body">
          <form onSubmit={handleAddEmployee}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter employee name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                placeholder="Enter role"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="department"
                placeholder="Enter department"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAdd;
