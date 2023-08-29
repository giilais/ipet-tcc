import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  Grid,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import LockIcon from "@mui/icons-material/Lock";
// import MailIcon from "@mui/icons-material/Mail";
// import { useFormik } from "formik";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import * as Yup from "yup";
// import Axios from "axios";
import { maskCnpj } from "../../utils/masks";

import { firebaseApp } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import Map from "../Map/Map";
//import errors from "../../utils/firebase-message";

const CardSingUpStepTwo = () => {
  const [cnpj, setCNPJ] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [numero, setNumero] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [uf, setUF] = useState("");
  const [isErro, setIsErro] = useState(false);
  const [open, setOpen] = useState(true);

  const db = getDatabase(firebaseApp);

  const navigate = useNavigate();

  const handleSingUpStepTwo = async (e) => {
    e.preventDefault();
    try {
      set(ref(db, "IpetClientsWeb/" + nomeFantasia), {
        cnpj: cnpj,
        nomeFantasia: nomeFantasia,
        razaoSocial: razaoSocial,
        logradouro: logradouro,
        municipio: municipio,
        numero: numero,
        uf: uf,
      });
      alert("Dados salvos com sucesso!");
      navigate("/home");
    } catch (e) {
      alert("Erro", e);
    }
  };

  // function isEmpty() {
  //   if (
  //     cnpj === "" ||
  //     logradouro === "" ||
  //     municipio === "" ||
  //     nomeFantasia === "" ||
  //     numero === "" ||
  //     razaoSocial === "" ||
  //     uf === ""
  //   ) {
  //     return true;
  //   }
  // }

  function isValidCNPJ(cnpj) {
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var c = String(cnpj).replace(/[^\d]/g, "");

    if (c.length !== 14) return false;

    if (/0{14}/.test(c)) return false;

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if (c[12] !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if (c[13] !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;

    return true;
  }

  return (
    <>
      {isErro ? (
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
            Todos os campos devem ser preenchidos!
          </Alert>
        </Collapse>
      ) : (
        ""
      )}

      <Card
        sx={{
          backgroundColor: " #ffdfde",
          borderRadius: "10px",
          height: "700px",
          width: "1000px",
          paddingX: "30px",
        }}
      >
        <Map />
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
            finalize seu cadastro e aproveite os beneficios da iPet como lojista
          </Typography>
          <TextField
            variant="outlined"
            id="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            name="cnpj"
            autoFocus
            onChange={(e) => setCNPJ(e.target.value)}
            value={maskCnpj(cnpj)}
            sx={{
              width: "550px",
              marginTop: "30px",
            }}
            onBlur={() => {
              if (!isValidCNPJ(cnpj)) {
                alert("CNPJ invalido!");
              }
            }}
          ></TextField>
          {console.log(cnpj)}
          <Grid container spacing={2}>
            <Grid item xs={6} container>
              <TextField
                variant="outlined"
                id="razaoSocial"
                label="Razão Social"
                placeholder="Razão social"
                name="razaoSocial"
                onChange={(e) => setRazaoSocial(e.target.value)}
                sx={{
                  width: "500px",
                  marginTop: "10px",
                }}
              />
              <TextField
                variant="outlined"
                id="municipio"
                label="Município"
                name="municipio"
                placeholder="Município"
                onChange={(e) => setMunicipio(e.target.value)}
                sx={{
                  width: "500px",
                  marginTop: "10px",
                }}
              />
              <TextField
                variant="outlined"
                id="logradouro"
                label="Logradouro"
                name="logradouro"
                placeholder="Logradouro"
                onChange={(e) => setLogradouro(e.target.value)}
                sx={{
                  width: "500px",
                  marginTop: "10px",
                }}
              />
            </Grid>
            <Grid item xs={6} container>
              <TextField
                variant="outlined"
                name="nomeFantasia"
                id="nomeFantasia"
                label="Nome Fantasia"
                placeholder="Nome Fantasia"
                onChange={(e) => setNomeFantasia(e.target.value)}
                sx={{
                  width: "500px",
                  marginTop: "10px",
                }}
              />
              <TextField
                variant="outlined"
                name="numero"
                id="numero"
                label="Número"
                placeholder="Número"
                onChange={(e) => setNumero(e.target.value)}
                sx={{
                  width: "500px",
                  marginTop: "10px",
                }}
              />
              <TextField
                variant="outlined"
                name="uf"
                id="uf"
                label="UF"
                placeholder="UF"
                onChange={(e) => setUF(e.target.value)}
                sx={{
                  width: "500px",
                  marginTop: "10px",
                }}
              />
            </Grid>
          </Grid>
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
            onClick={handleSingUpStepTwo}
          >
            Finalizar cadastro
          </Button>
        </form>
      </Card>
    </>
  );
};

export default CardSingUpStepTwo;
