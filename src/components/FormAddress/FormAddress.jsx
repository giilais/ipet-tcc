import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { push, ref, set } from "firebase/database";
import db from "../../services/firebaseConfig";

const FormAddress = (props) => {
  // const { register, handleSubmit, setValue, setFocus } = useForm();
  const { register, setValue, setFocus, handleSubmit } = useForm();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const onSubmit = (e) => {
    console.log(e);
  };

  const [dataCEP, setDataCEP] = useState({
    cep: "",
    uf: "",
    city: "",
    neighborhood: "",
    address: "",
    addressNumber: "",
    complement: "",
  });

  const navigate = useNavigate();

  const convertCEP = (e) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${dataCEP.cep}&key=SUA_CHAVE`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setLatitude(location.lat);
          setLongitude(location.lng);
        } else {
          alert("Endereço não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao converter CEP:", error);
      });
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("checkCEP:", data);
        setValue("address", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("addressNumber");
        setDataCEP({
          cep: data.cep,
          uf: data.uf,
          city: data.localidade,
          neighborhood: data.bairro,
          address: data.logradouro,
          addressNumber: "",
          complement: "",
        });
      });
  };

  const cadastrarEndereco = async () => {
    try {
      let usuario = localStorage.getItem("nameUsuario");

      if (
        usuario &&
        usuario.length > 2 &&
        usuario.charAt(0) === '"' &&
        usuario.charAt(usuario.length - 1) === '"'
      ) {
        usuario = usuario.slice(1, -1);
      }

      if (usuario) {
        convertCEP();

        const clienteEnderecoRef = push(
          ref(db, "IpetClientsWeb/" + usuario + "/endereco")
        );

        const enderecoData = {
          longitude,
          latitude,
          ...dataCEP,
        };

        set(clienteEnderecoRef, enderecoData).then(() => {
          alert("Endereço cadastrado com sucesso!");
          navigate("/registerStoreManager");
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
              }}
            >
              Endereço da loja
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
              Preencha as informações de endereço da sua loja
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">CEP</Typography>
              <br></br>
              <TextField
                id="cep"
                variant="outlined"
                type="text"
                {...register("cep")}
                onBlur={checkCEP}
                sx={{ width: "750px" }}
              />
              <br></br>
              <a
                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descubra seu CEP
              </a>
            </Grid>

            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Estado</Typography>
              <br></br>
              <TextField
                id="uf"
                variant="outlined"
                type="text"
                {...register("uf")}
                sx={{ width: "350px" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Cidade</Typography>
              <br></br>
              <TextField
                id="city"
                variant="outlined"
                type="text"
                {...register("city")}
                sx={{ width: "350px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">Bairro</Typography>
              <br></br>
              <TextField
                id="neighborhood"
                variant="outlined"
                type="text"
                {...register("neighborhood")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">Rua</Typography>
              <br></br>
              <TextField
                id="address"
                variant="outlined"
                type="text"
                {...register("address")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Nº</Typography>
              <br></br>
              <TextField
                id="addressNumber"
                variant="outlined"
                type="text"
                {...register("addressNumber")}
                sx={{ width: "350px" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Complemento (opcional)</Typography>
              <br></br>
              <TextField
                id="complement"
                variant="outlined"
                type="text"
                sx={{ width: "350px" }}
              />
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
              onClick={cadastrarEndereco}
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FormAddress;
