function Space({ background }) {
  const styles = {
    display: "inline-block",
    width: "12px",
    height: "12px",
    border: "1px solid #222",
    boxShadow:
      "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.126)",
    borderRadius: "50%",
    background,
  };
  return <span style={styles}></span>;
}

export default Space;
