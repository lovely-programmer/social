import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
