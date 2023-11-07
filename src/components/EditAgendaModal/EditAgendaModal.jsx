import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditAgendaModal = ({
  open,
  handleClose,
  agendaDetails,
  handleSaveChanges,
}) => {
  const [editedAgenda, setEditedAgenda] = useState({ ...agendaDetails });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAgenda({ ...editedAgenda, [name]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Agenda</DialogTitle>
      <DialogContent>
        <TextField
          label="Horário de Início de Atendimento"
          name="horarioInicio"
          value={editedAgenda.horarioInicio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Horário de Fim de Atendimento"
          name="horarioFim"
          value={editedAgenda.horarioFim}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dias de Atendimento"
          name="dias"
          value={editedAgenda.dias}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={() => handleSaveChanges(editedAgenda)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAgendaModal;
