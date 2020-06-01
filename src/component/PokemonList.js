import React, { Component } from "react";
import Card from "./Card";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

class PokemonList extends Component {
  constructor() {
    super();
    // Don't do this!
    this.state = { list: [], search: "" ,filter:[] , hasFetch: false};
  }

  getPokemonList = async () => {
    const list = await fetch("http://localhost:3030/api/cards");
    const res = await list.json();

    this.setState({ list: res.cards , hasFetch : true});
    
  };

  componentDidMount() {
    this.getPokemonList();
  }
  

  searchPokemon = (e) => {
    
    
    this.setState({ search: e.target.value });
    if (e.target.value === "") {
    //   this.getPokemonList();
      this.setState({ filter: [] });
    } else {
     const newList = this.state.list; 
      const search = newList.filter(({ name }) =>
        name.includes(e.target.value)
      );
      
      this.setState({ filter: search });
    }
  };

  deletedPokemonOnSelect = (data) =>{
    
    const newFilter = this.state.filter.filter(item => {
      return item.id !== data.id
    })
    const newList = this.state.list.filter(item => {
      return item.id !== data.id
    })
    this.setState({filter:newFilter,list:newList})
    
  }
  
  renderList = () => {
    const filterList = this.state.filter.length === 0 ? this.state.list :  this.state.filter
    if (filterList.length === 0) {
      return <Paper style={{ maxHeight: 720, overflow: "auto" }}>No Pokemon Found</Paper>;
    } else {
        
      return (
        <div>
          <Paper style={{ maxHeight: 720, overflow: "auto" }}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={{ width: "90%", margin: 20 }}
              onChange={(e) => this.searchPokemon(e)}
            />
            <List>
              {filterList.map((item) => {
                return <Card item={item} key={item.id} setSelected={this.props.setSelected} deletedPokemonOnSelect={this.deletedPokemonOnSelect}/>;
              })}
            </List>
          </Paper>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default PokemonList;
