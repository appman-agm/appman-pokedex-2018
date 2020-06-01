import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LinearProgress from '@material-ui/core/LinearProgress';
class Card extends Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = { list: [] };
  }

  onSelectCard = (item) => {
    this.props.setSelected(item);
    this.props.deletedPokemonOnSelect(item);
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
      if(weak > 100){
        return 100
      }else{
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
    if(item.attacks === undefined){
      damage =  0;
    }else{
      for(let i =0;i< item.attacks.length;i++){
        
        const damageLoop = item.attacks[i].damage.replace(/[^a-zA-Z0-9]/g, '');
        const intDamage =  parseInt(damageLoop);
        damage = damage +intDamage
      }
    }
    let happy = ((heal / 10) + (damage /10 ) + 10 - (weak)) / 5
    let happyArray = []
    for(let i = 0 ; i < happy ; i++){
       happyArray.push("")
    }
    console.log(damage)
    return happyArray
  };
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src={this.props.item.imageUrl} alt="picPokemon" />
          </Grid>
          <Grid item xs={6}>
            <h1>{this.props.item.name}</h1>
            <h4>HP : {this.props.item.hp >= 100 ? 100 : this.props.item.hp}</h4>
            <h4>Strength : <LinearProgress variant="determinate" value={this.calStrength(this.props.item.attacks)} /></h4>
            <h4>Weakness : <LinearProgress variant="determinate" value={this.calWeak(this.props.item.weaknesses)}/></h4>
            <h4>Happy : {this.calHappiness(this.props.item).map(index =>{
              return <InsertEmoticonIcon/>
            })}</h4>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.onSelectCard(this.props.item)}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Card;
