import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HeaderContainer } from '../HeaderContainer'
import { FooterContainer } from '../FooterContainer'
import { MyPocketpContainer } from '../../../my-pocket/containers'


class AppContainer extends Component {
render () {
    const {
        props: {
        handleOpenModal
    }} = this
    return (
        <div>
            <HeaderContainer
                title={ 'My Pockedex' }
            /> 
            <MyPocketpContainer/>
            <FooterContainer handleOpenModal={handleOpenModal}/>
         </div>
    )
}
}

export default AppContainer

AppContainer.propTypes = {
    handleOpenModal: PropTypes.func,
}