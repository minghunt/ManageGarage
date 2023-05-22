import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Task from "./components/Task/Task";
import Rule from "./components/Rule/Rule";
import Report from "./components/Report/Report";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Task" element={<Task/>}/>
        <Route path="/Report" element ={<Report />} />
        <Route path="/Rule" element ={<Rule />} />

      </Routes>
    </div>
  );
}

export default App;
