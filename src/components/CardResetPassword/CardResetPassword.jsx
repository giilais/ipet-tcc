import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import {
  Button,
  TextField,
  Card,
  Alert,
  Typography,
  Grid,
} from "@mui/material";

const CardResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    auth
  );

  const resetPassword = async () => {
    const sucess = await sendPasswordResetEmail(email);
    if (sucess) {
      return <Alert severity="success">Email de redefinição enviado!</Alert>;
    }
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (sending) {
    return <p>Sending...</p>;
  }
  return (
    <Card
      sx={{
        backgroundColor: " #ffdfde",
        borderRadius: "10px",
        height: "300px",
        width: "400px",
        padding: "30px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "30px",
          color: "#000000",
          marginTop: "15px",
        }}
      >
        Redefinir Senha
      </Typography>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} container justifyContent={"center"}>
          <TextField
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            id="email"
            label="Email"
            helperText="Insira aqui seu email cadastrado para redefinir sua senha"
            name="email"
            sx={{
              width: "450px",
              mt: 5,
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} container justifyContent={"center"}>
          <Button
            onClick={resetPassword}
            sx={{
              color: "#fff",
              backgroundColor: "#000",
              mt: 7,
              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
                transition: "400ms",
              },
              width: "300px",
              height: "45px",
              borderRadius: "15px",
              fontFamily: "Montserrat",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Redefinir Senha
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
export default CardResetPassword;
