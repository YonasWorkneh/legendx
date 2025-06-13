import styles from "./Loader.module.css";

function Loader({ size = 60, bgColor = "var(--brand-color)" }) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        // padding: 0 + "px !important",
      }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.loaderSegment}
          style={{
            width: `${size * 0.06}px`,
            height: `${size * 0.25}px`,
            left: `${size * 0.46}px`,
            top: `${size * 0.05}px`,
            transformOrigin: `50% ${size * 0.45}px`,
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${-i * 0.1}s`,
            opacity: Math.pow(0.7, (11 - i) % 12),
            backgroundColor: bgColor,
          }}
        />
      ))}
    </div>
  );
}

export default Loader;
