import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import db from "../../services/firebaseConfig";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditAgendaModal from "../EditAgendaModal/EditAgendaModal";

const AgendaCard = () => {
  const [agenda, setAgenda] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAgendaDetails, setEditAgendaDetails] = useState(null);

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
      alert("Excluido com sucesso!");
    } catch (error) {
      alert("Erro ao excluir a agenda:", error);
    }
  }

  const handleEditAgenda = (id) => {
    const agendaToEdit = agenda.find((item) => item.id === id);
    setEditAgendaDetails(agendaToEdit);
    setEditModalOpen(true);
  };

  return (
    <>
      <EditAgendaModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        agendaDetails={editAgendaDetails}
      />

      {agenda.map((agenda) => (
        <Accordion
          sx={{
            mt: 5,
            ml: 3,
            mr: 3,
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
                  onClick={() => handleEditAgenda(agenda.id)}
                />
              </Tooltip>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#ffcc80" }}>
            <Grid container>
              <Grid item xs={10}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        paddingBottom: "5px",
                      }}
                    >
                      Horario de Inicio de Atendimento: {agenda.horarioInicio}
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
                      Horario de Fim de Atendimento: {agenda.horarioFim}
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
                    Dias de Atendimento: {agenda?.dias.join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default AgendaCard;
