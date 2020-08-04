import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import searchImage from "../search.png";
import { clearFilter, searchPokemonFromList } from "../actions/ActionType";
import styled from "styled-components";
import { connect } from "react-redux";
import ListPokemon from "./List";
import * as R from "ramda";
const StyledPaper = styled(Paper)`
  max-height: 720px;
  overflow: auto;
`;
const StyledTextField = styled(TextField)`
  width: 100%;
  display: "flex";
  justify-content: center;
  padding: 20px;
`;
const TextFieldContainer = styled.div`
  display: "flex";
  justify-content: center;
  padding: 20px;
`;

const SearchIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export const PokemonList = (props) => {

  return (
    <StyledPaper>
      <TextFieldContainer className="textfield-container">
        <StyledTextField
          className="Text-field"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon src={searchImage} alt="searhPic" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={(e) => {
            props.searchPokemon(e.target.value);
          }}
        />
      </TextFieldContainer>
      <ListPokemon
        filterList={props.filterList}
        // search={search}
        list={props.list}
      />
      {/* {renderList()} */}
    </StyledPaper>
  );
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  searchPokemon: (text) => {
    if (text === "") {
      dispatch(clearFilter());
    } else {
      const isMatchTypeAndName = ({ name, type }) =>
        name.toLowerCase().includes(text.toLowerCase()) ||
        type.toLowerCase().includes(text.toLowerCase());

      const search = R.filter(isMatchTypeAndName, ownProps.list);

      
      dispatch(searchPokemonFromList(search));
    }
  },
});
export default connect(null, mapDispatchToProps)(PokemonList);
