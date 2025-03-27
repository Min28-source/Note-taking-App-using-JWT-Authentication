import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const check = () => {
    const token = localStorage.getItem("token");

    if (token) {
      return true;
    } else {
      false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //check user logged in
  useEffect(() => {
    const fetchData = () => {
      const trueOrFalse = check();
      setIsOwner(trueOrFalse);
    };
    fetchData();
  }, [isOwner, handleLogout]);

  return (
    <nav className="navbar">
      {!isOwner ? (
        <>
          <Link to={"/signup"}>Signup</Link>
          <br />
          <Link to={"/login"}>Login</Link>
          <br />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>logout</button>
        </>
      )}

      <br />
      <Link to={"/"}>Home</Link>
    </nav>
  );
}
