import React from "react";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Box, Grid, Typography } from "@mui/material";
import ModalAgenda from "../../components/ModalAgenda/ModalAgenda";
import AgendaCard from "../../components/AgendaCard/AgendaCard";


const MinhaAgenda = () => {
  // const [agendaDetails, setAgendaDetails] = useState(null);

  // let usuario = localStorage.getItem("nameUsuario");

  // const checkAgenda = async () => {
  //   // Verificar se a variável usuario não é nula e não está vazia
  //   if (
  //     usuario &&
  //     usuario.length > 2 &&
  //     usuario.charAt(0) === '"' &&
  //     usuario.charAt(usuario.length - 1) === '"'
  //   ) {
  //     usuario = usuario.slice(1, -1); //retirando as aspas
  //   }

  //   const agendaRef = ref(db, "IpetClientsWeb/" + usuario + "/agenda");
  //   const snapshot = await get(child(agendaRef));

  //   if (snapshot.exists()) {
  //     setAgendaDetails(snapshot.val());
  //   }
  // };

  // useEffect(() => {
  //   checkAgenda();
  // }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Grid container>
        <Grid item xs={10}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "35px",
              fontWeight: 700,
              padding: 2,
              color: "#000000",
            }}
          >
            Minha Agenda
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <ModalAgenda />
        </Grid>
      </Grid>

      <Box>
        <AgendaCard/>
      </Box>

      {/* {agendaDetails && (
        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Agenda
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Horário de Início: {agendaDetails.horarioInicio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Horário de Término: {agendaDetails.horarioFim}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dias de Atendimento: {agendaDetails.dias.join(", ")}
            </Typography>
            <Button variant="contained" color="primary">
              Editar
            </Button>
            <Button variant="contained" color="error">
              Excluir
            </Button>
          </CardContent>
        </Card>
      )} */}
    </>
  );
};

export default MinhaAgenda;
