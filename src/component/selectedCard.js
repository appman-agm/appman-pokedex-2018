import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LinearProgress from '@material-ui/core/LinearProgress';
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

const MyList = (props) => {
  
  //   const renderMyList = () => {
  //     if (props.myList.length === 0) {
  //       return <h1>No Item Found</h1>;
  //     } else {
  //       props.myList.map((item) => {
  //         console.log(item.id);
  //         return <h1>asdasdasd</h1>;
  //       });
  //     }
  //   };
  const calStrength = (item) => {
    console.log(item);
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
  const calWeak = (item) => {
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

  const calHappiness = (item) => {
    let heal = null;
    let damage = 100;
    let weak = null;

    if (item.hp >= 100) {
      heal = 100;
    } else {
      heal = 0;
    }
    if (item.weakness === undefined) {
      weak = 0;
    } else {
      weak = item.weakness.length * 100;
    }
    let happy = ((heal / 10) + (damage /10 ) + 10 - (weak)) / 5
    let happyArray = []
    for(let i = 0 ; i < happy ; i++){
       happyArray.push("")
    }
    return happyArray
  };

  
  return (
    <div className="MyList">
        
      <div style={{ padding: "20px" }}>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src={props.item.imageUrl} alt="picPokemon" />
          </Grid>
          <Grid item xs={6}>
            <h4>{props.item.name}</h4>
            <p>HP : {props.item.hp}</p>
            <p>Strength : <LinearProgress variant="determinate" value={calStrength(props.item.attacks)} /></p>
            <p>Weakness : <LinearProgress variant="determinate" value={calWeak(props.item.weaknesses)}/></p>
            <p>Happy : {calHappiness(props.item).map(index =>{
              return <InsertEmoticonIcon/>
            })}</p>
            <Button variant="contained" color="primary" onClick={()=>props.deleteSelected(props.item)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyList;
