import Button from "@mui/material/Button";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>Capture Your Thoughts, Anytime, Anywhere</h1>
      <Link to={"/notes"} style={{ textDecoration: "none" }}>
        <Button variant="contained">New Note</Button>
      </Link>
    </div>
  );
}
