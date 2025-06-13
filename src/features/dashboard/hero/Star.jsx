import { HiStar } from "react-icons/hi";

function Star({ color, top, right }) {
  const styles = {
    color,
    fontSize: ".5rem",
    position: "absolute",
    top,
    right,
  };
  return (
    <span style={styles}>
      <HiStar />
    </span>
  );
}

export default Star;
