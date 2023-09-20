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

const CardsPlans = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", mt: 2, mb: 8 }}
      >
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "5px 10px 8px #888888",
            borderRadius: "15px",
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
              Teste
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
              Sua loja visível no nosso aplicativo. Entregas feitas pela própria
              loja.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              R$00,00 / mês
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "15px",
                color: "#000000",
              }}
            >
              * durante 3 (três) meses
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "#000",
                borderRadius: "15px",
                width: "250px",
                height: "40px",
                color: "#FFF",
                fontFamily: "Montserrat",
              }}
              onClick={() => navigate("/home")}
            >
              Quero esse plano
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "5px 10px 8px #888888",
            borderRadius: "15px",
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
              Basico
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
              Sua loja visível no nosso aplicativo. Entregas feitas pela própria
              loja.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              R$50,00 / mês
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "#000",
                borderRadius: "15px",
                width: "250px",
                height: "40px",
                color: "#FFF",
                fontFamily: "Montserrat",
              }}
              onClick={() => navigate("/home")}
            >
              Quero esse plano
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "5px 10px 8px #888888",
            borderRadius: "15px",
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
              Completo
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
              Todas as funcionalidades do nosso aplicativo disponiveis para
              você. Entregas feitas por parceiros iPet.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              R$80,00 / mês
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "#000",
                borderRadius: "15px",
                width: "250px",
                height: "40px",
                color: "#FFF",
                fontFamily: "Montserrat",
              }}
              onClick={() => navigate("/home")}
            >
              Quero esse plano
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
export default CardsPlans;
