import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Footer } from '../../components/Footer'

class FooterContainer extends Component {
render () {
    const {
        props: {
        handleOpenModal
    }} = this
    return (
        <div>
            <Footer handleOpenModal={ handleOpenModal }/> 
        </div>
        )
    }
}

export default FooterContainer
FooterContainer.propTypes = {
    handleOpenModal: PropTypes.func,
  }
