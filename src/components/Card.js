import React  from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "../cute.png";
import {
  calHappiness,
  calHp,
  calStrength,
  calWeak,
} from "../functions/CalStat";

import Stat from "./Stat";
import getPokemonList from "../services/getPokemonList";

import styled from "styled-components";
import {
  addPokemonToSelectedList,
  deletePokemonFromSelectedList,
  addPokemonBackToList,
} from "../actions/ActionType";
import { connect } from "react-redux";
const CardItem = styled.div`
  padding: 20px;
  background-color: #f3f4f7;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    box-shadow: 0px 5px #aeaeae;
  }
`;

export const CuteIcon = styled.img`
  max-width: 30px;
  max-height: 30px;
  padding-left: 5px;
  ${(props) =>
    props.size === "big" &&
    `max-width: 50px;
    max-height: 50px;
    padding-left: 5px;
     
  `}
`;

export const Pointer = styled.div`
  display: none
    ${(props) =>
      props.mouse &&
      `
    font-size: 20px;
    color: red;
    cursor: pointer;
    float: right;
  `};
`;

export const CardImage = styled.img`
  max-width: 180px;
  max-height: 280px;
  ${(props) =>
    props.size === "big" &&
    `max-width: 250px; 
     max-height: 300px;
     
  `}
`;

const CardDetail = styled.div`
  margin-left: 5px;
`;
export const isMatchPokemon = (data) => {
  return (item) => item.id !== data.id;
};
export class Card extends React.Component {
  state = { mouse: false };
  // const [mouse, setMouse] = useState(false);
  // const dispatch = useDispatch();
  // const selected = useSelector((state) => state.List.selected);

  renderFunction = () => {
    return (
      <Pointer
        mouse={this.state.mouse}
        onClick={() =>
          this.props.onSelectCard(
            this.props.item,
            this.props.type,
            this.props.addPokemon,
            this.props.deletePokemon,
            this.props.addPokemonBack
          )
        }
      >
        {this.props.type === "delete" ? "x" : "Add"}
      </Pointer>
    );
  };
  render() {
    return (
      <CardItem
        className="carditem"
        onMouseOver={() => this.setState({ mouse:true })}
        onMouseOut={() =>  this.setState({ mouse:false })}
      >
        <Grid container spacing={5}>
          <Grid item xs={5}>
            <CardImage
              src={this.props.item.imageUrl}
              alt="picPokemon"
              size={this.props.size}
            />
          </Grid>
          <Grid item xs={7}>
            <CardDetail className="carddesc">
              <span>{this.renderFunction()}</span>
              <h1>{this.props.item.name}</h1>

              <Stat label="HP" value={calHp(this.props.item.hp)} />
              <Stat label="STR" value={calStrength(this.props.item.attacks)} />
              <Stat label="Weak" value={calWeak(this.props.item.attacks)} />
              <p>
                {calHappiness(this.props.item).map((index) => {
                  return (
                    <CuteIcon
                      src={Icon}
                      alt="iconImage"
                      className="cuteIcon"
                      key={index}
                      size={this.props.size}
                    />
                  );
                })}
              </p>
            </CardDetail>
          </Grid>
        </Grid>
      </CardItem>
    );
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
  addPokemon: async (item) => {
    dispatch(addPokemonToSelectedList(item));
  },
  deletePokemon: async (item) => {
    dispatch(deletePokemonFromSelectedList(item));
  },
  addPokemonBack: async () => {
    // const data = await getPokemonList()
    dispatch(addPokemonBackToList(await getPokemonList()));
  },
  onSelectCard: (item, type, add, deleteItem, addPokemonBack) => {
    if (type === "add") {
     
      add(item);
    } else {
      deleteItem(item);
      addPokemonBack();
    }
  },
});

export default connect(null, mapDispatchToProps)(Card);
