import React, { useRef, useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
const {login} =useAuth();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!firstName || !lastName ||!email ||!password){
      setError("Check Your Data ! ");

      return;
    }
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError("Unable to register User , please try differnce cradiential ! ");
      return;
    }

    const token = await response.json();
    if(!token){
      setError("Incorect Token")
      return;
    }
    login(email , token);
    
 
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
          mt: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
          component="h1"
          gutterBottom
        >
          Sign Up
        </Typography>
        <TextField
          inputRef={firstNameRef}
          label="First Name"
          name="firstName"
          required
          fullWidth
        />
        <TextField
          inputRef={lastNameRef}
          label="Last Name"
          name="lastName"
          required
          fullWidth
        />
        <TextField
          inputRef={emailRef}
          label="Email"
          name="email"
          type="email"
          required
          fullWidth
        />
        <TextField
          inputRef={passwordRef}
          label="Password"
          name="password"
          type="password"
          required
          fullWidth
        />
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
        {error && (
          <Typography sx={{color:"red" , textAlign: "center" }} gutterBottom>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Register;
