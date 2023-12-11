import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import db from "../../services/firebaseConfig";
import { onValue, ref } from "firebase/database";
import notFoundService from "../../assests/images/notFoundService.jpg";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  // Recuperar o nome do usuário do localStorage
  let usuario = localStorage.getItem("userName");

  if (
    usuario &&
    usuario.length > 2 &&
    usuario.charAt(0) === '"' &&
    usuario.charAt(usuario.length - 1) === '"'
  ) {
    usuario = usuario.slice(1, -1); // Removendo as aspas
  }

  // Criar uma referência para os feedbacks do usuário
  const feedbacksRef = ref(db, "IpetClientsWeb/" + usuario + "/feedbacks");

  useEffect(() => {
    if (feedbacksRef) {
      onValue(feedbacksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const feedbacksList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setFeedbacks(feedbacksList);
        } else {
          setFeedbacks([]);
        }
      });
    }
  }, [feedbacksRef]);

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
            Meus Feedbacks
          </Typography>
        </Grid>
      </Grid>

      {feedbacks.length > 0 ? (
        feedbacks.map((feedbacks) => (
          <Grid sx={{ ml: 5 }}>
            <Accordion
              sx={{
                mt: 5,
                ml: 5,
                width: "800px",
                backgroundColor: "#ffcc80",
              }}
              key={feedbacks.id}
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
                      fontSize: "16px",
                      paddingBottom: "5px",
                    }}
                  >
                    <b> {feedbacks.servico} - </b>
                  </Typography>
                  <Rating name="read-only" value={feedbacks.nota} readOnly />
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#ffcc80", ml: 5 }}>
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
                          <b>Servico: </b>
                          {feedbacks.servico}
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
                          <b>Data: </b>
                          {feedbacks.data}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            paddingBottom: "5px",
                          }}
                        >
                          <b>Animal Atendido:</b>
                          {feedbacks.animal}
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
                          <b>Horario:</b> {feedbacks.horario}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))
      ) : (
        <>
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
                Não há feedbacks!{" "}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default Feedbacks;
