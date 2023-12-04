import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Card,
  IconButton,
  Alert,
  Collapse,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { maskCnpj } from "../../utils/masks";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { firebaseApp } from "../../services/firebaseConfig";
import "./CardSingUp.css";

const CardSingUp = () => {
  const db = getDatabase(firebaseApp);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const handleEye = () => {
    setEye(!eye);
  };

  const [createUserWithEmailAndPassword, user, loadingSignUp] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, userSignIn, loadingSignIn] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const validateFields = () => {
    if (!name || !email || !cnpj || !password) {
      setError("Todos os campos são obrigatórios.");
      return false;
    }
    return true;
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      // Verifica se o e-mail já está cadastrado
      const userExists = await checkIfUserExists(email);
      if (userExists) {
        setError("Este e-mail já está cadastrado.");
        return;
      }

      await set(ref(db, "IpetClientsWeb/" + name), {
        cnpj: cnpj,
        email: email,
        name: name,
      });

      await createUserWithEmailAndPassword(email, password);

      <AlertSuccess />;

      localStorage.setItem("userName", JSON.stringify(name)); //Salvando nome do usuário logado

      navigate("/registerAddress");
    } catch (e) {
      setError("Erro ao cadastrar usuário. Por favor, tente novamente.");
      console.log("Erro:", e);
    }
  };

  const checkIfUserExists = async (email) => {
    try {
      const snapshot = await get(ref(db, "IpetClientsWeb"), {
        orderByChild: "email",
        equalTo: email,
      });

      return snapshot.exists() && snapshot.val().email === email;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false;
    }
  };

  const clearInputs = () => {
    setCnpj("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const AlertErrors = () => {
    const handleAlertClose = () => {
      setOpen(false);

      if (error) {
        clearInputs();
      }
    };

    return (
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="error"
        >
          {error}
        </Alert>
      </Collapse>
    );
  };

  const AlertSuccess = () => {
    const handleAlertClose = () => {
      setOpen(false);

      if (error) {
        clearInputs();
      }
    };

    return (
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity="success"
        >
          Usuário cadastrado com sucesso!
        </Alert>
      </Collapse>
    );
  };

  return (
    <>
      {error && <AlertErrors />}

      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          height: "550px",
          width: "610px",
          boxShadow: "10px 10px 25px 10px #FABF7C",
          paddingLeft: "50px",
        }}
      >
        <form>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "30px",
              color: "#000000",
              marginTop: "15px",
            }}
          >
            Cadastro de PetShops
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "15px",
              color: "#3f3f3f",
            }}
          >
            faça seu cadastro e aproveite os beneficios da iPet como lojista
          </Typography>

          <TextField
            variant="outlined"
            id="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            name="cnpj"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactsIcon />
                </InputAdornment>
              ),
            }}
            autoFocus
            onChange={(e) => setCnpj(e.target.value)}
            value={maskCnpj(cnpj)}
            sx={{
              width: "500px",
              marginTop: "20px",
              borderColor: "#3f3f3f",
            }}
          />

          <TextField
            variant="outlined"
            id="name"
            placeholder="Nome"
            name="name"
            autoComplete="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: "500px",
              marginTop: "20px",
            }}
          />

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
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "500px",
              marginTop: "20px",
            }}
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
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "500px",
              marginTop: "20px",
            }}
          />
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
              height: "45px",
              borderRadius: "15px",
              fontFamily: "Montserrat",
              fontWeight: "600",
              textTransform: "uppercase",
              marginTop: "30px",
              marginLeft: "90px",
            }}
            type="submit"
            variant="contained"
            onClick={handleRegisterUser}
          >
            Cadastre-se
          </Button>

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
            Já é cadastrado?{" "}
            <Link
              to="/login"
              style={{
                color: "#2a2a2a",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default CardSingUp;
