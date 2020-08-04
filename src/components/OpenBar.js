import React from "react";
import styled from "styled-components";
const Bar = styled.div`
  width: 100%;
  height: 10%;
  background-color: #dc7777;
  position: absolute;
  bottom: 0;
`;
const AddButton = styled.div`
  width: 13%;
  height: 15%;
  background-color: #dc7777;
  box-shadow: 0px -10px #ec5656;
  bottom: 0;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  left: 47%;
`;
const AddIcon = styled.div`
  font-size: 80px;
  color: white;
  font-style: bold;
`;

const AddButtonLayout = styled.div`
  text-align: center;
`;

const OpenBar = (props) => {
  return (
    <div className="openBar">
      <Bar />
      <AddButtonLayout className="AddbuttonLayout">
        <AddButton className="Addbutton" onClick={props.handleOpen}>
          <AddIcon>+</AddIcon>
        </AddButton>
      </AddButtonLayout>
    </div>
  );
};

export default OpenBar;
