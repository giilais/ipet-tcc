import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import db from "../../services/firebaseConfig";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
//import BorderColorIcon from "@mui/icons-material/BorderColor";
import notFoundService from "../../assests/images/notFoundService.jpg";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const AgendaCard = () => {
  const [agenda, setAgenda] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Recuperar o nome do usuário do localStorage
  let usuario = localStorage.getItem("userName");

  if (
    usuario &&
    usuario.length > 2 &&
    usuario.charAt(0) === '"' &&
    usuario.charAt(usuario.length - 1) === '"'
  ) {
    usuario = usuario.slice(1, -1); //removendo as aspas
  }

  // Criar uma referência para a agenda do usuário
  const agendaRef = ref(db, "IpetClientsWeb/" + usuario + "/agenda");

  useEffect(() => {
    if (agendaRef) {
      onValue(agendaRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const agendaList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAgenda(agendaList);
        } else {
          setAgenda([]);
        }
      });
    }
  }, [agendaRef]);

  async function deleteAgenda(id) {
    try {
      await remove(ref(db, "IpetClientsWeb/" + usuario + "/agenda/" + id));
      setAgenda((prevAgenda) =>
        prevAgenda.filter((agenda) => agenda.id !== id)
      );
      setOpenAlert(true);
    } catch (error) {
      alert("Erro ao excluir a agenda:", error);
    }
  }

  //mensagens de alerta
  const AlertMsgSuccess = () => {
    return (
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpenAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            mb: 3,
            position: "fixed",
            top: 20,
            left: 20,
            mt: 15,
          }}
          severity="success"
        >
          Excluído com sucesso!
        </Alert>
      </Collapse>
    );
  };

  return (
    <>
      <AlertMsgSuccess />

      {agenda.length > 0 ? (
        agenda.map((agenda) => (
          <>
            <Accordion
              sx={{
                mt: 5,
                ml: 3,
                mr: 5,
                width: "800px",
                backgroundColor: "#ffcc80",
              }}
              key={agenda.id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container>
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "20px",
                      fontWeight: 600,
                    }}
                  >
                    Minha Agenda
                  </Typography>
                </Grid>

                <Grid container justifyContent={"end"}>
                  <Tooltip title="Deletar agenda">
                    <Button
                      endIcon={<DeleteIcon sx={{ color: "black" }} />}
                      onClick={() => setOpen(true, agenda.id)}
                    />
                  </Tooltip>
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#ffcc80" }}>
                <Grid container>
                  <Grid item xs={10}>
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            paddingBottom: "5px",
                          }}
                        >
                          <b>Horário de Início de Atendimento:</b>
                          {agenda.horarioInicio}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            paddingBottom: "5px",
                          }}
                        >
                          <b>Horario de Fim de Atendimento:</b>{" "}
                          {agenda.horarioFim}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Typography
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          paddingBottom: "5px",
                        }}
                      >
                        <b>Dias de Atendimento: </b>
                        {agenda?.dias?.join(", ")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Botão para confirmação da exclusão  */}
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "20px",
                  fontWeight: 700,
                  padding: 2,
                  color: "#000000",
                }}
              >
                Confirmar Cancelamento
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: 2,
                    color: "#000000",
                  }}
                >
                  <b>Tem certeza de que deseja excluir sua agenda?</b>
                  <br></br>
                  <br></br>
                  <p>
                    Atenção! Ao excluir a agenda os agendamentos já presentes
                    continuaram validos caso queira cancelar algum agendamento{" "}
                  </p>
                  <Link
                    style={{
                      color: "#2a2a2a",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                    to="/meusAgendamentos"
                  >
                    clique aqui
                  </Link>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpen(false)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: 2,
                    color: "#000000",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    deleteAgenda(agenda.id);
                    setOpen(false);
                  }}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: 2,
                    color: "#000000",
                  }}
                >
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ))
      ) : (
        <Grid container sx={{ mr: 20 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: 600,
                marginTop: 15,
              }}
            >
              <img src={notFoundService} alt="By storyset on Freepik" />
            </Box>
          </Grid>
          <Grid item xs={12} container justifyContent={"center"}>
            <Typography
              variant="p"
              sx={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Não há agenda cadastrada!{" "}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AgendaCard;
