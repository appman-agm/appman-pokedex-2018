import React, { Component } from "react";
import SelectedCard from "./selectedCard";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

const MyList = (props) => {
  
  if (props.myList.length === 0) {
    return <h1 style={{textAlign:'center'}}>No Item Found</h1>;
  } else {
    return (
      <div className="MyList">
        <h1>My List</h1>
        <Paper style={{ maxHeight: 720, overflow: "auto" }}>
          {" "}
          <List style={{paddingBottom:20}}>
            {props.myList.map((item) => {
              return (
                <h1>
                  <SelectedCard item={item} deleteSelected={props.deleteSelected}/>
                </h1>
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
};

export default MyList;
