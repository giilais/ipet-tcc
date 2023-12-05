import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Chip,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import "date-fns";
import { useState } from "react";

import { ref, push, set, get } from "firebase/database";
import db from "../../services/firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 470,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
const ModalAgenda = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertError, setAlertErrorOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [dias, setDias] = useState([]);

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

  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDias(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const cadastrarAgenda = async () => {
    let usuario = localStorage.getItem("userName");

    // Verificar se a variável usuario não é nula e não está vazia
    if (
      usuario &&
      usuario.length > 2 &&
      usuario.charAt(0) === '"' &&
      usuario.charAt(usuario.length - 1) === '"'
    ) {
      usuario = usuario.slice(1, -1); // retirando as aspas
    }

    const agendaRef = ref(db, "IpetClientsWeb/" + usuario + "/agenda");

    try {
      const snapshot = await get(agendaRef);

      // Verificar se já existe uma agenda
      if (snapshot.exists()) {
        // Já existe uma agenda, mostrar mensagem de erro
        setAlertErrorOpen(true);
        handleClose();
      } else {
        // Não existe uma agenda, realizar o cadastro
        const newAgendaRef = push(agendaRef);
        await set(newAgendaRef, { horarioInicio, horarioFim, dias });
        setAlertOpen(true);
        setOpen(false);
        setHorarioFim("");
        setHorarioInicio("");
        setDias([]);
      }
    } catch (error) {
      alert(`Erro ao verificar/agendar: ${error.message}`);
    }
  };

  //mensagens de alerta
  const AlertMsgSuccess = () => {
    const handleAlertClose = () => {
      setAlertOpen(false);
    };

    return (
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleAlertClose();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="success"
          sx={{
            mb: 3,
            position: "fixed",
            top: 20,
            left: 20,
            mt: 15,
          }}
        >
          Agenda cadastrada com sucesso!
        </Alert>
      </Collapse>
    );
  };

  //mensagens de alerta
  const AlertMsgError = () => {
    const handleAlertClose = () => {
      setAlertErrorOpen(false);
    };

    return (
      <Collapse in={alertError}>
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
          severity="error"
          sx={{
            mb: 3,
            mt: 15,
            position: "fixed",
            top: 20,
            left: 20,
          }}
        >
          Erro ao cadastrar agenda! Você já tem uma agenda cadastrada
        </Alert>
      </Collapse>
    );
  };

  return (
    <>
      <div>
        <AlertMsgSuccess />
        <AlertMsgError />

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
            Criar Agenda
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
                Agenda
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
                preencha todos os campos para configuração inicial da agenda.
              </Typography>

              <Box>
                <Grid
                  container
                  sx={{ marginBottom: 1, marginLeft: "45px" }}
                  alignItems={"center"}
                >
                  <Grid item xs={6} sx={{ mt: 2 }}>
                    <Typography variant="p">Horário de Inicio: </Typography>
                    <br></br>

                    <TextField
                      id="time-initial"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: "250px" }}
                      onChange={(e) => setHorarioInicio(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6} sx={{ mt: 2 }}>
                    <Typography variant="p">
                      Horario de Encerramento:{" "}
                    </Typography>
                    <br></br>
                    <TextField
                      id="time-f"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: "250px" }}
                      onChange={(e) => setHorarioFim(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant="p">Dias de Atendimento: </Typography>
                    <br></br>
                    <Select
                      sx={{ maxWidth: "600px", width: "600px" }}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={dias}
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
                      {days.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                <Grid container justifyContent={"center"} sx={{ mt: 4 }}>
                  <Button
                    sx={{
                      fontFamily: "Montserrat",
                      color: "#ffffff",
                      backgroundColor: "#000000",
                      "&:hover": {
                        backgroundColor: " #ffa726",
                        color: "#000000",
                        transition: "400ms",
                      },
                      width: "130px",
                      height: "50px",
                      marginTop: "20px",
                    }}
                    onClick={cadastrarAgenda}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};
export default ModalAgenda;
