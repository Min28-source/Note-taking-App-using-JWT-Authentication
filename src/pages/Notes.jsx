import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import "./Notes.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Notes() {
  const [notesList, setNotesList] = useState([]);

  async function deleteNote(id) {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/notes/${id}`, {
      headers: { Authorization: `${token}` },
    });
    setNotesList((prevNotes) => prevNotes.filter((note) => note._id !== id));
  }

  async function fetchNotes() {
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).id;
    const response = await axios.get(`http://localhost:8080/notes/${userId}`, {
      headers: { Authorization: `${token}` },
    });
    if (!response.data) {
      console.log("error");
    } else {
      setNotesList(response.data);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="box">
        <h1>My Notes</h1>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {notesList.map((note) => (
            <Card>
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h5" component="div">
                  {note.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {note.body}
                </Typography>
                <br />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        <br />
        <br />
        <Button variant="contained">
          <Link
            to={"/create"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Create new note
          </Link>
        </Button>
      </div>
    </>
  );
}
