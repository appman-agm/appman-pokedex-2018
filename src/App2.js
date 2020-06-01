import React, { Component } from "react";
// import "./App.css";

import Modal from "@material-ui/core/Modal";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
// const COLORS = {
//   Psychic: "#f8a5c2",
//   Fighting: "#f0932b",
//   Fairy: "#c44569",
//   Normal: "#f6e58d",
//   Grass: "#badc58",
//   Metal: "#95afc0",
//   Water: "#3dc1d3",
//   Lightning: "#f9ca24",
//   Darkness: "#574b90",
//   Colorless: "#FFF",
//   Fire: "#eb4d4b"
// }

class App extends Component {
  constructor() {
    super();
    // Don't do this!
    this.state = { modal: false, selected: [], list: [], filterList: [] };
  }

  getPokemonList = async () => {
    const list = await fetch("http://localhost:3030/api/cards");
    const res = await list.json();

    this.setState({ list: res.cards });
  };

  renderMyList = () => {
    if (this.state.selected.length === 0) {
      return <h1 style={{ textAlign: "center" }}>No Item Found</h1>;
    } else {
      return (
        <div className="MyList">
          <h1>My List</h1>
          <Paper style={{ maxHeight: 720, overflow: "auto" }}>
            {" "}
            <List style={{ paddingBottom: 20 }}>
              {this.state.selected.map((item) => {
                return <h1>asdasd</h1>;
              })}
            </List>
          </Paper>
        </div>
      );
    }
  };
  render() {
    return <>{this.renderMyList()}</>;
  }
}

export default App;
