import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Card from "./Card";
const StyledPaper = styled(Paper)`
  max-height: 720px;
  overflow: auto;
`;
const renderList = (props) => {
  const filterList =
    props.filterList.length === 0 && !props.search
      ? props.list
      : props.filterList;

  if (filterList.length === 0) {
     
    return (
      <StyledPaper>
        <h1 style={{ textAlign: "center" }}>No Card found</h1>
      </StyledPaper>
    );
  } else {
   
    return (
        
      <>
        <List>
          {filterList.map((item) => {
            return (
              <div key={item.id}>
                <Card item={item} key={item.id} type="add" size="big" />
              </div>
            );
          })}
        </List>
      </>
    );
  }
};

export default renderList;
