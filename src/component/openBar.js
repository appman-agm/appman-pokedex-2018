import React from "react";
import AddIcon from "@material-ui/icons/Add";
const OpenBar = (props) => {
  const styles = {
    borderBar: {
      width: "100%",
      height: "10%",
      backgroundColor: "#ec5656",
      position: "absolute",
      bottom: 0,
    },
    Addbutton: {
      width: "13%",
      height: "13%",
      backgroundColor: "#dc7777",
      // position: "absolute",
      bottom: 0,
      borderRadius: "50%",

      cursor: "pointer",
      position: "absolute",
      left: "50%",
      marginLeft: "-40px",
    },
    AddbuttonLayout: {
      textAlign: "center",
    },
    AddIcon: {
      marginTop: "20%",
      fontSize: 40,
      color: "white",
      fontStyle: "bold",
    },
  };
  return (
    <div className="openBar">
      <div className="borderBar" style={styles.borderBar}></div>
      <div style={styles.AddbuttonLayout} className="AddbuttonLayout">
        <div
          className="Addbutton"
          style={styles.Addbutton}
          onClick={props.handleOpen}
        >
          <AddIcon style={styles.AddIcon} />
        </div>
      </div>
    </div>
  );
};

export default OpenBar;
