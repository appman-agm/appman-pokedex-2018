import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "../cute.png";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
const styles = {
  Card: {
    padding: "20px",
    backgroundColor: "#f3f4f7",
    borderRadius: "5px",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  cuteIcon: {
    maxWidth: 30,
    maxHeight: 30,
    paddingLeft: 5,
  },
  pointer: {
    fontSize: 20,
    color: "red",
    cursor: "pointer",
    float: "right",
  },
  carddesc: {
    marginLeft: 5,
  },
};
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 30,
    borderRadius: 10,
    maxWidth: 500,
  },
  colorPrimary: {
    backgroundColor: "#e4e4e4"
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#f3701a",
  },
}))(LinearProgress);
class Card extends Component {
  state = { list: [] };

  onSelectCard = (item) => {
    if (this.props.type === "add") {
      this.props.onSelectCard(item);
      this.props.deletedPokemonOnSelect(item);
    } else {
      this.props.deleteSelected(item);
      this.props.adddeletedToList(item);
    }
  };

  calStrength = (item) => {
    let strength = 0;
    if (!item) {
      return 0;
    } else {
      strength = item.length * 50;

      if (strength > 100) {
        return 100;
      } else {
        return strength;
      }
    }
  };
  calWeak = (item) => {
    let weak = 0;
    if (!item) {
      return 0;
    } else {
      weak = item.length * 100;

      if (weak > 100) {
        return 100;
      } else {
        return weak;
      }
    }
  };

  calHappiness = (item) => {
    let heal = this.calHp(item.hp);
    let damage = null;
    let weak = 0;
    
    
    if (!item.attacks) {
      damage = 0;
    } else {
      item.attacks.map((attack) => {
        attack.damage === ""
          ? (damage += 0)
          : (damage += parseInt(attack.damage.replace(/[^a-zA-Z0-9]/g, "")));
      });
    }
    let happy = (heal / 10 + damage / 10 + 10 - weak) / 5;
    let happyArray = [];
    for (let i = 0; i < Math.abs(Math.round(happy)); i++) {
      happyArray.push(i);
    }

    return happyArray;
  };

  calHp = (item) =>{
    return item > 100 ? 100 : 0
  }
  renderFunction = () => {
    // if (this.props.type === "delete") {
    return (
      <div
        style={this.state.mouse ? styles.pointer : { display: "none" }}
        onClick={() => this.onSelectCard(this.props.item)}
      >
        {this.props.type === "delete" ? "x" : "Add"}
      </div>
    );
  };

  render() {
    return (
      <div
        className="carditem"
        style={styles.Card}
        onMouseOver={() => this.setState({ mouse: true })}
        onMouseOut={() => this.setState({ mouse: false })}
      >
        <Grid container spacing={5}>
          <Grid item xs={5}>
            <img
              src={this.props.item.imageUrl}
              alt="picPokemon"
              style={
                this.props.size === "medium"
                  ? { maxWidth: 200, maxHeight: 300 }
                  : { maxWidth: 250, maxHeight: 300 }
              }
            />
          </Grid>
          <Grid item xs={7}>
            <div className="carddesc" style={styles.carddesc}>
              {this.renderFunction()}
              <h1>{this.props.item.name}</h1>
              <Grid container>
                <Grid item xs={3}>
                  <div>HP</div>
                </Grid>
                <Grid item xs={9}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={this.calHp(this.props.item.hp)}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 20 }}>
                <Grid item xs={3}>
                  <div>STR</div>
                </Grid>
                <Grid item xs={9}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={this.calStrength(this.props.item.attacks)}
                  />
                </Grid>
              </Grid>

              <Grid container style={{ marginTop: 20 }}>
                <Grid item xs={3}>
                  <div>WEAK</div>
                </Grid>
                <Grid item xs={9}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={this.calWeak(this.props.item.weaknesses)}
                  />
                </Grid>
              </Grid>
              <h4>
                {this.calHappiness(this.props.item).map((index) => {
                  return (
                    <img
                      src={Icon}
                      alt="iconImage"
                      style={styles.cuteIcon}
                      className="cuteIcon"
                      key={index}
                    />
                  );
                })}
              </h4>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Card;
