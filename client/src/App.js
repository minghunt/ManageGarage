import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./components/Login/Login";
import ResetPassword from "./components/Login/ResetPassword";
import Task from "./components/Task/Task";
import Rule from "./components/Rule/Rule";
import Report from "./components/Report/Report";
import User from './components/User/User';
import ManageUser from "./components/ManageUser/ManageUser";
function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userRole = useSelector((state) => state.user.userRole);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={isLoggedIn ? <Navigate to={'/Task'} replace /> :<Login />} />
        <Route path="/reset-password" element ={isLoggedIn ? <Navigate to={'/Task'} replace /> :<ResetPassword />} />
        <Route path="/Task" element ={!isLoggedIn ? <Navigate to={'/'} replace /> : <Task/>}/>
        <Route path="/Report" element ={!isLoggedIn ? <Navigate to={'/'} replace /> : <Report />} />
        <Route path="/Rule" element ={(!isLoggedIn || userRole !== "admin" ) ? <Navigate to={'/'} replace /> : <Rule />} />
        <Route path="/user" element ={!isLoggedIn ? <Navigate to={'/'} replace /> : <User />} />
        <Route path="/ManageUser" element ={!isLoggedIn ? <Navigate to={'/'} replace /> : <ManageUser />} />
      </Routes>
    </div>
  );
}

export default App;
