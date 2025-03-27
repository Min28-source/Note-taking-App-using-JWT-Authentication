import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
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
    const response = await axios.post("http://localhost:8080/auth/login", {
      username: formData.username,
      password: formData.password,
    });
    if (response.data.token) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/notes");
    } else {
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Username"
            name="username"
            type="username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
            value={formData.username}
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
            value={formData.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <p>
          Do not have an Account? Sign in <Link to={"/signup"}>here</Link>
        </p>
      </Box>
    </Container>
  );
};

export default Login;
