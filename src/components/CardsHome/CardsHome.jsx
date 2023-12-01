import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import dogplans from "../../../src/assests/images/patinha3.jpg";
import dogplans2 from "../../../src/assests/images/patinha1.jpg";
import dogplans3 from "../../../src/assests/images/patinha2.jpg";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardsHome = () => {
  const navigate = useNavigate();

  function goToServices() {
    navigate("/registerServices");
  }

  function goToAgenda() {
    navigate("/minhaAgenda");
  }

  function goToAgendamentos() {
    navigate("/meusAgendamentos");
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 8 }}>
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "1px 3px 20px #cfcfcf",
            borderRadius: "15px",
            height: 500,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={dogplans}
              alt="By storyset on Freepik"
              className="dog-paw-plans"
            />
          </Box>

          <CardContent>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "30px",
                color: "#000000",
                mb: 3,
              }}
            >
              Serviços
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "18px",
                color: "#000000",
                mb: 2,
              }}
            >
              Visualize todos os seus serviços e cadastre novos.
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          >
            <Button
              sx={{
                backgroundColor: "#ffcc80",
                borderRadius: "15px",
                width: "250px",
                height: "40px",
                color: "#000",
                fontFamily: "Montserrat",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#ffa726",
                  color: "#000",
                  transition: "500ms",
                },
              }}
              onClick={goToServices}
            >
              Ir para página
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "1px 3px 20px #cfcfcf",
            borderRadius: "15px",
            height: 500,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={dogplans2}
              alt="By storyset on Freepik"
              className="dog-paw-plans-2"
            />
          </Box>

          <CardContent>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "30px",
                color: "#000000",
                mb: 3,
              }}
            >
              Agenda
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "18px",
                color: "#000000",
                mb: 2,
              }}
            >
              Cadastre sua agenda de atendimento ou visualize e edite a mesma.
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "#ffcc80",
                borderRadius: "15px",
                width: "250px",
                height: "40px",
                color: "#000",
                fontWeight: 600,
                fontFamily: "Montserrat",
                "&:hover": {
                  backgroundColor: " #ffa726",
                  color: "#000",
                  transition: "500ms",
                },
              }}
              onClick={goToAgenda}
            >
              Ir para página
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "1px 3px 20px #cfcfcf",
            borderRadius: "15px",
            height: 500,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={dogplans3}
              alt="By storyset on Freepik"
              className="dog-paw-plans-2"
            />
          </Box>

          <CardContent>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "30px",
                color: "#000000",
                mb: 3,
              }}
            >
              Agendamentos
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "18px",
                color: "#000000",
                mb: 2,
              }}
            >
              Visualize e administre seus agendamentos, visualize quais
              serviços, horarios e valores.
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "#ffcc80",
                borderRadius: "15px",
                width: "250px",
                height: "40px",
                color: "#000",
                fontWeight: 600,
                fontFamily: "Montserrat",
                "&:hover": {
                  backgroundColor: "#ffa726",
                  color: "#000",
                  transition: "500ms",
                },
              }}
              onClick={goToAgendamentos}
            >
              Ir para página
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
export default CardsHome;
