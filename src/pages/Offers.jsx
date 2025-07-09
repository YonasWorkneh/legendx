import ListOfOffers from "../features/offers/ListOfOffers/ListOfOffers";

function Offers() {
  const h1Styles = {
    fontSize: "3rem",
    textAlign: "center",
  };
  return (
    <div>
      <h1 style={h1Styles}>Membership Offers</h1>
      <ListOfOffers />
    </div>
  );
}

export default Offers;
