import React, { useEffect, useState } from "react";
import "./MeusAgendamentos.css";
import "rsuite/dist/rsuite.css";
import { format } from "date-fns";

import ResponsiveAppBar from "../../components/AppBar/AppBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarComponent from "../../components/Calendar/Calendar";
import { DatePicker } from "rsuite";
import { onValue, ref, remove } from "firebase/database";
import db from "../../services/firebaseConfig";

const FilteredAppointmentsCard = ({ filteredAgendamentos }) => {
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleClickOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelAgendamento = () => {
    let usuario = localStorage.getItem("userName");

    if (
      usuario &&
      usuario.length > 2 &&
      usuario.charAt(0) === '"' &&
      usuario.charAt(usuario.length - 1) === '"'
    ) {
      usuario = usuario.slice(1, -1);
    }

    const agendamentosRef = ref(
      db,
      "IpetClientsWeb/" + usuario + "/agendamentos/" + selectedAppointment.id
    );

    remove(agendamentosRef)
      .then(() => {
        alert("Agendamento cancelado com sucesso!");
      })
      .catch((error) => {
        alert("erro:", error.message);
      });
    handleClose();
  };

  return (
    <>
      {filteredAgendamentos.map((appointment) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Accordion
            sx={{
              mt: 5,
              ml: 3,
              mr: 3,
              mb: 2,
              width: "800px",
              backgroundColor: "#ffcc80",
            }}
            key={appointment.id}
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
                  Serviço: {appointment.servico}
                </Typography>
              </Grid>

              <Grid container justifyContent={"end"}>
                <Tooltip title="Cancelar agendamento" key={appointment.id}>
                  <Button
                    endIcon={<CancelIcon sx={{ color: "black" }} />}
                    onClick={() => handleClickOpen(appointment)}
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
                        Horário: {appointment.horario}
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
                        Cliente: {appointment.nomeCliente}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}

      {/* Botão para confirmação da exclusão  */}
      <Dialog open={open} onClose={handleClose}>
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
            <b>Tem certeza de que deseja cancelar o agendamento?</b>
            <br></br>
            Agendamento: {selectedAppointment?.nomeCliente} -
            {selectedAppointment?.servico} - {selectedAppointment?.horario}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
            onClick={handleCancelAgendamento}
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
  );
};

const MeusAgendamentos = () => {
  const styles = { width: 200, marginBottom: 10, zIndex: 1300, marginLeft: 16 };

  const [selectedDate, setSelectedDate] = useState(null);
  const [agendamentosDt, setAgendamentosDt] = useState([]);
  const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);

  let usuario = localStorage.getItem("userName");

  if (
    usuario &&
    usuario.length > 2 &&
    usuario.charAt(0) === '"' &&
    usuario.charAt(usuario.length - 1) === '"'
  ) {
    usuario = usuario.slice(1, -1);
  }

  const agendamentosRef = ref(
    db,
    "IpetClientsWeb/" + usuario + "/agendamentos"
  );

  useEffect(() => {
    if (agendamentosRef) {
      onValue(agendamentosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const agendamentosList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAgendamentosDt(agendamentosList);
        } else {
          setAgendamentosDt([]);
        }
      });
    }
  }, [agendamentosRef]);

  useEffect(() => {
    // Filtrar agendamentos com base na data selecionada
    if (selectedDate) {
      const formattedDate = format(selectedDate, "dd-MM-yyyy"); // Formato da data para "dd-MM-yyyy"
      const filteredAppointments = agendamentosDt.filter(
        (appointment) => appointment.dia === formattedDate
      );
      setFilteredAgendamentos(filteredAppointments);
    } else {
      setFilteredAgendamentos([]);
    }
  }, [selectedDate, agendamentosDt]);

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontSize: "35px",
          fontWeight: 700,
          padding: 2,
          color: "#000000",
        }}
      >
        Meus Agendamentos
      </Typography>

      <CalendarComponent />

      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontSize: "20px",
          fontWeight: 700,
          padding: 2,
          color: "#000000",
        }}
      >
        Selecione uma data:
      </Typography>

      <DatePicker
        size="lg"
        style={{ ...styles, zIndex: 1300 }}
        onChange={(value) => setSelectedDate(value)}
      />

      <br></br>

      {filteredAgendamentos.length > 0 && (
        <FilteredAppointmentsCard filteredAgendamentos={filteredAgendamentos} />
      )}

      <br></br>
    </>
  );
};

export default MeusAgendamentos;
