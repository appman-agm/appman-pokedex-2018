import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "../cute.png";
import {withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
const styles = {
  Card: {
    padding: "20px",
    backgroundColor: "#d5d6dc",
    borderRadius: "5px",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    
  },
  cuteIcon: {
    maxWidth: 25,
    maxHeight: 25,
    paddingLeft: 5,
  },
  pointer: {
    fontSize: 20,
    color: "red",
    cursor: "pointer",
    float: "right",
  },
  carddesc:{
    marginLeft: 5 
  }
};
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    maxWidth: 500,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
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
    if (item === undefined) {
      return 0;
    } else {
      const strength = item.length * 50;
      if (strength > 100) {
        return 100;
      } else {
        return strength;
      }
    }
  };
  calWeak = (item) => {
    if (item === undefined) {
      return 0;
    } else {
      const weak = item.length * 100;
      if (weak > 100) {
        return 100;
      } else {
        return weak;
      }
    }
  };

  calHappiness = (item) => {
    let heal = null;
    let damage = null;
    let weak = null;

    if (this.props.item.hp >= 100) {
      heal = 100;
    } else {
      heal = 0;
    }
    if (item.weakness === undefined) {
      weak = 0;
    } else {
      weak = item.weakness.length * 100;
    }
    if (item.attacks === undefined) {
      damage = 0;
    } else {
      for (let i = 0; i < item.attacks.length; i++) {
        const damageLoop = item.attacks[i].damage.replace(/[^a-zA-Z0-9]/g, "");
        const intDamage = parseInt(damageLoop);
        damage = damage + intDamage;
      }
    }
    let happy = (heal / 10 + damage / 10 + 10 - weak) / 5;
    let happyArray = [];
    for (let i = 0; i < happy; i++) {
      happyArray.push(i);
    }

    return happyArray;
  };

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
              <h1 >{this.props.item.name}</h1>
              <h4>
                HP : {this.props.item.hp >= 100 ? 100 : this.props.item.hp}
              </h4>
              <h4>
                Strength :{" "}
                <BorderLinearProgress
                  variant="determinate"
                  value={this.calStrength(this.props.item.attacks)}
                />
              </h4>
              <h4>
                Weakness :{" "}
                <BorderLinearProgress
                  variant="determinate"
                  value={this.calWeak(this.props.item.weaknesses)}
                />
              </h4>
              <h4>
                Happy :{" "}
                {this.calHappiness(this.props.item).map((index) => {
                  return (
                    <img src={Icon} alt="iconImage" style={styles.cuteIcon} className="cuteIcon" key={index} />
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
