import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Typography, Container, Button } from "@mui/material";

import { useGetUserInfoQuery } from "../redux/services/authService";

const TestAuthPage = () => {
  const navigate = useNavigate();

  const { data: user, error, isLoading } = useGetUserInfoQuery();

  useEffect(() => {
    if (error) {
      navigate("/register");
    }
  }, [error, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">Hello, {user?.username}</Typography>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/register");
        }}
        variant="contained"
        color="secondary"
      >
        Log Out
      </Button>
    </Container>
  );
};

export default TestAuthPage;
