import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useRegisterMutation } from "../redux/services/authService";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobile: "",
            }}
            validationSchema={validationSchema}
            onSubmit={({ username, confirmPassword, ...values }) => {
              register({
                name: username,
                password_confirmation: confirmPassword,
                ...values,
              })
                .unwrap()
                .then((res) => {
                  localStorage.setItem("token", res.token);
                  navigate("/test-auth");
                })
                .catch((err) => {
                  console.error("Registration failed:", err);
                });
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="username"
                      as={TextField}
                      label="Username"
                      fullWidth
                      helperText={<ErrorMessage name="username" />}
                      error={Boolean(errors.username)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      type="email"
                      fullWidth
                      helperText={<ErrorMessage name="email" />}
                      error={Boolean(errors.email)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="mobile"
                      as={TextField}
                      label="Mobile"
                      type="tel"
                      fullWidth
                      helperText={<ErrorMessage name="mobile" />}
                      error={Boolean(errors.mobile)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="password"
                      as={TextField}
                      label="Password"
                      type="password"
                      fullWidth
                      helperText={<ErrorMessage name="password" />}
                      error={Boolean(errors.password)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="confirmPassword"
                      as={TextField}
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      helperText={<ErrorMessage name="confirmPassword" />}
                      error={Boolean(errors.confirmPassword)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ErrorMessage
                      name="general"
                      component="div"
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "loading..." : "Register"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegistrationForm;
