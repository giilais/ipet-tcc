import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { push, ref, set } from "firebase/database";
import InputMask from "react-input-mask";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import db from "../../services/firebaseConfig";

const FormStoreManager = () => {
  const { handleSubmit } = useForm();

  const [nameRes, setNameRes] = useState("");
  const [cpf, setCPF] = useState("");

  const onSubmit = (e) => {
    console.log(e);
  };

  const navigate = useNavigate();

  const cadastrarInformacoes = async () => {
    try {
      let usuario = localStorage.getItem("userName");

      if (
        usuario &&
        usuario.length > 2 &&
        usuario.charAt(0) === '"' &&
        usuario.charAt(usuario.length - 1) === '"'
      ) {
        usuario = usuario.slice(1, -1);
      }

      if (usuario) {
        const clienteInfoRef = push(
          ref(db, "IpetClientsWeb/" + usuario + "/responsavelLoja")
        );

        const infoData = {
          nomeResponsavel: nameRes,
          cpf: cpf,
        };

        set(clienteInfoRef, infoData).then(() => {
          alert("Informações cadastrado com sucesso!");
          navigate("/home");
        });
      } else {
        alert(
          "Usuário não encontrado. Por favor, cadastre o usuário primeiro."
        );
      }
    } catch (error) {
      alert(`Erro ao cadastrar endereço: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
        width: "800px",
        pl: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "800px",
          justifyContent: "flex-start",
          mb: 3,
        }}
      >
        <Grid>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 400,
                fontSize: "45px",
                color: "#000000",
                mb: 2,
              }}
            >
              Responsável da loja
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="p"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              Informe os dados da pessoa que tem o nome no contrato social da
              empresa, seja como dona, sócia ou sócia administrativa.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">Nome completo</Typography>
              <br></br>
              <TextField
                id="nameRes"
                variant="outlined"
                type="text"
                onChange={(e) => setNameRes(e.target.value)}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">CPF do responsável legal</Typography>
              <br></br>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              >
                {() => (
                  <TextField
                    id="cpf"
                    variant="outlined"
                    type="text"
                    sx={{ width: "750px" }}
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{
                color: "#fff",
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#000",
                  transition: "400ms",
                  boxShadow: "10px 10px 15px 10px #FABF7C",
                },
                width: "300px",
                height: "45px",
                borderRadius: "15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                textTransform: "uppercase",
                marginTop: "30px",
              }}
              onClick={cadastrarInformacoes}
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FormStoreManager;
