import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Card,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonIcon from "@mui/icons-material/Person";
import { maskCnpj } from "../../utils/masks";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import "./CardSingUp.css";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseApp } from "../../services/firebaseConfig";

const CardSingUp = () => {
  const db = getDatabase(firebaseApp);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const handleEye = () => {
    setEye(!eye);
  };

  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (user) {
    navigate("/login");
  }

  // const isValidCNPJ = (cnpj) => {
  //   // Remove characters that are not digits
  //   cnpj = cnpj.replace(/\D/g, "");

  //   // CNPJ must have exactly 14 digits
  //   if (cnpj.length !== 14) {
  //     return false;
  //   }

  //   // Validate CNPJ using a checksum algorithm
  //   const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  //   const sum1 = cnpj
  //     .slice(0, 12)
  //     .split("")
  //     .map(Number)
  //     .reduce((acc, digit, index) => acc + digit * weights[index], 0);

  //   const remainder1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11);

  //   if (remainder1 !== Number(cnpj.charAt(12))) {
  //     return false;
  //   }

  //   const sum2 = cnpj
  //     .slice(0, 13)
  //     .split("")
  //     .map(Number)
  //     .reduce((acc, digit, index) => acc + digit * weights[index], 0);

  //   const remainder2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11);

  //   if (remainder2 !== Number(cnpj.charAt(13))) {
  //     return false;
  //   }

  //   return true;
  // };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    // if (isValidCNPJ(cnpj)) {
    //   alert("CNPJ invalido!");
    //   console.log(cnpj);
    //   console.log(isValidCNPJ(cnpj));
    // } else {
      try {
        await set(ref(db, "IpetClientsWeb/" + name), {
          cnpj: cnpj,
          email: email,
          name: name,
        });

        await createUserWithEmailAndPassword(email, password);

        alert("Usuário criado com sucesso!");

        navigate("/home");
      } catch (e) {
        alert("Erro", e);
        console.log("erro:", e);
      }
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: " #ffdfde",
          borderRadius: "20px",
          height: "550px",
          width: "550px",
          paddingLeft: "30px",
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
              marginTop: "20px",
            }}
          >
            Já é cadastrado? <Link to="/login">Login</Link>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default CardSingUp;
