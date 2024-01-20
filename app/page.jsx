import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:8080/tickets", {
      cache: "no-store",
    });
    return res.json();

  } catch (error) {
    console.log("Failed to get tickets", error);
  }

};


export const Dashboard = async () => {
  const { content } = await getTickets();
  const uniqueCategories = [
    ... new Set(content?.map(({ category }) => category))
  ]
  return (
    <div className="p-5">
      <div>

        {content && uniqueCategories?.map((uniqueCategory, index) => <div key={index} className="mb-4">
          <h2>{uniqueCategory}</h2>
          <div className="lg:grid grid-cols-2 xl:grid-cols-4">

            {content.filter((ticket) => ticket.category === uniqueCategory).map((filteredTicket, _index) => (
              <TicketCard id={_index} key={_index} ticket={filteredTicket} />
            ))}

          </div>
        </div>)}

      </div>
    </div>
  );
};

export default Dashboard;
