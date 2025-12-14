import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";
import UpdateEmployee from "./components/EmployeeUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeAdd />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
