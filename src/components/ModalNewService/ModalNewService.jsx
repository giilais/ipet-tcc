import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, InputAdornment, Snackbar, TextField } from "@mui/material";

import { useState } from "react";

import { ref, push, set } from "firebase/database";
import db from "../../services/firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
const ModalNewService = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [servicos, setServicos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [animais, setAnimais] = useState("");
  const [porte, setPorte] = useState("");
  const [tempo, setTempo] = useState("");
  const [preco, setPreco] = useState("");

  const cadastrarServico = () => {
    const novoServicoRef = push(ref(db, "servicos"));
    set(novoServicoRef, {
      servicos,
      descricao,
      animais,
      porte,
      tempo,
      preco,
    })
      .then(() => {
        showSnackbar("Serviço cadastrado com sucesso!");
      })
      .catch((error) => {
        showSnackbar(`Erro ao cadastrar serviço: ${error.message}`);
      });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <div>
        <Grid container>
          <Button
            onClick={handleOpen}
            sx={{
              fontFamily: "Montserrat",
              color: "#ffffff",
              backgroundColor: "#000000",
              "&:hover": {
                backgroundColor: " #ffdfde",
                color: "#000000",
                transition: "400ms",
              },
              width: "200px",
              height: "50px",
              mr: 3,
              mt: 2,
              padding: 3,
            }}
          >
            Novo Serviço
          </Button>
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h1"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "30px",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Novo Serviço
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{
                  mt: 1,
                  fontFamily: "Montserrat",
                  fontSize: "15px",
                  fontWeight: 300,
                  textAlign: "center",
                  mb: 2,
                }}
              >
                preencha todos os campos para adicionar um novo serviço a sua
                loja.
              </Typography>

              <Box>
                <Grid container sx={{ marginBottom: 1 }} alignItems={"center"}>
                  <Grid item xs={12}>
                    <Typography variant="p">Serviços: </Typography>
                    <br></br>
                    <TextField
                      id="servicos"
                      name="servicos"
                      sx={{ width: 650 }}
                      value={servicos}
                      onChange={(e) => setServicos(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container sx={{ marginBottom: 1 }}>
                  <Typography variant="p">Descrição: </Typography>
                  <br></br>
                  <TextField
                    id="descricao"
                    name="descricao"
                    multiline
                    rows={2}
                    sx={{ width: 650 }}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </Grid>

                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="p">Animais: </Typography>
                    <br></br>

                    <TextField
                      id="animais"
                      name="animais"
                      sx={{ width: 300 }}
                      value={animais}
                      onChange={(e) => setAnimais(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="p">Porte: </Typography>
                    <br></br>
                    <TextField
                      id="porte"
                      name="porte"
                      sx={{ width: 300 }}
                      value={porte}
                      onChange={(e) => setPorte(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="p">Tempo de serviço: </Typography>
                    <br></br>
                    <TextField
                      id="tempo"
                      name="tempo"
                      sx={{ width: 300 }}
                      value={tempo}
                      onChange={(e) => setTempo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="p">Preço: </Typography>
                    <br></br>
                    <TextField
                      id="preco"
                      name="preco"
                      type="number"
                      sx={{ width: 300 }}
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </Grid>
                </Grid>

                <Grid container justifyContent={"end"}>
                  <Button
                    sx={{
                      fontFamily: "Montserrat",
                      color: "#ffffff",
                      backgroundColor: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        transition: "400ms",
                      },
                      width: "130px",
                      height: "50px",
                      marginTop: "20px",
                    }}
                    onClick={cadastrarServico}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Fade>
        </Modal>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </div>
    </>
  );
};
export default ModalNewService;
