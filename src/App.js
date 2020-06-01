import React, { Component } from "react";
// import "./App.css";
import PokemonList from "./component/PokemonList";
import Modal from "@material-ui/core/Modal";
import Mylist from "./component/MyList";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
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
    this.state = { modal: false, selected: [] };
  }
  handleOpen = () => {
    this.setState({ modal: true });
  };
  handleClose = () => {
    this.setState({ modal: false });
  };

  setSelected = (data) => {
    this.setState({ selected: [...this.state.selected, data] });
  };

  deleteSelected = (data) => {
    const newselected = this.state.selected.filter(
      (item) => item.id !== data.id
    );

    this.setState({ selected: newselected });
  };

  render() {
    return (
      <div className="App">
        <Button
          onClick={this.handleOpen}
          variant="contained"
          color="primary"
          size="small"
          style={{width:'100%',height:'9%'}}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
        <Mylist
          myList={this.state.selected}
          deleteSelected={this.deleteSelected}
        />
        <Modal
          open={this.state.modal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            margin: "auto",
            paddingTop: 120,
            paddingLeft: 160,
            paddingRight: 160,
          }}
        >
          <PokemonList setSelected={this.setSelected} />
        </Modal>
        
      </div>
    );
  }
}

export default App;
