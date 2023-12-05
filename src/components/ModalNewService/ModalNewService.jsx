import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import { useState } from "react";

import { ref, push, set, get } from "firebase/database";
import db from "../../services/firebaseConfig";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 690,
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const animals = ["Cachorro", "Gato"];
  const sizeAnimals = ["Pequeno", "Médio", "Grande"];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAnimais((prevValues) => {
      const newValues = Array.isArray(value) ? value : [value];
      return newValues;
    });
  };

  const handleChangeSizeAnimals = (event) => {
    const {
      target: { value },
    } = event;
    setPorte((prevValues) => {
      const newValues = Array.isArray(value) ? value : [value];
      return newValues;
    });
  };

  const [servicos, setServicos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [animais, setAnimais] = useState([]);
  const [porte, setPorte] = useState([]);
  const [tempo, setTempo] = useState("");
  const [preco, setPreco] = useState("");

  const [servicosOptions, setServicosOptions] = useState([]);

  const [marcarMaisDeUm, setMarcarMaisDeUm] = useState(false);
  const [numeroDeServicos, setNumeroDeServicos] = useState("1");

  // Função para carregar as opções de serviços do Firebase
  const carregarOpcoesServicos = async () => {
    const servicosRef = ref(db, "servicos");

    try {
      const snapshot = await get(servicosRef);
      if (snapshot.exists()) {
        setServicosOptions(Object.values(snapshot.val()));
      }
    } catch (error) {
      console.error("Erro ao carregar opções de serviços:", error);
    }
  };

  useEffect(() => {
    carregarOpcoesServicos();
  }, []);

  const cadastrarServico = async () => {
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
        const servicosRef = push(
          ref(db, "IpetClientsWeb/" + usuario + "/servicos")
        );

        const servicosData = {
          servicos,
          descricao,
          animais,
          porte,
          tempo,
          preco,
          marcarMaisDeUm,
          numeroDeServicos,
        };

        set(servicosRef, servicosData).then(() => {
          showSnackbar("Serviço cadastrado com sucesso!");
        });

        setOpen(false);
        limparDados();
      } else {
        alert(
          "Usuário não encontrado. Por favor, cadastre o usuário primeiro."
        );
      }
    } catch (error) {
      showSnackbar(`Erro ao cadastrar serviço: ${error.message}`);
    }
  };

  const limparDados = () => {
    setServicos("");
    setDescricao("");
    setAnimais([]);
    setPorte([]);
    setTempo("");
    setPreco("");
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
                backgroundColor: " #ffa726",
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
                    <Select
                      label="Selecione um serviço"
                      id="servicos"
                      name="servicos"
                      sx={{ width: 650 }}
                      value={servicos}
                      onChange={(e) => setServicos(e.target.value)}
                    >
                      {servicosOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
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
                    <Select
                      sx={{ maxWidth: "300px", width: "300px" }}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={animais}
                      onChange={handleChange}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {animals.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="p">Porte: </Typography>
                    <br></br>
                    <Select
                      sx={{ maxWidth: "300px", width: "300px" }}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={porte}
                      onChange={handleChangeSizeAnimals}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {sizeAnimals.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="p">
                      Tempo de serviço: (em minutos)
                    </Typography>
                    <br></br>
                    <TextField
                      id="tempo"
                      name="tempo"
                      sx={{ width: 300 }}
                      value={tempo}
                      onChange={(e) => setTempo(e.target.value)}
                      type="number"
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

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={marcarMaisDeUm}
                          onChange={(e) => setMarcarMaisDeUm(e.target.checked)}
                        />
                      }
                      label="Deseja marcar mais de um serviço por horário?"
                    />
                    {marcarMaisDeUm && (
                      <>
                        <br></br>
                        <Typography variant="p">
                          Número de serviços:{" "}
                        </Typography>
                        <br></br>
                        <TextField
                          type="number"
                          value={numeroDeServicos}
                          onChange={(e) => setNumeroDeServicos(e.target.value)}
                        />
                      </>
                    )}
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
        >
          <Alert severity="success" sx={{ width: "100%", fontWeight: 600 }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
export default ModalNewService;
