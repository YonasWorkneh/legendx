import Error from "../../../ui/Error/Error";
import OfferCard from "../OfferCard/OfferCard";
import useOffers from "../useOffers";
import styles from "./ListOfOffers.module.css";

function ListOfOffers() {
  const { offers } = useOffers();
  if (!offers.length)
    return (
      <Error message="There are no offers. Please contact the manager to add offers ." />
    );
  return (
    <div className={styles.offers}>
      {offers
        ?.sort((a, b) => a.paymentDuration - b.paymentDuration)
        ?.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
    </div>
  );
}

export default ListOfOffers;
