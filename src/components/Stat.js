import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
export const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 30,
    borderRadius: 10,
    maxWidth: 500,
  },
  colorPrimary: {
    backgroundColor: "#e4e4e4",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#f3701a",
  },
}))(LinearProgress);

const GridContainer = styled(Grid)`
  margin-top: 10px;
`;
const Stat = (props) => {
  return (
    <GridContainer container>
      <Grid item xs={3}>
        <div className="label">{props.label}</div>
      </Grid>
      <Grid item xs={9}>
        <BorderLinearProgress variant="determinate" value={props.value} />
      </Grid>
    </GridContainer>
  );
};

export default Stat;
