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
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import notFoundService from "../../assests/images/notFoundService.jpg";
import CloseIcon from "@mui/icons-material/Close";


const AgendaCard = () => {
  const [agenda, setAgenda] = useState([]);
  const [open, setOpen] = useState(false);


  // Recuperar o nome do usuário do localStorage
  let usuario = localStorage.getItem("nameUsuario");

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
      setOpen(true);
    } catch (error) {
      alert("Erro ao excluir a agenda:", error);
    }
  }

  //mensagens de alerta
  const AlertMsgSuccess = () => {
    return (
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 5 }}
          severity="success"
        >
          Excluído com sucesso!
        </Alert>
      </Collapse>
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AlertMsgSuccess />
      </Box>

      {agenda.length > 0 ? (
        agenda.map((agenda) => (
          <Accordion
            sx={{
              mt: 5,
              ml: 3,
              mr: 25,
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
                    onClick={() => deleteAgenda(agenda.id)}
                  />
                </Tooltip>
                <Tooltip title="Editar agenda">
                  <Button
                    endIcon={<BorderColorIcon sx={{ color: "black" }} />}
                    onClick={() => 'oi'}
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
              Não há serviços cadastrados!{" "}
            </Typography>
          </Grid>
        </Grid>
      )}

    </>
  );
};

export default AgendaCard;
