import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Footer = ({handleOpenModal}) => (
    <Wrapper class="container">
        <div class="footer">
        </div>
        <WrapperCircle>
        <Circle onClick={handleOpenModal}>
            +
        </Circle>
        </WrapperCircle>
        </Wrapper>
)

Footer.propTypes = {
    handleOpenModal: PropTypes.func,
}

const Wrapper = styled.div`
 .container {
  width:100%;
  position:relative;
}
.footer {
  position:absolute;
  bottom:0;
  width:100%;
  height: 80px;
  background: #eb4d4b;
}
`
const Circle = styled.div`
    width: 140px;
    height: 140px;
    background: #eb4d4b;
    border-radius: 70px;
    position:absolute;
    bottom:0;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 100px;
    color: #FFF;
`
const WrapperCircle = styled.div`
    display: flex;
    justify-content: center;
    :hover {
        cursor: pointer;
    }

`