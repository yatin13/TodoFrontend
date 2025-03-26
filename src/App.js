import "./css/main.css"
import { BrowserRouter as Router, Routes, Link, Route, Navigate } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from "./components/Login";
import Signup from "./components/signup"
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    user: state
  };
};

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("userToken");
    if (isLogged) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn,props.user.auth.user]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
      <Router>
        <div className="w-full">
          <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold">Todo App</Link>
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="hover:text-gray-300">Login</Link>
                  <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                </>
              ) : (
                <>
                  <Link to="/addTodo" className="hover:text-gray-300">Add Todo</Link>
                  <Link to="/todos" className="hover:text-gray-300">Todos</Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 border border-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-900 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
  
          <div className="p-6">
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              ) : (
                <>
                  <Route path="/addTodo" element={<AddTodo />} />
                  <Route path="/todos" element={<Todos />} />
                  <Route path="*" element={<Navigate to="/addTodo" replace />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default connect(mapStateToProps)(App);
