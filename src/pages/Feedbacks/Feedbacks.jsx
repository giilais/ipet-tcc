import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Grid, Rating, Typography } from "@mui/material";
import db from "../../services/firebaseConfig";
import { onValue, ref } from "firebase/database";

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

        <div>
          <ul>
            {feedbacks.map((feedbacks) => (
              <li key={feedbacks.id}>
                Data: {feedbacks.data}, Horário: {feedbacks.horario}, Serviço:{" "}
                {feedbacks.servico} Cliente: {feedbacks.nomeUsuario} Animal
                Atendido: {feedbacks.nomeAnimal}
                <Rating name="read-only" value={feedbacks.nota} readOnly />
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </>
  );
};
export default Feedbacks;
