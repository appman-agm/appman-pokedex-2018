import React, { Component } from "react";
import Card from "./Card";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  Paper: {
    maxHeight: 720,
    overflow: "auto",
  },
  TextField: {
    width: "95%",
    margin: 20,
  },
};
class PokemonList extends Component {
  constructor() {
    super();
    // Don't do this!
    this.state = { search: "" };
  }

  renderList = () => {
    const filterList =
      this.props.filterList.length === 0 && !this.state.search
        ? this.props.list
        : this.props.filterList;
    console.log(this.state.search);
    if (filterList.length === 0) {
      return (
        <Paper style={styles.Paper}>
          <h1 style={{ textAlign: "center" }}>No Card found</h1>
        </Paper>
      );
    } else {
      return (
        <>
          <List>
            {filterList.map((item) => {
              return (
                <div
                  onMouseOver={this.changeBG}
                  onMouseOut={this.changeBGack}
                  key={item.id}
                >
                  <Card
                    item={item}
                    key={item.id}
                    setSelected={this.props.setSelected}
                    deletedPokemonOnSelect={this.props.deletedPokemonOnSelect}
                    onSelectCard={this.props.onSelectCard}
                    type="add"
                  />
                </div>
              );
            })}
          </List>
        </>
      );
    }
  };

  render() {
    return (
      <Paper style={styles.Paper}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          
          label="Search"
          variant="outlined"
          style={styles.TextField}
          onChange={(e) => {
            this.setState({ search: e.target.value });
            this.props.searchPokemon(e);
          }}
        />
        {this.renderList()}
      </Paper>
    );
  }
}

export default PokemonList;
