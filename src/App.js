import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Registration />} /> */}

        {/* Dashboard mock */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
