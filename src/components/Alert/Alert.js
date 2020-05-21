import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Alert = ({
  children,
}) => (
  <div>
  <WraperModal>
    <ModalWrapper>
      <AlertBody>
            <div>
              { children }
            </div>
      </AlertBody>
    </ModalWrapper>
  </WraperModal>
  </div>
)

const AlertBody = styled.div`
  outline: 0;
  padding: 10px;
`

Alert.propTypes = {
  children: PropTypes.node,
}

export default Alert

const ModalWrapper = styled.div`
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    width: 90%;
    height: 95%;
    background-color: #ffffff;
    border-radius: 15px;
`

const WraperModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
