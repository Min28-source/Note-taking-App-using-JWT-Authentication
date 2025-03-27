import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        username: formData.username,
        password: formData.password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/notes");
      console.log(response.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="xs">
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "64px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Sign Up
        </Button>
        <p>
          Already have an account? Login <Link to={"/login"}>here</Link>
        </p>
      </form>
    </Container>
  );
};

export default Signup;
