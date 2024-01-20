import TicketForm from "@/app/(components)/TicketForm";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React from "react";


const getTicket = async (id) => {
  const res = await fetch(`http://localhost:8080/tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get ticket");
  }

  return res.json();
}



const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicket(params.id);
  } else {
    updateTicketData = {
      id: "new",
    };
  }


  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
