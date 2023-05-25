import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./components/Login/Login";
import Task from "./components/Task/Task";
import Rule from "./components/Rule/Rule";
import Report from "./components/Report/Report";
function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isUserRoleAdmin = useSelector((state) => state.user.isUserRoleAdmin);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={isLoggedIn ? <Navigate to={'/Task'} replace /> :<Login />} />
        <Route path="/Task" element ={!isLoggedIn ? <Navigate to={'/'} replace /> : <Task/>}/>
        <Route path="/Report" element ={!isLoggedIn ? <Navigate to={'/'} replace /> : <Report />} />
        <Route path="/Rule" element ={(!isLoggedIn || !isUserRoleAdmin ) ? <Navigate to={'/'} replace /> : <Rule />} />

      </Routes>
    </div>
  );
}

export default App;
