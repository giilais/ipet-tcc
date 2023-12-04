import React, { useEffect, useState } from "react";
import { Calendar, Badge, Whisper, Popover } from "rsuite";
import { onValue, ref } from "firebase/database";
import db from "../../services/firebaseConfig";
import { Button } from "@mui/material";
import { format } from "date-fns";

const CalendarComponent = () => {
  let usuario = localStorage.getItem("userName");
  console.log("teste:", usuario);
  if (
    usuario &&
    usuario.length > 2 &&
    usuario.charAt(0) === '"' &&
    usuario.charAt(usuario.length - 1) === '"'
  ) {
    usuario = usuario.slice(1, -1);
  }

  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const agendamentosRef = ref(
      db,
      "IpetClientsWeb/" + usuario + "/agendamentos"
    );

    onValue(agendamentosRef, (snapshot) => {
      const agendamentosData = snapshot.val();
      const agendamentosArray = [];

      for (const key in agendamentosData) {
        agendamentosArray.push({
          id: key,
          ...agendamentosData[key],
        });
      }

      setAgendamentos(agendamentosArray);
    });
  }, [usuario]);

  function getTodoList(date) {
    const formattedDate = format(date, "dd-MM-yyyy");
    // const formattedDate = date.toISOString().split("T")[0];
    const eventsForDate = agendamentos.filter(
      (agendamento) => agendamento.dia === formattedDate
    );

    return eventsForDate.map((agendamento) => ({
      time: agendamento.horario,
      title: agendamento.nomeCliente + " - " + agendamento.servico,
    }));
  }

  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      //se tiver mais que dois item para exibir
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <Button type="text">{moreCount} +</Button>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return <Calendar bordered renderCell={renderCell} />;
};

export default CalendarComponent;
