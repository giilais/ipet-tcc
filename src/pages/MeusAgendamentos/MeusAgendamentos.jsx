import React, { useEffect, useState } from "react";
import "./MeusAgendamentos.css";
import "rsuite/dist/rsuite.css";

import ResponsiveAppBar from "../../components/AppBar/AppBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarComponent from "../../components/Calendar/Calendar";
import { DatePicker } from "rsuite";
import { onValue, ref } from "firebase/database";
import db from "../../services/firebaseConfig";

const FilteredAppointmentsCard = ({ filteredAgendamentos }) => {
  return filteredAgendamentos.map((appointment) => (
    <Accordion
      sx={{
        mt: 5,
        ml: 3,
        mr: 3,
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
          <Tooltip title="Deletar serviço">
            <Button endIcon={<DeleteIcon sx={{ color: "black" }} />} />
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
          <Grid item xs={2}>
            <Button
              sx={{
                fontFamily: "Montserrat",
                color: "#ffffff",
                backgroundColor: "#000000",
                "&:hover": {
                  backgroundColor: " #ffffff",
                  color: "#000000",
                  transition: "400ms",
                },
              }}
            >
              Editar
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  ));
};

const MeusAgendamentos = () => {
  const styles = { width: 200, marginBottom: 10, zIndex: 1300, marginLeft: 16 };

  const [selectedDate, setSelectedDate] = useState(null);
  const [agendamentosDt, setAgendamentosDt] = useState([]);
  const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);

  let usuario = localStorage.getItem("nameUsuario");

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
      const filteredAppointments = agendamentosDt.filter(
        (appointment) =>
          appointment.data === selectedDate.toISOString().split("T")[0]
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
    </>
  );
};

export default MeusAgendamentos;
