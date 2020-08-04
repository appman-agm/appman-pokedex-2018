import React from 'react'
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Card from './Card'

const StyledPaper = styled(Paper)`
  max-height: 720px;
  overflow: auto;
  max-width: 1020px;
  margin-left: 5px;
`;
const StyledList = styled(List)`
  padding-bottom: 20px;
  height: 600px;
  width: 1000px;
`;
const renderMyList = (props) => {
    return (
      <div className="MyList">
        <StyledPaper>
          <StyledList>
            <Grid container>
              {props.selected.map((item) => {
                return (
                  <Grid item xs={6} key={item.id}>
                    <Card item={item} type="delete" size="medium" className="my-card"/>
                  </Grid>
                );
              })}
            </Grid>
          </StyledList>
        </StyledPaper>
      </div>
    );
  };

  export default renderMyList