import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { onValue, ref } from "firebase/database";
import db from "../../services/firebaseConfig";
import imgLogo from "../../assests/images/consulta-veterinaria.jpg";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);

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

  const profileRef = ref(db, "IpetClientsWeb/" + usuario);

  useEffect(() => {
    const fetchData = () => {
      const profileListener = onValue(profileRef, (snapshot) => {
        try {
          const data = snapshot.val();
          setProfile(data);
        } catch (error) {
          console.log("Error", error);
        }
      });

      return () => {
        profileListener();
      };
    };

    fetchData();
  }, [profileRef, usuario]);

  console.log("profile:", profile);

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
            Perfil da Loja: {usuario}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Card sx={{ width: 600, height: 600 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                X
              </Avatar>
            }
            title={usuario}
          />
          <CardMedia
            component="img"
            height="400"
            image={imgLogo}
            alt=" Imagem representativa de um logo"
          />
          <CardContent>
            {profile && (
              <>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  Nome da Loja: {profile.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  CNPJ: {profile.cnpj}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  Email: {profile.email}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default MyProfile;
