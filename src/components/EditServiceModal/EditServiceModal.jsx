import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import { useState } from "react";

import { ref, push, get, update } from "firebase/database";
import db from "../../services/firebaseConfig";
import { useEffect } from "react";

const ModaEditService = ({ isOpen, onClose, onSave, service }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [servicosOptions, setServicosOptions] = useState([]);
  const [animaisOptions, setAnimaisOptions] = useState([]);
  const [porteOptions, setPorteOptions] = useState([]);

  const [marcarMaisDeUm, setMarcarMaisDeUm] = useState(false);

  const [editedService, setEditedService] = useState(service);

  const handleChange = (field, value) => {
    setEditedService((prevService) => ({
      ...prevService,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      let usuario = localStorage.getItem("userName");

      if (
        usuario &&
        usuario.length > 2 &&
        usuario.charAt(0) === '"' &&
        usuario.charAt(usuario.length - 1) === '"'
      ) {
        usuario = usuario.slice(1, -1);
      }

      if (usuario) {
        const servicosRef = push(
          ref(db, "IpetClientsWeb/" + usuario + "/servicos")
        );

        await update(servicosRef(db, `/${editedService.id}`), editedService);
        onSave();
      } else {
        alert(
          "Usuário não encontrado. Por favor, cadastre o usuário primeiro."
        );
      }
    } catch (error) {
      showSnackbar(`Erro ao cadastrar serviço: ${error.message}`);
    }
  };

  // Função para carregar as opções de serviços do Firebase
  const carregarOpcoesServicos = async () => {
    const servicosRef = ref(db, "servicos");

    try {
      const snapshot = await get(servicosRef);
      if (snapshot.exists()) {
        setServicosOptions(Object.values(snapshot.val()));
      }
    } catch (error) {
      console.error("Erro ao carregar opções de serviços:", error);
    }
  };

  // Função para carregar as opções de animais do Firebase
  const carregarOpcoesAnimais = async () => {
    const animaisRef = ref(db, "animais");

    try {
      const snapshot = await get(animaisRef);
      if (snapshot.exists()) {
        setAnimaisOptions(Object.values(snapshot.val()));
      }
    } catch (error) {
      console.error("Erro ao carregar opções de animais:", error);
    }
  };

  // Função para carregar as opções de porte do Firebase
  const carregarOpcoesPorte = async () => {
    const porteRef = ref(db, "porte");

    try {
      const snapshot = await get(porteRef);
      if (snapshot.exists()) {
        setPorteOptions(Object.values(snapshot.val()));
      }
    } catch (error) {
      console.error("Erro ao carregar opções de porte:", error);
    }
  };

  useEffect(() => {
    carregarOpcoesServicos();
    carregarOpcoesPorte();
    carregarOpcoesAnimais();
  }, []);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        sx={{ width: 900, height: 690 }}
        className="css-1t1j96h-MuiPaper-root-MuiDialog-paper"
      >
        <DialogContent>
          <Box sx={{ width: 700, height: 690 }}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h1"
              sx={{
                fontFamily: "Montserrat",
                fontSize: "30px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Editar Serviço
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{
                mt: 1,
                fontFamily: "Montserrat",
                fontSize: "15px",
                fontWeight: 300,
                textAlign: "center",
                mb: 2,
              }}
            >
              preencha todos os campos para editar o serviço
            </Typography>

            <Box>
              <Grid container sx={{ marginBottom: 1 }} alignItems={"center"}>
                <Grid item xs={12}>
                  <Typography variant="p">Serviços: </Typography>
                  <br></br>
                  <Select
                    label="Selecione um serviço"
                    id="servicos"
                    name="servicos"
                    sx={{ width: 650 }}
                    value={editedService.servicos || ""}
                    onChange={(e) => handleChange("servicos", e.target.value)}
                  >
                    {servicosOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <Grid container sx={{ marginBottom: 1 }}>
                <Typography variant="p">Descrição: </Typography>
                <br></br>
                <TextField
                  id="descricao"
                  name="descricao"
                  multiline
                  rows={2}
                  sx={{ width: 650 }}
                  value={editedService.descricao || ""}
                  onChange={(e) => handleChange("descricao", e.target.value)}
                />
              </Grid>

              <Grid container sx={{ marginBottom: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="p">Animais: </Typography>
                  <br></br>

                  <Select
                    label="Animais:"
                    id="animais"
                    name="animais"
                    sx={{ width: 300 }}
                    value={editedService.animais || ""}
                    onChange={(e) => handleChange("animais", e.target.value)}
                  >
                    {animaisOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="p">Porte: </Typography>
                  <br></br>
                  <Select
                    label="Porte:"
                    id="porte"
                    name="porte"
                    sx={{ width: 300 }}
                    value={editedService.porte || ""}
                    onChange={(e) => handleChange("porte", e.target.value)}
                  >
                    {porteOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <Grid container sx={{ marginBottom: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="p">Tempo de serviço: </Typography>
                  <br></br>
                  <TextField
                    id="tempo"
                    name="tempo"
                    sx={{ width: 300 }}
                    value={editedService.tempo || ""}
                    onChange={(e) => handleChange("tempo", e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="p">Preço: </Typography>
                  <br></br>
                  <TextField
                    id="preco"
                    name="preco"
                    type="number"
                    sx={{ width: 300 }}
                    value={editedService.preco || ""}
                    onChange={(e) => handleChange("preco", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={marcarMaisDeUm}
                        onChange={(e) => setMarcarMaisDeUm(e.target.checked)}
                      />
                    }
                    label="Deseja marcar mais de um serviço por horário?"
                  />
                  {marcarMaisDeUm && (
                    <>
                      <br></br>
                      <Typography variant="p">Número de serviços: </Typography>
                      <br></br>
                      <TextField
                        type="number"
                        value={editedService.numeroDeServicos || ""}
                        onChange={(e) =>
                          handleChange("servicos", e.target.value)
                        }
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%", fontWeight: 600 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ModaEditService;
