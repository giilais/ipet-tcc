import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { firebaseApp } from "../../services/firebaseConfig";
import notFoundService from "../../assests/images/notFoundService.jpg";

const CardService = () => {
  const db = getDatabase(firebaseApp);

  let usuario = localStorage.getItem("nameUsuario");

  if (
    usuario &&
    usuario.length > 2 &&
    usuario.charAt(0) === '"' &&
    usuario.charAt(usuario.length - 1) === '"'
  ) {
    usuario = usuario.slice(1, -1);
  }

  const servicesRef = ref(db, "IpetClientsWeb/" + usuario + "/servicos");

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

  const [open, setOpen] = useState(false);

  async function deleteService(id) {
    try {
      await remove(ref(db, "IpetClientsWeb/" + usuario + "/servicos/" + id));
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
      setOpen(true);
    } catch (error) {
      alert("Erro ao excluir o serviço:", error);
    }
  }

  const AlertMsgSuccess = () => {
    const handleAlertClose = () => {
      setOpen(false);
    };

    return (
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleAlertClose}
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

      <Box>
        {services.length > 0 ? (
          services.map((service) => (
            <Accordion
              sx={{
                mt: 5,
                mr: 25,
                width: "800px",
                backgroundColor: "#ffcc80",
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
                          Animais: {service.animais}
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
                  Não há serviços cadastrados!{" "}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default CardService;
