import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Card from "./component/Card";
import ListPokemon from "./component/List";
import OpenBar from "./component/openBar";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
const styles = {
  Paper: {
    maxHeight: 720,
    overflow: "auto",
  },
  List: {
    paddingBottom: 20,
    height: 600,
  },
  Modal: {
    margin: "auto",
    marginTop: 120,
    marginLeft: 160,
    marginRight: 160,
    
    outline: "none"
  },
  Header: {
    textAlign: "center",
  },
};
class App extends Component {
  state = { modal: false, selected: [], list: [], filterList: [] };

  getPokemonList = async () => {
    const list = await fetch("http://localhost:3030/api/cards");
    const res = await list.json();

    this.setState({ list: res.cards });
  };
  handleOpen = () => {
    this.setState({ modal: true });
  };
  handleClose = () => {
    this.setState({ modal: false });
  };
  componentDidMount() {
    this.getPokemonList();
  }
  searchPokemon = (e) => {
    if (e.target.value === "") {
      //   this.getPokemonList();
      this.setState({ filterList: [] });
    } else {
      const newList = this.state.list;
      const search = newList.filter(
        ({ name, type }) =>
          name.includes(e.target.value) || type.includes(e.target.value)
      );

      this.setState({ filterList: search });
    }
  };
  deletedPokemonOnSelect = (data) => {
    const newFilter = this.state.filterList.filter((item) => {
      return item.id !== data.id;
    });
    const newList = this.state.list.filter((item) => {
      return item.id !== data.id;
    });
    this.setState({ filterList: newFilter, list: newList });
  };
  onSelectCard = (data) => {
    this.setState({ selected: [...this.state.selected, data] });
  };
  deleteSelected = (data) => {
    const newselected = this.state.selected.filter(
      (item) => item.id !== data.id
    );

    this.setState({ selected: newselected });
  };
  adddeletedToList = async (data) => {
    const response = await fetch("http://localhost:3030/api/cards");
    const dataRes = await response.json();
    let array = dataRes.cards;
    let selectedarray = this.state.selected;

    
    const results = array.filter(({ id: id1 }) => !selectedarray.some(({ id: id2 }) => id2 === id1));
    console.log(results);

    this.setState({ list: results });
  };

  renderMyList = () => {
    if (this.state.selected.length === 0) {
      return;
    } else {
      return (
        <div className="MyList">
          <Paper style={styles.Paper}>
            {" "}
            <List style={styles.List}>
              <Grid container>
                {this.state.selected.map((item) => {
                  return (
                    <Grid item xs={6} key={item.id}>
                      <Card
                        item={item}
                        type="delete"
                        deleteSelected={this.deleteSelected}
                        adddeletedToList={this.adddeletedToList}
                        size="medium"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </List>
          </Paper>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Modal
          open={this.state.modal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={styles.Modal}
          disableAutoFocus={true}
        >
          <DialogContent>
            <ListPokemon
              list={this.state.list}
              filterList={this.state.filterList}
              searchPokemon={this.searchPokemon}
              deletedPokemonOnSelect={this.deletedPokemonOnSelect}
              onSelectCard={this.onSelectCard}
            />
          </DialogContent>
        </Modal>
        <h1 style={styles.Header}>My List</h1>
        {this.renderMyList()}

        <OpenBar handleOpen={this.handleOpen} modal={this.state.modal} />
      </div>
    );
  }
}

export default App;
