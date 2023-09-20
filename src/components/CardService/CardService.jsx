import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, Tooltip } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { firebaseApp } from "../../services/firebaseConfig";

const CardService = () => {
  const [services, setServices] = useState([]);

  const db = getFirestore(firebaseApp);
  const servicesCollectionRef = collection(db, "IpetServices");

  useEffect(() => {
    const getServices = async () => {
      const data = await getDocs(servicesCollectionRef);
      setServices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getServices();
  }, []);

  async function deleteService(id) {
    try {
      const serviceDoc = doc(db, "IpetServices", id);
      await deleteDoc(serviceDoc);
      setServices(services.filter((service) => service.id !== id));
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
                Serviço: {service.selectService}
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
                      Preço: {service.price}
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
                      Preço: {service.selectTimeDuraction}
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
                    Descrição: {service.description}
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
                      Porte: {service.animalsSizeSelect}
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
      ))}
    </>
  );
};

export default CardService;
