import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetail from "./pages/TaskDetail";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}
export default App;
