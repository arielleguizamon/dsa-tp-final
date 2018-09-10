import React from "react";
import Spinner from "react-spinkit";
import { colors } from "../theming";

const styles = {
  overlay: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999
  },
  spinnerContainer: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: { height: 70, width: 70 }
};

export default props => {
  return (
    <div
      className="overlay"
      style={Object.assign({}, styles.overlay, {
        display: props.active ? "block" : "none"
      })}
    >
      <div style={styles.spinnerContainer}>
        <Spinner
          style={styles.spinner}
          name={"double-bounce"}
          color={colors.primary}
          fadeIn={"none"}
        />
      </div>
    </div>
  );
};
