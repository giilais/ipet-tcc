import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, Tooltip } from "@mui/material";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { firebaseApp } from "../../services/firebaseConfig";

const CardService = () => {
  const db = getDatabase(firebaseApp);
  const servicesRef = ref(db, "servicos");

  const [services, setServices] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (servicesRef) {
      unsubscribe = onValue(servicesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const servicesList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setServices(servicesList);
        } else {
          setServices([]);
        }
      });
    }

    return () => {
      // Limpar a subscrição quando o componente é desmontado
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [servicesRef]);

  async function deleteService(id) {
    try {
      await remove(ref(servicesRef, id));
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
    } catch (error) {
      alert("Erro ao excluir o serviço:", error);
    }
  }

  console.log("SERVIÇOS:", services);

  return (
    <>
      {services.map((service) => (
        <Accordion
          sx={{
            mt: 5,
            ml: 3,
            mr: 3,
            width: "800px",
            backgroundColor: "#fff2f2",
          }}
          key={service.id}
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
                Serviço: {service.servicos}
              </Typography>
            </Grid>

            <Grid container justifyContent={"end"}>
              <Tooltip title="Deletar serviço">
                <Button
                  endIcon={<DeleteIcon sx={{ color: "black" }} />}
                  onClick={() => deleteService(service.id)}
                />
              </Tooltip>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#fff2f2" }}>
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
                      Preço: {service.preco}
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
                      Tempo: {service.tempo}
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
                    Descrição: {service.descricao}
                  </Typography>
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
                      Animais: {service.animal}
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
                      Porte: {service.porte}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid item xs={2}>
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
              </Grid> */}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CardService;
