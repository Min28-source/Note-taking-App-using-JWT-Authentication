import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./create.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  function handletitle(e) {
    setFormTitle(e.target.value);
  }

  const [formbody, setFormBody] = useState("");
  function handlebody(e) {
    setFormBody(e.target.value);
  }

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      await axios.post(
        "http://localhost:8080/create",
        {
          title: formTitle,
          body: formbody,
          user: userId,
        },
        {
          headers: { 
            Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        }
      );
      navigate("/notes");
    }catch(e){
      console.log(e.message);
    }
  }

  return (
    <div className="box">
      <form style={{ width: "80%" }} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="title"
          label="Note Title"
          variant="outlined"
          placeholder="Give a title to your note"
          required
          onChange={handletitle}
          value={formTitle}
        />
        <br />
        <br />
        <TextField
          fullWidth
          name="body"
          label="Note Body"
          variant="outlined"
          placeholder="Today, I did this..."
          required
          multiline
          rows={4}
          onChange={handlebody}
          value={formbody}
        />
        <br />
        <br />
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateNote;
