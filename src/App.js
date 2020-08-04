import React  from "react";
import Modal from "@material-ui/core/Modal";
import ListPokemon from "./components/Modal";
import OpenBar from "./components/OpenBar";
import styled from "styled-components";
import {clearFilter } from "./actions/ActionType";
import MyList from "./components/MyList";
import { connect } from "react-redux";
const StyledModal = styled(Modal)`
  margin: 0 auto;
  max-height: 400px;
  max-width: 875px;

  position: absolute;
`;
const Header = styled.h1`
  text-align: center;
`;

export class App extends React.Component  {
  // const [modal, setModal] = useState(false);
  state={modal:false}

   getPokemon = async () => {
    this.props.getPokemonList();
  }
  componentDidMount(){
    this.getPokemon()
  }
   handleOpen = () => {
     this.setState({modal:true})
    // setModal(true);
    this.props.clearFilter()
  };
   handleClose = () => {
    this.setState({modal:false})
    
  };
 render(){
  return (
    <div id="App">
      <StyledModal open={this.state.modal} onClose={this.handleClose}>
        <div style={{ marginTop: 100 }}>
          <ListPokemon
            list={this.props.List.list}
            filterList={this.props.List.filterList}
          />
        </div>
      </StyledModal>
      <Header>My List</Header>
      <MyList selected={this.props.List.selected} />

      <OpenBar handleOpen={this.handleOpen} modal={this.state.modal} />
    </div>
  );
};
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
  getPokemonList: () => {
    dispatch({type:"LIST_FETCH_REQUESTED"})
  },
  clearFilter : ()=>{
    dispatch(clearFilter());
  }
});

export const mapStateToProps = (state) =>{
  return state
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

