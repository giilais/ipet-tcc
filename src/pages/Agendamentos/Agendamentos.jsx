import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import db from "../../services/firebaseConfig";

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

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

  // Criar uma referência para os agendamentos do usuário
  const agendamentosRef = ref(
    db,
    "IpetClientsWeb/" + usuario + "/agendamentos"
  );

  useEffect(() => {
    if (agendamentosRef) {
      onValue(agendamentosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const agendamentosList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAgendamentos(agendamentosList);
        } else {
          setAgendamentos([]);
        }
      });
    }
  }, [agendamentosRef]);

  return (
    <div>
      <h2>Agendamentos:</h2>
      <ul>
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id}>
            Data: {agendamento.data}, Horário: {agendamento.horario}, Serviço:{" "}
            {agendamento.servico} Cliente: {agendamento.nomeUsuario} Animal
            Atendido: {agendamento.nomeAnimal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agendamentos;
