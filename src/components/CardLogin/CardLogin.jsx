import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Card,
  Grid,
  Alert,
  IconButton,
  Collapse,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";

const CardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const [open, setOpen] = useState(true);

  const handleEye = () => {
    setEye(!eye);
  };

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  if (user) {
    navigate("/home");
    console.log("Entrou no user");
  }
  if (loading) {
    return <p>carregando...</p>;
  }

  const AlertErrors = () => {
    return (
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="error"
        >
          Erro!
        </Alert>
      </Collapse>
    );
  };

  return (
    <>
      {error ? <AlertErrors /> : ""}

      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          height: "550px",
          width: "550px",
          boxShadow: '10px 10px 25px 10px #FABF7C'
        }}
      >
        <form>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "30px",
              color: "#000000",
              marginTop: "40px",
              paddingLeft: "30px",
            }}
          >
            Login de PetShops
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "15px",
              color: "#3f3f3f",
              paddingLeft: "30px",
            }}
          >
            faça o login e aproveite os beneficios da iPet
          </Typography>

          <Grid container justifyContent={"center"}>
            <TextField
              variant="outlined"
              id="email"
              placeholder="E-mail"
              name="email"
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "500px",
                marginTop: "50px",
                borderColor: "#000000",
              }}
              error={!email}
            />
            <TextField
              variant="outlined"
              name="password"
              placeholder="Senha"
              type={eye ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleEye}>
                      {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "500px",
                marginTop: "20px",
              }}
              error={!password}
            />
          </Grid>

          <Grid container justifyContent={"center"}>
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#000",
                  transition: "400ms",
                },
                width: "300px",
                height: "50px",
                borderRadius: "15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                textTransform: "uppercase",
                marginTop: "50px",
              }}
              type="submit"
              variant="contained"
              onClick={() => signInWithEmailAndPassword(email, password)}
            >
              Entrar
            </Button>
          </Grid>

          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "15px",
              color: "#3f3f3f",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Esqueceu a senha?{" "}
            <Link
              style={{ color: "#2a2a2a", textDecoration: "none" }}
              to="/resetPassword"
            >
              Redefinir
            </Link>
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "15px",
              color: "#3f3f3f",
              marginTop: "40px",
              paddingLeft: "30px",
            }}
          >
            Não é cadastrado?{" "}
            <Link
              to="/singUp"
              style={{ color: "#2a2a2a", textDecoration: "none" }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default CardLogin;
